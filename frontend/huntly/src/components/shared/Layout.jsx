import Footer from '../Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="px-8 w-[100vw] h-screen flex flex-col justify-between">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
