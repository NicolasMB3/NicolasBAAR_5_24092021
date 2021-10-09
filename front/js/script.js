const results = document.getElementById('items');
const url = 'http://localhost:3000/api/products';
let sofas;

// API REQUEST
const fetchSofas = async() => {
   sofas = await fetch(url)
      .then(res => res.json())
      .catch(err => console.log('Erreur : ' + err));
};

// Fonction qui affiche les résultats du fetch
const showSofas = async() => {
   await fetchSofas();
   results.innerHTML = (
      sofas.map(sofa => (
         `<a href="./product.html?id=${sofa._id}">
            <article>
              <img src="${sofa.imageUrl}" alt="${sofa.altTxt}">
              <h3 class="productName">${sofa.name}</h3>
              <p class="productDescription">${sofa.description}</p>
            </article>
         </a>`
      )).join('')
   );
};

// Appel de la fonction showSofas
showSofas();