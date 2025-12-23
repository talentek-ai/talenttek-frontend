-- ============================================
-- TALENTSHUB DATABASE SCHEMA
-- Exact match with project structure
-- ============================================

-- Enable UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- USERS (Core authentication)
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  user_role TEXT NOT NULL DEFAULT 'talent' CHECK (user_role IN ('superadmin', 'admin', 'owner', 'talent', 'employer', 'interviewer')),
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  profile_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(user_role);

-- ============================================
-- TALENTS (Job seekers)
-- ============================================

CREATE TABLE IF NOT EXISTS talents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  city TEXT,
  current_position TEXT,
  years_of_experience TEXT,
  education_level TEXT,
  job_types TEXT[],
  work_location TEXT[],
  availability_status TEXT DEFAULT 'actively-looking',
  short_bio TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  has_carte_entrepreneur BOOLEAN DEFAULT FALSE,
  skills TEXT[],
  profile_photo_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_talents_user_id ON talents(user_id);

-- ============================================
-- EMPLOYERS (Company accounts)
-- ============================================

CREATE TABLE IF NOT EXISTS employers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  industry TEXT,
  website TEXT,
  company_size TEXT,
  year_founded TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  zip_code TEXT,
  linkedin_url TEXT,
  facebook_url TEXT,
  logo_url TEXT,
  rep_first_name TEXT,
  rep_last_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_employers_user_id ON employers(user_id);

-- ============================================
-- INTERVIEWERS (Technical & Leadership)
-- ============================================

CREATE TABLE IF NOT EXISTS interviewers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  department TEXT,
  expertise TEXT[],
  availability JSONB,
  rating NUMERIC(3,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_interviewers_user_id ON interviewers(user_id);

-- ============================================
-- ADMINS (Superadmins & admins)
-- ===========================================================

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_level TEXT CHECK (role_level IN ('admin', 'superadmin')),
  permissions TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admins_user_id ON admins(user_id);

-- ============================================
-- DATABASE SCHEMA COMPLETE
-- ============================================
