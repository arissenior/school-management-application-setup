
# EduManage - School Management Application

## Requirements

### Functional Requirements
1. **Student Management** - CRUD operations for students with search and filtering
2. **Teacher Management** - CRUD operations for teachers with subject assignments
3. **Class Management** - Create classes and assign students/teachers
4. **Schedule Management** - Interactive calendar for course planning
5. **Grade Management** - Input and view grades by subject
6. **Attendance Tracking** - Daily attendance recording
7. **Authentication** - Login system with role-based access (admin, teacher, student)
8. **Reports** - Generate report cards and analytics

### Non-Functional Requirements
- Responsive design for mobile and desktop
- Fast performance with optimized queries
- Secure data handling
- Intuitive French language interface

## Design

### Architecture
- **Frontend**: React 18 + TypeScript + React Router + Tailwind CSS
- **UI Components**: shadcn/ui with custom design system
- **State Management**: React hooks + Context API
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Authentication**: Supabase Auth with RLS

### Design System
- Primary color: Educational Blue (HSL 217 91% 60%)
- Secondary color: Academic Purple (HSL 262 52% 47%)
- Accent color: Success Green (HSL 142 71% 45%)
- Semantic tokens for all UI elements

### Database Schema
```sql
-- Students table
students (
  id uuid primary key,
  first_name text,
  last_name text,
  date_of_birth date,
  email text,
  phone text,
  address text,
  parent_name text,
  parent_phone text,
  parent_email text,
  enrollment_date date,
  photo_url text,
  created_at timestamp
)

-- Teachers table
teachers (
  id uuid primary key,
  first_name text,
  last_name text,
  email text,
  phone text,
  subjects text[],
  hire_date date,
  photo_url text,
  created_at timestamp
)

-- Classes table
classes (
  id uuid primary key,
  name text,
  level text,
  academic_year text,
  teacher_id uuid references teachers,
  created_at timestamp
)

-- Class enrollments
class_enrollments (
  id uuid primary key,
  class_id uuid references classes,
  student_id uuid references students,
  enrollment_date date
)