# PRD - Landing Page Quadra 500 Sudoeste

## Informações do Projeto
**Nome**: Landing Page Quadra 500 Sudoeste  
**Data de Início**: 14 de Fevereiro de 2025  
**Tipo**: Landing Page para Captura de Leads  

## Problema Original
Criar uma landing page idêntica ao site da Emplavi para capturar informações de contatos interessados no empreendimento Quadra 500 Sudoeste.

**Link de Referência**: https://lp.emplavi.com.br/lancamento-sudoeste

## Arquitetura
- **Frontend**: React com Shadcn UI
- **Backend**: FastAPI + MongoDB (não implementado ainda)
- **Estado Atual**: Frontend-only com mock data

## Personas de Usuário
1. **Potenciais Compradores**: Pessoas interessadas em apartamentos de luxo no Sudoeste de Brasília
2. **Administrador**: Equipe de vendas que receberá os leads

## Requisitos Principais

### Campos do Formulário
- Nome (obrigatório)
- Email (obrigatório)
- Celular (obrigatório)
- Número de quartos (obrigatório): opções 2, 3, 4 ou 5 quartos

### Design
- Design luxuoso e elegante com fundo preto
- Imagens dos empreendimentos fornecidas pelo cliente
- Botões CTAs em dourado/âmbar (amber-600)
- Formulário com backdrop blur (glass-morphism)
- Animações suaves e transições
- Layout responsivo

## O Que Foi Implementado (14/02/2025)

### ✅ Fase 1 - Frontend com Mock Data
- [x] Componente Home.jsx com todas as seções
- [x] Hero section com imagem de fundo e título principal
- [x] Formulário de cadastro completo com validação (react-hook-form + zod)
- [x] Seções de features com as imagens fornecidas
- [x] CTAs ao longo da página
- [x] Footer informativo
- [x] mockData.js para armazenar submissions temporariamente
- [x] Toasts de feedback (sonner)
- [x] Design responsivo e elegante
- [x] Animações e transições suaves
- [x] **WhatsApp Business Integration** (+55 61 98530-9658)
  - Botão flutuante no canto inferior direito com animação pulse
  - Link direto no hero section
  - Número visível no footer
  - Mensagem pré-formatada: "Olá! Gostaria de saber mais informações sobre o lançamento Quadra 500 Sudoeste."

### Tecnologias Utilizadas
- React 19
- React Hook Form + Zod para validação
- Shadcn UI (Button, Input, Label, Select, Toaster)
- Tailwind CSS
- Lucide React (ícones)

## Backlog Priorizado

### P0 - Backend e Integração (Próxima Fase)
- [ ] Criar modelo MongoDB para Leads
- [ ] Endpoints API:
  - POST /api/leads - Criar novo lead
  - GET /api/leads - Listar todos os leads (admin)
- [ ] Integrar frontend com backend
- [ ] Remover mockData.js
- [ ] Validação de dados no backend
- [ ] Tratamento de erros

### P1 - Melhorias
- [ ] Painel administrativo para visualizar leads
- [ ] Exportar leads para CSV/Excel
- [ ] Envio de email de confirmação ao lead
- [ ] Notificação para equipe de vendas
- [ ] Máscaras de input (telefone brasileiro)
- [ ] Google Analytics / Meta Pixel tracking
- [ ] WhatsApp integration

### P2 - Otimizações
- [ ] SEO optimization (meta tags, Open Graph)
- [ ] Lazy loading de imagens
- [ ] Compressão de imagens
- [ ] Cache de assets
- [ ] Testes automatizados

## Próximos Passos
1. Aguardar confirmação do usuário para desenvolvimento do backend
2. Implementar backend com MongoDB
3. Integrar frontend com backend
4. Testes end-to-end
5. Deploy em produção
