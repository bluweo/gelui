import { useState } from "react";
import type { CSSProperties } from "react";
import { Card, Divider } from "@/primitives/surfaces";
import { Heading, Text, Caption } from "@/primitives/typography";
import { Input, PasswordInput, FormGroup } from "@/primitives/inputs";
import { Checkbox } from "@/primitives/controls";
import { Button, LinkButton } from "@/primitives/buttons";
import { Stack } from "@/primitives/layout";

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string; remember: boolean }) => void;
  showSocial?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function LoginForm({
  onSubmit,
  showSocial = true,
  className = "",
  style,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = () => {
    onSubmit?.({ email, password, remember });
  };

  return (
    <div className={`w-full max-w-[400px] ${className}`} style={style}>
      <Stack gap="24px">
        <div className="text-center">
          <Heading level={3}>Welcome back</Heading>
          <Text className="text-[var(--theme-fg-muted)]">Sign in to your account</Text>
        </div>

        <Stack gap="16px">
          <FormGroup label="Email">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup label="Password">
            <PasswordInput
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <div className="flex items-center justify-between">
            <Checkbox
              checked={remember}
              onChange={setRemember}
              label="Remember me"
            />
            <LinkButton underline>Forgot?</LinkButton>
          </div>
        </Stack>

        <Button variant="solid" size="lg" fullWidth onClick={handleSubmit}>
          Sign In
        </Button>

        {showSocial && (
          <>
            <Divider label="or" />
            <Stack gap="8px">
              <Button variant="ghost" fullWidth>Continue with Google</Button>
              <Button variant="ghost" fullWidth>Continue with GitHub</Button>
            </Stack>
          </>
        )}

        <Caption className="text-center text-[var(--theme-fg-muted)]">
          Don't have an account? <LinkButton underline>Sign up</LinkButton>
        </Caption>
      </Stack>
    </div>
  );
}
