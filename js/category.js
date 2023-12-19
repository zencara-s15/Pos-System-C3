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

function saveCategory() {
    localStorage.setItem("categories", JSON.stringify(categories));
}

function loadCategory() {
    let categoryStorage = JSON.parse(localStorage.getItem("categories"));
    if (categoryStorage !== null) {
        categories = categoryStorage;
    }
}

let categoryName = document.querySelector("#category-name");
let categoryId = document.querySelector("#category-id");

function createCategory(event) {
    event.preventDefault();

    let newCategory = {};
    newCategory.name = categoryName.value;
    newCategory.id = categoryId.value;
    categories.push(newCategory);
    saveCategory();
    location.reload();
}

let update_category = null;

function editCategory(event) {
    let index = event.target.id;
    update_category = index;

    categoryName.value = categories[update_category].name;
    categoryId.value = categories[update_category].id;

    addBtn.textContent = "Update";
    addBtn.removeEventListener("click", createCategory);
    addBtn.addEventListener("click", updateCategory);
}

function updateCategory(event) {
    event.preventDefault();

    let updatedCategory = {
        name: categoryName.value,
        id: categoryId.value,
    };

    categories[update_category] = updatedCategory;

    saveCategory();

    update_category = null;
    categoryName.value = "";
    categoryId.value = "";

    addBtn.textContent = "Add";
    addBtn.removeEventListener("click", updateCategory);
    addBtn.addEventListener("click", createCategory);

    // Re-render the category table
    renderCategory();
    location.reload();
}

function removeRow(e) {
    let isRemove = window.confirm("Are you sure about that?");
    if (isRemove) {
        e.target.closest("tr").remove();
        categories.splice(e.target.id, 1);
    }

    let btnRemove = document.querySelectorAll(".deleteAction");

    for (let btn of btnRemove) {
        btn.addEventListener("click", removeRow);
    }

    saveCategory();
    loadCategory();
}

let tbody = document.querySelector("tbody");

function renderCategory() {
    let categoryStorage = JSON.parse(localStorage.getItem("categories"));
    if (categoryStorage !== null) {
        categories = categoryStorage;
        for (let i = 0; i < categories.length; i++) {
            let category = categories[i];

            let tableRow = document.createElement("tr");

            let tdID = document.createElement("td");
            tdID.textContent = category.id;

            let tdName = document.createElement("td");
            tdName.textContent = category.name;

            let tdManage = document.createElement("td");

            let deleteAction = document.createElement("img");
            deleteAction.id = i;
            deleteAction.src = "../IMG/Delete.png";
            tdManage.appendChild(deleteAction);
            deleteAction.addEventListener("click", removeRow);

            let editAction = document.createElement("img");
            editAction.src = "../IMG/edit.png";
            editAction.id = i;
            editAction.addEventListener("click", editCategory); // Call the updater function with the index
            tdManage.appendChild(editAction);

            tableRow.appendChild(tdID);
            tableRow.appendChild(tdName);
            tableRow.appendChild(tdManage);

            tbody.appendChild(tableRow);
        }
    }
}


let addCategoryForm = document.querySelector("#addCategoryForm");

let addBtn = document.querySelector("#form-submit-btn");
addBtn.addEventListener("click", createCategory);

let updateCategoryBtn = document.querySelector("#updateCategoryBtn");

let updateCategoryName = document.querySelector("#category-name");
let updateCategoryId = document.querySelector("#category-id");

renderCategory();