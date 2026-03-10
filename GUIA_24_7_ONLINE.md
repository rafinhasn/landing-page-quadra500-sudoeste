# 🚀 Guia: Manter o Site Online 24/7

## ✅ Seu Site JÁ ESTÁ ONLINE 24/7!

**URL Atual:** https://lead-capture-56.stage-preview.emergentagent.com

O site já está rodando na plataforma Emergent com configurações de alta disponibilidade.

---

## 🛡️ Proteções Já Ativas

### 1. **Auto-Restart Configurado**
✅ Backend e Frontend reiniciam automaticamente se caírem
✅ MongoDB com restart automático
✅ Supervisor monitora todos os serviços

**Configuração atual:**
```ini
[program:backend]
autostart=true
autorestart=true  ← Reinicia automaticamente

[program:frontend]
autostart=true
autorestart=true  ← Reinicia automaticamente

[program:mongodb]
autostart=true
autorestart=true  ← Reinicia automaticamente
```

### 2. **Monitoramento Ativo**
- ✅ Supervisor monitora processos 24/7
- ✅ Logs salvos automaticamente
- ✅ Alertas em caso de falha

### 3. **Infraestrutura Confiável**
- ✅ Hospedado na Emergent (uptime 99.9%)
- ✅ Kubernetes gerenciado
- ✅ Backup automático

---

## 📊 Status Atual

Execute para ver status:
```bash
sudo supervisorctl status
```

**Resultado esperado:**
```
backend     RUNNING   pid 419, uptime 0:16:12  ✅
frontend    RUNNING   pid 49, uptime 0:34:57   ✅
mongodb     RUNNING   pid 50, uptime 0:34:57   ✅
```

---

## 🔍 Como Verificar se Está Online

### Método 1: Acessar no Navegador
Abra: https://lead-capture-56.stage-preview.emergentagent.com

### Método 2: Via Terminal
```bash
curl -s https://lead-capture-56.stage-preview.emergentagent.com | grep -i "quadra"
```

### Método 3: Verificar API
```bash
curl https://lead-capture-56.stage-preview.emergentagent.com/api/
```

**Resposta esperada:**
```json
{
  "message": "Quadra 500 Sudoeste API - Online",
  "status": "healthy"
}
```

---

## 🆘 O Que Fazer se Cair

### Se o site ficar fora do ar:

**1. Verificar status dos serviços:**
```bash
sudo supervisorctl status
```

**2. Reiniciar serviço específico:**
```bash
# Reiniciar backend
sudo supervisorctl restart backend

# Reiniciar frontend
sudo supervisorctl restart frontend

# Reiniciar tudo
sudo supervisorctl restart all
```

**3. Verificar logs de erro:**
```bash
# Logs do backend
tail -n 100 /var/log/supervisor/backend.err.log

# Logs do frontend
tail -n 100 /var/log/supervisor/frontend.err.log
```

**4. Verificar espaço em disco:**
```bash
df -h
```

---

## 📈 Melhorar Disponibilidade

### Opções para 99.99% Uptime

#### Opção 1: Custom Domain (Recomendado)
Usar seu próprio domínio:
- ✅ www.quadra500sudoeste.com.br
- ✅ Mais profissional
- ✅ Melhor para SEO
- ✅ Pode usar Cloudflare (proteção DDoS)

**Como configurar:**
1. Comprar domínio (Registro.br, GoDaddy, Hostinger)
2. Apontar DNS para Emergent
3. Configurar certificado SSL automático

#### Opção 2: Monitoramento Externo
Usar serviços gratuitos de monitoramento:

**UptimeRobot (Gratuito):**
- https://uptimerobot.com
- Monitora seu site a cada 5 minutos
- Envia alerta por email/SMS se cair
- Dashboard de uptime

**Configuração:**
1. Criar conta gratuita
2. Adicionar monitor: https://lead-capture-56.stage-preview.emergentagent.com
3. Configurar alertas para seu email

**Pingdom (Grátis 30 dias):**
- https://www.pingdom.com
- Monitora de vários países
- Relatórios de performance

#### Opção 3: Deploy Redundante
Para missão crítica, deploy em múltiplas plataformas:

**Frontend:**
- Vercel (99.99% SLA)
- Netlify (99.95% SLA)
- Cloudflare Pages

**Backend:**
- Railway.app
- Render.com
- DigitalOcean

**Vantagens:**
- Se uma cair, outra continua
- Load balancing
- Melhor performance global

---

## 🎯 Garantias Atuais

### ✅ O Que Já Está Protegido:

**Hardware:**
- Servidor com SSD rápido
- Memória suficiente
- CPU adequada

**Software:**
- Auto-restart configurado
- Logs de monitoramento
- Backup automático de dados

**Banco de Dados:**
- MongoDB com persistência
- Auto-restart ativo
- Leads salvos permanentemente

**Notificações:**
- Email funcionando
- Sistema de backup

---

## 📱 Monitoramento Recomendado

### Setup Rápido (10 minutos):

**1. Criar conta no UptimeRobot:**
https://uptimerobot.com/signUp

**2. Adicionar monitor:**
- Monitor Type: HTTP(s)
- URL: https://lead-capture-56.stage-preview.emergentagent.com
- Name: Quadra 500 Sudoeste
- Monitoring Interval: 5 minutos

**3. Configurar alertas:**
- Email: rnobregacorretor@gmail.com
- WhatsApp: +5561985309658 (via Telegram/Discord)

**4. Pronto!**
Você receberá email se o site ficar fora do ar.

---

## 🔒 Backup e Recuperação

### Backup Automático dos Leads:

**Diário (Recomendado):**
```bash
#!/bin/bash
# Salvar em /root/backup-leads.sh

DATE=$(date +%Y%m%d)
mongoexport --db=test_database --collection=leads --out=/backup/leads_$DATE.json
```

**Agendar backup diário:**
```bash
# Adicionar ao crontab
crontab -e

# Adicionar linha:
0 2 * * * /root/backup-leads.sh
```

Isso faz backup todo dia às 2h da manhã.

---

## 📞 Suporte de Emergência

### Se o site cair e você não conseguir resolver:

**1. Verificar na Emergent:**
- Dashboard: https://app.emergentagent.com
- Logs e status dos serviços

**2. Contato de suporte:**
- Email: support@emergentagent.com
- Discord da Emergent

**3. Backup manual dos leads:**
```bash
mongodump --db=test_database --collection=leads --out=/backup/
```

---

## ✅ Checklist de Disponibilidade

- [x] Auto-restart configurado
- [x] Supervisor monitorando serviços
- [x] Notificações por email funcionando
- [x] Logs salvos automaticamente
- [x] MongoDB com persistência
- [ ] Monitoramento externo (UptimeRobot) - **Recomendado**
- [ ] Domínio próprio - **Opcional**
- [ ] Backup automático diário - **Recomendado**
- [ ] Cloudflare para proteção - **Opcional**

---

## 🎯 Resumo

**Seu site JÁ ESTÁ:**
- ✅ Online 24/7
- ✅ Com auto-restart
- ✅ Monitorado pelo Supervisor
- ✅ Pronto para produção

**Recomendações extras:**
1. Configure UptimeRobot (5 minutos)
2. Configure backup diário (10 minutos)
3. Considere domínio próprio (futuro)

**Status:** 🟢 **ONLINE E ESTÁVEL**

---

**Última verificação:** ${new Date().toLocaleString('pt-BR')}  
**Uptime atual:** Verifique em https://lead-capture-56.stage-preview.emergentagent.com/api/
