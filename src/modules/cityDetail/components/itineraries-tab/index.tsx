import { Slide, Tab, Tabs, useMediaQuery } from '@mui/material';
import { ItineraryDetail } from '../itinerary-detail';
import { Itinerary } from '../../../../models/Itinerary';

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

  const handleChange = (args: any[]) => {
    const [_event, newValue] = args;
    setActiveItinerary(newValue);
  };

  let lastExecution = Date.now();
  const throttledHandleChange = (...args: any[]) => {
    if (Date.now() - lastExecution >= animationDuration) {
      handleChange(args);
      // No es neceseario actualizar lastExecution ya que handleChange vuelve a renderizar el componente
      // y lastExecution se vuelve a inicializar en Date.now()
      // lastExecution = Date.now();
    }
  };

  return (
    <>
      <Tabs
        orientation={matches ? 'horizontal' : 'vertical'}
        variant="scrollable"
        // scrollButtons="auto"
        allowScrollButtonsMobile
        value={activeItinerary}
        onChange={throttledHandleChange}
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
