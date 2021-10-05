let params = new URL(document.location).searchParams;
let id = params.get("id");
let url = 'http://localhost:3000/api/products/' + id;
let clicked = false;
const numberSelect = document.getElementById('quantity');
const itemImg = document.querySelector(".item__img");
const itemTitle = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDesc = document.getElementById("description");
const valueInput = document.getElementById("quantity");
const valueSelect = document.getElementById("colors");

const fetchProduct = async() => {
   product = await fetch(url)
      .then(response => response.json())
      .then(function(resultatAPI) {
         article = resultatAPI;
         let min = 0, max = article.colors.length, select = document.getElementById('colors');
         // Placer les élèments si le fetch arrive à trouver les informations back-end
         itemImg.innerHTML = `<img src="${article.imageUrl}" alt="Photographie d'un canapé"></img>`;
         itemTitle.innerHTML = article.name;
         itemPrice.innerHTML = article.price;
         itemDesc.innerHTML = article.description;
         document.title = 'Kanap - ' + article.name;
         // Boucle pour afficher les options de couleurs dans le menu déroulant
         for (var i = min; i < max; i++) {
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = article.colors[i];
            select.appendChild(opt);
         }
      })
      .catch(err => console.log('Erreur : ' + err));
}

// Ajout au panier avec le localStorage
function addPanier () {
   const addButton = document.querySelector("#addToCart");
   addButton.addEventListener('click', () => {
      if (valueInput.value > 0 && valueInput.value < 100 && valueSelect.value != '') {
         // Créer localStorage
         let productAdded = {
            name: itemTitle.innerHTML,
            price: parseFloat(itemPrice.innerHTML),
            quantity: parseFloat(valueInput.value),
            _id: id,
         };
         let listProduct = [];
         if (localStorage.getItem("products") !== null) {
            listProduct = JSON.parse(localStorage.getItem("products"));
         } 
         listProduct.push(productAdded);
         localStorage.setItem("products", JSON.stringify(listProduct));
         document.querySelector(".item__content__settings").innerHTML += '<p id="description" style="text-align: center; color: #214a75;">L\'oject a été ajouté au panier. Retour au menu</p>';
         setTimeout("location.reload(true);", 3000);
         console.log('Ça marche');
      } else {
         document.querySelector(".item__content__settings").innerHTML += '<p id="description" style="text-align: center; color: #eb5e34;">Erreur : Merci de mettre des valeurs acceptées. Retour au menu</p>';
         setTimeout("location.reload(true);", 3000);
      }
   });
}

fetchProduct();
addPanier();