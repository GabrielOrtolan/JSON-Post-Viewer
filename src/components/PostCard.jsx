import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

// O componente agora recebe a propriedade "onClick" que veio da página de Posts
function PostCard({ post, onClick }) {
  return (
    <Card sx={{ height: '100%', display: 'flex' }}>
      {/*
        AQUI ESTÁ O SEGREDO:
        O "onClick" é aplicado diretamente na CardActionArea,
        que é a parte clicável do card do Material-UI.
      */}
      <CardActionArea 
        onClick={onClick} 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between' 
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{
            fontWeight: 'bold',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mb: 1, // Adiciona uma margem abaixo do título
          }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
          }}>
            {post.body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostCard;