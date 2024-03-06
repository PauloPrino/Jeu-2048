function bonjour() {
    console.log("bonjour");
}
function testBonjour() {
    bonjour();
}
testBonjour();
var score = 0;
var score_joueur = 0;
function haut(event) {
    var a_bouge = false;
    var envoyer_message = false;
    const info = document.getElementById("information");
    if (event.key === "ArrowUp") {
        console.log("haut");
        score++;
        const scoreDiv = document.getElementById("score");
        scoreDiv.textContent = `Nombre de coups effectués : ${score}`;
        for (let i = 0; i < 4; i++) {
            a_bouge = up(i);
            if (a_bouge) {
                envoyer_message = true;
            }
        }
        if (envoyer_message == false) {
            info.textContent = "Information : le mouvement n'a pas eu lieu";
        }
        else {
            info.textContent = "Information : le mouvement a eu lieu";
        }
        nouveau_chiffre();
    }
}
function bas(event) {
    var a_bouge = false;
    var envoyer_message = false;
    const info = document.getElementById("information");
    if (event.key === "ArrowDown") {
        console.log("bas");
        score++;
        const scoreDiv = document.getElementById("score");
        scoreDiv.textContent = `Nombre de coups effectués : ${score}`;
        for (let i = 0; i < 4; i++) {
            a_bouge = down(i);
            if (a_bouge) {
                envoyer_message = true;
            }
        }
        if (envoyer_message == false) {
            info.textContent = "Information : le mouvement n'a pas eu lieu";
        }
        else {
            info.textContent = "Information : le mouvement a eu lieu";
        }
        nouveau_chiffre();
    }
}
function droite(event) {
    var a_bouge = false;
    var envoyer_message = false;
    const info = document.getElementById("information");
    if (event.key === "ArrowRight") {
        console.log("droite");
        score++;
        const scoreDiv = document.getElementById("score");
        scoreDiv.textContent = `Nombre de coups effectués : ${score}`;
        for (let i = 0; i < 4; i++) {
            a_bouge = right(i);
            if (a_bouge) {
                envoyer_message = true;
            }
        }
        if (envoyer_message == false) {
            info.textContent = "Information : le mouvement n'a pas eu lieu";
        }
        else {
            info.textContent = "Information : le mouvement a eu lieu";
        }
        nouveau_chiffre();
    }
}
function gauche(event) {
    var a_bouge = false;
    var envoyer_message = false;
    const info = document.getElementById("information");
    if (event.key === "ArrowLeft") {
        console.log("gauche");
        score++;
        const scoreDiv = document.getElementById("score");
        scoreDiv.textContent = `Nombre de coups effectués : ${score}`;
        for (let i = 0; i < 4; i++) {
            a_bouge = left(i);
            if (a_bouge) {
                envoyer_message = true;
            }
        }
        if (envoyer_message == false) {
            info.textContent = "Information : le mouvement n'a pas eu lieu";
        }
        else {
            info.textContent = "Information : le mouvement a eu lieu";
        }
        nouveau_chiffre();
    }
}
document.addEventListener("keydown", haut);
document.addEventListener("keydown", bas);
document.addEventListener("keydown", gauche);
document.addEventListener("keydown", droite);
function getCell(i, j) {
    if (0 <= i && i <= 3 && j >= 0 && j <= 3) {
        const id_recherche = i.toString() + j.toString();
        const cell = document.getElementById(id_recherche);
        return cell;
    }
    else {
        return undefined;
    }
}
function setValue(i, j, value) {
    var cell = getCell(i, j);
    if (cell) {
        if (value == 0) {
            cell.textContent = "";
            associationCouleur(value, cell);
        }
        else {
            cell.textContent = value.toString();
            associationCouleur(value, cell);
        }
        return true;
    }
    else {
        return false;
    }
}
function getValue(i, j) {
    const cell = getCell(i, j);
    if (cell) {
        const string_value = cell.textContent;
        if (string_value != "") {
            const value = parseInt(string_value, 10);
            return value;
        }
        else {
            const value = 0;
            return value;
        }
    }
    else {
        return -1; // pas de cell existante pour ces i et j donnés
    }
}
function isEmpty(i, j) {
    const cell = getCell(i, j);
    if (cell) {
        const value = getValue(i, j);
        if (value == 0) {
            return true;
        }
        return false;
    }
    else {
        return false;
    }
}
console.assert(isEmpty(1, 2), "La cellule est vide");
console.log(typeof getCell(1, 2)); // affiche object
console.log(typeof getCell(1, 10)); // affiche undefined comme attendu
function newGame() {
    var random = Math.random();
    var chiffre1 = 0;
    var chiffre2 = 0;
    if (random <= 0.85) {
        chiffre1 = 2;
    }
    else {
        chiffre1 = 4;
    }
    random = Math.random();
    if (random <= 0.86) {
        chiffre2 = 2;
    }
    else {
        chiffre2 = 4;
    }
    const random1 = Math.floor(Math.random() * 4);
    const random2 = Math.floor(Math.random() * 4);
    var res = setValue(random1, random2, chiffre1);
    var random3 = Math.floor(Math.random() * 4);
    var random4 = Math.floor(Math.random() * 4);
    while (random3 == random1 && random4 == random2) {
        random3 = Math.floor(Math.random() * 4);
        random4 = Math.floor(Math.random() * 4);
    }
    res = setValue(random3, random4, chiffre2);
}
document.addEventListener('DOMContentLoaded', () => {
    newGame();
});
function moveRight(i) {
    var liste_valeurs_ligne = [];
    var au_moins_un_mouvement = false;
    for (let j = 0; j < 4; j++) {
        var valeur_case = getValue(i, j);
        if (valeur_case == -1) {
            return false;
        }
        liste_valeurs_ligne.push(valeur_case);
    }
    for (let j = liste_valeurs_ligne.length - 1; j > 0; j--) {
        if (liste_valeurs_ligne[j] == 0 && liste_valeurs_ligne[j - 1] != 0) { // on regarde si il y a dans la ligne un élément non nul à gauche d'un élément nul
            au_moins_un_mouvement = true;
            break;
        }
    }
    for (let j = liste_valeurs_ligne.length - 1; j >= 0; j--) {
        if (liste_valeurs_ligne[j] === 0) { // Si l'élément actuel est un zéro, le supprimer
            liste_valeurs_ligne.splice(j, 1);
        }
    }
    while (liste_valeurs_ligne.length < 4) {
        liste_valeurs_ligne.unshift(0); // rajouter en début des 0
    }
    for (let j = 0; j < liste_valeurs_ligne.length; j++) {
        setValue(i, j, liste_valeurs_ligne[j]);
    }
    if (au_moins_un_mouvement) {
        return true;
    }
    return false;
}
function moveLeft(i) {
    var liste_valeurs_ligne = [];
    var au_moins_un_mouvement = false;
    for (let j = 0; j < 4; j++) {
        var valeur_case = getValue(i, j);
        if (valeur_case == -1) {
            return false;
        }
        liste_valeurs_ligne.push(valeur_case);
    }
    for (let j = 0; j < liste_valeurs_ligne.length - 1; j++) {
        if (liste_valeurs_ligne[j] == 0 && liste_valeurs_ligne[j + 1] != 0) { // on regarde si il y a dans la ligne un élément non nul à droite d'un élément nul
            au_moins_un_mouvement = true;
            break;
        }
    }
    for (let j = liste_valeurs_ligne.length - 1; j >= 0; j--) {
        if (liste_valeurs_ligne[j] === 0) { // Si l'élément actuel est un zéro, le supprimer
            liste_valeurs_ligne.splice(j, 1);
        }
    }
    while (liste_valeurs_ligne.length < 4) {
        liste_valeurs_ligne.push(0); // rajouter en fin des 0
    }
    for (let j = 0; j < liste_valeurs_ligne.length; j++) {
        setValue(i, j, liste_valeurs_ligne[j]);
    }
    if (au_moins_un_mouvement) {
        return true;
    }
    return false;
}
function moveUp(j) {
    var liste_valeurs_colonne = [];
    var au_moins_un_mouvement = false;
    for (let i = 0; i < 4; i++) {
        var valeur_case = getValue(i, j);
        if (valeur_case == -1) {
            return false;
        }
        liste_valeurs_colonne.push(valeur_case);
    }
    for (let j = liste_valeurs_colonne.length - 1; j > 0; j--) {
        if (liste_valeurs_colonne[j] == 0 && liste_valeurs_colonne[j - 1] != 0) { // on regarde si il y a dans la colonne un élément non nul en-dessous d'un élément nul
            au_moins_un_mouvement = true;
            break;
        }
    }
    for (let i = liste_valeurs_colonne.length - 1; i >= 0; i--) {
        if (liste_valeurs_colonne[i] === 0) { // Si l'élément actuel est un zéro, le supprimer
            liste_valeurs_colonne.splice(i, 1);
        }
    }
    while (liste_valeurs_colonne.length < 4) {
        liste_valeurs_colonne.push(0); // rajouter en fin des 0
    }
    for (let i = 0; i < liste_valeurs_colonne.length; i++) {
        setValue(i, j, liste_valeurs_colonne[i]);
    }
    if (au_moins_un_mouvement) {
        return true;
    }
    return false;
}
function moveDown(j) {
    var liste_valeurs_colonne = [];
    var au_moins_un_mouvement = false;
    for (let i = 0; i < 4; i++) {
        var valeur_case = getValue(i, j);
        if (valeur_case == -1) {
            return false;
        }
        liste_valeurs_colonne.push(valeur_case);
    }
    for (let j = 0; j < liste_valeurs_colonne.length - 1; j++) {
        if (liste_valeurs_colonne[j] == 0 && liste_valeurs_colonne[j + 1] != 0) { // on regarde si il y a dans la colonne un élément non nul au-dessus d'un élément nul
            au_moins_un_mouvement = true;
            break;
        }
    }
    for (let i = liste_valeurs_colonne.length - 1; i >= 0; i--) {
        if (liste_valeurs_colonne[i] === 0) { // Si l'élément actuel est un zéro, le supprimer
            liste_valeurs_colonne.splice(i, 1);
        }
    }
    while (liste_valeurs_colonne.length < 4) {
        liste_valeurs_colonne.unshift(0); // rajouter en fin des 0
    }
    for (let i = 0; i < liste_valeurs_colonne.length; i++) {
        setValue(i, j, liste_valeurs_colonne[i]);
    }
    if (au_moins_un_mouvement) {
        return true;
    }
    return false;
}
function fusionRight(i) {
    var liste_valeurs_ligne = [];
    var au_moins_une_fusion = false;
    for (let j = 0; j < 4; j++) {
        var valeur_case = getValue(i, j);
        if (valeur_case == -1) {
            return false;
        }
        liste_valeurs_ligne.push(valeur_case);
    }
    for (let j = liste_valeurs_ligne.length - 1; j > 0; j--) {
        if (liste_valeurs_ligne[j] == liste_valeurs_ligne[j - 1] && liste_valeurs_ligne[j] != 0) {
            liste_valeurs_ligne[j] = liste_valeurs_ligne[j] * 2;
            liste_valeurs_ligne[j - 1] = 0;
            setValue(i, j, liste_valeurs_ligne[j]); // on met le droit du duo à la valeur du double
            setValue(i, j - 1, liste_valeurs_ligne[j - 1]); // on met le gauche du duo à 0
            score_joueur += liste_valeurs_ligne[j];
            const score_joueur_div = document.getElementById('score_joueur');
            score_joueur_div.textContent = "Score du joueur : " + score_joueur.toString();
            au_moins_une_fusion = true;
        }
    }
    if (au_moins_une_fusion) {
        return true;
    }
    return false;
}
function fusionLeft(i) {
    var liste_valeurs_ligne = [];
    var au_moins_une_fusion = false;
    for (let j = 0; j < 4; j++) {
        var valeur_case = getValue(i, j);
        if (valeur_case == -1) {
            return false;
        }
        liste_valeurs_ligne.push(valeur_case);
    }
    for (let j = 0; j < liste_valeurs_ligne.length - 1; j++) {
        if (liste_valeurs_ligne[j] == liste_valeurs_ligne[j + 1] && liste_valeurs_ligne[j] != 0) {
            liste_valeurs_ligne[j] = liste_valeurs_ligne[j] * 2;
            liste_valeurs_ligne[j + 1] = 0;
            setValue(i, j, liste_valeurs_ligne[j]); // on met le gauche du duo à la valeur du double
            setValue(i, j + 1, liste_valeurs_ligne[j + 1]); // on met le droit du duo à 0
            score_joueur += liste_valeurs_ligne[j];
            const score_joueur_div = document.getElementById('score_joueur');
            score_joueur_div.textContent = "Score du joueur : " + score_joueur.toString();
            au_moins_une_fusion = true;
        }
    }
    if (au_moins_une_fusion) {
        return true;
    }
    return false;
}
function fusionUp(j) {
    var liste_valeurs_ligne = [];
    var au_moins_une_fusion = false;
    for (let i = 0; i < 4; i++) {
        var valeur_case = getValue(i, j);
        if (valeur_case == -1) {
            return false;
        }
        liste_valeurs_ligne.push(valeur_case);
    }
    for (let i = 0; i < liste_valeurs_ligne.length - 1; i++) {
        if (liste_valeurs_ligne[i] == liste_valeurs_ligne[i + 1] && liste_valeurs_ligne[i] != 0) {
            liste_valeurs_ligne[i] = liste_valeurs_ligne[i] * 2;
            liste_valeurs_ligne[i + 1] = 0;
            setValue(i, j, liste_valeurs_ligne[i]); // on met le bas du duo à la valeur du double
            setValue(i + 1, j, liste_valeurs_ligne[i + 1]); // on met le haut du duo à 0
            score_joueur += liste_valeurs_ligne[i];
            const score_joueur_div = document.getElementById('score_joueur');
            score_joueur_div.textContent = "Score du joueur : " + score_joueur.toString();
            au_moins_une_fusion = true;
        }
    }
    if (au_moins_une_fusion) {
        return true;
    }
    return false;
}
function fusionDown(j) {
    var liste_valeurs_ligne = [];
    var au_moins_une_fusion = false;
    for (let i = 0; i < 4; i++) {
        var valeur_case = getValue(i, j);
        if (valeur_case == -1) {
            return false;
        }
        liste_valeurs_ligne.push(valeur_case);
    }
    for (let i = liste_valeurs_ligne.length - 1; i > 0; i--) {
        if (liste_valeurs_ligne[i] == liste_valeurs_ligne[i - 1] && liste_valeurs_ligne[i] != 0) {
            liste_valeurs_ligne[i] = liste_valeurs_ligne[i] * 2;
            liste_valeurs_ligne[i - 1] = 0;
            setValue(i, j, liste_valeurs_ligne[i]); // on met le haut du duo à la valeur du double
            setValue(i - 1, j, liste_valeurs_ligne[i - 1]); // on met le bas du duo à 0
            score_joueur += liste_valeurs_ligne[i];
            const score_joueur_div = document.getElementById('score_joueur');
            score_joueur_div.textContent = "Score du joueur : " + score_joueur.toString();
            au_moins_une_fusion = true;
        }
    }
    if (au_moins_une_fusion) {
        return true;
    }
    return false;
}
function right(i) {
    const res_deplacement = moveRight(i);
    const res_fusion = fusionRight(i);
    if (res_deplacement || res_fusion) { // s'il y a eu au moins une fusion ou un déplacement
        return true;
    }
    return false;
}
function left(i) {
    const res_deplacement = moveLeft(i);
    const res_fusion = fusionLeft(i);
    if (res_deplacement || res_fusion) { // s'il y a eu au moins une fusion ou un déplacement
        return true;
    }
    return false;
}
function up(j) {
    const res_deplacement = moveUp(j);
    const res_fusion = fusionUp(j);
    if (res_deplacement || res_fusion) { // s'il y a eu au moins une fusion ou un déplacement
        return true;
    }
    return false;
}
function down(j) {
    const res_deplacement = moveDown(j);
    const res_fusion = fusionDown(j);
    if (res_deplacement || res_fusion) { // s'il y a eu au moins une fusion ou un déplacement
        return true;
    }
    return false;
}
function test_si_fini() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (getValue(i, j) == 0) {
                return false; // il reste frocément une case vide
            }
        }
    }
    var tableau_valeurs = [];
    for (let i = 0; i < 4; i++) {
        var liste_valeurs_ligne = [];
        for (let j = 0; j < 4; j++) {
            var valeur_case = getValue(i, j);
            if (valeur_case == -1) {
                return false;
            }
            liste_valeurs_ligne.push(valeur_case);
        }
        tableau_valeurs.push(liste_valeurs_ligne);
    }
    console.log(tableau_valeurs);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (j != 3) {
                if (tableau_valeurs[i][j] == tableau_valeurs[i][j + 1]) {
                    return false;
                }
            }
            if (i != 3) {
                if (tableau_valeurs[i][j] == tableau_valeurs[i + 1][j]) {
                    return false;
                }
            }
        }
    }
    console.log('La partie est terminée');
    return true;
}
function nouveau_chiffre() {
    const info = document.getElementById("etat_partie");
    var bool_0 = false;
    for (let i = 0; i < 4; i++) {
        if (bool_0) {
            break;
        }
        for (let j = 0; j < 4; j++) {
            if (getValue(i, j) == 0) {
                bool_0 = true;
                break;
            }
        }
    }
    if (bool_0 == false) {
        return;
    }
    console.log('nouv chiffre');
    var random = Math.random();
    var chiffre = 0;
    if (random <= 0.85) {
        chiffre = 2;
    }
    else {
        chiffre = 4;
    }
    var random1 = Math.floor(Math.random() * 4);
    var random2 = Math.floor(Math.random() * 4);
    while (getValue(random1, random2) != 0) { // tant que la case dans laquelle on souhaite mettre un nouveau chiffre
        random1 = Math.floor(Math.random() * 4);
        random2 = Math.floor(Math.random() * 4);
    }
    setValue(random1, random2, chiffre);
    if (test_si_fini()) {
        info.textContent = "La partie est terminée";
    }
}
function associationCouleur(numero, element) {
    element.className = '';
    switch (numero) {
        case 0:
            element.classList.add('blanc');
        case 2:
            element.classList.add('beige');
            break;
        case 4:
            element.classList.add('vert-clair');
            break;
        case 8:
            element.classList.add('vert');
            break;
        case 16:
            element.classList.add('bleu-vert');
            break;
        case 32:
            element.classList.add('bleu');
            break;
        case 64:
            element.classList.add('bleu-fonce');
            break;
        case 128:
            element.classList.add('violet');
            break;
        case 256:
            element.classList.add('violet-fonce');
            break;
        case 512:
            element.classList.add('rose');
            break;
        case 1024:
            element.classList.add('rouge');
            break;
        case 2048:
            element.classList.add('rouge-fonce');
            break;
        default:
            break; // Aucune classe à ajouter pour les autres valeurs
    }
}
//# sourceMappingURL=app.js.map