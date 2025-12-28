import "./globals.css";
import Navbar from "./components/navbar";

export const metadata = {
  title: "Ovarian Cancer Risk Prediction",
  description: "Clinical decision support demo (ML-based)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="mt-16 border-t text-center text-xs text-gray-400 py-4">
          This tool is for research and educational purposes only.
        </footer>
      </body>
    </html>
  );
}
