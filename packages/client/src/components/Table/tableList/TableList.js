import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TableListItem from '../tableListItem/TableListItem';

import { fetchLanguages } from './languagesSlice';

function TableList() {
  const { languages } = useSelector((state) => state.languages);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(fetchLanguages());
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  const elements = languages.map((item) => {
    const { id } = item;
    return <TableListItem key={id} {...item} />;
  });

  return <div className="grid grid-cols-8 gap-4 mt-4">{elements}</div>;
}

export default TableList;
