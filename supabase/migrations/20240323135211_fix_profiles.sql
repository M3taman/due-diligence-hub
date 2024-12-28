-- Drop existing table if exists
drop table if exists public.user_profiles;

-- Create correct profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text default 'trial',
  trial_expiry timestamptz,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

-- Ensure RLS policy allows users to insert their own profile
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );