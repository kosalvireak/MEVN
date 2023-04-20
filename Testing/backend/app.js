const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

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
    const { fileName, uploadDate } = dataFromUserUpload;
    const collection = await main();
    const result = await collection.insertOne(dataFromUserUpload);
    const csvId = result.insertedId;
    // console.log(result.insertedId.toString());
    res.json({
        message: `Successfully insert ${fileName} to DB at ${uploadDate}`,
        csvId: csvId.toString()  // Include the URL or path in the response
    });
});

app.get('/gets', async (req, res) => {
    const collection = await main();
    const csvs = await collection.find().toArray();
    res.json(csvs);
})

app.get('/gets/:id', async (req, res) => {
    const collection = await main();
    const id = req.params.id;
    const csv = await collection.findOne({ _id: new ObjectId(id) });
    if (csv) {
        res.json(csv);
        console.log(csv);
    } else {
        res.status(404).send('CSV not found');
    }
})



app.listen(3000, () => {
    console.log("Listening at port 3000")
})
