# GelUI Component Page — Plan

Components = 3-10 primitives composed into reusable units for specific purposes.

---

## Group 1: Auth & Account

| Component | Primitives Used | Description |
|-----------|----------------|-------------|
| **LoginForm** | Card, FormGroup, Input, PasswordInput, Checkbox, Button, LinkButton, Divider | Email + password login with remember me and social options |
| **SignupForm** | Card, FormGroup, Input, PasswordInput, Select, Checkbox, Button | Registration with name, email, password, terms agree |
| **ForgotPasswordForm** | Card, FormGroup, Input, Button, Text | Email input to request password reset |
| **OtpVerification** | Card, OtpInput, Button, Text, Caption | 6-digit code verification with resend link |
| **ProfileCard** | Card, Avatar, Heading, Caption, Badge, Button | User info card with photo, name, role, status |

---

## Group 2: Data & Tables

| Component | Primitives Used | Description |
|-----------|----------------|-------------|
| **DataTable** | Card, Table, SearchInput, Pagination, Select, EmptyState, Skeleton, Badge | Searchable, sortable, paginated data table |
| **StatsRow** | Grid, Stat | Responsive row of 3-4 KPI metric cards |
| **UserList** | Stack, Avatar, Heading, Caption, Badge, Divider | Vertical list of users with avatar and status |
| **ActivityFeed** | Stack, Avatar, Text, Caption, Divider | Timeline of user actions with timestamps |

---

## Group 3: Forms & Input

| Component | Primitives Used | Description |
|-----------|----------------|-------------|
| **ContactForm** | Card, FormGroup, Input, Textarea, Select, Button | Name, email, subject, message form |
| **SettingsPanel** | Card, TabBar, Toggle, Select, FormGroup, Input, Divider, Button | Tabbed settings with save/cancel |
| **FilterBar** | Inline, SearchInput, Select, PillTabs, Button | Horizontal filter controls for lists/tables |
| **InlineEdit** | Input, Button, Text | Click-to-edit text field with save/cancel |

---

## Group 4: Cards & Content

| Component | Primitives Used | Description |
|-----------|----------------|-------------|
| **PricingCard** | Card, Overline, Heading, Caption, List, Divider, Button, Badge | Plan name, price, features, CTA with popular variant |
| **FeatureCard** | Card, Heading, Text, IconButton | Icon + title + description feature highlight |
| **TestimonialCard** | Card, Blockquote, Avatar, Heading, Caption | Quote with author photo and name |
| **MediaCard** | Card, Image, Heading, Text, Badge, Button | Image + title + description + action |
| **NotificationItem** | Avatar, Text, Caption, Inline, Stack | Clickable notification row with unread dot |

---

## Group 5: Navigation & Layout

| Component | Primitives Used | Description |
|-----------|----------------|-------------|
| **Navbar** | Inline, Avatar, Badge, Button, LinkButton | Top navigation bar with logo, links, user menu |
| **Sidebar** | Stack, NavItem, Divider, Avatar, Badge, Heading | Vertical sidebar navigation with sections |
| **PageHeader** | Stack, Inline, Heading, Overline, Breadcrumb, Button | Page title with breadcrumb and action buttons |
| **Footer** | Grid, Stack, LinkButton, Text, Divider, Caption | Multi-column page footer with links |
| **CommandPalette** | Modal, SearchInput, List, Kbd, Divider | Cmd+K quick search/command menu |

---

## Group 6: Feedback & Dialogs

| Component | Primitives Used | Description |
|-----------|----------------|-------------|
| **ConfirmDeleteDialog** | Modal, Heading, Text, Alert, Button | Destructive action confirmation with warning |
| **FileUploader** | Card, Button, Progress, Text, IconButton | Drag & drop file upload with progress |
| **EmptyStatePanel** | Card, EmptyState, Button | Full empty state with icon, text, action |
| **LoadingCard** | Card, Skeleton | Card-shaped loading placeholder |
| **ToastManager** | Toast, Stack | Stackable toast notification system |

---

## Group 7: E-commerce

| Component | Primitives Used | Description |
|-----------|----------------|-------------|
| **ProductCard** | Card, Image, Heading, Text, Badge, Button, Caption | Product photo, name, price, add to cart |
| **CartItem** | Inline, Image, Heading, Caption, NumberInput, IconButton | Cart row with quantity and remove |
| **CheckoutSummary** | Card, Stack, Inline, Text, Divider, Heading, Button | Order summary with total and pay button |

---

## Group 8: Communication

| Component | Primitives Used | Description |
|-----------|----------------|-------------|
| **ChatBubble** | Text, Caption, Avatar | Single chat message with sender and timestamp |
| **CommentThread** | Stack, Avatar, Text, Button, Textarea, Divider | Comment with reply input |
| **EmailPreview** | Card, Inline, Avatar, Heading, Caption, Badge | Email list item with sender, subject, preview |

---

## Priority Order

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

### Phase 3 (Specialized — build on demand)
21. ForgotPasswordForm
22. OtpVerification
23. CommandPalette
24. ProductCard
25. CartItem
26. CheckoutSummary
27. FeatureCard
28. TestimonialCard
29. ChatBubble
30. CommentThread
31. EmailPreview
32. InlineEdit
33. LoadingCard
34. ToastManager

---

## Page Layout Plan

The component page (`/design-system/components`) should display components in groups:

```
[Auth & Account]    [Data & Tables]
LoginForm           DataTable
SignupForm           StatsRow
ProfileCard          UserList

[Forms & Input]     [Cards & Content]
ContactForm          PricingCard
SettingsPanel        FeatureCard
FilterBar            MediaCard

[Navigation]        [Feedback & Dialogs]
Navbar               ConfirmDeleteDialog
Sidebar              FileUploader
PageHeader           EmptyStatePanel

[E-commerce]        [Communication]
ProductCard          ChatBubble
CartItem             CommentThread
```

Each component block shows:
- Live demo (interactive)
- Code icon (top right) → opens ViewSourceModal with Source + Components tabs
- Props table in accordion
- Implementation auto-loaded via `?raw`
