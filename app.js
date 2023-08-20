import express, { response } from "express";
import bodyParser from "body-parser";
import request from "request";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.static("Public")); // For our static files
app.use(bodyParser.urlencoded({extended:true}))
const __dirname = dirname(fileURLToPath(import.meta.url));
// Constant |^

app.get("/", (req,res)=>{

   res.sendFile(__dirname + "/signup.html");

})
app.post("/", (req,res)=>{
   
   res.setHeader("Content-Type", "text/html");
   const{ myName, myEmail } = req.body;
   
   // const url = "https://us21.api.mailchimp.com/3.0/lists/4a7be81434";
   // const apiKey = "3d13ca9bd8c23e08d86acee962f1c159-us21";
   // const listId = "4a7be81434";
   
   const data = {
      members:[
         {
            email_address: myEmail,
            status: "subscribed",
            merge_fields:{
               FNAME: myName
            } 
            
         }
         
      ]
   }
   const postData = JSON.stringify(data); 

   const options = {
      
     url: "https://us21.api.mailchimp.com/3.0/lists/4a7be81434",
     method: "POST",
     headers:{

      authorization: "auth 3d13ca9bd8c23e08d86acee962f1c159-us21"

     },
     body: postData

   };
   
   
   request(options, (err, response, body)=>{
       
      if(err){

         res.sendFile(__dirname + "/failure.html");
         console.log("Main Error");
      }
      else{
         
         if(response.statusCode === 200){
            
            res.sendFile(__dirname + "/success.html");
         }
         else{

            res.sendFile(__dirname + "/failure.html");
            console.log(response.statusCode);
            console.log("Status code does not match error");
         }
      }

   })// request
   
})// post





app.listen(3000, ()=>{

   console.log("server is running on http://127.0.0.1:3000/")


})  