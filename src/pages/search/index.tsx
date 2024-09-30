import { Box, Stack, useTheme } from '@mui/material';
import { useState } from 'react';
import { ResultsTypes } from '../../lib/enums';
import { useQuery } from '@tanstack/react-query';
import { getCountsBySearchTerm } from '../../services/backendService';
import { ResultsMenu } from './components/resultsMenu';

const Search = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [resultsType, setResultsType] = useState<ResultsTypes>(ResultsTypes.ENTITY);

  const { data: counts } = useQuery({
    queryKey: ['getBackendConfig', searchTerm],
    queryFn: () => getCountsBySearchTerm(searchTerm),
    // meta: {
    //   errorMessage: i18next.t('error.config'),
    // },
  });

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: theme.spacing(5),
        rowGap: theme.spacing(5),
        paddingX: theme.spacing(15),
      }}
    >
      <Box sx={{ flex: 1 }}>{/* <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}</Box>

      <Box sx={{ flex: 5, display: 'flex' }}>
        <Box sx={{ flex: 1 }}>
          {counts && <ResultsMenu resultsType={resultsType} setResultsType={setResultsType} counts={counts} />}
        </Box>
        <Box sx={{ flex: 5 }}>{/* <Results /> */}</Box>
      </Box>
    </Stack>
  );
};

export default Search;
