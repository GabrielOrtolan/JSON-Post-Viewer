import AppRoutes from './routes';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/material';
import Footer from './components/Footer'; // Importando o Footer que criamos

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Garante que o layout ocupe a altura toda da tela
    }}>
      <CssBaseline />
      
      {/* Conteúdo principal da página */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppRoutes />
      </Box>

      {/* Nosso novo rodapé */}
      <Footer />
    </Box>
  );
}

export default App;