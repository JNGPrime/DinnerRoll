import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full border-t border-amber-900/20 bg-[rgba(45,24,16,0.95)] py-4 px-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-extrabold text-amber-400 text-sm">DinnerRoll</span>
        <div className="flex items-center gap-2">
          <Link href="/legal" className="text-white/35 text-xs hover:text-amber-400 transition-colors" data-testid="link-footer-legal">
            Terms & Privacy
          </Link>
          <span className="text-white/15 text-xs">|</span>
          <Link href="/legal" className="text-white/35 text-xs hover:text-amber-400 transition-colors" data-testid="link-footer-allergy">
            Allergy Disclaimer
          </Link>
        </div>
        <p className="text-white/25 text-[0.65rem]">Not a medical or dietary advisory service. Use at your own risk.</p>
      </div>
    </footer>
  );
}
