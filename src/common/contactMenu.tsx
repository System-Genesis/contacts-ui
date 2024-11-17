import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import Tooltip from './divs/toolTip';

export interface Option {
  option: string;
  source?: string;
  displayText?: string;
}

export const ContactMenu = ({
  title,
  icon,
  options,
  href,
  disabled = false,
}: {
  title: string;
  icon: string;
  options: Option[];
  href: string;
  disabled?: boolean;
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!options?.length) return;

  if (options?.length === 1) {
    //TODO: if hidden -> disabled!!!!!
    return (
      <Tooltip title={title}>
        <IconButton href={`${href}${options[0].option}`} disabled={disabled} sx={{}}>
          <img src={icon} width={'20rem'} />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <>
      <Tooltip title={title}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{}}>
          <img src={icon} width={'24rem'} style={{ padding: 0 }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            minWidth: '17rem',
          },
        }}
      >
        {options?.map(({ option, displayText }: Option) => (
          <MenuItem
            onClick={() => setAnchorEl(null)}
            component="a"
            href={`${href}${option}`}
            target="_blank"
            sx={{
              maxWidth: 'auto',
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
              <Typography color={theme.colors.lightGray}>{displayText}</Typography>
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  width: '8rem',
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
