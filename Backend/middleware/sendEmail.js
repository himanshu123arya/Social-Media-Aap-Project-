const nodeMailer= require('nodemailer');

exports.sendEmail= async(options)=>{


    var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "47510ae2030acd",
    pass: "****46e3"
  }
});
  
        



 

    const mailOptions= {
        from:"",
        to:options.email,
        subject:options.subject,
        text:options.message,
    }
    await transporter.sendEmail(mailOptions);
}