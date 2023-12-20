
let soldOutData = JSON.parse(localStorage.getItem("sold_out"))
console.log(soldOutData);

const tbody = document.querySelector("tbody");

function renderOrder() {

    for (let i = 0; i < soldOutData.length; i++) {

        let tableRow = document.createElement('tr');

        let tdName = document.createElement('td');
        tdName.textContent = soldOutData[i].product_name;

        let tdPrice = document.createElement('td');
        tdPrice.textContent = soldOutData[i].product_price;

        let tdQty = document.createElement('td');
        tdQty.textContent = soldOutData[i].product_qty;

        tableRow.appendChild(tdName);
        tableRow.appendChild(tdPrice);
        tableRow.appendChild(tdQty);
        
        tbody.appendChild(tableRow);
        Total.textContent = "Total: " + soldOutData[i].total
    }
}
let Total = document.querySelector("h3")

renderOrder()