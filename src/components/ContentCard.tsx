import type { Book } from "@/lib/books";

export function ContentCard({ book }: { book: Book }) {
  return (
    <section>
      {book.cover && <img src={book.cover} alt={`Omslag til ${book.title}`} />}
      <h2 className="max-w-[20ch] truncate" title={book.title}>
        {book.title}
      </h2>
      <p>{book.authors.join(", ")}</p>
      <p>Rating: {book.rating ? `${book.rating}/5` : "Ingen vurdering"}</p>
    </section>
  );
}