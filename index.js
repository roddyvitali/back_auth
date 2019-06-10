const cors = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var users=[
  {
    username: "xxxx",
    password: "xxxx"
  },
  {
    username: "yyyy",
    password: "yyyy"
  }
];

app.use(cors());
app.options('*', cors());

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
              extended: true
          })
        );
app.use( express.static('./') );


app.post( '/login', (req,res) => {
    var message;
    for(var user of users){
      if( user.username != req.body.username ){
          message = "Usuario incorrecto";
      }else{
          if( user.password != req.body.password ){
              message = "Contraseña incorrecta";
              break;
          }
          else{
              var infoUser = { username: user.username };
              var token = jwt.sign( infoUser, "selit_homework",
              {
                expiresIn: 60
              } );
              console.log(token);
              message="Enhorabuena! ya estas dentro del portal";
              break;
          }
      }
    }
    if(token){
        res.status(200).json({
            message,
            token,
            user: infoUser
        });
    }
    else{
        res.status(403).json({
            message
        });
    }
});

app.listen(3000, function(){
  console.log('listening on port 3000');
});