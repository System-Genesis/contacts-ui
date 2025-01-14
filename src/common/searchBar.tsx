import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import homeSvg from '../assets/icons/searchHome.svg';
import searchSvg from '../assets/icons/search.svg';
import closeSvg from '../assets/icons/close.svg';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSearchTerm } from '../store/reducers/search';
import { useEffect } from 'react';
import { searchPerformed } from '../matomo/actions';

export const SearchBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e?.target.value ?? '';
    dispatch(setSearchTerm(newSearchTerm));
    if (newSearchTerm) setSearchParams({ query: newSearchTerm });
    else setSearchParams({});

    searchPerformed(newSearchTerm);
  };

  const query = searchParams.get('query');
  useEffect(() => {
    if (query) dispatch(setSearchTerm(query));
  }, [query, dispatch]);

  return (
    <Paper
      component="form"
      sx={{
        padding: '0.5%',
        display: 'flex',
        alignItems: 'center',
        width: location.pathname === '/' ? 620 : 500,
        height: location.pathname === '/' ? 70 : 55,
        borderRadius: 50,
        transition: 'width 0.7s, height 0.7s ',
        boxShadow: '0px 20px 50px  #DDDDDD',
      }}
      onFocus={() => location.pathname === '/' && navigate('/search')}
      onSubmit={(e) => e.preventDefault()}
    >
      {location.pathname !== '/' && (
        <IconButton
          sx={{ p: '1rem' }}
          aria-label="menu"
          onClick={() => {
            dispatch(setSearchTerm(''));
            navigate('/');
          }}
        >
          <img src={homeSvg} style={{ width: '1rem' }} />
        </IconButton>
      )}

      <InputBase
        sx={{
          ml: location.pathname === '/' ? 3 : 1,
          flex: 1,
          transition: 'margin-left 0.7s',
          fontSize: location.pathname === '/' ? 16 : 14,
        }}
        readOnly={location.pathname === '/'}
        placeholder='ניתן לחפש לפי -שם, היררכיה, חמ"ל, תפקידן ותגיות'
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e)}
        onFocus={() => location.pathname === '/' && navigate('/search')}
      />
      {location.pathname !== '/' && searchTerm !== '' && (
        <IconButton sx={{ m: 0.2 }} onClick={() => handleSearchChange()}>
          <img src={closeSvg} style={{ width: '1.2rem' }} />
        </IconButton>
      )}

      <IconButton
        type="button"
        sx={{
          p: 'auto',
          m: 0.65,
          background: theme.colors.darkAqua,
          width: location.pathname === '/' ? 50 : 40,
          height: location.pathname === '/' ? 50 : 40,
          transition: 'width 0.7s, height 0.7s',
          [':hover']: { background: theme.colors.darkAqua },
        }}
        aria-label="search"
      >
        <img src={searchSvg} />
      </IconButton>
    </Paper>
  );
};
