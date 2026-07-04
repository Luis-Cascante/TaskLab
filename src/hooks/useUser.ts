import { useState, useEffect } from 'react';
import type { UserDBAnwer } from '../types/user';
import { userService } from '../../src/services/users';
import axios from "axios";


interface UseUserResult {
  user: UserDBAnwer | null;
  loading: boolean;
  error: string | null;
}

export function useUser(userId: string | null): UseUserResult {
  const [userDetails, setUserDetails] = useState<UserDBAnwer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setUserDetails(null);
      setLoading(false);
      setError(null);
      return;
    }


    async function fetchUserDetails() {
      setLoading(true);
      setError(null);

      try {
        const data = await userService.getUser(
          userId,
        );
        setUserDetails(data);
      } catch (err) {
        console.error(err);
        if (axios.isCancel(err)) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred"
        );

        setUserDetails(null);
      }
      finally {
        setLoading(false);
      }
    }

    fetchUserDetails();

  }, [userId]);

  return { user: userDetails, loading, error };
}