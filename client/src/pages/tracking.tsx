import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { useLocation } from 'wouter';
import { 
  Package, 
  Plane, 
  Truck, 
  HandHeart,
  Check,
  Clock
} from 'lucide-react';
import type { Package as PackageType } from '@shared/schema';

const statusLabels = {
  received_us: 'Recibido en EE.UU.',
  transit: 'En Tránsito',
  arrived: 'Llegó a Panamá',
  ready: 'Listo para Retiro',
  delivered: 'Entregado'
};

const statusColors = {
  received_us: 'bg-blue-100 text-blue-800',
  transit: 'bg-yellow-100 text-yellow-800', 
  arrived: 'bg-purple-100 text-purple-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-gray-100 text-gray-800'
};

export default function TrackingPage() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated || !user) {
    setLocation('/login');
    return null;
  }

  const { data: packages, isLoading } = useQuery<PackageType[]>({
    queryKey: [`/api/packages/user/${user.id}`],
    enabled: !!user?.id,
  });

  const activePackages = packages?.filter(pkg => pkg.status !== 'delivered') || [];
  const deliveredPackages = packages?.filter(pkg => pkg.status === 'delivered') || [];

  const getStepStatus = (packageStatus: string, stepIndex: number) => {
    const statusOrder = ['received_us', 'transit', 'arrived', 'ready'];
    const currentIndex = statusOrder.indexOf(packageStatus);
    
    if (stepIndex <= currentIndex) return 'completed';
    if (stepIndex === currentIndex + 1) return 'current';
    return 'pending';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Pendiente';
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const steps = [
    {
      id: 'received_us',
      title: 'Recibido en tienda de EE.UU.',
      icon: Package,
      getDescription: (pkg: PackageType) => 'Tu paquete llegó a nuestro warehouse en Miami'
    },
    {
      id: 'transit',
      title: 'En tránsito hacia Panamá',
      icon: Plane,
      getDescription: (pkg: PackageType) => `Vuelo estimado - Llegada: ${pkg.estimatedDate ? new Date(pkg.estimatedDate).toLocaleDateString('es-ES') : 'Por confirmar'}`
    },
    {
      id: 'arrived',
      title: 'Llegó a Panamá',
      icon: Truck,
      getDescription: () => 'Procesando en aduana'
    },
    {
      id: 'ready',
      title: 'Disponible para retiro',
      icon: HandHeart,
      getDescription: () => 'Te notificaremos cuando esté listo'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando información de paquetes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Rastreo de Paquetes
            </h1>
            <p className="text-lg text-gray-600">
              Sigue el estado de tus envíos en tiempo real
            </p>
          </div>

          {/* User Info */}
          <Card className="bg-primary/5 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-primary">
                    Cliente desde: {new Date(user.memberSince).toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Tu Casillero:</p>
                  <p className="font-mono text-sm bg-white px-3 py-1 rounded">
                    {user.mailboxId}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Shipments */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Envíos Activos</h2>
            
            {activePackages.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No tienes envíos activos
                  </h3>
                  <p className="text-gray-500">
                    Cuando realices un pedido, aparecerá aquí para que puedas rastrearlo.
                  </p>
                </CardContent>
              </Card>
            ) : (
              activePackages.map((pkg) => (
                <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Paquete {pkg.trackingId}
                        </h3>
                        <p className="text-gray-600">{pkg.description}</p>
                        <p className="text-sm text-gray-500">Peso: {pkg.weight}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={statusColors[pkg.status as keyof typeof statusColors]}>
                          {statusLabels[pkg.status as keyof typeof statusLabels]}
                        </Badge>
                        {pkg.estimatedDate && (
                          <p className="text-sm text-gray-500 mt-1">
                            Est: {new Date(pkg.estimatedDate).toLocaleDateString('es-ES')}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 ml-4"></div>
                      <div 
                        className="absolute left-0 top-0 w-0.5 bg-primary ml-4"
                        style={{ 
                          height: `${(steps.findIndex(s => s.id === pkg.status) + 1) * 25}%` 
                        }}
                      ></div>
                      
                      <div className="space-y-6">
                        {steps.map((step, index) => {
                          const stepStatus = getStepStatus(pkg.status, index);
                          const StepIcon = step.icon;
                          const dateField = `${step.id}Date` as keyof PackageType;
                          const stepDate = pkg[dateField];
                          
                          return (
                            <div key={step.id} className="flex items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                stepStatus === 'completed' ? 'step-completed' : 
                                stepStatus === 'current' ? 'step-current' : 'step-pending'
                              }`}>
                                {stepStatus === 'completed' ? (
                                  <Check className="h-4 w-4" />
                                ) : stepStatus === 'current' ? (
                                  <Clock className="h-4 w-4" />
                                ) : (
                                  <StepIcon className="h-4 w-4" />
                                )}
                              </div>
                              <div className="ml-4">
                                <h4 className={`font-medium ${
                                  stepStatus === 'pending' ? 'text-gray-400' : 'text-gray-900'
                                }`}>
                                  {step.title}
                                </h4>
                                <p className={`text-sm ${
                                  stepStatus === 'pending' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {stepStatus !== 'pending' ? formatDate(stepDate as string) : 'Pendiente'}
                                </p>
                                <p className={`text-sm ${
                                  stepStatus === 'pending' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  {step.getDescription(pkg)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {pkg.status === 'ready' && (
                      <div className="mt-6 pt-4 border-t">
                        <Button className="bg-green-500 hover:bg-green-600">
                          Confirmar Retiro
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}

            {/* Package History */}
            {deliveredPackages.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Historial de Envíos
                </h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Paquete
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fecha
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Peso
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Costo
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {deliveredPackages.map((pkg) => (
                            <tr key={pkg.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {pkg.trackingId}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {pkg.description}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {pkg.deliveredDate ? 
                                  new Date(pkg.deliveredDate).toLocaleDateString('es-ES') : 
                                  'N/A'
                                }
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge className="bg-gray-100 text-gray-800">
                                  Entregado
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {pkg.weight}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {pkg.cost || 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
