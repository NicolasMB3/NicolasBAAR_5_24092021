const results = document.getElementById('items');
const url = 'http://localhost:3000/api/products';
let sofas;

// Demande des informations à l'API
const fetchSofas = async() => {
   sofas = await fetch(url)
      .then(res => res.json())
      .catch(err => console.log('Il y a eu un problème avec l\'opération fetch: ' + err.message));
};

// Const qui affiche les résultats du fetch sur la page index.html
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