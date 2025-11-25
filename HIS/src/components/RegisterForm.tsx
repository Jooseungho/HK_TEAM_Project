import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { UserPlus, AlertCircle, X } from 'lucide-react';
import { User } from '../types';

interface RegisterFormProps {
  onBackToLogin: () => void;
}

export function RegisterForm({ onBackToLogin }: RegisterFormProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as User['role'] | '',
    department: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.role) {
      setError('역할을 선택해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      const registerSuccess = await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.role as User['role'],
        formData.department || undefined
      );
      
      if (registerSuccess) {
        setSuccess(true);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
          department: ''
        });
        // Close modal after short delay
        setTimeout(() => {
          onBackToLogin();
        }, 1500);
      } else {
        setError('이미 존재하는 이메일입니다.');
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
      <CardHeader className="space-y-1 relative">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-8 w-8 p-0"
          onClick={onBackToLogin}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-center">계정 만들기</CardTitle>
        <CardDescription className="text-center">
          새로운 계정을 만들어 시스템에 접속하세요
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                회원가입이 완료되었습니다! 자동으로 로그인됩니다.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">성</Label>
              <Input
                id="firstName"
                placeholder="홍"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">이름</Label>
              <Input
                id="lastName"
                placeholder="길동"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@hospital.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">역할</Label>
            <Select 
              value={formData.role} 
              onValueChange={(value) => setFormData({ ...formData, role: value as User['role'] })}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="역할을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">관리자</SelectItem>
                <SelectItem value="Doctor">의사</SelectItem>
                <SelectItem value="Nurse">간호사</SelectItem>
                <SelectItem value="Receptionist">접수원</SelectItem>
                <SelectItem value="Pharmacist">약사</SelectItem>
                <SelectItem value="Lab Technician">검사실 기사</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">부서 (선택)</Label>
            <Input
              id="department"
              placeholder="예: 내과, 외과"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="최소 6자 이상"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          <Button type="submit" className="w-full" disabled={isLoading || success}>
            {isLoading ? '가입 중...' : success ? '가입 완료!' : '회원가입'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onBackToLogin}
            disabled={isLoading}
          >
            이미 계정이 있으신가요? 로그인
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}