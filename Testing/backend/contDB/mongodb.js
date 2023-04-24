const MongoClient = require('mongodb').MongoClient;
const connectDB = async () => {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db('BI'); //database name
    myCollection = db.collection('csvUpload'); //collection name
    console.log("Mongo connection Open..");
    return myCollection;
}
connectDB().catch(err => console.log(err));
module.exports = connectDB;