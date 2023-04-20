const { MongoClient } = require('mongodb');

const name = ["kosalvireak", "Monyjenni", "Punvireakroth", "Chanjnint21", "heatkoemnak", "SokreaksaRoeurng", "chakriyamet", "NhorkSopheakna", "SOYHOK", "Ponhrith", "nohannah", "Pheak02", "soumany", "Neangthary", "phearaZ", "Sreynaj", "RaThida", "SIPHAI", "Hok"];
const number = [330, 64, 337, 59, 78, 54, 46, 43, 73, 296, 131, 24, 117, 25, 51, 175, 32, 65, 500];
const data = {
    "identify": "data1",
    name,
    number
}

let myCollection;

async function main() {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db('mydatabase');
    myCollection = db.collection('mycollection');
    console.log("Mongo connection Open");
    return myCollection;
}
main().catch(err => console.log(err));

async function insertDocuments() {
    const collection = await main();
    const result = await collection.insertOne(data);
    console.log(result);
}

let result;
async function showDocument() {
    const collection = await main();
    result = await collection.find().toArray();
    console.log(result);
    console.log(result[0].name);
}

// insertDocuments();
showDocument();
// console.log(result);
