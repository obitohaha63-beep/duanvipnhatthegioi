let replayWord = document.getElementById("keyWord");

let keyword = localStorage.getItem("keyword");

if(keyword){
    localStorage.removeItem("keyword");
}
replayWord.innerHTML = `"${keyword}"`;