# 📤 Guia: Como Exportar para o GitHub

## Passo 1: Criar Repositório no GitHub

1. Acesse https://github.com
2. Clique em **"New repository"** (botão verde)
3. Preencha as informações:
   - **Repository name:** `landing-page-quadra500-sudoeste` (ou nome de sua preferência)
   - **Description:** Landing page para captura de leads - Quadra 500 Sudoeste
   - **Visibility:** 
     - ✅ Private (recomendado - código ficará privado)
     - ⬜ Public (se quiser deixar público)
   - ⚠️ **NÃO** marque "Initialize this repository with a README" (já temos um)
4. Clique em **"Create repository"**

## Passo 2: Copiar a URL do Repositório

Após criar, você verá uma página com instruções. Copie a URL que aparece, algo como:
```
https://github.com/SEU-USUARIO/landing-page-quadra500-sudoeste.git
```

## Passo 3: Executar os Comandos

**⚠️ IMPORTANTE:** Substitua `[URL-DO-SEU-REPO]` pela URL que você copiou no Passo 2.

Execute os seguintes comandos no terminal:

```bash
# 1. Navegar para o diretório do projeto
cd /app

# 2. Adicionar o remote do GitHub (SUBSTITUA A URL!)
git remote add github [URL-DO-SEU-REPO]

# Exemplo:
# git remote add github https://github.com/joaosilva/landing-page-quadra500.git

# 3. Verificar se o remote foi adicionado
git remote -v

# 4. Fazer push para o GitHub
git push -u github main
```

## Passo 4: Autenticação

Quando executar o `git push`, o GitHub pode pedir autenticação:

### Opção A: HTTPS (mais simples)
- **Username:** seu-usuario-github
- **Password:** use um **Personal Access Token** (não a senha da conta)

**Como criar um Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Selecione: `repo` (acesso completo ao repositório)
4. Copie o token gerado e use como senha

### Opção B: SSH (recomendado para uso frequente)
```bash
# Gerar chave SSH
ssh-keygen -t ed25519 -C "seu-email@example.com"

# Adicionar ao ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copiar chave pública
cat ~/.ssh/id_ed25519.pub

# Adicionar no GitHub:
# Settings → SSH and GPG keys → New SSH key
# Cole a chave e salve

# Trocar remote para SSH
git remote set-url github git@github.com:SEU-USUARIO/NOME-REPO.git
```

## Passo 5: Verificar no GitHub

1. Acesse seu repositório no GitHub
2. Você deverá ver todos os arquivos do projeto
3. O README.md será exibido na página principal

## 📋 Comandos Resumidos (copie e cole)

```bash
# Substitua [URL] pela sua URL do GitHub
cd /app
git remote add github [URL-DO-SEU-REPO]
git push -u github main
```

## 🔐 Arquivos Sensíveis (já protegidos)

Os seguintes arquivos **NÃO** serão enviados ao GitHub (estão no .gitignore):
- `/frontend/.env` (configurações locais)
- `/backend/.env` (configurações locais)
- `node_modules/` (dependências)
- `__pycache__/` (cache Python)
- `.venv/` (ambiente virtual Python)

## ✅ Após o Push

Seu código estará no GitHub! Você pode:
1. Compartilhar o link do repositório
2. Fazer clone em outros computadores
3. Colaborar com outras pessoas
4. Configurar CI/CD
5. Deploy automático

## 🚀 Próximos Commits

Quando fizer alterações no código:
```bash
cd /app
git add .
git commit -m "Descrição das alterações"
git push github main
```

## ❓ Problemas Comuns

### "fatal: remote github already exists"
```bash
git remote remove github
git remote add github [URL-DO-SEU-REPO]
```

### "Permission denied"
- Verifique suas credenciais
- Use Personal Access Token ou configure SSH

### "Repository not found"
- Verifique se a URL está correta
- Confirme que o repositório foi criado no GitHub

## 📞 Suporte

Se precisar de ajuda, me avise!

---

**Seu código está pronto para ser compartilhado! 🎉**
