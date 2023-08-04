import { Box, Paper } from '@mui/material'

export default function Footer({ height }: { height: string }) {
  return (
    <>
      <Paper>
        <Box
          component="footer"
          position="relative"
          sx={{
            height: height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Follow us on social media
        </Box>
      </Paper>
    </>
  )
}
