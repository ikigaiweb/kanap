
async function infoProductApi () {
    const response = await fetch(`http://localhost:3000/api/products/` + productID)
 if(response.ok) {
    return response.json.son();
} 
else {
    console.log(response.error);
}

}


function saveBasket (basket) {                                // la fonction a pour nom "saveBasket" et parametre (basket) ce qui signifie qu'elle ne s'apliquera que à Basket 
    localStorage.setItem("basket", JSON.stringify(basket));   // JSON.stringify va permetre de transformé un tableau ou objet complexe en chaine de charactere. *** le "basket" est le mot clé
}                                                             // dans ce cas transformer en "string" (mots)  BASKET 
 function getBasket () {
    let basket = localStorage.getItem("basket");
    if (basket ==null) {                 // si mon panier est vide alors il retournera un tableau vide
        return [];
    } else {
        return JSON.parse(basket);       // Si il n'est pas vide JSON.parse va lui à l'inverse remmetre le produit en tableau pu autre depuis 
    }
  
 }
 function addBasket (product) {                // on va creer une fonction pour ajouter 
    let basket = getBasket ();
    let foundProduct = basket.find(p => p.id == productID.id);     //.find est une fonction qui travaille sur les tableaux, qui permet de chercher un element sur un tableau par rapport a une condition (je cherche dans mon panier si il y a un produit dont l'ID est = au produit que je veux ajouter)  )
    if(foundProduct != undefined) {             // != signifie different *** si il n'en n 'a pas trouve il retournera "undefined", si il y en a un alors il aura retourné l'element demandé
        foundProduct.quantity++;                // et donc j'ajoute + 1 à la quantité
    } else {
        product.quantity = 1;                  // je defini par defaut mon produit à 1
        basket.push(product);                  // et ensuite je peux pousser mon produit 
    }
    saveBasket(basket);                 // apres l'ajout on enregistre le nouveau panier
 }
 function removeFromBasket (product) {               // pour retirer un produit du panier pas juste 1 mais tout un produit
    let basket = getBasket ();                        // on rapelle le variable (il etait dans une fonction)
    basket = basket.filter(p => p.id != productK.id); // fonction .filter va permetre de filtrer un tableau en fonction d'une condition *** on peut le faire avce == ou != 
    saveBasket(basket);                               // On resauve ce nouveau resultat
 }

 function changeQuantity(product, quantity) {                     // permet de retirer un article c 'est plus precis , moins global
    let basket = getBasket ();                                     // on reprend encore ce variable c'est un copier coller de Add basket
    let foundProduct = basket.find(p => p.id == productID.id);     // .find va me permettre de trouver le produit avec l'ID que je recherche dans le panier
    if(foundProduct != undefined) {                                // si il ne le trouve pas alors 
        foundProduct.quantity += quantity;                         // += signifie ajouter   calcule la somme ou la concaténation de ses deux opérandes puis affecte le résultat
        if (foundProduct.quantity <= 0) {                          // si la quantité est égal ou inferieur à 0 
            removeFromBasket(foundProduct);                        // sachant que l'on ne peut pas avoir d'article en nombre negatif , le plus simple est de retirer le produit de facon global
        } else {
            saveBasket(basket);                                    // et on sauve  (attention pârfois hors de la fonction)
        }

    }    
 }
 function getNumberProduct (){                                      // cela nous donnera la quantité de produit qui se trouve dans le panier
    let basket = getBasket ();                                      // on recupere le panier
    let number = 0;                                                 // on commence à 0 
    for (let product of basket) {                                  // FOR OF on va donc executer le code jusqu'on arrive a la fin du tableau
        number += productID.quantity;                               // += ajouter ... concatener 
    }
    return number                                                   // il retourne le nouveau nombre d'article
 }
 function getTotalPrice () {                                        // copier coller de audessus mais cette fois ci pour le prix
    let basket = getBasket ();                                      // on recupere le panier
    let total = 0;                                                  // on commence à 0 
    for (let product of basket) {                                  // pour les produit etant dans le panier  FOR OF on va donc executer le code jusqu'on arrive a la fin du tableau
        total += productID.quantity * product.price;               //  total =  + (A x B)  donc si A = 3  B = 4 alors on ajoute + 12 à total
    }
    return total                                                    // il me retourne le nouveau total
 }








