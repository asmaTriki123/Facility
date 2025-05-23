import { Facility } from '../models/Facility';
export class TimeZoneService {

    // Récupérer le décalage horaire pour un parking donné
    public async getAdjustedTime(facilityId: number): Promise<Date | null> {
        try {
            console.log('facility id', facilityId)
            const new_facility = await Facility.findOne({
                where: { facilityId: facilityId }
            });
            if (!new_facility) {
                console.error(`Facility avec l'ID ${facilityId} non trouvé.`);
                return null;
            }
            const offset = new_facility?.facilityTimezone; // Supposons que ce champ contient une valeur comme "+05:00"
            if (!offset) {
                console.error(`Aucun décalage horaire défini pour le parking ${facilityId}.`);
                return null;
            }
            const sign = offset.startsWith('-') ? -1 : 1;
            const [hoursOffset, minutesOffset] = offset.slice(1).split(':').map(Number);
            const offsetInMilliseconds = sign * ((hoursOffset * 60 + minutesOffset) * 60 * 1000);
            return new Date(new Date().getTime() + offsetInMilliseconds);;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'heure ajustée :", error);
            return null;
        }
    }
}
