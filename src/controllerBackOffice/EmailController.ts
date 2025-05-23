import { Request, Response } from "express";
import { UserRepo } from "../repositoryBackOffice/UserRepo"
import nodemailer from"nodemailer";


class EmailController {
    async VerifierEmail(req: Request, res: Response) {
        try {

            const savedEmail = await new UserRepo().findByIdentifier(req.body.email);
            if(savedEmail){
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com", // 🔹 Serveur SMTP de Gmail
                    port: 465,
                    auth: {
                      user: 'imscapital26@gmail.com',
                      pass: 'krpuuydnvrkxkhkp'
                    },
                    tls: {
                      rejectUnauthorized: false, // Ignore les erreurs liées aux certificats
                    },
                  });
                 // let confirmToken ="profession"
                 // const confirmLink = `http://localhost:4600/api/appointment/confirm/${new_reservations._id}?token=${confirmToken}`;
                  //const annulerLink = `http://localhost:4600/api/appointment/cancelled/${new_reservations._id}?token=${confirmToken}`;
                  const resetLink = `http://localhost:3000/reset-password?email=${req.body.email}`;

                  // Configurer l'email
                  const mailOptions = {
                      from: "imscapital26@gmail.com",
                      to: req.body.email,
                      subject: "Password Reset Request",
                      html: `<p>Please use the following link to reset your password:</p>
                             <a href="${resetLink}">${resetLink}</a>
                             `,
                  };
              
                  // Envoi de l'e-mail
                  transporter.sendMail(mailOptions, (error:any, info:any) => {
                    if (error) {
                      console.log("Erreur lors de l'envoi de l'email :", error);
                    } else {
                      console.log("E-mail envoyé :", info.response);
                    }
                  });
                  res.status(201).json({
                    status: "Notification mail",
                    message: "Successfully",
                });
            }else{
                res.status(404).json({
                    status: "Not Found",
                    message: "Email not found ",
                 
                }); 
            }
         
        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error! " + err,
            });
        }
    }  
    
}

export default new EmailController();
