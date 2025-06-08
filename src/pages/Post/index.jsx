import { useEffect, useState } from 'react';
import { getPosts } from '../../api/services';
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Alert,
  Box
} from '@mui/material';
import PostCard from '../../components/PostCard'; // O caminho para o nosso Card

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função que será chamada quando um card for clicado
  const handleCardClick = (postId) => {
    // Nosso teste para ver se o clique está sendo ouvido
    console.log('O clique funcionou! Navegando para os detalhes do post ID:', postId);
    
    // Ação para abrir a nova aba
    window.open(`/dados/${postId}`, '_blank');
  };

  useEffect(() => {
    getPosts()
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        setError('Falha ao carregar os posts.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Posts
      </Typography>
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            {/* AQUI ESTÁ A CORREÇÃO FINAL:
              Estamos passando a função 'handleCardClick' para a propriedade 'onClick' do PostCard.
            */}
            <PostCard post={post} onClick={() => handleCardClick(post.id)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PostPage;