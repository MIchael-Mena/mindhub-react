import { Box, Fab, Tab, Tabs, useMediaQuery } from '@mui/material';
import { Itinerary } from '../../models/Itinerary';
import { useState } from 'react';
import { ItineraryDetail } from '../itinerary';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

interface ItinerariesProps {
  itineraries: Itinerary[];
}

// Calculo de la altura del contenedor cuando el Tabs es vertical (n cantidad de itinerarios)
// n = pixeles:  2 = 100px , 3 = 150px y para mas itinerarios se usa 175px
export const Itineraries = ({ itineraries }: ItinerariesProps) => {
  const [value, setValue] = useState(0);
  const matches = useMediaQuery('(max-width:900px)');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { xs: 'auto', md: itineraries.length > 2 ? 175 : 150 },
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Tabs
          orientation={matches ? 'horizontal' : 'vertical'}
          variant="scrollable"
          // scrollButtons="auto"
          allowScrollButtonsMobile
          value={value}
          onChange={handleChange}
          aria-label="Itineraries"
          sx={
            matches
              ? {
                  borderBottom: 1,
                  borderColor: 'divider',
                  mx: 'auto',
                }
              : {
                  borderRight: 1,
                  borderColor: 'divider',
                  my: itineraries.length <= 2 ? 'auto' : 0,
                }
          }
        >
          {itineraries.map((itinerary, key) => (
            <Tab label={itinerary.title} {...a11yProps(key)} key={key} />
          ))}
        </Tabs>

        {itineraries.map((itinerary, key) => (
          <TabPanel value={value} index={key} key={key}>
            <ItineraryDetail {...itinerary} />
          </TabPanel>
        ))}

        <Fab
          color="primary"
          variant="extended"
          sx={{
            mx: 'auto',
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            transition: 'opacity 0.4s ease-in-out',
          }}
          size="small"
        >
          <ExpandCircleDownIcon fontSize="medium" />
          View more
        </Fab>
      </Box>
    </>
  );
};

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%', height: 'inherit' }}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
