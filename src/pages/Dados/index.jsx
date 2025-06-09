import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getUserById } from '../../api/services';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import useDocumentTitle from '../../hooks/useDocumentTitle'; // 1. Importa o hook

function DetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Usa o hook para definir um título dinâmico
  useDocumentTitle(loading ? 'Carregando...' : (post ? post.title : 'Post não encontrado'));

  useEffect(() => {
    if (id) {
      setLoading(true);
      getPostById(id)
        .then(postResponse => {
          const fetchedPost = postResponse.data;
          setPost(fetchedPost);
          return getUserById(fetchedPost.userId);
        })
        .then(userResponse => {
          setAuthor(userResponse.data);
        })
        .catch(err => {
          console.error("Erro ao buscar dados:", err);
          setError("Não foi possível carregar os dados.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

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
      {post && (
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {post.body}
            </Typography>
          </CardContent>
        </Card>
      )}

      {author && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Informações do Autor
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Nome:</strong> {author.name}</Typography>
                <Typography><strong>Usuário:</strong> @{author.username}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Email:</strong> {author.email}</Typography>
                <Typography><strong>Website:</strong> {author.website}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><strong>Empresa:</strong> {author.company.name}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default DetailsPage;