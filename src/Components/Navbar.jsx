import React, { useState, useContext } from 'react';
import { CartContext } from '../ReduxFeatures/ContextProvider';
import styles from '../Navbar.module.css';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Image from '../images/logo.jpg';

const Navbar = () => {
	const { cart } = useContext(CartContext);
	const [isMobile, setIsMobile] = useState(false);

	return (
		<nav className={styles.nav}>
			<Link to="/" className={styles.logo}>
				<img src={Image} alt="images" width={150} height={100} />
			</Link>
			<div className={styles.hamburger} onClick={() => setIsMobile(!isMobile)}>
				{isMobile ? <FaTimes /> : <FaBars />}
			</div>
			<div className={isMobile ? styles.menuMobile : styles.menu}>
				<div className={styles.menuItem}>
					<Link to="/home" className={styles.menuLink}>
						Home
					</Link>
				</div>
				<div className={styles.menuItem}>
					<Link to="/products" className={styles.menuLink}>
						Products
					</Link>
					<div className={styles.dropdown}>
						<Link to="/products/men">Men</Link>
						<Link to="/products/women">Women</Link>
						<Link to="/products/kids">Kids</Link>
					</div>
				</div>
				<div className={styles.menuItem}>
					<Link to="/services" className={styles.menuLink}>
						Services
					</Link>
					<div className={styles.dropdown}>
						<Link to="/manicure">Manicure</Link>
						<Link to="/pedicure">Pedicure</Link>
						<Link to="/massage">Massage</Link>
						<Link to="/salon">Salon</Link>
						<Link to="/yoga">Yoga</Link>
						<Link to="/facial">Facial</Link>
					</div>
				</div>
				<div className={styles.menuItem}>
					<Link to="/about" className={styles.menuLink}>
						About Us
					</Link>
				</div>
				<div className={styles.menuItem}>
					<Link to="/contact" className={styles.menuLink}>
						Contact
					</Link>
				</div>
				<div className={styles.menuItem}>
					<Link to="/cart" className={styles.menuLink}>
						<FaShoppingCart />
						{cart.length}
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
