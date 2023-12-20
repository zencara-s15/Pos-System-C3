let soldOutData = JSON.parse(localStorage.getItem("sold_out"));

const Total = document.querySelector("h3");
const tbody = document.querySelector("tbody");

function renderOrder() {

    for (let i = 0; i < soldOutData.length; i++) {

        let tableRow = document.createElement('tr');
        let tdList = document.createElement('td');
        let tdName = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdQty = document.createElement('td');

        tdList.textContent = [i+1];
        tdName.textContent = soldOutData[i].product_name;
        tdPrice.textContent = soldOutData[i].product_price;
        tdQty.textContent = soldOutData[i].product_qty;

        tableRow.appendChild(tdList);
        tableRow.appendChild(tdName);
        tableRow.appendChild(tdPrice);
        tableRow.appendChild(tdQty);
        
        tbody.appendChild(tableRow);
        
        Total.textContent = "Total: " + soldOutData[i].total
    }
}

renderOrder()