let template = '';
let products = {};

function HbsCompile(temp, options, id){
    var template = Handlebars.compile(temp);
    var compiled = template(options);
    document.querySelector('#'+id).innerHTML = compiled;
}

fetch('/table_layout.hbs')
    .then(response => response.text())
    .then(data => {
        template = data;
        fetch('/api/productos')
            .then(response => response.json())
            .then(data => {
                data.products = data.data.length > 0;
                products = data;
                HbsCompile(template, products, 'products');
            });
    });