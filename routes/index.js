var express = require('express'),
    router = express.Router(),
    uploader = require('../controller/upload'),
    fileManager = require('../controller/file-manager');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('upload', { title: 'WYFE - Dev Tool' });
});

router.post('/del', fileManager.del);
router.get('/get-dir', fileManager.getDir);

router.post('/upload', uploader.uploadMiddleware, uploader.doUpload)
router.post('/develop', fileManager.develop);

module.exports = router;
