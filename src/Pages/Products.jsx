/* eslint-disable no-unused-vars */

import React from 'react';
import Data from '../Data.json';
import { useState } from 'react';
import Product from '../Components/Product';
import styles from '../product.module.css';

const Products = () => {

const [products, setProducts]=useState(Data.products);

  return (
    
    <div className={styles.container}>
      {products.map((p) => (
        <Product product={p} key={p.id} />
      ))}
    </div>

  )
}

export default Products