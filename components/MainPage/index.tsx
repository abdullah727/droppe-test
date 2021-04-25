import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import styles from "../../styles/home.module.scss";
import Header from "./header";
import Filters from "./filters";
import CartSection from "./cartSection";

interface Props {
  cartData: Array<any>;
}
const Main: React.FC<Props> = ({ cartData }) => {
  const [state, setState] = useState({
    carts: [],
    finalChecklist: [],
    removeList: [],
    showSuccess: false,
    loading: false,
    priceFilter: "",
  });
  const {
    carts,
    finalChecklist,
    loading,
    removeList,
    priceFilter,
    showSuccess,
  } = state;

  useEffect(() => {
    setState((prevState) => ({ ...prevState, carts: cartData }));
  }, []);

  const onSubmitClick = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const { data } = await axios.post("products", finalChecklist);
    if (data) {
      setState((prevState) => ({
        ...prevState,
        showSuccess: true,
        loading: false,
      }));
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, showSuccess: false }));
      }, 2000);
    }
  }, [finalChecklist]);

  const handleAddProduct = useCallback(
    (cardId: number, productId: number) => () => {
      const cartSelected = carts.find((cart) => cart.id === cardId);
      let item = cartSelected.products.find(
        (product) => product.productId === productId
      );
      let isRepeat = finalChecklist.find(
        (product) => product.productId === item.productId
      );
      if (isRepeat) isRepeat = { ...isRepeat, count: isRepeat.count + 1 };
      else item = { ...item, count: 1 };

      setState((prevState) => ({
        ...prevState,
        carts: carts.map((cart) => {
          if (cart.id === cardId)
            return {
              ...cart,
              products: cartSelected.products.filter(
                (product) => product.productId !== productId
              ),
            };
          return cart;
        }),
        finalChecklist: [
          ...finalChecklist.filter(
            (product) => product.productId !== item.productId
          ),
          isRepeat || item,
        ],
      }));
    },
    [carts, finalChecklist]
  );

  const handleRemoveProduct = useCallback(
    (cardId: number, productId: number) => () => {
      const cartSelected = carts.find((cart) => cart.id === cardId);
      const item = cartSelected.products.find(
        (product) => product.productId === productId
      );
      setState((prevState) => ({
        ...prevState,
        carts: carts.map((cart) => {
          if (cart.id === cardId)
            return {
              ...cart,
              products: cartSelected.products.filter(
                (product) => product.productId !== productId
              ),
            };
          return cart;
        }),
        removeList: [
          ...removeList,
          { ...item, username: cartSelected.userDetail.name },
        ],
      }));
    },
    [carts, removeList]
  );

  const onEquallDistribute = useCallback(() => {
    let smallest = 999;
    let finalChecklistCopy = [];
    let cartsCopy = [...cartData];
    cartsCopy.forEach((cart) => {
      smallest =
        smallest > cart.products.length ? cart.products.length : smallest;
    });
    cartsCopy.forEach((cart) => {
      for (let i = 0; i < smallest; i++) {
        let element = cart.products[i];
        let isRepeat = finalChecklistCopy.find(
          (product) => product.productId === element.productId
        );
        if (isRepeat) isRepeat = { ...isRepeat, count: isRepeat.count + 1 };
        else element = { ...element, count: 1 };
        (cartsCopy = cartsCopy.map((cartItem) => {
          if (cart.id === cartItem.id)
            return {
              ...cartItem,
              products: cart.products.filter(
                (product) => product.productId !== element.productId
              ),
            };
          return cartItem;
        })),
          (finalChecklistCopy = [
            ...finalChecklistCopy.filter(
              (product) => product.productId !== element.productId
            ),
            isRepeat || element,
          ]);
      }
    });
    setState((prevState) => ({
      ...prevState,
      finalChecklist: finalChecklistCopy,
      carts: cartsCopy,
    }));
  }, [carts]);

  const onResetClick = useCallback(
    () =>
      setState((prevState) => ({
        ...prevState,
        carts: cartData,
        finalChecklist: [],
      })),
    []
  );

  const onPriceChange = useCallback(
    (e) =>
      setState((prevState) => ({
        ...prevState,
        priceFilter: e.target.value.replace(/[^0123456789.]/g, ""),
      })),
    []
  );

  const applyFilter = useCallback(
    () =>
      setState((prevState) => ({
        ...prevState,
        carts: cartData.map((cart) => {
          return {
            ...cart,
            products: cart.products.filter(
              (prod) => prod.detail.price < priceFilter
            ),
          };
        }),
      })),
    [priceFilter]
  );

  return (
    <div>
      <Header />
      {(showSuccess || loading) && (
        <div className={styles.statusBar}>
          {loading ? "Loading..." : ` Gifts have been saved successfully!`}
        </div>
      )}
      <Filters
        priceFilter={priceFilter}
        onPriceChange={onPriceChange}
        onEquallDistribute={onEquallDistribute}
        applyFilter={applyFilter}
      />
      <CartSection
        carts={carts}
        finalChecklist={finalChecklist}
        onResetClick={onResetClick}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
        onSubmitClick={onSubmitClick}
      />
    </div>
  );
};

export default Main;
