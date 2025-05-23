const chokidar = require("chokidar");
const { exec } = require("child_process");
const path = require("path");

// Surveiller les fichiers dans le répertoire 'models/'
const watcher = chokidar.watch("./models", {
  ignored: /^\./,
  persistent: true,
});

watcher.on("change", (filePath) => {
  // S'assurer que le changement affecte un fichier .js ou .ts dans le dossier models
  if (filePath && (filePath.endsWith(".js") || filePath.endsWith(".ts"))) {
    console.log(
      `[INFO] Le fichier ${filePath} a été modifié. Génération de la migration...`
    );

    // Générer une migration via sequelize-cli
    exec(
      "npx sequelize-cli migration:generate --name auto-migration",
      (err, stdout, stderr) => {
        if (err) {
          console.error(
            `[ERREUR] Erreur lors de la génération de la migration: ${err}`
          );
          return;
        }
        console.log(`[SUCCESS] Migration générée : ${stdout}`);

        // Appliquer la migration
        exec("npx sequelize-cli db:migrate", (err, stdout, stderr) => {
          if (err) {
            console.error(
              `[ERREUR] Erreur lors de l'application de la migration: ${err}`
            );
            return;
          }
          console.log(`[SUCCESS] Migration appliquée avec succès : ${stdout}`);
        });
      }
    );
  } else {
    console.log(
      `[INFO] Aucun changement pertinent dans le fichier ${filePath}, ignorer.`
    );
  }
});

console.log("[INFO] Surveillance des fichiers de modèles en cours...");
