import { Box, Stack, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ResultsTypes } from '../../lib/enums';
import { useQuery } from '@tanstack/react-query';
import { getCountsBySearchTerm, search } from '../../services/backendService';
import { ResultsMenu } from './components/resultsMenu';
import Results from './components/results';
const env = import.meta.env;

const Search = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [resultsType, setResultsType] = useState<ResultsTypes>(ResultsTypes.ENTITY);
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const scrolledElementRef = useRef<HTMLDivElement | null>(null);

  const { data: counts } = useQuery({
    queryKey: ['getCountsBySearchTerm', searchTerm],
    queryFn: () => getCountsBySearchTerm(searchTerm),
  });

  const { data: searchResults } = useQuery({
    queryKey: ['search', searchTerm, resultsType, page],
    queryFn: () => search(searchTerm, resultsType, page, +env.VITE_BACKEND_PAGE_SIZE),
  });

  useEffect(() => {
    if (searchResults) {
      if (page === 1) {
        setResults(searchResults);
      } else {
        setResults((prevResults) => [...prevResults, ...searchResults]);
      }
    }
  }, [searchResults, page]);

  useEffect(() => {
    setPage(1);
    scrolledElementRef.current!.scrollTop = 0;
  }, [searchTerm, resultsType]);

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        rowGap: theme.spacing(5),
        paddingX: theme.spacing(20),
      }}
    >
      <Box sx={{ flex: 1 }}>{/* <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}</Box>

      <Box sx={{ flex: 6, display: 'flex', overflowY: 'hidden' }}>
        <Box sx={{ flex: 1 }}>
          {counts && <ResultsMenu resultsType={resultsType} setResultsType={setResultsType} counts={counts} />}
        </Box>
        <Box sx={{ flex: 5 }}>
          <Results
            type={resultsType}
            results={results}
            count={counts?.[resultsType] ?? 0}
            setPage={setPage}
            scrolledElementRef={scrolledElementRef}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default Search;
