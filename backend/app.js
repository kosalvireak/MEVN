const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const ejsMate = require('ejs-mate');
const path = require('path');

// create out express app
const app = express()
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Handle CORS + middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
})

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo'); //movieAPP -> is the name of the db
  console.log("Mongo connection Open")
}

app.use(bodyParser.json())

// routes
app.get("/", (req, res) => {
  console.log("User get to home page")
  res.render("home");
})

const TodosRoute = require('./routes/Todos');
app.use('/todos', TodosRoute)

// start server
app.listen(3000, () => {
  console.log("Listening at port 3000")
})
