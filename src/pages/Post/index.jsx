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
  Pagination, // Importa o componente de paginação
  Stack       // Importa o Stack para ajudar a alinhar
} from '@mui/material';
import PostCard from '../../components/PostCard';
import PostCardSkeleton from '../../components/PostCardSkeleton';

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // ---> ESTADOS PARA A PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12; // Define quantos posts queremos por página

  useEffect(() => {
    getPosts()
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        console.error("Erro ao buscar posts: ", err);
        setError("Não foi possível carregar os posts.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCardClick = (postId) => {
    console.log('Navegando para os detalhes do post ID:', postId);
    window.open(`/dados/${postId}`, '_blank');
  };
  
  // ---> LÓGICA PARA FILTRAR E PAGINAR OS POSTS
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);

  // O if de loading agora mostra os esqueletos que criamos
  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Posts
        </Typography>
        <Grid container spacing={4}>
          {Array.from(new Array(6)).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <PostCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
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
            setCurrentPage(1); // Volta para a primeira página ao buscar
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Agora o .map usa os posts da página atual (currentPosts) */}
        {currentPosts.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <PostCard post={post} onClick={() => handleCardClick(post.id)} />
          </Grid>
        ))}
      </Grid>
      
      {/* Adicionamos os botões de paginação no final da página */}
      <Stack spacing={2} sx={{ mt: 5, alignItems: 'center' }}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Stack>
    </Container>
  );
}

export default PostPage;