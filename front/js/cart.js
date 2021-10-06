let itemSelect = JSON.parse(localStorage.getItem("products"));

function displayCart() {
   let cartItems = document.querySelector("#cart__items");
   for (let produit in itemSelect) { 
      cartItems.innerHTML += 
      `  <article class="cart__item" data-id="${itemSelect[produit].id}">
            <div class="cart__item__img">
               <img src="" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
               <div class="cart__item__content__titlePrice">
                  <h2>${itemSelect[produit].name}</h2>
                  <p>${itemSelect[produit].quantity * itemSelect[produit].price} €</p>
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

displayCart();