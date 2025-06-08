import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// CORREÇÃO: Importando dos diretórios corretos que existem no seu projeto.
// O JavaScript entende que ao apontar para a pasta, ele deve procurar o arquivo "index.jsx"
import PostPage from '../pages/Post'; 
import DetailsPage from '../pages/Dados';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/post" replace /> },
  { 
    path: '/post', 
    element: <PostPage /> 
  },
  { 
    path: '/dados/:id', 
    element: <DetailsPage />
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;