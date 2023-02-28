function placeOrder(){
    fetch('./api/cart/placeOrder', {method: 'POST'})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.success){
                Swal.fire({
                    title: 'Product Added!!!',
                    icon: 'success',
                    timer: 4500,
                    confirmButtonText: 'Continue',
                    didClose: () => {
                        window.location.href('./');
                    }
                })
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: data.error,
                    icon: 'error',
                    timer: 4500,
                    confirmButtonText: 'Ok'
                })
            }
        
        });
}