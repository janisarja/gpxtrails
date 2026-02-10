import '@/src/styles/globals.css';
import Header from '@/src/components/ui/header';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
          href="#main-content"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
