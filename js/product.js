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

function clearForm(){
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

// show add product form 
function add_product_form() {
  hide(orderForm)
  show(productForm)
}

// show order product form 

function order_product(){
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
showOrderProductForm.addEventListener("click" , order_product)



loadProducts();
