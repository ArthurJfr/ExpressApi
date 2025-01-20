const fs = require("fs");

const MAX_LOG_SIZE = 5 * 1024 * 1024; // 5 MB

exports.writeLog = (file, message) => {
    if(!fs.existsSync(file)) {
        fs.writeFileSync(file, "");
    }
    
    // Vérifier et faire la rotation si nécessaire
    this.rotateLog(file);
    
    fs.appendFile(file, `${new Date().toISOString()} ${message}\n`, (err) => {
        if (err) {
            console.error("Erreur lors de l'écriture dans le fichier log", err);
        }
    });
};

exports.rotateLog = (file) => {
    if (!fs.existsSync(file)) return;
    
    const stats = fs.statSync(file);
    if (stats.size > MAX_LOG_SIZE) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        fs.renameSync(file, `${file}.${timestamp}.backup`);
        fs.writeFileSync(file, ''); // Créer un nouveau fichier vide
    }
};