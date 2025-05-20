import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="w-full flex justify-end items-center px-6 py-4 fixed top-0 left-0 bg-transparent z-50">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </header>
          <main className="pt-20">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
