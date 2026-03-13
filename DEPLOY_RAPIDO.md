# ⚡ Deploy Rápido - Resumo Visual

## 🎯 4 Passos Simples

```
┌─────────────────────────────────────────────────────────┐
│  PASSO 1: MongoDB Atlas (10 minutos)                    │
│  ✓ Criar conta em mongodb.com/cloud/atlas              │
│  ✓ Criar cluster gratuito M0                           │
│  ✓ Criar usuário: quadra500admin                       │
│  ✓ Liberar IP: 0.0.0.0/0                              │
│  ✓ Copiar string de conexão                           │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  PASSO 2: Configurar Variáveis (5 minutos)             │
│  ✓ Acessar dashboard Emergent                          │
│  ✓ Adicionar MONGO_URL                                 │
│  ✓ Adicionar DB_NAME=quadra500_production             │
│  ✓ Adicionar variáveis de email                        │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  PASSO 3: Deploy (5 minutos)                           │
│  ✓ Clicar em "Deploy" no dashboard                    │
│  ✓ Aguardar build (3-5 min)                           │
│  ✓ Verificar logs (sem erros)                         │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│  PASSO 4: Testar (5 minutos)                           │
│  ✓ curl /api/health                                    │
│  ✓ Acessar site                                         │
│  ✓ Criar lead de teste                                 │
│  ✓ Verificar email recebido                           │
│  ✅ PRONTO PARA USO!                                    │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Variáveis que Você Precisa

### Copie e cole no Emergent Dashboard:

| Nome | Valor | Onde Obter |
|------|-------|------------|
| `MONGO_URL` | mongodb+srv://user:pass@cluster... | MongoDB Atlas → Connect |
| `DB_NAME` | quadra500_production | Você escolhe |
| `EMAIL_NOTIFICATIONS_ENABLED` | true | Apenas digite |
| `SMTP_HOST` | smtp.gmail.com | Já configurado |
| `SMTP_PORT` | 587 | Já configurado |
| `SMTP_USER` | rnobregacorretor@gmail.com | Seu email |
| `SMTP_PASSWORD` | rbdtgnkdgnfstvkl | Senha de app Gmail |
| `NOTIFICATION_EMAIL` | rnobregacorretor@gmail.com | Seu email |

---

## 🔗 Links Importantes

**MongoDB Atlas:**
👉 https://www.mongodb.com/cloud/atlas/register

**Emergent Dashboard:**
👉 https://app.emergentagent.com

**Seu Site (após deploy):**
👉 https://lead-capture-56.stage-preview.emergentagent.com

---

## ✅ Teste Rápido Após Deploy

```bash
# 1. Health check (deve retornar "healthy")
curl https://seu-dominio/api/health

# 2. Criar lead de teste
curl -X POST https://seu-dominio/api/leads \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@example.com","celular":"61999999999","quartos":"4"}'

# 3. Se retornou JSON com _id = SUCESSO! 🎉
```

---

## 🆘 Problemas Comuns

### "Connection refused"
→ Aguarde mais 2-3 minutos (ainda deployando)

### "Database connection failed"
→ Verifique MONGO_URL e IP liberado no Atlas

### "Email não chega"
→ Verifique SMTP_PASSWORD no dashboard

---

## 💡 Dica Pro

**Teste localmente primeiro:**
```bash
# 1. Atualize /app/backend/.env com MongoDB Atlas
# 2. Reinicie backend
sudo supervisorctl restart backend

# 3. Teste
curl http://localhost:8001/api/health

# Se funcionar local = vai funcionar em prod!
```

---

**Tempo Total: ~25 minutos** ⏱️

**Guia Completo:** `/app/GUIA_DEPLOY_KUBERNETES.md`

---

**Precisa de ajuda? Me chame! 🚀**
