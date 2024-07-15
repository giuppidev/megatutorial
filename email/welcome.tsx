import { Markdown } from "@react-email/markdown";
import { Body, Html } from "@react-email/components";

interface EmailProps {
  name: string;
}

export default function WelcomeEmail({ name }: EmailProps) {
  const content = `# Benvenuto **${name}**!`;
  return (
    <Html lang="en" dir="ltr">
      <Body className="bg-white my-auto mx-auto font-sans">
        <Markdown>{content}</Markdown>
      </Body>
    </Html>
  );
}
