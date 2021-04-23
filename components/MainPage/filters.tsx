import React, { useState } from "react";

import styles from "../../styles/home.module.scss";

export interface FilterProps {
  priceFilter: string;
  onPriceChange: (e) => void;
  onEquallDistribute;
  applyFilter;
}

const Filters: React.FC<FilterProps> = ({
  priceFilter,
  onPriceChange,
  onEquallDistribute,
  applyFilter,
}) => {
  const [showTooltop, setShowTooltip] = useState(false);
  return (
    <div>
      <div className="flex justify-around mt-8">
        <div className="flex ml-8 center">
          <div className="mr-2">remove products with price greater than</div>
          <input
            className={styles.priceInput}
            value={priceFilter}
            onChange={onPriceChange}
            placeholder="insert price"
          />
          <div className={styles.applyBtn} onClick={applyFilter}>
            Apply
          </div>
        </div>
        <div className="relative">
          {showTooltop && (
            <div className={styles.tooltip}>
              Click here to distribute gifts evenly in all children
            </div>
          )}
          <div
            onClick={onEquallDistribute}
            className={styles.confirmBtn}
            onMouseOver={() => setShowTooltip(true)}
            onMouseOut={() => setShowTooltip(false)}
          >
            Equally distribute
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
