document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

function loadProducts() {
  fetch('../assets/php/get_products.php')
    .then(res => res.json())
    .then(data => {

      if (data.status !== 'success') {
        alert("Lỗi load sản phẩm");
        return;
      }

      const table = document.getElementById('productTable');
      table.innerHTML = '';

      data.data.forEach(p => {

        const sellPrice = calculatePrice(p.cost_price, p.profit_percent);

        const imageUrl = p.image_url 
          ? '../assets/uploads/' + p.image_url
          : 'https://via.placeholder.com/50';

        const row = `
          <tr>
          
            <td>${p.id}</td>
            <td><img src="${imageUrl}" width="50"></td>
            <td>${p.name}</td>
            <td>${p.category_name ?? ''}</td>
            <td>${formatMoney(p.cost_price)}</td>
            <td>${p.profit_percent}%</td>
            <td>${formatMoney(sellPrice)}</td>
            <td>${p.status}</td>
            <td>
              <button onclick="editProduct(${p.id})">Sửa</button>
              
              <button onclick="deleteProduct(${p.id})">Xóa</button>
            </td>
          </tr>
        `;

        table.insertAdjacentHTML('beforeend', row);
      });

    })
    .catch(err => {
      console.error(err);
      alert("Lỗi server");
    });
}

// ===== UTILS =====
function calculatePrice(cost, profit) {
  return cost * (1 + profit / 100);
}

function formatMoney(number) {
  return Number(number).toLocaleString('vi-VN') + 'đ';
}

// ===== ACTION =====
function editProduct(id) {
  alert("Sửa sản phẩm ID: " + id);
}

function deleteProduct(id) {
  if(confirm("Bạn có chắc muốn xóa?")){
    fetch('../assets/php/delete_product.php?id=' + id)
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        loadProducts();
      });
  }
}
function editProduct(id){
  window.location.href = 'edit_product.html?id=' + id;
}