let template = '';
let templateChat = '';
let products = {data: []};
let messages = {};
let socket;

fetch('/views/partials/table.hbs')
    .then(response => response.text())
    .then(data => {
        template = data;
        fetch('/views/partials/chat.hbs')
            .then(response => response.text())
            .then(data => {
                templateChat = data;
                initSocket();
            });
    });

function initSocket(){
    socket = io();
    
    socket.on('products-list', (data) => {
        data.products = data.data.length > 0;
        products = data;
        HbsCompile(template, products, 'products');
    });

    socket.on('messages-list', (data) => {
        messages.data = data;
        HbsCompile(templateChat, messages, 'chat-messages');
    });

    socket.on('product-success', (data) => {
        products.products = true;
        products.data.push(data.data);
        HbsCompile(template, products, 'products');
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
    });

    socket.on('product-error', (data) => {
        Swal.fire({
            title: 'Error!',
            text: data.error,
            icon: 'error',
            timer: 4500,
            confirmButtonText: 'Ok'
        })
    });

    socket.on('new-product', (data) => {
        products.data.push(data.data);
        HbsCompile(template, products, 'products');
    });

    socket.on('new-message', (data) => {
        messages.data.push(data.data);
        HbsCompile(templateChat, messages, 'chat-messages');
    });

    socket.on('message-success', (data) => {
        messages.data.push(data.data);
        HbsCompile(templateChat, messages, 'chat-messages');
    });

    socket.on('redirect', (destination) => {
        window.location.href = destination;
    });

    $('#add').click((event) => {
        event.preventDefault();
        socket.emit('add-product', {title: $('#title').val(), price: $('#price').val(), thumbnail: $('#thumbnail').val()});
    });

    $('#send').click((event) => {
        event.preventDefault();
        if($('#email').val() != "" && $('#message').val() != ""){
            const newMessage = {email: $('#email').val(), message: $('#message').val()};
            socket.emit('add-message', newMessage);
            $('#message').val('');
        }
    });
}

function HbsCompile(temp, options, id){
    var template = Handlebars.compile(temp);
    var compiled = template(options);
    var dom = document.querySelector('#'+id)
    dom.innerHTML = compiled;
    dom.scrollTop = dom.scrollHeight - dom.clientHeight;
}





