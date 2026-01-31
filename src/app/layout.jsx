import '../styles/globals.css';
import Header from '../components/header';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Header />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
