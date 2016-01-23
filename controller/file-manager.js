var fs = require('fs'),
    path = require('path'),
    config = require('./config'),
    renderJSON = require('./utils').renderJSON;

function getDir(req, res, next){
    var resData = {},
        resFiles = [],
        isDirAvailable = checkDir(req.uploadDir),
        uploadDir = isDirAvailable ? req.uploadDir : config.uploadPath;

    fs.readdir(uploadDir, function(err, files){
        if ( err ) {
            res.json(renderJSON(0));
        } else {
            files.forEach(function(file){
                var isDirectory = fs.statSync(path.join(uploadDir, file)).isDirectory();
                resFiles.push({isDir: isDirectory, name: file});
            });

            resData.files = resFiles;
            resData.currentDir = uploadDir;
        }

        res.json(renderJSON(1, resData));
    });
}


function del(req, res, next){
    var rimraf = require('rimraf');

    var postData = req.body;

    var tarDir = postData.target || path.join(__dirname, config.uploadPath),
        isDirAvailable = checkDir(tarDir);

    fs.exists(tarDir, function(isExist){
        if ( isExist && isDirAvailable ) {            
            rimraf(tarDir, function(r){
                console.log((new Date).toJSON() + ' 删除了文件：', tarDir);
                res.json(renderJSON(1))
            });
        } else {
            res.json(renderJSON(0, 'file not exits or not available'));
        }
    });
}

function checkDir (dir) {
    //如果请求查询的路径(queryDir)存在 并且 请求查询的路径是配置路径（configDir）的子目录
    return ( dir && dir.indexOf(config.uploadPath) == 0);
}

module.exports = {
    del: del,
    getDir: getDir
}