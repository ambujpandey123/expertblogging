import Header from "./component/Header/header";
import "./globals.css";

export const metadata = {
  title:"expertBlogging",
  description:"blogging website by next js"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Header />
        {children}
      </body>
    </html>
  );
}
