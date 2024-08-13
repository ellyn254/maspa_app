import React from 'react';
import { SocialIcon } from 'react-social-icons';
import '../CssFiles/footer.css';

const Footer = () => {
	return (
		<>
			<footer className="footer">
				<div className="footer-content">
					<div className="footer-section about">
						<h3 className="aboutus">About Us</h3>
						<p>
							We are a company dedicated to providing the best services and
							products.
						</p>
					</div>
					<div className="quick">
						<h3>Quick Links</h3>
						<ul>
							<li>
								<a href="/about">About</a>
							</li>
							<li>
								<a href="/services">Services</a>
							</li>
							<li>
								<a href="/contact">Contact</a>
							</li>
							<li>
								<a href="/privacy">Privacy Policy</a>
							</li>
						</ul>
					</div>
					<div className="admin">
						<h3>Admin access</h3>
						<ul>
							<li>
								<a href="/user/update/:id">Update User</a>
							</li>
							<li>
								<a href="/user"> View Users</a>
							</li>
							<li>
								<a href="/messages">Messages</a>
							</li>
						</ul>
					</div>
					<div className="footer-section social">
						<h3 className="text-white ">Follow Us</h3>
						<div className="social-icons">
							<SocialIcon
								icon="facebook"
								url="https://facebook.com"
								style={{ height: 25, width: 25 }}
							/>
							<SocialIcon
								url="https://twitter.com"
								icon="twitter"
								style={{ height: 25, width: 25 }}
							/>
							<SocialIcon
								icon="instagram"
								url="https://instagram.com"
								style={{ height: 25, width: 25 }}
							/>
							<SocialIcon
								url="https://linkedin.com"
								icon="linkedin"
								style={{ height: 25, width: 25 }}
							/>
							<SocialIcon
								url="https://email.com"
								icon="email"
								style={{ height: 25, width: 25 }}
							/>
						</div>
					</div>
				</div>
				<div className="footer-bottom">
					&copy; {new Date().getFullYear()} Ellyn Beauty SPA.
				</div>
			</footer>
		</>
	);
};

export default Footer;
