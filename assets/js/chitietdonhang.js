
function xemchitiet(madon) {
    window.location.href = 'Chitietdonhang.html?id=' + madon;
}

window.addEventListener('DOMContentLoaded', (event) => {
    const m = new URLSearchParams(window.location.search);
    const madon = m.get('id');

});