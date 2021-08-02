import "../styles/globals.css";
import Layout from "../components/layout.jsx";
import SnackbarProvider from "react-simple-snackbar";

function MyApp({Component, pageProps}) {
  return (
    <SnackbarProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SnackbarProvider>
  );
}

export default MyApp;
