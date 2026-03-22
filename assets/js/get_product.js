window.addEventListener("DOMContentLoaded", () => {
  fetch('../assets/php/get_product.php')
    .then(res => res.json())
    .then(data => {
      if(data.status === 'success'){
        const tbody = document.querySelector('#productTable tbody');
        tbody.innerHTML = '';
        data.data.forEach(prod => {
          const attrs = prod.attributes.map(a => `${a.attr_name}: ${a.value}`).join('; ');

          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.name}</td>
            <td>${prod.category_name}</td>
            <td>${prod.price}</td>
            <td>${prod.quantity}</td>
            <td>${attrs}</td>
            <td>${prod.created_at}</td>
          `;
          tbody.appendChild(tr);
        });
      }
    });
});