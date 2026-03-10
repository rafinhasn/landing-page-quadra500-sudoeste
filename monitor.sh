#!/bin/bash

# Script de Monitoramento do Site Quadra 500 Sudoeste
# Verifica se todos os serviços estão funcionando

echo "🔍 MONITORAMENTO - QUADRA 500 SUDOESTE"
echo "======================================"
echo "Data: $(date '+%d/%m/%Y %H:%M:%S')"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# URL do site
SITE_URL="https://lead-capture-56.stage-preview.emergentagent.com"
API_URL="$SITE_URL/api/"

# 1. Verificar Status dos Serviços
echo "📊 Status dos Serviços:"
echo "----------------------"
sudo supervisorctl status | while read line; do
    if echo "$line" | grep -q "RUNNING"; then
        echo -e "${GREEN}✓${NC} $line"
    else
        echo -e "${RED}✗${NC} $line"
    fi
done
echo ""

# 2. Verificar Site Frontend
echo "🌐 Testando Site (Frontend):"
echo "----------------------------"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL")
if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✓${NC} Site respondendo (HTTP $HTTP_STATUS)"
else
    echo -e "${RED}✗${NC} Site com problema (HTTP $HTTP_STATUS)"
fi
echo ""

# 3. Verificar API Backend
echo "🔌 Testando API (Backend):"
echo "--------------------------"
API_RESPONSE=$(curl -s "$API_URL")
if echo "$API_RESPONSE" | grep -q "healthy"; then
    echo -e "${GREEN}✓${NC} API funcionando"
    echo "   Resposta: $API_RESPONSE"
else
    echo -e "${RED}✗${NC} API com problema"
fi
echo ""

# 4. Verificar MongoDB
echo "🗄️  Testando MongoDB:"
echo "--------------------"
MONGO_STATUS=$(sudo supervisorctl status mongodb | grep RUNNING)
if [ ! -z "$MONGO_STATUS" ]; then
    echo -e "${GREEN}✓${NC} MongoDB rodando"
    
    # Contar leads
    LEAD_COUNT=$(echo "use test_database; db.leads.countDocuments()" | mongosh --quiet 2>/dev/null || echo "N/A")
    echo "   Total de leads: $LEAD_COUNT"
else
    echo -e "${RED}✗${NC} MongoDB parado"
fi
echo ""

# 5. Verificar Espaço em Disco
echo "💾 Espaço em Disco:"
echo "------------------"
DISK_USAGE=$(df -h / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    echo -e "${GREEN}✓${NC} Espaço OK ($DISK_USAGE% usado)"
else
    echo -e "${YELLOW}⚠${NC} Espaço baixo ($DISK_USAGE% usado)"
fi
echo ""

# 6. Verificar Memória
echo "🧠 Uso de Memória:"
echo "-----------------"
MEM_USAGE=$(free | grep Mem | awk '{print int($3/$2 * 100)}')
if [ "$MEM_USAGE" -lt 90 ]; then
    echo -e "${GREEN}✓${NC} Memória OK ($MEM_USAGE% usado)"
else
    echo -e "${YELLOW}⚠${NC} Memória alta ($MEM_USAGE% usado)"
fi
echo ""

# 7. Últimos Erros
echo "⚠️  Últimos Erros (se houver):"
echo "-----------------------------"
ERRORS=$(tail -n 20 /var/log/supervisor/backend.err.log | grep -i "error" | tail -3)
if [ -z "$ERRORS" ]; then
    echo -e "${GREEN}✓${NC} Nenhum erro recente"
else
    echo -e "${YELLOW}⚠${NC} Erros encontrados:"
    echo "$ERRORS"
fi
echo ""

# 8. Resumo Final
echo "📋 RESUMO:"
echo "=========="

ALL_OK=true

# Verificar cada componente
if ! sudo supervisorctl status | grep -q "backend.*RUNNING"; then
    ALL_OK=false
fi
if ! sudo supervisorctl status | grep -q "frontend.*RUNNING"; then
    ALL_OK=false
fi
if ! sudo supervisorctl status | grep -q "mongodb.*RUNNING"; then
    ALL_OK=false
fi
if [ "$HTTP_STATUS" != "200" ]; then
    ALL_OK=false
fi

if $ALL_OK; then
    echo -e "${GREEN}✓ TODOS OS SISTEMAS OPERACIONAIS${NC}"
    echo "✅ Site está ONLINE e funcionando perfeitamente!"
else
    echo -e "${RED}✗ ALGUNS PROBLEMAS DETECTADOS${NC}"
    echo "❌ Verifique os itens marcados em vermelho acima"
fi

echo ""
echo "======================================"
echo "Próxima verificação: Execute novamente este script"
echo "Comando: bash /app/monitor.sh"
