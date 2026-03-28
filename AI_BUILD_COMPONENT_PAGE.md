# GelUI — Build Component Page

This is the master prompt to build the Component page (`/design-system/components`).
It combines the component plan, builder rules, SSR safety, and page patterns.

---

## 1. What to Build

Build a component showcase page at `src/pages/design-system/components.astro` that displays
composed components (3-10 primitives each) organized in groups.

### Component Groups & Items

#### Group 1: Auth & Account
| Component | Primitives | Description |
|-----------|-----------|-------------|
| LoginForm | Card, FormGroup, Input, PasswordInput, Checkbox, Button, LinkButton, Divider | Email + password login with remember me and social |
| SignupForm | Card, FormGroup, Input, PasswordInput, Select, Checkbox, Button | Registration form |
| ForgotPasswordForm | Card, FormGroup, Input, Button, Text | Email input for password reset |
| OtpVerification | Card, OtpInput, Button, Text, Caption | 6-digit code verification |
| ProfileCard | Card, Avatar, Heading, Caption, Badge, Button | User info card |

#### Group 2: Data & Tables
| Component | Primitives | Description |
|-----------|-----------|-------------|
| DataTable | Card, Table, SearchInput, Pagination, Select, EmptyState, Skeleton, Badge | Searchable, sortable, paginated table |
| StatsRow | Grid, Stat | Responsive row of KPI cards |
| UserList | Stack, Avatar, Heading, Caption, Badge, Divider | Vertical user list |
| ActivityFeed | Stack, Avatar, Text, Caption, Divider | Timeline of user actions |

#### Group 3: Forms & Input
| Component | Primitives | Description |
|-----------|-----------|-------------|
| ContactForm | Card, FormGroup, Input, Textarea, Select, Button | Name, email, message form |
| SettingsPanel | Card, TabBar, Toggle, Select, FormGroup, Input, Divider, Button | Tabbed settings |
| FilterBar | Inline, SearchInput, Select, PillTabs, Button | Horizontal filters |
| InlineEdit | Input, Button, Text | Click-to-edit text |

#### Group 4: Cards & Content
| Component | Primitives | Description |
|-----------|-----------|-------------|
| PricingCard | Card, Overline, Heading, Caption, List, Divider, Button, Badge | Plan + price + features + CTA |
| FeatureCard | Card, Heading, Text, IconButton | Icon + title + description |
| TestimonialCard | Card, Blockquote, Avatar, Heading, Caption | Quote with author |
| MediaCard | Card, Image, Heading, Text, Badge, Button | Image + content card |
| NotificationItem | Avatar, Text, Caption, Inline, Stack | Notification row |

#### Group 5: Navigation & Layout
| Component | Primitives | Description |
|-----------|-----------|-------------|
| Navbar | Inline, Avatar, Badge, Button, LinkButton | Top navigation bar |
| Sidebar | Stack, NavItem, Divider, Avatar, Badge, Heading | Sidebar navigation |
| PageHeader | Stack, Inline, Heading, Overline, Breadcrumb, Button | Page title + breadcrumb |
| Footer | Grid, Stack, LinkButton, Text, Divider, Caption | Multi-column footer |
| CommandPalette | Modal, SearchInput, List, Kbd, Divider | Cmd+K command menu |

#### Group 6: Feedback & Dialogs
| Component | Primitives | Description |
|-----------|-----------|-------------|
| ConfirmDeleteDialog | Modal, Heading, Text, Alert, Button | Destructive action confirm |
| FileUploader | Card, Button, Progress, Text, IconButton | File upload with progress |
| EmptyStatePanel | Card, EmptyState, Button | Full empty state |
| LoadingCard | Card, Skeleton | Card loading placeholder |
| ToastManager | Toast, Stack | Stackable toast system |

#### Group 7: E-commerce
| Component | Primitives | Description |
|-----------|-----------|-------------|
| ProductCard | Card, Image, Heading, Text, Badge, Button, Caption | Product display |
| CartItem | Inline, Image, Heading, Caption, NumberInput, IconButton | Cart line item |
| CheckoutSummary | Card, Stack, Inline, Text, Divider, Heading, Button | Order total |

#### Group 8: Communication
| Component | Primitives | Description |
|-----------|-----------|-------------|
| ChatBubble | Text, Caption, Avatar | Single chat message |
| CommentThread | Stack, Avatar, Text, Button, Textarea, Divider | Comment + replies |
| EmailPreview | Card, Inline, Avatar, Heading, Caption, Badge | Email list item |

