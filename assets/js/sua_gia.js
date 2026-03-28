document.addEventListener("DOMContentLoaded", async () => {
  const productId = new URLSearchParams(window.location.search).get("id");
  if (!productId) {
    alert("Không xác định được sản phẩm!");
    return;
  }

  const form = document.querySelector(".form-giaban");

  const tenSanPhamInput = document.getElementById("ten-san-pham");
  const soLuongInput = document.getElementById("so-luong-hien-tai");
  const giaVonInput = document.getElementById("gia-von-hien-tai");
  const giaBanInput = document.getElementById("gia-ban-hien-tai");
  const loiNhuanHTInput = document.getElementById("loi-nhuan-hien-tai");
  const loiNhuanMoiInput = document.getElementById("loinhuan-moi");

  form.dataset.id = productId;

  // Load sản phẩm
  async function loadProduct() {
    try {
      const res = await fetch("../assets/php/get_giaban.php");

      if (!res.ok) throw new Error("Không tải được dữ liệu");

      const data = await res.json();

      const product = data.products?.find(item => item.id == productId);

      if (!product) {
        alert("Không tìm thấy sản phẩm!");
        return;
      }

      tenSanPhamInput.value = product.name ?? "";
      soLuongInput.value = product.quantity ?? 0;
      giaVonInput.value = product.cost_price ?? 0;
      giaBanInput.value = product.selling_price ?? 0;
      loiNhuanHTInput.value = product.profit_rate ?? 0;

    } catch (err) {
      console.error("Lỗi loadProduct:", err);
      alert("Lỗi khi tải dữ liệu sản phẩm");
    }
  }

  // Submit cập nhật
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newProfit = Number(loiNhuanMoiInput.value);

    if (Number.isNaN(newProfit) || newProfit < 0) {
      alert("Nhập % lợi nhuận hợp lệ");
      return;
    }

    try {
      const res = await fetch("../assets/php/update_giaban.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: productId,
          profit_rate: newProfit
        })
      });

      const result = await res.json();

      if (result.success) {
        alert("Cập nhật thành công!");
        window.location.href = "NhaphangGiaban2.html";
      } else {
        alert(result.message || "Cập nhật thất bại");
      }

    } catch (err) {
      console.error("Update error:", err);
      alert("Lỗi server, vui lòng thử lại");
    }
  });

  await loadProduct();
});