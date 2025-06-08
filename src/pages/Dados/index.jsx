import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Importando as duas funções da API
import { getPostById, getUserById } from '../../api/services';
import { Container, Typography, CircularProgress, Alert, Card, CardContent, Box } from '@mui/material';

// Renomeando para um nome mais claro, se preferir
function DetailsPage() { 
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null); // Estado para guardar os dados do autor
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // 1. Primeiro, buscamos o post
      getPostById(id)
        .then(postResponse => {
          setPost(postResponse.data);
          // 2. Assim que temos o post, usamos o postResponse.data.userId para buscar o autor
          return getUserById(postResponse.data.userId); 
        })
        .then(userResponse => {
          // 3. Guardamos os dados do autor
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
      {/* Card do Post */}
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

      {/* Card do Autor (só aparece quando os dados do autor carregam) */}
      {author && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Informações do Autor
            </Typography>
            <Typography><strong>Nome:</strong> {author.name}</Typography>
            <Typography><strong>Email:</strong> {author.email}</Typography>
            <Typography><strong>Website:</strong> {author.website}</Typography>
            <Typography><strong>Empresa:</strong> {author.company.name}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default DetailsPage;