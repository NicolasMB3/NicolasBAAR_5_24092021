let params = new URL(document.location).searchParams;
let id = params.get("id");
let url = 'http://localhost:3000/api/products/' + id;

const fetchSofas = async() => {
   product = await fetch(url)
      .then(response => response.json())
      .then(function(resultatAPI) {
         article = resultatAPI;
         let min = 0, max = article.colors.length, select = document.getElementById('colors');
         document.querySelector(".item__img").innerHTML = `<img src="${article.imageUrl}" alt="Photographie d'un canapé"></img>`;
         document.getElementById("title").innerHTML = article.name;
         document.getElementById("price").innerHTML = article.price;
         document.getElementById("description").innerHTML = article.description;
         for (var i = min; i<max; i++) {
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = article.colors[i];
            select.appendChild(opt);
         }
      })
      .catch(err => console.log('Erreur : ' + err));
}

fetchSofas();