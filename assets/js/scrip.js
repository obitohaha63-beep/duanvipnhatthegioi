let attrIndex = 0;

function addAttribute() {
  const container = document.getElementById('attributes');

  const html = `
    <div class="attribute-item">
      <input type="text" placeholder="Tên thuộc tính (VD: Size)" class="attr-name" required>

      <select class="attr-type" onchange="toggleOptions(this)">
        <option value="text">Text</option>
        <option value="select">Select</option>
      </select>

      <div class="options" style="display:none;">
        <div class="option-list"></div>
        <button type="button" onclick="addOption(this)">+ Thêm option</button>
      </div>

      <button type="button" onclick="this.parentElement.remove()">Xóa</button>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', html);
}

function toggleOptions(select) {
  const optionsDiv = select.parentElement.querySelector('.options');
  optionsDiv.style.display = select.value === 'select' ? 'block' : 'none';
}

function addOption(btn) {
  const list = btn.parentElement.querySelector('.option-list');

  const optionHTML = `
    <div>
      <input type="text" class="option-value" placeholder="Giá trị (VD: M)">
      <button type="button" onclick="this.parentElement.remove()">X</button>
    </div>
  `;

  list.insertAdjacentHTML('beforeend', optionHTML);
}

// SUBMIT FORM
document.getElementById('addCate').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  const name = formData.get('name');
  const description = formData.get('description');

  const attributes = [];

  document.querySelectorAll('.attribute-item').forEach(attr => {
    const attrName = attr.querySelector('.attr-name').value;
    const attrType = attr.querySelector('.attr-type').value;

    let options = [];

    if (attrType === 'select') {
      attr.querySelectorAll('.option-value').forEach(opt => {
        if(opt.value.trim() !== ''){
          options.push(opt.value);
        }
      });
    }

    attributes.push({
      name: attrName,
      type: attrType,
      options: options
    });
  });

  fetch('../assets/php/add_category.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      description,
      attributes
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if(data.status === 'success'){
      window.location.href = 'QuanLySanPham.html';
    }
  })
});