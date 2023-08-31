import React, { useState, useContext } from 'react';
import Card from '../Card';
import './Login.css';
import '../../App.css'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

export default function Signup() {
	const [formValues, setFormValues] = useState({});
	const { setUser, url } = useContext(UserContext);
	const [errors, setErrors] = useState([]);
	const history = useHistory();

	function textChanged(e) {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(formValues);
		fetch(`/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formValues)
		}).then(res => res.json())
			.then(data => {
				if (Array.isArray(data) || data.hasOwnProperty('errors')) {
					setErrors(data.errors ?? data);
					return;
				}
				console.log(data);
				setUser(data);
				history.push('/albums');
			})
	}

	return (
		<div className='login-root'>
			<Card title={"Welcome!"}>
				<div className='upright-flex'>
					<h2>Please create an account:</h2>
					<form onSubmit={handleSubmit} className='login-form'>
						{Array.isArray(errors) && errors.length > 0 ? errors.map((error, i) => <p className='error' key={i}>{error}</p>) : null}
						<div>
							<label htmlFor='username'>Username</label>
							<input onChange={textChanged} className='fancy-textblock' type='text' name='Username' id='username' />
						</div>
						<label htmlFor='password'>Password</label>
						<input onChange={textChanged} className='fancy-textblock' type='Password' name='password' id='password' />
						<label htmlFor='password_confirmation'>Confirm Password</label>
						<input onChange={textChanged} className='fancy-textblock' type='Password' name='password_confirmation' id='password_confirmation' />
						<button id='login-submit' type='submit'>Sign Up</button>
					</form>
				</div>
			</Card>
		</div>)
}