# ASCENT 2K26 – Official Event Website

![Logo](https://github.com/user-attachments/assets/1a800022-2889-4305-b8a7-2c0ee469790e)


ASCENT 2K26 is a high‑stakes, elimination‑based technical event organized by **GFG RSCOE**. Inspired by competitive survival formats, ASCENT challenges participants through multiple rounds that test intelligence, speed, problem‑solving, and composure under pressure. Every round eliminates the weakest performers — only the most capable advance.

This repository contains the **official website** for ASCENT 2K26, including the interactive frontend experience and backend services.

---

## Event Description

ASCENT 2K26 by GFG RSCOE is a competitive elimination event designed to push participants beyond comfort zones. Through structured rounds and strict evaluation, participants are tested on logic, technical ability, and decision‑making. There are no retries, no shortcuts — only performance decides survival.

---

## Pages Included

The website is structured into multiple dedicated pages:

1. **ASCENT** – Landing page with event overview and theme
2. **Rule Book** – Complete rules, eligibility, and elimination criteria
3. **Event Structure** – Detailed breakdown of rounds and progression
4. **Registration** – Participant registration and entry point

Each page is routed separately to ensure a clean, focused user experience.

---

## Tech Stack

### Frontend

- Vite
- React
- TypeScript
- Modern UI animations and transitions

### Backend

- Node.js
- Express.js
- API‑based architecture

---

## Project Structure (Important)

This project is **not single‑layered**. It is divided into frontend and backend:

````

root/
├── client/        # Frontend (Vite + React + TypeScript)
├── server/        # Backend (Express / API)
├── package.json   # Root configuration & scripts

````

The \*\*root \*\***`package.json`** controls how both frontend and backend are executed together.

---

## Prerequisites

Make sure the following are installed on your system:

```bash
node -v
npm -v
````

---

## Installation

Install all required dependencies:

```bash
npm install
```

---

## Running the Project

To start the development environment:

```bash
npm run dev
```

This command runs both the **client** and **server** as configured in the root project.

---

## Notes

* This project focuses on a cinematic, NPC‑style interaction experience
* Frontend and backend are decoupled for scalability
* Designed specifically for ASCENT 2K26 event operations

---

## Organizer

**GeeksforGeeks RSCOE (GFG RSCOE)**

Official Technical Club Event – ASCENT 2K26

---

> ⚠️ Warning: Once entered, there is no going back. Performance alone determines survival.
