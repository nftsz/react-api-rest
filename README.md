# 🖼️ Projeto Fullstack –  Galeria de Imagens com Django REST Framework + ReactJS + TypeScript
![GitHub top language](https://img.shields.io/github/languages/top/nftsz/academic-web-fullstack) 
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/nftsz/academic-web-fullstack/main)

Aplicação fullstack para gerenciamento de uma **galeria de imagens**, desenvolvida com:

* **Backend:** Django + Django REST Framework
* **Frontend:** React + TypeScript (Vite)
* **Autenticação:** JWT com httpOnly cookies

O sistema permite que usuários autenticados cadastrem, visualizem, editem e removam imagens.

## 📸 Preview

<img width="1920" height="1080" alt="Screenshot From 2026-05-03 12-27-51" src="https://github.com/user-attachments/assets/8f0a76fd-1743-457f-8888-4c2cd85e14f5" />
<img width="1920" height="1080" alt="Screenshot From 2026-05-03 12-27-59" src="https://github.com/user-attachments/assets/84c75a6a-8e63-42c9-b94e-10767ccd1ce5" />
<img width="1920" height="1080" alt="Screenshot From 2026-05-03 12-28-08" src="https://github.com/user-attachments/assets/4a3dd647-5435-4a62-b5ea-e886d89a1f69" />

## 📁 Estrutura do Projeto

```bash
/backend      # API Django REST
/frontend     # Aplicação React + TypeScript
```


## 🚀 Como Executar

### 🔧 Backend

```bash
cd backend

python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Servidor:
👉 http://localhost:8000


### 💻 Frontend

```bash
cd frontend

npm install
```

Crie o arquivo `.env.local`:

```
VITE_API_URL=http://localhost:8000
```

Inicie:

```bash
npm run dev
```

Acesse:
👉 http://localhost:5173

## 🧠 Funcionalidades

### 🔐 Autenticação

* Login e logout com JWT
* Armazenamento seguro via httpOnly cookies
* Proteção de rotas no frontend

### 🖼️ Galeria de Imagens

* Cadastro de imagens com título, descrição e imagem (por link)
* Listagem paginada
* Visualização de detalhes
* Edição e exclusão
* Acesso restrito a usuários autenticados


## ⚙️ Tecnologias Utilizadas

### Backend

* Django
* Django REST Framework

### Frontend

* React
* TypeScript
* Vite
* React Hook Form
* Yup
* Tailwind CSS

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido para praticar:

* Integração entre frontend e backend
* Consumo de APIs REST
* Autenticação com JWT
* Manipulação de formulários com validação
* Organização de código em aplicações fullstack

---

Se você curtiu o projeto, considere deixar uma ⭐ no repositório!

