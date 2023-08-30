import React, { useState } from 'react';
import Card from '../Card';
import './Login.css';
import '../../App.css'

export default function Login() {
	const [formValues, setFormValues] = useState({});

	function textChanged(e) {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(formValues);
	}

	return (
		<div className='login-root'>
			<Card title={"Welcome Back!"}>
				<div className='upright-flex'>
					<h2>Please log in to your account:</h2>
					<form onSubmit={handleSubmit} className='login-form'>
						<label htmlFor='username'>Username</label>
						<input onChange={textChanged} className='fancy-textblock' type='text' name='Username' id='username' />
						<label htmlFor='password'>Password</label>
						<input onChange={textChanged} className='fancy-textblock' type='Password' name='Password' id='password' />
						<button id='login-submit' type='submit'>Login</button>
					</form>
				</div>
			</Card>
		</div>)
}