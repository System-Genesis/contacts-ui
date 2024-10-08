import { Box, Grid, styled } from '@mui/material';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Results from '../components/results';
import { mySearchHistory } from '../../../services/historySearvice';
import EmptyHistory from '../../../assets/icons/emptyHistory.svg';

const FadeBox = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
});

const HistoryResults = () => {
  const scrolledElementRef = useRef<HTMLDivElement | null>(null);

  const { data: searchHistoryResults } = useQuery({
    queryKey: ['history'],
    queryFn: mySearchHistory,
    initialData: [],
  });

  return (
    <Grid container alignContent={'center'} alignSelf={'center'} justifyContent={'center'}>
      <Grid item width={'85%'}>
        {searchHistoryResults.length === 0 ? (
          <Grid display={'flex'} alignContent={'center'} justifyContent={'center'}>
            <img
              src={EmptyHistory}
              style={{
                background: '#F7F7F7',
                width: '100%',
                borderRadius: 12,
                height: '100%',
                opacity: '0px',
                marginBottom: 15,
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={9.5}>
            {/* TODO: history results */}
            <Results results={searchHistoryResults} scrolledElementRef={scrolledElementRef} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default HistoryResults;
