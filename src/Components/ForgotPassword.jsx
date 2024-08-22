import React, { useState } from 'react';
import styles from '../forgotpassword.module.css';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const validateEmail = (email) => {
		// Simple email validation regex
		const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return re.test(String(email).toLowerCase());
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			setError('Please enter a valid email address.');
			return;
		}
		// Clear error and send request
		setError('');
		setMessage(
			'If this email is registered, a password reset link will be sent.'
		);

		// Here, you'd typically send a request to your server to handle password reset
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2>Reset Password</h2>
				<input
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder="Enter your email"
					required
					className={`${styles.input} ${error ? styles.inputError : ''}`}
				/>
				{error && <p className={styles.error}>{error}</p>}
				<button type="submit" className={styles.button}>
					Send
				</button>
				{message && <p className={styles.message}>{message}</p>}
			</form>
		</div>
	);
};

export default ForgotPassword;
