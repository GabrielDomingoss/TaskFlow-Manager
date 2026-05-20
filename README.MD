# TaskFlow Manager

Sistema fullstack de gerenciamento de tarefas com categorias, filtros, paginação e CRUD completo.

## Tecnologias

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Axios

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- class-validator
- Swagger/OpenAPI

## Funcionalidades

- Criar tarefas
- Listar tarefas com paginação
- Buscar tarefas por título
- Filtrar por status, prioridade e categoria
- Visualizar detalhes da tarefa
- Editar tarefas
- Excluir tarefas com confirmação
- Vincular múltiplas categorias a uma tarefa
- Indicadores por status
- Usuário fixo simulado

## Como executar localmente

### Pré-requisitos

- Node.js
- npm
- PostgreSQL instalado localmente

## Banco de dados

O projeto utiliza PostgreSQL localmente.

Após instalar o PostgreSQL, crie um banco chamado:

```sql
CREATE DATABASE taskflow_manager;
```

## Backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo .env:

```bash
DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/taskflow_manager?schema=public"
PORT=3333
FRONTEND_URL="http://localhost:3000"
```

Excute as migrations:

```bash
npx prisma migrate dev
```

Execute o seed:

```bash
npx prisma db seed
```

Inicie o backend:

```bash
npm run start:dev
```

A API estará disponível em:

```
http://localhost:3333
```

A documentação Swagger estará disponível em:

```
http://localhost:3333/docs
```

## Frontend

Entre na pasta do Frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo .env.local:

```bash
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

Inicie o frontend:

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```


## Decisões técnicas

O projeto foi dividido em duas aplicações, frontend e backend, para manter responsabilidades bem separadas.

No frontend, foi adotada uma organização baseada em módulos, centralizando a regra visual e de dados de tarefas dentro de modules/tasks. O TanStack Query foi utilizado para cache, sincronização e invalidação dos dados após ações como criação, edição e exclusão.

O formulário utiliza React Hook Form com Zod para garantir validação tipada e uma boa experiência de desenvolvimento. A interface foi construída com Tailwind CSS e shadcn/ui, priorizando consistência visual, acessibilidade e componentes reutilizáveis.

No backend, foi utilizado NestJS com Prisma e PostgreSQL. A modelagem contempla relacionamento muitos-para-muitos entre tarefas e categorias, conforme solicitado no desafio. Os DTOs utilizam class-validator para validação das entradas, e o Swagger documenta os endpoints da API.

A aplicação utiliza um usuário fixo para simular autenticação, conforme permitido pelo desafio.


## Estrutura do projeto

```
├── backend
│   ├── prisma
│   └── src
│       ├── categories
│       ├── prisma
│       ├── tasks
│       └── users
│
└── frontend
    └── src
        ├── app
        ├── components
        ├── lib
        └── modules
            ├── common
            ├── tasks
            └── users
```

## Imagens do sistema

![HomePage](docs/home.png)
- HomePage - Listagem de Tarefas

![HomePage](docs/empty.png)
- HomePage - Listagem de Tarefas sem dados

![Adicionar Tarefa](docs/create.png)
- CreatePage - Página de criação de tarefas

![Editar Tarefa](docs/update.png)
- EditPage - Página de edição de tarefas

![Detalhamento de Tarefa](docs/read.png)
- DetailPage - Página de detalhamento de tarefa

![PopUp de Exclusão](docs/delete.png)
- DeleteDialog - PopUp de exclusão de tarefa

![PopUp de confirmação de edição](<docs/confirmacao de edicao.png>)
- ConfirmUpdateDialog - PopUp de confirmação de edição de tarefa

## Observações

O projeto não implementa autenticação real, pois o desafio permite o uso de um usuário fixo para simulação.

## Autor

Gabriel Domingos
Desenvolvedor de Software