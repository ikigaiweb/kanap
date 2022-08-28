const items = document.getElementById(`items`);    // lier l'ID à une constante
//const recuperationProduit = new XMLHttpRequest ();

             // Création d'une fonction + constante pour pouvoir l'apeller plus tard
function recuperationProduit () {
fetch('http://localhost:3000/api/products') // Permet de faire une requète Http / Fetch étant basé sur du Async et Await pas besoin de les rajouter
.then(function(response){                   // Promesse de reevoir une réponse de l'api 
    console.log(response);                  // verification que je recois bien la réponse
    return response.json();                 // on pourrait aussi .then (response => response.json())
})
.then(function(data){    
    implantationData(data);                   // 
})
.catch (function (Error){                               // Si ma promesse initiale est rejetée 'catch'
    console.log(`J'en connais Un qui s'est planté`);    // s'il apparait dans la console, il y a un problème
})
}
function implantationData (){
for (let i = 0; i < recuperationProduit.length; i++){
    items.appendChild(data[i])
}
}
function creationArticle () {
    let newArticle = document.createElement("article");
}
function creationImage () {
    let newImage = document.createElement("img");
    element.setAttribute("src", imageUrl);
    element.setAttribute("alt", altTxt);
    article.appendChild(newImage);
}
function creationTitre () {
    let newTitre = document.createElement("h3");
    newTitre.innerHTML = recuperationProduit.response[i].name;
    article.appendChild(newTitre);
    
}

function creationLien () {
    let newLien = document.createElement("a");
    newLien.href = `./product.html?id=${id}`;
    newLien.appendChild(articleProduct);
    return newLien
}



recuperationProduit ();





for (let i = 0; i < recuperationProduit.length; i++){
    let newArticle = document.createElement("article");
    let newImage = document.createElement("img");
    let newTitre = document.createElement("h3");
    let newDescription = document.createElement("p");

    newImage.innerHTML = recuperationProduit.response[i].img



const imagesKanap = document.getElementById('items');



fetch('http://localhost:3000/api/products')   // Appel de la methode Fetch avec l'Url des données dont j'ai besoin.
.then(res => res.json())         // on récupere une promesse avec "then" de reponse a notre demande.
.then(data => imagesKanap.src = data[0].url)  
 // je lui demande de me retourner une réponse en format Json (format le + utilisé).


// ÷+\\\\\      °°°°°°°

let imagesKanap01 = new Image ();
imagesKanap01.src = 'http://localhost:3000/images/kanap01.jpeg';
document.getElementById("items").innerHTML =  '<div><img src="http://localhost:3000/images/kanap01.jpeg" alt=""></img></div>' 
imagesKanap01.classList.add("items");
imagesKanap01.classList.add("article");
imagesKanap01.classList.add("img");


const imageskanap01 = imagesKanap[0];

const imageElement = document.createElement("img");
imageElement.src = imagesKanap01.imageUrl;
const nomElement = document.createElement("h2");
nomElement.innerText = imageskanap01.nom;
const prixElement = document.createElement("p");
prixElement.innerText = imageskanap01.prix;
const categorieElement = document.createElement("p");
categorieElement.innerText = imageskanap01.categorie;

const sectionFiches = document.getElementById("items");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);





const imageskanap = [];

const imageElement = document.createElement("img");
imageElement.src = imageskanap.imageUrl;
const nomElement = document.createElement("h2");
nomElement.innerText = imageskanap.nom;
const prixElement = document.createElement("p");
prixElement.innerText = imageskanap.prix;
const categorieElement = document.createElement("p");
categorieElement.innerText = imageskanap.categorie;

const sectionFiches = document.getElementById("items");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);




//let superkanap01 = JSON.parse('{"altTxt": "Photo d un canapé bleu, deux places", "colors": (3) ["Blue" "White" "Black"], "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "imageUrl": "http://localhost:3000/images/kanap01.jpeg", "sonNom": "Kanap Sinopé", "price": 1849, "_id": "107fb5b75607497b96722bda5b504926"}');
//console.log(superkanap01);



/*
let superkanap01 = {
altTxt: "Photo d'un canapé bleu, deux places",
colors: (3) ['Blue', 'White', 'Black'],
description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
imageUrl: "http://localhost:3000/images/kanap01.jpeg",
name: "Kanap Sinopé",
price: 1849,
_id: "107fb5b75607497b96722bda5b504926"
};
document.getElementById("items").innerHTML = superkanap01;

*/
//let superkanap01 = JSON.parse('{

//}');




