var itemsCount = 0, itemsNum = 0, totalPrice = 0, login = false;
var categoryName = " ";
var productsArray = [], itemsOrder = [];

//class order
class Order {
    constructor(username, useremail, phone, address, itemsOrder, total, finalTotal, date) {
        this.userName = username;
        this.userEmail = useremail;
        this.userPhone = phone;
        this.userAddress = address;
        this.order = itemsOrder;
        this.cost = total;
        this.finalCost = finalTotal;
        this.date = date;
    }

    success() {
        $.alert({
            boxWidth: '50%',
            useBootstrap: false,
            type: 'green',
            animationSpeed: 200,// 0.2 seconds
            title: 'success!',
            content: 'We will contact you soon',
        });
    }
}



$(document).ready(function () {
    //header scroll
    var header = document.querySelector(".page-header");
    var toggleClass = "is-sticky";
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 150) {
            header.classList.add(toggleClass);
        } else {
            header.classList.remove(toggleClass);
        }
    });

    //request get categories from API
    $.ajax({
        url: 'https://dummyjson.com/products/categories',
        type: 'get',
        success: function (res) {
            var categoriesArray = []
            for (let i = 0; i < res.length; i++) {
                categoriesArray.push(res[i]);
            }
            categoriesArray.sort();
            getCategories(categoriesArray)
        },
        error: function (xhr) {
            console.log(xhr.status)
        }
    })

    //show categories list
    function getCategories(arr) {
        var categories = document.getElementById('categorries');
        for (let i = 0; i < arr.length; i++) {
            var category = document.createElement('li');
            var link = document.createElement('a');
            link.setAttribute('href', "#shop")
            category.setAttribute('category', arr[i]);
            link.classList.add('nav-categorries-item')
            category.classList.add('categoryClick')
            category.classList.add('nav-categorries-item')
            link.innerHTML = arr[i];

            category.append(link);
            category.setAttribute("onclick", 'getcategorySection( this )');
            categories.append(category);
        }

        //path categoryName and search in array ==> return products
        $(".categoryClick").on('click', function () {
            Items();
        });

        $("#skincare").on('click', function () {
            categoryName = "skincare";
            Items();
        });

        $("#laptops").on('click', function () {
            categoryName = "laptops";
            Items();
        });

        $("#fragrances").on('click', function () {
            categoryName = "fragrances";
            Items();
        });

        $("#groceries").on('click', function () {
            categoryName = "groceries";
            Items();
        });

        $("#all").on('click', function () {
            $('.prod-box').show(100);
        });

        $("#home-decoration").on('click', function () {
            categoryName = "home-decoration";
            Items();
        });
    }




    //show custom items
    function Items() {
        var foundItems = false;
        var cate = "." + categoryName
        console.log("click " + categoryName)
        for (let i = 0; i < productsArray.length; i++) {
            if (productsArray[i].category == categoryName) {
                console.log(productsArray[i])
                foundItems = true;
                $('.prod-box').hide();
                $(cate).show(100);
            }
            else {
                console.log('faild')
            }
        }

        if (foundItems == false) {
            $.dialog({
                boxWidth: '50%',
                useBootstrap: false,
                icon: 'fa fa-warning',
                type: 'purple',
                theme: 'modern',
                animationSpeed: 200,// 0.2 seconds
                title: 'Sorry!',
                content: 'Products sold out, coming soon',
            });
        }
    }


    //request get products from API
    $.ajax({
        url: 'https://dummyjson.com/products',
        type: 'get',
        success: function (res) {
            // productsArray = []
            for (let j = 0; j < res.products.length; j++) {
                productsArray.push(res.products[j]);
            }
            getAllProducts(productsArray)
            // console.log(productsArray)
        },
        error: function (xhr) {
            console.log(xhr.status)
        }
    })

    //show all products in shop
    function getAllProducts(arr) {
        var shop = document.getElementById('shop-cont');
        for (let i = 0; i < arr.length; i++) {
            var prodBox = document.createElement('div');
            prodBox.setAttribute("id", arr[i].id);
            prodBox.setAttribute("data", arr[i].category);
            prodBox.classList.add('prod-box');
            prodBox.classList.add(arr[i].category);
            var imgbox = document.createElement('div');
            imgbox.classList.add('img-box');
            var imgProd = document.createElement('img');
            imgProd.setAttribute('src', arr[i].thumbnail);
            imgbox.append(imgProd);
            var prodInfo = document.createElement('div');
            prodInfo.classList.add('prod-info');
            var prodTitle = document.createElement('h4');
            prodTitle.classList.add('prod-title');
            prodTitle.innerHTML = arr[i].title;
            var prodDescription = document.createElement('p');
            prodDescription.innerHTML = arr[i].description;
            prodDescription.classList.add('prod-description');
            var prodDetails = document.createElement('div');
            prodDetails.classList.add('prod-details');
            var prodCategory = document.createElement('span');
            prodCategory.classList.add('prod-category');
            prodCategory.innerHTML = arr[i].category;
            var prodBrand = document.createElement('span');
            prodBrand.innerHTML = arr[i].brand;
            prodBrand.classList.add('prod-brand');
            prodDetails.append(prodCategory);
            prodDetails.append(prodBrand);
            prodInfo.append(prodTitle);
            prodInfo.append(prodDescription);
            prodInfo.append(prodDetails);
            var prodBuy = document.createElement('div');
            prodBuy.classList.add('prod-buy');
            var prodPrice = document.createElement('span');
            prodPrice.innerHTML = arr[i].price + " $";
            prodPrice.classList.add('prod-price');
            var prodaddBtn = document.createElement('button');
            prodaddBtn.innerHTML = '<i class="icon-cart fa-solid fa-cart-shopping" ></i > '
            prodaddBtn.classList.add('prod-add-cart');
            prodaddBtn.setAttribute('data', arr[i].id)
            prodBuy.append(prodPrice);
            prodBuy.append(prodaddBtn);
            prodBox.append(imgbox);
            prodBox.append(prodInfo);
            prodBox.append(prodBuy);
            shop.append(prodBox);
        }
        //add event to get id prodect
        $("button.prod-add-cart").click(function () {
            var idProduct = $(this).attr('data')
            console.log(idProduct)
            addToCart(idProduct)
        })
    }


    //add items in cart
    function addToCart(x) {
        login = localStorage.getItem('log');
        // var fName = localStorage.getItem("fname");
        if (login == 'true') {
            var table = document.getElementById('table-body');
            for (let i = 0; i < productsArray.length; i++) {
                if (productsArray[i].id == x) {
                    console.log(productsArray[i])
                    var newRow = document.createElement('tr');
                    newRow.classList.add('parent')
                    var nameCell = document.createElement('td');
                    var title = document.createElement('p');
                    title.innerHTML = productsArray[i].title;
                    nameCell.append(title);
                    var imgCell = document.createElement('td');
                    var image = document.createElement('img');
                    image.classList.add('img-table')
                    image.setAttribute('src', productsArray[i].thumbnail);
                    imgCell.append(image);
                    var priceCell = document.createElement('td');
                    priceCell.innerHTML = "$ " + productsArray[i].price;
                    totalPrice += productsArray[i].price;
                    var removeCell = document.createElement('td');
                    var btn = document.createElement('button');
                    btn.innerHTML = "Delete"
                    btn.setAttribute('id', 'removeBtn')
                    btn.setAttribute('data-value', productsArray[i].price)
                    btn.setAttribute('data-number', (itemsCount))
                    btn.setAttribute('onclick', "deletefromCart(this)")
                    removeCell.append(btn);
                    newRow.append(nameCell);
                    newRow.append(imgCell);
                    newRow.append(priceCell);
                    newRow.append(removeCell);
                    table.append(newRow)
                    var itemObj = {
                        numberProudect: itemsNum,
                        idProduct: productsArray[i].id,
                        nameProduct: productsArray[i].title,
                        imgProduct: productsArray[i].thumbnail,
                        priceProduct: productsArray[i].price,
                    }
                    itemsNum++;
                    itemsCount++;
                    itemsOrder.push(itemObj);
                    updatecartItems();
                    updateTotal();
                    console.log(itemsOrder);
                }
            }
        } else {
            $.alert({
                boxWidth: '50%',
                useBootstrap: false,
                icon: 'fa fa-warning',
                type: 'red',
                animationSpeed: 200,// 0.2 seconds
                title: 'Alert!',
                content: 'Please login first',
            });
        }
    }


    // Button support ==> contact with what's app
    /*  $("#support").on("click", function () {
           // Define the message parameters
           var phoneNumber = "+201068585631"; // Replace with the recipient's phone number
           var message = "Hello from What's App,I need Support Brandeka !!"; // Replace with your desired message
           // Open the WhatsApp API link with the message parameters
           window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
       }); */

    //logout
    $('#logOut').click(function () {
        login = localStorage.getItem('log')
        if (login == "true") {
            $.confirm({
                type: 'red',
                icon: 'fa fa-warning',
                theme: 'supervan',// 'material', 'bootstrap'
                title: 'Logout ? ',
                content: 'Your time is out, you will be automatically logged out in 10 seconds.',
                autoClose: 'logoutUser|10000',
                buttons: {
                    logoutUser: {
                        text: 'logout myself',
                        action: function () {
                            localStorage.setItem("log", false);
                            document.getElementById('userWelcome').innerHTML = " "
                            setDefault();
                        }
                    },
                    cancel: function () {
                        $.dialog({
                            boxWidth: '50%',
                            useBootstrap: false,
                            icon: 'fa fa-warning',
                            type: 'purple',
                            theme: 'modern',
                            animationSpeed: 200,// 0.2 seconds
                            title: 'Canceled!',
                            content: ' ',
                        });
                    }
                }
            });
        }
    })


    //show all product
    $('#allProudect').click(function () {
        $('.prod-box').show(100);
    })
    //show dropdown categories
    $('#dropdown-menu').click(function () {
        $('#dropdown-content').toggle(100);
    });
    //open and close cart side
    $('#btnClose').click(function () {
        $('#cart').hide(500);
    });
    $('#btnOpen').click(function () {
        $('#cart').toggle(500);
    });
    //checkout 
    $('#Checkout').click(function () {
        login = localStorage.getItem('log');
        if (login == 'true') {
            $.confirm({
                theme: 'supervan',// 'material', 'bootstrap'
                type: 'purple',
                boxWidth: '70%',
                useBootstrap: false,
                title: 'Checkout!',
                content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<label class="label-form">Enter Your full name:</label>' +
                    '<input id="name" type="text" placeholder="Your name" class= " form-control" required /> ' +
                    '<label  class="label-form">Enter Your phone:</label>' +
                    '<input  id="phone"  type="tel" placeholder="Your phone" class=" form-control" required />' +
                    '<label   class="label-form">Enter Your address:</label>' +
                    '<input id="address" type="text" placeholder="Your address" class=" form-control" required />' +
                    '<label  class="label-form">If you have a coupon, enter it here:</label>' +
                    '<input id="coupon" type="text" placeholder="Your coupon" class=" form-control" />' +
                    '</div>' +
                    '</form>',
                buttons: {
                    formSubmit: {
                        text: 'Submit',
                        btnClass: 'btn-blue',
                        action: function () {
                            var name = this.$content.find('#name').val();
                            var phone = this.$content.find('#phone').val();
                            var address = this.$content.find('#address').val();
                            var coupon = this.$content.find('#coupon').val();
                            if (!name || !phone || !address) {
                                $.alert({
                                    boxWidth: '50%',
                                    useBootstrap: false,
                                    icon: 'fa fa-warning',
                                    type: 'red',
                                    animationSpeed: 200,// 0.2 seconds
                                    title: 'Alert!',
                                    content: 'provide a valid value',
                                });
                                return false;
                            }
                            var dateNow = new Date();
                            var mail = localStorage.getItem('email');

                            var finalPrice;
                            if (coupon != '') {
                                var found = false;
                                var coupons = ['#pirate10', '#free15', '#pirate20', '#free25', '#pirate30', '#free35', '#pirate40', '#free45', '#pirate50', '#free10', '#pirate15', '#free20', '#pirate25', '#free30', '#pirate35', '#free40', '#pirate45', '#free50'];
                                for (let i = 0; i < coupons.length; i++) {
                                    if (coupons[i] == coupon) {
                                        console.log(coupons[i] + "   " + coupon);
                                        //to get num from coupon
                                        found = true
                                    }
                                }
                                if (found == true) {
                                    var Discount = parseInt(coupon.slice(-2)) / 100;
                                    var totalValue = totalPrice - (totalPrice * Discount);
                                    finalPrice = parseInt(totalValue.toFixed(2));
                                    var ord1 = new Order(name, mail, phone, address, itemsOrder, totalPrice, finalPrice, dateNow);
                                    updateordes(ord1);
                                    setDefault();
                                } else {
                                    $.alert(
                                        {
                                            icon: 'fa fa-warning',
                                            title: 'Canceled',
                                            type: 'red',
                                            boxWidth: '50%',
                                            useBootstrap: false,
                                            content: 'invalid coupon',
                                        });
                                }
                            } else {
                                finalPrice = totalPrice;
                                var ord2 = new Order(name, mail, phone, address, itemsOrder, totalPrice, finalPrice, dateNow);
                                updateordes(ord2);
                                // ord2.sendOrder();
                                setDefault();
                            }
                        }
                    },
                    cancel: function () {
                        //close
                    },
                },
                onContentReady: function () {
                    // bind to events
                    var jc = this;
                    this.$content.find('form').on('submit', function (e) {
                        // if the user submits the form by pressing enter in the field.
                        e.preventDefault();
                        jc.$$formSubmit.trigger('click'); // reference the button and click it
                    });
                }
            });
        }
    });



    //open game page
    $('#gameNow').on('click', function () {
        window.open('../Slot Game/index.html')
    });
});


