import localFont from "next/font/local";
import "./globals.css";

const nunitoSans = localFont({
  src: "./fonts/NunitoSans_10pt-Regular.ttf",
  variable: "--font-nunito-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Halloween Pets",
  description: "Submit your pet and get your pet with a halloween costume.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
