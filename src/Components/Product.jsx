/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { CartContext } from '../ReduxFeatures/ContextProvider';
import styles from '../product.module.css';

const Product = ({ product }) => {
	const { dispatch } = useContext(CartContext);

	return (
		<div className={styles.card}>
			<img
				src={product.image}
				className={styles['card-img']}
				alt={product.title}
			/>
			<div className={styles['card-body']}>
				<h5 className={styles['card-title']}>{product.title}</h5>
				<p className={styles['card-text']}>{product.description}</p>
				<h5 className={styles['card-title']}>{product.rate}</h5>
				<h5 className={`${styles['card-title']} ${styles['fw-bolder']}`}>
					Ksh. {product.price}
				</h5>
				<button
					className={styles['btn-cart']}
					onClick={() => dispatch({ type: 'Add', product })}
				>
					Add To Cart
				</button>
			</div>
		</div>
	);
};

export default Product;
