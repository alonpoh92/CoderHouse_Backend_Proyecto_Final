const removeSlash = (req, res, next) => {
    const path = req._parsedOriginalUrl.path;
    if(path[path.length - 1] == "/"){
        res.redirect(path.substring(0, path.length - 1));
    }else{
        next();
    }
}

module.exports = removeSlash;