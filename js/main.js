//Import des modules 

import { Inscription, connexion } from "./Modules/connecte.js";
import { Bienvenue } from "./Modules/bienvenue.js";
import { AddMessage,} from "./Modules/chatmessage.js";

//Chargeons les modules au demarage des pages
let path = location.pathname //location est un objet js qui permet de localiser l'url. et la propriété pathname affiche l'url de la page en cours d'affichage

document.addEventListener("DOMContentLoaded", () => {
    if(path && path === "/index.html" || path === "/" ) {
        Bienvenue()
    } else if(path === "/inscription.html") {
        Inscription()
    } else if(path === "/connexion.html" ) {
        connexion()
    } else if(path === "/chat.html") {
        Affichechat()
    } else if(path === "/chat1.html") {
        AddMessage()
    }
})
