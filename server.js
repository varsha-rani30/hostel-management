//Dependencies
var express = require('express');
var sql = require('mysql');
var bodyParser = require('body-parser');

var db = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1js15cs114',
  database: 'hms'
})

db.connect(function(err, success){
  if(err)
    console.log(err)
  else {
    console.log("Database Connected")
  }
})

var app = express();

//config
app.set('view engine', 'ejs');
app.set('views', __dirname+'/src');

//static data config
app.use(express.static(__dirname+'/src/public'))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', function(req, res){
  res.render('index.ejs', {wrong: false});
})




app.post('/login', (req, res) => {
  var username = req.body.admin;
  var password = req.body.password;

  if(password == 'hostel'){
    res.redirect('/home');
  }
  else{
    res.render("index.ejs", {wrong: true});
  }
})
app.get('/home', (rew, res) => {
  res.render("home.ejs");
})

app.get('/student',(req,res)=>{
  res.render("student.ejs");
})
app.post('/student',(req,res)=>{
  console.log(req.body)
  var usn=req.body.usn;
  var name=req.body.name;
  var dob=req.body.dob;
  var fname=req.body.fname;
  var address=req.body.address;
  var phone=req.body.phone;
  var rno=req.body.rno;

  var query =`insert into student(usn,name,dob,fname,address,phone,rno) values('${usn}','${name}','${dob}','${fname}','${address}','${phone}','${rno}')`;
  db.query(query, function(err,success){
    if(err){
      console.log(err)
    }else{
      console.log("entry successful")
      res.redirect('/student')
    }
  })
})



app.post('/student',function(req,res)
{
  var usn=req.body.usn;
  console.log(req.body)
  var query =`CREATE VIEW detail AS
  SELECT * FROM student WHERE usn='${usn}'`;

  db.query(query,function(err,success){
    if(usn='${usn}'){
      console.log("record")
    }else{
      console.log(success);

    }
  })
})




app.get('/staff',(req, res)=>{
  res.render("staff.ejs");
})
app.post('/staff',(req,res)=>{
  console.log(req.body)
  var sid=req.body.sid;
  var name=req.body.name;
  var gender=req.body.gender;
  var dob=req.body.dob;
  var dept=req.body.dept;
  var address=req.body.address;
  var phone=req.body.phone;
  var salary=req.body.salary;

  var query = `insert into staff(sid,name, gender, dob,dept,address,phone,salary) values( '${sid}', '${name}','${gender}','${dob}','${dept}','${address}','${phone}','${salary}')`
  db.query(query, function(err,success){
    if(err){
      console.log(err)
    }else{
      console.log("staff added")
      res.redirect('/staff')
    }
  })
})
app.get('/existing staff',function(req,res){

  console.log(req.body)
  var sid=req.body.sid;
  var query =`select * from staff where sid='${sid}'`;
  db.query(query,function(err,success){
    if(err){
      res.send(err)
    }else{
      console.log("staff records")
      res.redirect('/staff')
    }
  })
})




app.get('/mess',(req,res)=>{
  res.render("mess.ejs");
})




app.get('/fee',(req,res)=>{
  res.render("fee.ejs");
})




app.get('/visitor',(req,res)=>{
  res.render("visitor.ejs");
})
app.post('/visitor',(req,res)=>{
  console.log(req.body)

  var usn=req.body.usn;
  var vname=req.body.vname;
  var phone=req.body.phone;
  var address=req.body.address;
  var purpose=req.body.purpose;
  var login=req.body.login;
  var logout=req.body.logout;
  var date=req.body.date;

  var query = `insert into visitor(usn,vname, phone, address,purpose,login,logout,date) values( '${usn}', '${vname}','${phone}','${address}','${purpose}','${login}','${logout}','${date}')`;
  db.query(query,function(err,success){
    if(err){
      console.log(err)
    }else{
      console.log("visitor added")
      res.redirect('/visitor')
    }
  })
})



app.get('/room',(req,res)=>{
  res.render("room.ejs");
})
app.post('/room',(req,res)=>{
  console.log(req.body)
  var usn=req.body.usn;
  var rno=req.body.rno;
  var status=req.body.status;
  var query = `insert into room(usn,capacity,rno,status) values( '${usn}', '${capacity}','${gender}','${dob}','${dept}','${address}','${phone}','${sal}')`;



  db.query(query,function(err,success){
    if(err){
      console.log(err)
    }else{
      console.log("student added")
      res.redirect('/room')
    }
  })
})







app.listen(3000, function(){
  console.log("Server is live");
})
