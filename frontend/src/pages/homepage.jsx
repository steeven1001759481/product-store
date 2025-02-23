import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '@/store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(()=>{
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <b>Current Products</b>

      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}

      {products.length == 0 &&
      (
      <div>
        <i>No products found</i>
        <br></br>
        <Link to={"/create"}>
          create new product
        </Link>
      </div>
      )}
    </div>
  )
}

export default HomePage
