import React, { useState, useEffect } from 'react';

interface Product {
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

interface ProductFormProps {
  onSave: (product: Product) => void;
  initialProduct?: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSave, initialProduct }) => {
  const [product, setProduct] = useState<Product>({
    id: initialProduct?.id || 0,
    title: initialProduct?.title || '',
    price: initialProduct?.price || 0,
    description: initialProduct?.description || '',
    category: initialProduct?.category || '',
    image: initialProduct?.image || '',
    rating: initialProduct?.rating || { rate: 0, count: 0 },
  });

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={product.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <input
        name="image"
        value={product.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
