import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';

export const ContactMenu = ({ icon, options, href }: { icon: string; options: string[]; href: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (options.length === 0) return;
  // return (
  //   <Tooltip title="לא הוזן" placement="top" arrow>
  //     <IconButton p={0}>
  //       <img src={icon} width={'22rem'} />
  //     </IconButton>
  //   </Tooltip>
  // );

  if (options.length === 1)
    return (
      <IconButton p={0} href={`${href}${options[0]}`}>
        <img src={icon} width={'20rem'} />
      </IconButton>
    );

  return (
    <>
      <IconButton p={0} onClick={handleClick}>
        <img src={icon} width={'20rem'} />
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
