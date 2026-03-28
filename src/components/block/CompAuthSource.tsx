import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";
import IMPL_LOGIN from "@/components/composed/LoginForm.tsx?raw";
import IMPL_PROFILE from "@/components/composed/ProfileCard.tsx?raw";

const SOURCE_CODE = `import { LoginForm } from "@/components/composed";
import { ProfileCard } from "@/components/composed";

{/* Login Form */}
<LoginForm onSubmit={(data) => console.log(data)} showSocial />

{/* Profile Card */}
<ProfileCard
  name="Alice Chen"
  role="Lead Engineer"
  status="active"
  onEdit={() => console.log("edit")}
/>`;

const COMPONENTS = [
  {
    name: "LoginForm",
    path: "@/components/composed",
    description: "Email + password login with remember me, social login options, and signup link",
    implementation: IMPL_LOGIN,
    props: [
      { name: "onSubmit", type: "(data) => void" },
      { name: "showSocial", type: "boolean", default: "true" },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "ProfileCard",
    path: "@/components/composed",
    description: "User info card with avatar, name, role, status badge, and edit button",
    implementation: IMPL_PROFILE,
    props: [
      { name: "name", type: "string", options: ["required"] },
      { name: "role", type: "string", options: ["required"] },
      { name: "avatar", type: "string" },
      { name: "status", type: "enum", options: ["active", "away", "offline"], default: '"active"' },
      { name: "onEdit", type: "() => void" },
      { name: "className", type: "string" },
    ],
  },
];

export function CompAuthSource() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="comp-auth"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);
  return <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Auth & Account" code={SOURCE_CODE} components={COMPONENTS} />;
}
