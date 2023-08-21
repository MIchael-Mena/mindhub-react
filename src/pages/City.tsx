import { useParams } from 'react-router-dom';

const City = () => {
  const { id } = useParams();

  return (
    <>
      <h1>City</h1>
      <p>City id: {id}</p>
    </>
  );
};

export default City;
