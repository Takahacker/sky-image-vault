import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Cloud, Server, Database, Shield } from "lucide-react";
import heroImage from "@/assets/hero-cloud.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 gradient-overlay opacity-90"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
              Infraestrutura inteligente,{" "}
              <span className="text-accent">escalável</span> e{" "}
              <span className="text-accent">resiliente</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Transformamos imagens em Base64 com a potência da AWS. Soluções em
              nuvem que crescem com seu negócio.
            </p>
            <Link to="/clientes">
              <Button variant="hero" size="lg" className="text-lg">
                Acessar Área de Clientes
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6">
              Sobre a <span className="text-gradient">Demay's Infra Company</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed">
              Fundada com o propósito de democratizar o acesso a soluções de
              infraestrutura em nuvem, a Demay's Infra Company é especializada em
              arquiteturas AWS robustas e escaláveis.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-card p-8 rounded-xl shadow-lg hover-lift border border-border">
                <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Desenvolver soluções de infraestrutura que empoderam empresas a
                  alcançar novos patamares de eficiência e escalabilidade através
                  da tecnologia em nuvem.
                </p>
              </div>

              <div className="bg-card p-8 rounded-xl shadow-lg hover-lift border border-border">
                <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser referência em inovação de infraestrutura cloud, oferecendo
                  soluções que combinam performance, segurança e custos otimizados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Tecnologias <span className="text-gradient">AWS</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 smooth-transition">
                <Cloud className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">S3 Storage</h3>
              <p className="text-muted-foreground text-sm">
                Armazenamento seguro e escalável para todas as suas imagens
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 smooth-transition">
                <Server className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lambda Functions</h3>
              <p className="text-muted-foreground text-sm">
                Processamento serverless com alta disponibilidade
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 smooth-transition">
                <Database className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">DynamoDB</h3>
              <p className="text-muted-foreground text-sm">
                Banco NoSQL rápido para metadados e consultas
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 smooth-transition">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">EC2 API</h3>
              <p className="text-muted-foreground text-sm">
                APIs robustas e seguras para integração completa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Acesse nossa área de clientes e experimente a conversão de imagens
            para Base64 com a infraestrutura AWS.
          </p>
          <Link to="/clientes">
            <Button variant="hero" size="lg" className="text-lg">
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
