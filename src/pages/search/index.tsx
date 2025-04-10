import { useTheme, Grid, Fade, styled, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Results from './components/results';
import EmptyResults from '../../assets/icons/emptyResults.svg';
import EmptyHistory from '../../assets/icons/emptyHistory.svg';
import { useCallback, useRef, useState } from 'react';
import { ResultsTypes } from '../../lib/enums';
import { useDebounce } from '@uidotdev/usehooks';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCountsBySearchTermRequest, searchRequest } from '../../services/searchService';
import { ResultsMenu } from './components/resultsMenu';
import { mySearchHistory } from '../../services/historyService';
import Lottie from 'react-lottie';
import loadingResults from '../../assets/lottie/loadingResults.json';
const env = import.meta.env;

const FadeBox = styled(Box)({
  position: 'absolute',
  height: '100%',
});

const Search = () => {
  const theme = useTheme();
  const observer = useRef<IntersectionObserver>();

  const [resultsType, setResultsType] = useState<ResultsTypes>(ResultsTypes.ENTITY);

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingResults,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { data: searchHistoryResults, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['history'],
    queryFn: mySearchHistory,
    enabled: debouncedSearchTerm.length === 0,
  });

  const { data: counts } = useQuery({
    queryKey: ['getCountsBySearchTermRequest', debouncedSearchTerm],
    queryFn: () => getCountsBySearchTermRequest(debouncedSearchTerm),
    initialData: {
      entity: 0,
      goalUser: 0,
      group: 0,
      tag: 0,
    },
    enabled: !!debouncedSearchTerm,
  });
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading: isSearchLoading,
  } = useInfiniteQuery({
    queryKey: ['search', debouncedSearchTerm, resultsType],
    queryFn: ({ pageParam }) => searchRequest(debouncedSearchTerm, resultsType, pageParam, +env.VITE_BACKEND_PAGE_SIZE),
    getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length + 1 : undefined),
    initialPageParam: 1,
    enabled: debouncedSearchTerm?.length >= 2,
  });
  const searchResults = data?.pages.reduce((acc, page) => [...acc, ...page], []) ?? [];

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isSearchLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) void fetchNextPage();
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isSearchLoading],
  );

  return (
    <Grid container width={'80%'} alignSelf={'center'} mt={2} mb={2} position="relative" justifyContent={'center'}>
      <Grid container display={'flex'} flexDirection={'row'} flexWrap={'nowrap'} justifyContent={'center'}>
        <Grid item xs={Object.values(counts).some((val) => val) ? 2 : 0}>
          <Grid
            item
            sx={{
              display: 'block',
              width: Object.values(counts).some((val) => val) ? '250px' : '0px',
              opacity: Object.values(counts).some((val) => val) ? 1 : 0,
              visibility: Object.values(counts).some((val) => val) ? 'visible' : 'hidden',
              transform: Object.values(counts).some((val) => val) ? 'translateX(0)' : 'translateX(-50%)',
              overflow: 'clip',
              transition: 'opacity 0.5s ease, visibility 0.2s ease, transform 0.5s ease, width 0.8s ease',
            }}
          >
            <ResultsMenu resultsType={resultsType} setResultsType={setResultsType} counts={counts} />
          </Grid>
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
          height={'77vh'}
          minWidth={'600px'}
          borderRadius={6}
          justifyContent={'center'}
          sx={{
            backgroundColor: theme.colors.gray,
            pb: 3,
          }}
        >
          {(isHistoryLoading || isSearchLoading) ? (
            <Box sx={{ alignSelf: 'center' }}>
              <Lottie options={defaultOptions} height={500} width={500} />
            </Box>
          ) : searchTerm.length < 2 && !searchResults.length ? (
            !searchHistoryResults?.length ? (
              <FadeBox>
                <img src={EmptyHistory} style={{ width: '100%' }} />
              </FadeBox>
            ) : (
                <Grid container>
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
                          scrolledElementRef={lastElementRef}
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
