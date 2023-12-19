

let products = [];

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
  let productsStorage = JSON.parse(localStorage.getItem("products"));
  if (productsStorage !== null) {
    products = productsStorage;
  }
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
      tdPrice.textContent = product.price;
      
      let tdAmount = document.createElement('td');
      tdAmount.textContent = product.qty;

      let tdProgress = document.createElement('td');
      let ProgressUP  = document.createElement('span');
      ProgressUP.className = "cart material-symbols-outlined";
      ProgressUP.textContent = "expand_less";
      tdProgress.appendChild(ProgressUP);
      
      tableRow.appendChild(tdID);
      tableRow.appendChild(tdName);
      tableRow.appendChild(tdCategory);
      tableRow.appendChild(tdPrice);
      tableRow.appendChild(tdAmount);

      tableRow.appendChild(tdProgress);
      

      
      tbody.appendChild(tableRow);
    }
  }
}

renderProducts();
loadProducts();
