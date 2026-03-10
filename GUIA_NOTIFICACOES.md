# 📬 Guia de Configuração de Notificações

## ✅ Sistema Preparado!

O sistema de notificações já está implementado e pronto para uso. Você receberá notificações por **Email** e **WhatsApp** sempre que um novo lead se cadastrar.

---

## 📧 Configuração de Email (Gmail)

### Passo 1: Gerar Senha de App do Gmail

Siga o guia completo em: `/app/GUIA_SENHA_GMAIL.md`

**Resumo:**
1. Acesse: https://myaccount.google.com/apppasswords
2. Ative verificação em 2 etapas (se ainda não tiver)
3. Gere uma senha de app com nome "Quadra 500 Notificações"
4. Copie a senha gerada (16 caracteres)

### Passo 2: Configurar no Sistema

Depois de gerar a senha de app, me envie e eu vou:

1. Adicionar a senha no arquivo `.env`
2. Ativar as notificações por email
3. Testar o envio

**Ou você mesmo pode configurar:**

Edite o arquivo `/app/backend/.env`:

```env
# Mudar de false para true
EMAIL_NOTIFICATIONS_ENABLED=true

# Sua senha de app aqui
SMTP_PASSWORD=sua-senha-de-app-de-16-caracteres
```

Depois reinicie o backend:
```bash
sudo supervisorctl restart backend
```

---

## 📱 Configuração de WhatsApp

### Opção A: Notificação Simples (Já Configurado)

✅ **Já está configurado!** O sistema está preparado para enviar notificações.

**Configurações atuais:**
- Número: +5561985309658
- Status: Aguardando ativação

Para ativar, edite `/app/backend/.env`:
```env
WHATSAPP_NOTIFICATIONS_ENABLED=true
```

### Opção B: WhatsApp via Twilio (Profissional)

Se quiser notificações automáticas no WhatsApp via Twilio:

1. Crie conta no Twilio: https://www.twilio.com/try-twilio
2. Configure WhatsApp Sandbox
3. Obtenha credenciais:
   - Account SID
   - Auth Token
4. Me envie as credenciais para eu configurar

---

## 📋 Como Vai Funcionar

### Quando um novo lead se cadastrar:

**📧 Você receberá um EMAIL com:**
- Nome do lead
- Email do lead
- Telefone do lead (com link direto para WhatsApp)
- Tipo de imóvel de interesse
- Data e hora do cadastro
- Botão para contato direto

**Exemplo de email:**
```
🏢 Novo Lead Cadastrado - João Silva

👤 Nome: João Silva
📧 Email: joao@example.com  
📱 Celular: 61999887766
🏠 Interesse: 4 quartos
📅 Data: 14/02/2025 às 15:30

[💬 Entrar em Contato via WhatsApp]
```

**📱 WhatsApp (quando ativado):**
Mensagem instantânea no seu WhatsApp com os dados do lead.

---

## 🧪 Testar Notificações

### 1. Configure a senha de app (veja acima)

### 2. Ative as notificações

Edite `/app/backend/.env`:
```env
EMAIL_NOTIFICATIONS_ENABLED=true
SMTP_PASSWORD=sua-senha-aqui
```

### 3. Reinicie o backend
```bash
sudo supervisorctl restart backend
```

### 4. Faça um cadastro teste

1. Acesse: https://lead-capture-56.stage-preview.emergentagent.com
2. Preencha o formulário com dados de teste
3. Envie o cadastro
4. Verifique seu email (rnobregacorretor@gmail.com)

### 5. Verifique logs (se não receber)

```bash
tail -n 50 /var/log/supervisor/backend.out.log | grep -i "notification"
```

---

## 🔧 Troubleshooting

### "Não recebi o email"

**1. Verifique se está ativado:**
```bash
grep EMAIL_NOTIFICATIONS_ENABLED /app/backend/.env
```
Deve mostrar: `EMAIL_NOTIFICATIONS_ENABLED=true`

**2. Verifique a senha:**
```bash
grep SMTP_PASSWORD /app/backend/.env
```
Deve ter a senha de app (16 caracteres)

**3. Verifique os logs:**
```bash
tail -n 100 /var/log/supervisor/backend.err.log
```

**4. Verifique spam/lixo eletrônico:**
- Olhe na pasta de spam do Gmail
- Adicione o remetente aos contatos

### "Erro ao enviar email"

**Possíveis causas:**
- ✅ Senha de app incorreta
- ✅ Verificação em 2 etapas não ativada
- ✅ Email_NOTIFICATIONS_ENABLED está false
- ✅ Backend não foi reiniciado após configurar

**Solução:**
1. Gere nova senha de app
2. Atualize o .env
3. Reinicie: `sudo supervisorctl restart backend`
4. Teste novamente

---

## 📊 Estatísticas de Notificações

Você pode ver quantas notificações foram enviadas nos logs:

```bash
grep "notification sent" /var/log/supervisor/backend.out.log | wc -l
```

---

## 🎯 Próximos Passos

**Para Ativar Agora:**

1. **Gere a senha de app do Gmail**
   - Guia: `/app/GUIA_SENHA_GMAIL.md`
   - Link: https://myaccount.google.com/apppasswords

2. **Me envie a senha gerada**
   - Vou configurar tudo para você
   - E fazer um teste

3. **Pronto!**
   - Você começará a receber emails automaticamente
   - Cada novo cadastro = 1 notificação

---

## 📞 Suas Configurações

**Email de Notificação:** rnobregacorretor@gmail.com  
**WhatsApp:** +5561985309658  
**Status Email:** ⏳ Aguardando senha de app  
**Status WhatsApp:** ⏳ Aguardando ativação

---

## ✅ Checklist de Ativação

- [ ] Gerar senha de app do Gmail
- [ ] Enviar senha para configurar
- [ ] Ativar EMAIL_NOTIFICATIONS_ENABLED=true
- [ ] Reiniciar backend
- [ ] Fazer cadastro teste
- [ ] Verificar recebimento do email
- [ ] (Opcional) Ativar WhatsApp

---

**🚀 Assim que você me enviar a senha de app, ativo tudo em 2 minutos!**
