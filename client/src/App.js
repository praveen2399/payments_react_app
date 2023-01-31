import { LineChart } from '@fluentui/react-charting';
import { PlayIcon } from '@fluentui/react-icons-northstar';
import { Button } from '@fluentui/react-northstar';
import React, { useEffect, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import SelectTableComponent from "./select-table.component";
import './usb.css';
import { getInvoiceItems } from './util.js';

var inv_total = 0;
var invid = 0;
var invdt = '';
var vendor = '';
var pstat = '';
var result = {};
var btid = '';


function InvoiceDetails() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/confirmpay', {
      state: { 
        invtotal: inv_total,
        invid: invid,
        vendor: vendor,
        pstat: pstat,
        invdt: invdt,
        btid: btid,
      }
    });
  };

  const handlePhoneNumber = () => {
    navigate('/phoneNumber')
  }

  const handleCustomerIssues = () => {
    navigate('/customerIssues')
  }

  var [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData(){
      result = await getInvoiceItems();
      inv_total = 0;
      invid = (result[0].invoice_no);
      invdt = (result[0].invoice_dt);
      vendor = (result[0].vendor_name);
      pstat = (result[0].invoice_status);
      btid = (result[0].bank_transaction_id);

      for (var i =0; i<result.length; i++)
        inv_total += (result[i].total_cost);

      console.log(invid);
      setData(result);
}
navigate("", { replace: true });
fetchData();

}, []);

return (


  <>
<div className="container">

<h1>Invoice</h1>
<br></br><br></br>
<table id="inv-table" className="inv-table">
    <thead>
    <tr>
        <th>Items</th>
        <th>Rate</th>
        <th>Quantity</th>
        <th>Total Cost</th>
    </tr>
    </thead>
    <tbody>
        { 
          data.map((item) => (
            <tr key={item.item_description}> 
                <td> {item.item_description}</td>
                <td>{item.price_per_unit}</td>
                <td>{item.no_of_units}</td>
                <td>{item.total_cost}</td>
            </tr>
        ))
        }
    </tbody>
</table>
<div className="item">            
    <p>Total Amount &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 
        &nbsp;<span style={{ fontColor: "blue" }}> {inv_total} <label id="txt_total"></label></span></p>
</div>

<div className="item">            
    <p>Payment Status &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 
        &nbsp;<span style={{ fontColor: "blue" }}> <label id="txt_status">{pstat}</label></span></p>
</div>
<div>
<p>Payment Confirmation ID : &nbsp;<span style={{ fontColor: "blue" }}>{btid}<label id="txt_btid"></label></span></p>
</div>

<div>

<Button disabled={pstat === "Paid"} onClick={handleClick} icon={<PlayIcon />} content="Click To Pay" Position='after' primary />
<Button onClick={handlePhoneNumber} icon={<PlayIcon />} content="To phonenumber" Position='after' primary />
<Button onClick={handleCustomerIssues} icon={<PlayIcon />} content="To customer issues page" Position='after' primary />
</div>
</div>


</>

  
);
}

function ConfirmPay(){
  const location = useLocation();
  const invtotal = useLocation().state.invtotal;
  const invid = useLocation().state.invid;
  const pstat = useLocation().state.pstat;
  const vendor = useLocation().state.vendor;
  const invdt = useLocation().state.invdt;

  const navigate = useNavigate();

  console.log(invid);

  // const [acctno, setAcctno] = useState('');
 
  const routno = '021000021';
  const acctno = '123456789';

  console.log('in get Token()', invid, acctno, routno);
  
  const clickToPay = () => {
    fetch (`/api/rtpfundtransfer`, {
      "method": "post",
      "cache": "default",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      "body": JSON.stringify({id: invid, acctno: acctno, routno: routno})
  });

  setTimeout(() => {
    navigate("/", { replace: true });
  }, 2000);
}

  return (
    <div className="testbox">
    <form  action="/">
      <div className="banner">
        <h1>Confirm Payment</h1>
      </div>
      <div className="item" >
        <p><span style={{ width: "40%", float: "left" }}> Invoice ID:&nbsp;&nbsp;
        </span></p></div>
      <div className="item" >
      <p><span style={{ width: "60%", float: "right" }}>
          <label id="txt_tid">{invid}</label></span></p></div>

      <div className="item">
        <p><span style={{ width: "40%", float: "left" }}> Invoice Date:&nbsp;&nbsp;
        </span></p></div>
      <div class="item" >
      <p><span style={{ width: "60%", float: "right" }}>
            <label id="txt_invdt">{invdt}</label></span></p></div>
      
      <div class="item" >            
        <p><span style={{ width: "40%", float: "left" }}>Vendor:&nbsp;&nbsp;
        </span></p></div>
      <div class="item" >
      <p><span style={{ width: "60%", float: "right" }}>
        <label id="txt_vendor">{vendor}</label></span></p></div>

      <div class="item" >
        <p> <span style={{ width: "40%", float: "left" }}> Amount:&nbsp;&nbsp;
        </span></p></div>
      <div class="item">  
        <p><span style={{ width: "60%", float: "right" }}>
        <label id="txt_amt">{invtotal}</label></span></p>
        </div> 
      
      <div class="item" >            
          <p><span style={{ width: "40%", float: "left" }}> 
          Payment Status:&nbsp;&nbsp;</span></p></div>
      <div class="item" >
      <p><span style={{ width: "60%", float: "right" }}>
        <label id="txt_status">{pstat}</label></span></p>
      </div>

      <div class="item">
          <p>Payee Account Number<span style={{ fontColor: "red" }}>*</span></p>
          <input type="text" id="txt_accno" name="accno" />
      </div>
      <div class="item">
          <p>Payee Routing Number<span style={{ fontColor: "red" }}>*</span></p>
          <input type="text" id="txt_routno" name="routno" />
      </div>
      <div class="item">
        <p>Notes</p>
        <textarea rows="2"></textarea>
      </div>
      <div class="btn-block">
        <button onClick={clickToPay} type="button" id="btn-send" >SEND</button>
      </div>
    </form>
  </div>
  );
}



function Dashboard() {
  const LineChartPoint= [
    { x: 0, y: 0 },
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 30 },
    { x: 4, y: 40 },
  ];

  return (
    <div>
      <h1>My Dashboard</h1>
      <LineChart
        data={LineChartPoint}
        xAxisTitle="X Value"
        yAxisTitle="Y Value"
      />
    </div>
  );
}

function PhoneNumber(){
  // `value` will be the parsed phone number in E.164 format.
   // Example: "+12133734253".
const [value, setValue] = useState()
const navigate = useNavigate();
const handleSubmit = () => {
//make a call to the backend to get the customer records and show that response in the customer table

navigate("/customerIssues", { replace: true });
}
return(
 <>
 <h1>Customer phone number verification</h1>
 <br/>
 <br/>
 <br/>
 <br/>
<PhoneInput
    placeholder="Enter customer phone number"
    defaultCountry="US"
    value={value}
    onChange={setValue}
    error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}/>
<Button onClick={handleSubmit}>Submit</Button>    
</> )
 } 

function CustomerIssues(){

}

function App(){
  return(
    <Routes>
      <Route path="/" element={<InvoiceDetails />} exact/>
      <Route path="/confirmpay" element={<ConfirmPay />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/phoneNumber" element={<PhoneNumber />} />
      <Route path="/customerIssues" element={<SelectTableComponent/>} />
    </Routes>
  );
}

export default App;