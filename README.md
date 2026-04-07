# 🧠 Smart Q&A API - E-commerce Support System

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20or%20Local-green?logo=mongodb)](https://mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?logo=mongoose)](https://mongoosejs.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?logo=openai)](https://openai.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange?logo=jsonwebtokens)](https://jwt.io/)
[![Zod](https://img.shields.io/badge/Zod-Schema%20Validation-3068B7?logo=zod)](https://zod.dev/)
[![Rate Limit](https://img.shields.io/badge/Rate%20Limit-10%2Fminute-blue)](https://www.npmjs.com/package/express-rate-limit)
[![Morgan](https://img.shields.io/badge/Morgan-Logging-FF69B4)](https://www.npmjs.com/package/morgan)
[![Postman](https://img.shields.io/badge/Postman-API%20Testing-orange?logo=postman)](https://www.postman.com/)
[![Git](https://img.shields.io/badge/Git-Version%20Control-black?logo=git)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Hosting-181717?logo=github)](https://github.com/)
[![MacOS](https://img.shields.io/badge/macOS-Development%20Environment-grey?logo=apple)](https://apple.com/macos)


A production-ready REST API that implements **Retrieval-Augmented Generation (RAG)** to answer e-commerce policy questions using OpenAI's GPT-3.5.

The system includes authentication, rate limiting, structured responses, and query tracking.

---

## 🚀 Features

- 🔍 **RAG Pipeline** – Retrieves relevant documents from MongoDB and generates grounded answers using OpenAI  
- 🔐 **JWT Authentication** – Secure user registration and login  
- ⏱️ **Rate Limiting** – 10 requests per minute per user  
- 📦 **Structured Output** – Zod validation ensures consistent JSON responses  
- 📜 **Request Logging** – Morgan middleware  
- ❌ **Error Handling** – Global handler (no stack traces in production)  
- 🕓 **Query History** – View last 10 Q&As per user  

---

## 🛠️ Tech Stack

| Category        | Technology              |
|----------------|------------------------|
| Runtime        | Node.js (v16+)         |
| Framework      | Express.js             |
| Database       | MongoDB                |
| LLM Provider   | OpenAI GPT-3.5 Turbo   |
| Authentication | JWT + bcryptjs         |
| Validation     | Zod                    |
| Rate Limiting  | express-rate-limit     |
| Logging        | Morgan                 |
| Testing        | Jest + Supertest       |

---

## 📦 Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- OpenAI API Key

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/aryansinha1818/smart-qa-api.git
cd smart-qa-api
```

2. Install dependencies
```
npm install
```
3. Setup environment variables
touch .env

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/smart_qa
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
```

🗄️ Database Setup
Start MongoDB (local)
mongod
Seed database
```
npm run seed
```

## ✅ Expected Output

```
✅ MongoDB Connected Successfully  
🗑️ Cleared existing documents  
✅ Seeded 5 e-commerce documents  
```

---

## 🏃 Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

Server runs at:  
👉 http://localhost:3001

---

## 📚 API Documentation

### Base URL
```
http://localhost:3001
```

---

### 1. Health Check
```http
GET /
```

---

### 2. Register
```http
POST /api/auth/register
```

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

---

### 3. Login
```http
POST /api/auth/login
```

---

### 4. Get Documents
```http
GET /api/docs
```

---

### 5. Ask Question (Protected)
```http
POST /api/ask
Authorization: Bearer TOKEN
```

```json
{
  "question": "How long does it take to get a refund?"
}
```

---

### 6. Query History
```http
GET /api/ask/history
Authorization: Bearer TOKEN
```

---

## 🧪 Testing (Postman Flow)

- Register user  
- Login → copy token  
- Get docs  
- Ask question (with token)  
- Test rate limit (11 requests → expect 429)  
- Check history  

---

## 📁 Project Structure

```
smart-qa-api/
├── src/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── routes/
│   ├── seed.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🔒 Environment Variables

| Variable        | Description            |
|----------------|------------------------|
| PORT           | Server port            |
| MONGODB_URI    | MongoDB connection     |
| JWT_SECRET     | JWT signing key        |
| OPENAI_API_KEY | OpenAI API key         |
| NODE_ENV       | Environment mode       |

---

## 🧪 Running Tests

```bash
npm test
```

---

## 📊 Coverage

- ✅ RAG Pipeline  
- ✅ Clean Architecture  
- ✅ Structured Output  
- ✅ Authentication  
- ✅ Rate Limiting  
- ✅ Error Handling  
- ✅ Documentation  

---

## 🙏 Acknowledgments

- OpenAI  
- Express.js  
- MongoDB  
---
**Aryan Sinha**

[![LinkedIn](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aryan-sinha-877698212/)\
[![Gmail](https://img.shields.io/badge/gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:aryan.sinha1818@gmail.com)
