import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import store from "../app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Note-them-all</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer
        theme="dark"
      />
    </Provider>
  );
}

export default MyApp;
