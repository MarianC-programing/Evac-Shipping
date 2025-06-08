import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Weight, 
  Clock, 
  MapPin, 
  Phone, 
  Package, 
  Shield,
  Infinity,
  Truck,
  Headphones,
  Building,
  Rocket,
  UserRoundCheck,
  FileText,
  TrendingUp,
  Handshake,
  Camera,
  PackageOpen,
  Videotape
} from 'lucide-react';

export default function PlansPage() {
  const plans = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: '$2.99',
      unit: '/lb',
      description: 'Perfecto para usuarios ocasionales',
      features: [
        { icon: Weight, text: 'Hasta 50 lbs por envío' },
        { icon: Clock, text: '7-10 días hábiles' },
        { icon: MapPin, text: 'Rastreo básico' },
        { icon: Phone, text: 'Soporte por email' },
        { icon: Package, text: 'Consolidación gratuita' }
      ],
      highlighted: false
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: '$3.99',
      unit: '/lb',
      description: 'Ideal para usuarios frecuentes',
      features: [
        { icon: Infinity, text: 'Peso ilimitado' },
        { icon: Truck, text: '5-7 días hábiles' },
        { icon: MapPin, text: 'Rastreo en tiempo real' },
        { icon: Headphones, text: 'Soporte 24/7' },
        { icon: Shield, text: 'Seguro hasta $1000' },
        { icon: Package, text: 'Re-empaque gratuito' }
      ],
      highlighted: true
    },
    {
      id: 'business',
      name: 'Plan Empresa',
      price: '$4.99',
      unit: '/lb',
      description: 'Para necesidades comerciales',
      features: [
        { icon: Building, text: 'Volúmenes altos' },
        { icon: Rocket, text: '3-5 días hábiles' },
        { icon: UserRoundCheck, text: 'Gerente dedicado' },
        { icon: FileText, text: 'Facturación mensual' },
        { icon: TrendingUp, text: 'Reportes detallados' },
        { icon: Handshake, text: 'Tarifas personalizadas' }
      ],
      highlighted: false
    }
  ];

  const additionalServices = [
    {
      icon: Camera,
      title: 'Fotos del Paquete',
      price: '$2.00 por foto'
    },
    {
      icon: PackageOpen,
      title: 'Inspección de Contenido',
      price: '$5.00 por paquete'
    },
    {
      icon: Videotape,
      title: 'Re-empaque Premium',
      price: '$8.00 por paquete'
    },
    {
      icon: Truck,
      title: 'Entrega a Domicilio',
      price: 'Desde $15.00'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Planes de Envío Detallados
            </h1>
            <p className="text-lg text-gray-600">
              Compara nuestros planes y elige el que mejor se adapte a tus necesidades
            </p>
          </div>

          {/* Detailed Plan Comparison */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`plan-card ${plan.highlighted ? 'featured' : ''} relative`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent hover:bg-accent/90">
                      Recomendado
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-5xl font-bold text-primary mb-2">
                      {plan.price}
                      <span className="text-lg text-gray-500">{plan.unit}</span>
                    </p>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <feature.icon className={`h-5 w-5 mr-3 ${
                          plan.highlighted ? 'text-accent' : 'text-primary'
                        }`} />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className={`w-full ${
                      plan.highlighted 
                        ? 'bg-accent hover:bg-accent/90' 
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    {plan.id === 'business' ? 'Contactar Ventas' : 'Seleccionar Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">
                Servicios Adicionales
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {additionalServices.map((service, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">{service.title}</h4>
                    <p className="text-sm text-gray-600">{service.price}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
