let products = [];
let categories = [];
let update_product = []
let sold_out = []
let totalPrice = 0;
let quantity = 1;

function hide(element) {
  element.style.display = "none";
}

function show(element) {
  element.style.display = "block";
}


function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}
function saveOrder() {
  localStorage.setItem("sold_out", JSON.stringify(sold_out));
}
function loadProducts() {
  let productStorage = JSON.parse(localStorage.getItem("products"));
  if (productStorage !== null) {
    products = productStorage;
  }
}

function displayCategory(element) {
  const storedCategories = localStorage.getItem('categories');
  if (storedCategories !== null) {
    categories = JSON.parse(storedCategories);
    for (let i = 0; i < categories.length; i++) {
      let newOption = document.createElement('option');
      newOption.value = categories[i].name;
      newOption.textContent = categories[i].name;
      element.appendChild(newOption)
    }
  }
}

function editProduct(event) {

  show(navleft)
  show(addProductForm);

  let tableRow = event.target.closest("tr");
  let productNameEdit = tableRow.querySelector("td:nth-child(2)").textContent;
  let productNetPriceEdit = tableRow.querySelector("td:nth-child(3)").textContent;
  let productPriceEdit = tableRow.querySelector("td:nth-child(4)").textContent;
  let productCategoryEdit = tableRow.querySelector("td:nth-child(5)").textContent;
  let productQtyEdit = tableRow.querySelector("td:nth-child(6)").textContent;

  productName.value = productNameEdit;
  productNetPrice.value = parseInt(productNetPriceEdit.slice(0, -1));
  productPrice.value = parseInt(productPriceEdit.slice(0, -1));
  productCatergory.value = productCategoryEdit;
  productQty.value = productQtyEdit;

  formTitle.textContent = "Update Product"
  addBtn.textContent = "Update";
  addBtn.removeEventListener("click", addProduct);
  addBtn.addEventListener("click", updateProduct);

  update_product = Array.from(tableRow.parentNode.children).indexOf(tableRow);
}

function updateProduct(event) {
  event.preventDefault();

  let updatedProduct = {
    name: productName.value,
    net_price: productNetPrice.value,
    price: productPrice.value,
    category: productCatergory.value,
    qty: productQty.value,
  };
  products[update_product] = updatedProduct;
  saveProducts();
  clearForm();

  formTitle.textContent = "Add new Product"
  addBtn.textContent = "Add";
  addBtn.removeEventListener("click", updateProduct);
  addBtn.addEventListener("click", addProduct);

  renderProducts();
  location.reload();
}

function categoryView() {
  displayCategory(document.querySelector("#product-categories"))
  displayCategory(document.querySelector("#product-categories2"))
}

function clearForm() {
  productName.value = ""
  productNetPrice.value = ""
  productPrice.value = ""
  productCatergory.value = "Select Catergory"
  productQty.value = ""
  productDescription.value = ""
}

function addProduct(event) {
  event.preventDefault();

  formTitle.textContent = "Addd New Product"
  let existingProductIndex = products.findIndex((product) => product.name === productName.value);

  let newProduct = {
    name: productName.value,
    net_price: productNetPrice.value,
    price: productPrice.value,
    category: productCatergory.value,
    qty: productQty.value,
    sold_out: [],
  };
  if (existingProductIndex !== -1) {
    let existingProduct = products[existingProductIndex];
    existingProduct.qty = Number(existingProduct.qty) + Number(newProduct.qty);
  } else {
    products.push(newProduct);
  }
  location.reload()
  saveProducts();
  clearForm();
}

function removeRow(e) {

  let isRemove = window.confirm("Are you sure about that?");
  if (isRemove) {
    e.target.closest('tr').remove();
    products.splice(e.target.id, 1)
  }
  saveProducts()
  loadProducts()
}

function removeOrderItem(e) {
  let isRemove = window.confirm("Are you sure about that?");
  if (isRemove) {
    e.target.closest('.order-card').remove();
    products.splice(e.target.id, 1)
  }
  updateTotalPrice()
}

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
      tdPrice.textContent = product.price + "$";

      let tdnetPrice = document.createElement('td');
      tdnetPrice.textContent = product.net_price + "$";

      let tdAmount = document.createElement('td');
      tdAmount.textContent = product.qty;

      let tdDes = document.createElement('td');
      tdDes.textContent = product.des;

      let tdManage = document.createElement('td')
      tdManage.classList.add("manage");

      let deleteBtn = document.createElement('span');
      deleteBtn.className = "delete material-symbols-outlined";
      deleteBtn.textContent = "delete";
      deleteBtn.addEventListener('click', removeRow);
      tdManage.appendChild(deleteBtn);

      let editAction = document.createElement("span");
      editAction.className = "edit material-symbols-outlined";
      editAction.textContent = "edit_document";
      editAction.addEventListener("click", editProduct);
      tdManage.appendChild(editAction);

      let cartAction = document.createElement("span");
      cartAction.className = "cart material-symbols-outlined";
      cartAction.textContent = "add_shopping_cart";
      cartAction.addEventListener("click", order_product);
      tdManage.appendChild(cartAction);

      tableRow.appendChild(tdID);
      tableRow.appendChild(tdName);
      tableRow.appendChild(tdnetPrice);
      tableRow.appendChild(tdPrice);
      tableRow.appendChild(tdCategory);
      tableRow.appendChild(tdAmount);
      tableRow.appendChild(tdManage);

      tbody.appendChild(tableRow);
    }
  }
}

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

function add_product_form() {
  show(navleft)
  hide(orderForm)
  show(productForm)
}

