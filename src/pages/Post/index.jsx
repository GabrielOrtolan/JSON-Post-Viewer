import { useEffect, useState } from 'react';
import { getPosts } from '../../api/services';
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Alert,
} from '@mui/material';
import PostCard from '../../components/PostCard';

function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (err) {
        setError('Falha ao carregar os posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom align="center" style={{ margin: '20px 0' }}>
        Posts
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Post;