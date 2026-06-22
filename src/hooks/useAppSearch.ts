import { useHistory, useLocation } from 'react-router-dom';

export function useAppSearch() {
  const history = useHistory();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('q') ?? '';

  const setQuery = (value: string) => {
    const params = new URLSearchParams(location.search);
    const trimmed = value.trim();

    if (trimmed) {
      params.set('q', trimmed);
    } else {
      params.delete('q');
    }

    const search = params.toString();

    history.push({
      pathname: '/apps',
      search: search ? `?${search}` : '',
    });
  };

  return { query, setQuery };
}
