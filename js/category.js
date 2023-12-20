let categories = [];
let update_category = null;

const categoryName = document.querySelector("#category-name");
const categoryId = document.querySelector("#category-id");
const addCategoryForm = document.querySelector("#addCategoryForm");
const addCategoryBtn = document.querySelector("#display-add-form");
const addBtn = document.querySelector("#form-submit-btn");
const cancelBtn = document.querySelector("#form-cancel-btn")

const updateCategoryBtn = document.querySelector("#updateCategoryBtn");
const updateCategoryId = document.querySelector("#category-id");
const updateCategoryName = document.querySelector("#category-name");

addCategoryBtn.addEventListener("click",addCategory)
addBtn.addEventListener("click", createCategory);
cancelBtn.addEventListener("click", cancel)
const navleft = document.querySelector(".nav-left")
const tbody = document.querySelector("tbody");


function hide(element) {
    element.style.display = "none";
}

function show(element) {
    element.style.display = "block";
}

function saveCategory() {
    localStorage.setItem("categories", JSON.stringify(categories));
}

function loadCategory() {
    let categoryStorage = JSON.parse(localStorage.getItem("categories"));
    if (categoryStorage !== null) {
        categories = categoryStorage;
    }
}

function addCategory(){
    show(navleft)
}

function cancel(){
    hide(navleft)
    location.reload()
}

function createCategory(event) {

    event.preventDefault();

    let newCategory = {};
    newCategory.name = categoryName.value;
    newCategory.id = categoryId.value;
    categories.push(newCategory);
    saveCategory();
    location.reload();
}
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

    update_category = null;
    categoryName.value = "";
    categoryId.value = "";
    
    addBtn.textContent = "Add";
    addBtn.removeEventListener("click", updateCategory);
    addBtn.addEventListener("click", createCategory);
    
    saveCategory();
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

function renderCategory() {
    let categoryStorage = JSON.parse(localStorage.getItem("categories"));
    if (categoryStorage !== null) {
        categories = categoryStorage;
        for (let i = 0; i < categories.length; i++) {

            let category = categories[i];
            let tableRow = document.createElement("tr");
            let tdID = document.createElement("td");
            let tdName = document.createElement("td");
            let tdManage = document.createElement("td");
            let deleteBtn = document.createElement('span');
            let editAction = document.createElement("span");
            
            tdID.textContent = category.id;
            tdName.textContent = category.name;
            tdManage.classList.add("manage");
            tdManage.appendChild(deleteBtn);
            tdManage.appendChild(editAction);

            deleteBtn.className = "delete material-symbols-outlined";
            deleteBtn.textContent = "delete";
            deleteBtn.addEventListener('click', removeRow);

            editAction.className = "edit material-symbols-outlined";
            editAction.textContent = "edit_document"; 
            editAction.id = i;
            editAction.addEventListener("click", editCategory); 
            
            tableRow.appendChild(tdID);
            tableRow.appendChild(tdName);
            tableRow.appendChild(tdManage);

            tbody.appendChild(tableRow);
        }
    }
}

renderCategory();