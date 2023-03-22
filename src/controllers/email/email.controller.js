const { createTransport } = require('nodemailer');

const { HttpError } = require('../../../utils/api.utils');
const constants = require('../../../constants/api.constants');
const env = require('../../../env.config');

transporterEthereal = () => createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jess14@ethereal.email',
        pass: 'mDhfnEYxDN2hZN6naQ'
    }
});

transporterGmail = () => createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: env.EMAIL_GMAIL,
        pass: env.PASS_GMAIL
    }
});

function createHtml(content){
    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title></title>
            <style></style>
        </head>
        <body>
            <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="20" cellspacing="0" width="600" id="emailContainer">
                            <tr>
                                <td align="center" valign="top">
                                    ${content}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>`
    return html;
}

class EmailController{
    async sendMail(mailOptions, transporter="ethereal"){
        mailOptions.html = createHtml(mailOptions.html);
        let info;
        try{
            if(transporter == "gmail"){
                info = await transporterGmail().sendMail(mailOptions);
            }else{
                info = await transporterEthereal().sendMail(mailOptions);
            }
            return info;
        }catch(error){
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }
};

module.exports = new EmailController();