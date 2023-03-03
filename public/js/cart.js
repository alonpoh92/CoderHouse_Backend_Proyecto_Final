function placeOrder(){
    fetch('./api/cart/placeOrder', {method: 'POST'})
        .then(response => response.json())
        .then(data => {
            if(data.success){
                Swal.fire({
                    title: 'Your Order Has Been Placed!!!',
                    icon: 'success',
                    timer: 4500,
                    confirmButtonText: 'Continue',
                    didClose: () => {
                        window.location.assign('/');
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