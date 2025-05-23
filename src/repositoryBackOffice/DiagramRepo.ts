import { Diagram } from "../models/Diagram";
import DiagramElement from "../models/Diagram";

export  interface IDiagramRepo {
    saveOrUpdate(facilityId: number, userId: string, elements: DiagramElement[]): Promise<Diagram>;
    getByFacilityAndUser(facilityId: number, userId: string): Promise<Diagram | null>;
}

export class DiagramRepo implements IDiagramRepo {
    async saveOrUpdate(facilityId: number, userId: string, elements: DiagramElement[]): Promise<Diagram> {
        const [diagram, created] = await Diagram.findOrCreate({
            where: { facilityId, userId },
            defaults: { 
                elements,
                createdBy: userId,
                updatedBy: userId 
            }
        });

        if (!created) {
            diagram.elements = elements;
            diagram.updatedBy = userId;
            await diagram.save();
        }

        return diagram;
    }

    async getByFacilityAndUser(facilityId: number, userId: string): Promise<Diagram | null> {
        return Diagram.findOne({ 
            where: { facilityId, userId },
            include: [Diagram.associations.facility]
        });
    }
}