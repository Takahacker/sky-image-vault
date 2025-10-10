import { Card, CardContent } from "@/components/ui/card";
import { User, Code, Cloud, Layers, Sparkles } from "lucide-react";

const teamMembers = [
  {
    name: "João Silva",
    role: "Cloud Architect",
    course: "Engenharia de Computação",
    description: "Especialista em arquiteturas AWS e infraestrutura escalável",
    icon: Cloud,
  },
  {
    name: "Maria Santos",
    role: "DevOps Engineer",
    course: "Ciência da Computação",
    description: "Focada em automação e CI/CD pipelines",
    icon: Layers,
  },
  {
    name: "Pedro Costa",
    role: "Backend Developer",
    course: "Sistemas de Informação",
    description: "Desenvolvimento de APIs e integração de serviços",
    icon: Code,
  },
  {
    name: "Ana Oliveira",
    role: "Frontend Developer",
    course: "Engenharia de Software",
    description: "Criação de interfaces modernas e responsivas",
    icon: Sparkles,
  },
];

const Grupo = () => {
  return (
    <div className="min-h-screen py-20 gradient-animated">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <User className="w-4 h-4 text-accent" />
            <span className="text-sm text-primary-foreground">Conheça a equipe</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-primary-foreground">
            Nosso <span className="text-accent">Grupo</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Conheça a equipe por trás do projeto Base64 Cloud
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden hover-lift glass-card border-0 fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="gradient-primary h-32 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <IconComponent className="w-full h-full rotate-slow opacity-10" />
                    </div>
                    <div className="w-20 h-20 rounded-full glass-strong flex items-center justify-center relative z-10 float">
                      <User className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="w-5 h-5 text-accent" />
                      <h3 className="text-xl font-bold text-primary-foreground">{member.name}</h3>
                    </div>
                    <p className="text-accent font-semibold mb-2">{member.role}</p>
                    <p className="text-sm text-primary-foreground/60 mb-3">
                      {member.course}
                    </p>
                    <p className="text-sm text-primary-foreground/70 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center fade-in-up">
          <Card className="glass-strong border-0 hover-lift">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-primary-foreground">Sobre o Projeto</h2>
              </div>
              <p className="text-primary-foreground/70 leading-relaxed">
                Este projeto foi desenvolvido como parte do curso de Cloud Computing
                do Insper. Utilizamos as principais tecnologias AWS (S3, Lambda,
                DynamoDB e EC2) para criar uma solução completa de conversão de
                imagens para Base64, demonstrando conceitos de arquitetura
                serverless, armazenamento em nuvem e APIs escaláveis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Grupo;
