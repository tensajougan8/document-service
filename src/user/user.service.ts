// src/user/user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { username: 'admin', roles: ['admin'] },
    { username: 'editor', roles: ['editor'] },
    { username: 'viewer', roles: ['viewer'] },
  ];

  // Fetch all users (for the admin to manage)
  getAllUsers() {
    return this.users;
  }

  // Update user role
  updateUserRole(username: string, newRole: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      throw new Error('User not found');
    }

    // Validate the new role
    if (!['admin', 'editor', 'viewer'].includes(newRole)) {
      throw new Error('Invalid role');
    }

    user.roles = [newRole]; // Update role to new role
    return user;
  }
}
