import { useState, useEffect } from 'react';
import classNames from 'classnames';

const Pagination = ({
  totalItems,
  setCurrentPage,
  currentPage,
  itemsPerPage,
}) => {
  const [arrOfCurrentPages, setArrOfCurrentPages] = useState([]);

  const pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    let tempNumberOfPages = [...pages];
    if (pages.length >= 10) {
      if (pages.length <= 5) {
        tempNumberOfPages = [
          ...new Array(pages.length).fill().map((_, i) => i + 1),
        ];
      } else if (currentPage === 4) {
        const sliced = pages.slice(2, 5);
        tempNumberOfPages = [1, '...', ...sliced, `...`, pages.length];
      } else if (currentPage > 4 && currentPage < pages.length - 2) {
        const sliced1 = pages.slice(currentPage - 2, currentPage);
        const sliced2 = pages.slice(currentPage, currentPage + 1);
        tempNumberOfPages = [
          1,
          '...',
          ...sliced1,
          ...sliced2,
          '...',
          pages.length,
        ];
      } else if (currentPage > pages.length - 3) {
        const sliced = pages.slice(pages.length - 4);
        tempNumberOfPages = [1, '...', ...sliced];
      } else if (currentPage >= 1 && currentPage < 4) {
        tempNumberOfPages = [1, 2, 3, 4, 5, `...`, pages.length];
      }
    }
    setArrOfCurrentPages(tempNumberOfPages);
  }, [totalItems]);

  if (totalItems < 2 || arrOfCurrentPages < 2) return;

  return (
    <div className="join mr-auto ml-auto mt-auto">
      {arrOfCurrentPages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setCurrentPage(page);
            }}
            className={classNames({
              'join-item btn btn-lg': true,
              'btn-disabled': page === `...`,
              'btn-active': page === currentPage,
            })}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
