import { Box, Link } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

const SocialLinks = () => {
  return (
    <Box display={'flex'} gap={4}>
      <Link href="#" color={'primary'}>
        <FacebookIcon />
      </Link>
      <Link href="#" color={'primary'}>
        <TwitterIcon />
      </Link>
      <Link href="#" color={'primary'}>
        <InstagramIcon />
      </Link>
    </Box>
  )
}

export default SocialLinks
