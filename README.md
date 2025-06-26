# Grupo A - Frontend

Sistema de gerenciamento de produtos com suporte a descontos e cupons.

## Sobre o Projeto

Interface web para gerenciamento de produtos, permitindo:

- Listagem de produtos
- Criação e edição de produtos
- Exclusão lógica de produtos
- Aplicação de descontos (cupom ou percentual)
- Remoção de descontos

## Setup

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001
```

## Funcionalidades Pendentes no Frontend

As seguintes funcionalidades estão implementadas na API mas ainda não foram integradas ao frontend:

### Filtros

- Filtro por preço (`filter.effectivePrice=$gte:50`)
- Filtro por estoque (`filter.stock=$eq:10`)
- Filtro por cupom (`filter.hasCoupon=$eq:true`)
- Busca por nome/descrição (`search=termo`)

### Ordenação

- Ordenar por nome (`sortBy=name:ASC`)
- Ordenar por preço (`sortBy=effectivePrice:DESC`)
- Ordenar por estoque (`sortBy=stock:ASC`)
- Ordenar por data de criação (`sortBy=created_at:DESC`)

### Paginação

- Limite por página (`limit=10`)
- Número da página (`page=1`)
- Informações de meta (total de itens, total de páginas)

## Tecnologias

- React
- TypeScript
- Tailwind CSS
- Material UI Icons
- Vite
