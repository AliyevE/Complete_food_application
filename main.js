const productContainer = document.querySelector('#productContainer')
const cartProducts = document.querySelector('#cartProducts')
const total = document.querySelector('#total')

let cart = []
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
}


function showProducts() {
    fetch('./burgers.json')
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            data.forEach(burger => {
                productContainer.innerHTML += `
            <div class="flex_card">
                        <div class="flex_card_img">
                            <img src="${burger.img}" alt="">
                        </div>
                        <div class="flex_card_text">
                            <p>${burger.price}</p>
                            <h4>${burger.name}</h4>
                            <span>${burger.qr}</span>
                            <button onclick="addToCart(${burger.id})">Добавить</button>
                        </div>
                    </div>
            
            `
            });
        })
}

showProducts()

function addToCart(id) {
    const checkCart = cart.find(data => data.id == id)

    if (checkCart) {
        checkCart.count += 1
        localStorage.setItem('cart', JSON.stringify(cart))
        showCart()
        totalSum()
    } else {
        fetch('./burgers.json')
            .then(resp => resp.json())
            .then(data => {
                let product = data.find(data => data.id == id)
                cart.push(product)
                localStorage.setItem('cart', JSON.stringify(cart))
                showCart()
                totalSum()
            })
    }
}


function showCart() {
    cartProducts.innerHTML=' '
    cart.forEach(data=>{
        console.log(data);
        
            cartProducts.innerHTML += `
        <div class="cart_product">
        <div class="cart_prod_left">
            <div class="cart_img">
                <img src="${data.img}" alt="">
            </div>
        <div class="cart_prod_info">
             <h5>${data.name}</h5>
             <span>${data.qr}</span>
             <p>${data.price*data.count}</p>
        </div>
    </div>
         <div class="counter">
            <button onclick="changeCount('dec',${data.id})">-</button>
            <p>${data.count}</p>
            <button onclick="changeCount('inc',${data.id})">+</button>
        </div>
    </div>
    `


})

            
}
showCart()

function changeCount(type,id){
    console.log('salam');
    if(type=='inc'){
        const checkCart=cart.find(data=>data.id==id)
        checkCart.count++;
        totalSum()
    }else{
        const checkCart=cart.find(data=>data.id==id)
        checkCart.count--;
        totalSum()
        if(checkCart.count==0){
            const ind=cart.findIndex(data=>data.id==id)
            cart.splice(ind,1)
            totalSum()
        }
    }
    showCart()
    localStorage.setItem('cart', JSON.stringify(cart))
}


function totalSum(){
    let sum=0
    cart.forEach(data=>{
        sum+=data.price*data.count
    })
    console.log(sum);
    total.innerHTML=sum
}
totalSum()