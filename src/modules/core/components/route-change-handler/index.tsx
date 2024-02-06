import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks';
import { useEffect, useState } from 'react';

const RouteChangeHandler = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    if (
      previousLocation.pathname === '/home' &&
      location.pathname !== '/home'
    ) {
      dispatch({ type: 'RECORD_CURRENT_SLIDE' }); // Reducer en el store de Cities
    }
    setPreviousLocation(location);
  }, [location, previousLocation]);
  return <></>;
};

export default RouteChangeHandler;
