import s from './ProductSidebar.module.css';
import { useAddItem } from '@framework/cart';
import { FC, useEffect, useState } from 'react';
import { ProductOptions } from '@components/product';
import type { Product } from '@commerce/types/product';
import { useUI } from '@components/ui';
import { getProductVariant, selectDefaultOptionFromProduct, SelectedOptions } from '../helpers';
import HtmlParser from 'react-html-parser';
import usePrice from '@framework/product/use-price';

interface ProductSidebarProps {
  product: Product;
  className?: string;
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem();
  const { openSidebar } = useUI();
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions);
  }, []);

  const variant = getProductVariant(product, selectedOptions);
  const addToCart = async () => {
    setLoading(true);
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
      });
      openSidebar();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  });

  return (
    <div className={className}>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <div className="mb-10">
        <h3>
          <span>{product.name}</span>
        </h3>
        <div className={s.price}>{`${price} ${product.price?.currencyCode}`}</div>
      </div>
      <div className="pb-4 break-words w-full max-w-xl">
        {HtmlParser(product.descriptionHtml || product.description)}
      </div>
      <div>
        <button
          aria-label="Add to Cart"
          type="button"
          onClick={addToCart}
          disabled={variant?.availableForSale === false}
          className="border border-gray-500 border-solid p-4"
        >
          {variant?.availableForSale === false ? 'Not Available' : 'Add To Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductSidebar;
