// Static data store for client-side auth
const STORAGE_PREFIX = 'ai_stokvel_';
const USER_SESSION_KEY = `${STORAGE_PREFIX}user_session`;
const USERS_STORAGE_KEY = `${STORAGE_PREFIX}users_data`;

// Master admin credentials
const MASTER_CREDENTIALS = [
  {
    username: 'admin',
    email: 'admin@aistokvel.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    username: 'Thabang',
    email: 'thabang@aistokvel.com',
    password: 'Thabang123',
    role: 'admin',
    name: 'Thabang Admin'
  }
];

// South African Banks
export const BANKS = [
  { id: 'fnb', name: 'First National Bank (FNB)' },
  { id: 'standard', name: 'Standard Bank' },
  { id: 'absa', name: 'ABSA' },
  { id: 'nedbank', name: 'Nedbank' },
  { id: 'capitec', name: 'Capitec Bank' },
];

class AdminAuth {
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && !this.isInitialized) {
      this.initializeStorage();
      this.isInitialized = true;
    }
  }

  private initializeStorage() {
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
    }
  }

  async login(identifier: string, password: string): Promise<boolean> {
    // Simulate network delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check admin credentials first
    const adminUser = MASTER_CREDENTIALS.find(
      cred => 
        (cred.username.toLowerCase() === identifier.toLowerCase() ||
         cred.email.toLowerCase() === identifier.toLowerCase()) &&
        cred.password === password
    );

    if (adminUser) {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify({
        ...adminUser,
        lastLogin: new Date().toISOString()
      }));
      return true;
    }

    // Check regular users
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const user = users.find((u: any) => 
      (u.username.toLowerCase() === identifier.toLowerCase() ||
       u.email.toLowerCase() === identifier.toLowerCase()) &&
      u.password === password
    );

    if (user) {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify({
        ...user,
        lastLogin: new Date().toISOString()
      }));
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem(USER_SESSION_KEY);
  }

  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    
    const session = localStorage.getItem(USER_SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  checkAuth(): boolean {
    return Boolean(this.getCurrentUser());
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isUsernameTaken(username: string): boolean {
    if (typeof window === 'undefined') return false;

    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    return users.some((u: any) => u.username.toLowerCase() === username.toLowerCase());
  }

  isEmailTaken(email: string): boolean {
    if (typeof window === 'undefined') return false;

    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    return users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
  }

  registerUser(userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    bank: string;
    accountNumber: string;
  }): boolean {
    if (this.isUsernameTaken(userData.username) || this.isEmailTaken(userData.email)) {
      return false;
    }

    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const newUser = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      status: 'active',
      role: 'user',
      balance: 0,
      investments: [],
      transactions: []
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return true;
  }
}

export const adminAuth = new AdminAuth();