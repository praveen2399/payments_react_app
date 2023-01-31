import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Database } from 'sqlite-async';
// import * as microsoftTeams from 'microsoft-teams-js';


import {
  initializeIdentityService
} from './identityService.js';

import {
  rtpFundTransfer,
  getTxnDetails
} from './usbobService.js';

dotenv.config();
const app = express();

// JSON middleware is needed if you want to parse request bodies
app.use(express.json());
app.use(cookieParser());

// Allow the identity service to set up its middleware
await initializeIdentityService(app);

// set up an event listener to be triggered when the app is opened
// microsoftTeams.initialize(() => {
//   console.log('App opened');
// });


app.get("/api/v1", async (req, res) => {
  // const message = {};
  res.json({"message": "Hello from server"});
  console.log("Hello");
  // res.send(message);
});


// app.get('/api', async(req, res) => {
//   try{
//     console.log('api');
    
//   }
//   catch (error){
//       console.log(`Error in /api handling: ${error}`);
//       res.status(500).json({status: 500, statusText: error });
    
//   }
// }) 

app.post('/api/rtpfundtransfer',  async (req, res) => {
  try{
    
    console.log("api/rtpfundtransfer");
    var invid = req.body.id;
    var acctno = req.body.acctno;
    var routno = req.body.routno;
    console.log(invid, acctno, routno);
    const bankRTPRes = await rtpFundTransfer(invid, acctno, routno);
    res.send(bankRTPRes);
  }
  catch (error){
    console.log(`Error in /api/rtpfundtransfer handling: ${error}`);
    res.status(500).json({status: 500, statusText: error });
  }

});

app.get('/api/issues', async (req, res) => {
  var result = [];
  try{

    await Database.open('falconDB/falconDb')
        .then( async db => {

            result =  await db.all(`select * from issues`, []);
          })
        .catch(err => {
            console.log(err);
        });        
        console.log(result);
        res.json(result);
  }
  catch(error){
    console.log(`Error in GET /api/issues handling: ${error}`);
    res.status(500).json({status: 500, statusText: error});
  }
})

app.post('/api/issues', async (req, res) => {
    var result = [];
    const data = req.body;
    let responseList = [];
    try{
  
      await Database.open('falconDB/falconDb')
          .then( async db => {
  
              //result =  await db.all(`select * from issues`, []);

              for (let i = 0; i < data.length; i++) {

                let custid = data[i].custid;
                let issue = data[i].issue;
                let severity = data[i].severity;
                let amount = data[i].amount;
                let issuestatus = data[i].issuestatus;
                let confirmationno = data[i].confirmationno;
                let selected = data[i].selected;
        
                db.run("INSERT INTO issues(issue, custid,severity,amount,issuestatus,confirmationno,selected) VALUES (?,?,?,?,?,?,?)"
                    , [issue, custid, severity, amount, issuestatus, confirmationno, selected], (err) => {
                        if (err) {
                            console.log("Failed insertion :", issue);
                            res.status(400).json({ "error": err.message });
                            return;
                        }
                        else {
                            responseList.push({ "name": custid, "issue": issue });
                        }
                    });
            }
            })
          .catch(err => {
              console.log(err);
          });        
          console.log(result);
          res.json("Success");
    }
    catch(error){
      console.log(`Error in POST /api/issues handling: ${error}`);
      res.status(500).json({status: 500, statusText: error});
    }
  })

app.get('/api/issues/:id', async (req, res) => {
    let id = req.params.id;
    var result = [];
    try{
  
      await Database.open('falconDB/falconDb')
          .then( async db => {
  
              result =  await db.all(`select * from issues WHERE id=?`, [id]);
            })
          .catch(err => {
              console.log(err);
          });        
          console.log(result);
          res.json(result);
    }
    catch(error){
      console.log(`Error in GET /api/issues/id handling: ${error}`);
      res.status(500).json({status: 500, statusText: error});
    }
  })

app.get('/api/issues/customer/:custid', async (req, res) => {
    var result = [];
    let custid = req.params.custid;
    try{
  
      await Database.open('falconDB/falconDb')
          .then( async db => {
  
              result =  await db.all(`select * from issues WHERE custid =?`, [custid]);
            })
          .catch(err => {
              console.log(err);
          });        
          console.log(result);
          res.json(result);
    }
    catch(error){
      console.log(`Error in GET /api/issues/customer/custid handling: ${error}`);
      res.status(500).json({status: 500, statusText: error});
    }
  })  

  
  app.patch('/api/issues', async (req, res) => {
    var result = [];
    const data = req.body;
    try{
  
      await Database.open('falconDB/falconDb')
          .then( async db => {
  
              //result =  await db.all(`select * from issues`, []);
              for (let i = 0; i < data.length; i++) {
                let issueid = data[i].id;
                let issuestatus = data[i].issuestatus;
                let confirmationno = data[i].confirmationno;
                result= db.run("UPDATE issues SET issuestatus = ?,confirmationno = ? WHERE id = ?", [issuestatus, confirmationno, issueid], (err) => {
                    if (err) {
                        res.status(400).json({ "error": err.message });
                        return;
                    }
                });
            }
            })
          .catch(err => {
              console.log(err);
          });        
          console.log("Success");
          res.json("Success");
    }
    catch(error){
      console.log(`Error in GET /api/issues handling: ${error}`);
      res.status(500).json({status: 500, statusText: error});
    }
  })


app.get('/api/getinvoiceitems', async (req, res) => {
  var result = [];
  try{

    await Database.open('falconDB/falconDb')
        .then( async db => {

            result =  await db.all(`select * from t_invoices`, []);
          })
        .catch(err => {
            console.log(err);
        });        
        res.send(result);
  }
  catch(error){
    console.log(`Error in /api/getinvoiceitems handling: ${error}`);
    res.status(500).json({status: 500, statusText: error});
  }
})


// Make environment values available on the client side
// NOTE: Do not pass any secret or sensitive values to the client!
app.get('/modules/env.js', (req, res) => {
  res.contentType("application/javascript");
  res.send(`
    export const env = {
    };
  `);
});


// Serve static pages from /client
app.use(express.static('client/public'));

//start listening to server side calls
const PORT = process.env.PORT || 3978;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
