import './LandingPage.css';
import React, { useState } from 'react';
import { HashRouter as Router, Routes, useLocation, Redirect, Route, useNavigate } from "react-router-dom";

function LandingPage() {
	const navigate = useNavigate();
	const [type, setType] = useState('')

	const handleChange = (e) => {
		setType(e.target.value)	
	}
	const handleSubmit = () => {
		if(type==='Dealer') {
			navigate('/Dealer')
		} else {
			navigate('/Customer')
		}
	}
	return (
		<div className='container'>
			<div className='content'>
				<p>
					<input type="radio" id="type" name="type" value="Dealer" onChange={e => handleChange(e)}/>
					<label for="html">Dealer</label>	
				</p>
				<p>
					<input type="radio" id="type" name="type" value="Cuatomer"/>
					<label for="html">Cuatomer</label>	
				</p>

				<p><button type="submit" onClick={ e => handleSubmit(e)}>Submit</button></p>
			</div>
		</div>
	)
  
}
export default LandingPage;
