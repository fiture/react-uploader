var express = require('express'),
    router = express.Router(),
    uploader = require('../controller/upload');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/upload', uploader.uploadMiddleware, uploader.doUpload)

router.get('/upload', function(req, res, next) {
    res.render('upload', { title: 'Upload' });
});

module.exports = router;
