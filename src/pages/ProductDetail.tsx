import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, useCart } from '../contexts/CartContext';
import productsData from '../data/products.json';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id || '0', 10));
    setProduct(foundProduct || null);
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail">
        <div className="not-found">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/products" className="back-link">← Back to Products</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-detail">
      <Link to="/products" className="back-link">← Back to Products</Link>
      
      <div className="product-detail-content">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-category-badge">{product.category}</p>
          <p className="product-price-large">${product.price.toFixed(2)}</p>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-actions">
            <button 
              onClick={handleAddToCart}
              className="add-to-cart-btn-large"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
