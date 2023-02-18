function ajaxDone(data){
    if(!data.error){
        Swal.fire({
            title: 'Product Added!!!',
            html: `<p class="mb-0"><span class="fw-bold">Id: </span>${data.data.id}</p>
            <p class="mb-0"><span class="fw-bold">Title: </span>${data.data.title}</p>
            <p class="mb-0"><span class="fw-bold">Price: </span>$${data.data.price}</p>
            <img style="width: 100px; max-width: 100px;" src="${data.data.thumbnail}">`,
            icon: 'success',
            timer: 4500,
            confirmButtonText: 'Continue',
            didClose: () => {
                $('#addForm').trigger("reset");
            }
        })
        console.log(data);
    }else{
        Swal.fire({
            title: 'Error!',
            text: data.error,
            icon: 'error',
            timer: 4500,
            confirmButtonText: 'Ok'
        })
    }

    
}

function error(data){
}

$('#add').click((event) => {
    event.preventDefault();
    socket.emit('add-product', {title: $('#title').val(), price: $('#price').val(), thumbnail: $('#thumbnail').val()});
});