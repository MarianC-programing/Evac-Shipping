import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/lib/auth';
import { insertUserSchema, loginSchema, type InsertUser, type LoginData } from '@shared/schema';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [showRegister, setShowRegister] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      plan: 'basic',
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await apiRequest('POST', '/api/auth/login', data);
      return response.json();
    },
    onSuccess: (data) => {
      login(data.user);
      toast({
        title: '¡Sesión iniciada!',
        description: data.message,
      });
      console.log('Notificación simulada: Se envió correo de confirmación de login a:', data.user.email);
      setTimeout(() => {
        setLocation('/tracking');
      }, 1500);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Error al iniciar sesión',
        variant: 'destructive',
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: InsertUser) => {
      const response = await apiRequest('POST', '/api/auth/register', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Cuenta creada',
        description: data.message,
      });
      console.log('Notificación simulada: Se envió correo de confirmación de registro');
      setTimeout(() => {
        setShowRegister(false);
        registerForm.reset();
      }, 2000);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Error al crear cuenta',
        variant: 'destructive',
      });
    },
  });

  const onLoginSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: InsertUser) => {
    registerMutation.mutate(data);
  };

  if (showRegister) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md w-full mx-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Crear Cuenta</h2>
                <p className="text-gray-600 mt-2">Regístrate para obtener tu casillero personal</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      {...registerForm.register('firstName')}
                      placeholder="Juan"
                    />
                    {registerForm.formState.errors.firstName && (
                      <p className="text-sm text-destructive mt-1">
                        {registerForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      {...registerForm.register('lastName')}
                      placeholder="Pérez"
                    />
                    {registerForm.formState.errors.lastName && (
                      <p className="text-sm text-destructive mt-1">
                        {registerForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerForm.register('email')}
                    placeholder="juan@email.com"
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...registerForm.register('phone')}
                    placeholder="+507 6789-1234"
                  />
                  {registerForm.formState.errors.phone && (
                    <p className="text-sm text-destructive mt-1">
                      {registerForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    {...registerForm.register('password')}
                    placeholder="••••••••"
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...registerForm.register('confirmPassword')}
                    placeholder="••••••••"
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">
                      {registerForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    Acepto los términos y condiciones
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={() => setShowRegister(false)}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Inicia sesión aquí
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="max-w-md w-full mx-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
              <p className="text-gray-600 mt-2">Accede a tu cuenta para rastrear tus paquetes</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...loginForm.register('email')}
                  placeholder="tu@email.com"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  {...loginForm.register('password')}
                  placeholder="••••••••"
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">
                    Recordarme
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿No tienes cuenta?{' '}
                <button
                  onClick={() => setShowRegister(true)}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
