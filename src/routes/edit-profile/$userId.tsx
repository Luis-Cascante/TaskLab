import { createFileRoute } from '@tanstack/react-router';
import EditProfile  from '../../pages/EditProfile';

export const Route = createFileRoute('/edit-profile/$userId')({
  component: EditProfile,
});