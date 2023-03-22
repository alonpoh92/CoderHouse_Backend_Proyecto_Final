function removeQty(min){
    event.preventDefault();
    const qtyElement = event.currentTarget.nextElementSibling;
    let qty = Number(qtyElement.innerHTML);
    if(qty > min){
        qtyElement.innerHTML = qty - 1;
    }
}

function addQty(max){
    event.preventDefault();
    const qtyElement = event.currentTarget.previousElementSibling;
    let qty = Number(qtyElement.innerHTML);
    if(qty < max){
        qtyElement.innerHTML = qty + 1;
    }
}

function addProduct(cartId, productId){
    const qtyElement = event.currentTarget.previousElementSibling.getElementsByTagName('span')[0];
    const qty = Number(qtyElement.innerHTML);
    const url = "/api/cart/"+cartId;
    const data = {
        productId,
        qty
    }
    fetch(url, {
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
                text: `Added ${qty} product(s) successfully`,
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