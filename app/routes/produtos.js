
module.exports = function(app)
{
  app.get ('/produtos', function(req,res, next)
    {
      var connection = app.infra.connectionFactory();
      var produtosDAO = new app.infra.ProdutosDAO(connection);

      produtosDAO.lista(function(erros,resultados){

      if(erros)
      {
        return next(erros);
        done(erros);
      }
      res.format({
        html:function()
        {
          res.render('produtos/lista',{lista:resultados});
        },

        json: function()
        {
          res.json(resultados);
        }

      });
    });
    connection.end();
  });


  app.get ('/produtos/json', function(req,res)
    {
      var connection = app.infra.connectionFactory();
      var produtosDAO = new app.infra.ProdutosDAO(connection);

      produtosDAO.lista(function(erros,resultados){
      res.json(resultados);
    });
    connection.end();
  });






    app.get('produtos/remove', function()
    {
      var connection = app.infra.connectionFactory();
      var produtosBanco = app.infra.produtosBanco;
      var produto = produtosBanco.carrega(connection, id, callback);
      if(produto)
      {
        produtosBanco.remove(connection, produto, callback);
      }
    });



    app.get('/produtos/form', function(req,res)
    {
      res.render('produtos/form',
        {errosValidacao:{}, produto:{}});
    });




    app.post('/produtos', function(req, res)
    {
      var produto = req.body;

      req.assert('titulo','Título é obrigatório').notEmpty();
      req.assert('preco','Formato inválido').isFloat();

      var erros = req.validationErrors();

      if(erros)
      {
        res.format({
          html:function()
          {
            res.status(400).render('produtos/lista',{errosValidacao : erros, produto : produto});
          },

          json: function()
          {
            res.status(400).json(erros);
          }

        });

        return;
      }

      var connection = app.infra.connectionFactory();
      var produtosDAO = new app.infra.ProdutosDAO(connection);

      produtosDAO.salva(produto,function(erros,resultados)
      {
        console.log(erros);
      res.redirect('/produtos');
    });
  });

  /*
  sempre que fizermos um app.post a próxima ação seja o redirect para justamente
  nós livrarmos do problema do "F5". Existe inclusive um padrão de desenvolvimento
   web que indica que é sempre necessário redirecionar depois de post.
  */


}
