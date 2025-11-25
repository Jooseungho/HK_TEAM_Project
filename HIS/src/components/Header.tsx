import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogOut, User, Activity } from 'lucide-react';
import { Badge } from './ui/badge';

interface HeaderProps {
  title?: string;
}

export function Header({ title = '병원 정보 시스템' }: HeaderProps) {
  const { user, logout } = useAuth();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      'Admin': 'bg-purple-600',
      'Doctor': 'bg-blue-600',
      'Nurse': 'bg-green-600',
      'Receptionist': 'bg-yellow-600',
      'Pharmacist': 'bg-pink-600',
      'Lab Technician': 'bg-orange-600'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-600';
  };

  const getRoleInKorean = (role: string) => {
    const translations = {
      'Admin': '관리자',
      'Doctor': '의사',
      'Nurse': '간호사',
      'Receptionist': '접수원',
      'Pharmacist': '약사',
      'Lab Technician': '검사실 기사'
    };
    return translations[role as keyof typeof translations] || role;
  };

  if (!user) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1>{title}</h1>
            {user.department && (
              <p className="text-sm text-gray-500">{user.department}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 hover:bg-gray-100">
                <div className="text-right">
                  <p className="text-sm">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">{getRoleInKorean(user.role)}</p>
                </div>
                <Avatar>
                  <AvatarFallback className={`${getRoleBadgeColor(user.role)} text-white`}>
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-2">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar>
                    <AvatarFallback className={`${getRoleBadgeColor(user.role)} text-white`}>
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                  {getRoleInKorean(user.role)}
                </Badge>
                {user.department && (
                  <Badge variant="outline" className="ml-2">
                    {user.department}
                  </Badge>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>프로필 설정</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>로그아웃</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}