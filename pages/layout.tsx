import Footer from "./component/FootComponent";
import Header from "./component/HeadComponent";

const Layout = ({children}) => {
  return (
    <div>
      <header className="sticky top-0 z-50">
        <Header />
      </header>

      <main className="relative">
        {children}
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
