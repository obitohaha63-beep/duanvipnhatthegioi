



document.addEventListener("DOMContentLoaded", () => {
    
    
    const tableBodyElement = document.getElementById("categoryTable");

    
    fetch("../assets/php/get_categories.php")
        .then(response => response.json())  
        .then(apiData => {
            
            if (apiData.success) {
                
                const categoryList = apiData.data;
                
                
                tableBodyElement.innerHTML = "";

                
                categoryList.forEach(category => {
                    const tableRow = document.createElement("tr");
                    tableRow.innerHTML = `
                        <td>${category.id}</td>
                        <td>${category.name}</td>
                    `;
                    tableBodyElement.appendChild(tableRow);
                });
            } 
            
            else {
                tableBodyElement.innerHTML = `
                    <tr>
                        <td colspan="2" style="text-align: center; color: red;">
                             Lỗi: ${apiData.message}
                        </td>
                    </tr>
                `;
            }
        })
        .catch(error => {
            
            console.error("Chi tiết lỗi:", error);
            tableBodyElement.innerHTML = `
                <tr>
                    <td colspan="2" style="text-align: center; color: red;">
                         Lỗi kết nối server. Vui lòng tải lại trang!
                    </td>
                </tr>
            `;
        });
});