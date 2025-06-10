import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata = {
  title: "Food Order App",
  description: "Order your favorite food online!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
