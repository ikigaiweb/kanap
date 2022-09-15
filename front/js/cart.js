//Récupération des produits stockés dans le localstorage
async function infoProductApis(id) { // on rapelle l'API car certaines info ne se trouve pas dans le localStorage  ** doit être lié a id  
    let response = await fetch("http://localhost:3000/api/products/" + id)
    if (response.ok) {
        return response.json();
    } else {
        console.log(`J'en connais Un qui s'est planté`);
    }
}

async function displayCart() {

    let basket = JSON.parse(localStorage.getItem("localBasket")); // On rapelle le LocalStorage (ou se trouve tout les canapé "commandés")
    //console.log(basket);

    for (let i = 0; i < basket.length; i++) { // tant que I sera inferieur a la longueur du tableau , il effectura la fonction
        let item = basket[i]; // [i] element du tableau de basket
        let info = await infoProductApis(item.id); // je rapelle dans cette fonction les infos (id) qui sont dans l'API
        console.log(info);
        console.log(item.quantity);


        // On "recree les infos données dans le DOM 

        // Article
        const cartItems = document.getElementById("cart__items"); // on localise 
        const article = document.createElement("article"); // création de l'article
        article.classList = "cart__item"; // on lui informe de sa class
        article.setAttribute("data-id", item.id); // on lui donne son attribut ID 
        article.setAttribute("data-color", item.color);
        cartItems.appendChild(article); // # cart__items a pour enfant "article"

        const cartItemImg = document.createElement("div");
        cartItemImg.classList = "cart__item__img";
        article.appendChild(cartItemImg);

        const img = document.createElement("img");
        cartItemImg.appendChild(img);
        img.src = info.imageUrl; // le src de img est dans l'API sous le nom imageUrl 
        img.alt = info.altTxt;

        const cartItemContent = document.createElement("div");
        cartItemContent.classList = "cart__item__content";
        article.appendChild(cartItemContent);

        const cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList = "cart__item__content__description";
        cartItemContent.appendChild(cartItemContentDescription);

        const title = document.createElement("h2");
        title.innerHTML = info.name; // le variable "title" on va l'ecrire = son "name" qui provient de l'API
        cartItemContentDescription.appendChild(title);

        const couleur = document.createElement("p");
        couleur.innerHTML = item.color;
        cartItemContentDescription.appendChild(couleur);

        const prix = document.createElement("p");
        prix.innerHTML = info.price + " €";
        cartItemContentDescription.appendChild(prix);

        const cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.classList = "cart__item__content__settings";
        cartItemContent.appendChild(cartItemContentSettings);

        const cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.classList = "cart__item__content__settings__quantity";
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

        const quantite = document.createElement("p");
        quantite.innerHTML = "Qté : ";
        cartItemContentSettingsQuantity.appendChild(quantite);

        const itemQuantity = document.createElement("input");
        itemQuantity.type = "number";
        itemQuantity.classList = "itemQuantity";
        itemQuantity.name = "itemQuantity";
        itemQuantity.min = "1";
        itemQuantity.max = "100";
        itemQuantity.pattern = "[0123456789]{3}";
        itemQuantity.value = item.quantity;
        cartItemContentSettingsQuantity.appendChild(itemQuantity);

        const cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList = "cart__item__content__settings__delete";
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

        const deleteItems = document.createElement("p");
        deleteItems.classList.add("deleteItem");
        deleteItems.innerHTML = "Supprimer";
        cartItemContentSettingsDelete.appendChild(deleteItems);

        //event listener pour supprimer un article (pas besoin de fair eune focntion pour les rajouter, idem pour update)
        deleteItems.addEventListener("click", (event) => { // on va écouter le click de chaque element du tableau
            //Nouvelle fonction, ont a pas accès au ancienne info
            let basket = JSON.parse(localStorage.getItem("localBasket"));
            //pas besoin de preventdefault, c'est bouton ne font ps partie d'un formulaire, il n'ont pas d'action de base, donc rien a arreter
            //on recupére l'article le plus proche (donc le parent)
            let article = event.target.closest("article");
            //on récupére les data-id et color
            let id = article.dataset.id;
            let color = article.dataset.color;
            if (confirm("etes vous sûr de vouloir supprimer cet article ? ") == true) {
                let newBasket = basket.filter(element => element.id !== id || element.color !== color); // Je filtre pour ne garder que ce que je veux
                localStorage.setItem("localBasket", JSON.stringify(newBasket)); // j'enregistre le nouveau resultat en fonction du variable juste audessus
                //on supprime l'article qui contient le produit pour supprimer sa ligne sans recharger
                article.remove();
                //on appel la fonction pour mettre a jour le total
                refreshTotal();
            }
        })
        itemQuantity.addEventListener("change", (event) => {
            //Nouvelle fonction, ont a pas accès au ancienne info
            let basket = JSON.parse(localStorage.getItem("localBasket"));
            //on recupére l'article le plus proche (donc le parent)
            let article = event.target.closest("article");
            //on récupére les data-id et color
            let id = article.dataset.id;
            let color = article.dataset.color;
            console.log(id);
            console.log(color);

            //on ecoute le changement de la variable, du coup, l'event déclanché contient la valeur
            let newValue = event.target.value; // je dois cree un let car en 1 fois il bloque donc en 2 fois grace au let

            //on parcours le panier
            basket.forEach(element => {
                //si on toruve meme id et color c'est bon
                if(element.id == id && element.color == color){
                    if (newValue > 0 && newValue < 101) {
                        element.quantity = newValue;
                    } else {
                        //messagae d'alerte en cas de quantité invalide
                        alert("quantité invalide")
                    }
                }
            });
            //pas de fonction saveBasket, une focntion pour 1 ligne est contreproductif, le but est de reduire le nombre de ligne, pas l'augmenter :D
            localStorage.setItem("localBasket", JSON.stringify(basket));
            //ont met a jour le total après modification
            refreshTotal();
        }
        )
    }
    //ont met a jour le total pour la premiere fois en dehors du for pour eviter qu'il ne soit appeler a chaque article
    refreshTotal()
} displayCart();

