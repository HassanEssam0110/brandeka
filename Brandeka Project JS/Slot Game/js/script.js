var buttonSpin = document.getElementById('spin');
var loadIcon = document.getElementById('load')
var closeMessage = document.getElementById('closeMessage');
var messageBox = document.getElementById('message-container');
var coinCounter = document.getElementById('coin');

var login = localStorage.getItem('log');

//sound trak
var trak = document.getElementById('trak');
trak.volume = 0.2;
// trak.play();


var coin = parseInt(localStorage.getItem('coins'));
if (coin > 0) {
    buttonSpin.classList.remove('btn-display');
} else {
    buttonSpin.classList.add('btn-display');
}


//get coins in page
coinCounter.innerHTML = coin;



buttonSpin.addEventListener('click', () => {
    //show
    setTimeout(() => {
        buttonSpin.classList.add('btn-display')
        playSound();
        showIcon()
        checkCoins();
        buttonSpin.classList.add('btn-display')
    }, 500);

    //hide
    setTimeout(() => {
        hideIcon();
        getRandomNumbers();
    }, 1500);
});

closeMessage.addEventListener('click', () => {
    messageBox.classList.add('hide-message-container');
})

//function show icon
function showIcon() {
    loadIcon.classList.add('show-icon')
}
//function hidden icon
function hideIcon() {
    loadIcon.classList.remove('show-icon')
}




//generate numbers
function getRandomNumbers() {
    var num1 = Math.floor(Math.random() * 2)
    var num2 = Math.floor(Math.random() * 2)
    var num3 = Math.floor(Math.random() * 2)
    document.getElementById('item1').innerHTML = num1;
    document.getElementById('item2').innerHTML = num2;
    document.getElementById('item3').innerHTML = num3;
    console.log(num1, num2, num3)
    document.getElementById('number-user').innerHTML = num1 + " " + num2 + " " + num3;
    cheker(num1, num2, num3)
}

//check winner
function cheker(n1, n2, n3) {
    if (n1 === n2 && n2 === n3) {
        console.log('win');
        setTimeout(() => {
            win();
            winnerSound()
        }, 100);

    } else {
        console.log('lose');
        setTimeout(() => {
            lose();
            loserSound();
        }, 100);
    }
}

//get message
function win() {
    messageBox.classList.remove('hide-message-container');
    document.getElementById('win').classList.remove('hide-message');
    document.getElementById('lose').classList.add('hide-message');
    document.getElementById('code').innerHTML = getCoupons();
}
function lose() {
    messageBox.classList.remove('hide-message-container');
    document.getElementById('lose').classList.remove('hide-message');
    document.getElementById('win').classList.add('hide-message');
}



//to get num from coupon
// var str = "#free20"
// console.log(parseInt(str.slice(-2)))

//function generate coupon
function getCoupons() {
    var coupons = ['#pirate10', '#free15', '#pirate20', '#free25', '#pirate30', '#free35', '#pirate40', '#free45', '#pirate50', '#free10', '#pirate15', '#free20', '#pirate25', '#free30', '#pirate35', '#free40', '#pirate45', '#free50'];
    var coupon = coupons[Math.floor(Math.random() * coupons.length)]
    console.log("coupon " + coupon);
    return coupon;
}


/*check coins */
function checkCoins() {
    coin--;
    if (coin > 0) {
        coinCounter.innerHTML = coin;
        buttonSpin.classList.remove('btn-display')
        parent(localStorage.setItem('coins', coin));
    } else if (coin == 0 || coin < 0) {
        buttonSpin.classList.add('btn-display')
        coin = 0;
        coinCounter.innerHTML = coin;
    }
}



/*Get More coins to user */
function getMoreCoins() {
    var newWindow = window.open("https://www.google.com", "_blank", "width=200, height=300");
    setTimeout(() => {
        coin += 1;
        coinCounter.innerHTML = coin;
        parent(localStorage.setItem('coins', coin));
    }, 1000);

    setTimeout(function () {
        newWindow.close();
    }, 3000)
}


/*sounds */
function playSound() {
    var play = document.getElementById('sound');
    play.play();
}

function winnerSound() {
    var winner = document.getElementById('winnerSound');
    winner.play();
}

function loserSound() {
    var loser = document.getElementById('loserSound');
    loser.play();
}
