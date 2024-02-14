import {
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
  alpha,
  styled,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { useState } from 'react';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

interface SortButtonProps {
  currentSortIndex: number;
  sortsAvailable: string[];
  onSortSelected: (sortIndex: number) => void;
}

export const SortButton = ({
  currentSortIndex,
  sortsAvailable,
  onSortSelected,
}: SortButtonProps) => {
  const currentSort = sortsAvailable[currentSortIndex];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSort = (sortIndex: number) => {
    setAnchorEl(null);
    onSortSelected(sortIndex);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        startIcon={<SortIcon />}
      >
        {currentSort || 'Sort'}
      </Button>
      <StyledMenu
        id="sort-menu-comments"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sortsAvailable.map((sort, index) => (
          <div key={sort}>
            <MenuItem onClick={() => handleSort(index)} sx={{ py: 1 }}>
              {currentSort === sort && <ChevronRightRoundedIcon />}
              <Typography
                variant="button"
                sx={{ textTransform: 'none' }}
                color={currentSort === sort ? 'primary.main' : 'inherit'}
              >
                {sort}
              </Typography>
            </MenuItem>
            {index < sortsAvailable.length - 1 && (
              <Divider
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.getContrastText(
                      theme.palette.background.default
                    ),
                  '&.MuiDivider-root': {
                    margin: 0,
                  },
                }}
              />
            )}
          </div>
        ))}
      </StyledMenu>
    </>
  );
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 5,
    border: '1px solid',
    marginTop: theme.spacing(1),
    minWidth: 150,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        // fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
