# 🎨 Painel Administrativo - Guia de Uso

## 🔐 Como Acessar

### 1. URL de Acesso
```
https://seu-dominio/admin/login
```

### 2. Senha Padrão
```
quadra500admin
```

**⚠️ IMPORTANTE:** Após o primeiro acesso, recomendamos alterar a senha!

---

## 📊 Funcionalidades do Painel

### 1. Dashboard com Estatísticas
- **Total de Leads**: Visualize quantos cadastros foram realizados
- **Leads por Tipo**: Veja a distribuição de interesse (2, 3, 4 ou 5 quartos)
- **Percentuais**: Entenda qual imóvel tem mais procura

### 2. Tabela de Leads
- ✅ Nome completo
- ✅ Email (clique para enviar email)
- ✅ Telefone (clique para abrir WhatsApp)
- ✅ Tipo de imóvel desejado
- ✅ Data e hora do cadastro

### 3. Busca e Filtros
- 🔍 Busque por nome, email ou telefone
- ⚡ Busca instantânea em tempo real

### 4. Exportar Dados
- 📥 **Exportar CSV**: Baixe todos os leads em formato Excel/CSV
- 📊 Perfeito para importar em CRM ou planilhas

### 5. Gerenciamento
- 🗑️ Delete leads duplicados ou inválidos
- 🔄 Atualize os dados em tempo real
- 📱 Acesso responsivo (funciona no celular)

---

## 🎯 Como Usar

### Acessar o Painel
1. Vá para `https://seu-dominio/admin/login`
2. Digite a senha: `quadra500admin`
3. Clique em "Entrar no Painel"

### Ver Todos os Leads
1. Após o login, você verá automaticamente todos os leads
2. A tabela mostra as informações mais recentes primeiro

### Buscar um Lead Específico
1. Use a barra de busca no topo
2. Digite nome, email ou telefone
3. Os resultados aparecem instantaneamente

### Exportar para Excel
1. Clique no botão "Exportar CSV" (verde)
2. O arquivo será baixado automaticamente
3. Abra no Excel, Google Sheets ou qualquer programa de planilhas

### Entrar em Contato com um Lead
- **Email**: Clique no email para abrir seu cliente de email
- **WhatsApp**: Clique no telefone para abrir conversa no WhatsApp

### Deletar um Lead
1. Clique no ícone de lixeira (🗑️) na linha do lead
2. Confirme a ação
3. O lead será removido permanentemente

### Sair do Painel
- Clique em "Sair" no canto superior direito
- Será necessário fazer login novamente

---

## 🔐 Segurança

### Alterar a Senha (Recomendado)

Para alterar a senha padrão, edite o arquivo:
`/app/frontend/src/pages/AdminLogin.jsx`

Linha 13:
```javascript
const ADMIN_PASSWORD = 'quadra500admin';  // Altere aqui
```

Troque para uma senha forte:
```javascript
const ADMIN_PASSWORD = 'MinhaS3nh@F0rt3!2025';
```

### Dicas de Segurança
- ✅ Use senha forte (letras, números e símbolos)
- ✅ Não compartilhe a senha
- ✅ Faça logout ao sair
- ✅ Acesse apenas por conexões seguras (HTTPS)

---

## 📱 Acesso Rápido

### No Computador
1. Adicione aos favoritos: `https://seu-dominio/admin`
2. Crie um atalho na área de trabalho

### No Celular
1. Abra o navegador (Chrome/Safari)
2. Acesse `https://seu-dominio/admin`
3. Adicione à tela inicial:
   - **iPhone**: Safari → Compartilhar → Adicionar à Tela de Início
   - **Android**: Chrome → ⋮ → Adicionar à tela inicial

---

## 🎨 Interface

### Cores dos Badges (Tipo de Imóvel)
- 💜 **Roxo**: 2 quartos (Residencial Ametista)
- 🔵 **Azul**: 3 quartos
- 🔴 **Vermelho**: 4 quartos (Residencial Rubi)
- 🟡 **Amarelo**: 5 quartos

---

## 💡 Dicas de Uso

### Gestão Diária
1. **Manhã**: Acesse o painel e veja novos leads
2. **Priorize**: Contate leads mais recentes primeiro
3. **Organize**: Exporte semanalmente para backup

### Relatórios
- Exporte CSV semanalmente
- Compare quantidade de leads por período
- Identifique qual tipo de imóvel tem mais procura

### Follow-up
- Use os links diretos de WhatsApp para agilizar contato
- Anote informações importantes em seu CRM
- Delete leads que já foram convertidos em vendas

---

## 🆘 Problemas Comuns

### "Não consigo fazer login"
- Verifique se a senha está correta: `quadra500admin`
- Limpe o cache do navegador
- Tente em modo anônimo

### "Não aparecem leads"
- Clique em "Atualizar"
- Verifique sua conexão com internet
- Confirme que há leads cadastrados no sistema

### "Exportar CSV não funciona"
- Verifique se seu navegador permite downloads
- Tente em outro navegador
- O arquivo vai para sua pasta de Downloads

### "Fui desconectado"
- Faça login novamente
- A sessão expira por segurança após inatividade

---

## 📞 URLs Importantes

- **Landing Page**: https://seu-dominio
- **Painel Admin**: https://seu-dominio/admin
- **Login Admin**: https://seu-dominio/admin/login
- **API Docs**: https://seu-dominio/api/docs

---

## 🚀 Próximas Funcionalidades (Futuras)

Podemos adicionar:
- 📧 Notificações por email de novos leads
- 📊 Gráficos interativos
- 📅 Filtros por data
- 🏷️ Tags personalizadas para leads
- 💬 Notas sobre cada lead
- 📤 Exportar para PDF
- 🔄 Sincronização com CRM

---

## ✅ Checklist Diário

- [ ] Acessar o painel
- [ ] Verificar novos leads
- [ ] Entrar em contato com leads recentes
- [ ] Atualizar status no CRM
- [ ] Fazer backup semanal (exportar CSV)

---

**Painel criado por Emergent AI para Quadra 500 Sudoeste** 🏢
