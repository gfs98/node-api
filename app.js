const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

// app.get('/download/:filename', (req, res) => {
//     const filename = req.params.filename;
//     const filePath = path.join(__dirname, 'files', filename);
//     res.download(filePath, filename, (err) => {
//         if (err) {
//             res.status(500).send('Oops! 文件传送出错啦.');
//         }
//     });
// });

app.post('/download', (req, res) => {
    const filename = '新建转存.zip';
    const filePath = path.join(__dirname, 'files', filename);

    const fileStream = fs.createReadStream(filePath);
    fileStream.on('open', () => {
        res.attachment(filename);
        fileStream.pipe(res);
    });
    fileStream.on('error', err => {
        next(err);
    });

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});