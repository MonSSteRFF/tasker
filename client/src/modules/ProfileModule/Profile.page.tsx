import React, { useEffect } from 'react';

import useProfileStore from '@/modules/ProfileModule/useProfileStore';

const ProfilePage = () => {
  const username = useProfileStore((state) => state.username);
  const email = useProfileStore((state) => state.email);
  const loadProfile = useProfileStore((state) => state.loadProfile);

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <main className="container">
      <h1>Profile page</h1>

      <ul>
        <li>username: {username}</li>
        <li>email: {email}</li>
      </ul>
    </main>
  );
};

export default ProfilePage;
