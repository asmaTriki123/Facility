import { User } from "../models/User";
import { WaittingList } from "../models/WaittingList";

export class UniqueIdUser {

    public async  generateUniqueId() {
        let isUnique = false;
        let uniqueId = '';
    
        while (!isUnique) {
            // Génère un ID unique
            const randomPart = await this.generateRandomString(6);
            uniqueId = `${Date.now()}-${randomPart}`;
            // Vérifie si l'ID existe déjà dans la base de données
            const existingUser = await User.findOne({ where: { userId: uniqueId } });
    
            // Si l'ID n'existe pas, on considère qu'il est unique
            if (!existingUser) {
                isUnique = true;
                console.log('uniqueeeeeeeeeeeee')
            }
        }
    
        return uniqueId;
    }
    
      public async  generateUniqueId2() {
        let isUnique = false;
        let uniqueId = '';
    
        while (!isUnique) {
            // Génère un ID unique
            const randomPart = await this.generateRandomString(6);
            uniqueId = `${Date.now()}-${randomPart}`;
            // Vérifie si l'ID existe déjà dans la base de données
            const existingUser = await WaittingList.findOne({ where: { WaittingListId: uniqueId } });
    
            // Si l'ID n'existe pas, on considère qu'il est unique
            if (!existingUser) {
                isUnique = true;
                console.log('uniqueeeeeeeeeeeee')
            }
        }
    
        return uniqueId;
    }
    // Fonction pour générer une chaîne aléatoire de longueur spécifiée
    public async generateRandomString(length:any) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; 
        let result = '';
        const charactersLength = characters.length;
    
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result.toString();
    }
}
