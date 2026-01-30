'use server';

import { getCurrentUser, User } from '@/lib/auth';

export async function checkAuthAction(): Promise<{
  isAuthenticated: boolean;
  user: User | null;
}> {
  const user = await getCurrentUser();
  if (user) {
    return { isAuthenticated: true, user };
  }
  return { isAuthenticated: false, user: null };
}
