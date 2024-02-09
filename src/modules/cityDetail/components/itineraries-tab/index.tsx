import { Slide, Tab, Tabs, useMediaQuery } from '@mui/material';
import { ItineraryDetail } from '../itinerary-detail';
import { Itinerary } from '../../../../models/Itinerary';
import useThrottledCallback from '../../../../hooks/useThrottledCallback';

interface ItinerariesTabProps {
  itineraries: Itinerary[];
  animationDuration?: number;
  activeItinerary: number;
  setActiveItinerary: (value: number) => void;
}

export const ItinerariesTab = ({
  itineraries,
  activeItinerary,
  setActiveItinerary,
  animationDuration = 500,
}: ItinerariesTabProps) => {
  const matches = useMediaQuery('(max-width:900px)');

  // TODO: el tiempo que se le pasa a useThrottledCallback deberia ser el doble del tiempo de la animacion
  // si el itinerario extra se encuentra expandido, en caso contrario deberia ser igual al tiempo de la animacion
  // que es el tiempo de animacion para cambiar de tab
  const throttledHandleChange = useThrottledCallback(animationDuration);

  return (
    <>
      <Tabs
        orientation={matches ? 'horizontal' : 'vertical'}
        variant="scrollable"
        // scrollButtons="auto"
        allowScrollButtonsMobile
        value={activeItinerary}
        onChange={(_event, newValue: number) =>
          throttledHandleChange(() => setActiveItinerary(newValue))
        }
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
            timeout={{
              enter: animationDuration,
              exit: animationDuration / 2,
            }}
          >
            {/* Slide requiere que el componente hijo tenga la propiedad ref */}
            <div style={{ height: '100%', width: '100%' }}>
              <ItineraryDetail {...itinerary} />
            </div>
          </Slide>
        ))}
      </div>
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
