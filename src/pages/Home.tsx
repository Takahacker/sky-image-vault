import { Button } from "@/components/ui/button";
// Use external clients URL from Vite env at build time; fallback to internal route
const clientsUrl = (import.meta.env.VITE_CLIENTS_URL as string) ?? "/clientes";
import { ArrowRight, Cloud, Server, Database, Shield, Zap, Lock, Cpu, Globe } from "lucide-react";

const Home = () => {
  return (
  <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[600px] flex items-center overflow-hidden"
        style={{
          // pull the hero up behind the fixed header while keeping its content visible
          marginTop: 'calc(var(--navbar-height, 5rem) * -1)',
          paddingTop: 'var(--navbar-height, 5rem)'
        }}
      >
  {/* background comes from App root; keep hero overlays only */}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl fade-in-up">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-primary-foreground">Powered by AWS</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
              Infraestrutura inteligente,{" "}
              <span className="text-accent">escalável</span> e{" "}
              <span className="text-accent">resiliente</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Transformamos imagens em Base64 com a potência da AWS. Soluções em
              nuvem que crescem com seu negócio.
            </p>
            <a href={clientsUrl} {...(clientsUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <Button variant="hero-invert" size="lg" className="text-lg hover-lift pulse-glow">
                Acessar Área de Clientes
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-20 h-20 glass rounded-full float opacity-50"></div>
        <div className="absolute bottom-40 left-10 w-32 h-32 glass rounded-full float opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-40 w-16 h-16 glass rounded-full float opacity-40" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* About Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto fade-in">
            <h2 className="text-4xl font-bold text-center mb-6 text-primary-foreground">
              Sobre a <span className="text-accent">Demay's Infra Company</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 text-center mb-12 leading-relaxed">
              Fundada com o propósito de democratizar o acesso a soluções de
              infraestrutura em nuvem, a Demay's Infra Company é especializada em
              arquiteturas AWS robustas e escaláveis.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="glass-card p-8 rounded-xl hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-foreground">Nossa Missão</h3>
                </div>
                <p className="text-primary-foreground/70 leading-relaxed">
                  Desenvolver soluções de infraestrutura que empoderam empresas a
                  alcançar novos patamares de eficiência e escalabilidade através
                  da tecnologia em nuvem.
                </p>
              </div>

              <div className="glass-card p-8 rounded-xl hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-foreground">Nossa Visão</h3>
                </div>
                <p className="text-primary-foreground/70 leading-relaxed">
                  Ser referência em inovação de infraestrutura cloud, oferecendo
                  soluções que combinam performance, segurança e custos otimizados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-primary-foreground">
            Tecnologias <span className="text-accent">AWS</span>
          </h2>
          <p className="text-center text-primary-foreground/70 mb-16 max-w-2xl mx-auto">
            Utilizamos as melhores ferramentas da AWS para garantir performance,
            segurança e escalabilidade
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="glass-card w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:glass-strong smooth-transition hover-lift">
                <Cloud className="w-10 h-10 text-accent group-hover:scale-110 smooth-transition" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">S3 Storage</h3>
              <p className="text-primary-foreground/70 text-sm">
                Armazenamento seguro e escalável para todas as suas imagens
              </p>
            </div>

            <div className="text-center group">
              <div className="glass-card w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:glass-strong smooth-transition hover-lift">
                <Server className="w-10 h-10 text-accent group-hover:scale-110 smooth-transition" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">Lambda Functions</h3>
              <p className="text-primary-foreground/70 text-sm">
                Processamento serverless com alta disponibilidade
              </p>
            </div>

            <div className="text-center group">
              <div className="glass-card w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:glass-strong smooth-transition hover-lift">
                <Database className="w-10 h-10 text-accent group-hover:scale-110 smooth-transition" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">DynamoDB</h3>
              <p className="text-primary-foreground/70 text-sm">
                Banco NoSQL rápido para metadados e consultas
              </p>
            </div>

            <div className="text-center group">
              <div className="glass-card w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:glass-strong smooth-transition hover-lift">
                <Cpu className="w-10 h-10 text-accent group-hover:scale-110 smooth-transition" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary-foreground">EC2 API</h3>
              <p className="text-primary-foreground/70 text-sm">
                APIs robustas e seguras para integração completa
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-xl hover-lift text-center">
              <Shield className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-bold text-primary-foreground mb-2">Segurança</h4>
              <p className="text-sm text-primary-foreground/70">Criptografia end-to-end</p>
            </div>
            <div className="glass-card p-6 rounded-xl hover-lift text-center">
              <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-bold text-primary-foreground mb-2">Performance</h4>
              <p className="text-sm text-primary-foreground/70">Processamento em tempo real</p>
            </div>
            <div className="glass-card p-6 rounded-xl hover-lift text-center">
              <Lock className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-bold text-primary-foreground mb-2">Privacidade</h4>
              <p className="text-sm text-primary-foreground/70">Dados protegidos e seguros</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-strong max-w-3xl mx-auto p-12 rounded-3xl hover-lift">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Acesse nossa área de clientes e experimente a conversão de imagens
              para Base64 com a infraestrutura AWS.
            </p>
            <a href={clientsUrl} {...(clientsUrl.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <Button variant="hero-invert" size="lg" className="text-lg hover-lift pulse-glow">
                Começar Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
