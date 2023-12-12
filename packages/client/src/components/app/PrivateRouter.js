import { Navigate, Outlet } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';

export default function PrivateRouter() {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-full">
      <Header />
      <div className="container relative mx-auto h-[86vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
