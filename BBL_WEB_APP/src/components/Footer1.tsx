import { Box } from '@mui/material';

const footerStyles = {
  left: 0,
  bottom: 0,
  width: '100%',
  height: '250px',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function Footer() {
  return (
    <Box sx={footerStyles}>
      Bir Takım Footer Elemenları
    </Box>
  );
}
