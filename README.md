# 🧠 Memzee

> **Your AI-powered second brain.**  
> Capture, connect, and recall knowledge through an intelligent knowledge graph.

---

## 🚀 Overview

Memzee is an AI-powered personal knowledge management platform that transforms scattered information into a connected knowledge graph.

Instead of manually organizing notes, Memzee automatically extracts entities and relationships from your memories, GitHub repositories, and YouTube videos, allowing you to search and recall information naturally using AI.

---

## ✨ Features

### 📝 Remember
Store thoughts, ideas, meeting notes, or anything worth remembering.

- Natural language input
- AI-powered entity extraction
- Automatic relationship detection
- Knowledge graph generation

---

### 🔍 Recall

Ask questions naturally instead of searching with keywords.

Examples:

- *What technologies are used in my project?*
- *Summarize what I learned from this video.*
- *Tell me everything about React.*

---

### 🕸 Interactive Knowledge Graph

Visualize your knowledge as a living graph.

- Automatic graph layout
- Connected node highlighting
- Search nodes instantly
- Focus graph from timeline
- Capture graph as an image

---

### 📂 GitHub Repository Import

Import any GitHub repository.

Memzee extracts the README and converts it into structured knowledge automatically.

---

### ▶️ YouTube Import

Paste any YouTube URL.

Memzee extracts the transcript and converts it into searchable knowledge.

---

### 📜 Timeline

Every memory is stored chronologically.

- Activity history
- One-click graph focus
- Memory management

---

### 🗑 Forget Memories

Remove memories while automatically synchronizing the knowledge graph.

---

## 🛠 Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- React Flow
- Zustand
- Framer Motion
- html-to-image
- Sonner

### Backend

- FastAPI
- Cognee
- Google Gemini
- Python
- NetworkX
- YouTube Transcript API

---

## 🏗 Architecture

```text
                 User Input
                      │
          ┌───────────┴───────────┐
          │                       │
      Manual Entry        GitHub / YouTube
          │                       │
          └───────────┬───────────┘
                      │
            Knowledge Extraction
                      │
          Entity & Relationship Detection
                      │
              Knowledge Graph Builder
                      │
        ┌─────────────┴─────────────┐
        │                           │
    Timeline                  Recall Engine
        │                           │
        └─────────────┬─────────────┘
                      │
             Interactive Knowledge Graph
```

---

## 📸 Screenshots

> Add screenshots here.

- Landing Page
  <img width="1895" height="865" alt="image" src="https://github.com/user-attachments/assets/4af2c81c-743e-4c31-a004-4195af13a35a" />

- Interactive Knowledge Graph
  <img width="1918" height="870" alt="image" src="https://github.com/user-attachments/assets/43774598-7895-40db-8e22-a30a6ed55217" />

- Timeline
  <img width="1918" height="871" alt="image" src="https://github.com/user-attachments/assets/fbb955e0-5e51-4076-8519-25451d907c44" />

- AI Recall
  <img width="1915" height="868" alt="image" src="https://github.com/user-attachments/assets/f6c4a58c-71b3-4b0d-8fb0-426d2231452e" />

- GitHub Import
  
- YouTube Import

---

## ⚙️ Getting Started

### Clone Repository

```bash
git clone https://github.com/mahak0711/Memzee.git

cd Memzee
```

---

## Backend Setup

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env`

```env
GOOGLE_API_KEY=YOUR_API_KEY

COGNEE_API_KEY=YOUR_API_KEY

COGNEE_SERVICE_URL=https://api.cognee.ai
```

Run backend

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🌍 Live Demo

### Frontend

https://memzee.vercel.app

### Backend

https://memzee.onrender.com

---

## 🎯 Why Memzee?

Traditional note-taking applications store information.

Memzee understands it.

By automatically extracting entities, relationships, and context, Memzee transforms disconnected information into a searchable and interactive knowledge graph, making knowledge easier to explore and recall.

---

## 🚀 Future Improvements

- User authentication
- Private knowledge graphs
- PDF import
- Website/article import
- Semantic graph clustering
- Graph filtering
- Collaborative workspaces
- Cloud synchronization

---

## 🎥 Demo

> Add your demo video link here.

---

## 📂 Project Structure

```text
Memzee
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   └── public
│
├── backend
│   ├── app
│   │   ├── routers
│   │   ├── services
│   │   ├── models
│   │   └── config
│   └── requirements.txt
│
└── README.md
```

---

## 👨‍💻 Author

**Mahak Kankaria**

- GitHub: https://github.com/mahak0711
- LinkedIn: https://linkedin.com/in/mahakkankaria

---

## 🏆 Built For

**Cognee Hackathon 2026**

> *Transforming scattered information into connected knowledge with AI.*
