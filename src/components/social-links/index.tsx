import { Box, Link } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

const SocialLinks = () => {
  return (
    <Box display={'flex'} gap={3}>
      <Link href="#" className="me-4 text-reset" color={'primary'}>
        <FacebookIcon />
      </Link>
      <Link href="#" className="me-4 text-reset" color={'primary'}>
        <TwitterIcon />
      </Link>
      <Link href="#" className="me-4 text-reset" color={'primary'}>
        <InstagramIcon />
      </Link>
    </Box>
  )
}

export default SocialLinks
