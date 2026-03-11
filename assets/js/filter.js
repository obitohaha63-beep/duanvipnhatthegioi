function getCheckedValues(className){
    let arr = [];
    document.querySelectorAll("." + className + ":checked")
    .forEach(cb=>{
        arr.push(cb.value);
    });
    return arr;
}

function filterProducts(){

    let brands = getCheckedValues("brand");
    let prices = getCheckedValues("price");
    let weights = getCheckedValues("weight");
    let balances = getCheckedValues("balance");
    let styles = getCheckedValues("style");
    let levels = getCheckedValues("level");

    let products = document.querySelectorAll(".sanpham");

    products.forEach(p=>{

        let brand = p.dataset.brand;
        let price = p.dataset.price;
        let weight = p.dataset.weight;
        let balance = p.dataset.balance;
        let style = p.dataset.style;
        let level = p.dataset.level;

        let match = true;

        if(brands.length && !brands.includes(brand)) match = false;
        if(prices.length && !prices.includes(price)) match = false;
        if(weights.length && !weights.includes(weight)) match = false;
        if(balances.length && !balances.includes(balance)) match = false;
        if(styles.length && !styles.includes(style)) match = false;
        if(levels.length && !levels.includes(level)) match = false;

        if(match){
            p.closest(".box").style.display = "block";
        }else{
            p.closest(".box").style.display = "none";
        }

    });
    sortProducts()

}

document.querySelectorAll("input[type=checkbox]")
.forEach(cb=>{
    cb.addEventListener("change", filterProducts);
});

function getPriceNumber(priceText){

    return Number(
        priceText
        .replace(/[^\d]/g,'')
    )

}

function sortProducts(){

    let sortType = document.getElementById("idsapxep").value

    let container = document.querySelector(".container-sanphambot")

    let products = Array.from(container.querySelectorAll(".box"))

    products.sort((a,b)=>{

        let priceA = getPriceNumber(a.querySelector(".gia").innerText)
        let priceB = getPriceNumber(b.querySelector(".gia").innerText)

        let dateA = new Date(a.querySelector(".sanpham").dataset.date)
        let dateB = new Date(b.querySelector(".sanpham").dataset.date)

        if(sortType === "tangdan"){
            return priceA - priceB
        }

        if(sortType === "giamdan"){
            return priceB - priceA
        }

        if(sortType === "moinhat"){
            return dateB - dateA
        }

    })

    products.forEach(p=>{
        container.appendChild(p)
    })

}

document.getElementById("idsapxep")
.addEventListener("change", sortProducts)