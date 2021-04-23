import React, { MouseEventHandler } from "react";

import styles from "../../styles/home.module.scss";

export interface CartProductProps {
  cartId: number;
  product: any;
  handleAddProduct: (
    cardId: number,
    productId: number
  ) => MouseEventHandler<HTMLDivElement>;
  handleRemoveProduct: (
    cardId: number,
    productId: number
  ) => MouseEventHandler<HTMLDivElement>;
}

const CartProduct: React.FC<CartProductProps> = ({
  cartId,
  product,
  handleAddProduct,
  handleRemoveProduct,
}) => {
  return (
    <div className={styles.productRow}>
      <div className="flex center justify-between">
        <div className="fs-17">
          <div>{product?.detail?.title}</div>
          <div className="bold">{`$${product?.detail?.price}`}</div>
        </div>
        <img src={product?.detail?.image} alt="img" height={60} />
      </div>
      <div className="flex justify-end mt-3">
        <div
          className={styles.add}
          onClick={handleAddProduct(cartId, product.productId)}
        >
          Add
        </div>
        <div
          className={styles.remove}
          onClick={handleRemoveProduct(cartId, product.productId)}
        >
          Remove
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
