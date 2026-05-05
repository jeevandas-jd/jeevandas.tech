-- ============================================================
-- jeevandas.tech — Supabase DB Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- ── visitors ─────────────────────────────────────────────
create table if not exists visitors (
  id            uuid primary key default gen_random_uuid(),
  token         text unique not null,        -- localStorage token
  fingerprint   text,                         -- browser fingerprint hash
  ip            text,                         -- filled server-side
  country       text,
  city          text,
  ua            text,
  screen        text,
  language      text,
  referrer      text,
  first_seen    timestamptz default now(),
  last_seen     timestamptz default now(),
  visit_count   integer default 1,

  -- your personal fields ──────────────────────────────────
  name          text,                         -- you fill this
  note          text,                         -- private memory note
  is_identified boolean default false
);

-- ── actions ──────────────────────────────────────────────
create table if not exists actions (
  id            uuid primary key default gen_random_uuid(),
  visitor_token text references visitors(token) on delete cascade,
  type          text not null,               -- 'section_view', 'click', etc.
  data          jsonb,
  page          text,
  ts            bigint,                       -- unix ms from client
  created_at    timestamptz default now()
);

-- ── messages (contact form) ───────────────────────────────
create table if not exists messages (
  id            uuid primary key default gen_random_uuid(),
  visitor_token text,
  name          text not null,
  email         text,
  message       text not null,
  is_read       boolean default false,
  created_at    timestamptz default now()
);

-- ── indexes ───────────────────────────────────────────────
create index if not exists idx_visitors_token       on visitors(token);
create index if not exists idx_visitors_fingerprint on visitors(fingerprint);
create index if not exists idx_actions_visitor      on actions(visitor_token);
create index if not exists idx_messages_read        on messages(is_read);

-- ── Row Level Security — lock it all down ─────────────────
alter table visitors enable row level security;
alter table actions   enable row level security;
alter table messages  enable row level security;

-- Public insert only (your edge function uses service_role key)
-- Dashboard reads using service_role key — never exposed to browser
