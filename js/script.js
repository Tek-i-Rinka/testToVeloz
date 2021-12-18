var counterOfClicksOnText = 0;
const nameOfLocalJsonFile = "images";
function checkCookies() {
    let cookies = document.cookie.split(";");
    for (let index = 0; index < cookies.length; index++) {
        const element = cookies[index].split("=");
        if (element[0] == "counter") {
            counterOfClicksOnText = +element[1];
            return;
        }
    }
    document.cookie = "counter=0";
}
function checkLocalStorage() {
    let file = window.localStorage.getItem(nameOfLocalJsonFile);
    if (file == null) {
        window.localStorage.setItem(nameOfLocalJsonFile, "{}");
    }
}
function updateModal() {
    let file = JSON.parse(window.localStorage.getItem(nameOfLocalJsonFile));
    console.log(file);
    if (file != null) {
        let modal = document.querySelector(".carousel-inner");
        let active = "active";
        console.log(modal);
        modal.innerHTML = "";
        for (key in file) {
            console.log(key);
            modal.innerHTML += `<div class="carousel-item ${active}"><img class="d-block w-100 h-100" src="${key}"/><div class="carousel-caption d-none d-md-block"><h5>${file[key]}</h5></div></div>`;
            active = "";
        }
    }
}
window.onload = function () {
    checkCookies();
    checkLocalStorage();
    var images = document.querySelectorAll("img");
    images.forEach((el) => {
        el.style.opacity = "0.6";
        el.addEventListener("mouseover", (e) => {
            el.style.opacity = "1";
        });
        el.addEventListener("mouseout", (e) => {
            el.style.opacity = "0.6";
        });
        el.addEventListener("click", (e) => {
            let name = e.target.attributes.src.nodeValue;
            let obj = JSON.parse(
                window.localStorage.getItem(nameOfLocalJsonFile)
            );
            if (obj[name] == undefined) {
                obj[name] = 1;
                window.localStorage.setItem(
                    nameOfLocalJsonFile,
                    JSON.stringify(obj)
                );
            } else {
                obj[name]++;
                window.localStorage.setItem(
                    nameOfLocalJsonFile,
                    JSON.stringify(obj)
                );
            }
            updateModal();
        });
    });
    var text = document.querySelectorAll(".text");
    text.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            counterOfClicksOnText++;
            if (counterOfClicksOnText % 5 == 0) {
                document.cookie = "counter=" + counterOfClicksOnText;
                alert("Congratulations! You clicked on the text 5 times.");
            }
        });
    });
};
