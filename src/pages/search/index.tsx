import { Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ResultsTypes } from '../../lib/enums';
import { useQuery } from '@tanstack/react-query';
import { getCountsBySearchTermRequest, searchRequest } from '../../services/searchService';
import { ResultsMenu } from './components/resultsMenu';
import Results from './components/results';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
const env = import.meta.env;

const Search = () => {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const [resultsType, setResultsType] = useState<ResultsTypes>(ResultsTypes.ENTITY);
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const scrolledElementRef = useRef<HTMLDivElement | null>(null);

  const { data: counts } = useQuery({
    queryKey: ['getCountsBySearchTermRequest', searchTerm],
    queryFn: () => getCountsBySearchTermRequest(searchTerm),
    initialData: {
      entity: 0,
      goalUser: 0,
      group: 0,
    },
  });

  const { data: searchResults } = useQuery({
    queryKey: ['search', searchTerm, resultsType, page],
    queryFn: () => searchRequest(searchTerm, resultsType, page, +env.VITE_BACKEND_PAGE_SIZE),
  });

  useEffect(() => {
    if (searchResults) {
      if (page === 1) setResults(searchResults);
      else setResults((prevResults) => [...prevResults, ...searchResults]);
    }
  }, [searchResults, page]);

  useEffect(() => {
    setPage(1);
    scrolledElementRef.current!.scrollTop = 0;
  }, [searchTerm, resultsType]);

  return (
    <Grid container width={'85%'} flexDirection={'column'} alignContent={'center'} alignSelf={'center'}>
      <Grid item width={'85%'}>
        <Grid container>
          <Grid item xs={2.5}>
            <ResultsMenu resultsType={resultsType} setResultsType={setResultsType} counts={counts} />
          </Grid>
          <Grid item xs={9.5}>
            <Results
              type={resultsType}
              results={results}
              count={counts?.[resultsType] ?? 0}
              setPage={setPage}
              scrolledElementRef={scrolledElementRef}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Search;
