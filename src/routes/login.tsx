import { createFileRoute, redirect } from '@tanstack/react-router'
import Login from '../pages/Login';
import { tokenStorage } from '../utils/token';

export const Route = createFileRoute('/login')({
   beforeLoad: () => {
    const token = tokenStorage.getToken();
    if (token) {
      throw redirect({ to: '/perfil-user/$userId' });
    }
  },
  component: Login,
})

