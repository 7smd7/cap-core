import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch role if logged in
  let role: string | null = null;
  let initials = "U";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .single();
    role = profile?.role || null;
    const name = profile?.full_name || user.email || "U";
    initials = name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#FF385C] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L3 10V21H9V14H15V21H21V10L12 3Z" fill="white"/>
              </svg>
            </span>
            <span className="font-bold text-lg tracking-tight text-[#FF385C]">CAP</span>
          </Link>
          <div className="hidden md:flex gap-6">
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Homes
                </Link>
                <Link href="/dashboard/invest" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  CAP Invest
                </Link>
                {role === "admin" && (
                  <Link href="/dashboard/admin" className="text-sm font-medium text-[#FF385C] hover:text-[#E31C5F] transition-colors font-semibold">
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Homes
                </Link>
                <Link href="/#manifesto" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Manifesto
                </Link>
                <Link href="/#zeroday" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Arrival
                </Link>
                <Link href="/#ecosystem" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Ecosystem
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link href="/auth">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Log In</Button>
              </Link>
              <Link href="/explore">
                <Button className="bg-[#FF385C] hover:bg-[#E31C5F] text-white">Explore</Button>
              </Link>
            </>
          ) : (
            /* Avatar dropdown — logout lives here, not cluttering the header */
            <div className="relative group">
              <button className="w-9 h-9 rounded-full bg-[#FF385C] text-white text-sm font-bold flex items-center justify-center hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#FF385C]/50">
                {initials}
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-52 bg-background border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-xs text-muted-foreground">Signed in as</p>
                  <p className="text-sm font-medium truncate">{user.email}</p>
                  {role === "admin" && (
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-[#FF385C]/10 text-[#FF385C] px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <div className="py-1">
                  <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/invest" className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    CAP Invest
                  </Link>
                  {role === "admin" && (
                    <Link href="/dashboard/admin" className="flex items-center px-4 py-2 text-sm text-[#FF385C] hover:bg-secondary transition-colors font-medium">
                      Admin Panel
                    </Link>
                  )}
                </div>
                <div className="border-t border-border py-1">
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      Log Out
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
