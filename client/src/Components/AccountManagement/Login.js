import React, { useState, useContext } from 'react';
import Card from '../Card';
import './Login.css';
import '../../App.css'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

export default function Login() {
	const [formValues, setFormValues] = useState({});
	const { url, user, setUser } = useContext(UserContext);
	const history = useHistory();
	const [errors, setErrors] = useState([]);
	function textChanged(e) {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		fetch(`/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formValues)
		}).then(res => res.json())
			.then(data => {
				if (Array.isArray(data) || data.hasOwnProperty('errors')) {
					setErrors(data.errors ?? data);
				} else {
					setUser(data.user);
					history.push('/albums');
				}
			})
	}

	return (
		<div className='login-root'>
			<Card title={"Welcome Back!"}>
				<div className='upright-flex'>
					<h2>Please log in to your account:</h2>
					{Array.isArray(errors) && errors.length > 0 ? errors.map((error, i) => <p className='error' key={i}>{error}</p>) : null}
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