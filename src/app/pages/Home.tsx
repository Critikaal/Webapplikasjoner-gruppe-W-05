import { ContentCard } from "@/components/ContentCard";
import { searchBooks } from "@/lib/books";
import { env } from "cloudflare:workers"

/**
 * En server-komponent. Den kjører på serveren, én gang per forespørsel, og
 * nettleseren får ferdig HTML. Derfor viser klokka under tidspunktet på
 * serveren, og den endrer seg bare når du laster siden på nytt.
 *
 * Server-komponent er standarden i RedwoodSDK. Trenger du klikk eller state,
 * lager du en klient-komponent, som `TimeClient` og `Counter` under.
 */
export async function Home({request}: {request: Request}) {
   const q = new URL(request.url).searchParams.get("q") ?? "";
  const books = await searchBooks(q || "the lord of the rings", env.GOOGLE_BOOKS_KEY);
  const now = new Date().toLocaleString("no-NO");
 

  return (
    <main className="mx-auto max-w-2xl p-8 font-sans">
      <div>
        <form method="get">
          <input type="search" name="q" defaultValue={q} placeholder="Søk etter bøker" />
          <button type="submit">Søk</button>
        </form>
      </div>
    
      <div className="card-grid">
        {books.map((b) => <ContentCard key={b.id} book={b} />)}
      </div>
      
    </main>
  );
}
