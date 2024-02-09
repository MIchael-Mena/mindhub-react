import { Box, Typography, Link, Icon } from '@mui/material';

interface ColumItemsProps {
  title: string;
  links: { label: string; url?: string; icon?: React.ReactNode }[];
}

const ColumItems = ({ title, links }: ColumItemsProps) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        {title}
      </Typography>
      {links.map((link, index) => (
        <Typography key={index}>
          {link.icon && <Icon sx={{ mr: 1 }}>{link.icon}</Icon>}
          <Link href={link.url}>{link.label}</Link>
        </Typography>
      ))}
    </Box>
  );
};

export default ColumItems;
