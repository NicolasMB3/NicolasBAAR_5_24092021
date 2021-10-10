function displayOrder() {
   const displayOrderId = document.getElementById('orderId');
   displayOrderId.innerHTML += localStorage.getItem("orderId");
   localStorage.clear();
}

displayOrder();