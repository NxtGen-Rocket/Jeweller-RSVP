
const getDataUrl = "https://contactus-service-node.onrender.com/jcsoni/api/v1/get/all";
const tableHead = document.getElementById("table-head")
const tableBody = document.getElementById("table-body");

const noNeedColumn = (column) => column === "_id" || column === "createdAt" || column === "updatedAt";

function fillData(users) {
    if (users?.length > 0) {
        const columns = Object.keys(users[0]);
        const tableHeaderRow = document.createElement("tr");
        const th = document.createElement("th");
        th.innerText = "S.No";
        tableHeaderRow.appendChild(th);

        columns.forEach(column => {
            if (!noNeedColumn(column)) {
                const th = document.createElement("th");
                th.innerText = column;
                tableHeaderRow.appendChild(th);
            }
        });
        tableHead.appendChild(tableHeaderRow);
        let rowNumber = 1;
        users.forEach(user => {
            const row = document.createElement("tr");
            const firstCell = document.createElement("td");
            firstCell.innerText = rowNumber++;
            row.appendChild(firstCell);
            columns.forEach(column => {
                if (!noNeedColumn(column)) {
                    const cell = document.createElement("td");
                    cell.innerText = user[column];
                    row.appendChild(cell);
                }
            })
            tableBody.appendChild(row);
        })
    }


}
async function getAllData() {
    try {
        const response = await fetch(getDataUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "page": 1,
                "limit": 100000
            })
        });
        const data = await response.json();
        fillData(data.docs);
    }
    catch (error) {
        alert("oops! Something went wrong, Please try again");
    }
}

getAllData();

