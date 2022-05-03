let isEditingexpensemanage = false;

document.getElementById('mainform').addEventListener('submit', addExpense);

// initial array of expensemanage, reading from localStorage
const expensemanage = JSON.parse(localStorage.getItem('expensemanage')) || [];
const friendnew = JSON.parse(localStorage.getItem('friendnew')) || [];


//add new friend
let newfriendval = document.getElementById('newfriend');
newfriendval.addEventListener('click', (e) => {
    let val1 = prompt("Enter the friend's name");
    var select = document.getElementById("addfriend"),
        newOption = document.createElement("OPTION"),
        newOptionValue = document.createTextNode(val1);
    if (val1 != "") {
        newOption.appendChild(newOptionValue);
        select.insertBefore(newOption, select.firstChildNode);
        friendnew.push(val1);
    }
    else {
        alert("Please enter a valid name, do not submit blank");
        return false;
    }

    // localStorage 
    localStorage.setItem('friendnew', JSON.stringify(friendnew));
    showFriends();
}
)

//display the newfriends added
const showFriends = () => {
    const friendsTable = document.getElementById('addfriend');//top multi select
    friendsTable.innerHTML = '';
    if (friendnew.length > 0) {
        for (let i = 0; i < friendnew.length; i++) {
            friendsTable.innerHTML += `<option value=${friendnew[i]}>${friendnew[i]}</option>`;
        }
    }

    const friendsTable2 = document.getElementById('cfriend2');//bottom friends filter
    friendsTable2.innerHTML = '';
    if (friendnew.length > 0) {
        for (let i = 0; i < friendnew.length; i++) {
            friendsTable2.innerHTML += `<option value=${friendnew[i]}>${friendnew[i]}</option>`;
        }
    }
}

//storing and validating values
function addExpense(e) {
    e.preventDefault();

    // get type, name, date, currency, amount and newfriend
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let date = document.getElementById('date').value;
    let currency = document.getElementById('currency').value;
    let amount = document.getElementById('amount').value;
    let newfriend = document.getElementById('addfriend').value;

    //validation
    if (type == "") { document.querySelector(".err-type").style.opacity = 1; return false; }
    else { document.querySelector(".err-type").style.opacity = 0; }

    if (name == "") { document.querySelector(".err-name").style.opacity = 1; return false; }
    else { document.querySelector(".err-name").style.opacity = 0; }

    if (currency == "") { document.querySelector(".err-currency").style.opacity = 1; return false; }
    else { document.querySelector(".err-currency").style.opacity = 0; }

    if (newfriend == "") { document.querySelector(".err-newfriend").style.opacity = 1; return false; }
    else { document.querySelector(".err-newfriend").style.opacity = 0; }

    if (date == "") { document.querySelector(".err-date").style.opacity = 1; return false; }
    else { document.querySelector(".err-date").style.opacity = 0; }

    if (amount == "") { document.querySelector(".err-amount").style.opacity = 1; return false; }
    else { document.querySelector(".err-amount").style.opacity = 0; }

    //storing the data to localstorage
    if (name.length > 0 && date != 0 && amount > 0) {
        const expense = {
            type,
            name,
            date,
            amount,
            newfriend,
            currency,
            id: expensemanage.length > 0 ? expensemanage[expensemanage.length - 1].id + 1 : 1,
        }
        console.log(expense.id);

        expensemanage.push(expense);
        // localStorage 
        localStorage.setItem('expensemanage', JSON.stringify(expensemanage));
        document.getElementById('mainform').reset();
    }

    showExp();
}


var selectedRow = null

function onFormSubmit(e) {
    event.preventDefault();
    var formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    }
    else {
        updateRecord(formData);
    }
    resetForm();
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["type"] = document.getElementById("type").value;
    formData["addfriend"] = document.getElementById("addfriend").value;
    formData["name"] = document.getElementById("name").value;
    formData["date"] = document.getElementById("date").value;
    formData["currency"] = document.getElementById("currency").value;
    formData["amount"] = document.getElementById("amount").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.type;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.addfriend;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.name;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.date;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.currency;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.amount;
    cell6 = newRow.insertCell(6);
    cell6.innerHTML = `<button onClick="onEdit(this)"><b>EDIT<B></button><br> <button onClick="onDelete(this)"><b>DELETE<b></button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("type").value = selectedRow.cells[0].innerHTML;
    document.getElementById("addfriend").value = selectedRow.cells[1].innerHTML;
    document.getElementById("name").value = selectedRow.cells[2].innerHTML;
    document.getElementById("date").value = selectedRow.cells[3].innerHTML;
    document.getElementById("currency").value = selectedRow.cells[4].innerHTML;
    document.getElementById("amount").value = selectedRow.cells[5].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.type;
    selectedRow.cells[1].innerHTML = formData.addfriend;
    selectedRow.cells[2].innerHTML = formData.name;
    selectedRow.cells[3].innerHTML = formData.date;
    selectedRow.cells[3].innerHTML = formData.currency;
    selectedRow.cells[3].innerHTML = formData.amount;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("type").value = '';
    document.getElementById("addfriend").value = '';
    document.getElementById("name").value = '';
    document.getElementById("date").value = '';
    document.getElementById("currency").value = '';
    document.getElementById("amount").value = '';
    selectedRow = null;
}


