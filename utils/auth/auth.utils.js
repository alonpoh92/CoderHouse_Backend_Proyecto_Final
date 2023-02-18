module.exports = {
    initSession(req, data){
        if(data.name && data.email){
            req.session.name = data.name;
            req.session.email = data.email;
            return {success: true};
        }else{
            throw new Error('Body params uncomplete');
        }
    }
}