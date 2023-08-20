import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
// import { Place } from '@mui/icons-material'
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone'
import { City } from '../../models/City'

interface CardCityProps {
  city: City
}

const CardCity = ({ city }: CardCityProps) => {
  return (
    <>
      <Card
        elevation={1}
        sx={{
          maxWidth: 300,
          borderRadius: '15px',
          boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.3)',
          ':hover': {
            boxShadow: (theme) => '0 0 3px 1px ' + theme.palette.success.main,
          },
          transition: 'box-shadow 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          height="140"
          sx={{ border: '1px solid #ccc', borderRadius: '15px 15px 0 0' }}
          image={city.images[0]}
          alt={city.name}
        />

        <CardContent sx={{ pb: 0 }}>
          <Paper
            variant="outlined"
            sx={{
              width: 'auto',
              display: 'inline-flex',
              px: 2,
              borderRadius: 15,
              mb: 1,
            }}
          >
            <Typography variant="h6" color={'primary'}>
              <strong>{city.country}</strong>
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <IconButton
              size="small"
              aria-label="link to info"
              sx={{ p: 0, mr: 1 }}
            >
              <PlaceTwoToneIcon />
            </IconButton>
            <Typography variant="h6" color={'secondary'}>
              {city.name}
            </Typography>
          </Paper>
          <Typography variant="body2" color="textSecondary">
            {city.description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing sx={{ justifyContent: 'end', mt: 'auto' }}>
          <Button variant="outlined" color="success">
            Explore
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default CardCity
