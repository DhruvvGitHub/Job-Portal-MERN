import Footer from "../Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gray-100 flex flex-col justify-between">
      <Navbar />
      <div className="px-8">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
