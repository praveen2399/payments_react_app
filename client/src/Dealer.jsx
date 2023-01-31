import './Dealer.css';
import React, { useState } from 'react';
import { HashRouter as Router, Routes, useLocation, Redirect, Route, useNavigate } from "react-router-dom";

function Dealer() {
	const [formValues, setFormValues] = useState([{ issue: "", seviority : "high", amount: ""}])
	const [phoneNumber, setPhoneNumber] = useState()

    let handleChange = (i, e) => {
			console.log('eeeeeeeee', e)
        let newFormValues = [...formValues];
				console.log('eeeeeeeee',e.target.name)
				console.log('eeeeeeeee',e.target.value)
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
		let handleChangePhone = (e) => {
			console.log('e.target.value', e.target.value)
			setPhoneNumber(e.target.value)	
		}
    let addFormFields = () => {
        setFormValues([...formValues, { issue: "", seviority : "high", amount: "" }])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
		<div className='container'>
			<div className='content'>
				<form  onSubmit={handleSubmit}>
				<div className='center'>
					<label>Phone Number</label>
					<input className='phone-number' type="text" name="phonenumber" value='nae' onChange={e => handleChangePhone(e)}/>
				</div>
				<table>
				{formValues.map((element, index) => (
					<tr>
					<div className="form-inline" key={index}>
						<td>
							<p><label>Issue</label></p>
							<input className='issue' type="text" name="issue" value={element.issue || ""} onChange={e => handleChange(index, e)} />
						</td>
						<td>
							<p><label>Seviority </label></p>
							<select name="seviority" value={element.seviority || "high"} onChange={e => handleChange(index, e)}> 
                  <option value='high' name="seviority"> high</option>
									<option value= "medium" name="seviority">medium</option>
                  <option value="low" name="seviority">low</option>
              </select>
						</td>
						<td>
							<p><label>Amount </label></p>
							<input className='amount' type="text" name="amount" value={element.amount || ""} onChange={e => handleChange(index, e)} />
						</td>
						<td>
						{
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
						</td>
					</div>
					</tr>
				))}
				</table>
				<div className="button-section center" >
				<button className="button add" type="button" onClick={() => addFormFields()}>Add Issues</button>
				<button className="button submit" type="submit">Submit</button>
				</div>
			</form>
		</div>
	  </div>
    )
}
export default Dealer;
