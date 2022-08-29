const items = document.getElementById(`items`);        // ***informer où ce sera afficher en l'occurence là où #items sera

const infoKanapApi = async function () {       // async fait qu'une fonction renvoie une promesse * await fait qu'une fonction attend une Promise
    await fetch("http://localhost:3000/api/products")  // Methode Fetch qui me permet de recuperer les données du serveur
        .then(function(response){                      // Promesse de recevoir une réponse de l'api 
            console.log(response);                     // verification que je recois bien la réponse
            return response.json();                    // Demande de retour de la réponse .. en format Json 
        })                                             // En + simple .then(reponse => reponse.json())
        .then(function(data){                          // une promesse de pouvoir "loguer" les datas (mes données)
            return (products = data);                  // demande d'un retour de reponse (les datas) que je "nomme" products
        })
        .catch (function (Error){                               // Si ma promesse initiale est rejetée 'catch'
            console.log(`J'en connais Un qui s'est planté`);    // s'il apparait dans la console, il y a un problème
        });
};

async function miseEnPlaceProduitSurLaPage() {       // Creation d'une fonction qui permet l'affichage dans la page
    await infoKanapApi();                            // pour pouvoir mettre en place mes kanaps je dois d'abord appeler mes info provenant de l'API
    products.forEach((product) => {  
        /*
        const a = document.creatELEMENT("a");
        a.href = ""
        a.innerHTML =
        */                // Me permet d'exécuter la fonction sur chaque élément product du tableau products.
        items.innerHTML +=                           // Me permet d'inserer mon HTML dans la variable ..... #items
          ` <a href="./product.html?id=${product._id}">  
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}" />
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>  
            </article>
            </a>`;
    });  // litteraux de gabarit ${} il va amener à "/product.name" du Json de chaque élément du tableau (voir le forEach)
}
miseEnPlaceProduitSurLaPage();                     //appel de la fonction qui permetra l'affichage


// Une fonction asynchrone est une fonction qui s'exécute de façon asynchrone grâce à la boucle d'évènement en utilisant une promesse (Promise) comme valeur de retour.

// Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.
// La méthode then() renvoie un objet Promise. Elle peut prendre jusqu'à deux arguments qui sont deux fonctions callback à utiliser en cas de complétion ou d'échec de la Promise.
      /* const promise1 = new Promise((resolve, reject) => {
      resolve('Success!');
       });

      promise1.then((value) => {
      console.log(value);
      // expected output: "Success!"
      });
      */

// La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.  
// forEach exécute la fonction callback une fois pour chaque élément
// Ces espaces sont indiqués par le signe dollar ($) et des accolades (${expression}). Les expressions dans les espaces réservés et le texte compris dans ces espaces sont passés à une fonction.
// Les littéraux de gabarits sont des littéraux de chaînes de caractères permettant d'intégrer des expressions.
   //  Les gabarits sont délimités par des caractères accent grave.
   //  Ces espaces sont indiqués par le signe dollar ($) et des accolades (${expression})


