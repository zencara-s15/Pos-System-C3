// element
const addProductForm = document.querySelector(".addProductForm")

// main function
function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}

// Data----------------------------

let products = [];

// Local Storage

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
  let productStorage = JSON.parse(localStorage.getItem("products"));
  if (productStorage !== null) {
    products = productStorage;
  }
}

function clearForm() {
  productName.value = ""
  productNetPrice.value = ""
  productPrice.value = ""
  productCatergory.value = "Select Catergory"
  productQty.value = ""
  productDescription.value = ""
}

// Add 
function addProduct(event) {

  // hide(addProductForm)

  event.preventDefault();

  let existingProductIndex = products.findIndex((product) => product.name === productName.value);

  let newProduct = {
    name: productName.value,
    price: productPrice.value,
    category: productCatergory.value,
    qty: productQty.value,
  };

  if (existingProductIndex !== -1) {
    let existingProduct = products[existingProductIndex];
    existingProduct.qty = Number(existingProduct.qty) + Number(newProduct.qty);
  } else {
    products.push(newProduct);
  }

  saveProducts();
  clearForm();
}
// remove products
function removeRow(e) {

  let isRemove = window.confirm("Are you sure about that?");
  if (isRemove) {
    e.target.closest('tr').remove();
    products.splice(e.target.id, 1)
  }

  let btnRemove = document.querySelectorAll('.deleteAction');

  for (let btn of btnRemove) {
    btn.addEventListener('click', removeRow);

  }
  saveProducts()
  loadProducts()
}


// show product to table 
let tbody = document.querySelector("tbody");

function renderProducts() {

  let productsStorage = JSON.parse(localStorage.getItem("products"));
  if (productsStorage !== null) {
    products = productsStorage;
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let tableRow = document.createElement('tr');

      let tdID = document.createElement('td');
      tdID.textContent = i + 1;

      let tdName = document.createElement('td');
      tdName.textContent = product.name;

      let tdCategory = document.createElement('td');
      tdCategory.textContent = product.category;

      let tdPrice = document.createElement('td');
      tdPrice.textContent = product.price;

      let tdAmount = document.createElement('td');
      tdAmount.textContent = product.qty;

      let tdManage = document.createElement('td');

      let deleteAction = document.createElement("img");
      deleteAction.id = i
      deleteAction.src = '../IMG/Delete.png';
      tdManage.appendChild(deleteAction);
      deleteAction.addEventListener('click', removeRow);

      let editAction = document.createElement("img");
      editAction.src = "../IMG/edit.png";
      // editAction.addEventListener("click");
      tdManage.appendChild(editAction);

      tableRow.appendChild(tdID);
      tableRow.appendChild(tdName);
      tableRow.appendChild(tdCategory);
      tableRow.appendChild(tdPrice);
      tableRow.appendChild(tdAmount);
      tableRow.appendChild(tdManage);

      tbody.appendChild(tableRow);
    }
  }
}
//search products

function searchProduct(event) {
  let searchText = event.target.value.toLowerCase();
  let tbody = document.getElementsByTagName("tbody")[0];
  let tdElements = tbody.querySelectorAll("tr");

  tdElements.forEach(function (tdElement) {
    let productName = tdElement.firstElementChild.nextElementSibling.textContent.toLowerCase();
    if (productName.includes(searchText)) {
      tdElement.style.display = "";
    } else {
      tdElement.style.display = "none";
    }
  });
}

let searchProductInput = document
  .getElementById("search-product")
  .querySelector("input");
searchProductInput.addEventListener("keyup", searchProduct);

// show add product form 
function add_product_form() {
  hide(orderForm)
  show(productForm)
}

// show order product form 

function order_product() {
  hide(productForm)
  show(orderForm)
}

let productName = document.querySelector('#product-name');
let productNetPrice = document.querySelector("#net-price");
let productPrice = document.querySelector("#product-price");
let productCatergory = document.querySelector("#product-catergory");
let productQty = document.querySelector("#product-qty");
let productDescription = document.querySelector("#product-description");

// form to add product 
let productForm = document.querySelector(".addProductForm");
let orderForm = document.querySelector(".order-form");

// console.log(productForm)

let addBtn = document.querySelector("#form-submit-btn");
addBtn.addEventListener("click", addProduct);

let showAddProductForm = document.querySelector("#display-add-form");
showAddProductForm.addEventListener("click", add_product_form);

let showOrderProductForm = document.querySelector("#display-order-form");
showOrderProductForm.addEventListener("click", order_product)

renderProducts();
loadProducts();