/*
altTxt: "Photo d'un canapé bleu, deux places"
colors: (3) ['Blue', 'White', 'Black']
description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
imageUrl: "http://localhost:3000/images/kanap01.jpeg"
name: "Kanap Sinopé"
price: 1849
_id: "107fb5b75607497b96722bda5b504926"
[[Prototype]]: Object


*/
//let imagesKanap01 = "http://localhost:3000/images/kanap01.jpeg";



//document.getElementById ("items").innerHTML = "http://localhost:3000/images/kanap01.jpeg";

//let ccc = document.getElementById("items");
//ccc.innerHTML = "Axelle est mon ainée ";
//ccc.style.backgroundColor = "green";


/*

document.querySelector("h1").style.backgroundColor = "red";

ccc.addEventListener('click', function() {
    console.log(this);
    this.style.backgroundColor = "pink";
})


const promesse = new Promise(function(resolve, reject){
    resolve ('woooow Super');
    reject (" Hoo la merde")
})
promesse 
.then(function(dataResolve) {
    console.log (dataResolve);
})
.catch(function(dataReject){
    console.log(dataReject);
})
*/







/*
const items = document.getElementById(`items`);    // lier l'ID à une constante
//const recuperationProduit = new XMLHttpRequest ();

             // Création d'une fonction + constante pour pouvoir l'apeller plus tard
function recuperationProduit () {
fetch('http://localhost:3000/api/products') // Permet de faire une requète Http / Fetch étant basé sur du Async et Await pas besoin de les rajouter
.then(function(response){                   // Promesse de reevoir une réponse de l'api 
    console.log(response);                  // verification que je recois bien la réponse
    return response.json();                 // on pourrait aussi .then (response => response.json())
})
.then(function(data){    
    implantationData(data);                   // 
})
.catch (function (Error){                               // Si ma promesse initiale est rejetée 'catch'
    console.log(`J'en connais Un qui s'est planté`);    // s'il apparait dans la console, il y a un problème
})
}
function implantationData (){
for (let i = 0; i < recuperationProduit.length; i++){
    items.appendChild(data[i])
}
}
function creationArticle () {
    let newArticle = document.createElement("article");
}
function creationImage () {
    let newImage = document.createElement("img");
    element.setAttribute("src", imageUrl);
    element.setAttribute("alt", altTxt);
    article.appendChild(newImage);
}
function creationTitre () {
    let newTitre = document.createElement("h3");
    newTitre.innerHTML = recuperationProduit.response[i].name;
    article.appendChild(newTitre);
    
}

function creationLien () {
    let newLien = document.createElement("a");
    newLien.href = `./product.html?id=${id}`;
    newLien.appendChild(articleProduct);
    return ne
}



recuperationProduit ();

*/
/*

const items = document.getElementById(`items`);    
//const recuperationProduit = new XMLHttpRequest ();

            
function recuperationProduit () {
fetch('http://localhost:3000/api/products') 
.then(function(response){                  
    console.log(response);                 
    return response.json();               
})
.then(function(data){    
    implantationData(data);                   // 
})
.catch (function (Error){                               // Si ma promesse initiale est rejetée 'catch'
    console.log(`J'en connais Un qui s'est planté`);    // s'il apparait dans la console, il y a un problème
})
}
function implantationData (){
for (let i = 0; i < recuperationProduit.length; i++){
    items.appendChild(data[i])
}

    let newArticle = document.createElement("article");
    let newImage = document.createElement("img");
    let newTitre = document.createElement("h3");
    let newDescription = document.createElement("p");

    newImage.innerHTML = recuperationProduit.response[i].imageUrl;
    newDescription.innerHTML = recuperationProduit.response[i].description;
    newTitre.innerHTML = recuperationProduit.response[i].name;

    newArticle.appendChild(newDescription);
    newArticle.appendChild(newTitre);
    items.appendChild(newArticle);

   

};    // Tant qu'il y aura des "i" il continuera (boucle for) 

recuperationProduit ();    */
/*
function inserationDesDatas(data) {                    // Fonction avec boucle 'for' qui me permet ... tant que ...
    for (let i = 0; i < data.length; i++)    // Tant qu'il y aura des "i" il continuera (boucle for)                 
        console.log("la boucle marche");
      }
    */
  /*
  const imageElement = document.createElement("img");
imageElement.setAttribute("src", URL);
items.appendChild(imageElement);

const nomElement = document.createElement("h2");
items.appendChild(nomElement);

const descriptionElement = document.createElement("p");
items.appendChild(descriptionElement);
*/



