import { currentUser } from '@/hooks/server-auth-utils'

export async function checkAccess() {
  const user = await currentUser();

  if (!user) {
    return {
      allowed: false,
      reason: "Please login",
    };
  }

  return {
    allowed: true,
    user,
  };
}
