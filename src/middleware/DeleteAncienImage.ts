import fs from "fs";
import path from "path";

/**
 * Supprime l'ancienne image si elle est différente de la nouvelle
 * et si ce n'est pas une image par défaut.
 */
export class DeleteAncienImage {
    public async deleteOldImageIfNeeded(
        newImagePath: string | null,
        oldImagePath: string | null,
        defaultImages: string[] 
    ): Promise<void> {
        if (
            newImagePath &&
            newImagePath !== oldImagePath &&
            oldImagePath &&
            !defaultImages.includes(path.basename(oldImagePath))
        ) {
            console.log("delete en train ")
            const fullOldImagePath = path.join(__dirname, "..", "..", "public/uploads", path.basename(oldImagePath));

            fs.access(fullOldImagePath, fs.constants.F_OK, (err) => {
                console.log("errror fs delete ",err)
                if (!err) {
                    fs.unlink(fullOldImagePath, (unlinkErr) => {
                        console.log("unlinkErr ",unlinkErr)

                        if (unlinkErr) {
                            console.error("Erreur lors de la suppression de l'image :", unlinkErr);
                        } else {
                            console.log("Ancienne image supprimée :", fullOldImagePath);
                        }
                    });
                }
            });
        }
    }
}
