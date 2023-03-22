let template = '';
let templateChat = '';
let products = {data: []};
let messages = {};
let socket;


fetch('/views/partials/chat.hbs')
    .then(response => response.text())
    .then(data => {
        templateChat = data;
        initSocket();
    });

function initSocket(){
    socket = io();
    
    socket.on('messages-list', (data) => {
        messages.data = data;
        messages.data.sort((a, b) => {
            return a.createdAt - b.createdAt;
        });
        console.log(messages.data)
        HbsCompile(templateChat, messages, 'chat-messages');
    });

    socket.on('new-message', (data) => {
        messages.data.push(data.data);
        messages.data.sort((a, b) => {
            return a.createdAt - b.createdAt;
        });
        HbsCompile(templateChat, messages, 'chat-messages');
    });

    socket.on('message-success', (data) => {
        messages.data.push(data.data);
        messages.data.sort((a, b) => {
            return a.createdAt - b.createdAt;
        });
        HbsCompile(templateChat, messages, 'chat-messages');
    });

    socket.on('redirect', (destination) => {
        window.location.href = destination;
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





