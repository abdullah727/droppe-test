import React, { useCallback } from "react";

import styles from "../../styles/home.module.scss";
import CheckListProduct from "./checkListProduct";

export interface ChecklistProps {
  checklistData: any;
  onSubmitClick: () => void;
}

const Checklist: React.FC<ChecklistProps> = ({
  checklistData,
  onSubmitClick,
}) => {
  const getDiscountedPrice = useCallback((product: any) => {
    const totalPrice = product.detail.price * product.count;
    const discout = (totalPrice * product.count * 10) / 100;
    return Number((totalPrice - discout).toFixed(2));
  }, []);
  const getTotal = () => {
    let totalPrice = 0;
    checklistData;
    checklistData.forEach((product) => {
      totalPrice +=
        product.count > 1 ? getDiscountedPrice(product) : product.detail.price;
    });
    return totalPrice?.toFixed(2);
  };
  return (
    <div className={styles.finalChecklist}>
      <div className="text-center bold fs-24">FINAL CHECKLIST</div>
      <div className={styles.approvedList}>
        {checklistData.map((product) => (
          <CheckListProduct
            key={product.productId}
            product={product}
            getDiscountedPrice={getDiscountedPrice}
          />
        ))}
      </div>
      <div>
        <div className="flex justify-between mt-4">
          <span className="bold"> Total Amount</span>
          <span className={styles.price}> ${getTotal()}</span>
        </div>
        <div className={styles.confirmBtn} onClick={onSubmitClick}>
          CONFIRM
        </div>
      </div>
    </div>
  );
};

export default Checklist;
