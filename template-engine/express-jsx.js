const fs  = require('fs');
function getkeysFromOptions(options){
    const {settings , _locals , ...objectKeys} = options;
    return Object.keys(objectKeys);
}
function getRenderedContent(content, options){
    const keys = getkeysFromOptions(options);
    let contentString = content.toString();
    for(let key of keys) {
        contentString = contentString.replace(new RegExp(`\{$key\}`,"gi"),options[key])
    }
    return contentString;
}
function expressJsx(filepath , options , callback){
    fs.readFile(filepath , (err,content) => {
        if(err){
            return callback(err);
        }
        const rendered = getRenderedContent(content,options);
        return callback(null, rendered);
    })
}
module.exports = expressJsx