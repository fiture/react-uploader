(function () {
    var xhr = new XMLHttpRequest(),
        form = document.querySelector('#J_uploadForm'),
        progress = document.querySelector('#J_progress'), 
        inputFile = document.querySelector('#J_uploadFile'),
        formData;

    form.addEventListener('submit', function(e){
        e.preventDefault();
        
        if ( !inputFile.value ) return;

        formData = new FormData();

        progress.innerText = 0;

        for (var i = 0; i<inputFile.files.length; i++) {
            var file = inputFile.files.item(i);
            formData.append('file', file);
        }

        xhr.open('POST', '/upload');

        xhr.onreadystatechange = function(){

            if ( xhr.status == 200 && xhr.readyState > 3 ) {
                console.log(JSON.parse(xhr.responseText));
            } else {
            }
        };

        xhr.upload && (xhr.upload.onprogress = function(e){
            var tmp = Math.round(e.loaded / e.total * 100);
            // tmp = (tmp == 100) ? 99 : tmp;
            progress.innerText = tmp;
        });

        xhr.send(formData);
    }, false);



})();