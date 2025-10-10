import { Cloud, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="glass-strong text-primary-foreground py-12 mt-auto relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-accent" />
            <span className="font-bold">
              Demay's <span className="text-accent">Infra</span>
            </span>
          </div>
          
          <p className="text-sm text-primary-foreground/70">
            © 2025 Demay's Infra Company — Projeto Insper Cloud
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="glass-card p-2 rounded-lg hover:glass-strong smooth-transition">
              <Github className="w-5 h-5 text-primary-foreground/70 hover:text-accent smooth-transition" />
            </a>
            <a href="#" className="glass-card p-2 rounded-lg hover:glass-strong smooth-transition">
              <Linkedin className="w-5 h-5 text-primary-foreground/70 hover:text-accent smooth-transition" />
            </a>
            <a href="#" className="glass-card p-2 rounded-lg hover:glass-strong smooth-transition">
              <Mail className="w-5 h-5 text-primary-foreground/70 hover:text-accent smooth-transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
