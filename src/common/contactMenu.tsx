import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import Tooltip from './divs/toolTip';
import { StyledDivider } from './drawer/content/divider';
import i18next from 'i18next';

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

  if (options?.length === 1)
    return (
      <Tooltip title={disabled ? i18next.t(`disabled`) : title}>
        <IconButton href={!disabled && `${href}${options[0].option}`} sx={{ p: 0, m: 1 }} target="_blank">
          <img src={icon} width={'22rem'} style={{ filter: disabled ? 'grayscale(100%)' : '' }} />
        </IconButton>
      </Tooltip>
    );

  return (
    <>
      <Tooltip title={title}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0, m: 1 }}>
          <img src={icon} width={'22rem'} style={{ padding: 0 }} />
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
          <>
            <MenuItem
              key={displayText}
              onClick={() => setAnchorEl(null)}
              component="a"
              href={`${href}${option}`}
              target="_blank"
              sx={{
                maxWidth: 'auto',
                m: 0.5,
                p: 0.5,
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
                  color={theme.colors.darkGray}
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
            <StyledDivider theme={theme} sx={{ border: `1px solid ${theme.colors.otherGray}`, margin: 0 }} />
          </>
        ))}
      </Menu>
    </>
  );
};
