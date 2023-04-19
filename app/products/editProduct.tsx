'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { Brand } from '@prisma/client';
import axios from 'axios';

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const EditProduct = ({
  brands,
  product,
}: {
  brands: Brand[];
  product: Product;
}) => {
  const [title, setTitle] = React.useState(product.title);
  const [price, setPrice] = React.useState(product.price);
  const [brandId, setBrandId] = React.useState(product.brandId);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.put(`/api/products/${product.id}`, {
      title,
      price: Number(price),
      brandId: Number(brandId),
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        type='button'
        className='btn btn-info btn-sm'
        onClick={handleModal}>
        Edit Product
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Update {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className='form-control w-full'>
              <label className='label font-bold'>Product Name</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='input input-bordered'
                placeholder='Product Name'
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Price</label>
              <input
                type='text'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className='input input-bordered'
                placeholder='Price'
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Brand</label>
              <select
                value={brandId}
                onChange={(e) => setBrandId(Number(e.target.value))}
                className='select select-bordered'>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='modal-action'>
              <button type='button' className='btn' onClick={handleModal}>
                Close
              </button>
              <button type='submit' className='btn btn-primary'>
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
