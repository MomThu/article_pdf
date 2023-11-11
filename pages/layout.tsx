import Footer from "./component/FootComponent";
import Header from "./component/HeadComponent";

const Layout = ({children}) => {
  return (
    <div>
      <header>
        <Header />
      </header>

      <main>
        {children}
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
