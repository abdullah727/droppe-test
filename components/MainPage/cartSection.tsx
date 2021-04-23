import React, { MouseEventHandler } from "react";

import styles from "../../styles/home.module.scss";
import Cart from "./cart";
import Checklist from "./checklist";

export interface CartProps {
  carts: any;
  finalChecklist: any;
  onResetClick: () => void;
  onSubmitClick: () => void;
  handleAddProduct: (
    cardId: number,
    productId: number
  ) => MouseEventHandler<HTMLDivElement>;
  handleRemoveProduct: (
    cardId: number,
    productId: number
  ) => MouseEventHandler<HTMLDivElement>;
}

const CartSection: React.FC<CartProps> = ({
  carts,
  finalChecklist,
  onResetClick,
  onSubmitClick,
  ...others
}) => {
  return (
    <div className={styles.mainPage}>
      <div className="flex justify-between">
        <div>
          {carts.map((cart) => (
            <Cart key={cart.id} cartId={cart.id} data={cart} {...others} />
          ))}
        </div>
        <div className={styles.resetBtn} onClick={onResetClick}>
          RESET
        </div>

        <Checklist
          checklistData={finalChecklist}
          onSubmitClick={onSubmitClick}
        />
      </div>
    </div>
  );
};

export default CartSection;
