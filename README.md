# IBPS SO IT Mains Mock Platform

A production-style mock test web application built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Zustand.

## Features

- Subject-wise mock tests loaded from local JSON files
- Normalization layer for different JSON root keys
- Exam-style question palette and status tracking
- Save and navigate question-by-question
- Mark for review and clear response actions
- Countdown timer with low-time warning and auto-submit
- localStorage persistence for in-progress attempts
- Result summary with negative marking
- Full answer review with explanations after submission

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- lucide-react

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For a production build:

```bash
npm run build
npm run start
```

## Route Structure

- `/`
- `/subjects`
- `/instructions/[subject]`
- `/test/[subject]`
- `/result/[subject]`
- `/review/[subject]`

## Data Flow

1. Add a new JSON file under `data/subjects/`
2. Register its metadata and imported JSON in `constants/subjects.ts`
3. The app will pick it up across landing, subjects, instructions, test, result, and review pages

## Sample Subjects Included

- Computer Networks
- DBMS
- Operating Systems

## Project Structure

```text
app/
components/
constants/
data/
lib/
store/
types/
```
