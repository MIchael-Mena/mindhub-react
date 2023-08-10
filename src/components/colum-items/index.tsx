import { Box, Typography, Link } from '@mui/material'

interface ColumItemsProps {
  title: string
  links: { label: string; url?: string; icon?: string }[]
}

const ColumItems = ({ title, links }: ColumItemsProps) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        {title}
      </Typography>
      {links.map((link, index) => (
        <Typography key={index}>
          <Link href={link.url} color="inherit" className="text-reset">
            {link.label}
          </Link>
        </Typography>
      ))}
    </Box>
  )
}

export default ColumItems
