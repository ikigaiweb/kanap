//Récupération des produits stockés dans le localstorage
async function infoProductApis(id) {                                           // on rapelle l'API car certaines info ne se trouve pas dans le localStorage  ** doit être lié a id  
    let response = await fetch("http://localhost:3000/api/products/" + id)     // je recherche à avoir l'ID de chaque produit qui se trouve dans l'API
    if (response.ok) {                                                         // si aucune erreur dans ma demande
        return response.json();                                                // il me renvoie la réponse sous format JSON
    } else {                                                                   // sinon 
        console.log(`J'en connais Un qui s'est planté`);                       // il m'informa dans la console qu il y a un bintzz
    }
}

async function displayCart() {                                                 // Création d'une fonction qui me donnera mes infos sur ecran

    let basket = JSON.parse(localStorage.getItem("localBasket"));              // On rapelle le LocalStorage (ou se trouve tout les canapé "commandés")
    //console.log(basket);

    for (let i = 0; i < basket.length; i++) {                                  // tant que I sera inferieur a la longueur du tableau , il effectura la fonction
        let item = basket[i];                                                  // [i] element du tableau de basket
        let info = await infoProductApis(item.id);                             // je rapelle dans cette fonction les infos (id) qui sont dans l'API
        console.log(info);                                                     // Me donne toutes les infos de chaque kanap demandé
        console.log(item.quantity);                                            // Me donne la quantité de chaque Kanapé

        // On "recree les infos données dans le DOM 
        // Article
        const cartItems = document.getElementById("cart__items");              // on localise #"cart__items" on l'associe à une variable
        const article = document.createElement("article");                     // création de l'article on l'associe à une variable
        article.classList.add("cart__item");                                   // on lui rajoute une <class: ...>
        article.setAttribute("data-id", item.id);                              // on lui donne son attribut ID 
        article.setAttribute("data-color", item.color);                        // 
        cartItems.appendChild(article);                                        // # cart__items a pour enfant "article"

        const cartItemImg = document.createElement("div");                     // création d'une DIV on l'associe à une variable
        cartItemImg.classList.add("cart__item__img");                          // on lui rajoute une <class: ...>
        article.appendChild(cartItemImg);                                      // article a pour enfant cartItemImg

        const img = document.createElement("img");                             // création de <img> on l'associe à une variable
        cartItemImg.appendChild(img);                                          // cartItemImg a pour enfant img
        img.src = info.imageUrl;                                               // le src de img est dans l'API sous le nom imageUrl 
        img.alt = info.altTxt;

        const cartItemContent = document.createElement("div");                 // création d'une DIV on l'associe à une variable
        cartItemContent.classList.add("cart__item__content");                  // on lui rajoute une <class: ...>
        article.appendChild(cartItemContent);                                  // article a pour enfant cartItemContent

        const cartItemContentDescription = document.createElement("div");      // création d'une DIV on l'associe à une variable
        cartItemContentDescription.classList.add("cart__item__content__description");// on lui rajoute une <class: ...>
        cartItemContent.appendChild(cartItemContentDescription);               // cartItemContent a pour enfant cartItemContentDescription

        const title = document.createElement("h2");                            // création <H2> on l'associe à une variable
        title.innerHTML = info.name;                                           // le variable "title" on va l'ecrire = son "name" qui provient de l'API
        cartItemContentDescription.appendChild(title);                         // cartItemContentDescription a pour enfant title

        const couleur = document.createElement("p");                           // création <p> on l'associe à une variable
        couleur.innerHTML = item.color;
        cartItemContentDescription.appendChild(couleur);                       // cartItemContentDescription a pour enfant couleur

        const prix = document.createElement("p");                              // création <p> on l'associe à une variable
        prix.innerHTML = info.price + " €";
        cartItemContentDescription.appendChild(prix);                          // cartItemContentDescription a pour enfant prix

        const cartItemContentSettings = document.createElement("div");         // création d'une DIV on l'associe à une variable
        cartItemContentSettings.classList.add("cart__item__content__settings");// on lui rajoute une <class: ...>
        cartItemContent.appendChild(cartItemContentSettings);                  // cartItemContent a pour enfant cartItemContentSettings

        const cartItemContentSettingsQuantity = document.createElement("div"); // création d'une DIV on l'associe à une variable
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");// on lui rajoute une <class: ...>
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);  // cartItemContentSettings a pour enfant cartItemContentSettingsQuantity

        const quantite = document.createElement("p");                          // création <p> on l'associe à une variable
        quantite.innerHTML = "Qté : ";
        cartItemContentSettingsQuantity.appendChild(quantite);                 // cartItemContentSettingsQuantity a pour enfant quantite

        const itemQuantity = document.createElement("input");                  // création <input> on l'associe à une variable
        itemQuantity.type = "number";
        itemQuantity.classList.add("itemQuantity");                            // on lui rajoute une <class: ...>
        itemQuantity.name = "itemQuantity";
        itemQuantity.min = "1";
        itemQuantity.max = "100";
        itemQuantity.pattern = "[0123456789]{3}";
        itemQuantity.value = item.quantity;
        cartItemContentSettingsQuantity.appendChild(itemQuantity);             // cartItemContentSettingsQuantity a pour enfant itemQuantity

        const cartItemContentSettingsDelete = document.createElement("div");   // création d'une DIV on l'associe à une variable
        cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");// on lui rajoute une <class: ...>
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);    // cartItemContentSettings a pour enfant cartItemContentSettingsDelete

        const deleteItems = document.createElement("p");                       // création <p> on l'associe à une variable
        deleteItems.classList.add("deleteItem");                               // on lui rajoute une <class: ...>
        deleteItems.innerHTML = "Supprimer";
        cartItemContentSettingsDelete.appendChild(deleteItems);                // cartItemContentSettingsDelete a pour enfant deleteItems

        // *** event listener pour supprimer un article (pas besoin de fair eune focntion pour les rajouter, idem pour update)
        deleteItems.addEventListener("click", (event) => {                     // ****** on va écouter le click de chaque element du tableau
            let basket = JSON.parse(localStorage.getItem("localBasket"));      // rappel de la sauvegarde car on est dans uen nouvelle fonction
                                      
            let article = event.target.closest("article");                     //on recupére l'article le plus proche (donc le parent)
            //on récupére les data-id et color                                 //pas besoin de preventdefault, c'est bouton ne font ps partie d'un formulaire, il n'ont pas d'action de base, donc rien a arreter
            let id = article.dataset.id;                                       // ***
            let color = article.dataset.color;                                 // ***
            if (confirm("etes vous sûr de vouloir supprimer cet article ? ") == true) {
                let newBasket = basket.filter(element => element.id !== id || element.color !== color); // Je filtre pour ne garder que ce que je veux
                localStorage.setItem("localBasket", JSON.stringify(newBasket));// j'enregistre le nouveau resultat en fonction du variable juste audessus
                
                article.remove();                                              // je supprime l'article qui contient le produit pour supprimer sa ligne sans recharger
                refreshTotal();                                                // j appelle la fonction pour mettre à jour le total
            }
        })
        itemQuantity.addEventListener("change", (event) => {                   // ***
            
            let basket = JSON.parse(localStorage.getItem("localBasket"));      // Nouvelle fonction, ont a pas accès au ancienne info donc je la reappelle
            let article = event.target.closest("article");                     // Je recupére l'article le plus proche (donc le parent)
            let id = article.dataset.id;                                       // je récupére les data-id ENCORE une fois puisque nouvelle fonction
            let color = article.dataset.color;                                 // je récupére les data-color ENCORE une fois puisque nouvelle fonction
            console.log(id);                                                   // cela me donne l'ID du canapé dont je change la quantité
            console.log(color);                                                // cela me donne la couleur du canapé dont je change la quantité

            // J'ecoute le changement de la variable, du coup, l'event déclanché contient la valeur
            let newValue = event.target.value; // **************je dois cree un let car en 1 fois il bloque donc en 2 fois grace au let

            
            basket.forEach(element => {                                        // je parcours le panier
                
                if (element.id == id && element.color == color) {              // si je trouve meme id et color c'est bon
                    if (newValue > 0 && newValue < 101) {                      // si newvalue est entre 1 et 100
                        element.quantity = newValue;                           // alors mise a jour de newValue
                    } else {
                        alert("quantité invalide")                             //messagae d'alerte en cas de quantité invalide
                    }
                }
            });
           
            localStorage.setItem("localBasket", JSON.stringify(basket));       //*** pas de fonction saveBasket, une focntion pour 1 ligne est contreproductif, le but est de reduire le nombre de ligne, pas l'augmenter
    
            refreshTotal();                                                    // Mise a jour du total après modification

        })
    }
    
    refreshTotal()                                                             // je remets a jour le total pour la premiere fois en dehors du for pour eviter qu'il ne soit appeler a chaque article
}
displayCart();                                                                 // je rapelle la fonction entiere

