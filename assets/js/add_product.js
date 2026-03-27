document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("addProductForm");
    const categorySelect = document.getElementById("categorySelect");

    // Load danh mục từ DB
    fetch("../assets/php/get_categories.php")
        .then(res => res.json())
        .then(data => {
            if(data.success){
                data.data.forEach(cat => {
                    const option = document.createElement("option");
                    option.value = cat.id;
                    option.text = cat.name;
                    categorySelect.appendChild(option);
                });
            }
        });

    // Preview ảnh
    document.getElementById('imageInput').addEventListener('change', function(e){
        const file = e.target.files[0];
        if(file){
            const url = URL.createObjectURL(file);
            document.getElementById('previewImage').src = url;
        }
    });

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        const fileInput = document.getElementById("imageInput");
        if(fileInput.files.length > 0){
            formData.append('image', fileInput.files[0]);
        }

        fetch("../assets/php/add_product.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                alert(data.message);
                form.reset();
                document.getElementById('previewImage').src = '';
            } else {
                alert("Lỗi: " + data.message);
            }
        })
        .catch(err=>{
            console.error(err);
            alert("Đã có lỗi xảy ra khi kết nối server.");
        });
    });
});