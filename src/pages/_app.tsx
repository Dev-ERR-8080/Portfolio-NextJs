// import type { Metadata } from "next";
// import localFont from "next/font/local";



// const geistSans = localFont({
//   src: "src/fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "src/fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
// const wakile = localFont({
//   src: "src/fonts/wakile.woff",
//   variable: "--font-wakile",
//   weight: "100 900",
// });


// export const metadata: Metadata = {
//   title: "Preetham Reddy",
//   description: "Portfolio of Preetham Reddy",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
import { useLenisScroll } from "@/hooks/useLenisScroll";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MaintenancePage from "./maintenance";
export default function MyApp({ Component, pageProps }: AppProps) {
    const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
    console.log("Maintenance Mode:", maintenanceMode);
    useLenisScroll();
    if (maintenanceMode) {
        return <MaintenancePage />;
    }
    return <Component {...pageProps} />;
}

