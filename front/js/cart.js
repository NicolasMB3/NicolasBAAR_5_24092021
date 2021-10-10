function displayCart() {
   let itemSelect = JSON.parse(localStorage.getItem("products"));
   let cartItems = document.querySelector("#cart__items");
   // Tableau pour mettre tous les éléments du localStorage
   for (let produit in itemSelect) { 
      cartItems.innerHTML += 
      `<article class="cart__item" data-id="${itemSelect[produit]._id}">
         <div class="cart__item__img">
            <img src="${itemSelect[produit].img}" alt="Photographie d'un canapé">
         </div>
         <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
               <h2>${itemSelect[produit].name}</h2>
               <p class="totalPriceItem">${itemSelect[produit].price * itemSelect[produit].quantity} €</p>
            </div>
            <div class="cart__item__content__settings">
               <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemSelect[produit].quantity}">
               </div>
               <div class="cart__item__content__settings__delete">
                  <button class="button__del">Supprimer</button>
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
   let arrayCount = JSON.parse(localStorage.getItem("products"));
 
   if (arrayCount !== null && arrayCount.length != 0) {
      for (let price in totalPrice) {
         arrayPrice.push(totalPrice[price].innerHTML);
      }
      // On enlève les undefined du tableau
      arrayPrice = arrayPrice.filter((el) => {
        return el != undefined;
      });
      // Transformer en nombre chaque valeur du tableau
      arrayPrice = arrayPrice.map((x) => parseFloat(x));
      // Additionner les valeurs du tableau pour avoir la somme total
      const reducer = (acc, currentVal) => acc + currentVal;
      arrayPrice = arrayPrice.reduce(reducer);
      // Affichage du prix
      totalArticle.innerText = arrayPrice;
      totalProduct.innerText = arrayCount.length + ' ';
   } else { 
      // Si pas de valeur alors on affiche 0
      totalArticle.innerText = "0 ";
      totalProduct.innerText = "0 ";
   }
}

function checkItem(productname) {
   let itemSelect = JSON.parse(localStorage.getItem("products"));
   let array = [true, 0];
   for (i = 0; i < itemSelect.length; i++) {
      if(productname == itemSelect[i].name) {
         array[1] = i;
         return array;
      }
   }
}

function countItem() {
   let buttonSupp = document.querySelectorAll('input.itemQuantity');
   buttonSupp.forEach(function(e) {
      e.addEventListener('change', function(x) {
         var test = e.parentNode.parentNode.parentNode.parentNode;
         var productCount = x.target.value
         var test2 = test.querySelector("div.cart__item__content__titlePrice > h2").innerText;
         if(checkItem(test2)) {
            var arrayTest = JSON.parse(localStorage.getItem("products"));
            arrayTest[checkItem(test2)[1]].quantity = parseInt(productCount);
            localStorage.setItem("products", JSON.stringify(arrayTest));
            location.reload();
            countTotalInCart();
         }
      })
   })
}

function removeItem() {
   let buttonSupp = document.querySelectorAll('button.button__del');
   buttonSupp.forEach(function(e) {
      e.addEventListener('click', function() {
         var test = e.parentNode.parentNode.parentNode.parentNode;
         var test2 = test.querySelector("div.cart__item__content__titlePrice > h2").innerText;
         if(checkItem(test2)) {
            var arrayTest = JSON.parse(localStorage.getItem("products"));
            arrayTest.splice(checkItem(test2)[1], 1);
            localStorage.setItem("products", JSON.stringify(arrayTest));
            location.reload();
            setTimeout(function(){
               displayCart();
            }, 600)
            countTotalInCart();
         }
         arrayTest = [];
      })
   })
}

displayCart();
countTotalInCart();
removeItem();
countItem();