import { CronJob } from 'cron';
import { Op } from 'sequelize';
import { Rent } from '../models/Rent';
import { Unit } from '../models/Unit';

export class CronService {
    constructor() {
        this.startAutoCheck();
    }  

    private startAutoCheck() {
        const job = new CronJob(
            '* * * * *', // Exécution toutes les minutes
            async () => {
                await this.checkAndUpdateRents();
            },
            null,
            true,
            'Europe/Paris'
        );

        job.start();
        console.log('🔄 Cron job initialized (runs every minute)');
    }

    private async checkAndUpdateRents() {
        try {
            const now = new Date();
            
            // 1. Traitement des locations expirées (rentMoveOut < maintenant)
            const expiredRents = await Rent.findAll({
                where: {
                    isDeleted: false,
                    rentMoveOut: { [Op.lt]: now }
                },
                include: [Unit]
            });

            if (expiredRents.length > 0) {
                console.log(`🔍 Found ${expiredRents.length} expired rent(s)`);
                
                await Promise.all(
                    expiredRents.map(async rent => {
                        // Marquer la location comme supprimée
                        await rent.update({
                            isDeleted: true,
                            deletedBy: 'system',
                            deletedAt: now
                        });
                        
                        // Mettre à jour le statut de l'unité associée en Available
                        if (rent.unit) {
                            await rent.unit.update({
                                unitStatus: 'Available', // Ici on met bien Available
                                updatedAt: now,
                                updatedBy: 'system'
                            });
                        }
                    })
                );

                console.log('✅ Marked all expired rents as deleted and set units to Available');
            }

            // 2. Traitement des locations actives (rentMoveOut >= maintenant)
            const activeRents = await Rent.findAll({
                where: {
                    isDeleted: false,
                    rentMoveOut: { [Op.gte]: now }
                },
                include: [Unit]
            });

            if (activeRents.length > 0) {
                console.log(`🔍 Found ${activeRents.length} active rent(s)`);
                
                await Promise.all(
                    activeRents.map(async rent => {
                        // Pour les locations actives, on peut vérifier si l'unité est bien marquée comme Occupied
                        if (rent.unit && rent.unit.unitStatus !== 'Rented') {
                            await rent.unit.update({
                                unitStatus: 'Rented', // Ici on met Occupied pour les locations actives
                                updatedAt: now,
                                updatedBy: 'system'
                            });
                        }
                    })
                );

                console.log('✅ Verified all active rents and set units to Occupied if needed');
            }

        } catch (error) {
            console.error('❌ Cron job failed:', error);
        }
    }
}