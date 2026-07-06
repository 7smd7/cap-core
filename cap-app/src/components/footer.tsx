import Link from "next/link";
import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-md bg-[#FF385C] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L3 10V21H9V14H15V21H21V10L12 3Z" fill="white"/>
                </svg>
              </span>
              <span className="font-bold tracking-tight text-[#FF385C]">CAP</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Capital as Passport. The first operating system for borderless living. You don't own anything. You coordinate everything.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Ecosystem</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">HousingCore</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">WorkOS</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">TrustLedger</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">CAP Invest</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#manifesto" className="hover:text-foreground transition-colors">Manifesto</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              <li className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Globe className="w-4 h-4" /> English (US)
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Project CAP. All rights reserved.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 cursor-pointer transition-colors">
              <span className="text-xs font-bold text-foreground">X</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 cursor-pointer transition-colors">
              <span className="text-xs font-bold text-foreground">in</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
