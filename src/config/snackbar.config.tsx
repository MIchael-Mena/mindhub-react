import { SnackbarProvider } from 'notistack'; // Permite usar hook useSnackbar en cualquier componente
import { closeSnackbar } from 'notistack';
import { IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MaterialDesignContent } from 'notistack';

type SnackbarConfigProps = {
  children: React.ReactNode;
};

export const SnackbarConfig: React.FC<SnackbarConfigProps> = ({ children }) => {
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent': {
      flexWrap: 'nowrap',
      borderRadius: 5,
    },
  }));

  return (
    <>
      <SnackbarProvider
        maxSnack={1}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
          warning: StyledMaterialDesignContent,
          info: StyledMaterialDesignContent,
        }}
        action={(snackbarId) => (
          <>
            <IconButton
              sx={{ display: 'inline-block' }}
              onClick={() => {
                return closeSnackbar(snackbarId);
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        )}
      >
        {children}
      </SnackbarProvider>
      ;
    </>
  );
};