async function refreshTotal() {                                                // création d'une fonction refresh pour mettre a jour le total
    let basket = JSON.parse(localStorage.getItem("localBasket"));              //basket n'existe pas dans cette fonction du coup ont le récupére
    let screenTotalQuantity = document.getElementById("totalQuantity");
    let totalValue = 0;                                                        // je declare la variable totalValue pour m'en servir plus tard
    for (let i = 0; i < basket.length; i++) {                                  // boucle for pour aller chercher l'info 
        value = basket[i].quantity;                                            // value = les quantités de chaques éléments se trouvanyt dans le localStorage
        //console.log(value);  
        totalValue += parseInt(value);                                         // la méthode "parseInt" analyse une valeur sous forme de chaîne et renvoie le premier entier.
        console.log(totalValue);                                               // je jetes un coup d'oeil 
    }
    screenTotalQuantity.innerText = totalValue;                                // j'ecris a l''ecran ce total

    let totalPrice = 0;                                                        // je declare cette variable pour m'en servir plus tard
    for (let i = 0; i < basket.length; i++) {                                  // tant que I sera inferieur a la longueur du tableau , il effectura la fonction
        item = basket[i];                                                      // [i] element du tableau de basket que j'ai rapelé car plus haut avec toutes les infos de chaques canapés
        info = await infoProductApis(item.id);                                 // je rapelle dans cette fonction les infos (id) qui sont dans l'API

        let valeur = item.quantity;                                            // je declare la variable = la quantité de chaque kanapé
        console.log(item); 
        totalPrice += valeur * info.price;                                     // totalPrice A chaque kanapé j'affecte = quantité de canapé X son prix 
        finalTotal = parseInt(totalPrice);                                     // dont seul les chiffres m'interessent
    }
    document.querySelector("#totalPrice").innerText = finalTotal;              // j'ecris ce chiffre là où l'ID me le demande
}


