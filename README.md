# ♻️ ColetaLink

Projeto desenvolvido para facilitar o descarte consciente de resíduos sólidos, conectando moradores a pontos de coleta e catadores de forma prática, responsiva e geolocalizada. 🌱

---

## 📸 Imagem do projeto

![logo](./src/assets/logoColetaLink.jpeg)

---

## 🚀 Funcionalidades

* Cadastro de pontos de coleta (com geolocalização automática via CEP)
* Visualização dos pontos em mapa com ícones personalizados (Leaflet)
* Filtro por nome da instituição, cidade, bairro e tipo de resíduo
* Busca por CEP para centralizar o mapa
* Estilo moderno: fundo cimento queimado + verde neon
* Layout responsivo com menu hambúrguer para dispositivos móveis

---

## 💻 Tecnologias utilizadas

| Front-end        | Back-end          | Banco de Dados |
| ---------------- | ----------------- | -------------- |
| React + Vite     | Node.js + Express | MongoDB Atlas  |
| SCSS Modules     | Axios             | Mongoose       |
| React Router DOM | CORS, dotenv      |                |
| React Leaflet    |                   |                |

---

## 👨‍💻 Como rodar o projeto localmente

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/coletalink.git
cd coletalink
```

### 2. Instale as dependências:

#### Front-end

```bash
cd frontend
npm install
npm run dev
```

#### Back-end

```bash
cd backend
npm install
node server.js
```

> 📂 Crie um arquivo `.env` dentro da pasta `backend` com as seguintes variáveis:
>
> ```env
> MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/coletalink
> PORT=5000
> ```

---

## 🌐 Deploy

* **Front-end:** [Vercel](https://vercel.com/)
* **Back-end:** [Render](https://render.com/)

> Os links de produção serão atualizados aqui após o deploy completo.

---

## 🤝 Contribuições

Projeto criado com fins educativos e ambientais.
Contribuições são bem-vindas!
Crie um fork, clone, envie um PR com sugestões ou melhorias.

