import './globals.css';

export const metadata = {
  title: 'News',
  description: 'Simple News Web Crawling',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
