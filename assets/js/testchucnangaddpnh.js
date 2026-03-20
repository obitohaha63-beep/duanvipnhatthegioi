const editBtn = document.getElementById("edit-btn");
const confirmBtn = document.getElementById("confirm-btn");
const inputs = document.querySelectorAll(".receipt-field input");

let completed = false;



// =======================
// KHÓA INPUT BAN ĐẦU
// =======================
inputs.forEach(input => {
  input.setAttribute("readonly", true);
});




// =======================
// BẤM SỬA PHIẾU
// =======================
editBtn.addEventListener("click", function () {

  if (completed) {
    alert("Phiếu đã hoàn tất, không thể sửa!");
    return;
  }

  inputs.forEach(input => {

    // mã phiếu không cho sửa
    if (input.value === "PN001") return;

    input.removeAttribute("readonly");
  });

});




// =======================
// HOÀN TẤT PHIẾU
// =======================
confirmBtn.addEventListener("click", function () {

  completed = true;

  inputs.forEach(input => {
    input.setAttribute("readonly", true);
  });

  confirmBtn.innerText = "Đã hoàn tất";
  confirmBtn.style.background = "#16a34a";

  editBtn.disabled = true;
  editBtn.style.opacity = "0.5";
  editBtn.style.cursor = "not-allowed";

});


const fromDate = document.getElementById("from-date");
const toDate = document.getElementById("to-date");

const receiptCards = document.querySelectorAll(".receipt-card");

function filterReceipts() {

  const from = fromDate.value;
  const to = toDate.value;

  receiptCards.forEach(card => {

    const receiptDate = card.querySelector('input[type="date"]').value;

    if ((!from || receiptDate >= from) && (!to || receiptDate <= to)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });
}

fromDate.addEventListener("change", filterReceipts);
toDate.addEventListener("change", filterReceipts);

