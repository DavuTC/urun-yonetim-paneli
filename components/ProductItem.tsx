import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../components/ProductList';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


interface ProductItemProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete, onEdit }) => {
  const { t } = useTranslation('common');

  return (
    <div className="card-wrapper">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={product.image} alt={product.title} style={{ width: '100%', height: 'auto' }} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{t('price')}: {product.price}</Card.Text>
          <Card.Text>{t('category')}: {product.category}</Card.Text>
          <Card.Text>{t('description')}: {product.description}</Card.Text>
          <Button variant="primary" onClick={() => onEdit(product)}>{t('update_product')}</Button>
          <Button variant="danger" onClick={() => onDelete(product.id)}>{t('delete_product')}</Button>
        </Card.Body>
      </Card>
    </div>
  );
};



export default ProductItem;
