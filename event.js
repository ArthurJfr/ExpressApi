// Ne bloque pas le serveur si il y a une erreur
//Prend moins de ressources que les callbacks
// On peut utiliser les events pour faire des actions en dehors de la fonction principale
const EventEmitter = require("events");

const messageEmitter = new EventEmitter();

messageEmitter.on("message_call", (message) => {
    console.log(message);
});

module.exports = messageEmitter;  