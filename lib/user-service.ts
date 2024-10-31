'use client';

// Simulated user data - replace with actual backend integration
const USERS_STORAGE_KEY = 'users_data';

const defaultUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    joinedAt: '2024-01-15',
    lastActive: '2024-03-10',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    joinedAt: '2024-02-01',
    lastActive: '2024-03-09',
  },
];

class UserService {
  private users: any[];

  constructor() {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      this.users = storedUsers ? JSON.parse(storedUsers) : defaultUsers;
      if (!storedUsers) {
        this.saveUsers();
      }
    } else {
      this.users = defaultUsers;
    }
  }

  private saveUsers() {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));
  }

  async getAllUsers() {
    return this.users;
  }

  async updateUserStatus(userId: string, newStatus: string) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex].status = newStatus;
      this.saveUsers();
    }
  }

  async addUser(userData: any) {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };
    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }
}

export const userService = new UserService();