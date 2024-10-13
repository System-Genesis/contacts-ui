import { Box, Grid, styled } from '@mui/material';
// import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Results from '../components/results';
import { mySearchHistory } from '../../../services/historySearvice';
import EmptyHistory from '../../../assets/icons/emptyHistory.svg';
import { searchHistoryResultsMock } from './historyResMock';

const FadeBox = styled(Box)({
  position: 'absolute',
  width: '85%',
});

const HistoryResults = () => {
  // const scrolledElementRef = u seRef<HTMLDivElement | null>(null);

  const { data: searchHistoryResults } = useQuery({
    queryKey: ['history'],
    queryFn: mySearchHistory,
    initialData: [],
  });

  return searchHistoryResults.length !== 0 ? (
    <FadeBox>
      <img src={EmptyHistory} style={{ width: '100%' }} />
    </FadeBox>
  ) : (
    <Grid item>
      {/* TODO: history results */}
      <Results results={searchHistoryResultsMock} historyHeader />
      {/* <Results results={searchResults} setPage={setPage} scrolledElementRef={scrolledElementRef} /> */}
    </Grid>
  );
};

export default HistoryResults;
