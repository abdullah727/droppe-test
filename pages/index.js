import axios from "axios";
import Main from "../components/MainPage";

export default function Home({ cartData }) {
  return (
    <div>
      <Main cartData={cartData} />
    </div>
  );
}
export async function getStaticProps() {
  try {
    const { data: carts } = await axios.get("carts?limit=5");
    const { data: products } = await axios.get("products");
    const { data: users } = await axios.get("users");
    const cartData = carts.map((cart) => {
      return {
        ...cart,
        products: cart.products.map((product) => {
          return {
            ...product,
            detail: products.find((prod) => prod.id === product.productId),
          };
        }),
        userDetail: users.find((user) => user.id === cart.id),
      };
    });
    return {
      props: { cartData },
    };
  } catch (error) {
    return {
      props: { cartData: [] },
    };
  }
}
