let menu = document.querySelector(".menu");
let menuImg = document.querySelector(".menuImage");
function getMenu() {
    fetch("./data.json").then((response) => response.json()).then((json) => {
        json.forEach(element => {
            menu.innerHTML += `
            <div class="card">
                <img src=${element.imgSrc} alt="" class="card-main-img">
                <div class="card-content">
                    <div class="card-start-content">
                        <p class="food-name">${element.name}</p>
                        <p class="cost">$${element.price}/-</p>
                    </div>
                    <div class="card-end-content">
                        <img src="./assets/plus.jpg" alt="">
                    </div>
                </div>
            </div>
            `

        });
    })
}
function takeOrder() {
    const burgers = [
        { name: "Cheese Burger", price: 5.99 },
        { name: "Veggie Burger", price: 6.49 },
        { name: "Bacon Burger", price: 7.49 },
        { name: "Chicken Burger", price: 6.99 },
        { name: "Mushroom Burger", price: 6.79 },
        { name: "Double Cheese Burger", price: 8.99 },
        { name: "BBQ Burger", price: 7.99 },
        { name: "Fish Burger", price: 7.29 },
        { name: "Turkey Burger", price: 6.49 },
        { name: "Spicy Burger", price: 7.49 }
    ];
    return new Promise(resolve => {
        setTimeout(() => {
            const randomBurger = [];
            for (let i = 0; i < 3; i++) {
                let burgerIndex = Math.floor(Math.random() * burgers.length);
                randomBurger.push(burgers[burgerIndex])
            }
            resolve(randomBurger);
        }, 2500)
    })
}
function orderPrep(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (order.length == 3) {
                let orderPrepObj = { order_status: true, paid: false }
                resolve(orderPrepObj)
            }
            else {
                reject("order did not recieved")
            }
        }, 1500)
    })
}
function payOrder(orderObject) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (orderObject.order_status) {
                orderObject.paid = true;
                resolve(orderObject)
            }
            else {
                reject("did not paid")
            }
        }, 1000)
    })
}
function thankyouFnc() {
    alert("thankyou for eating with us today!")
}
function main() {
    takeOrder().then((order) => {
        return orderPrep(order)
    }).then((paid) => {
        return payOrder(paid);
    }).then(payOrderStatus => {
        if (payOrderStatus && payOrderStatus.paid) {
            thankyouFnc()
        }
    }).catch((err) => {
        alert(err)
    })
}
main()
function secondScreen(e) {
    e.preventDefault();
    menuImg.style.display = "none";
}
document.addEventListener("DOMContentLoaded", getMenu)


