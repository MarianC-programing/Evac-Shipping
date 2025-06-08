import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertContactSchema, type InsertContact } from '@shared/schema';
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      type: '',
      packageNumber: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Mensaje enviado',
        description: data.message,
      });
      setShowSuccess(true);
      form.reset();
      setTimeout(() => setShowSuccess(false), 5000);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Error al enviar mensaje',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const faqs = [
    {
      question: '¿Cuánto tiempo tarda un envío?',
      answer: 'Los envíos regulares tardan 7-10 días hábiles, mientras que el servicio express tarda 5-7 días hábiles.'
    },
    {
      question: '¿Cómo calculo el costo de envío?',
      answer: 'El costo se basa en el peso del paquete y el plan seleccionado. Puedes ver las tarifas en nuestra sección de planes.'
    },
    {
      question: '¿Qué hago si mi paquete está dañado?',
      answer: 'Contáctanos inmediatamente con fotos del daño. Nuestro seguro cubre estos casos.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contáctanos
            </h1>
            <p className="text-lg text-gray-600">
              ¿Tienes preguntas? Estamos aquí para ayudarte
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input
                      id="firstName"
                      {...form.register('firstName')}
                      placeholder="Tu nombre"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      {...form.register('lastName')}
                      placeholder="Tu apellido"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    placeholder="tu@email.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register('phone')}
                    placeholder="+507 6789-1234"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Tipo de Consulta *</Label>
                  <Select onValueChange={(value) => form.setValue('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Consulta General</SelectItem>
                      <SelectItem value="tracking">Problema con Rastreo</SelectItem>
                      <SelectItem value="billing">Facturación</SelectItem>
                      <SelectItem value="damaged">Paquete Dañado</SelectItem>
                      <SelectItem value="complaint">Queja</SelectItem>
                      <SelectItem value="suggestion">Sugerencia</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.type && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.type.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="packageNumber">Número de Paquete (Opcional)</Label>
                  <Input
                    id="packageNumber"
                    {...form.register('packageNumber')}
                    placeholder="#EV240315-001"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    {...form.register('message')}
                    rows={5}
                    placeholder="Describe tu consulta o problema..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="consent" required />
                  <Label htmlFor="consent" className="text-sm">
                    Acepto que EVAC me contacte sobre esta consulta
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>

              {/* Success Message */}
              {showSuccess && (
                <Card className="mt-6 border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-green-800">
                          ¡Mensaje enviado exitosamente!
                        </h3>
                        <p className="text-sm text-green-700 mt-1">
                          Te responderemos dentro de 24 horas hábiles.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">Teléfono</h4>
                      <p className="text-gray-600">+507 6789-1234</p>
                      <p className="text-sm text-gray-500">
                        Lun-Vie: 8AM-6PM, Sáb: 9AM-2PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">info@evac.com.pa</p>
                      <p className="text-sm text-gray-500">
                        Respuesta en 24 horas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">Oficina</h4>
                      <p className="text-gray-600">
                        Av. Balboa, Torre de las Américas<br />
                        Piso 15, Of. 1502<br />
                        Ciudad de Panamá
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    Contacto de Emergencia
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    Para problemas urgentes fuera del horario de oficina:
                  </p>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-red-600 mr-2" />
                    <span className="font-medium text-red-900">+507 6789-9999</span>
                  </div>
                  <p className="text-xs text-red-600 mt-2">
                    Solo para emergencias relacionadas con paquetes de alto valor o tiempo crítico
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
