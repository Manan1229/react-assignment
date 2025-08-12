import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../contexts/CartContext';
import productsData from '../data/products.json';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Our Store</h1>
        <p>Discover amazing products at great prices</p>
      </header>
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
