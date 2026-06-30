import { createFileRoute } from '@tanstack/react-router';
import PerfilUser from '../pages/PerfilUser';

export const Route = createFileRoute('/perfil-user')({
  component: PerfilUser,
});