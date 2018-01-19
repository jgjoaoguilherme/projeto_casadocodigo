var mysql = require('mysql');
var connectMYSQL = function()
{
    if(!process.env.NODE_ENV)
    {
        return mysql.createConnection(
          {
            host:'localhost',
            user:'root',
            password:'01123',
            database:'casadocodigo_nodejs'
        });
    }


    if(process.env.NODE_ENV == 'test')
    {
        return mysql.createConnection(
          {
            host:'localhost',
            user:'root',
            password:'01123',
            database:'casadocodigo_nodejs_test'
        });
    }

    if(process.env.NODE_ENV == 'production')
    {
    return mysql.createConnection({
            host: 'us-cdbr-iron-east-05.cleardb.net',
            user:'b25e501105c4bf',
            password:'ce71e1c0',
            database:'heroku_6d6232fab1acde4'
    });
    }
}
module.exports = function()
{
  return connectMYSQL;
}
