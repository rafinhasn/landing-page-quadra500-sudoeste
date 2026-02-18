# 📊 Como Acessar os Cadastros do Site

## 🎯 Opções Disponíveis

### Opção 1: Via API (Mais Simples) ⭐ Recomendado

#### 1.1 Ver Todos os Leads
```bash
# Obter a URL do backend
API_URL=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)

# Listar todos os leads
curl -X GET "$API_URL/api/leads"
```

**Resposta:**
```json
[
  {
    "_id": "uuid-123",
    "nome": "João Silva",
    "email": "joao@example.com",
    "celular": "61999887766",
    "quartos": "4",
    "created_at": "2026-02-14T18:55:05.423000"
  },
  {
    "_id": "uuid-456",
    "nome": "Maria Santos",
    "email": "maria@example.com",
    "celular": "61988776655",
    "quartos": "2",
    "created_at": "2026-02-14T19:10:22.123000"
  }
]
```

#### 1.2 Ver Estatísticas
```bash
curl -X GET "$API_URL/api/leads/stats"
```

**Resposta:**
```json
{
  "total": 15,
  "por_quartos": {
    "2": 5,
    "3": 3,
    "4": 6,
    "5": 1
  }
}
```

#### 1.3 Buscar Lead Específico
```bash
# Substitua LEAD_ID pelo ID do lead
curl -X GET "$API_URL/api/leads/LEAD_ID"
```

#### 1.4 Exportar para Arquivo
```bash
# Salvar todos os leads em um arquivo JSON
curl -X GET "$API_URL/api/leads" > leads.json

# Ver os leads de forma formatada
curl -X GET "$API_URL/api/leads" | python3 -m json.tool
```

---

### Opção 2: Via MongoDB Direto

#### 2.1 Acessar MongoDB
```bash
# Conectar ao MongoDB
mongosh

# Selecionar o banco de dados
use quadra500

# Ver todos os leads
db.leads.find().pretty()

# Contar total de leads
db.leads.countDocuments()

# Leads cadastrados hoje
db.leads.find({
  created_at: {
    $gte: new Date(new Date().setHours(0,0,0,0))
  }
}).pretty()

# Leads por número de quartos
db.leads.aggregate([
  { $group: { _id: "$quartos", count: { $sum: 1 } } }
])

# Exportar para CSV
mongoexport --db=quadra500 --collection=leads --type=csv --fields=nome,email,celular,quartos,created_at --out=leads.csv
```

---

### Opção 3: Usando Ferramentas Gráficas

#### 3.1 MongoDB Compass (GUI para MongoDB)
1. Baixe: https://www.mongodb.com/try/download/compass
2. Conecte com a URL do MongoDB
3. Navegue até database `quadra500` → collection `leads`
4. Visualize, filtre e exporte os dados

#### 3.2 Postman (Testar API)
1. Baixe: https://www.postman.com/downloads/
2. Crie uma nova requisição GET
3. URL: `https://seu-dominio/api/leads`
4. Clique em "Send"
5. Visualize os dados formatados

---

## 📥 Exportar Dados

### Para Excel/CSV via Python
Crie um script `export_leads.py`:

```python
import requests
import csv
from datetime import datetime

# URL da API
API_URL = "https://seu-dominio/api/leads"

# Buscar leads
response = requests.get(API_URL)
leads = response.json()

# Criar arquivo CSV
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
filename = f"leads_{timestamp}.csv"

with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['Nome', 'Email', 'Celular', 'Quartos', 'Data Cadastro']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    
    writer.writeheader()
    for lead in leads:
        writer.writerow({
            'Nome': lead['nome'],
            'Email': lead['email'],
            'Celular': lead['celular'],
            'Quartos': lead['quartos'],
            'Data Cadastro': lead['created_at']
        })

print(f"✅ Dados exportados para {filename}")
print(f"📊 Total de leads: {len(leads)}")
```

Execute:
```bash
python3 export_leads.py
```

---

## 🔔 Receber Notificações de Novos Leads

### Via Webhook (Implementação Futura)
Podemos configurar para enviar:
- 📧 Email quando novo lead cadastrar
- 📱 Mensagem no WhatsApp
- 📊 Integração com CRM (RD Station, HubSpot, etc)

---

## 📊 Dashboards e Relatórios

### Criar Relatório Rápido
```bash
#!/bin/bash
# relatorio_leads.sh

API_URL="https://seu-dominio"

echo "📊 RELATÓRIO DE LEADS - $(date '+%d/%m/%Y %H:%M')"
echo "=================================================="
echo ""

# Total de leads
TOTAL=$(curl -s "$API_URL/api/leads/stats" | python3 -c "import sys,json; print(json.load(sys.stdin)['total'])")
echo "Total de Leads: $TOTAL"
echo ""

# Por tipo de imóvel
echo "Leads por tipo de imóvel:"
curl -s "$API_URL/api/leads/stats" | python3 -c "
import sys, json
stats = json.load(sys.stdin)
for quartos, count in sorted(stats['por_quartos'].items()):
    print(f'  {quartos} quartos: {count} leads')
"
echo ""

# Últimos 5 leads
echo "Últimos 5 cadastros:"
curl -s "$API_URL/api/leads" | python3 -c "
import sys, json
leads = json.load(sys.stdin)
for i, lead in enumerate(leads[:5], 1):
    print(f'{i}. {lead[\"nome\"]} - {lead[\"email\"]} - {lead[\"quartos\"]} quartos')
"
```

Execute:
```bash
chmod +x relatorio_leads.sh
./relatorio_leads.sh
```

---

## 🎯 Acesso Rápido Via Navegador

### Swagger UI (Documentação Interativa da API)
Acesse: **https://seu-dominio/api/docs**

Você pode:
- ✅ Visualizar todos os endpoints
- ✅ Testar as APIs diretamente no navegador
- ✅ Ver exemplos de requisições e respostas
- ✅ Executar queries sem precisar de código

---

## 💡 Painel Administrativo Web (Recomendado)

**Posso criar um painel administrativo completo para você!**

### Funcionalidades:
- 📊 Dashboard com gráficos e estatísticas
- 📋 Lista de todos os leads com filtros
- 🔍 Busca por nome, email, telefone
- 📥 Exportar para Excel/CSV com um clique
- 📱 Visualizar em tempo real novos cadastros
- 🗑️ Deletar leads indesejados
- 📈 Gráficos de conversão por tipo de imóvel
- 📅 Filtrar por data de cadastro

**Quer que eu crie esse painel administrativo para você?**

---

## 📞 Exemplo Prático: Ver Leads Agora

Execute estes comandos no terminal:

```bash
# 1. Ver URL da API
grep REACT_APP_BACKEND_URL /app/frontend/.env

# 2. Ver todos os leads
API_URL=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
curl -s "$API_URL/api/leads" | python3 -m json.tool

# 3. Ver estatísticas
curl -s "$API_URL/api/leads/stats" | python3 -m json.tool

# 4. Contar total
curl -s "$API_URL/api/leads" | python3 -c "import sys,json; print(f'Total de leads: {len(json.load(sys.stdin))}')"
```

---

## 🎯 Recomendação

Para facilitar o dia a dia, recomendo criar um **painel administrativo web** onde você pode:
- Ver todos os leads em uma tabela bonita
- Exportar com um clique
- Ver estatísticas em tempo real
- Acessar de qualquer lugar pelo navegador

**Deseja que eu crie esse painel para você? É rápido e vai facilitar muito o gerenciamento dos leads! 🚀**
