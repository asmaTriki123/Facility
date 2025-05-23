import { Request, Response } from "express";
//import { Rent } from "../models/Rent";
import { RentRepo } from "../repositoryBackOffice/RentRepo"
import { Rent } from "../models/Rent";
import { AgreementRepo } from "../repositoryBackOffice/AgreementRepo";
import { Agreement } from "../models/Agreement";
import * as fs from 'fs';
import * as path from 'path';
import { uploadContract } from "../middleware/upload2";
import puppeteer from "puppeteer";
import { Op } from 'sequelize'; // Import ajouté

interface CustomRequest extends Request {
  file?: Express.Multer.File;
  body: {
    htmlContent?: string;
    unitId: string;
    rentValue: string;
    rentMoveIn: string;
    rentRecurence: any;
    rentMoveOut?: string;
    [key: string]: any;
  };
}

const uploadsDir = path.join(__dirname, '../../public/uploads/documents');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

class RentController {
    // create Rent object (Controller)
    /*async create(req: Request, res: Response) {
        try {
            const savedRent = await new RentRepo().save(req.body, parseInt(req.params["facilityId"]));
            res.status(201).json({
                status: "Created!",
                message: "Successfully created Rent!",
                data: savedRent,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }*/
   /*
async create(req: Request, res: Response) {
  try {
    // Solution 1: Si vous utilisez express-fileupload (le plus simple)
    const pdfFile = (req as any).files?.rentAgreement;
    let pdfPath = null;

    if (pdfFile) {
      const uploadDir = path.join(__dirname, '../../public/uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const fileName = `${Date.now()}-${pdfFile.name}`;
      pdfPath = path.join(uploadDir, fileName);
      
      await pdfFile.mv(pdfPath); // Déplace le fichier
    }

    // Solution 2: Alternative sans express-fileupload (base64)
    // let pdfPath = null;
    // if (req.body.fileData) {
    //   const buffer = Buffer.from(req.body.fileData, 'base64');
    //   pdfPath = path.join(__dirname, '../../public/uploads', `pdf-${Date.now()}.pdf`);
    //   fs.writeFileSync(pdfPath, buffer);
    // }

    const rentData = {
      ...req.body,
      rentAgreement: pdfPath
      
    };

    const savedRent = await new RentRepo().save(
      rentData, 
      parseInt(req.params.facilityId)
    );

    res.status(201).json({
      status: "Created!",
      data: savedRent
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err instanceof Error ? err.message : "Upload failed"
    });
  }
}*/
/*
async create(req: Request, res: Response) {
  try {
    let rentData;

    // 1. Vérification du fichier (Multer le place dans req.file)
    if (!req.file) {
      res.status(400).json({ 
        status: "Error",
        message: "Le fichier PDF est requis" 
      });
    } else {
      // 2. Préparation des données
      rentData = {
        ...req.body,
        rentAgreement: req.file.path, // Chemin généré par Multer
        unitId: Number(req.body.unitId),
        rentValue: Number(req.body.rentValue),
        rentMoveIn: new Date(req.body.rentMoveIn),
        rentMoveOut: req.body.rentMoveOut ? new Date(req.body.rentMoveOut) : null
      };

      // 3. Sauvegarde en base
      const savedRent = await new RentRepo().save(
        rentData,
        parseInt(req.params.facilityId)
      );

      // 4. Réponse
      res.status(201).json({
        status: "Success",
        data: savedRent
      });
    }

  } catch (err) {
    console.error("Erreur création:", err);
    res.status(500).json({
      status: "Error",
      message: err instanceof Error ? err.message : "Erreur inconnue"
    });
  }
}
*/

async create(req: CustomRequest, res: Response) {
  try {
    if (!req.file && !req.body.htmlContent) {
      res.status(400).json({ 
        status: "Error",
        message: "Un fichier PDF ou du contenu HTML est requis" 
      });
      return;
    }

    let fileName: string;
    let filePath: string;

    if (req.body.htmlContent) {
      fileName = `contract_${Date.now()}-${Math.round(Math.random() * 1E9)}.pdf`;
      filePath = path.join(uploadsDir, fileName);

      try {
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setContent(req.body.htmlContent);
        
        await page.pdf({
          path: filePath,
          format: 'A4',
          margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
          printBackground: true
        });

        await browser.close();
      } catch (pdfError) {
        console.error("Erreur génération PDF:", pdfError);
        res.status(500).json({
          status: "Error",
          message: "Échec de la génération du PDF"
        });
        return;
      }
    } else if (req.file) {
      fileName = req.file.filename;
      filePath = req.file.path;
    } else {
      res.status(400).json({
        status: "Error",
        message: "Aucun fichier PDF fourni"
      });
      return;
    }

    // Création d'une instance de Rent conforme au modèle
    const rent = new Rent();
    rent.rentAgreement = fileName;
    
    rent.unitId = Number(req.body.unitId);
    rent.rentValue = Number(req.body.rentValue);
    rent.rentMoveIn = new Date(req.body.rentMoveIn);
   rent.rentMoveOut = req.body.rentMoveOut ? new Date(req.body.rentMoveOut) : new Date();
    rent.userId = req.body.userId; // Ajout des champs requis
    rent.createdBy = req.body.userId;
    // Ajoutez ici les autres champs obligatoires de votre modèle Rent
rent.rentRecurence = req.body.rentRecurence || 'monthly';
    const savedRent = await new RentRepo().save(rent, parseInt(req.params.facilityId));

    res.status(201).json({
      status: "Success",
      data: {
        ...savedRent.toJSON(),
        pdfUrl: `/public/uploads/documents/${fileName}`
      }
    });

  } catch (err) {
    console.error("Erreur création:", err);
    res.status(500).json({
      status: "Error",
      message: err instanceof Error ? err.message : "Erreur inconnue"
    });
  }
}
    // // update Rent object (Controller)
    async update(req: Request, res: Response) {
        try {
            const updated_rent = new Rent();
            updated_rent.rentId = parseInt(req.params["rentId"]);
            updated_rent.rentMoveOut = req.body.rentMoveOut;
            updated_rent.rentDueDate  = req.body.rentDueDate ;
            updated_rent.rentValue = req.body.rentValue;
            updated_rent.rentInsured = req.body.rentInsured;
            updated_rent.rentInsuredType = req.body.rentInsuredType;
            updated_rent.updatedBy = req.body.updatedBy;

            const updatedRent = await new RentRepo().update(updated_rent,req.body.facilityId);
            res.status(200).json({
                status: "Ok!",
                message: "Successfully updated Rent data!",
                data: updatedRent,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }

    // // Find All By facilityId Rent object (Controller)

    // async findAll(req: Request, res: Response) {
    //     try {
    //         const rentList = await new RentRepo().retrieveAll(req.body.facilityId);
    //         res.status(200).json({
    //             status: "Ok!",
    //             message: "Successfully fetched all Rent data!",
    //             data: amenitiesList,
    //         });
    //     } catch (err) {
    //         res.status(500).json({
    //             status: "Internal Server Error!",
    //             message: "Internal Server Error! " + err,
    //         });
    //     }
    // }

    // // delete Rent object (Controller)

    // async delete(req: Request, res: Response) {
    //     try {
    //         const deletedRent = await new RentRepo().delete(
    //             parseInt(req.params["amenitiesId"]),
    //             req.body.deletedBy
    //         );
    //         res.status(200).json({
    //             status: "Ok!",
    //             message: "Successfully deleted Rent!",
    //             data: deletedRent,
    //         });
    //     } catch (err) {
    //         res.status(500).json({
    //             status: "Internal Server Error!",
    //             message: "Internal Server Error! " + err,
    //         });
    //     }
    // }




         async findAll(req: Request, res: Response) {
       try {
             const rentList = await new RentRepo().retrieveAll();
             res.status(200).json({
                 status: "Ok!",
                 message: "Successfully fetched all Rent data!",
                 data: rentList,
             });
         } catch (err) {
             res.status(500).json({
                 status: "Internal Server Error!",
                 message: "Internal Server Error! " + err,
             });
         }
     }

async getAgrement(req: Request, res: Response): Promise<void> {
  try {
    const companyId = parseInt(req.params["companyId"]);
    
   

    const rents = await new RentRepo().retrieveAllByCompany(companyId);

    res.status(200).json({
      status: "Ok!",
      message: "Successfully fetched rent data!",
      data: rents,
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: "Internal Server Error",
    });
  }
}


 public async checkExpiredRents(req: Request, res: Response): Promise<void> {
        try {
            await this.checkAndMarkExpiredRents();
            res.status(200).json({ message: "Expired rents check completed successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to check expired rents", error });
        }
    }

    // Méthode utilisée par le CronService
    public async checkAndMarkExpiredRents(): Promise<void> {
        try {
            const now = new Date();
            const rents = await Rent.findAll({
                where: {
                    isDeleted: false,
                    rentMoveOut: { [Op.lt]: now }
                }
            });

            for (const rent of rents) {
                rent.isDeleted = true;
                //rent.deletedBy = 'system';
                rent.deletedAt = now;
                await rent.save();
                console.log(`Marked rent ${rent.rentId} as expired`);
            }
        } catch (error) {
            console.error("Failed to check and mark expired rents: ", error);
            throw error; // Important pour que le CronService puisse catcher l'erreur
        }
    }
  }
export default new RentController();
