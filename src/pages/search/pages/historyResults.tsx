import { Grid } from '@mui/material';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Results from '../components/results';
import { mySearchHistory } from '../../../services/historySearvice';

const HistoryResults = () => {
  const scrolledElementRef = useRef<HTMLDivElement | null>(null);

  const { data: searchHistoryResults } = useQuery({
    queryKey: ['history'],
    queryFn: mySearchHistory,
    initialData: [],
  });

  return (
    <Grid container width={'85%'} flexDirection={'column'} alignContent={'center'} alignSelf={'center'}>
      <Grid item width={'85%'}>
        <Grid item xs={9.5}>
          <Results results={searchHistoryResults} scrolledElementRef={scrolledElementRef} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HistoryResults;
