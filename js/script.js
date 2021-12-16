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
            let name = e.target.className;
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
