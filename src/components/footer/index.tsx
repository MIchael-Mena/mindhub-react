import { Box } from '@mui/material'

export default function Footer({ height }: { height: string }) {
  return (
    <>
      <Box
        component="footer"
        position="relative"
        sx={{ textAlign: 'center', height: height }}
      >
        Follow us on social media
      </Box>
    </>
  )
}
