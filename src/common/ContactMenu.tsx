import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';

export const ContactMenu = ({ icon, options, href }: { icon: string; options: string[]; href: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (options.length === 0) {
    return (
      <Tooltip title="לא הוזן" placement="top" arrow>
        <IconButton>
          <img src={icon} />
        </IconButton>
      </Tooltip>
    );
  }

  if (options.length === 1) {
    return (
      <IconButton href={`${href}:${options[0]}`}>
        <img src={icon} />
      </IconButton>
    );
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <img src={icon} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} onClick={handleClose} component="a" href={`${href}${option}`}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
