# SMIT Portal — React Frontend

Frontend-only React/Vite recreation of the supplied SMIT Student/Trainer portal references.

## Stack
- React 18
- React Router DOM
- HTML / CSS / JavaScript
- No Python
- No backend / database
- Supplied SMIT logo PNG with transparent background

## Login
The root route opens the login page directly. Any email/CNIC + any password is accepted on the frontend. The three role buttons open:
- Login as Admin → `/admin/dashboard`
- Login as Teacher → `/teacher/dashboard`
- Login as Student → `/student/dashboard`

## Interactive frontend data
All CRUD-style actions use React state and browser `localStorage`, so changes survive a refresh during the demo.

### Admin
Dashboard, Students, Teachers, Courses, Attendance, Assignments, Quizzes, Course Progress, Payments.
Add/edit/remove/toggle records, search/filter, approve/reject assignments, mark attendance, pagination and detail modals.

### Teacher
Dashboard, Students, Attendance, Assignments, Quizzes, Course Progress.
Create/edit/remove student/assignment/quiz records, approve/reject assignments, mark attendance, open student details and use progress dropdowns.

### Student
Dashboard, Progress, Attendance, Payment, Assignment, Quiz.
Progress modules expand into individual topics; assignment and quiz lists have pagination; quiz actions open a multi-question frontend modal.

## Run
```bash
npm install
npm run dev
```

No API keys or environment variables are required.
