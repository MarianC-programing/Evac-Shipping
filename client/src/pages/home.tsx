import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Truck, 
  Shield, 
  Clock, 
  MapPin, 
  Star,
  Check
} from 'lucide-react';

export default function HomePage() {
  const plans = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: '$2.99',
      unit: '/lb',
      description: 'Perfecto para usuarios ocasionales',
      features: [
        'Hasta 50 lbs por envío',
        '7-10 días hábiles',
        'Rastreo básico',
        'Soporte por email'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: '$3.99',
      unit: '/lb',
      description: 'Ideal para usuarios frecuentes',
      features: [
        'Peso ilimitado',
        '5-7 días hábiles',
        'Rastreo en tiempo real',
        'Seguro hasta $1000'
      ],
      popular: true
    },
    {
      id: 'business',
      name: 'Plan Empresa',
      price: '$4.99',
      unit: '/lb',
      description: 'Para necesidades comerciales',
      features: [
        'Volúmenes altos',
        '3-5 días hábiles',
        'Gerente dedicado',
        'Tarifas personalizadas'
      ],
      popular: false
    }
  ];

  const services = [
    {
      icon: Package,
      title: 'Casillero Personal',
      description: 'Tu dirección personal en Miami para recibir todos tus paquetes'
    },
    {
      icon: Truck,
      title: 'Envío Express',
      description: 'Entregas rápidas de 5-7 días hábiles a Panamá'
    },
    {
      icon: Shield,
      title: 'Seguro Incluido',
      description: 'Protección completa para todos tus envíos'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="hero-bg absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Envíos Seguros de <span className="text-accent">USA a Panamá</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Tu casillero confiable con más de 10 años conectando Estados Unidos y Panamá
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/plans">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                  Ver Planes de Envío
                </Button>
              </Link>
              <Link href="/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  Rastrear Paquete
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600">
              Soluciones completas para tus envíos internacionales
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Plans Preview */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planes de Envío
            </h2>
            <p className="text-lg text-gray-600">
              Encuentra el plan perfecto para tus necesidades
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`plan-card ${plan.popular ? 'featured' : ''} relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent hover:bg-accent/90">
                      Más Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-4xl font-bold text-primary mb-2">
                      {plan.price}
                      <span className="text-base text-gray-500">{plan.unit}</span>
                    </p>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <ul className="text-left space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/plans">
                      <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-accent hover:bg-accent/90' 
                            : 'bg-primary hover:bg-primary/90'
                        }`}
                      >
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
