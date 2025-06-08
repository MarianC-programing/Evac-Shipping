import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Car, Train, Bus } from 'lucide-react';

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuestra Ubicación
            </h1>
            <p className="text-lg text-gray-600">
              Visítanos en nuestras oficinas en Ciudad de Panamá
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Map Container */}
            <Card className="h-96 overflow-hidden">
              <div className="w-full h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.668554230547!2d-79.5329!3d8.9823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca8f1dbe80f0f%3A0x1e1c5c5b5b5b5b5b!2sAv.%20Balboa%2C%20Ciudad%20de%20Panam%C3%A1%2C%20Panam%C3%A1!5e0!3m2!1sen!2spa!4v1698765432123!5m2!1sen!2spa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación EVAC en Panamá"
                />
              </div>
            </Card>

            {/* Location Details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Oficina Principal
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Dirección:</p>
                      <p className="text-gray-600">
                        Av. Balboa, Torre de las Américas<br />
                        Piso 15, Oficina 1502<br />
                        Ciudad de Panamá, Panamá
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Teléfono:</p>
                      <p className="text-gray-600">+507 6789-1234</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Email:</p>
                      <p className="text-gray-600">info@evac.com.pa</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Horarios de Atención
                </h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">Lunes - Viernes</p>
                        <p className="text-gray-600">8:00 AM - 6:00 PM</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Sábados</p>
                        <p className="text-gray-600">9:00 AM - 2:00 PM</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Domingos</p>
                        <p className="text-gray-600">Cerrado</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Feriados</p>
                        <p className="text-gray-600">Horario especial</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Cómo Llegar
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start">
                    <Car className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <p><strong>En Auto:</strong> Estacionamiento disponible en el edificio. Tarifa: $2.00/hora</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Train className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <p><strong>En Metro:</strong> Estación 5 de Mayo, línea 1. Caminar 8 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Bus className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <p><strong>En Bus:</strong> Rutas que pasan por Av. Balboa</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office in Miami */}
              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Warehouse en Miami
                </h3>
                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <p className="font-medium text-primary mb-2">
                      Dirección de tu Casillero:
                    </p>
                    <div className="text-gray-700 font-mono text-sm">
                      <p>EVAC Logistics</p>
                      <p>[Tu Número de Cliente]</p>
                      <p>8405 NW 53rd Terrace</p>
                      <p>Doral, FL 33166</p>
                      <p>United States</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
