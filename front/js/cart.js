let itemSelect = JSON.parse(localStorage.getItem("products"));

function displayCart() {
   let cartItems = document.querySelector("#cart__items");
   // Tableau pour arriver tous les éléments du localStorage
   for (let produit in itemSelect) { 
      cartItems.innerHTML += 
      `  <article class="cart__item" data-id="${itemSelect[produit]._id}">
            <div class="cart__item__img">
               <img src="${itemSelect[produit].img}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
               <div class="cart__item__content__titlePrice">
                  <h2>${itemSelect[produit].name}</h2>
                  <p>${itemSelect[produit].color}</p>
                  <p class="totalPriceItem">${itemSelect[produit].price * itemSelect[produit].quantity} €</p>
               </div>
               <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                     <p>Qté : </p>
                     <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemSelect[produit].quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                     <p class="deleteItem">Supprimer</p>
                  </div>
               </div>
            </div>
         </article>`
   }
}

function countTotalInCart() {
   let arrayPrice = [];
   let totalArticle = document.getElementById('totalPrice');
   let totalPrice = document.querySelectorAll(".totalPriceItem");
   let totalProduct = document.getElementById("totalQuantity");

   for (let price in totalPrice) {
      arrayPrice.push(totalPrice[price].innerHTML);
   }
 
   // On enlève les undefined du tableau
   arrayPrice = arrayPrice.filter((el) => {
     return el != undefined;
   });
 
   // Transformer en nombre chaque valeur du tableau
   arrayPrice = arrayPrice.map((x) => parseFloat(x));
 
   // Additionner les valeurs du tableau pour avoir le prix total
   const reducer = (acc, currentVal) => acc + currentVal;
   arrayPrice = arrayPrice.reduce(reducer);
 
   // Affichage du prix
   totalArticle.innerText = arrayPrice;
   totalProduct.innerText = itemSelect.length + ' ';
 }

displayCart();
countTotalInCart();