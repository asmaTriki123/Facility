




import { Request, Response } from "express";
import { Agreement } from "../models/Agreement";
import { AgreementRepo } from "../repositoryBackOffice/AgreementRepo";
import pdf from 'html-pdf';
import path from 'path';
import fs from 'fs';
import fsPromises from "fs/promises"; // <-- Import des promesses
import puppeteer from 'puppeteer';

const uploadsDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const pdfOptions: pdf.CreateOptions = {
  format: "A4",
  border: { top:"1cm", right:"1cm", bottom:"1cm", left:"1cm" },
  phantomPath: require("phantomjs-prebuilt").path,
  base: `file://${process.cwd()}/`,
};  
class AgreementController {

      /* async create(req: Request, res: Response) {
            try {
    
                const savedAgreement = await new AgreementRepo().save(req.body);
                res.status(201).json({
                    status: "Created!",
                    message: "Successfully created Agreement!",
                    data: savedAgreement,
                });
            } catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error! " + err,
                });
            }
        }*/
       /*
async create(req: Request, res: Response): Promise<void> {
  try {
    const { AgreementTitle, AgreementBody, createdBy } = req.body;

const quillCss = `
  .ql-editor { 
    font-family: Arial, sans-serif; 
    font-size: 16px; 
    line-height: 1.5; 
    white-space: pre-wrap !important;
  }
  .ql-align-center { text-align: center; }
  .ql-align-right { text-align: right; }
  .ql-align-justify { text-align: justify; }
  .ql-editor table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    border: 2px solid #000;
  }
  .ql-editor td {
    border: 2px solid #000;
    padding: 8px;
    min-width: 50px;
    background: white;
  }
  img { 
    max-width: 120px; 
     height: 120px;
    display: block; 
    margin: 8px 0; 
  }
`;


 const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>${quillCss}</style>
    </head>
    <body>
      <div class="ql-editor">${AgreementBody}</div>
    </body>
  </html>
`;



    const fileName = `agreement_${Date.now()}.pdf`;
    const filePath = path.join(uploadsDir, fileName);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

   await page.setContent(htmlContent, {
  waitUntil: 'networkidle0',
  timeout: 30000
})
 await page.pdf({
  path: filePath,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }
});

    await browser.close();

    const saved = await new AgreementRepo().save({
      AgreementTitle,
      AgreementBody,
      createdBy,
      pdfPath: fileName,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });

    res.status(201).json({
      status: "Created!",
      message: "PDF généré avec précision !",
      data: {
        ...saved.toJSON(),
        pdfUrl: `/uploads/${fileName}`
      },
    });

  } catch (err) {
    console.error("Erreur dans create:", err);
    res.status(500).json({
      status: "Internal Server Error!",
      message: err instanceof Error ? err.message : "Erreur serveur inconnue"
    });
  }
}*/

async create(req: Request, res: Response): Promise<void> {
  try {
    const { AgreementTitle, AgreementBody, createdBy ,companyId} = req.body;

      // HTML qui conserve TOUS les espaces
 const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${AgreementTitle}</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        font-size: 12px;
        line-height: 1.5;
        white-space: pre-wrap;
      }
      
      .ql-editor {
        width: fit-content;
        min-width: 100%;
        padding: 10mm;
        margin: 0;
      }
   
                img {
             max-width: 100; 
     height: 100px;
              object-fit: cover !important;
              display: inline-block !important;
              vertical-align: baseline !important; /* Changé à baseline pour les espaces */
              margin: 0 !important;
            }
              table {
              border: 2px solid #000 !important;
              border-collapse: collapse !important;
              width: 100% !important;
            }
            
            td {
              width: 120px !important;
              height: 120px !important;
              border: 2px solid #000 !important;
              padding: 8px !important;
              margin: 2px !important;
              display: inline-block !important;
              vertical-align: middle !important;
              object-fit: cover !important;
            }
            
            .ql-align-right {
              float: right !important;
              margin-left: 15px !important;
              margin-bottom: 10px !important;
            }
            
            .ql-align-left {
              float: left !important;
              margin-right: 15px !important;
              margin-bottom: 10px !important;
            }
            
            .ql-align-center {
              display: block !important;
              margin: 10px auto !important;
              text-align: center !important;
            }
            
            /* Nouveau : conservation des espaces dans les paragraphes */
            p {
              margin: 0 !important;
              padding: 0 !important;
              white-space: pre-wrap !important;
            } 
    </style>
  </head>
  <body>
    <div class="ql-editor">${AgreementBody}</div>
  </body>
</html>
`;



    const fileName = `accord_${Date.now()}.pdf`;
    const filePath = path.join(uploadsDir, fileName);

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    const page = await browser.newPage();
    
    // Important: Ne pas intercepter les requêtes pour les images locales
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await page.pdf({
      path: filePath,
     // format: 'A4',
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
      printBackground: true,
      preferCSSPageSize: true
    });

    await browser.close();

    const savedAgreement = await new AgreementRepo().save({
      AgreementTitle,
      AgreementBody,
      companyId,
      createdBy,
      pdfPath: fileName,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({
      success: true,
      pdfUrl: `/uploads/${fileName}`,
      agreementId: savedAgreement.id
    });

  } catch (err) {
    console.error("Erreur de génération PDF:", err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la génération du PDF",
      error: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
}


  async getAll(req: Request, res: Response) {
          try {
              const ContartList = await new AgreementRepo().retrieveAll();
              res.status(200).json({
                  status: "Ok!",
                  message: "Successfully fetched all contrats !",
                  data: ContartList,
              });
          } catch (err) {
              res.status(500).json({
                  status: "Internal Server Error!",
                  message: "Internal Server Error! " + err,
              });
          }
      }
/*
async update(req: Request, res: Response): Promise<void> {
  try {
    const { AgreementId } = req.params;
    const { AgreementTitle, AgreementBody } = req.body;

    // Récupération de l'accord existant
    const existingAgreement = await Agreement.findByPk(AgreementId);
    if (!existingAgreement) {
      res.status(404).json({ message: 'Accord non trouvé' });
      return;
    }

    // Vérification des modifications
    const isContentChanged = 
      AgreementTitle !== existingAgreement.AgreementTitle ||
      AgreementBody !== existingAgreement.AgreementBody;

    let newPdfFileName: string | null = null;
    let oldPdfPath: string | null = null;

    // Génération du nouveau PDF si nécessaire
    if (isContentChanged) {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${AgreementTitle}</title>
            <style>
              * { margin: 0; padding: 0; }
              body { -webkit-print-color-adjust: exact !important; }
            </style>
          </head>
          <body>
            ${AgreementBody}
          </body>
        </html>
      `;

      newPdfFileName = `agreement_${Date.now()}.pdf`;
      const newPdfFilePath = path.join(uploadsDir, newPdfFileName);

      await new Promise((resolve, reject) => {
        pdf.create(htmlContent, {
          ...pdfOptions,
          phantomPath: require('phantomjs-prebuilt').path
        }).toFile(newPdfFilePath, (err) => {
          err ? reject(err) : resolve(true);
        });
      });

      oldPdfPath = path.join(uploadsDir, existingAgreement.pdfPath);
    }

