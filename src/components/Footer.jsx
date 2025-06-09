import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto', // Empurra o footer para o final
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://github.com/GabrielOrtolan/prova">
            JSON Post Viewer
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
          Desenvolvido por Gabriel Ortolan.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;