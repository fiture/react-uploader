(function () {
    var xhr = new XMLHttpRequest(),
        form = document.querySelector('#J_uploadForm'),
        inputFile = document.querySelector('#J_uploadFile'),
        formData;


    form.addEventListener('submit', function(e){
        e.preventDefault();
        formData = new FormData(form);

        xhr.open('POST', '/upload');

        xhr.onreadystatechange = function(){

            if ( xhr.status == 200 && xhr.readyState > 3 ) {
                console.log(xhr.responseText);
            } else {
            }
        };

        xhr.send(formData);
    }, false);



})();