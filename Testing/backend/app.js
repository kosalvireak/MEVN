const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})

let myCollection;
async function main() {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db('BI'); //database name
    myCollection = db.collection('csvUpload'); //collection name
    console.log("Mongo connection Open");
    return myCollection;
}
main().catch(err => console.log(err));

app.post('/upload', async (req, res) => {
    const dataFromUserUpload = req.body.data;
    const collection = await main();
    const result = await collection.insertOne(dataFromUserUpload);
    res.json({ message: `${result.insertedCount} records inserted` });
});

app.get('/gets', async (req, res) => {
    const collection = await main();
    const dataFromDB = await collection.find().toArray();
    res.json(dataFromDB);
})

app.listen(3000, () => {
    console.log("Listening at port 3000")
})
