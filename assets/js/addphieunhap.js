document.getElementById("so-san-pham").addEventListener("change", function () {
  let count = parseInt(this.value);
  let html = "";

  for (let i = 1; i <= count; i++) {
    html += `
      <div class="form-row">
        <label>Loại sản phẩm ${i}</label>
        <select required>
          <option value="">-- Chọn loại --</option>
          <option>Vợt</option>
          <option>Giày</option>
          <option>Phụ kiện</option>
        </select>
      </div>

      <div class="form-row">
        <label>Tên sản phẩm ${i}</label>
        <input type="text" placeholder="Nhập tên sản phẩm" required>
      </div>

      <div class="form-row">
        <label>Số lượng ${i}</label>
        <input type="number" required>
      </div>

      <div class="form-row">
        <label>Giá nhập ${i}</label>
        <input type="number" required>
      </div>
      <br>
      <br>
    `;
  }

  document.getElementById("product-list").innerHTML = html;
});