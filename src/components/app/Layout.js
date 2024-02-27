import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import Header from '../header/Header';
import Spinner from "../spinner/Spinner";

function Layout() {
  const { loading, error } = useSelector((state) => state.data);

  return (
    <>
      <Header />
      {error && <h2>An error occured: {error}</h2>}
      {loading && <Spinner />}
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default Layout;
