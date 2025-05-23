import { Request, Response } from "express";
import { Op, fn, col, literal } from "sequelize";
import { User } from "../models/User";
import { Company } from "../models/Company";
import { Facility } from "../models/Facility";

class DashboardController {
    async getStats(req: Request, res: Response) {
        try {
            // 👥 Nombre total de managers
            const totalManagers = await User.count({
                where: {
                    userType: "manager",
                    isDeleted: false
                }
            });

            // 🧍‍♂️ Nombre total d’agents
            const totalAgents = await User.count({
                where: {
                    userType: {
                        [Op.notIn]: ["manager", "admin", "customer"]
                    },
                    isDeleted: false
                }
            });
            // 🏢 Nombre de compagnies
            const totalCompanies = await Company.count({ where: { isDeleted: false } });

            // 🅿️ Nombre de parkings
            const totalParkings = await Facility.count({ where: { isDeleted: false } });

            // 🚗 Nombre d'unités

            // 🔒 Comptes actifs / désactivés
            const totalUsersActive = await User.count({
                where: {
                    userIsActive: true,
                    isDeleted: false,
                    userType: {
                        [Op.notIn]: ["admin", "customer"]
                    },
                }
            });
            const totalUsersInactive = await User.count({
                where: {
                    userIsActive: false,
                    isDeleted: false,
                    userType: {
                        [Op.notIn]: ["admin", "customer"]
                    },
                }
            });

            const usersByMonth = await User.findAll({
                attributes: [
                    [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'month'],
                    [fn('COUNT', col('userId')), 'total']
                ],
                where: {
                    userType: {
                        [Op.notIn]: ['admin', 'customer']
                    },
                    isDeleted: false
                },
                group: [fn('DATE_FORMAT', col('createdAt'), '%Y-%m')],
                order: [[fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'ASC']]
            });

            res.status(200).json({
                totalManagers,
                totalAgents,
                totalCompanies,
                totalParkings,
                totalUsersActive,
                totalUsersInactive,
                usersByMonth
            });

        } catch (error) {
            console.error("Erreur dashboard :", error);
            res.status(500).json({ error: "Erreur lors du chargement du dashboard" });
        }
    }
}
export default new DashboardController();

