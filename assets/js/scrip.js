
document.addEventListener("DOMContentLoaded", function() {
  const danhMuc = document.querySelector(".khungxanhmucluc");
  const menuDropdown = document.querySelector(".khungtrangmenu-dropdown");

  danhMuc.addEventListener("click", function() {
    menuDropdown.style.display =
      menuDropdown.style.display === "block" ? "none" : "block";
  });
  
  // Ẩn menu khi click ra ngoài
  document.addEventListener("click", function(e) {
    if (!menuDropdown.contains(e.target) && !danhMuc.contains(e.target)) {
      menuDropdown.style.display = "none";
    }
  });
});

