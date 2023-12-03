import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white shadow dark:bg-gray-800 mt-4">
      <div className="w-full mx-auto p-4 md:flex md:items-center md:justify-between container">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <Link to="/languages" className="hover:underline">
            Langs™
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li className="list-none">
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li className="list-none">
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li className="list-none">
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li className="list-none">
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
