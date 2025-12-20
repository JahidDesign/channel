// app/entertainment/page.tsx
import type { Metadata } from "next";
import EntertainmentCards from '../../../components/pages/entertainmentCards/EntertainmentCards';
export const metadata: Metadata = {
  title: "Entertainment News",
  description: "Latest entertainment news, movies, music, and celebrity updates",
};

export default function EntertainmentPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Page Heading */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Entertainment</h1>
        <p className="text-gray-600">
          Movies, music, TV shows, and celebrity news
        </p>
      </section>
        <EntertainmentCards/>
     
    </main>
  );
}
