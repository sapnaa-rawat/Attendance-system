module.exports = {
    constant_Data: {
        DB_STARTS_DATE : '31-Jul-2020',
        SALTROUNDS : 10,
        USER : "noreplymailed2020@gmail.com",
        PASSWORD : "noReply@12345",
        SENDER_MAIL_ID : "noreplymailed2020@gmail.com",
        SUBJECT_RESET_PASSWORD : "Reset password",
        SUBJECT_CHANGED_PASSWORD : "Password Changed",
        HOLIDAYS_DATE:['01-Jan-2020','21-Feb-2020','10-Mar-2020','10-Apr-2020','25-May-2020','03-Aug-2020','02-Oct-2020','13-Nov-2020','30-Nov-2020','25-Dec-2020'],
        CHANGED_PASSWORD_BODY_MAIL: (name, password) => {
            return `Hi ${name},<br><br> Here is the updated password- <b>${password}</b><br><br>Thanks <br><br>`;
        },
        FORGET_BODY_MAIL : (name, password) => {
            return `Hi ${name},<br><br> Here is the new password- <b>${password}</b><br><br>If password reset wasn’t intended: If you didn't make the request, just ignore this email.<br><br>Thanks <br><br>`
        },
        DATE_FORMATE:'DD-MMM-YYYY',
    }
}