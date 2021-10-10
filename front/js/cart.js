displayCart();
removeItem();
countItem();
countTotalInCart();

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

// Vérification du localStorage si correspondance
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
   let arrayTest = JSON.parse(localStorage.getItem("products"));
   buttonSupp.forEach(function(e) {
      e.addEventListener('input', function(x) {
         // return -> article.cart__item
         var test = e.closest(".cart__item");
         // On vient récupérer la valeur de l'input quantity
         var productCount = x.target.value
         var test2 = test.querySelector("div.cart__item__content__titlePrice > h2").innerText;
         if(checkItem(test2) && productCount > 0 && productCount <= 100) {
            // On remplace le localStorage si le test est bon
            arrayTest[checkItem(test2)[1]].quantity = parseInt(productCount);
            localStorage.setItem("products", JSON.stringify(arrayTest));
            var x, i;
            x = document.querySelectorAll(".cart__item");
            for (i = 0; i < x.length; i++) {
               x[i].remove();
            }
            displayCart();
            countItem();
            removeItem()
         } else {
            // Ajout d'un message d'erreur avec le DOM pour prévenir l'utilisateur de la valeur incorrect
            let tag = document.createElement("p");
            tag.className = 'alertNumber'
            tag.style.textAlign = 'center';
            let text = document.createTextNode("Merci de mettre une valeur entre 1 et 100 compris");
            tag.appendChild(text);
            let element = document.getElementById("alert");
            element.appendChild(tag);
         }
      })
   })
}

function removeItem() {
   let buttonSupp = document.querySelectorAll('button.button__del');
   buttonSupp.forEach(function(e) {
      e.addEventListener('click', function() {
         var test = e.closest(".cart__item");
         var test2 = test.querySelector("div.cart__item__content__titlePrice > h2").innerText;
         if(checkItem(test2)) {
            var arrayTest = JSON.parse(localStorage.getItem("products"));
            arrayTest.splice(checkItem(test2)[1], 1);
            localStorage.setItem("products", JSON.stringify(arrayTest));
            test.remove();
         }
         let itemSelect = JSON.parse(localStorage.getItem("products"));
         if (itemSelect.length == 0) {
            localStorage.clear('products');
         }
      })
   })
}

function checkFormAndPostRequest() {
   // On récupère les inputs depuis le DOM.
   const submit = document.getElementById("order");
   let inputFirstName = document.querySelector("#firstName");
   let inputLastName = document.querySelector("#lastName");
   let inputCity = document.querySelector("#city");
   let inputAddress = document.querySelector("#address");
   let inputMail = document.querySelector("#email");
   let itemSelect = JSON.parse(localStorage.getItem("products"));
   const regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
   const regexAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;
   const regexLetter = /^[a-zA-Z-]+$/;
   // Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur, on empêche l'envoi du formulaire. On vérifie aussi que le numéro est un nombre, sinon même chose.
   submit.addEventListener("click", (e) => {
      if (!inputFirstName.value.match(regexLetter)) {
         document.getElementById('firstNameErrorMsg').innerText = "Merci d'écrire un prénom valide";
         e.preventDefault();
      } else if (!inputLastName.value.match(regexLetter)) {
         document.getElementById('lastNameErrorMsg').innerText = "Merci d'écrire un nom valide";
         e.preventDefault();
      } else if (!inputCity.value.match(regexLetter)) {
         document.getElementById('cityErrorMsg').innerText = "Merci d'écrire votre pays correctement";
         e.preventDefault();
      } else if (!inputAddress.value.match(regexAddress)) {
         document.getElementById('addressErrorMsg').innerText = "Merci d'écrire une adresse valide";
         e.preventDefault();
      } else if (!inputMail.value.match(regexEmail)) {
         document.getElementById('emailErrorMsg').innerText = "Merci d'écrire un email valide";
         e.preventDefault();
      } else {
         // Si le formulaire est valide on créer un nouveau localStorage
         var product = [];
         for (i = 0; i < itemSelect.length; i++) {
            product[i] = itemSelect[i]._id;
         }
      
         const order = {
            contact: {
               firstName: inputFirstName.value,
               lastName: inputLastName.value,
               address: inputAddress.value,
               city: inputCity.value,
               email: inputMail.value,
            },
            products: product,
         };
      
         // Création de l'entête de la requête
         const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 
               "Content-Type": "application/json" 
            },
         };
      
         // Envoie de la requête
         fetch("http://localhost:3000/api/products/order", options)
         .then(res => res.json())
         .then((data) => {
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);
            document.location = 'confirmation.html';
         })
         .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
         });
      }
   });
}

checkFormAndPostRequest();