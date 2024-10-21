import { Box, Grid, styled } from '@mui/material';
// import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Results from '../components/results';
import { mySearchHistory } from '../../../services/historyService';
import EmptyHistory from '../../../assets/icons/emptyHistory.svg';

const FadeBox = styled(Box)({
  position: 'absolute',
  width: '85%',
});

const HistoryResults = () => {
  const { data: searchHistoryResults } = useQuery({
    queryKey: ['history'],
    queryFn: mySearchHistory,
    initialData: [],
  });

  return searchHistoryResults.length === 0 ? (
    <FadeBox>
      <img src={EmptyHistory} style={{ width: '100%' }} />
    </FadeBox>
  ) : (
    <Grid item>
      <Results results={searchHistoryResults} historyHeader />
    </Grid>
  );
};

export default HistoryResults;
