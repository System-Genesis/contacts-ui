import { useTheme, Grid, Fade, styled, Box, keyframes } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Results from './components/results';
import EmptyResults from '../../assets/icons/emptyResults.svg';
import EmptyHistory from '../../assets/icons/emptyHistory.svg';
import { useEffect, useRef, useState } from 'react';
import { ResultsTypes } from '../../lib/enums';
import { useDebounce } from '@uidotdev/usehooks';
import { useQuery } from '@tanstack/react-query';
import { getCountsBySearchTermRequest, searchRequest } from '../../services/searchService';
import { ResultsMenu } from './components/resultsMenu';
import { mySearchHistory } from '../../services/historyService';
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
  animation: `${growRightToLeft} 0.7s ease forwards`,
  transformOrigin: 'right',
});

const FadeBox = styled(Box)({
  position: 'absolute',
  height: '100%',
});
// const FadeBox = styled(Box)({
//   position: 'absolute',
//   width: '85%',
// });

const Search = () => {
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [resultsType, setResultsType] = useState<ResultsTypes>(ResultsTypes.ENTITY);
  const scrolledElementRef = useRef<HTMLDivElement | null>(null);

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: searchHistoryResults } = useQuery({
    queryKey: ['history'],
    queryFn: mySearchHistory,
    initialData: [],
    enabled: debouncedSearchTerm.length === 0,
  });

  console.log({ searchHistoryResults });
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
    <Grid container width={'80%'} alignSelf={'center'} mt={2} mb={2} position="relative" justifyContent={'center'}>
      <Grid container display={'flex'} flexDirection={'row'} flexWrap={'nowrap'} justifyContent={'center'}>
        <Grid
          item
          xs={Object.values(counts).some((val) => val) ? 2 : 0}
          sx={{
            overflow: 'hidden',
            opacity: Object.values(counts).some((val) => val) ? 1 : 0,
            transform: Object.values(counts).some((val) => val) ? 'translateX(0)' : 'translateX(-20px)',
            display: Object.values(counts).some((val) => val) ? 'unset' : 'none',
            transition: 'opacity 50s ease, transform 50s ease',
          }}
        >
          <SlideBox>
            <ResultsMenu resultsType={resultsType} setResultsType={setResultsType} counts={counts} />
          </SlideBox>
        </Grid>

        <Grid
          item
          display={'flex'}
          xs={10}
          width={() => {
            if (searchTerm.length === 0) return '83%';
            if (searchTerm.length < 2) return 'max-content';
            if (searchResults.length) return '100%';
            return '83%';
          }}
          height={'76vh'}
          minWidth={'600px'}
          borderRadius={6}
          justifyContent={'center'}
          sx={{
            backgroundColor: theme.colors.gray,
          }}
        >
          {searchTerm.length < 2 && !searchResults.length ? (
            searchHistoryResults.length === 0 ? (
              <FadeBox>
                <img src={EmptyHistory} style={{ width: '100%' }} />
              </FadeBox>
            ) : (
              <Grid item>
                <Results results={searchHistoryResults} historyHeader />
              </Grid>
            )
          ) : (
            <>
              <Fade in={Object.values(counts).every((val) => !val)} timeout={500}>
                <FadeBox sx={{ display: Object.values(counts).every((val) => !val) ? 'block' : 'none' }}>
                  <img src={EmptyResults} style={{ width: '100%', alignSelf: 'center' }} />
                </FadeBox>
              </Fade>

              <Fade in={Object.values(counts).some((val) => val)} timeout={500}>
                <FadeBox sx={{ display: Object.values(counts).some((val) => val) ? 'block' : 'none' }}>
                  <Grid item xs={9} height={'75vh'} sx={{ justifyContent: 'center' }}>
                    <Results
                      type={resultsType}
                      results={searchResults}
                      count={counts?.[resultsType] ?? 0}
                      setPage={setPage}
                      scrolledElementRef={scrolledElementRef}
                      searchHeader
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
