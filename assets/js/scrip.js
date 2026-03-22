
let attrIndex = 0;

function addAttribute() {
  const html = `
    <div class="attr-item">
      <input type="text" name="attr_name[]" placeholder="Tên thuộc tính (VD: Màu sắc)" required>

      <select name="attr_type[]" onchange="toggleOptions(this)">
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="select">Select</option>
      </select>

      <input type="text" name="attr_options[]" 
             placeholder="Nhập options: Đỏ, Xanh, Đen" 
             class="options-input" style="display:none">

      <button type="button" onclick="removeAttr(this)">X</button>
    </div>
  `;

  document.getElementById("attributes").insertAdjacentHTML("beforeend", html);
}

function removeAttr(btn) {
  btn.parentElement.remove();
}

function toggleOptions(select) {
  const optionInput = select.parentElement.querySelector(".options-input");

  if (select.value === "select") {
    optionInput.style.display = "block";
  } else {
    optionInput.style.display = "none";
    optionInput.value = "";
  }
}
document.getElementById("addCate").addEventListener("submit", function(e){
    e.preventDefault(); // Ngăn reload
    const formData = new FormData(this);

    fetch('../assets/php/add_category.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if(data.status === 'success'){
            this.reset();
            document.getElementById("attributes").innerHTML = '';
        }
    })
    .catch(err => alert('Lỗi server'));
});
