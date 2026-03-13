# 🚀 Guia Completo: Deploy no Kubernetes com MongoDB Atlas

## 📋 Visão Geral

Este guia mostra como fazer deploy da sua aplicação no Kubernetes da Emergent usando MongoDB Atlas.

---

## 📍 PASSO 1: Configurar MongoDB Atlas

### 1.1 Criar Conta (se não tiver)

**1. Acesse:** https://www.mongodb.com/cloud/atlas/register

**2. Crie conta gratuita:**
- Use seu email: rnobregacorretor@gmail.com
- Crie uma senha forte
- Confirme o email

### 1.2 Criar Cluster Gratuito

**1. No Dashboard, clique em "Build a Database"**

**2. Escolha o plano:**
- Selecione: **M0 Sandbox (FREE)**
- Provider: AWS
- Region: São Paulo (sa-east-1) ou US East (mais próximo)

**3. Cluster Name:**
- Digite: `quadra500-cluster`

**4. Clique em "Create"**
- Aguarde 3-5 minutos (criação do cluster)

### 1.3 Configurar Usuário do Banco

**1. Quando aparecer "Security Quickstart":**

**Username:**
```
quadra500admin
```

**Password:** (Gere uma senha forte ou use)
```
Quadra500@2026!
```

**⚠️ IMPORTANTE: Anote essa senha!**

**2. Clique em "Create User"**

### 1.4 Configurar Acesso de Rede

**1. Na seção "Where would you like to connect from?"**

**2. Escolha: "Cloud Environment"**

**3. Adicione IP Address:**
```
0.0.0.0/0
```
(Permite acesso de qualquer lugar - OK para teste)

**Descrição:**
```
Kubernetes Cluster
```

**4. Clique em "Add Entry"**

**5. Clique em "Finish and Close"**

### 1.5 Obter String de Conexão

**1. No Dashboard, clique em "Connect" no seu cluster**

**2. Escolha: "Connect your application"**

**3. Copie a Connection String:**

Exemplo:
```
mongodb+srv://quadra500admin:<password>@quadra500-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**4. Substitua `<password>` pela senha que você criou:**
```
mongodb+srv://quadra500admin:Quadra500@2026!@quadra500-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**⚠️ IMPORTANTE: Salve essa string completa!**

---

## 📍 PASSO 2: Configurar Variáveis de Ambiente

### 2.1 Atualizar .env do Backend Localmente

**1. Edite o arquivo:**
```bash
nano /app/backend/.env
```

**2. Atualize com as informações de produção:**

```env
# MongoDB Atlas - PRODUÇÃO
MONGO_URL=mongodb+srv://quadra500admin:Quadra500@2026!@quadra500-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=quadra500_production

# CORS
CORS_ORIGINS=*

# Email Notifications
EMAIL_NOTIFICATIONS_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=rnobregacorretor@gmail.com
SMTP_PASSWORD=rbdtgnkdgnfstvkl
NOTIFICATION_EMAIL=rnobregacorretor@gmail.com

# WhatsApp Notifications
WHATSAPP_NOTIFICATIONS_ENABLED=false
WHATSAPP_NOTIFICATION_NUMBER=+5561985309658
```

**3. Salve (Ctrl+O, Enter, Ctrl+X)**

---

## 📍 PASSO 3: Deploy no Emergent

### Método A: Via Dashboard Emergent (Recomendado)

**1. Acesse:** https://app.emergentagent.com

**2. Faça login**

**3. Navegue até seu projeto:**
- "lead-capture-56" ou nome do seu projeto

**4. Vá para "Settings" ou "Configuration"**

**5. Adicione Environment Variables:**

**Clique em "Add Environment Variable" para cada:**

