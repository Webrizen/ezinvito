import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative z-30">
      <SignIn />
    </div>
  );
}