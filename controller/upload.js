var fs = require('fs'),
    path = require('path'),
    multer  = require('multer'),
    config = require('./config'),
    renderJSON = require('./utils').renderJSON,
    uploadMiddleware = multer({ dest: config.uploadPath }).any();

function doUpload (req, res, next) {
    var files = req.files,
        idx = 0;

    if ( !req.files.length ) {
        res.json(renderJSON(false, 'empty upload')); 
        return;
    }

    rename(files[idx]);

    function rename(file){        
        var filePath = file.path,
            newFilePath = path.join(file.destination, file.originalname); 

        fs.rename(filePath, newFilePath, function(error){
            if ( error ) {
                res.json(renderJSON(false, 'rename failed' + filePath));
            } else {
                idx++;
                if ( files[idx] ) {
                    rename(files[idx]);
                } else {                
                    res.json(
                        renderJSON(true, {
                            fileInfo: files
                        })
                    );
                }
            }
        });
    }
}

module.exports = {
    doUpload: doUpload,
    uploadMiddleware: uploadMiddleware
};