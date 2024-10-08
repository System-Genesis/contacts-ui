import { Box, Fade, Grid, styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Results from '../components/results';
import EmptyResults from '../../../assets/icons/emptyResults.svg';
import { ResultsMenu } from '../components/resultsMenu';
import { ResultsTypes } from '../../../lib/enums';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getCountsBySearchTermRequest, searchRequest } from '../../../services/searchService';
const env = import.meta.env;

const FadeBox = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
});

const SearchResults = () => {
  const [resultsType, setResultsType] = useState<ResultsTypes>(ResultsTypes.ENTITY);
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const scrolledElementRef = useRef<HTMLDivElement | null>(null);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

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
  }, [searchResults, page, searchTerm]);

  useEffect(() => {
    setPage(1);
    // scrolledElementRef.current!.scrollTop = 0;
  }, [searchTerm, resultsType]);

  return (
    <Grid container alignContent={'center'} alignSelf={'center'} justifyContent={'center'}>
      <Grid container>
        <Grid
          item
          xs={searchResults?.length !== 0 ? 2.5 : 0}
          sx={{
            overflow: 'hidden', // Prevent overflow when width is transitioning
            transition: 'opacity 0.5s ease, transform 0.5s ease', // Smooth transition for opacity and transform
            opacity: searchResults?.length !== 0 ? 1 : 0, // Fade in/out
            transform: searchResults?.length !== 0 ? 'translateX(0)' : 'translateX(-20px)', // Slide effect
            display: searchResults?.length === 0 ? 'none' : 'unset',
          }}
        >
          <ResultsMenu resultsType={resultsType} setResultsType={setResultsType} counts={counts} />
        </Grid>

        <Grid item xs={searchResults?.length === 0 ? 12 : 9.5}>
          <Fade in={searchResults?.length === 0} timeout={800}>
            <FadeBox sx={{ display: searchResults?.length === 0 ? 'block' : 'none', textAlign: 'center' }}>
              <img
                src={EmptyResults}
                style={{
                  background: '#F7F7F7',
                  borderRadius: 12,
                  marginBottom: 15,
                  width: '85%',
                }}
              />
            </FadeBox>
          </Fade>

          <Fade in={searchResults?.length !== 0} timeout={800}>
            <FadeBox sx={{ display: searchResults?.length !== 0 ? 'block' : 'none', width: '94.5%' }}>
              <Grid item xs={10} height={'79vh'} sx={{ justifyContent: 'center' }}>
                <Results
                  type={resultsType}
                  results={results}
                  count={counts?.[resultsType] ?? 0}
                  setPage={setPage}
                  scrolledElementRef={scrolledElementRef}
                />
              </Grid>
            </FadeBox>
          </Fade>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchResults;
