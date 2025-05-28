# 💼 Ben Salah Meriam - Interactive Portfolio Website

An elegant, responsive and interactive portfolio for **Ben Salah Meriam**, Junior QA Automation Engineer. The site dynamically renders skills, projects, and certificates using modular JavaScript and clean HTML/CSS architecture.

## 🚀 Features

- 🌙 **Dark/Light Theme Toggle**
- 🧠 Centralized **data-driven content**
- 🎨 Clean and responsive **UI layout**
- 🔄 Toggle visibility for each section (Skills, Projects, Certificates)
- 📜 Modular and maintainable code structure

---

## 📁 Project Structure


---

## 📋 How It Works

### `index.html`
Contains the main layout and structure of the portfolio site:
- Button for theme toggle
- Header with name and job title
- Section buttons to show/hide: Skills, Projects, Certificates
- Empty containers that will be populated dynamically via JS

---

### `main.js`

#### 🔧 Centralized Configuration: `PortfolioData`
Holds structured data:
- `skills`: grouped by category (Frontend, Backend, QA)
- `projects`: title, description, status, and tech stack
- `certificates`: issued certifications with metadata

#### 🧩 HTML Templates: `Templates`
Functions that return HTML strings for each type of content:
- `skill`, `project`, `certificate`

#### ⚙️ Renderer: `PortfolioRenderer`
- Manages content rendering into the DOM
- Supports dynamic rendering and re-rendering
- Provides a method to add new items

#### 🎮 Interaction: `InteractionManager`
- Handles section toggling (only one visible at a time)
- Smooth scroll to opened section
- Manages light/dark theme with local storage
- Sets up button animations and keyboard navigation (if added)

---

## 🖼️ Example Sections

### 💼 Skills
Rendered from categories and listed with icons:
```js
{
  category: "Frontend Development",
  icon: "💻",
  skills: ["HTML5", "CSS3", "React"]
}
