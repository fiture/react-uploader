function renderJSON(isSuccess, data){
    var status = isSuccess ? 'success' : 'error';

    var obj = {
        msg: data || 'server error',
        data: data,
        status: status
    }
    
    if ( isSuccess ) {
        delete obj.msg;
    } else {
        delete obj.data;
    }

    return obj;
}

module.exports = {
    renderJSON: renderJSON
};