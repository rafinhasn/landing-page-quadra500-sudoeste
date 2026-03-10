#!/bin/bash
# Keep-Alive Service - Mantém o site ativo 24/7
# Faz requisições periódicas para evitar hibernação

LOG_FILE="/var/log/keepalive.log"
PING_INTERVAL=240  # 4 minutos

# URLs para manter ativas
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:8001/api/"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

ping_url() {
    local url=$1
    local http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" --max-time 10)
    
    if [ "$http_code" = "200" ]; then
        log "✓ Ping OK: $url (HTTP $http_code)"
        return 0
    else
        log "⚠ Ping com problema: $url (HTTP $http_code)"
        return 1
    fi
}

log "🚀 Keep-Alive Service iniciado"
log "⏱️ Intervalo: $PING_INTERVAL segundos ($(echo "scale=1; $PING_INTERVAL/60" | bc) minutos)"

ping_count=0

while true; do
    ping_count=$((ping_count + 1))
    log ""
    log "--- Ping #$ping_count ---"
    
    # Pingar frontend
    ping_url "$FRONTEND_URL"
    frontend_ok=$?
    
    # Pingar backend
    ping_url "$BACKEND_URL"
    backend_ok=$?
    
    if [ $frontend_ok -eq 0 ] && [ $backend_ok -eq 0 ]; then
        log "✅ Todos os serviços respondendo"
    else
        log "⚠️ Alguns serviços com problema"
    fi
    
    # Aguardar próximo ping
    sleep $PING_INTERVAL
done

