-- ============================================
-- A3 Brands SOP Documentation - Database Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor:
-- 1. Go to https://supabase.com/dashboard
-- 2. Select your project
-- 3. Go to SQL Editor
-- 4. Paste this entire file and click "Run"
-- ============================================

-- 1. Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. SOPs table
CREATE TABLE public.sops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES public.categories(id),
  description TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0',
  tags TEXT[] NOT NULL DEFAULT '{}',
  steps JSONB NOT NULL DEFAULT '[]',
  last_updated DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_sops_slug ON public.sops(slug);
CREATE INDEX idx_sops_category ON public.sops(category_id);

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sops ENABLE ROW LEVEL SECURITY;

-- Profiles: authenticated users can read all, update own
CREATE POLICY "Profiles viewable by authenticated users"
  ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- Categories: all authenticated read, admins write
CREATE POLICY "Categories viewable by authenticated users"
  ON public.categories FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- SOPs: all authenticated read, admins write
CREATE POLICY "SOPs viewable by authenticated users"
  ON public.sops FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert SOPs"
  ON public.sops FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update SOPs"
  ON public.sops FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete SOPs"
  ON public.sops FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
