import React from "react";

import styles from "../../styles/home.module.scss";

export interface CheckListProductProps {
  product: any;
  getDiscountedPrice: (product: any) => void;
}

const CheckListProduct: React.FC<CheckListProductProps> = ({
  product,
  getDiscountedPrice,
}) => {
  return (
    <div>
      <div className="flex mt-3 center justify-between">
        <div className="flex center">
          <div className="mr-3"> {product?.count}</div>
          <img
            className="mr-4"
            src={product?.detail?.image}
            alt="img"
            height={60}
          />
          <div className="mr-4"> {product?.detail?.title}</div>
        </div>
        <div>
          <div className={styles.price}>
            $
            {product?.count > 1
              ? getDiscountedPrice(product)
              : product.detail.price * product.count}
          </div>
          {product?.count > 1 && (
            <div>
              <span className={styles.originalPrice}>
                ${product.detail.price * product.count}
              </span>
              <span className="bold">{`(-${product.count * 10}%)`}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckListProduct;
