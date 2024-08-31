import React from 'react';
import './CssFiles/about.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';

import styles from './CssFiles/home.module.css';

// Dummy data for products (you can replace this with actual API data)
const productsData = [
	{
		id: 1,
		name: 'manicure',
		description: 'Description for manicure',
		price: 29.99,
		imageUrl:
			'https://www.raycochrane.co.uk/wp-content/uploads/2019/08/frenchmanicure-1-1024x576.png',
	},
	{
		id: 2,
		name: 'Pedicure',
		description: 'Description for pedicure',
		price: 49.99,
		imageUrl:
			'https://aesthetebeauty.co.uk/files/2023/11/pink-pedicure-toenails-dundee-1920.jpg',
	},
	{
		id: 3,
		name: 'massage',
		description: 'Description for massage',
		price: 50.99,
		imageUrl:
			'https://organicthaispa.ca/wp-content/uploads/2022/07/COUPLES-MASSAGE-1-2048x1365-optimized.jpg',
	},
	{
		id: 4,
		name: 'yoga',
		description: 'Description for yoga',
		price: 13.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSjklsoxVK0JHuq1DNS7aH4R_hGkT07hkasQ&s',
	},
	{
		id: 5,
		name: 'salon',
		description: 'Description of salon',
		price: 39.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4jCu5aCPbsBkeHc7482oHgLzxwByiKIm3J0PIKjsZX00Brs0KDgIw17k2iGCR73N1Rw0&usqp=CAU',
	},
	{
		id: 6,
		name: 'Facial',
		description: 'Description for facial',
		price: 456.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToBWL5X92Ad60hV2tSDEq66Ln_ExYVH99J5g&s',
	},
	{
		id: 7,
		name: 'makeup',
		description: 'Description for makeup',
		price: 1999.99,
		imageUrl:
			'https://w7.pngwing.com/pngs/730/227/png-transparent-cosmetics-make-up-face-powder-makeup-set-face-fashion-makeup-brush.png',
	},
	{
		id: 8,
		name: 'tatooing',
		description: 'Description for tatooing',
		price: 209.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNHxwMvZvtFJv_BD7M_Gm74D2hay1MsfafA&s',
	},
	{
		id: 9,
		name: 'beauty',
		description: 'Description for beauty',
		price: 39.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA3Tv61JYkFDnf7MYjqOszMBeTSBB7Vz04n7iKsj0z0LpuZSO1YBQWwDZQH5GTmmnq-7E&usqp=CAU',
	},
	{
		id: 10,
		name: 'beauty',
		description: 'Description for beauty',
		price: 29.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA3Tv61JYkFDnf7MYjqOszMBeTSBB7Vz04n7iKsj0z0LpuZSO1YBQWwDZQH5GTmmnq-7E&usqp=CAU',
	},
	{
		id: 11,
		name: 'beauty',
		description: 'Description for beauty',
		price: 39.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA3Tv61JYkFDnf7MYjqOszMBeTSBB7Vz04n7iKsj0z0LpuZSO1YBQWwDZQH5GTmmnq-7E&usqp=CAU',
	},
	{
		id: 12,
		name: 'beauty',
		description: 'Description for beauty',
		price: 29.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA3Tv61JYkFDnf7MYjqOszMBeTSBB7Vz04n7iKsj0z0LpuZSO1YBQWwDZQH5GTmmnq-7E&usqp=CAU',
	},
	{
		id: 5,
		name: 'salon',
		description: 'Description of salon',
		price: 39.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4jCu5aCPbsBkeHc7482oHgLzxwByiKIm3J0PIKjsZX00Brs0KDgIw17k2iGCR73N1Rw0&usqp=CAU',
	},
	{
		id: 6,
		name: 'Facial',
		description: 'Description for facial',
		price: 456.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToBWL5X92Ad60hV2tSDEq66Ln_ExYVH99J5g&s',
	},
	{
		id: 7,
		name: 'makeup',
		description: 'Description for makeup',
		price: 1999.99,
		imageUrl:
			'https://w7.pngwing.com/pngs/730/227/png-transparent-cosmetics-make-up-face-powder-makeup-set-face-fashion-makeup-brush.png',
	},
	// Add more products as needed
];

const Home = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		// Fetch products data from an API
		// For this example, we are using dummy data
		setProducts(productsData);
	}, []);


	return (
		<>
			{/*/////////////////////////////////////////////////// HOME PAGE //////////////////////////////////////////////*/}
			<div className={styles.homeContainer}>
				<h1 className={styles.header}>
					<b>CLASSY DE ELEGANCE</b>
				</h1>
				<div className={styles.productsGrid}>
					{products.map(product => (
						<div key={product.id} className={styles.productCard}>
							<img
								src={product.imageUrl}
								alt={product.name}
								className={styles.productsImage}
							/>
							<h3>{product.name}</h3>
							<p>{product.description}</p>
							<p>${product.price.toFixed(2)}</p>
						</div>
					))}
				</div>
			</div>

		</>
	);
};

export default Home;