/* ************************** FORMULAIRE ****************************************** */

const orderForm = document.getElementsByClassName("cart__order__form__question");// creation variable lié à #  dans le HTML
let firstName = document.getElementById("firstName");                          // creation variable lié à #firstName  dans le HTML
let lastName = document.getElementById("lastName");                            // creation variable lié à #lastName  dans le HTML
let address = document.getElementById("address");                              // creation variable lié à #address  dans le HTML   
let city = document.getElementById("city");                                    // creation variable lié à #city  dans le HTML
let email = document.getElementById("email");                                  // creation variable lié à #email  dans le HTML
let submit = document.getElementById("order");                                 // creation variable lié à #order  dans le HTML c'est le BOUTON D'ENVOI

let firstNameErr = document.getElementById("firstNameErrorMsg");               // creation variable lié à # firstName ERROR dans le HTML
let lastNameErr = document.getElementById("lastNameErrorMsg");                 // creation variable lié à #lastName  ERROR dans le HTML
let addressErr = document.getElementById("addressErrorMsg");                   // creation variable lié à #address  ERROR dans le HTML
let cityErr = document.getElementById("cityErrorMsg");                         // creation variable lié à #city  ERROR dans le HTML
let emailErr = document.getElementById("emailErrorMsg");                       // creation variable lié à #email  ERROR dans le HTML

