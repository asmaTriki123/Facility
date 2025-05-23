import { Request, Response } from "express";
import { User } from "../models/User";
import { UserRepo } from "../repositoryBackOffice/UserRepo";
import { AuthenticationService } from "../service/Authentication";
import Authentication from "../utils/Authentication";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { userInfo } from "os";
class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      // Extract files from the request
      const files = req.files as {
        userPhoto?: Express.Multer.File[],
        userDriverUrl?: Express.Multer.File[]
      };

      // Construct the new user object
      const new_user = new User();
      new_user.roleId = req.body.roleId;
      new_user.companyId = req.body.companyId;
      new_user.userEmail = req.body.userEmail;
      new_user.userPassword = req.body.userPassword;  // Will hash later
      new_user.userFirstName = req.body.userFirstName;
      new_user.userLastName = req.body.userLastName;
      new_user.userCellPhone = req.body.userCellPhone;
      new_user.userType = req.body.userType;
      new_user.userEmailInfo = req.body.userEmailInfo;
      new_user.userAdress1 = req.body.userAdress1;
      new_user.userAdress2 = req.body.userAdress2;
      new_user.userPhoneNumber = req.body.userPhoneNumber;
      new_user.userPostalCode = req.body.userPostalCode;
      new_user.userDriverLicense = req.body.userDriverLicense;
      new_user.userSmsOptIn = req.body.userSmsOptIn;
      new_user.userNewsletterOptIn = req.body.userNewsletterOptIn;
      new_user.userDriverUrl = files.userDriverUrl?.[0]?.filename || null;
      new_user.userPhoto = files.userPhoto?.[0]?.filename || null;
      new_user.userNotes = req.body.userNotes;
      new_user.userCountry = req.body.userCountry;
      new_user.userGender = req.body.userGender;
      new_user.userState = req.body.userState;
      new_user.userCity = req.body.userCity;
      new_user.LastLogin = req.body.LastLogin;
      new_user.createdBy = req.body.createdBy || null;

      const userSave = await new UserRepo().save(new_user);

      if (!new_user.createdBy) {
        new_user.createdBy = userSave.userId; // Assign the created user's ID to createdBy
        // Optionally, update the user record if necessary
        await userSave.update({ createdBy: userSave.userId });
      }

      res.status(201).json({
        status: "Created",
        message: "Utilisateur créé avec succès !",
        user: userSave,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error",
        message: "Erreur interne du serveur : " + err,
      });
    }
  }


  async login(req: Request, res: Response) {
    try {
      console.log(req.body)
      const userPassword = req.body.userPassword;
      const userIdentifier = req.body.userIdentifier;
      const token = await new AuthenticationService().login(userIdentifier, userPassword);
      if (token === '') {  // ✅ Vérification correcte
        res.status(400).json({
          status: "error",
          message: "Token is empty",
        });
      } else {
        res.status(200).json({
          status: "ok",
          message: "Successfully login",

          token: token,

        });
      }
    }
    catch (error) {
      res.status(500).json({
        status: "internal server err",
        message: "internal server err" + error,
      });
    }
  }
  async checkUnique(req: Request, res: Response) {
    try {

      const userCheck = await new UserRepo().checkEmailorPhone(req.params["userIdentifier"]);
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully found user user!",
        data: userCheck
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }


  // async delete (req: Request, res: Response) {
  //       try {
  //         let userId = parseInt(req.params["userId"]);
  //         await new UserRepo().delete(userId);
  //         res.status(200).json({
  //           status: "Ok! ",
  //           message: "Successfully deleted user!",
  //         });
  //       } catch (err) {
  //         res.status(500).json({
  //           status: "Internal Server Error! ",
  //           message: "Internal Server Error!" + err,
  //         });
  //       }
  //     }
  // async findAll(req: Request, res: Response) {
  //       try {
  //             const new_user = await new UserRepo().retrieveAll();
  //             res.status(200).json({
  //               status: "Ok! ",
  //               message: "Successfully fetched all user data!",
  //               data: new_user,
  //             });
  //           }
  //        catch (err) {
  //         res.status(500).json({
  //           status: "Internal Server Error! ",
  //           message: "Internal Server Error!" + err,
  //         });
  //       }
  //     }
  // async update(req: Request, res: Response) {
  //       try {
  //         const userId = parseInt(req.params["userId"]);
  //         const new_user = new User();
  //         new_user.userId = userId;
  //           const hashedPassword: string = await Authentication.passwordHash(
  //             req.body.userPassword)
  //           new_user.userEmail =req.body.userEmail;
  //           new_user.userPassword = hashedPassword;
  //           new_user.userNom = req.body.userNom;
  //           new_user.updatedBy = req.body.updatedBy;
  //         await new UserRepo().update(new_user);
  //         res.status(200).json({
  //           status: "Ok! ",
  //           message: "Successfully updated user data!",
  //         });
  //      } catch (err) {
  //         res.status(500).json({
  //           status: "Internal Server Error! ",
  //           message: "Internal Server Error!" + err,
  //         });
  //       }
  //     }
  async deleteTotal(req: Request, res: Response) {
    try {
      User.destroy({ where: req.body.userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred during the deletion process." });
    };
  };
  async updatePassword(req: Request, res: Response) {
    try {
      const new_user = new User();
      new_user.userEmail = req.params["userEmail"];
      console.log('req.params["userEmail"]', req.params["userEmail"])
      new_user.userPassword = await Authentication.passwordHash(req.body.userPassword);
      await new UserRepo().forgetPassword(new_user);
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully updated user password!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }
  async findPermissions(req: Request, res: Response) {
    try {
      let userEmail = req.params["userEmail"];
      let permission = await new UserRepo().retrievePermissions(userEmail);
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully retrive permissions!",
        data: permission,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!" + err,
      });
    }
  }
  async findById(req: Request, res: Response) {
    try {
      console.log(req.params["userId"])
      const user = await new UserRepo().retrieveById(req.params["userId"]);
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully fetched user by id!",
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }
  // async updateByEmail(req: Request, res: Response) {
  //       try {
  //         const hashedPassword: string = await Authentication.passwordHash(
  //           req.body.userPassword
  //         );
  //         const new_user = new User();
  //         new_user.userEmail = req.params["userEmail"];
  //         new_user.userPassword = hashedPassword;

  //         await new UserRepo().updateByEmail(new_user);
  //         res.status(200).json({
  //           status: "Ok! ",
  //           message: "Successfully updated password !",
  //         });
  //       } catch (err) {
  //         res.status(500).json({
  //           status: "Internal Server Error!",
  //           message: "Internal Server Error!" + err,
  //         });
  //       }
  //     }

  // update t5dem
  /*
    async updateUser(req: Request, res: Response) {
      try {
          // Récupérer les fichiers téléchargés
          const files = req.files as { 
              userPhoto?: Express.Multer.File[], 
              userDriverUrl?: Express.Multer.File[] 
          };
  
          // Créer un objet utilisateur avec les nouvelles données
          const updatedUser = new User();
          updatedUser.userId = req.params.userId; 
          updatedUser.userAdress1 = req.body.userAdress1;
          updatedUser.userAdress2 = req.body.userAdress2;
          updatedUser.userCellPhone = req.body.userCellPhone;
          updatedUser.userCity = req.body.userCity;
          updatedUser.userCountry = req.body.userCountry;
          updatedUser.userEmail = req.body.userEmail;
          updatedUser.userEmailInfo = req.body.userEmailInfo;
          updatedUser.userFirstName = req.body.userFirstName;
          updatedUser.userGender = req.body.userGender;
          updatedUser.userLastName = req.body.userLastName;
          updatedUser.userPhoneNumber = req.body.userPhoneNumber;
          updatedUser.userNewsletterOptIn = req.body.userNewsletterOptIn;
          updatedUser.userSmsOptIn = req.body.userSmsOptIn;
          updatedUser.userPostalCode = req.body.userPostalCode;
          updatedUser.userState = req.body.userState;
          updatedUser.userDriverLicense = req.body.userDriverLicense;
          updatedUser.updatedBy = req.body.updatedBy;
          updatedUser.roleId = req.body.roleId;
          updatedUser.userNotes = req.body.userNotes;
          updatedUser.userType = req.body.userType;
  
          // Mettre à jour les champs de fichier si des fichiers sont téléchargés
          if (files.userDriverUrl?.[0]?.filename) {
              updatedUser.userDriverUrl = files.userDriverUrl[0].filename;
          }
          if (files.userPhoto?.[0]?.filename) {
              updatedUser.userPhoto = files.userPhoto[0].filename;
          }
  
          // Appeler la méthode update du repository pour mettre à jour l'utilisateur
          await new UserRepo().update(updatedUser);
  
          // Répondre avec un message de succès
          res.status(200).json({
              status: "Ok!",
              message: "Successfully updated User data!",
              data: updatedUser,
          });
      } catch (err) {
          // Gérer les erreurs
          res.status(500).json({
              status: "Internal Server Error!",
              message: "Failed to update user: " + err,
          });
      }
  }
  */


  async updateUser(req: Request, res: Response) {
    try {
      // Récupérer les fichiers téléchargés
      const files = req.files as {
        userPhoto?: Express.Multer.File[],
        userDriverUrl?: Express.Multer.File[]
      };
      console.log("user controller update", req.body)

      // Créer un objet utilisateur avec les nouvelles données
      const updatedUser = new User();
      updatedUser.userId = req.params.userId;
      updatedUser.userAdress1 = req.body.userAdress1;
      updatedUser.userAdress2 = req.body.userAdress2;
      updatedUser.userCellPhone = req.body.userCellPhone;
      updatedUser.userCity = req.body.userCity;
      updatedUser.userCountry = req.body.userCountry;
      updatedUser.userEmail = req.body.userEmail;
      updatedUser.userEmailInfo = req.body.userEmailInfo;
      updatedUser.userFirstName = req.body.userFirstName;
      updatedUser.userGender = req.body.userGender;
      updatedUser.userLastName = req.body.userLastName;
      updatedUser.userPhoneNumber = req.body.userPhoneNumber;
      updatedUser.userNewsletterOptIn = req.body.userNewsletterOptIn;
      updatedUser.userSmsOptIn = req.body.userSmsOptIn;
      updatedUser.userPostalCode = req.body.userPostalCode;
      updatedUser.userState = req.body.userState;
      updatedUser.userDriverLicense = req.body.userDriverLicense;
      updatedUser.updatedBy = req.body.updatedBy;
      updatedUser.roleId = req.body.roleId;
      updatedUser.userNotes = req.body.userNotes;
      updatedUser.userType = req.body.userType;

      // Mettre à jour les champs de fichier si des fichiers sont téléchargés
      console.log("files", files)

      if (files.userDriverUrl?.[0]?.filename) {
        console.log("files.userDriverUrl[0].filename", files.userDriverUrl[0].filename)
        updatedUser.userDriverUrl = files.userDriverUrl[0].filename;
      }
      if (files.userPhoto?.[0]?.filename) {
        console.log("files.userPhoto[0].filename", files.userPhoto[0].filename)

        updatedUser.userPhoto = files.userPhoto[0].filename;
      }

      // Appeler la méthode update du repository pour mettre à jour l'utilisateur
      await new UserRepo().update(updatedUser);

      // Répondre avec un message de succès
      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated User data!",
        data: updatedUser,
      });
    } catch (err) {
      if (err instanceof Error) {
        // Gérer les erreurs spécifiques
        if (err.message.includes("Email already exists for another user!")) {
          res.status(400).json({
            status: "Bad Request!",
            message: "Email already exists for another user!",
          });
        } else if (err.message.includes("Cell phone number already exists for another user!")) {
          res.status(400).json({
            status: "Bad Request!",
            message: "Cell phone number already exists for another user!",
          });
        } else {
          // Gérer les autres erreurs
          res.status(500).json({
            status: "Internal Server Error!",
            message: "Failed to update user: " + err.message,
          });
        }
      } else {
        // Gérer le cas où err n'est pas une instance de Error
        res.status(500).json({
          status: "Internal Server Error!",
          message: "An unknown error occurred.",
        });
      }
    }

  }


  async getAllUser(req: Request, res: Response) {
    try {

      const user = await new UserRepo().retrieveAllUser();
      res.status(200).json({
        status: "Ok! ",
        message: "Successfully fetched users!",
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + err,
      });
    }
  }

  async Activer_desactiver(req: Request, res: Response) {
    try {
      const userId = req.params.userId;



      const user = await new UserRepo().ActiverDesactiverRepo(userId);

      res.status(200).json({
        status: "success",
        message: `User  ${user.userIsActive ? 'activated' : 'deactivated'} successfully`,
        data: user
      });

    } catch (error) {
      res.status(500).json({
        status: "Internal Server Error! ",
        message: "Internal Server Error!" + error,
      });
    }
  }



  async sendActivationEmail(req: Request, res: Response) {
    try {
      
      const savedUser = await new UserRepo().findByIdentifier(req.body.email);
      if (savedUser) {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          auth: {
            user: 'imscapital26@gmail.com',
            pass: 'krpuuydnvrkxkhkp'
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // Création des liens
        const activateLink = `http://localhost:4500/api/user/activate-user?email=${encodeURIComponent(req.body.email)}`;
        const deactivateLink = `http://localhost:4500/api/user/deactivate-user?email=${encodeURIComponent(req.body.email)}`;

        // Email avec boutons
        const mailOptions = {
          from: "imscapital26@gmail.com",
          to: "ez1parkingandstorage@gmail.com ",
          subject: "Activation/Désactivation de votre compte",
          html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                     <h3>  A new manager wishes to join the application</h3>


<p>You can accept their request</p>
                  
                       
                        <div style="margin: 25px 0;">
                            <a href="${activateLink}" 
                               style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                                      text-decoration: none; border-radius: 4px; margin-right: 15px;
                                      display: inline-block; font-weight: bold;">
                                Activer le compte
                            </a>
                            
                            <a href="${deactivateLink}" 
                               style="background-color: #f44336; color: white; padding: 12px 24px; 
                                      text-decoration: none; border-radius: 4px;
                                      display: inline-block; font-weight: bold;">
                                Désactiver le compte
                            </a>
                        </div>
                        
                        <p style="color: #777; font-size: 14px;">
                            Si vous n'avez pas demandé cette action, veuillez ignorer cet email.
                        </p>
                    </div>
                `,
        };

        // Envoi de l'email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
          status: "Success",
          message: "Email d'activation/désactivation envoyé",
        });
      } else {
        res.status(404).json({
          status: "Not Found",
          message: "Utilisateur non trouvé",
        });
      }
    } catch (err) {
      console.error("Erreur:", err);
      res.status(500).json({
        status: "Internal Server Error",
        message: "Erreur lors de l'envoi de l'email",
      });
    }
  }

  async activateUser(req: Request, res: Response) {
    await UserController.handleUserActivation(req, res, true);
  }

  async deactivateUser(req: Request, res: Response) {
    await UserController.handleUserActivation(req, res, false);
  }

  static async handleUserActivation(req: Request, res: Response, userIsActive: boolean) {
    try {
      const userEmail = decodeURIComponent(req.query.email as string);
      console.log(`Traitement de l'email: ${userEmail}`);

      const updatedUser = await new UserRepo().updateUserActivationStatus(userEmail, userIsActive);

      if (updatedUser) {
        const status = userIsActive ? "activé" : "désactivé";
        res.status(200).send(`
                    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
                        <h1 style="color: ${userIsActive ? '#4CAF50' : '#f44336'};">Compte ${status} avec succès</h1>
                        <p>Le compte associé à l'email ${userEmail} a été ${status}.</p>
                      
                        <p>Vous pouvez maintenant fermer cette fenêtre.</p>
                    </div>
                `);
      } else {
        res.status(404).send(`
                    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
                        <h1 style="color: #f44336;">Erreur</h1>
                        <p>Utilisateur non trouvé.</p>
                    </div>
                `);
      }
    } catch (err) {
      console.error("Erreur complète:", err);
      res.status(500).send(`
                <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
                    <h1 style="color: #f44336;">Erreur serveur</h1>
                    <p>Une erreur est survenue lors de la modification du compte.</p>
                </div>
            `);
    }
  };


}
export default new UserController();





