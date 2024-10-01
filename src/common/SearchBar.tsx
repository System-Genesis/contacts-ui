import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import homeSvg from '../assets/icons/searchHome.svg';
import searchSvg from '../assets/icons/search.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [searchState, setState] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Paper
      component="form"
      sx={{
        padding: '0.5%',
        display: 'flex',
        alignItems: 'center',
        width: searchState ? 500 : 620,
        height: searchState ? 55 : 70,
        borderRadius: 50,
      }}
      onClick={() => navigate('/search')}
    >
      {searchState && (
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <img src={homeSvg} />
        </IconButton>
      )}

      <InputBase
        sx={{ ml: searchState ? 1 : 3, flex: 1 }}
        placeholder="ניתן לחפש לפי -שם, היררכיה, תפקידן ותגיות"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton
        type="button"
        sx={{ p: 'auto', background: '#81C7B7', width: searchState ? 40 : 50, height: searchState ? 40 : 50 }}
        aria-label="search"
      >
        <img src={searchSvg} />
      </IconButton>
    </Paper>
  );
};
