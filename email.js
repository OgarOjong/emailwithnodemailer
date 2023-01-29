const express =  require("express");
const app = express();
const port = process.env.PORT || 3030;
const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('image'));



app.post ("/test",  (req, res,)=>{
    let data = req.body;
    let {email,name} =data;
    console.log("new found",email,name);
    res.send (data);
})


app.post("/email", (req, res)=>{

  let imageList = '/views/cc-visa.png'

   /* const data = {
        email: req.email,
        name: req.name, 
    };*/
    let data = req.body;
    let {email,name,text,subject} =data;
    console.log("What is contained in req", data);

    let transporter  = nodemailer.createTransport({
        host: "premium79.web-hosting.com",
        port: 465,
        auth: {
          user: "test@drdevelopers.ng",
          pass: "EmailTest@2022"
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
    
      transporter.use(
        "compile",
        hbs(handlebarOptions)
      );
    
      var mailOptions = {
        from: "test@drdevelopers.ng",
        to: email,
        subject: subject,
        template: "index",
        //text:"Lets Test this as well",
        context: {
            testname: name,
            message: text,
            imageList
        },//Any template stored in viewPath
        attachment:{

          filename:'cc-visa.png',
          path: __dirname +'/views/cc-visa.png',
          cid: 'cc-visa'
        }
                   
      };
    
    
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send(
            {
              status: "Failed to send email",
              payload:`Email failed to send to ${email}`,
            })
        } else {
            console.log(info);
           res.send({
            status: "success",
            payload:`Email successfully sent to ${email}`,
            data: "Data Sent",
          });
          console.log("Email sent: " + info.response);
        }
      });    

});



  app.listen(port , () => {
    console.log(`server runnning on  ${port}`)
   });
