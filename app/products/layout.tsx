export const metadata = {
  title: 'Products',
  description: 'Products page',
};

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='p-10'>{children}</div>;
};

export default ProductLayout;