//set Default values
function setDefault() {
    itemsCount = 0, itemsNum = 0, totalPrice = 0;
    itemsOrder = [];
    document.getElementById('table-body').innerHTML = '';
    updateTotal();
    updatecartItems();
}

//get category name from drop menu
function getcategorySection(e) {
    categoryName = e.getAttribute('category')
    console.log("get name " + categoryName);
}

// console.log(productsArray)

//remove item from cart
function deletefromCart(e) {
    $(e).closest(".parent").remove();
    var valueStr = $(e).attr('data-value');
    var value = parseFloat(valueStr);
    totalPrice = (totalPrice - value);
    itemsCount--;
    var numstr = $(e).attr('data-number');
    var num = parseFloat(numstr);
    for (let i = 0; i < itemsOrder.length; i++) {
        if (itemsOrder[i].numberProudect === num) {
            itemsOrder.splice(i, 1);
        }
    }
    updateTotal();
    updatecartItems();
}

//clac total cost in cart
function updateTotal() {
    document.getElementById('totalCell').innerHTML = "$ " + totalPrice;
}
//conter items in cart
function updatecartItems() {
    document.getElementById('itemsNum').innerHTML = itemsCount;
}


var orders = []
localStorage.setItem('Orders', JSON.stringify(orders));

function updateordes(obj) {
    var ord = obj;
    // Retrieve array from local storage
    orders = JSON.parse(localStorage.getItem('Orders'));

    // Add new object to array
    orders.push(ord);

    // Save updated array to local storage
    localStorage.setItem('Orders', JSON.stringify(orders));

    // Retrieve updated array from local storage
    orders = JSON.parse(localStorage.getItem('Orders'));
    ord.success();
}