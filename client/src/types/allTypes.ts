interface i_user {
  id: string;
  username: string;
  email: string;
}

interface i_permission {
  inviteUsers: boolean;
}

interface userPermission {
  user: i_user;
  permission: i_permission;
}

interface i_userGroup {
  groupId: string;
  info: {
    title: string;
    description: string;
  };
  members: userPermission[];
}

export type {};
