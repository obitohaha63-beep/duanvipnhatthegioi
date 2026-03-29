document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("addProductForm");
    const categorySelect = document.getElementById("categorySelect");
    const previewImage = document.getElementById("previewImage");
    const imageInput = document.getElementById("imageInput");

    // Load danh mục
    fetch("../assets/php/get_categories.php")
        .then(res => res.json())
        .then(data => {
            if(data.success){
                data.data.forEach(cat => {
                    const option = document.createElement("option");
                    option.value = cat.id;
                    option.textContent = cat.name;
                    categorySelect.appendChild(option);
                });
            }
        });

    // Preview ảnh
    imageInput.addEventListener("change", function(e){
        const file = e.target.files[0];
        if(file){
            previewImage.src = URL.createObjectURL(file);
        }
    });

    // Submit form
    form.addEventListener("submit", (e)=>{
        e.preventDefault();

        const formData = new FormData(form);

        // 🔥 DEBUG
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        fetch("../assets/php/add_product.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log("Response:", data);

            if(data.success){
                alert(data.message);
                form.reset();
                previewImage.src = "";
            } else {
                alert("Lỗi: " + data.message);
            }
        })
        .catch(err=>{
            console.error(err);
            alert("Lỗi kết nối server");
        });
    });
});