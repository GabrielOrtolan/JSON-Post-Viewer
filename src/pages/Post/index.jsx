import { useEffect, useState } from 'react';
import { getPosts } from '../../api/services';
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Alert,
  Box,
  Pagination,
  Stack
} from '@mui/material';
import PostCard from '../../components/PostCard';
import useDocumentTitle from '../../hooks/useDocumentTitle'; // 1. Importa o hook

function PostPage() {
  useDocumentTitle('JSON Post Viewer'); // 2. Usa o hook para definir o título

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  
// ...
// Hook de efeito para buscar os posts da API assim que a página carrega.
// O array vazio no final `[]` garante que a busca aconteça apenas uma vez.
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
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(posts.length / postsPerPage);

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
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        JSON Post Viewer
      </Typography>

      <Grid container spacing={4}>
        {currentPosts.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <PostCard post={post} onClick={() => handleCardClick(post.id)} />
          </Grid>
        ))}
      </Grid>
      
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