/* ************************** REGEX *************************************** */

let nameRegExp = /^[a-zA-Zéêëèîïâäàçù ,.'-]{0,70}$/;                           // regex pour les lettres de 0 a 70 caractères
let emailRegExp = /^([a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}){0,90}$/; // regex alphanumerique + @ et .  pour le mail
let addressRegExp = /^[a-zA-Zéêëèîïâäàçù0-9 ,.'-]{0,50}$/;                     // regex alphanumerique pour les adresses

/* ************************** FIRST NAME *************************************** */

let firstNameVal = firstName.value;

firstName.addEventListener("input", function () {                              //  création d'un addEventListener pour l'input du prénom
    validateFirstName();                                                       //
});

let testFirstName = nameRegExp.test(firstName.value);                          //

function validateFirstName() {                                                 //
    let testFirstName = nameRegExp.test(firstName.value);                      // 
    if (testFirstName == false) {                                              //
        firstNameErr.innerText = "Veuillez saisir svp votre prénom correct";   //
        return false;                                                          //
    } else {
        firstNameErr.innerText = "";                                           //
        return true;                                                           //
    }
}
validateFirstName();                                                           // 

/* ************************** LAST NAME *************************************** */

let lastNameVal = lastName.value;     /* *********************/

lastName.addEventListener("input", function () {                                //  création d'un addEventListener pour l'input du nom
    validateLastName();
});

function validateLastName() {
    let testLastName = nameRegExp.test(lastName.value);
    if (testLastName == false) {
        lastNameErr.innerText = "Veuillez saisir svp votre nom correct";
        return false;
    } else {
        lastNameErr.innerText = "";
        return true;
    }
}
validateLastName();

/* **************************** ADDRESS ************************************* */
let addressVal = address.value;

address.addEventListener("input", function () {
    validateAddress();
});

function validateAddress() {
    let testaddress = addressRegExp.test(address.value);
    if (testaddress == false) {
        addressErr.textContent = "Veuillez saisir correctement votre adresse svp ";
        return false;
    } else {
        addressErr.textContent = "";
        return true;
    }
}
validateAddress();

/* ***************************** TOWN ************************************ */

city.addEventListener("input", function () {
    validateCity();
});
let cityVal = city.value;

function validateCity() {
    let testCity = nameRegExp.test(city.value);
    if (testCity == false) {
        cityErr.textContent = "Veuillez ecrire le nom exact de votre ville svp ";
        return false;
    } else {
        cityErr.textContent = "";
        return true;
    }
}
validateCity();

/* ***************************** E-MAIL ************************************ */

email.addEventListener("input", function () {
    validateEmail();
});
let emailVal = email.value;

function validateEmail() {
    let testEmail = emailRegExp.test(email.value);
    if (testEmail == false) {
        emailErr.textContent = "Veuillez saisir correctement votre E-mail svp";
        return false;
    } else {
        emailErr.textContent = "";
        return true;
    }
}
validateEmail();

/* ***************************** FIN DU FORMULAIRE ************************************ */

/* ***************************** BOUTON ORDER ************************************ */

submit.addEventListener("click", function (event) {                            // *** je crée une "ecoute" du click 
        event.preventDefault();                                                // *** pour l'instant tu ne fais rien 

        function submitButton() {                                              // Creation d'une fonction avec touytes les conditions qui permettre de confirmer ma commande

            function emptyFirstName() {                                        //
                if (firstName.value == "") {                                   // si l'input est vide (sa valeur) 
                    firstNameErr.textContent = "Vous m'avez oublié";           // alors dessous j'ecris ....
                    return false;                                              // je "l'empeche" d'aller plus loin en l'annoncant faux
                } else {
                    firstNameErr.textContent = "";                             // si il rempli les conditions a lors je retire le texte
                    return true;                                               // et je laisse passer a l'etape suivante
                }
            }
            let emptyFirstNameVar = emptyFirstName();                          // Je n'oublie pas de rappeler la fonction en lui donnant un nom 

            function emptyLastName() {
                if (lastName.value == "") {
                    lastNameErr.textContent = "Vous m'avez oublié";
                    return false;
                } else {
                    lastNameErr.textContent = "";
                    return true;
                }
            }
            let emptyLastNameVar = emptyLastName();

            function emptyAddress() {
                if (address.value == "") {
                    addressErr.textContent = "Vous m'avez oublié";
                    return false;
                } else {
                    addressErr.textContent = "";
                    return true;
                }
            }
            let emptyAddressVar = emptyAddress();

            function emptyCity() {
                if (city.value == "") {
                    cityErr.textContent = "Vous m'avez oublié";
                    return false;
                } else {
                    cityErr.textContent = "";
                    return true;
                }
            }
            let emptyCityVar = emptyCity();

            function emptyEmail() {
                if (email.value == "") {
                    emailErr.textContent = "Vous m'avez oublié";
                    return false;
                } else {
                    emailErr.textContent = "";
                    return true;
                }
            }
            let emptyEmailVar = emptyEmail();

            let basket = JSON.parse(localStorage.getItem("localBasket"));      // je rapelle mon localStorage pour avoir des infos dont j'ai besoin
            if (basket == null || basket == 0) {                               // avant d'aller plus loin je m'assure que le panier n 'est pas vide
                alert("Il semblerait que vous ayez oublier de completer votre panier. Desirez vous retourner sur la page d'acceuil ?")
                location.href = "index.html";                                  // si elle confirme elel sera revoyer a la page d'acceuil (son panier etant vide)

            } else if (emptyFirstNameVar != true || emptyLastNameVar != true || emptyAddressVar != true || emptyCityVar != true || emptyEmailVar != true) {
                return false                                                   // si un des input du formulaire est vide alors il ne sera pas accepté


            } else {

                function recupIdProduct() {
                    let idProduct = [];                                        // on va devoir recreer un nouveau tableau 
                    for (let i = 0; i < basket.length; i++) {                  // dans lequel on incrementer chaque produit commander
                        let eachProductId = basket[i].id;                      // je nomme = chaque i id qui se trouve dans le basket               
                        idProduct.push(eachProductId);                         // je "pousse" dans mon tableau (derniere ligne) chaque ID de chaque produit
                    }
                    return idProduct                                           // le tableau revient rempli des id des elements commandés
                }
                let recupArray = recupIdProduct();                             // je rapelle la fonction tout en lui insignant une variable pour la réutiliser apres

                let recupInfo = {                                              // je crée une variable qui me permet de recuperer les infos du formulaire dont j'ai besoin
                    contact: {                                                 // Je crée un objet
                        firstName: firstName.value,                            // le prenom ecrit par le client sera gardé sous le 'nom' firstName
                        lastName: lastName.value,                              // le nomecrit par le client sera gardé sous 'nom' lastName
                        address: address.value,                                // l'adresse ecrite par le client sera gardé sous 'nom' address
                        city: city.value,                                      // la ville ecrite par le client sera gardé sous 'nom' city
                        email: email.value                                     // l'email ecrit par le client sera gardé sous 'nom' email
                    },
                    products: recupArray,                                      // je récupere l'id de chaque produit sous le nom products
                };

                const request = {                                              // ma requete Post
                    method: "POST",                                            // methode "post"
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(recupInfo)                            //
                };

                fetch("http://localhost:3000/api/products/order", request)     //
                    .then(function (response) {                                //
                        return response.json();                                //
                    })
                    .then(data => {                                            //
                        console.log(data.orderId);                             //
                        // localStorage.clear();                               // une fois la commande enregistré mon panier se vide
                        location.href = "confirmation.html?orderId=" + data.orderId; // Je meretrouve redirigé vers la page "confirmation.html" avce l'id de la commande (numero de bon de commande)
                    }).catch(error => {                                        // et oui il faut un catch si il ya une promesse then 
                        console.log(error);                                    // afficher l'erreur
                    })
            }

        }
        submitButton()                                                         // rappel de la fonction qui me permet de confirmer ma commande
    }

)