import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

export interface Option {
  option: string;
  network: string;
}

export const ContactMenu = ({ icon, options, href }: { icon: string; options: Option[]; href: string }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!options?.length) return;

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
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {options?.map(({ option, network }) => (
          <MenuItem
            key={option}
            onClick={() => setAnchorEl(null)}
            component="a"
            href={`${href}${option}`}
            target="_blank"
            sx={{
              maxWidth: '10rem',
              borderRadius: 2,
              borderBottom: 1,
              borderColor: theme.colors.aquaLightGray,
              m: 1,
              p: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              <Typography color={theme.colors.lightGray}>{network}</Typography>
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  minWidth: '50px',
                  maxWidth: '80px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {option}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