---

## 2. How to Build Components

### Import Rules
1. Read `src/registry/registry.json` before building
2. ONLY use primitives with `status: "stable"`
3. Import via `importPath` + `exportName` from registry
4. Check `ai.useWhen` to pick the right primitive for each slot
5. Check `composition.allowedParents/allowedChildren` to avoid invalid nesting
6. Check `constraints.doNotUseFor` to prevent misuse

### Import Pattern
```tsx
import { Button } from "@/primitives/buttons";
import { Card, Divider } from "@/primitives/surfaces";
import { Heading, Text, Overline, Caption } from "@/primitives/typography";
import { Input, PasswordInput, FormGroup } from "@/primitives/inputs";
import { Toggle, Checkbox } from "@/primitives/controls";
import { Avatar, Badge, Stat, Table } from "@/primitives/data";
import { Alert, Toast, Spinner, Progress, Skeleton } from "@/primitives/feedback";
import { TabBar, PillTabs, Breadcrumb, Pagination } from "@/primitives/navigation";
import { Stack, Inline, Grid, Center } from "@/primitives/layout";
```

### Component File Structure
```tsx
// src/components/composed/[Name].tsx
import type { CSSProperties, ReactNode } from "react";

interface NameProps {
  // ... typed props
  className?: string;  // ALWAYS accept className
  style?: CSSProperties;  // ALWAYS accept style
}

export function Name({ className = "", style, ...props }: NameProps) {
  return (
    <Card variant="glass" frost="standard" className={className} style={style}>
      {/* compose primitives here */}
    </Card>
  );
}
```

### Token Usage (NEVER hardcode values)
- Text: `text-[var(--theme-fg)]`, `text-[var(--theme-fg-muted)]`
- Background: `bg-[var(--theme-card-bg)]`, `bg-[var(--theme-bg-solid)]`
- Border: `border-[var(--theme-divider)]`
- Radius: `rounded-[var(--glass-radius)]`, `rounded-[var(--glass-radius-sm)]`
- Typography: `.type-h1` `.type-h2` `.type-body` `.type-body-sm` `.type-overline`
- Glass: `.glass-1` `.glass-specular` `.ds-card-frost`

### Contrast Color System (ALWAYS apply)
- On transparent/dark backgrounds: use `contrast-text`, `contrast-muted`
- Inside glass panels: use `glass-type-title`, `glass-type-sub`
- Buttons auto-adapt via `--btn-*` CSS vars
- When background changes or resizes, contrast MUST update automatically

---

## 3. SSR Safety Rules (CRITICAL — zero violations)

1. NEVER use non-deterministic values in render:
   - ❌ `Date.now()`, `Math.random()`, `performance.now()`

2. NEVER read browser-only APIs during render:
   - ❌ `window`, `document`, `localStorage`
   - ✅ only inside `useEffect`

3. NEVER use inline style objects in primitives:
   - ❌ `style={{ paddingTop: 6 }}`
   - ✅ use CSS classes or tokens

4. If inline style is unavoidable:
   - values MUST be strings (`"6px"`, `"600"`)
   - object shape MUST be stable

5. NEVER compute styles inside render:
   - ❌ `style={{ left: percent + "%" }}`
   - ✅ use CSS variables or predefined classes

6. ALWAYS ensure same initial state SSR vs client:
   - ❌ `useState(defaultFromClient)`
   - ✅ derive from props / server

7. NEVER conditionally render different structure on mount:
   - ❌ `if (!mounted) return null`
   - ✅ render placeholder/skeleton

8. DO NOT mutate DOM before hydration:
   - ❌ manual style changes before React loads
   - ✅ use CSS variables or attributes

9. USE `client:load` instead of `client:only` unless necessary

10. ZERO hydration warnings is required

---

## 4. Page Layout Rules

### Follow Existing Page Patterns
The component page MUST follow the same layout patterns as the existing pages:
- Home page (`src/pages/index.astro`)
- Token page (`src/pages/design-system/tokens.astro`)
- Primitives page (`src/pages/design-system/primitives.astro`)

