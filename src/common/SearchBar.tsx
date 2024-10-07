import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import homeSvg from '../assets/icons/searchHome.svg';
import searchSvg from '../assets/icons/search.svg';
import closeSvg from '../assets/icons/close.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSearchTerm } from '../store/reducers/search';

export const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const dispatch = useDispatch();

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
        transition: 'width 1s, height 1s ',
        boxShadow: '0px 20px 50px  #DDDDDD',
      }}
      onFocus={() => navigate('/search')}
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
          transition: 'margin-left 1s',
          fontSize: location.pathname === '/' ? '16px' : '14px',
        }}
        placeholder="ניתן לחפש לפי -שם, היררכיה, תפקידן ותגיות"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        onFocus={() => navigate('/search')}
      />
      {location.pathname !== '/' && searchTerm !== '' && (
        <IconButton sx={{ p: '1rem' }} aria-label="menu" onClick={() => dispatch(setSearchTerm(''))}>
          <img src={closeSvg} style={{ width: '1rem' }} />
        </IconButton>
      )}

      <IconButton
        type="button"
        sx={{
          p: 'auto',
          background: theme.colors.darkAqua,
          width: location.pathname === '/' ? 50 : 40,
          height: location.pathname === '/' ? 50 : 40,
          transition: 'width 1s, height 1s ',
          ['::hover']: { background: theme.colors.darkAqua },
        }}
        aria-label="search"
      >
        <img src={searchSvg} />
      </IconButton>
    </Paper>
  );
};
