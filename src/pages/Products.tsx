import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../contexts/CartContext';
import productsData from '../data/products.json';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  useEffect(() => {
    if (categoryFilter === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === categoryFilter));
    }
  }, [categoryFilter, products]);

  const categories = ['All', ...new Set(products.map(product => product.category))];

  return (
    <div className="products">
      <header className="products-header">
        <h1>Our Products</h1>
        <p>Browse our complete collection</p>
      </header>

      <div className="filter-section">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="no-products">No products found in this category.</p>
      )}
    </div>
  );
};

export default Products;
