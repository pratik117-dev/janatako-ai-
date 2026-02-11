import { Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
      {/* Social */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="mb-4 text-sm font-semibold text-foreground">JAI Online</p>
        <div className="flex gap-5">
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-muted-foreground hover:text-primary transition-colors">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook size={20} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
            <Youtube size={20} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.11a8.16 8.16 0 003.76.92V6.69z"/></svg>
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            JAI is a fictional public-accountability AI character.
            JAI does not seek votes, endorse candidates, or represent any political party.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            © janatakoai.com | Election 2082
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;