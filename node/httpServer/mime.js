const path = require("path")
module.exports=function (filepath) { 
    const contentType = {
        "png":"image/png",
        "html":"text/html",
        "js":" 	application/x-javascript",
        "css":"text/css"
    }
    let fileType = path.extname(filepath).split('.').pop();
    return contentType[fileType]||'text/plain';
}