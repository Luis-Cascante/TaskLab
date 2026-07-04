import { createFileRoute, redirect } from '@tanstack/react-router';
import PerfilUser from '../../pages/PerfilUser';
import { tokenStorage } from '../../utils/token';

export const Route = createFileRoute('/perfil-user/$userId')({
  // beforeLoad: () => {
  //   const token = tokenStorage.getToken();
  //   if (!token) {
  //     throw redirect({ to: '/login' });
  //   }
  // },
  component: PerfilUser,
});