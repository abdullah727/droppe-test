import React, { MouseEventHandler } from "react";

import styles from "../../styles/home.module.scss";
import CartProduct from "./cartProduct";

export interface CartProps {
  cartId: number;
  data: any;
  handleAddProduct: (
    cardId: number,
    productId: number
  ) => MouseEventHandler<HTMLDivElement>;
  handleRemoveProduct: (
    cardId: number,
    productId: number
  ) => MouseEventHandler<HTMLDivElement>;
}

const Cart: React.FC<CartProps> = ({ data, ...others }) => {
  return (
    <div className={styles.cartDiv}>
      <div className="text-center bold">
        {data?.userDetail?.name.firstname +
          " " +
          data?.userDetail?.name.lastname}
      </div>
      <div className={styles.cart}>
        {data?.products.map((product) => (
          <CartProduct product={product} {...others} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
