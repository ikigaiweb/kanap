
const searchParams = new URLSearchParams(location.search);   // ***Recuperation de L'ID de l'URL * peut etre rajouter windows 
const productID = searchParams.get('id');                    // Cette technique me permet de localiser l'ID et donc dans la foction suivante n'appeler que lui !

async function infoProductApi (id) {
    const response = await fetch(`http://localhost:3000/api/products/${productID}`)
    .then (response => response.json())                                         // Promesse d'une reponse en Json  forme flechée
    .then (data => (product = data))                                           // avant  .then(function(data){ return (produits = data); })  * le ZZ c 'est juste parce que vs code n'aime pas juste "product"
    .catch (error => (error = console.log(`J'en connais Un qui s'est planté`)))  // pas besoin de redeclarer l'error mais bon pour l'entrainement des fonctions flechées     
    /*
 if(response.ok) {
    return response.json.son();
} 
else {
    console.log(response.error);
}
*/ 
}


async function productData() {
    const production = await infoProductApi ();                         // pour pouvoir mettre en place mon produit je dois d'abord appeler mes info provenant de l'API
    let kanapTitle = document.getElementById("title");                      //   Je les ai sorti de la fonction pour pouvoir m'en reservir + tard dans le "addtothecart"
    let kanapImg = document.getElementsByClassName("item__img")[0];         //   variable connécté a lemplacement de l'image
    let kanapPrice = document.getElementById("price");                      //   variable connécté a lemplacement du prix
    let kanapDescription = document.getElementById("description");          //   variable connécté a lemplacement de la description

    kanapImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;  // [0] me permet d'aller chercher le 1er element de la .class item__img... 
    kanapTitle.textContent = product.name;              // liaison entre #title et le nom du produit qui est sous le nom name dans le Json
    kanapPrice.textContent = product.price;             // liaison entre #price (html) et le nom du produit qui est dans le Json
    kanapDescription.textContent = product.description; // liaison entre #description (html) et le nom du produit qui est dans le Json 
    product.colors.forEach((color) => {                               //   La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
        kanapColor.innerHTML +=  `<option value="${color}">${color}</option>`;  // Les gabarits sont délimités par des caractères accent grave (` `) TOUT CE QUI RENVOIE UNE VALEUR VA ETRE REMPLACE PAR SA VALEUR
    })
  
}
    let kanapColor= document.querySelector("#colors");       // *** J'ai du creer une variable ( localise l'ID colors) qui me pemrmet de creer une fonction "each" et d'inserer la couleur ensuite    
    let addToTheCart = document.getElementById("addToCart");
    let quantity  = document.getElementById("quantity");

async function displayInfo () {                                       // Creation d'une fonction qui permet l'affichage dans la page
   await productData();

    
    addToTheCart.addEventListener('click', (event) => {   
        event.preventDefault();
        if (kanapColor.value == "") {                            // Je m'assure qu'il y est une valeur existante (couleur du canap voir plus haut)
            alert("Vous avez oubliez de choisir la couleur de votre nouveau canapé");
            
       } else if (quantity.value <= 0 || quantity.value > 100   ||  quantity.value == "" ) {                                   // Je m'assure que la quantité de canapé choisi soit differente de "0"
                alert("Vous avez oubliez de mentionner le nombre de canapé que vous désirez");
              
           }  else {    
            let kpColorV = kanapColor.value < 0 ;
            let qty = quantity.value;

            const kanapItem = {
                id: productID,
                img: product.imageUrl,
                alt: product.altTxt,
                description: product.description,
                name: product.name,
                quantity: qty,
                color: kpColorV
  };
  let basket = JSON.parse(localStorage.getItem("localStorageBasket"));  // permet d'obtenir la valeur de l'élément de stockage local spécifié ** basket sera le nom du stockage avec pour clé "localstorageBasket"

            addBasket = () => localStorage.setItem("localStorageBasket", JSON.stringify(basket));  // JSON.stringify va permetre de transformer un tableau ou objet complexe en chaine de charactere. *** le "basket" est la valeur
//                                                                                                    elle permet d'ajouter à l'emplacement de stockage ou mettre a jour sa valeur
//                                                                                                    le localstorage.setItem me specifie que "localStorageBasket" (sa clé) est le lieu de stockage où je vais prendre un fichier à ....
            nextLevel= () =>  {                                  // permet si tout est bon d'aller vers la page du panier
                  if (confirm("Etes vous pret à passer l'étape suivante") == true) {
                    location.href = "../html/cart.html";        // lien de la page panier
                } else {
                    alert("Vous pouvez continuer votre shopping");  // l'informer qu'elle peut continuer ses achats
                }
            }
            
            if (basket) {              // si mon stock nommé basket est vide on lui rajoute un tableau * si il y a deja un element on lui en rajoute un (push)

               // let foundProduct = basket.find((elt) => elt.productID === productID && elt.color === kpColorV); // .find va me permettre de trouver le produit avec l'id je recherche dans le panier
                // let foundProduct = basket.find(elt => elt.productID === productID && elt.color === kpColorV);  
                if (basket == null) {                 // si mon panier est vide alors il retournera un tableau vide
                    return [];
                } else {
                    basket.push(kanapItem);     //  si il y a deja un tableau ou un element alors on va rajouter (push)
                    addBasket();                
                    nextLevel();                // rappel des fonctions
                }
              }  
    }});
}

displayInfo();     // appel de la fonction display sinon elle n'apparaitra pas 



// Avec jQuery $(selector).action() pour assigner un élément à un évènement. 
// Les gabarits sont délimités par des caractères accent grave (` `) au lieu des apostrophes doubles ou simples. Les gabarits peuvent contenir des espaces réservés (placeholders). Ces espaces sont indiqués par le signe dollar ($) et des accolades (${expression}). Les expressions dans les espaces réservés et le texte compris dans ces espaces sont passés à une fonction.

/*

if (foundProduct) {

    //let addQuantity = parseInt(kanapItem.quantity) + parseInt(foundProduct.quantity);
  //  foundProduct.quantity = addQuantity;

    addBasket();
    nextLevel();
}
// else {
  //  basket.push(kanapItem);

    //addBasket();
   // nextLevel();

// }

} else {
basket = [];
basket.push(kanapItem);

addBasket();
nextLevel();
}


*/