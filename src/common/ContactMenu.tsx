import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

export const ContactMenu = ({ icon, options, href }: { icon: string; options: string[]; href: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (options?.length === 0) return;

  // if (options?.length === 1)
  //   return (
  //     <IconButton p={0} href={`${href}${options[0]}`}>
  //       <img src={icon} width={'20rem'} />
  //     </IconButton>
  //   );

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ m: 0 }}>
        <img src={icon} width={'24rem'} style={{ padding: 0 }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {options?.map((option) => (
          <MenuItem
            key={option}
            onClick={() => setAnchorEl(null)}
            component="a"
            href={`${href}${option}`}
            target="_blank"
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
