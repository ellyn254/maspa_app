import React from 'react';
import styles from '../CssFiles/Footer.module.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiMailFill } from 'react-icons/ri';

const Footer = () => {
	return (
		<>
			<footer className={styles.footer}>
				<div className={styles['footer-content']}>
					<div className={styles['footer-section']}>
						<h3>About Us</h3>
						<p>
							We are a company dedicated to providing the best services and
							products.
						</p>
					</div>
					<div className={styles['footer-section']}>
						<h3>Quick Links</h3>
						<ul>
							<li>
								<a href="/about">About</a>
							</li>
							<li>
								<a href="/services/:name">Services</a>
							</li>
							<li>
								<a href="/contact">Contact</a>
							</li>
							<li>
								<a href="/privacy">Privacy Policy</a>
							</li>
						</ul>
					</div>
					<div className={styles['footer-section']}>
						<h3>Admin access</h3>
						<ul>
							<li>
								<a href="/user/update/:id">Update User</a>
							</li>
							<li>
								<a href="/user">View Users</a>
							</li>
							<li>
								<a href="/messages">Messages</a>
							</li>
						</ul>
					</div>
					<div className={styles['footer-section']}>
						<h3>Kenya</h3>
						<div className={styles['social-icons']}>
							<ul>
								<li>
									<RiMailFill /> info@maspaenterprise.com
								</li>
								<li>
									<FaPhoneAlt /> +254 790 834127
								</li>
								<li>
									<FaMapMarkerAlt /> Office 1402, Three Sails Tower
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className={styles['footer-bottom']}>
					&copy; Ellyn Beauty SPA. All rights reserved
				</div>
			</footer>
		</>
	);
};

export default Footer;
