
// main function
function hide(element) {
    element.style.display = "none";
}

function show(element) {
    element.style.display = "block";
}

// Data----------------------------

let categories = [];

// Local Storage

function saveProducts() {
    localStorage.setItem("categories", JSON.stringify(categories));
}

function loadProducts() {
    let catergoryStorage = JSON.parse(localStorage.getItem("categories"));
    if (catergoryStorage !== null) {
        categories = catergoryStorage;
    }
}
function addCategory(event) {
    
}

let addBtn = document.querySelector("#form-submit-btn");
addBtn.addEventListener("click", addCategory);