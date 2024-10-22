import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";

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
        {/* <Image
          src="/layout/spider-web.png"
          alt="logo"
          width={200}
          height={200}
          className="hidden md:block absolute top-0 left-0"
        /> */}
        {children}
        <Image
          src="/layout/pumpkin1.png"
          alt="logo"
          width={200}
          height={200}
          className="hidden md:block absolute bottom-0 left-0"
        />
      </body>
    </html>
  );
}
