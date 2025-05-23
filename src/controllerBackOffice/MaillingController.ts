import { Request, Response } from "express";
import nodemailer from "nodemailer";
import fs from "fs"; // Pour supprimer les fichiers téléchargés après utilisation
import path from "path"; // Pour gérer les chemins de fichiers

class MaillingController {
    async MailSurMesure(req: Request, res: Response) {
        const formData = req.body;

        // Log des données reçues
        console.log("Données reçues :", formData);

        // Configuration du transporteur SMTP avec Nodemailer
        const transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 465,
            auth: {
                user: 'contact@emarketing.tn',
                pass: 'Ami$264636'
            },
            tls: {
                rejectUnauthorized: false, // Ignore les erreurs liées aux certificats
            },
        });

        // Configuration de l'e-mail
        const mailOptions = {
            from: "contact@emarketing.tn", // Adresse de l'expéditeur
            to: req.body.email, // Adresse du destinataire
            subject: "Demande Devis ", // Sujet de l'e-mail
            text: `Vous avez reçu un nouveau formulaire pour formation sur mesure : ${JSON.stringify(formData)}`, // Contenu en texte brut
            html: `
            <p>Vous avez reçu un nouveau formulaire :</p>
            <ul>
              <li><strong>civilité :</strong> ${formData.civilite}</li>
              <li><strong>Prénom :</strong> ${formData.prenom}</li>
              <li><strong>Nom :</strong> ${formData.nom}</li>
              <li><strong>Téléphone :</strong> ${formData.telephone}</li>
              <li><strong>Email :</strong> ${formData.email}</li>
              <li><strong>PostOccupe :</strong> ${formData.postOccupe}</li>
              <li><strong>Employeur :</strong> ${formData.organisme}</li>
              <li><strong>Pays :</strong> ${formData.pays}</li>
              <li><strong>ModeFormation :</strong> ${formData.modeFormation}</li>
              <li><strong>TypeFormation :</strong> ${formData.typeFormation}</li>
              <li><strong>Theme :</strong> ${formData.theme}</li>
              <li><strong>DateDebut :</strong> ${formData.dateDebut}</li>
              <li><strong>DateFin :</strong> ${formData.dateFin}</li>
              <li><strong>Lieu :</strong> ${formData.lieu}</li>
              <li><strong>NombrePersonnes :</strong> ${formData.nombrePersonnes}</li>
              <li><strong>Message :</strong> ${formData.message}</li>
            </ul>
          `, // Contenu en HTML
        };

        try {
            // Envoi de l'e-mail
            await transporter.sendMail(mailOptions);
            console.log("E-mail envoyé avec succès !");
            res.status(200).json({ message: "Formulaire reçu et e-mail envoyé avec succès !" });
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
            res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail." });
        }
    }
    async MailFormateur(req: Request, res: Response) {
        const formData = req.body;
        const uploadedFile = req.file; // Fichier téléchargé


        // Log des données reçues
        console.log("Données reçues :", formData);
        console.log("Fichier reçu :", uploadedFile);


        // Configuration du transporteur SMTP avec Nodemailer
        const transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 465,
            auth: {
                user: 'contact@emarketing.tn',
                pass: 'Ami$264636'
            },
            tls: {
                rejectUnauthorized: false, // Ignore les erreurs liées aux certificats
            },
        });

        // Configuration de l'e-mail
        const mailOptions = {
            from: "contact@emarketing.tn", // Adresse de l'expéditeur
            to: req.body.email, // Adresse du destinataire
            subject: "Demande Devis ", // Sujet de l'e-mail
            text: `Vous avez reçu un nouveau formulaire pour formation sur mesure : ${JSON.stringify(formData)}`, // Contenu en texte brut
            html: `
            <p>Vous avez reçu un nouveau formulaire :</p>
            <ul>
              <li><strong>Prénom :</strong> ${formData.firstName}</li>
              <li><strong>Nom :</strong> ${formData.lastName}</li>
              <li><strong>Email :</strong> ${formData.email}</li>
              <li><strong>Téléphone :</strong> ${formData.phone}</li>
              <li><strong>Message :</strong> ${formData.message}</li>
            </ul>
          `,
            attachments: uploadedFile
                ? [
                    {
                        filename: uploadedFile.originalname,
                        path: uploadedFile.path, // Chemin temporaire du fichier
                    },
                ]
                : [],
        };

        try {
            // Envoi de l'e-mail
            await transporter.sendMail(mailOptions);
            console.log("E-mail envoyé avec succès !");
            // Supprimer le fichier temporaire après envoi
            if (uploadedFile) {
                fs.unlinkSync(uploadedFile.path);
            }
            res.status(200).json({ message: "Formulaire reçu et e-mail envoyé avec succès !" });
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
            // Supprimer le fichier temporaire en cas d'erreur
            if (uploadedFile) {
                fs.unlinkSync(uploadedFile.path);
            }
            res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail." });
        }
    }
    async MailInscription(req: Request, res: Response) {
        const formData = req.body;

        // Log des données reçues
        console.log("Données reçues :", formData);

        // Configuration du transporteur SMTP avec Nodemailer
        const transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 465,
            auth: {
                user: 'contact@emarketing.tn',
                pass: 'Ami$264636'
            },
            tls: {
                rejectUnauthorized: false, // Ignore les erreurs liées aux certificats
            },
        });

        // Configuration de l'e-mail
        const mailOptions = {
            from: "contact@emarketing.tn", // Adresse de l'expéditeur
            to: req.body.email, // Adresse du destinataire
            subject: "Demande Devis ", // Sujet de l'e-mail
            text: `Vous avez reçu un nouveau formulaire pour formation sur mesure : ${JSON.stringify(formData)}`, // Contenu en texte brut
            html: `
            <p>Vous avez reçu un nouveau formulaire :</p>
            <ul>
              <li><strong>civilité :</strong> ${formData.civilite}</li>
              <li><strong>Prénom :</strong> ${formData.prenom}</li>
              <li><strong>Nom :</strong> ${formData.nom}</li>
              <li><strong>Email :</strong> ${formData.email}</li>
              <li><strong>Téléphone :</strong> ${formData.telephone}</li>
              <li><strong>Employeur :</strong> ${formData.organisme}</li>
              <li><strong>Pays :</strong> ${formData.pays}</li>
              <li><strong>ModeFormation :</strong> ${formData.modeFormation}</li>
              <li><strong>TypeFormation :</strong> ${formData.typeFormation}</li>
              <li><strong>Theme :</strong> ${formData.theme}</li>
              <li><strong>Date :</strong> ${formData.date}</li>
              <li><strong>NombrePersonnes :</strong> ${formData.nombrePersonnes}</li>
              <li><strong>Message :</strong> ${formData.message}</li>
            </ul>
          `, // Contenu en HTML
        };

        try {
            // Envoi de l'e-mail
            await transporter.sendMail(mailOptions);
            console.log("E-mail envoyé avec succès !");
            res.status(200).json({ message: "Formulaire reçu et e-mail envoyé avec succès !" });
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
            res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail." });
        }
    }
    async Mailsinscrire(req: Request, res: Response) {
        const formData = req.body;

        // Log des données reçues
        console.log("Données reçues :", formData);

        // Configuration du transporteur SMTP avec Nodemailer
        const transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 465,
            auth: {
                user: 'contact@emarketing.tn',
                pass: 'Ami$264636'
            },
            tls: {
                rejectUnauthorized: false, // Ignore les erreurs liées aux certificats
            },
        });

        // Configuration de l'e-mail
        const mailOptions = {
            from: "contact@emarketing.tn", // Adresse de l'expéditeur
            to: req.body.email, // Adresse du destinataire
            subject: "Demande Devis ", // Sujet de l'e-mail
            text: `Vous avez reçu un nouveau formulaire pour formation sur mesure : ${JSON.stringify(formData)}`, // Contenu en texte brut
            html: `
            <p>Vous avez reçu un nouveau formulaire :</p>
            <ul>
              <li><strong>FormationNom :</strong> ${formData.formationNom}</li>
              <li><strong>FormationCode :</strong> ${formData.formationCode}</li>
              <li><strong>FormationDuree :</strong> ${formData.formationDuree}</li>
              <li><strong>FormationLangue :</strong> ${formData.formationLangue}</li>
              <li><strong>civilité :</strong> ${formData.civility}</li>
              <li><strong>Prénom :</strong> ${formData.prenom}</li>
              <li><strong>Nom :</strong> ${formData.nom}</li>
              <li><strong>Email :</strong> ${formData.email}</li>
              <li><strong>Téléphone :</strong> ${formData.telephone}</li>
              <li><strong>Employeur :</strong> ${formData.employeur}</li>
              <li><strong>Pays :</strong> ${formData.pays}</li>
              <li><strong>Date :</strong> ${formData.date}</li>
              <li><strong>Message :</strong> ${formData.message}</li>
            </ul>
          `, // Contenu en HTML
        };

        try {
            // Envoi de l'e-mail
            await transporter.sendMail(mailOptions);
            console.log("E-mail envoyé avec succès !");
            res.status(200).json({ message: "Formulaire reçu et e-mail envoyé avec succès !" });
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
            res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail." });
        }
    }
}
export default new MaillingController();