import { Button } from "@/components/ui/button";
import { signIn, signUp } from "./actions";

export default function AuthPage({ searchParams }: { searchParams: { message?: string } }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-secondary flex items-center justify-center p-6">
      <div className="bg-card w-full max-w-md rounded-3xl p-8 border border-border shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#FF385C] flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L3 10V21H9V14H15V21H21V10L12 3Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Welcome to CAP</h1>
          <p className="text-muted-foreground mt-2">Log in or create an account to continue.</p>
        </div>

        {searchParams?.message && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
            {searchParams.message}
          </div>
        )}

        <form className="space-y-4 flex flex-col">
          <div className="space-y-1">
            <label className="text-sm font-medium pl-1">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="you@example.com"
              className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-[#FF385C]/50 transition-all"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium pl-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="••••••••"
              className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-[#FF385C]/50 transition-all"
            />
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Button 
              formAction={signIn} 
              className="w-full h-12 bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-xl text-lg"
            >
              Log In
            </Button>
            <Button 
              formAction={signUp} 
              variant="outline" 
              className="w-full h-12 rounded-xl text-lg"
            >
              Create Account
            </Button>
          </div>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
