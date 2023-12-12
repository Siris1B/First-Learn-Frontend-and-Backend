import { Link } from 'react-router-dom';
import './TableListItem.css';

import notFound from './notFound.webp';

function TableListItem({ id, name, year, img_url }) {
  if (!img_url) {
    img_url = notFound;
  }
  return (
    <Link className="flip-card" to={`/languages/${id}/posts`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            className="bg-contain w-[100px] h-[100px] "
            src={img_url}
            alt={name}
            onError={(e) => {
              e.target.src = notFound;
            }}
          />
        </div>
        <div className="flip-card-back relative">
          <span className="absolute styled_span text-lg	">
            {name} {year}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default TableListItem;
