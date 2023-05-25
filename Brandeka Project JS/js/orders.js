var table = document.getElementById('table-body');
var orders = [];

 orders = JSON.parse(localStorage.getItem('Orders'));

for (let i = 0; i < orders.length; i++) {
    console.log(orders[i])
    var row = document.createElement('tr');
    row.classList.add('parent')

    var num = document.createElement('td');
    num.innerHTML = (i + 1);

    var userName = document.createElement('td');
    userName.innerHTML = orders[i].userName;

    var userEmail = document.createElement('td');
    userEmail.innerHTML = orders[i].userEmail;


    var userPhone = document.createElement('td');
    userPhone.innerHTML = orders[i].userPhone;

    var userAddress = document.createElement('td');
    userAddress.innerHTML = orders[i].userAddress;

    var userOrder = document.createElement('td');
    for (let j = 0; j < orders[i].order.length; j++) {
        var proudect = document.createElement('p');
        proudect.innerHTML = "- " + orders[i].order[j].nameProduct;
        userOrder.append(proudect);
    }

    var cost = document.createElement('td');
    cost.innerHTML = "$" + orders[i].cost;

    var finalCost = document.createElement('td');
    finalCost.innerHTML = "$" + orders[i].finalCost;

    var date = document.createElement('td');
    date.innerHTML = orders[i].date;


    var doneOrder = document.createElement('td');
    var done = document.createElement('button');

    done.innerHTML = "Done"
    done.setAttribute('id', 'removeBtn')
    done.setAttribute('onclick', "deletefromCart(this)")
    doneOrder.append(done);


    row.append(num);
    row.append(userName);
    row.append(userEmail);
    row.append(userPhone);
    row.append(userAddress);
    row.append(userOrder);
    row.append(cost);
    row.append(finalCost);
    row.append(date);
    row.append(doneOrder);
    table.append(row);
}

function deletefromCart(e) {
    $(e).closest(".parent").css("background-color", "#f1f1f1");
}