### Page Structure
```astro
---
import DSLayout from "@/components/layout/DSLayout.astro";
// ... component imports
---
<DSLayout title="Components — Gel UI">
  <main class="relative">
    <!-- Hero Section (same pattern as primitives page) -->
    <section class="...">
      <h1 class="type-h1">Components</h1>
      <p class="type-body">Composed primitives for common UI patterns</p>
    </section>

    <!-- Content Grid (4-col responsive like primitives page) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 pb-12">
      <!-- Group blocks here -->
    </div>
  </main>
</DSLayout>
```

### Block Pattern (same as primitives page)
Each component group is a glass panel block:
```astro
<div data-section="Auth" class="col-span-2 max-[540px]:col-span-1 glass-1 glass-specular relative overflow-hidden rounded-[var(--glass-radius)] p-5">
  <div class="absolute inset-0 pointer-events-none ds-card-frost" style="height: 160px;" />
  <div class="relative flex items-start justify-between mb-6 pt-1 pl-1">
    <div class="flex flex-col gap-1">
      <span class="type-overline glass-type-sub mb-1">Authentication</span>
      <h2 class="type-h2 glass-type-title mb-1">Auth & Account</h2>
      <p class="type-body-sm glass-type-sub">Login, signup, verification, and profile</p>
    </div>
    <button class="prim-icon-btn shrink-0 z-10" title="View Source Code" data-view-source="auth">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    </button>
  </div>
  <ComponentShowcase client:load />
  <ComponentSource client:load />
</div>
```

### Code Modal Pattern (same as primitives page)
Each block has a `*Source.tsx` file with:
- `?raw` imports for auto-loading implementation code
- SOURCE_CODE constant with usage examples
- COMPONENTS array with props + implementation
- ViewSourceModal with Source + Components tabs

```tsx
import IMPL from "@/components/composed/LoginForm.tsx?raw";

const SOURCE_CODE = `import { LoginForm } from "@/components/composed";
<LoginForm onSubmit={handleLogin} />`;

const COMPONENTS = [{
  name: "LoginForm",
  path: "@/components/composed",
  description: "...",
  implementation: IMPL,
  props: [...]
}];
```

### Side Navigation
Add component sections to SectionNav (same as primitives page):
```
Auth & Account
Data & Tables
Forms & Input
Cards & Content
Navigation & Layout
Feedback & Dialogs
E-commerce
Communication
```

### Responsive Grid
- Mobile (<540px): 1 column
- Tablet (540-1024px): 2 columns
- Desktop (>1024px): 4 columns
- Use `col-span-2` for wide blocks, `col-span-1` for narrow

### Registry Integration
After building each component:
1. Add to `src/registry/registry.json` with `layer: "component"`
2. Include `importPath`, `exportName`, `props`, `ai`, `composition`, `examples`
3. Component appears on registry page automatically

---

## 5. Absolute Rules (NEVER break)

1. **No inline stylesheet** — use CSS classes, tokens, or Tailwind utilities only
2. **Always use primitive components** — never create raw HTML that a primitive already handles
3. **Always use existing components** — if a composed component exists, use it instead of rebuilding
4. **Follow existing page patterns** — match the home, token, and primitives page layouts exactly
5. **Always apply contrast color function** — all text and buttons must adapt to background changes
6. **Zero hydration warnings** — SSR output must match client output exactly
7. **All styling via tokens** — never hardcode colors, fonts, sizes, or spacing values
8. **Accept className + style** — every component must be customizable
9. **Register in registry.json** — every component must be discoverable by AI
10. **Auto-load implementation** — use `?raw` imports so code modals always show current code

---

## 6. Build Priority

### Phase 1 (Essential — build first)
1. LoginForm
2. DataTable
3. StatsRow
4. ProfileCard
5. SettingsPanel
6. PageHeader
7. Navbar
8. PricingCard
9. ContactForm
10. ConfirmDeleteDialog

### Phase 2 (Common — build next)
11. SignupForm
12. FilterBar
13. Sidebar
14. MediaCard
15. FileUploader
16. UserList
17. NotificationItem
18. EmptyStatePanel
19. Footer
20. ActivityFeed

### Phase 3 (Specialized — on demand)
21-34. ForgotPasswordForm, OtpVerification, CommandPalette, ProductCard,
CartItem, CheckoutSummary, FeatureCard, TestimonialCard, ChatBubble,
CommentThread, EmailPreview, InlineEdit, LoadingCard, ToastManager
