-- Drop previous problematic policies and functions
DROP POLICY IF EXISTS "Students can view invited sessions" ON feedback_sessions;
DROP POLICY IF EXISTS "Students can view their own classes" ON feedback_classes;
DROP POLICY IF EXISTS "Students can view their current student record" ON feedback_students;
DROP POLICY IF EXISTS "Teachers can manage notifications for their students" ON feedback_notifications;
DROP POLICY IF EXISTS "Teachers can manage notifications for their sessions" ON feedback_notifications;
DROP POLICY IF EXISTS "Students can view their own class details" ON feedback_classes;
DROP POLICY IF EXISTS "Students can view their own student records" ON feedback_students;
DROP POLICY IF EXISTS "Students can view invited sessions" ON feedback_sessions;

-- 1. Create Helper Functions (SECURITY DEFINER to break RLS recursion)
CREATE OR REPLACE FUNCTION check_is_teacher_of_class(class_id uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM feedback_classes
    WHERE id = class_id AND teacher_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION check_is_student_invited_to_session(session_id uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM feedback_notifications
    WHERE session_id = session_id AND profile_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION check_is_student_in_class(class_id uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM feedback_notifications n
    JOIN feedback_students s ON n.student_id = s.id
    WHERE s.class_id = class_id AND n.profile_id = auth.uid()
  );
$$;

-- 2. New Polished Policies

-- feedback_classes
CREATE POLICY "feedback_classes_teacher_policy" ON feedback_classes
  FOR ALL USING (auth.uid() = teacher_id);

CREATE POLICY "feedback_classes_student_policy" ON feedback_classes
  FOR SELECT USING (check_is_student_in_class(id));

-- feedback_sessions
CREATE POLICY "feedback_sessions_teacher_policy" ON feedback_sessions
  FOR ALL USING (auth.uid() = teacher_id);

CREATE POLICY "feedback_sessions_student_policy" ON feedback_sessions
  FOR SELECT USING (check_is_student_invited_to_session(id));

-- feedback_notifications
CREATE POLICY "feedback_notifications_student_policy" ON feedback_notifications
  FOR ALL USING (profile_id = auth.uid());

CREATE POLICY "feedback_notifications_teacher_policy" ON feedback_notifications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM feedback_sessions s
      WHERE s.id = session_id AND s.teacher_id = auth.uid()
    )
  );

-- feedback_students
CREATE POLICY "feedback_students_teacher_policy" ON feedback_students
  FOR ALL USING (check_is_teacher_of_class(class_id));

CREATE POLICY "feedback_students_student_policy" ON feedback_students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM feedback_notifications n
      WHERE n.student_id = feedback_students.id AND n.profile_id = auth.uid()
    )
  );

-- feedback_results
CREATE POLICY "feedback_results_teacher_policy" ON feedback_results
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM feedback_sessions s
      WHERE s.id = session_id AND s.teacher_id = auth.uid()
    )
  );

CREATE POLICY "feedback_results_student_policy" ON feedback_results
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM feedback_notifications n
      WHERE n.session_id = session_id AND n.student_id = student_id AND n.profile_id = auth.uid()
    )
  );
