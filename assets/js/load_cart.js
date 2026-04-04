function loadCartCount() {
  fetch("../assets/php/get_cart_count.php")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.querySelector(".jscart").innerText = data.count;
      }
    });
}
loadCartCount();