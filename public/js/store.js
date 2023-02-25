function addProduct(id){
    fetch('./api/cart/add/'+id, {method: 'POST'})
        .then(response => response.json())
        .then(data => console.log(data));
}