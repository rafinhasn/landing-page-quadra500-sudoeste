# 🏢 Landing Page Quadra 500 Sudoeste

Landing page profissional para captura de leads do lançamento imobiliário Quadra 500 Sudoeste, com design luxuoso e integração completa com WhatsApp Business.

## 🌟 Características

- 📱 Design responsivo e elegante (fundo preto luxuoso)
- 📝 Formulário de captura de leads com validação
- 💜 Seção especial Residencial Ametista (único 2 quartos)
- 🔴 Seção especial Residencial Rubi (4 suítes com vista livre)
- 📞 Integração com WhatsApp Business
- 🎨 Animações e efeitos hover sofisticados
- 🗄️ Backend com FastAPI + MongoDB
- ✅ API REST completa

## 🚀 Tecnologias

**Frontend:**
- React 19
- Shadcn UI
- Tailwind CSS
- React Hook Form + Zod
- Lucide React Icons

**Backend:**
- FastAPI
- MongoDB (Motor)
- Pydantic
- Python 3.11+

## 📋 Pré-requisitos

- Node.js 16+
- Python 3.11+
- MongoDB
- Yarn

## ⚙️ Instalação

### 1. Clone o repositório
```bash
git clone [URL-DO-SEU-REPO]
cd [NOME-DO-REPO]
```

### 2. Configure o Frontend
```bash
cd frontend
yarn install
cp .env.example .env
# Edite o .env com suas configurações
```

### 3. Configure o Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edite o .env com suas configurações
```

### 4. Configure o MongoDB
Certifique-se de que o MongoDB está rodando e atualize a `MONGO_URL` no `.env` do backend.

## 🏃 Executando

### Frontend
```bash
cd frontend
yarn start
```
Acesse: http://localhost:3000

### Backend
```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```
Acesse: http://localhost:8001/docs

## 📡 API Endpoints

- `GET /api/` - Health check
- `POST /api/leads` - Criar novo lead
- `GET /api/leads` - Listar todos os leads
- `GET /api/leads/stats` - Estatísticas de leads
- `GET /api/leads/{id}` - Buscar lead específico
- `DELETE /api/leads/{id}` - Deletar lead

## 🗄️ Estrutura do Banco de Dados

**Collection: leads**
```json
{
  "_id": "uuid",
  "nome": "string",
  "email": "string (único)",
  "celular": "string",
  "quartos": "string (2, 3, 4 ou 5)",
  "created_at": "datetime"
}
```

## 📱 Funcionalidades

### Formulário de Captura
- Nome (obrigatório)
- Email (obrigatório, único)
- Celular (obrigatório)
- Número de quartos: 2, 3, 4 ou 5 (obrigatório)

### Validações
- Validação em tempo real
- Prevenção de emails duplicados
- Mensagens de erro amigáveis
- Toast notifications

### WhatsApp Business
- Botão flutuante com animação pulse
- Link no hero section
- Número no footer: +55 61 98530-9658
- Mensagem pré-formatada

## 🎨 Design

- Tema luxuoso com fundo preto
- Glass-morphism no formulário
- Cores temáticas:
  - 🟡 Dourado/Âmbar para CTAs principais
  - 💜 Roxo para Residencial Ametista
  - 🔴 Vermelho para Residencial Rubi
- Animações suaves e transições
- Efeitos hover em todos os elementos interativos

## 📁 Estrutura do Projeto

```
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/          # Componentes Shadcn
│   │   ├── pages/
│   │   │   └── Home.jsx     # Landing page principal
│   │   ├── App.js
│   │   └── index.css
│   ├── public/
│   └── package.json
├── backend/
│   ├── routes/
│   │   └── leads.py         # Rotas de leads
│   ├── server.py            # FastAPI app
│   ├── database.py          # Conexão MongoDB
│   ├── models.py            # Modelos Pydantic
│   └── requirements.txt
├── BACKEND_GUIDE.md         # Guia completo do backend
├── RESUMO_PROJETO.md        # Resumo do projeto
└── README.md
```

## 🧪 Testes

Backend: ✅ 100% (8/8 testes passaram)
Frontend: ✅ 90% (integração completa funcionando)

## 📖 Documentação Adicional

- [Guia do Backend](/BACKEND_GUIDE.md) - Documentação completa da API
- [Resumo do Projeto](/RESUMO_PROJETO.md) - Visão geral e features

## 🔐 Variáveis de Ambiente

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=quadra500
CORS_ORIGINS=*
```

## 🚀 Deploy

A aplicação está pronta para deploy em:
- Frontend: Vercel, Netlify, AWS S3
- Backend: Heroku, Railway, AWS EC2, DigitalOcean
- Database: MongoDB Atlas

## 📞 Contato

WhatsApp Business: +55 61 98530-9658

## 📄 Licença

Este projeto foi desenvolvido para o lançamento Quadra 500 Sudoeste.

---

**Desenvolvido com ❤️ por Emergent AI**