```
Nome: MONGO_URL
Valor: mongodb+srv://quadra500admin:Quadra500@2026!@quadra500-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

```
Nome: DB_NAME
Valor: quadra500_production
```

```
Nome: EMAIL_NOTIFICATIONS_ENABLED
Valor: true
```

```
Nome: SMTP_HOST
Valor: smtp.gmail.com
```

```
Nome: SMTP_PORT
Valor: 587
```

```
Nome: SMTP_USER
Valor: rnobregacorretor@gmail.com
```

```
Nome: SMTP_PASSWORD
Valor: rbdtgnkdgnfstvkl
```

```
Nome: NOTIFICATION_EMAIL
Valor: rnobregacorretor@gmail.com
```

**6. Clique em "Save" ou "Update"**

**7. Faça o Deploy:**
- Clique em "Deploy" ou "Redeploy"
- Aguarde o processo (3-5 minutos)

### Método B: Via CLI (Alternativo)

Se você tiver acesso à CLI do Emergent:

```bash
# Login
emergent login

# Deploy
emergent deploy

# Configurar variáveis
emergent env set MONGO_URL="mongodb+srv://..."
emergent env set DB_NAME="quadra500_production"
emergent env set EMAIL_NOTIFICATIONS_ENABLED="true"
# ... etc
```

### Método C: Suporte Emergent

Se não conseguir pelos métodos acima:

**1. Entre em contato:**
- Discord: https://discord.gg/emergent
- Email: support@emergentagent.com

**2. Forneça:**
- Seu projeto: lead-capture-56
- Lista de variáveis de ambiente (envie o .env sem a senha do MongoDB)
- Solicite ajuda para configurar

---

## 📍 PASSO 4: Verificar Deploy

### 4.1 Aguardar Deploy Completo

**Sinais de sucesso:**
- Status: "Running" ou "Healthy"
- Pods: 1/1 ou 2/2 (backend e frontend)
- Logs sem erros críticos

### 4.2 Verificar Logs

**No Dashboard Emergent:**
1. Vá em "Logs" ou "View Logs"
2. Procure por:
   - ✅ "Application startup complete"
   - ✅ "Database indexes setup complete"
   - ✅ "Uvicorn running on"

**Logs esperados (sucesso):**
```
INFO - Starting Quadra 500 Sudoeste API...
INFO - MongoDB client configured for database: quadra500_production
INFO - Email index created (unique)
INFO - Created_at index created
INFO - Database indexes setup complete
INFO - Application startup complete
INFO - Uvicorn running on http://0.0.0.0:8001
```

### 4.3 Testar Health Check

```bash
curl https://seu-dominio.emergentagent.com/api/health
```

**Resposta esperada:**
```json
{
  "status": "healthy",
  "message": "API and Database are operational",
  "database": "connected"
}
```

### 4.4 Testar API Básica

```bash
curl https://seu-dominio.emergentagent.com/api/
```

**Resposta esperada:**
```json
{
  "message": "Quadra 500 Sudoeste API - Online",
  "status": "healthy"
}
```

### 4.5 Testar Criação de Lead

```bash
curl -X POST https://seu-dominio.emergentagent.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste Deploy",
    "email": "teste.deploy@example.com",
    "celular": "61999887766",
    "quartos": "4"
  }'
