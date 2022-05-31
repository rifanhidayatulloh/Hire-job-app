import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import LayoutMain from "../layouts/Layoutmain";

const layouts = {
  MainLayout: LayoutMain,
};

const NoLayout = ({ children }) => {
  return <>{children}</>;
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || NoLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
