document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("productTable");

  fetch("../assets/php/get_products.php")
    .then(res => res.json())
    .then(data => {
      if(data.success){
        table.innerHTML = '';
        data.data.forEach(p => {
          console.log(p.image_url);
          const tr = document.createElement('tr');

          tr.innerHTML = `
            <td>${p.id}</td>
<td>
    <img src="../${p.image_url}?t=${Date.now()}" style="max-width:50px;">
  </td>
            <td>${p.name}</td>
            <td>${p.category}</td>
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
  <div class="action-buttons">
    <a href="../pages/EditProduct.html?id=${p.id}" class="btn-primary">Sửa</a>
    <button class="btn-danger btn-delete" data-id="${p.id}" data-status="${p.status}">
      Xóa
    </button>
  </div>
</td>
          
          `;

          table.appendChild(tr);
          tr.querySelector('.btn-delete').addEventListener('click', () => {
  const id = p.id;
  const status = p.status;

  if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

  fetch(`../assets/php/delete_product.php?id=${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert(data.message);
        location.reload();
      } else {
        alert(data.message);
      }
    });
});
        });
      }
    });
});



