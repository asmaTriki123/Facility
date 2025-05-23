import { Request, Response } from "express";
import { PhotosFacility } from "../models/PhotosFacility";
import { PhotosFacilityRepo } from "../repositoryBackOffice/PhotosFacilityRepo";
import { FacilityRepo } from "../repositoryBackOffice/FacilityRepo";
import fs from 'fs';
import path from 'path';
class PhotosFacilitysController {
    // Create Facility Photo (Controller)
    async create(req: Request, res: Response) {
        try {
            console.log("create new photos",req.body)
            const new_photo = new PhotosFacility();
            new_photo.facilityId = req.body.facilityId;
            new_photo.photosfacilityName =  req.file ? `${req.file.filename}` : req.body?.namePhoto;
            new_photo.photosfacilityType = req.body.photosfacilityType;
            new_photo.createdBy = req.body.createdBy;

            const savedPhoto = await new PhotosFacilityRepo().save(new_photo);
            res.status(201).json({
                status: "Created!",
                message: "Successfully uploaded facility photo!",
                data: savedPhoto,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }

    // Update Facility Photo (Controller)
    async update(req: Request, res: Response) {
        try {
            const updated_photo = new PhotosFacility();
            updated_photo.photosfacilityId = parseInt(req.params["photosfacilityId"]);
            updated_photo.photosfacilityName =  req.file ? `${req.file.filename}` : null;
            updated_photo.photosfacilityType = req.body.photosfacilityType;
            updated_photo.updatedBy = req.body.updatedBy;

            const updatedPhoto = await new PhotosFacilityRepo().update(updated_photo);
            res.status(200).json({
                status: "Ok!",
                message: "Successfully updated facility photo!",
                data: updatedPhoto,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }

    // Find All Photos By Facility ID (Controller)
    async findAll(req: Request, res: Response) {
        try {
            const photosList = await new PhotosFacilityRepo().retrieveAll(parseInt(req.params["facilityId"]));
            res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched all facility photos!",
                data: photosList,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }
    
      async delete(req: Request, res: Response) {
        try {
    
          const photosdeleted = await new PhotosFacilityRepo().deleteFacilityPhoto(parseInt(req.params["facilityId"]));
          res.status(200).json({
            message: "photos facility  data have been successfully deleted.",
            data: photosdeleted
          });
    
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "An error occurred during the deletion process." });
        }
      };

   async delete2 (req: Request, res: Response) {
    try {
        // 1. Trouver la photo dans la base de données
        const photo = await PhotosFacility.findByPk(req.params.id);
        
        if (!photo) {
            return res.status(404).json({ message: "Photo non trouvée" });
        }

        // 2. Supprimer le fichier physique du serveur
    if (!photo.photosfacilityName) {
    // Gérer le cas où le nom est null/undefined
    return res.status(400).json({ success: false, message: "Nom de photo invalide" });
}

const filePath = path.join(__dirname, '../../uploads', photo.photosfacilityName);

        
        fs.unlink(filePath, (err) => {
            if (err && err.code !== 'ENOENT') { // ENOENT = fichier n'existe pas
                console.error("Erreur suppression fichier:", err);
                // On continue quand même à supprimer l'entrée DB même si le fichier n'existe pas
            }

            // 3. Supprimer l'entrée de la base de données
            photo.destroy()
                .then(() => {
                    res.json({ message: "Photo supprimée avec succès" });
                })
                .catch(dbError => {
                    console.error("Erreur suppression DB:", dbError);
                    res.status(500).json({ message: "Erreur lors de la suppression de la photo" });
                });
        });
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}






}
export default new PhotosFacilitysController();
