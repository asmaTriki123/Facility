import { Request, Response } from "express";
import { PhotoUnit } from "../models/PhotoUnit";
import { PhotoUnitRepo } from "../repositoryBackOffice/PhotoUnitRepo";
import fs from 'fs';
import path from 'path';
class PhotoUnitController {

 async createPhotoUnit(req: Request, res: Response): Promise<void> {
  try {
    const newPhotoUnit = new PhotoUnit();
    newPhotoUnit.photoUnitName = req.file ? req.file.filename : null;
    newPhotoUnit.createdAt = new Date();
    newPhotoUnit.createdBy = req.body.createdBy;
    newPhotoUnit.unitId = req.body.unitId;
    newPhotoUnit.photoUnitType = req.body.photoUnitType;
    newPhotoUnit.isDeleted =false;
    const savedPhotoUnit = await new PhotoUnitRepo().save(newPhotoUnit);
    
    res.status(201).json({
      status: "Created!",
      message: "Successfully created photo unit!",
      data: savedPhotoUnit,
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: `Failed to create photo unit: ${err}`,
    });
  }
}

 async updatePhotoUnit(req: Request, res: Response): Promise<void> {
  try {
    const updatedPhotoUnit = new PhotoUnit();
    updatedPhotoUnit.photoUnitId = parseInt(req.params["photoUnitId"]);
    updatedPhotoUnit.photoUnitName = req.file ? req.file.filename : null; // Le fichier peut être nul
    updatedPhotoUnit.updatedAt = new Date(); // Date actuelle de mise à jour
    updatedPhotoUnit.updatedBy = req.body.updatedBy;
    updatedPhotoUnit.photoUnitType = req.body.photoUnitType;
    updatedPhotoUnit.unitId = req.body.unitId; 
    const savedPhotoUnit = await new PhotoUnitRepo().update(updatedPhotoUnit);
    res.status(200).json({
      status: "Ok",
      message: "Successfully updated photo unit data!",
      data: savedPhotoUnit,
    });

  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: `Failed to update photo unit: ${err}`,
    });
  }
}

async getAllPhotoUnitByFacilityId(req: Request, res: Response): Promise<void> {
  try {
    const unitId = parseInt(req.params["unitId"]); // Récupérer unitId depuis les paramètres de la requête
    const photoUnits = await new PhotoUnitRepo().retrieveByFacility(unitId);

    res.status(200).json({
      status: "Ok",
      message: "Successfully fetched all photo unit data by facility.",
      data: photoUnits,
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: `Failed to fetch photo units: ${error}`,
    });
  }
}



  async delete(req: Request, res: Response) {
        try {
    
          const photosdeleted = await new PhotoUnitRepo().deleteFacilityPhoto(parseInt(req.params["unitId"]));
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
        const photo = await PhotoUnit.findByPk(req.params.id);
        
        if (!photo) {
            return res.status(404).json({ message: "Photo non trouvée" });
        }

        // 2. Supprimer le fichier physique du serveur
    if (!photo.photoUnitName) {
    // Gérer le cas où le nom est null/undefined
    return res.status(400).json({ success: false, message: "Nom de photo invalide" });
}

const filePath = path.join(__dirname, '../../uploads', photo.photoUnitName);

        
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

export default new PhotoUnitController();