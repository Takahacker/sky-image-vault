import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

const teamMembers = [
  {
    name: "João Silva",
    role: "Cloud Architect",
    course: "Engenharia de Computação",
    description: "Especialista em arquiteturas AWS e infraestrutura escalável",
  },
  {
    name: "Maria Santos",
    role: "DevOps Engineer",
    course: "Ciência da Computação",
    description: "Focada em automação e CI/CD pipelines",
  },
  {
    name: "Pedro Costa",
    role: "Backend Developer",
    course: "Sistemas de Informação",
    description: "Desenvolvimento de APIs e integração de serviços",
  },
  {
    name: "Ana Oliveira",
    role: "Frontend Developer",
    course: "Engenharia de Software",
    description: "Criação de interfaces modernas e responsivas",
  },
];

const Grupo = () => {
  return (
    <div className="min-h-screen py-20 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Nosso <span className="text-gradient">Grupo</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça a equipe por trás do projeto Base64 Cloud
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover-lift border-border"
            >
              <CardContent className="p-0">
                <div className="gradient-primary h-32 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                    <User className="w-10 h-10 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-accent font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {member.course}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Sobre o Projeto</h2>
              <p className="text-muted-foreground leading-relaxed">
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
