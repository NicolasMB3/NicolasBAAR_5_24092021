// On récupère l'id et on affiche le numéro de commande
function displayOrder() {
   const displayOrderId = document.getElementById('orderId');
   displayOrderId.innerHTML += localStorage.getItem('orderId');
   // On nettoie tout le localStorage pour ne plus rien avoir
   localStorage.clear();
}

displayOrder();