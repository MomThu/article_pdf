import React from "react";
import Header from "./component/HeadComponent";
import Footer from "./component/FootComponent";

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
