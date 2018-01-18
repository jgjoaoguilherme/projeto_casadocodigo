var http = require('http');
var configuracoes = {
    hostname: 'localhost',
    port:3000,
    path:'/produtos',
    method: 'post',
    headers: {
        'Accept':'application/json',
        'Content-type' : 'application/json'
    }
};

 var client = http.request(configuracoes,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log('Corpo: \n' +body);
    });
});

var produto = {
    titulo : 'titulo',
    descricao: 'node, javascript e um pouco sobre http',
    preco: '100.2'
};

client.end(JSON.stringify(produto));
