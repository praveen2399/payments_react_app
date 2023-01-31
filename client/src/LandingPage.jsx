import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

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
					<label for="html">Customer</label>	
				</p>

				<p><button type="submit" onClick={ e => handleSubmit(e)}>Submit</button></p>
			</div>
		</div>
	)
  
}

export default LandingPage;
