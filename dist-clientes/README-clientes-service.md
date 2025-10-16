Serviço systemd para 'clientes' (static site)

Objetivo

- Fornecer um pequeno serviço systemd que inicia automaticamente e serve o conteúdo de `dist-clientes` usando Python (http.server) na pasta `/opt/clientes`.

Arquivos gerados

- deploy/clientes.service — unit file systemd
- deploy/install_clientes_service.sh — script para copiar a build para /opt/clientes, instalar e habilitar o serviço

Passo-a-passo (no seu desktop/local):

1. Gera a build dos clientes:

   npm run build:clientes

2. Copie `dist-clientes` e os arquivos em `deploy/` para a EC2 (exemplo usando SCP):

   scp -r dist-clientes ubuntu@EC2_PUBLIC_IP:~/
   scp -r deploy ubuntu@EC2_PUBLIC_IP:~/

3. No EC2, execute (como usuário com sudo):

   cd ~/deploy
   sudo ./install_clientes_service.sh ../dist-clientes

4. Verificações:

   sudo systemctl status clientes.service
   curl -I http://localhost:8080

Notas e opções avançadas

- Por segurança e flexibilidade, o serviço executa o servidor Python na porta 8080 como o usuário `www-data`. Se você quer expor diretamente na porta 80, ajuste `ExecStart` em `deploy/clientes.service` para usar a porta 80 e execute o serviço como root (ou configure capabilities). A recomendação é usar Nginx como reverse proxy e manter o serviço no 8080.
- O `python3 -m http.server` é simples e suficiente para sites estáticos e cargas leves. Para produção com alto tráfego, considere usar Nginx (servindo os arquivos estáticos diretamente) ou um servidor WSGI mais robusto.

Se quiser, eu posso gerar os comandos SCP/SSH prontos (com placeholders) ou adaptar o service para usar `gunicorn`/`uvicorn`/um pequeno Flask app se preferir um servidor Python mais robusto.
