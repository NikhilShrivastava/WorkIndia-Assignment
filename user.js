var bcrypt = require('bcryptjs')
var con = require('./mydb_connection');
var express = require('express');
var bodyParser = require('body-parser');
const { response } = require('express');
var app = express();

var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);


var router = express.Router();
/* GET users listing. */
var saltRounds = 10


var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

//creation
app.post('/app/user',async function(req, res, next) {
    console.log(req.body);
    var username=req.body.username
    var password=req.body.password
    password = encrypt(password)
    var userid = username;
    var sql = "INSERT INTO users (username,password,userid) VALUES ?";
    var values = [[username,password,userid]]

    con.query(sql,[values], function (err, result, fields) {
        if (err)
        return res.send({
            status : 'account creation failed'
        });

        res.send({
            status : 'account created'
        });
    });
});


//account login
app.post('/app/user/auth',async function(req, res, next) {
    console.log(req.body);
    var username=req.body.username
    var password=req.body.password
    con.query('SELECT * FROM users WHERE username = ?',[username], async function (error, results, fields) {
        if (error) {
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          if(results.length >0){
            var decryptPassword = decrypt(results[0].password)
            if(password === decryptPassword){
                res.send({
                  "success":"login sucessfull",
                  "userid" : results[0].userId

                })
            }
            else{
              res.send({
                   "success":"Username and password does not match"
              })
            }
          }
          else{
            res.send({
              "success":"User does not exists"
                });
          }
        }
        });
});





//save a note
app.post('/app/sites',async function(req, res, next) {
    console.log(req.body);
    var user = req.query.userId
    var notes = req.body.notes
    console.log('===', notes)
    notes = encrypt(notes)
    var sql = "INSERT INTO notes (username,notes) VALUES ?";
    var values = [[user,notes]]

    con.query(sql,[values], function (err, result, fields) {
        if (err) throw err;
        res.send({
            status : 'success'
        });
    });
});






app.get('/app/sites/list', function(req, res, next) {
    console.log(req.body);
    var userid= req.query.userId

    var sql = "SELECT * from notes where username = ?";
    var values = [[userid]]

    con.query(sql,[values], function (err, result, fields) {
        if (err) throw err;
        var notes = [];
        for(var i = 0 ;i<result.length;i++)
        {
            notes.push({
                "note" : decrypt(result[i].notes)
            })
        }
        res.send({
            "notes" : notes
            
        });
    });
});



app.listen(3000,function (){
    console.log('Server running on 3000 port')
})
module.exports = app;