//une fonction refresh pour mettre a jour le total
async function refreshTotal() {
    //basket n'existe pas du coup ont le récupére
    let basket = JSON.parse(localStorage.getItem("localBasket"));
    let screenTotalQuantity = document.getElementById("totalQuantity");
    // await itemQuantityModify();
    let totalValue = 0;
    for (let i = 0; i < basket.length; i++) {
        value = basket[i].quantity;
        //console.log(value);  
        totalValue += parseInt(value);
        console.log(totalValue);
    }
    screenTotalQuantity.innerText = totalValue;

    let totalPrice = 0;
    for (let i = 0; i < basket.length; i++) { // tant que I sera inferieur a la longueur du tableau , il effectura la fonction
        item = basket[i]; // [i] element du tableau de basket
        info = await infoProductApis(item.id); // je rapelle dans cette fonction les infos (id) qui sont dans l'API

        let valeur = item.quantity;
        totalPrice += valeur * info.price;
        finalTotal = parseInt(totalPrice);
    }
    document.querySelector("#totalPrice").innerText = finalTotal;
}


/* ************************** FORMULAIRE ****************************************** */

const orderForm = document.getElementsByClassName("cart__order__form__question");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city"); // je lie la variable à son ID dans le HTML 
let email = document.getElementById("email");
let submit = document.getElementById("order");

let firstNameErr = document.getElementById("firstNameErrorMsg"); // je lie la variable à son ID ERROR dans le HTML 
let lastNameErr = document.getElementById("lastNameErrorMsg");
let addressErr = document.getElementById("addressErrorMsg");
let cityErr = document.getElementById("cityErrorMsg");
let emailErr = document.getElementById("emailErrorMsg");

/* ************************** REGEX *************************************** */

let nameRegExp = /^[a-zA-Zéêëèîïâäàçù ,.'-]{0,70}$/;
let emailRegExp = /^([a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}){0,90}$/;
let addressRegExp = /^[a-zA-Zéêëèîïâäàçù0-9 ,.'-]{0,50}$/;

/* ************************** FIRST NAME *************************************** */

firstName.addEventListener("input", function () {
    validateFirstName();
});

let testFirstName = nameRegExp.test(firstName.value);
function validateFirstName() {
    let testFirstName = nameRegExp.test(firstName.value);
    if (testFirstName == false) {
        firstNameErr.innerText = "Veuillez saisir svp votre prénom correct";
        return false;
    } else {
        firstNameErr.innerText = "";
        return true;
    }
}
validateFirstName();

/* ************************** LAST NAME *************************************** */

let lastNameVal = lastName.value;

lastName.addEventListener("input", function () {
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

submit.addEventListener("click", function (event) { // je crée une "ecoute" du click 
    event.preventDefault(); // pour l'instant tu ne fais rien 

    function submitButton() {

        function emptyFirstName() {
            if (firstName.value == "") { // si l'input est vide (sa valeur) 
                firstNameErr.textContent = "Vous m'avez oublié"; // alors dessous j'ecris ....
                return false; // je "l'empeche" d'aller plus loin en l'annoncant faux
            } else {
                firstNameErr.textContent = ""; // si il rempli les conditions a lors je retire le texte
                return true; // et je laisse passer a l'etape suivante
            }
        }
        let emptyFirstNameVar = emptyFirstName(); // Je n'oublie pas de rappeler la fonction en lui donnant un nom 

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


        if (basket == null || basket == 0) { // avant d'aller plus loin je m'assure que le panier n 'est pas vide
            alert("Il semblerait que vous ayez oublier de completer votre panier. Desirez vous retourner sur la page d'acceuil ?")
            location.href = "index.html";

        } else if (emptyFirstNameVar != true || emptyLastNameVar != true || emptyAddressVar != true || emptyCityVar != true || emptyEmailVar != true) {
            return false


        } else {

            function recupIdProduct() {
                let idProduct = []; // on va devoir recreer un nouveau tableau 
                for (let i = 0; i < basket.length; i++) { // dans lequel on incrementer chaque produit commander
                    let eachProductId = basket[i].id; // je nomme = chaque i id qui se trouve dans le basket               
                    idProduct.push(eachProductId);
                }
                return idProduct // le tableau revient rempli de id des elements commandés
            }
            let recupArray = recupIdProduct();

            let recupInfo = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value
                },
                products: recupArray,
            };

            const request = { // ma requete Post
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(recupInfo)
            };

            fetch("http://localhost:3000/api/products/order", request)
                .then(function (response) {
                    return response.json();
                })
                .then(data => {
                    console.log(data.orderId);
                    // localStorage.clear();
                    location.href = "confirmation.html?orderId=" + data.orderId;
                }).catch(error => {
                    console.log(error);
                })
        }

    }
    submitButton()
}

)  
