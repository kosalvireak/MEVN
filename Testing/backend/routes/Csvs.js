const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const connectDB = require('../contDB/mongodb.js')
const bodyParser = require('body-parser');
// router.use(express.json());
router.use(bodyParser.json());
//Get all csvs route
router.get('/', async (req, res) => {
    const myCollection = await connectDB();
    const allCsvs = await myCollection.find().toArray();
    res.json(allCsvs);
})

router.post('/new', async (req, res) => {
    const dataFromUserUpload = req.body.data;
    if (!dataFromUserUpload) {
        console.log("File not found")
    }
    else {
        const { fileName, uploadDate } = dataFromUserUpload;
        const myCollection = await connectDB();
        const result = await myCollection.insertOne(dataFromUserUpload);
        const csvId = result.insertedId;
        res.json({
            message: `Successfully insert ${fileName} to DB at ${uploadDate}`,
            csvId: csvId.toString()  // Include the URL or path in the response
        });
    }
});

router.get('/get/:id', async (req, res) => {
    const myCollection = await connectDB();
    const id = req.params.id;
    const oneCsv = await myCollection.findOne({ _id: new ObjectId(id) });
    if (oneCsv) {
        res.json(oneCsv);
        console.log(oneCsv);
    } else {
        res.status(404).send('CSV not found');
    }
})

router.delete('/delete/:id', async (req, res) => {
    const myCollection = await connectDB();
    const id = req.params.id;
    const deleteCsv = await myCollection.findOneAndDelete({ _id: new ObjectId(id) });
    res.json(deleteCsv);
})

router.put('/update/:id', async (req, res) => {
    const myCollection = await connectDB();
    const id = req.params.id;
    const updateCsv = await myCollection.findOneAndUpdate(
        { _id: new ObjectId(id) }, {
        $set:
        {
            names: ['vireak', 'vary'],
            numbers: [21, 18]
        }
    })
})

module.exports = router

