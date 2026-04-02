document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addCate");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // ngăn form reload page

    const formData = new FormData(form);

    try {
      const res = await fetch("add_category.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Thêm danh mục thành công!");
        form.reset(); // reset form
        window.location.href = "DanhMuc.php"; // chuyển về trang danh mục
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi gửi dữ liệu!");
    }
  });
});