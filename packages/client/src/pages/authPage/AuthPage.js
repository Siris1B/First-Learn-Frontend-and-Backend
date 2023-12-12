import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import FormikLogin from '../../components/formikComponents/FormikLogin';
import FormikRegistration from '../../components/formikComponents/FormikRegistration';

export default function AuthPage() {
  const location = useLocation();
  const isLoginPage = useMemo(() => {
    return location.pathname === '/login';
  }, [location]);

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-60 sm:w-64 md:w-80 xl:w-96 p-4 xl:p-6 bg-slate-100 rounded-md shadow-2xl">
        <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl block text-center font-semubold">
          {isLoginPage ? 'Login' : 'Register'}
        </h1>
        {isLoginPage ? <FormikLogin /> : <FormikRegistration />}
        <Link
          to={isLoginPage ? '/register' : '/login'}
          className="mt-1 md:mt-3 hover:text-cyan-700 text-xs sm:text-sm md:text-base"
        >
          {isLoginPage
            ? 'Do not have account? - Sing up'
            : 'Already have account? - Sing in'}
        </Link>
      </div>
    </div>
  );
}
