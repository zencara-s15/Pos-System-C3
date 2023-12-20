const tbody = document.querySelector("tbody");


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
      let tdCategory = document.createElement('td');
      let tdPrice = document.createElement('td');
      let tdAmount = document.createElement('td');
      let tdProgress = document.createElement('td');
      let ProgressUP  = document.createElement('span');
      
      tdName.textContent = product.name;
      tdCategory.textContent = product.category;
      tdPrice.textContent = product.price + "$";
      tdAmount.textContent = product.qty;
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
