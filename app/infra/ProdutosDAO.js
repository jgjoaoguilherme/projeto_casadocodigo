function ProdutosDAO(connection)
{
  this._connection = connection;
}


ProdutosDAO.prototype.lista = function(callback)
{
  this._connection.query('select * from produtos', callback);
}


ProdutosDAO.prototype.salva = function(produto,callback)
{
  this._connection.query('insert into produtos set ?',produto, callback);
}

module.exports = function()
{
  return ProdutosDAO;
}



/* se precisarmos criar uma nova requisição que mostra os detalhes de um produto,
por exemplo, /produtos/detalhes, podemos chamar o produtosBanco.mostra e passar
a connection, id, e o callback. */
