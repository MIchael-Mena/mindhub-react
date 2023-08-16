import { Box, Container, Paper } from '@mui/material'

const Cities = () => {
  // const backgroundImage = 'src/assets/images/cities-bg.png'
  const backgroundImage = 'src/assets/images/cities-bg-alth.png'

  return (
    <>
      <Container
        disableGutters
        maxWidth={'lg'}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '950px', // Ajusta esto según tus necesidades
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <h1>Cities</h1>
          <p>Collection of the most beautiful places and experiences</p>
        </Paper>
      </Container>
      <Box>{/* FINDER */}</Box>
      <Box>{/* CARDS */}</Box>
    </>
  )
}

export default Cities
