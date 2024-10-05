import { resetPasswordAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage, Message } from "@/components/form-message";

export default function PasswordRecovery({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Password Recovery</h1>
      <p className="text-sm text-foreground">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <SubmitButton
          pendingText="Sending reset link..."
          formAction={resetPasswordAction}
        >
          Send reset link
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
