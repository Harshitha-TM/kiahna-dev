const express = require('express');
// const os = require('os');
const dotenv = require('dotenv');
const app = express();
module.exports = app;
const port = process.env.PORT || 8080
const cors = require("cors");
const fs = require("fs");

//for google cloud storage
const { Storage } = require("@google-cloud/storage");
let projectId = "ki-ah-na-trial";
let keyFileName = "myKey.json";
// console.log(keyFileName);
const storage1 = new Storage({
    projectId,
    keyFileName,
});
const bucket = storage1.bucket('ki-ah-na-trial');

// console.log(storage1);
// Imports the Google Cloud client library
// const { ErrorReporting } = require('@google-cloud/error-reporting');

// // Instantiates a client
// const errors = new ErrorReporting();

// // Reports a simple error
// errors.report('Something broke!');
//for multer
const multer = require('multer');
app.use(cors());
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

app.get("/h",(req,res)=>{
    res.send("Hello world")
})
app.post("/p",(req,res)=>{
    res.status(200).send("Success");
})
app.post('/image', Multer.single('demo_image'), (req, res, next) => {
    const file = req.body;
    //const buffer = Buffer.from(req.body.demo_image, "base64");
    // fs.writeFileSync("new-path.jpg", buffer);
    // console.log(req.body.demo_image);    
    // console.log(req.body.color);
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    try {
        if (file) {
            //saves this as file txt
            const file2 = bucket.file(req.body.color + Date.now() + '.json');
            file2.save(req.body.demo_image).then(() => {
                res.status(200).send("Success");
                console.log("Success");
            });
            //secon approach
            //Define file & file name.
            // var file4 = bucket.file(req.body.color+Date.now()+'.jpg');
            // var stream = require('stream');
            // var bufferStream = new stream.PassThrough();
            // bufferStream.end(Buffer.from(req.body.demo_image));

            // //Pipe the 'bufferStream' into a 'file.createWriteStream' method.
            // bufferStream.pipe(file.createWriteStream({
            //     metadata: {
            //         contentType: 'image/jpeg',
            //         metadata: {
            //             custom: 'metadata'
            //         }
            //     },
            //     public: true,
            //     validation: "md5"
            // }))
            //     .on('error', function (err) { })
            //     .on('finish', function () {
            //         // The file upload is complete.
            //     });

            //     console.log("Success");


            // var gcs = require('@google-cloud/storage')({
            //     projectId:  "ki-ah-na-trial",
            //     keyFilename: 'myKey.json'
            //   });
            //   const blob = bucket.file(req.body.demo_image);
            //   const blobStream = blob.createWriteStream();

            //   blobStream.on("finish", () => {
            //    res.status(200).send("Success");
            //     console.log("Success");
            //   });
            // blobStream.end(req.file.buffer);
        } else throw "error with img";
    } catch (error) {
        res.status(500).send(error);
    }
});

app.use(express.static('dist'));
app.listen(port, () => console.log(`Listening on port ${port}!`));


