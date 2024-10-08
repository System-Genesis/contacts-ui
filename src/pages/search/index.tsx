import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import HistoryResults from './pages/historyResults';
import SearchResults from './pages/SearchResults';

const Search = () => {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  return (
    <Grid
      container
      width={'74.7%'}
      flexDirection={'column'}
      alignContent={'center'}
      alignSelf={'center'}
      mt={3}
      position="relative"
    >
      {searchTerm.length < 2 ? <HistoryResults /> : <SearchResults />}
    </Grid>
  );
};

export default Search;