function hideForm() {
  hide(productForm)
  location.reload()
}


function order_product(event) {

  show(navleft)
  hide(productForm);
  show(orderForm);
  show(document.querySelector("#purchase-btn"));

  const tableRow = event.target.closest("tr");
  const productName = tableRow.querySelector("td:nth-child(2)").textContent;
  const productPrice = tableRow.querySelector("td:nth-child(4)").textContent;

  const existingOrderCard = Array.from(order_body.getElementsByClassName('PO-title')).find(element => element.textContent === productName)?.closest(".order-card");
  if (existingOrderCard) {
    const orderQtySpan = existingOrderCard.querySelector("#order-qty");
    const currentQuantity = parseInt(orderQtySpan.textContent);
    const newQuantity = currentQuantity + 1;
    orderQtySpan.textContent = newQuantity;

    totalPrice += parseInt(productPrice);
    document.querySelector(".order-total").textContent =
      "Total: " + totalPrice + "$";
  } else {

    const orderCardDiv = document.createElement("div");
    orderCardDiv.classList.add("order-card");

    const productOrderNameDiv = document.createElement("div");
    productOrderNameDiv.classList.add("product-order-name");

    const productNameSpan = document.createElement("span");
    productNameSpan.classList.add("PO-title");
    productNameSpan.textContent = productName;

    const productPriceSpan = document.createElement("span");
    productPriceSpan.classList.add("PO-price");
    productPriceSpan.textContent = productPrice;

    productOrderNameDiv.appendChild(productNameSpan);
    productOrderNameDiv.appendChild(productPriceSpan);

    const poQtyDiv = document.createElement("div");
    poQtyDiv.classList.add("PO-qty");

    const orderQtySpan = document.createElement("span");
    orderQtySpan.id = "order-qty";
    orderQtySpan.textContent = quantity;

    const minusButton = document.createElement("button");
    minusButton.classList.add("minus-order");
    minusButton.textContent = "-";
    minusButton.addEventListener("click", function () {
      decreaseQuantity(orderQtySpan);
    });

    const plusButton = document.createElement("button");
    plusButton.classList.add("plus-order");
    plusButton.textContent = "+";
    plusButton.addEventListener("click", function () {
      increaseQuantity(orderQtySpan);
    });

    const removeOrder = document.createElement("div");
    removeOrder.classList.add("remove-order");

    const deleteOrder = document.createElement('span');
    deleteOrder.className = "deleteOrder material-symbols-outlined";
    deleteOrder.textContent = "delete";
    deleteOrder.addEventListener('click', removeOrderItem);
    removeOrder.appendChild(deleteOrder);

    poQtyDiv.appendChild(minusButton);
    poQtyDiv.appendChild(orderQtySpan);
    poQtyDiv.appendChild(plusButton);

    orderCardDiv.appendChild(productOrderNameDiv);
    orderCardDiv.appendChild(poQtyDiv);
    orderCardDiv.appendChild(removeOrder);

    order_body.appendChild(orderCardDiv);

    totalPrice += parseInt(productPrice);
    document.querySelector(".order-total").textContent =
      "Total: " + totalPrice + "$";

    let newHistory = {
      product_name: productName,
      product_price: productPrice,
      total: totalPrice + "$",
      product_qty: quantity,
    }
    addToHistory(newHistory)
    saveOrder()
  }
}

function addToHistory(e) {
  sold_out.push(e)
}

function decreaseQuantity(element) {
  let quantity = parseInt(element.textContent);
  if (quantity > 1) {
    quantity--;
    element.textContent = quantity;
    updateTotalPrice();
  }
}

function increaseQuantity(element) {
  let quantity = parseInt(element.textContent);
  quantity++;
  element.textContent = quantity;
  updateTotalPrice();
}

function updateTotalPrice() {
  let orderCards = document.querySelectorAll(".order-card");
  let totalPrice = 0;

  orderCards.forEach(function (orderCard) {
    let priceSpan = orderCard.querySelector(".PO-price");
    let qtySpan = orderCard.querySelector("#order-qty");

    let price = parseInt(priceSpan.textContent);
    let quantity = parseInt(qtySpan.textContent);

    totalPrice += price * quantity;
  });

  document.querySelector(".order-total").textContent = "Total: " + totalPrice + "$";
}

function cancel_order() {
  hide(orderForm)
  location.reload()
}
function reciept() {
  alert('Succes')
  cancel_order()
}

const addProductForm = document.querySelector(".addProductForm")
const navleft = document.querySelector(".nav-left")

const productName = document.querySelector('#product-name');
const productNetPrice = document.querySelector("#net-price");
const productPrice = document.querySelector("#product-price");
const productCatergory = document.querySelector("#product-categories");
const productQty = document.querySelector("#product-qty");
const productDescription = document.querySelector("#product-description");

const order_body = document.querySelector(".order-body");

const productForm = document.querySelector(".addProductForm");
const formTitle = document.querySelector(".form-title")
const showAddProductForm = document.querySelector("#display-add-form");
const orderForm = document.querySelector(".order-form");

const addBtn = document.querySelector("#form-submit-btn");
const cancelBtn = document.querySelector("#form-cancel-btn")
const cancelOrderBtn = document.querySelector("#cancelOrder")
const purchaseBtn = document.querySelector("#purchase-btn");

addBtn.addEventListener("click", addProduct);
cancelBtn.addEventListener("click", hideForm)
cancelOrderBtn.addEventListener("click", cancel_order)
purchaseBtn.addEventListener("click", reciept)
showAddProductForm.addEventListener("click", add_product_form);

categoryView();
renderProducts();
loadProducts();
