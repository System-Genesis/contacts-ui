import { useTheme, Grid, Fade, styled, Box, keyframes } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import HistoryResults from './pages/historyResults';
import Results from './components/results';
import EmptyResults from '../../assets/icons/emptyResults.svg';
import { useEffect, useRef, useState } from 'react';
import { ResultsTypes } from '../../lib/enums';
import { useDebounce } from '@uidotdev/usehooks';
import { useQuery } from '@tanstack/react-query';
import { getCountsBySearchTermRequest, searchRequest } from '../../services/searchService';
import { ResultsMenu } from './components/resultsMenu';
const env = import.meta.env;

const growRightToLeft = keyframes`
  from {
    width: 0;
    transform-origin: right;
  }
  to {
    width: 100%;
    transform-origin: right;
  }
`;

const SlideBox = styled(Box)({
  width: '100%',
  animation: `${growRightToLeft} 0.6s ease forwards`,
  transformOrigin: 'right',
});

const FadeBox = styled(Box)({
  position: 'absolute',
  width: '85%',
  height: '100%',
});

const Search = () => {
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [resultsType, setResultsType] = useState<ResultsTypes>(ResultsTypes.ENTITY);
  const scrolledElementRef = useRef<HTMLDivElement | null>(null);

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: counts } = useQuery({
    queryKey: ['getCountsBySearchTermRequest', debouncedSearchTerm],
    queryFn: () => getCountsBySearchTermRequest(debouncedSearchTerm),
    initialData: {
      entity: 0,
      goalUser: 0,
      group: 0,
    },
    enabled: !!debouncedSearchTerm,
  });

  const { data: searchResults } = useQuery({
    queryKey: ['search', debouncedSearchTerm, resultsType, page],
    queryFn: () => searchRequest(debouncedSearchTerm, resultsType, page, +env.VITE_BACKEND_PAGE_SIZE),
    initialData: [],
    enabled: !!debouncedSearchTerm,
  });

  useEffect(() => {
    setPage(1);
    // scrolledElementRef.current!.scrollTop = 0;
  }, [searchTerm, resultsType]);

  return (
    <Grid container width={'74.7%'} alignSelf={'center'} mt={2} mb={2} position="relative" justifyContent={'center'}>
      <Grid container display={'flex'} flexDirection={'row'} flexWrap={'nowrap'} justifyContent={'center'}>
        <Grid
          item
          xs={searchResults?.length !== 0 ? 2.5 : 0}
          sx={{
            overflow: 'hidden',
            opacity: searchResults?.length !== 0 ? 1 : 0,
            transform: searchResults?.length !== 0 ? 'translateX(0)' : 'translateX(-20px)',
            display: searchResults?.length === 0 ? 'none' : 'unset',
            transition: 'opacity 50s ease, transform 50s ease',
            minWidth: '200px',
          }}
        >
          <SlideBox>
            <ResultsMenu resultsType={resultsType} setResultsType={setResultsType} counts={counts} />
          </SlideBox>
        </Grid>

        <Grid
          item
          display={'flex'}
          width={'85%'}
          height={'75vh'}
          borderRadius={6}
          sx={{ backgroundColor: theme.colors.gray }}
        >
          {searchTerm.length < 2 && !searchResults.length ? (
            <HistoryResults />
          ) : (
            <>
              <Fade in={searchResults?.length === 0} timeout={500}>
                <FadeBox sx={{ display: searchResults?.length === 0 ? 'block' : 'none' }}>
                  <img src={EmptyResults} style={{ width: '100%' }} />
                </FadeBox>
              </Fade>

              <Fade in={searchResults?.length !== 0} timeout={500}>
                <FadeBox sx={{ display: searchResults?.length !== 0 ? 'block' : 'none', width: '94.5%' }}>
                  <Grid item xs={10} height={'79vh'} sx={{ justifyContent: 'center' }}>
                    <Results
                      type={resultsType}
                      results={searchResults}
                      count={counts?.[resultsType] ?? 0}
                      setPage={setPage}
                      scrolledElementRef={scrolledElementRef}
                    />
                  </Grid>
                </FadeBox>
              </Fade>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Search;
