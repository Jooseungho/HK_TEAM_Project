import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string, role: User['role'], department?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration (in production, this would use Supabase)
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@hospital.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'Admin',
    department: 'Administration',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'doctor@hospital.com',
    password: 'doctor123',
    firstName: 'John',
    lastName: 'Smith',
    role: 'Doctor',
    department: 'Cardiology',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    email: 'nurse@hospital.com',
    password: 'nurse123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'Nurse',
    department: 'Emergency',
    createdAt: new Date().toISOString()
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication (replace with Supabase in production)
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: User['role'],
    department?: string
  ): Promise<boolean> => {
    // Mock registration (replace with Supabase in production)
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      return false; // User already exists
    }

    const newUser: User & { password: string } = {
      id: String(mockUsers.length + 1),
      email,
      password,
      firstName,
      lastName,
      role,
      department,
      createdAt: new Date().toISOString()
    };

    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
