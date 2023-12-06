import Footer from "./component/FootComponent";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <main className="relative">{children}</main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
