const Layout = ({ children }: { children?: React.ReactElement }) => {
  return (
    <div className="max-w-[1280px] w-[98%] md:w-[90%] bg-blue-gray-400 mx-auto">
      {children}
    </div>
  );
};

export default Layout;
