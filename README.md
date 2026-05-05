# jeevandas.tech — Portfolio

## Stack
- **Frontend**: Astro (static + islands)
- **Backend**: Supabase (Postgres + edge functions)
- **Hosting**: GitHub Pages or Vercel (frontend), Supabase (backend)
- **Dashboard**: Separate repo → `admin.jeevandas.tech`

---

## Getting started

```bash
# install dependencies
npm install

# run dev server
npm run dev

# build for production
npm run build
```

---

## Project structure

```
src/
├── components/
│   ├── Hero.astro        ← loading animation + typewriter entry
│   ├── About.astro       ← who you are
│   ├── Projects.astro    ← 5 project cards
│   ├── Museum.astro      ← museum of failures (placeholder)
│   ├── LifeLately.astro  ← currently / gym / world sections
│   ├── Blog.astro        ← recent posts gateway
│   └── End.astro         ← footer + contact popup
├── layouts/
│   └── Base.astro
├── pages/
│   └── index.astro
├── scripts/
│   └── tracker.js        ← visitor tracking
└── styles/
    └── global.css
supabase-schema.sql        ← run this in Supabase SQL editor
```

---

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Open SQL editor → paste contents of `supabase-schema.sql` → run
3. Go to Edge Functions → create two functions:
   - `track` — receives visitor + action data
   - `message` — receives contact form submissions
4. Add your Supabase URL + anon key to `.env`:

```env
PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key   # server-side only
```

5. In `src/scripts/tracker.js`, update `ENDPOINT` to your edge function URL.
6. In `src/components/End.astro`, update the fetch URL in the send handler.

---

## Sections & IDs

| Section      | ID          | Notes                              |
|--------------|-------------|------------------------------------|
| Hero         | `hero`      | Fixed overlay, dismisses on enter  |
| About        | `about`     | First section after hero exits     |
| Projects     | `projects`  | Links to `/project/<id>`           |
| Museum       | `museum`    | Placeholder, build when ready      |
| Life Lately  | `life`      | Static text blocks                 |
| Blog         | `blog`      | Links to `/blog/<slug>`            |
| End          | `end`       | Contact popup → Supabase messages  |

---

## Personalized greetings (future)

When a visitor is identified (you tag them in the dashboard):
1. Dashboard sets `visitors.name` for their token.
2. On page load, `tracker.js` sends the token to `/api/greet`.
3. If `name` is set, the hero can skip the typewriter and show:
   `"heyy [name] welcome to my world 🌍"`

This is wired in but inactive until the dashboard is built.

---

## Next: Dashboard repo

Separate codebase. Shares the same Supabase instance.
Uses `SUPABASE_SERVICE_KEY` (never exposed to public).

Pages:
- `/` — visitors list (unidentified / identified badges)
- `/visitor/:id` — activity timeline + name/note fields
- `/messages` — contact form inbox
