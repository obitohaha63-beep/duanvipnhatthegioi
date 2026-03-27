document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addCate");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Ngăn form submit mặc định

        const formData = new FormData(form);

        fetch("../assets/php/add_category.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                form.reset(); // reset form sau khi thêm
            } else {
                alert("Lỗi: " + data.message);
            }
        })
        .catch(err => {
            console.error(err);
            alert("Đã có lỗi xảy ra khi kết nối server.");
        });
    });
});