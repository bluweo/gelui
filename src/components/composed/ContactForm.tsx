import { useState } from "react";
import type { CSSProperties } from "react";
import { Heading, Text } from "@/primitives/typography";
import { Input, Textarea, Select, FormGroup } from "@/primitives/inputs";
import { Button } from "@/primitives/buttons";
import { Stack, Inline } from "@/primitives/layout";

interface ContactFormProps {
  onSubmit?: (data: { name: string; email: string; subject: string; message: string }) => void;
  subjects?: string[];
  className?: string;
  style?: CSSProperties;
}

export function ContactForm({
  onSubmit,
  subjects = ["General", "Support", "Sales", "Partnership"],
  className = "",
  style,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    onSubmit?.({ name, email, subject, message });
  };

  return (
    <div className={`w-full max-w-[480px] ${className}`} style={style}>
      <Stack gap="20px">
        <div>
          <Heading level={3}>Contact Us</Heading>
          <Text className="text-[var(--theme-fg-muted)]">We'd love to hear from you</Text>
        </div>

        <Inline gap="12px" className="max-[540px]:flex-col">
          <FormGroup label="Name" className="flex-1">
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormGroup>
          <FormGroup label="Email" className="flex-1">
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>
        </Inline>

        <FormGroup label="Subject">
          <Select options={subjects} placeholder="Select a topic" value={subject} onChange={setSubject} />
        </FormGroup>

        <FormGroup label="Message">
          <Textarea
            placeholder="Tell us what you need..."
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormGroup>

        <Inline justify="end" gap="8px">
          <Button variant="ghost">Cancel</Button>
          <Button variant="solid" onClick={handleSubmit}>Send Message</Button>
        </Inline>
      </Stack>
    </div>
  );
}
