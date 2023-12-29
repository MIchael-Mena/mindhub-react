import {
  AccessTimeTwoTone,
  LabelImportantTwoTone,
  LanguageTwoTone,
  MonetizationOnTwoTone,
  // LabelTwoTone,
  // LuggageOutlined,
} from '@mui/icons-material';
import { Chip, Grid, Paper, Stack } from '@mui/material';
import { CityBasic } from '../../models/CityBasic';

export const CityAttributes = ({
  bestTime,
  currency,
  language,
  timezone,
}: CityBasic) => {
  const informationAttributes = [
    {
      icon: <LabelImportantTwoTone color="secondary" />,
      label: `Best time to visit: ${bestTime}`,
    },
    {
      icon: <MonetizationOnTwoTone color="secondary" />,
      label: `Currency: ${currency}`,
    },
    {
      icon: <LanguageTwoTone color="secondary" />,
      label: `Language: ${language}`,
    },
    {
      icon: <AccessTimeTwoTone color="secondary" />,
      label: `Timezone: ${timezone}`,
    },
  ];

  return (
    <Grid item xs={12}>
      <hr />
      <Paper
        elevation={0}
        sx={{ p: 2, my: 4, borderRadius: 3 }}
        variant="outlined"
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          useFlexGap
          spacing={2}
          justifyContent={'space-around'}
          sx={{ mt: 1, mb: 1 }}
        >
          {informationAttributes.map((attribute, index) => (
            <Chip
              key={index}
              variant="filled"
              color="secondary"
              icon={attribute.icon}
              sx={{
                transition: 'all 0.3s ease-in-out',
                ':hover': {
                  backgroundColor: (theme) => theme.palette.success.main,
                  boxShadow: 2,
                  transform: 'scale(1.05)',
                },
              }}
              label={attribute.label}
            />
          ))}
        </Stack>
      </Paper>
      <hr />
    </Grid>
  );
};
