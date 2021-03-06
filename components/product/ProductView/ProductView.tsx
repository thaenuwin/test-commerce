import cn from 'classnames';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import s from './ProductView.module.css';
import { FC } from 'react';
import type { Product } from '@commerce/types/product';
import usePrice from '@framework/product/use-price';
import { WishlistButton } from '@components/wishlist';
import { ProductSlider, ProductCard } from '@components/product';
import ProductSidebar from '../ProductSidebar';

interface ProductViewProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  });

  return (
    <>
      <div className="container mx-auto px-3">
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>
            <div className={s.sliderContainer}>
              <ProductSlider key={product.id}>
                {product.images.map((image, i) => (
                  <div key={image.url} className={s.imageContainer}>
                    <Image
                      className={s.img}
                      src={image.url!}
                      alt={image.alt || 'Product Image'}
                      width={600}
                      height={600}
                      priority={i === 0}
                      quality="85"
                    />
                  </div>
                ))}
              </ProductSlider>
            </div>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton className={s.wishlistButton} productId={product.id} variant={product.variants[0]} />
            )}
          </div>

          <ProductSidebar product={product} className={s.sidebar} />
        </div>
        <hr className="mt-7 border-accent-2" />
        <section className="py-12 px-6 mb-10">
          <p>Related Products</p>
          <div className={s.relatedProductsGrid}>
            {relatedProducts?.map((p) => (
              <div key={p.path} className="animated fadeIn bg-accent-0 border border-accent-2">
                <ProductCard
                  product={p}
                  key={p.path}
                  variant="simple"
                  className="animated fadeIn"
                  imgProps={{
                    width: 300,
                    height: 300,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
    </>
  );
};

export default ProductView;
