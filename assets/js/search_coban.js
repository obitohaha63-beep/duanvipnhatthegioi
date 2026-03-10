let search = document.getElementById("searchBassic");
let btn = document.getElementById("searchBtn");

btn.addEventListener("click", function () {
    
    let keyword = search.value;

    localStorage.setItem("keyword", keyword);

});
