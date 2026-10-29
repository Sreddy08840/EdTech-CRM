CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  user_type TEXT NOT NULL
    CHECK (user_type IN ('Parent', 'Student', 'School')),
  category TEXT NOT NULL
    CHECK (category IN ('Scholarship', 'Concert', 'Admission', 'General Query')),
  message TEXT,
  status TEXT NOT NULL DEFAULT 'NEW',
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx
  ON public.inquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS inquiries_category_idx
  ON public.inquiries (category);

CREATE INDEX IF NOT EXISTS inquiries_user_type_idx
  ON public.inquiries (user_type);