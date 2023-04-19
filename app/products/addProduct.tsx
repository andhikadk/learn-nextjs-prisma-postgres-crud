'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import type { Brand } from '@prisma/client';
import axios from 'axios';

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [brandId, setBrandId] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.post('/api/products', {
      title,
      price: Number(price),
      brandId: Number(brandId),
    });
    setTitle('');
    setPrice('');
    setBrandId('');
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button type='button' className='btn btn-primary' onClick={handleModal}>
        Add Product
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add New Product</h3>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setPrice(e.target.value)}
                className='input input-bordered'
                placeholder='Price'
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Brand</label>
              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className='select select-bordered'>
                <option value='' disabled>
                  Select a Brand
                </option>
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
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
