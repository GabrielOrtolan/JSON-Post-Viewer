import { useEffect, useState } from 'react';
import { getPosts } from '../../api/services';
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Alert,
  Box,
  TextField,
  Pagination, // Importante para a paginação
  Stack       // Importante para alinhar a paginação
} from '@mui/material';
import PostCard from '../../components/PostCard';

// Nota: Não estamos importando o PostCardSkeleton aqui, mantendo simples.

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados que controlam a paginação
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12; // 12 posts por página

  useEffect(() => {
    getPosts()
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        setError("Não foi possível carregar os posts.");
        console.error("Erro ao buscar posts: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCardClick = (postId) => {
    window.open(`/dados/${postId}`, '_blank');
  };

  // Lógica para filtrar e depois paginar os resultados
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);

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

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Buscar por título"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: '500px' }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Importante: Volta para a página 1 ao fazer uma nova busca
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Alterado para usar "currentPosts", que são os posts da página atual */}
        {currentPosts.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <PostCard post={post} onClick={() => handleCardClick(post.id)} />
          </Grid>
        ))}
      </Grid>
      
      {/* Componente de paginação adicionado no final */}
      <Stack spacing={2} sx={{ mt: 5, alignItems: 'center' }}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
          size="large"
        />
      </Stack>
    </Container>
  );
}

export default PostPage;