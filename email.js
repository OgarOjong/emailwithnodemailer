const express =  require("express");
const app = express();
const port = process.env.PORT || 3030;
const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('image'));



app.post ("/test",  (req, res,)=>{
    let data = req.body;
    let {email,name} =data;
    console.log("new found",email,name);
    res.send (data);
})


app.post("/email", async(req, res)=>{
   /* const data = {
        email: req.email,
        name: req.name, 
    };*/
    let data = req.body;
    let {email,name,text,subject} =data;
   // console.log("What is contained in req", data);
try {

  let transporter  = await nodemailer.createTransport({
    host: "mail.irbfinancial.com",
    port: 465,
    auth: {
      user: "info@irbfinancial.com",
      pass: process.env.emailPass
    }});


  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "views"),
    extName: ".handlebars",
  };

await   transporter.use(
    "compile",
    hbs(handlebarOptions)
  );

  var mailOptions = {
    from: "info@irbfinancial.com",
    to: email,
    subject: subject,
    template: "index",
    //text:"Lets Test this as well",
    context: {
        testname: name,
        message: text
    }//Any template stored in viewPath

               
  };



 transporter.sendMail(mailOptions, async(error, info) => {
    if (error) {
      console.log(error);
    await   res.send(
        {
          status: "Failed to send email",
          payload:`Email failed to send to ${email}`,
        })
    } else {
        console.log(info);
      await res.send({
        status: "success",
        payload:`Email successfully sent to ${email}`,
        data: "Data Sent",
      });
      console.log("Email sent: " + info.response);
    }
  });    
  
} catch (error) {
  throw error;
}
  

});



  app.listen(port , () => {
    console.log(`server runnning on  ${port}`)
   });
