import { Box, Slide, Tab, Tabs, useMediaQuery } from '@mui/material';
import { Itinerary } from '../../../../models/Itinerary';
import { useRef, useState } from 'react';
import { ItineraryDetail } from '../itinerary-detail';
import { ItineraryExtra } from '../itinerary-extra';

interface ItinerariesProps {
  itineraries: Itinerary[];
}

// Calculo de la altura del contenedor cuando el Tabs es vertical (n cantidad de itinerarios)
// n = pixeles:  2 = 100px , 3 = 150px y para mas itinerarios se usa 175px
export const Itineraries = ({ itineraries }: ItinerariesProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeItinerary, setActiveItinerary] = useState(0);
  const matches = useMediaQuery('(max-width:900px)');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveItinerary(newValue);
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { xs: '300px', md: itineraries.length > 2 ? 175 : 150 },
          borderRadius: 3,
          overflow: 'hidden',
        }}
        ref={containerRef}
      >
        <Tabs
          orientation={matches ? 'horizontal' : 'vertical'}
          variant="scrollable"
          // scrollButtons="auto"
          allowScrollButtonsMobile
          value={activeItinerary}
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
                  width: 300,
                }
          }
        >
          {itineraries.map((itinerary, key) => (
            <Tab label={itinerary.title} {...a11yProps(key)} key={key} />
          ))}
        </Tabs>

        {/* Agrege un div extra para que el componente Slide pueda tener la animacion correcta */}
        <div style={{ height: '100%', width: '100%' }}>
          {itineraries.map((itinerary, currentItinerary) => (
            <Slide
              key={currentItinerary}
              direction={matches ? 'up' : 'left'}
              in={activeItinerary === currentItinerary}
              mountOnEnter
              unmountOnExit
              timeout={{ enter: 500, exit: 250 }}
            >
              {/* Slide requiere que el componente hijo tenga la propiedad ref */}
              <div style={{ height: '100%', width: '100%' }}>
                <ItineraryDetail {...itinerary} />
              </div>
            </Slide>
          ))}
        </div>
      </Box>
      <ItineraryExtra />
    </>
  );
};

// interface TabPanelProps {
//   children: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       style={{ width: '100%', height: 'inherit' }}
//       {...other}
//     >
//       {value === index && children}
//     </div>
//   );
// }

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
