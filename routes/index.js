var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var uploader = multer({ dest: 'public/uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/upload', uploader.single('file'), function(req, res, next) {
    var file = req.file,
        filePath = req.file.path,
        newFilePath = path.join(file.destination, file.originalname);

    if ( !req.file ) {
        res.json({
            status: 'error',
            msg: 'forbidden'
        }); 

        return;
    }

    //重命名上传的文件
    fs.rename(file.path, newFilePath, function(){
        res.json(
            {
                status: 1,
                data: {
                    fileInfo: file,
                    url: path.join('/uploads/', file.originalname)
                },
                msg: 'success'
            }
        );
    });

});

router.get('/upload', function(req, res, next) {
    res.render('upload', { title: 'Upload' });
});

module.exports = router;
