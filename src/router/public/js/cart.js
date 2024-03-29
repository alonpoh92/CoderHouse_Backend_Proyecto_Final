function removeQty(min){
    event.preventDefault();
    const qtyElement = event.currentTarget.nextElementSibling;
    let qty = Number(qtyElement.innerHTML);
    if(qty > min){
        qtyElement.innerHTML = qty - 1;
        calcTotal();
    }
}

function addQty(max){
    event.preventDefault();
    const qtyElement = event.currentTarget.previousElementSibling;
    let qty = Number(qtyElement.innerHTML);
    if(qty < max){
        qtyElement.innerHTML = qty + 1;
        calcTotal();
    }
}

function calcTotal(){
    const totalElement = document.getElementById("total");
    const qtyElement = document.getElementsByClassName("qty");
    const items = [];
    let cartId = "";
    for(let item of qtyElement){
        const id = item.getAttribute("value");
        const qty = item.innerHTML;
        cartId = item.getAttribute("cartId");
        if(qty > 0){
            items.push({id, qty});
        }
    }
    const data = {items: JSON.stringify(items)};
    fetch('/api/cart/'+cartId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(res) {
        return res.json();
    }).then(function(myJson){
        if(myJson.success){
            Swal.fire({
                icon: 'success',
                text: 'Cart has been updated',
                timer: 4500,
                confirmButtonText: 'Continue',
                didClose: () => {
                    location.reload();
                }
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: myJson.message,
                timer: 4500,
                confirmButtonText: 'Continue',
                didClose: () => {
                    location.reload();
                }
            })
        }
    });
}

function validateAddress(){
    event.preventDefault();
    const address = document.getElementById('address').value.trim().toLowerCase();
    const placeButton = document.getElementById('placeOrder');
    if(address.length > 0){
        placeButton.classList.remove('disabled');
    }else{
        placeButton.classList.add('disabled');
    }
}

function placeOrder(){
    const address = document.getElementById('address').value.trim().toLowerCase();
    const cartId = document.getElementsByClassName("qty")[0].getAttribute("cartId");
    const data = {address};
    fetch('/api/order/'+cartId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(res) {
        return res.json();
    }).then(function(myJson){
        if(myJson.success){
            Swal.fire({
                icon: 'success',
                text: 'Your order has been placed',
                timer: 4500,
                confirmButtonText: 'Continue',
                didClose: () => {
                    window.location.href = "/";
                }
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: myJson.message,
                timer: 4500,
                confirmButtonText: 'Continue',
                didClose: () => {
                    location.reload();
                }
            })
        }
    });
}
