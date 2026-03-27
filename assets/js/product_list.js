document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("productTable");

  fetch("../assets/php/get_products.php")
    .then(res => res.json())
    .then(data => {
      if(data.success){
        table.innerHTML = '';
        data.data.forEach(p => {
          const tr = document.createElement('tr');

          tr.innerHTML = `
            <td>${p.id}</td>
            <td><img src="../${p.image_url || 'assets/img/placeholder.png'}" style="max-width:50px;"></td>
            <td>${p.name}</td>
            <td>${p.category_name}</td>
            <td>${p.brand}</td>
            <td>${p.color}</td>
            <td>${p.size}</td>
            <td>${p.cost_price.toLocaleString('vi-VN')}đ</td>
            <td>${p.profit_rate}%</td>
            <td>${p.quantity}</td>
            <td>${p.status}</td>
            <td>${p.description || ''}</td>
            <td>${p.created_at}</td>
            <td>
            <a href="../pages/EditProduct.html?id=${p.id}" class="btn-primary">Sửa</a>
          </td>
          `;

          table.appendChild(tr);
        });
      }
    });
});

// Sửa sản phẩm
function editProduct(id){
  window.location.href = `../pages/EditProduct.html?id=${p.id}`;
}

// Xóa sản phẩm
function deleteProduct(id, btn){
  if(!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

  fetch("../assets/php/delete_product.php", {
    method: "POST",
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `id=${id}`
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if(data.success){
      // Xóa row khỏi bảng
      btn.closest('tr').remove();
    }
  });
}