document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById("giaban-body");
  const loaiSelect = document.getElementById("loai-sp");
  const giaVonInput = document.getElementById("gia-von");
  const loiNhuanInput = document.getElementById("loi-nhuan");
  const giaBanInput = document.getElementById("gia-ban");

  let allProducts = [];

  async function loadData() {
    try {
      const res = await fetch("../assets/php/get_giaban.php");
      const data = await res.json();
      allProducts = data.products;

      
      loaiSelect.innerHTML = '<option value="">Tất cả</option>';
      data.categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat.name;
        opt.textContent = cat.name;
        loaiSelect.appendChild(opt);
      });

      renderTable(allProducts);

    } catch (err) {
      console.error("Lỗi loadData:", err);
    }
  }

  function renderTable(products) {
    tableBody.innerHTML = "";
    products.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${Number(p.cost_price)
          .toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</td>
        <td>${p.profit_rate}%</td>
        <td>${Number(p.selling_price)
          .toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</td>
        <td><button class="btn-add" onclick="location.href='FormSuaGia.html?id=${p.id}'">Sửa</button></td>
      `;
      tableBody.appendChild(tr);
    });
  }

  function filterProducts() {
    const gv = giaVonInput.value.trim();
    const ln = loiNhuanInput.value.trim();
    const gb = giaBanInput.value.trim();
    const cat = loaiSelect.value;

    const filtered = allProducts.filter(p => {
      if (gv && !p.cost_price.toString().includes(gv)) return false;
      if (ln && !p.profit_rate.toString().includes(ln)) return false;
      if (gb && !p.selling_price.toString().includes(gb)) return false;
      if (cat && p.category !== cat) return false;
      return true;
    });
    renderTable(filtered);
  }

  
  giaVonInput.addEventListener("input", filterProducts);
  loiNhuanInput.addEventListener("input", filterProducts);
  giaBanInput.addEventListener("input", filterProducts);
  loaiSelect.addEventListener("change", filterProducts);

  await loadData();
});