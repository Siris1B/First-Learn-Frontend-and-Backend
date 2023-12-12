import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TableListItem from '../tableListItem/TableListItem';
import Loading from '../../UI/loading/Loading';

import { fetchLanguages } from './languagesSlice';

function TableList() {
  const [loading, setLoading] = useState(false);

  const { languages } = useSelector((state) => state.languages);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      getLanguages();
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [dispatch]);

  async function getLanguages() {
    setLoading(true);
    await dispatch(fetchLanguages());
    setLoading(false);
  }

  const elements = languages.map((item) => {
    const { id } = item;
    return <TableListItem key={id} {...item} />;
  });

  return (
    <div className="grid grid-cols-8 gap-4 mt-4">
      {loading ? <Loading /> : elements}
    </div>
  );
}

export default TableList;
