import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="w-screen px-8">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