    // Préparation des données
    const updatedData: Partial<Agreement> = {
      AgreementTitle: AgreementTitle || existingAgreement.AgreementTitle,
      AgreementBody: AgreementBody || existingAgreement.AgreementBody,
      updatedAt: new Date()
    };

    if (newPdfFileName) updatedData.pdfPath = newPdfFileName;

    // Mise à jour en base
    const updatedAgreement = await new AgreementRepo().update(Number(AgreementId), updatedData);

    if (!updatedAgreement) {
      res.status(404).json({ message: 'Échec de la mise à jour' });
      return;
    }

    // Nettoyage de l'ancien PDF
    if (oldPdfPath) {
      fs.unlink(oldPdfPath, (err) => {
        if (err) console.error('Erreur suppression PDF:', err);
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Accord mis à jour",
      data: {
        ...updatedAgreement.toJSON(),
        pdfUrl: `/uploads/${updatedAgreement.pdfPath}`
      }
    });

  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({
      status: "Internal Server Error!",
      message: err instanceof Error ? err.message : 'Erreur inconnue'
    });
  }
}
*/

async update(req: Request, res: Response): Promise<void> {
  try {
    const { AgreementId } = req.params;
    const { AgreementTitle, AgreementBody, updatedBy } = req.body;

    // Récupération de l'accord existant
    const existingAgreement = await Agreement.findByPk(AgreementId);
    if (!existingAgreement) {
      res.status(404).json({ message: 'Accord non trouvé' });
      return;
    }

    // HTML qui conserve TOUS les espaces
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${AgreementTitle}</title>
          <style>
            body {
              font-family: monospace;
              font-size: 16px;
              line-height: 1.5;
              padding: 20px;
              white-space: pre-wrap !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .ql-editor {
              font-family: inherit !important;
              white-space: inherit !important;
              min-height: 400px;
            }
            
            img {
              width: 120px !important;
              height: 120px !important;
              object-fit: cover !important;
              display: inline-block !important;
              vertical-align: baseline !important;
              margin: 0 !important;
            }
            
            table {
              border: 2px solid #000 !important;
              border-collapse: collapse !important;
              width: 100% !important;
            }
            
            td {
              width: 120px !important;
              height: 120px !important;
              border: 2px solid #000 !important;
              padding: 8px !important;
              margin: 2px !important;
              display: inline-block !important;
              vertical-align: middle !important;
              object-fit: cover !important;
            }
            
            .ql-align-right {
              float: right !important;
              margin-left: 15px !important;
              margin-bottom: 10px !important;
            }
            
            .ql-align-left {
              float: left !important;
              margin-right: 15px !important;
              margin-bottom: 10px !important;
            }
            
            .ql-align-center {
              display: block !important;
              margin: 10px auto !important;
              text-align: center !important;
            }
            
            p {
              margin: 0 !important;
              padding: 0 !important;
              white-space: pre-wrap !important;
            }
          </style>
        </head>
        <body>
          <div class="ql-editor" style="white-space: pre-wrap !important">${AgreementBody}</div>
        </body>
      </html>
    `;

    // Génération du nouveau PDF
    const fileName = `accord_${Date.now()}.pdf`;
    const filePath = path.join(uploadsDir, fileName);

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await page.pdf({
    /*  path: filePath,
      format: 'A4',
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
      printBackground: true,
      preferCSSPageSize: true*/
       path: filePath,
  format: 'A4',
  margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
  printBackground: true,
  preferCSSPageSize: true,
  scale: 1, // Assurez-vous que le zoom est à 100%
  width: '210mm', // Largeur A4 explicite
  height: '297mm' // Hauteur A4 explicite
    });

    await browser.close();

    // Suppression de l'ancien PDF
    const oldPdfPath = path.join(uploadsDir, existingAgreement.pdfPath);
    if (fs.existsSync(oldPdfPath)) {
      fs.unlinkSync(oldPdfPath);
    }

    // Mise à jour de l'accord
    const updatedAgreement = await new AgreementRepo().update(Number(AgreementId), {
      AgreementTitle,
      AgreementBody,
      pdfPath: fileName,
      updatedBy,
      updatedAt: new Date()
    });

    res.status(200).json({
      success: true,
      pdfUrl: `/uploads/${fileName}`,
      agreement: updatedAgreement
    });

  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Erreur inconnue'
    });
  }
}

   async GetById(req: Request, res: Response) {
        try {
            const AgreementList = await new AgreementRepo().retrieveAll2(parseInt(req.params.AgreementId));
            res.status(200).json({
                status: "Ok!",
                message: "Successfully fetched  Agrement data!",
                data: AgreementList,
            });
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }
}
export default new AgreementController();
