import { ChartBarBig } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="px-6 py-2 border-b border-muted-foreground/40">
      <nav className="flex justify-between items-center gap-2">
        <Link href="/">
          <div className="flex items-center gap-2">
            <ChartBarBig className="size-6" />
            <h2 className="text-lg font-semibold">
              Smart<span className="text-brand">Leads</span>
            </h2>
          </div>
        </Link>
      </nav>
    </header>
  );
}