```

**Resposta esperada:**
```json
{
  "_id": "uuid-gerado",
  "nome": "Teste Deploy",
  "email": "teste.deploy@example.com",
  "celular": "61999887766",
  "quartos": "4",
  "created_at": "2026-03-13T..."
}
```

**E você deve receber um email! 📧**

### 4.6 Verificar MongoDB Atlas

**1. Acesse MongoDB Atlas Dashboard**

**2. Clique em "Browse Collections"**

**3. Veja:**
- Database: `quadra500_production`
- Collection: `leads`
- Documentos: Seu lead de teste deve aparecer!

---

## 📍 PASSO 5: Verificar Frontend

### 5.1 Acessar Site

```
https://lead-capture-56.stage-preview.emergentagent.com
```
ou seu domínio customizado

### 5.2 Testar Formulário

1. Preencha o formulário com dados reais
2. Clique em "Enviar"
3. Deve aparecer: "Cadastro realizado com sucesso!"
4. Você deve receber email de notificação

### 5.3 Verificar Painel Admin

```
https://seu-dominio.emergentagent.com/admin/login
```

**Login:**
- Senha: `quadra500admin`

**Verifique:**
- Leads aparecem na tabela
- Estatísticas corretas
- Exportar CSV funciona

---

## 🔧 TROUBLESHOOTING

### Erro: "Database connection failed"

**Problema:** MongoDB Atlas não acessível

**Solução:**
1. Verifique se IP `0.0.0.0/0` está liberado no Atlas
2. Confirme usuário e senha corretos
3. Teste a string de conexão localmente primeiro

```bash
# Teste local
mongosh "mongodb+srv://quadra500admin:senha@cluster.mongodb.net"
```

### Erro: "Index creation failed"

**Problema:** Índices duplicados

**Solução:** 
- Isso é normal! Os logs devem mostrar WARNING, não ERROR
- A aplicação continua funcionando

### Erro: "Connection timeout"

**Problema:** Timeouts de rede

**Solução:**
1. Aumente timeouts no código (já está configurado)
2. Verifique região do cluster Atlas (use mais próxima)
3. Tente region US East se SA não funcionar

### Frontend não carrega

**Problema:** Build do frontend

**Solução:**
1. Verifique logs do frontend
2. Confirme que `REACT_APP_BACKEND_URL` está correto
3. Limpe cache e rebuild

### Email não envia

**Problema:** Credenciais SMTP

**Solução:**
1. Verifique senha de app do Gmail
2. Confirme que variáveis estão no ambiente
3. Veja logs: `grep "email" logs`

---

## 📊 Checklist de Deploy

### Pré-Deploy:
- [ ] MongoDB Atlas cluster criado
- [ ] Usuário do banco criado
- [ ] IPs liberados (0.0.0.0/0)
- [ ] String de conexão obtida
- [ ] Senha de app Gmail configurada

### Durante Deploy:
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy iniciado
- [ ] Aguardando conclusão (3-5 min)

### Pós-Deploy:
- [ ] Logs verificados (sem erros)
- [ ] Health check OK
- [ ] API respondendo
- [ ] Criação de lead testada
- [ ] Email recebido
- [ ] MongoDB Atlas com dados
- [ ] Frontend carregando
- [ ] Formulário funcionando
- [ ] Painel admin acessível

---

## 🎯 Comandos Úteis

### Verificar Status

```bash
# Health check
curl https://seu-dominio/api/health

# API
curl https://seu-dominio/api/

# Estatísticas
curl https://seu-dominio/api/leads/stats
```

### Criar Lead de Teste

```bash
API_URL="https://seu-dominio"

curl -X POST "$API_URL/api/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao.teste@example.com",
    "celular": "61987654321",
    "quartos": "3"
  }'
```

### Listar Leads

```bash
curl https://seu-dominio/api/leads
```

---

## 📞 Suporte

### MongoDB Atlas:
- Docs: https://docs.atlas.mongodb.com
- Support: https://support.mongodb.com

### Emergent:
- Discord: https://discord.gg/emergent
- Docs: https://docs.emergentagent.com
- Email: support@emergentagent.com

---

## 🎉 PRONTO!

Se todos os testes passaram:

**✅ Seu site está em PRODUÇÃO!**

**Agora você pode:**
- 🔗 Compartilhar o link
- 📱 Receber leads 24/7
- 📧 Receber notificações por email
- 📊 Gerenciar no painel admin
- 💾 Dados salvos no MongoDB Atlas

---

## 📈 Próximos Passos

### Imediato:
1. Testar tudo manualmente
2. Compartilhar link nas redes sociais
3. Monitorar primeiros leads

### Curto Prazo:
1. Configurar domínio próprio
2. Configurar UptimeRobot
3. Fazer backup diário

### Longo Prazo:
1. Analisar métricas de conversão
2. Otimizar baseado em dados
3. Expandir funcionalidades

---

**Boa sorte com o lançamento! 🚀**

Se precisar de ajuda em algum passo, me avise!
