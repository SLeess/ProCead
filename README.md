# ProCead - Sistema de Processos Seletivos

ProCead é uma aplicação web full-stack projetada para gerenciar processos seletivos de forma completa, desde a criação de editais até a gestão de usuários, permissões e auditoria de atividades no sistema.

## Arquitetura

O sistema é construído sobre uma arquitetura moderna de API REST e SPA (Single-Page Application):

  * **Backend:** Uma API RESTful desenvolvida com **Laravel 11**. É responsável por toda a lógica de negócio, interações com o banco de dados, autenticação e autorização.
  * **Frontend:** Uma SPA desenvolvida com **React**. Consome a API do Laravel para criar uma interface de usuário dinâmica e reativa, sem a necessidade de recarregar a página.

## Tech Stack

### Backend (PHP)

  * **Framework:** `Laravel 11`
  * **Autenticação:** `Laravel Sanctum`
  * **Cargos e Permissões:** `spatie/laravel-permission`
  * **Logs de Atividade:** `spatie/laravel-activitylog`
  * **Enums:** `bensampo/laravel-enum`
  * **Geração de PDF:** `barryvdh/laravel-dompdf`

### Frontend (JavaScript/React)

  * **Framework:** `React`
  * **Estilização:** `Tailwind CSS`
  * **Componentes de UI:** `Flowbite React`
  * **Tabelas:** `TanStack Table (React Table)`
  * **Roteamento:** `React Router`
  * **Requisições HTTP:** `JS Fetch`
  * **Validação de Formulários:** `Zod`
  * **Manipulação de Datas:** `date-fns`
  * **Ícones:** `Lucide React`

### Banco de Dados

  * MySQL (ou similar, compatível com Laravel Eloquent)

## Pré-requisitos

Antes de começar, garanta que você tenha o seguinte instalado em sua máquina:

  * PHP \>= 8.2
  * Composer
  * Node.js (com npm ou yarn)
  * Um servidor de banco de dados (ex: MySQL, MariaDB)

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### 1\. Backend (Laravel)

```bash
# Navegue até a pasta do backend
cd backend

# Copie o arquivo de ambiente
cp .env.example .env

# Configure as variáveis do banco de dados (DB_DATABASE, DB_USERNAME, DB_PASSWORD) no arquivo .env

# Instale as dependências do PHP
composer install

# Gere a chave da aplicação
php artisan key:generate

# Execute as migrations e os seeders para criar e popular o banco de dados
php artisan migrate --seed

# Crie o link simbólico para a pasta de armazenamento
php artisan storage:link

# Inicie o servidor do backend
php artisan serve
```

O backend estará rodando em `http://localhost:8000`.

### 2\. Frontend (React)

```bash
# Navegue até a pasta do frontend (em outro terminal)
cd frontend

# Copie o arquivo de ambiente
cp .env.example .env

# Configure a variável de ambiente no arquivo .env para apontar para a sua API
VITE_API_URL=http://localhost:8000

# Instale as dependências do JavaScript
npm install

# Inicie o servidor de desenvolvimento do Vite
npm run dev
```

O frontend estará rodando em `http://localhost:5173` (ou outra porta definida no `vite.config.js`).

-----