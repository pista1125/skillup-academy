-- Create feedback_classes table
create table public.feedback_classes (
  id uuid default gen_random_uuid() primary key,
  teacher_id uuid references auth.users on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create feedback_students table
create table public.feedback_students (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references public.feedback_classes on delete cascade not null,
  name text not null,
  avatar_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create feedback_sessions table
create table public.feedback_sessions (
  id uuid default gen_random_uuid() primary key,
  teacher_id uuid references auth.users on delete cascade not null,
  class_id uuid references public.feedback_classes on delete cascade not null,
  tool_type text not null,
  aspects jsonb not null,
  lesson_info text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create feedback_results table
create table public.feedback_results (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.feedback_sessions on delete cascade not null,
  student_id uuid references public.feedback_students on delete cascade not null,
  scores numeric[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.feedback_classes enable row level security;
alter table public.feedback_students enable row level security;
alter table public.feedback_sessions enable row level security;
alter table public.feedback_results enable row level security;

-- Policies for feedback_classes
create policy "Teachers can insert their own classes" on public.feedback_classes
  for insert with check (auth.uid() = teacher_id);

create policy "Teachers can view their own classes" on public.feedback_classes
  for select using (auth.uid() = teacher_id);

create policy "Teachers can update their own classes" on public.feedback_classes
  for update using (auth.uid() = teacher_id);

create policy "Teachers can delete their own classes" on public.feedback_classes
  for delete using (auth.uid() = teacher_id);

-- Policies for feedback_students (teachers can manage students in their classes)
create policy "Teachers can view students in their classes" on public.feedback_students
  for select using (
    exists (
      select 1 from public.feedback_classes
      where feedback_classes.id = feedback_students.class_id
      and feedback_classes.teacher_id = auth.uid()
    )
  );

create policy "Teachers can insert students in their classes" on public.feedback_students
  for insert with check (
    exists (
      select 1 from public.feedback_classes
      where feedback_classes.id = class_id
      and feedback_classes.teacher_id = auth.uid()
    )
  );

create policy "Teachers can update students in their classes" on public.feedback_students
  for update using (
    exists (
      select 1 from public.feedback_classes
      where feedback_classes.id = feedback_students.class_id
      and feedback_classes.teacher_id = auth.uid()
    )
  );

create policy "Teachers can delete students in their classes" on public.feedback_students
  for delete using (
    exists (
      select 1 from public.feedback_classes
      where feedback_classes.id = feedback_students.class_id
      and feedback_classes.teacher_id = auth.uid()
    )
  );

-- Policies for feedback_sessions
create policy "Teachers can insert their own sessions" on public.feedback_sessions
  for insert with check (auth.uid() = teacher_id);

create policy "Teachers can view their own sessions" on public.feedback_sessions
  for select using (auth.uid() = teacher_id);

create policy "Teachers can delete their own sessions" on public.feedback_sessions
  for delete using (auth.uid() = teacher_id);

-- Policies for feedback_results
create policy "Teachers can view results for their sessions" on public.feedback_results
  for select using (
    exists (
      select 1 from public.feedback_sessions
      where feedback_sessions.id = feedback_results.session_id
      and feedback_sessions.teacher_id = auth.uid()
    )
  );

create policy "Teachers can insert results for their sessions" on public.feedback_results
  for insert with check (
    exists (
      select 1 from public.feedback_sessions
      where feedback_sessions.id = session_id
      and feedback_sessions.teacher_id = auth.uid()
    )
  );
