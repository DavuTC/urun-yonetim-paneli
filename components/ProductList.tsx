import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductItem from './ProductItem';
import ProductForm from './ProductForm';
import axios from 'axios';


export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductList: React.FC = () => {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [darkMode, setDarkMode] = useState(false); // Dark mode durumunu tutacak state

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const sortProducts = (key: keyof Product | 'rating.rate') => {
    const sortedProducts = [...products].sort((a, b) => {
      if (key === 'rating.rate') {
        return a.rating.rate > b.rating.rate ? 1 : -1;
      }
      return a[key] > b[key] ? 1 : -1;
    });
    setProducts(sortedProducts);
  };

  // Dark mode toggle fonksiyonu
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode'); // body'ye dark-mode class'ı ekler veya çıkar
  };

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <h2>{t('product_list')}</h2>
      
      <ProductForm onSave={editingProduct ? updateProduct : addProduct} initialProduct={editingProduct ?? undefined} />
      <div>
        <button onClick={() => sortProducts('price')}>{t('sort_by_price')}</button>
        <button onClick={() => sortProducts('rating.rate')}>{t('sort_by_popularity')}</button>
        <button onClick={() => sortProducts('id')}>{t('sort_by_date')}</button>
        <button onClick={toggleDarkMode}>{darkMode ? t('light_mode') : t('dark_mode')}</button> {/* Dark mode düğmesi */}
      </div>
      <div className="productList">
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onDelete={deleteProduct}
            onEdit={setEditingProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
