/*import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRepo } from '../repositoryBackOffice/UserRepo';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

import { Request, Response, NextFunction, RequestHandler } from 'express';
// Assurez-vous du chemin correct

export const auth = (roles: any[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        res.status(401).json({
          status: "Unauthorized",
          message: "Please authenticate to access this resource",
        });

        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "MyKey@SuperSecret!Token");

      
      (req as CustomRequest).token = decoded;
      console.log('decoded', decoded)

      if (typeof decoded == 'object' && 'userEmail' in decoded) {
        const email = decoded.userEmail as string;
        console.log('email ', email)
        // Vérifier l'autorisation si des rôles sont définis
        if (roles.length && !roles.some(role => role.toLowerCase() == decoded.userType.toLowerCase())) {
          res.status(403).json({ message: "Accès interdit, rôle non autorisé." });
        } else {
          next();
        }
        // const userPermissions = await new UserRepo().retrievePermissions(email);

        // if (userPermissions.includes(permission)) {
        //   next(); // Appel de next() pour autoriser l'accès
        // } else {
        //   res.status(403).json({
        //     status: "Forbidden",
        //     message: "You do not have permission to access this resource",
        //   });
        // }
      } else {
        res.status(401).json({
          status: "Unauthorized",
          message: "Invalid token structure",
        });
      }
    } catch (err) {
      res.status(401).json({
        status: "Unauthorized",
        message: "Please authenticate to access this resource",
      });
    }
  };
};
*/


import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';

// Extension du type Request d'Express
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string | number;
        email: string;
        type: string;
      };
    }
  }
}

export const auth = (requiredRoles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const handleError = (status: number, message: string) => {
      res.status(status).json({ status: "Error", message });
      return; // Important pour arrêter l'exécution
    };

    try {
      // 1. Récupération du token
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return handleError(401, "Token manquant");
      }

      // 2. Vérification du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "MyKey@SuperSecret!Token") as JwtPayload;
      
      // 3. Vérification de la structure du token
      if (typeof decoded !== 'object' || !decoded.userId || !decoded.userType) {
        return handleError(401, "Structure du token invalide");
      }

      // 4. Ajout des infos utilisateur à la requête
      req.user = {
        id: decoded.userId,
        email: decoded.userEmail || '',
        type: decoded.userType
      };

      // 5. Vérification des rôles
      if (requiredRoles.length > 0) {
        const userRole = decoded.userType.toLowerCase();
        if (!requiredRoles.some(role => role.toLowerCase() === userRole)) {
          return handleError(403, "Permissions insuffisantes");
        }
      }

      // 6. Passage au middleware suivant
      next();
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      handleError(401, "Token invalide ou expiré");
    }
  };
};