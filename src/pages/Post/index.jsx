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
import PostCard from '../../components/PostCard';
import { useNavigate } from 'react-router-dom';

function PostPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    navigate(`/dados/${postId}`);
  };

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
        {/* Agora o .map usa a lista completa de 'posts' diretamente */}
        {posts.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <PostCard post={post} onClick={() => handleCardClick(post.id)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PostPage;