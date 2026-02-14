import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Building2, Bed, Car, Maximize2, MessageCircle } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  celular: z.string().min(10, 'Celular inválido'),
  quartos: z.string().min(1, 'Selecione o número de quartos')
});

const Home = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedQuartos, setSelectedQuartos] = useState('');

  // WhatsApp Business number
  const whatsappNumber = '5561985309658';
  const whatsappMessage = encodeURIComponent('Olá! Gostaria de saber mais informações sobre o lançamento Quadra 500 Sudoeste.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Send to backend API
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao enviar cadastro');
      }

      const result = await response.json();
      console.log('Lead criado:', result);
      
      toast.success('Cadastro realizado com sucesso! Em breve entraremos em contato.');
      reset();
      setSelectedQuartos('');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      if (error.message.includes('já está cadastrado')) {
        toast.error('Este email já está cadastrado em nosso sistema.');
      } else {
        toast.error('Erro ao realizar cadastro. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/9hj0ylhb_IMG_7489.jpeg"
            alt="Quadra 500 Sudoeste"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <img
                src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/zi8b8upq_IMG_7490.jpeg"
                alt="Lançamento"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              AS NOVAS JOIAS
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              NA QUADRA 500
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-12">
              DO SUDOESTE
            </h3>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Cadastre-se para receber informações exclusivas sobre as novidades da Quadra 500 Sudoeste.
            </p>

            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              Cadastre-se agora
            </Button>

            <div className="mt-6">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white text-lg hover:text-green-400 transition-colors duration-300"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Fale conosco no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
              <h3 className="text-3xl font-bold text-white text-center mb-8">
                Cadastre-se para receber informações exclusivas
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="nome" className="text-white text-lg mb-2 block">
                    Nome*
                  </Label>
                  <Input
                    id="nome"
                    {...register('nome')}
                    placeholder="Seu nome completo"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
                  />
                  {errors.nome && (
                    <p className="text-red-400 text-sm mt-1">{errors.nome.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-white text-lg mb-2 block">
                    Email*
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="seu@email.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="celular" className="text-white text-lg mb-2 block">
                    Celular*
                  </Label>
                  <Input
                    id="celular"
                    {...register('celular')}
                    placeholder="(00) 00000-0000"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
                  />
                  {errors.celular && (
                    <p className="text-red-400 text-sm mt-1">{errors.celular.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="quartos" className="text-white text-lg mb-2 block">
                    Selecione o número de quartos de interesse*
                  </Label>
                  <Select
                    value={selectedQuartos}
                    onValueChange={(value) => {
                      setSelectedQuartos(value);
                      setValue('quartos', value);
                    }}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white h-12 text-lg">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 quartos</SelectItem>
                      <SelectItem value="3">3 quartos</SelectItem>
                      <SelectItem value="4">4 quartos</SelectItem>
                      <SelectItem value="5">5 quartos</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.quartos && (
                    <p className="text-red-400 text-sm mt-1">{errors.quartos.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white h-14 text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Button>
              </form>

              <p className="text-gray-400 text-sm text-center mt-6">
                MI: R22-159.970 (1º Oficio)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destaque: Único 2 Quartos Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="text-purple-400">Exclusividade:</span> O Único 2 Quartos da Quadra 500
              </h2>
              <p className="text-xl text-gray-300">
                Residencial Ametista - Uma oportunidade única no Sudoeste
              </p>
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/9w024jfm_IMG_7491.jpeg"
                alt="Residencial Ametista - Único 2 Quartos do Sudoeste"
                className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center hover:bg-purple-900/30 transition-all duration-300">
                <div className="text-purple-400 text-3xl font-bold mb-2">2 Quartos</div>
                <p className="text-gray-300">Configuração única</p>
              </div>
              <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center hover:bg-purple-900/30 transition-all duration-300">
                <div className="text-purple-400 text-3xl font-bold mb-2">Quadra 500</div>
                <p className="text-gray-300">Localização privilegiada</p>
              </div>
              <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center hover:bg-purple-900/30 transition-all duration-300">
                <div className="text-purple-400 text-3xl font-bold mb-2">Exclusivo</div>
                <p className="text-gray-300">Único no Sudoeste</p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Button 
                onClick={scrollToForm}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                Quero conhecer o Ametista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Residencial Rubi Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="text-red-500">Residencial Rubi:</span> 4 Suítes com Vista Livre
              </h2>
              <p className="text-xl text-gray-300">
                Sofisticação e elegância no coração do Sudoeste
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/zcf8vndh_IMG_7494.jpeg"
                  alt="Residencial Rubi Logo"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/ybhwa4az_IMG_7493.jpeg"
                  alt="Residencial Rubi Interior"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/7z4jbbq2_IMG_7492.jpeg"
                  alt="Residencial Rubi Fachada"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Features Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 text-center hover:bg-red-900/30 transition-all duration-300">
                <div className="text-red-400 text-3xl font-bold mb-2">4 Suítes</div>
                <p className="text-gray-300 text-sm">Até 257m²</p>
              </div>
              <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 text-center hover:bg-red-900/30 transition-all duration-300">
                <div className="text-red-400 text-3xl font-bold mb-2">Vista Livre</div>
                <p className="text-gray-300 text-sm">Permanente</p>
              </div>
              <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 text-center hover:bg-red-900/30 transition-all duration-300">
                <div className="text-red-400 text-3xl font-bold mb-2">4 Vagas</div>
                <p className="text-gray-300 text-sm">+ Bicicletário</p>
              </div>
              <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 text-center hover:bg-red-900/30 transition-all duration-300">
                <div className="text-red-400 text-3xl font-bold mb-2">Cobertura</div>
                <p className="text-gray-300 text-sm">Até 505m²</p>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={scrollToForm}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                Quero conhecer o Rubi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
              <img
                src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/0mckziop_IMG_0546.jpeg"
                alt="04 suítes"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <ul className="text-white space-y-3 text-lg">
                  <li className="flex items-start">
                    <span className="mr-3 text-amber-500">•</span>
                    Apartamentos até 4 suítes de até 257m²
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-amber-500">•</span>
                    Coberturas lineares até 4 suítes de até 505m²
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-amber-500">•</span>
                    Vista Livre permanente
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-amber-500">•</span>
                    4 vagas de garagem e bicicletário individual
                  </li>
                </ul>
                <Button 
                  onClick={scrollToForm}
                  className="mt-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                >
                  Cadastre-se para saber mais
                </Button>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
              <img
                src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/adem7q3f_IMG_0549.jpeg"
                alt="Residencial Rubi"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <Button 
                  onClick={scrollToForm}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                >
                  Cadastre-se para saber mais
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <img
              src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/hnnqqigp_IMG_7488.jpeg"
              alt="Especificações"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
            />
          </div>

          <div className="flex justify-center">
            <img
              src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/d25erkbz_IMG_0547.jpeg"
              alt="Cobertura"
              className="w-full max-w-3xl rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Luxury Statement Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Um novo padrão construtivo que reinventa a sua experiência em todos os espaços.
            </h2>
            <p className="text-xl md:text-3xl text-gray-300 mb-12">
              Sofisticação, conforto, design inteligente e inovação até onde menos se espera.
            </p>
            <p className="text-2xl md:text-3xl text-white mb-12">
              Viva a experiência Quadra 500 Sudoeste agora, ainda mais exclusiva.
            </p>
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              Cadastre-se para saber mais
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <img
              src="https://customer-assets.emergentagent.com/job_lead-capture-56/artifacts/fr4j5j1f_IMG_7487.jpeg"
              alt="Nova Joia Quadra 500"
              className="w-full rounded-2xl shadow-2xl mb-12"
            />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Cadastre-se agora e descubra todos os detalhes das joias mais desejadas do Sudoeste!
            </h2>
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              Cadastre-se para saber mais
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">+55 61 98530-9658</span>
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Quadra 500 Sudoeste - Todos os direitos reservados
            </p>
            <p className="text-gray-500 text-xs">
              MI: R22-159.970 (1º Oficio)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
