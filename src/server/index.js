const express = require('express')
const app = express()
const dotenv = require('dotenv');

module.exports = app;
const port = process.env.PORT || 8000
const cors = require("cors");

//for google cloud storage
const { Storage } = require("@google-cloud/storage");
let projectId = "ki-ah-na-devops";
let keyFileName = "./config/myKey.json";
// console.log(keyFileName);
const storage1 = new Storage({
    projectId,
    keyFileName,
});
const bucket = storage1.bucket('ki-ah-na-bucket');

//for multer
const multer = require('multer');
app.use(cors());
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

app.post('/p/check', Multer.single('demo_image'), (req, res, next) => {
        const file = req.body;
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
                    console.log("Success");
                    res.status(200).send("Success");
                //     res
                //     .status(200)
                //     .json({
                //       message: "Upload was successful",
                //   //     data: imageUrl
                //     })
                   
                });        
            } else throw "error with img";

      } catch (error) {
        next(error)
        res.status(500).send(error);
      }
});

app.use((err, req, res, next) => {
    res.status(500).json({
      error: err,
      message: 'Internal server error!',
    })
    next()
  })

app.use(express.static('dist'));
app.listen(port, () => console.log(`Listening on port ${port}!`));


