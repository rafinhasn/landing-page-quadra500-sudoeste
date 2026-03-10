# 🚫 Impedindo o Agente de "Dormir"

## ✅ SISTEMA KEEP-ALIVE ATIVADO!

Seu site agora tem um serviço que impede a hibernação automática.

---

## 🛡️ O Que Foi Implementado

### 1. **Serviço Keep-Alive Automático**

Um script roda **24 horas por dia** fazendo requisições periódicas:

- ✅ Pinga o Frontend a cada 4 minutos
- ✅ Pinga o Backend a cada 4 minutos  
- ✅ Mantém todos os serviços ativos
- ✅ Logs de todas as atividades
- ✅ Reinicia automaticamente se cair

### 2. **Configuração**

**Arquivo:** `/app/keepalive.sh`

**Intervalo:** 240 segundos (4 minutos)

**Monitorando:**
- `http://localhost:3000` (Frontend)
- `http://localhost:8001/api/` (Backend API)

---

## 📊 Verificar Status

### Ver se está rodando:
```bash
sudo supervisorctl status keepalive
```

**Resultado esperado:**
```
keepalive   RUNNING   pid 367, uptime 0:05:23  ✅
```

### Ver logs do Keep-Alive:
```bash
tail -f /var/log/keepalive.log
```

**Você verá algo como:**
```
[2026-03-10 19:23:27] --- Ping #1 ---
[2026-03-10 19:23:27] ✓ Ping OK: http://localhost:3000 (HTTP 200)
[2026-03-10 19:23:27] ✓ Ping OK: http://localhost:8001/api/ (HTTP 200)
[2026-03-10 19:23:27] ✅ Todos os serviços respondendo
```

### Ver todos os serviços:
```bash
sudo supervisorctl status
```

**Você deve ver:**
```
backend       RUNNING  ✅
frontend      RUNNING  ✅
mongodb       RUNNING  ✅
keepalive     RUNNING  ✅  ← NOVO!
```

---

## ⚙️ Controlar o Keep-Alive

### Parar (não recomendado):
```bash
sudo supervisorctl stop keepalive
```

### Iniciar:
```bash
sudo supervisorctl start keepalive
```

### Reiniciar:
```bash
sudo supervisorctl restart keepalive
```

### Ver logs em tempo real:
```bash
tail -f /var/log/keepalive.log
```

---

## 🔧 Configuração Personalizada

Se quiser ajustar o intervalo de ping:

### Edite o arquivo:
```bash
nano /app/keepalive.sh
```

### Altere a linha:
```bash
PING_INTERVAL=240  # 4 minutos
```

**Exemplos:**
- `PING_INTERVAL=120` → Pinga a cada 2 minutos (mais frequente)
- `PING_INTERVAL=300` → Pinga a cada 5 minutos (menos frequente)
- `PING_INTERVAL=60` → Pinga a cada 1 minuto (máximo)

### Depois de editar, reinicie:
```bash
sudo supervisorctl restart keepalive
```

---

## 📈 Camadas de Proteção Contra Hibernação

Seu site agora tem **3 camadas** de proteção:

### 1️⃣ **Keep-Alive Interno** ✅
- Script rodando 24/7
- Pinga a cada 4 minutos
- Supervisormonitorando

### 2️⃣ **Auto-Restart** ✅
- Se algum serviço cair, reinicia
- Configurado no supervisor

### 3️⃣ **Monitoramento Externo** (Recomendado)
Configure UptimeRobot para garantia extra:
- Acesse: https://uptimerobot.com
- Adicione seu site
- Pinga de fora a cada 5 minutos
- Alerta por email se cair

---

## 📊 Estatísticas de Atividade

### Ver quantos pings foram feitos:
```bash
grep "Ping #" /var/log/keepalive.log | wc -l
```

### Ver últimos 10 pings:
```bash
grep "Ping #" /var/log/keepalive.log | tail -10
```

### Ver se houve algum problema:
```bash
grep "problema" /var/log/keepalive.log
```

---

## 🎯 Garantia de Disponibilidade

Com o Keep-Alive ativo, seu site:

- ✅ **NÃO hiberna** por inatividade
- ✅ **Mantém serviços ativos** 24/7
- ✅ **Detecta problemas** rapidamente
- ✅ **Registra tudo** em logs
- ✅ **Reinicia automaticamente** se necessário

---

## 🔍 Teste Rápido

Veja o Keep-Alive em ação agora:

```bash
# Ver últimos 20 logs
tail -n 20 /var/log/keepalive.log
```

Você deve ver pings recentes (nos últimos 4 minutos).

---

## ⚠️ Troubleshooting

### "keepalive não está rodando"

**1. Verificar status:**
```bash
sudo supervisorctl status keepalive
```

**2. Ver erro:**
```bash
tail -n 50 /var/log/supervisor/keepalive.err.log
```

**3. Reiniciar:**
```bash
sudo supervisorctl restart keepalive
```

### "Muitos logs"

Se o arquivo de log ficar muito grande:

**Limpar logs antigos:**
```bash
> /var/log/keepalive.log
```

**Rotacionar logs (automático):**
O sistema já faz rotação automática de logs.

---

## 💡 Melhor Prática

### Combinação Perfeita:

**1. Keep-Alive Interno (Ativo)** ✅
- Pinga a cada 4 minutos
- Mantém serviços acordados

**2. UptimeRobot (Configure)** ⭐
- Pinga de fora a cada 5 minutos
- Alerta se cair
- Grátis: https://uptimerobot.com

**3. Monitoramento Manual**
- Execute `bash /app/monitor.sh` diariamente
- Verifique se tudo está OK

---

## 📞 Comandos Úteis

```bash
# Ver status completo
sudo supervisorctl status

# Ver logs do keep-alive
tail -f /var/log/keepalive.log

# Ver último ping
tail -n 5 /var/log/keepalive.log

# Testar manualmente
bash /app/monitor.sh

# Reiniciar tudo
sudo supervisorctl restart all
```

---

## ✅ Checklist Final

- [x] Keep-Alive instalado
- [x] Keep-Alive rodando
- [x] Auto-restart configurado
- [x] Pings a cada 4 minutos
- [x] Logs funcionando
- [ ] UptimeRobot configurado (recomendado)

---

## 🎉 Resumo

**Seu site agora:**
- ✅ NÃO hiberna por inatividade
- ✅ Mantém-se ativo 24/7
- ✅ Auto-monitora e auto-reinicia
- ✅ Registra toda atividade

**Status:** 🟢 **SEMPRE ATIVO**

---

**Última atualização:** ${new Date().toLocaleString('pt-BR')}
