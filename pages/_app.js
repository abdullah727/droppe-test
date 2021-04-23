import axios from "axios";
import "../styles/globals.scss";

axios.defaults.baseURL = "https://fakestoreapi.com/";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
