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

    show(navleft)

    let index = event.target.id;
    update_category = index;

    categoryName.value = categories[update_category].name;
    categoryId.value = categories[update_category].id;

    addBtn.textContent = "Update";
    document.querySelector(".form-title").textContent = "Update Category"

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
function addCategory(){
    show(navleft)
}

function cancel(){
    hide(navleft)
    location.reload()
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
            tdManage.classList.add("manage");

            let deleteBtn = document.createElement('span');
            deleteBtn.className = "delete material-symbols-outlined";
            deleteBtn.textContent = "delete";
            deleteBtn.addEventListener('click', removeRow);
            tdManage.appendChild(deleteBtn);

            let editAction = document.createElement("span");
            editAction.className = "edit material-symbols-outlined";
            editAction.textContent = "edit_document"; 
            editAction.id = i;
            editAction.addEventListener("click", editCategory); 

            tdManage.appendChild(editAction);

            tableRow.appendChild(tdID);
            tableRow.appendChild(tdName);
            tableRow.appendChild(tdManage);

            tbody.appendChild(tableRow);
        }
    }
}


let addCategoryForm = document.querySelector("#addCategoryForm");
let addCategoryBtn = document.querySelector("#display-add-form");
addCategoryBtn.addEventListener("click",addCategory)

let addBtn = document.querySelector("#form-submit-btn");
addBtn.addEventListener("click", createCategory);
let cancelBtn = document.querySelector("#form-cancel-btn")
cancelBtn.addEventListener("click", cancel)


let navleft = document.querySelector(".nav-left")

let updateCategoryBtn = document.querySelector("#updateCategoryBtn");

let updateCategoryName = document.querySelector("#category-name");
let updateCategoryId = document.querySelector("#category-id");

renderCategory();