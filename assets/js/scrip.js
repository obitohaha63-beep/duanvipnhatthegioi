const inputSoLuong = document.getElementById("soThuocTinh");
  const addThuocTinh = document.getElementById("thuocTinh");
  const btn = document.getElementById("btnTaoThuocTinh");

  btn.addEventListener("click", () => {
    const soLuong = parseInt(inputSoLuong.value) || 0;

    if (soLuong <= 0) {
      addThuocTinh.innerHTML = "<p>Vui lòng nhập số hợp lệ</p>";
      return;
    }

    // Tạo mảng
    const arr = Array.from({ length: soLuong }, (_, i) => i + 1);

    // map tạo input
    const html = arr.map(i => `
      <div class="thuoc-tinh-item">
        <label>Thuộc tính ${i}:</label>
        <input type="text" name="thuocTinh[]" placeholder="Nhập thuộc tính ${i}">
      </div>
    `).join("");

    addThuocTinh.innerHTML = html;
  });