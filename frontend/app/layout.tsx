import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BrandProvider } from "@/components/brand-provider";
import { NavigationLoadingProvider } from "@/components/navigation-loading";
import { getServerBrand } from "@/lib/branding";
import Script from "next/script";
import { getSessionUser, markSessionUserVisited } from "@/lib/application-store";

export const dynamic = "force-dynamic";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "FloLabs International | Innovation in AI & Robotics",
  description:
    "Join FloLabs International - Building the future through innovation in AI, robotics, and cutting-edge technology. Explore internship opportunities.",
  keywords: "AI, robotics, internships, technology, machine learning, engineering",
  verification: {
    google: "q7Iz4hswuM51RriyDBt8nxz3kLPZcUDl5vvsm-k6IYg",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const brand = await getServerBrand();
  const viewer = await getSessionUser();
  if (viewer) {
    await markSessionUserVisited(viewer).catch(() => {});
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KL5K4PTR');`,
          }}
        />
        <Script
          id="heap"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],heap.load=function(e,t){window.heap.envId=e,window.heap.clientConfig=t=t||{};var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r)};heap.load("1179613009");`,
          }}
        />
        <Script id="mixpanel-lib" strategy="afterInteractive" src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" />
        <Script
          id="mixpanel-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.mixpanel=window.mixpanel||[];mixpanel.init("0c148ce055d32e1a5780196cb8f3721a",{autocapture:true,record_sessions_percent:100});`,
          }}
        />
        <Script id="ga-src" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-N505KSHR9D" />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-N505KSHR9D');`,
          }}
        />
      </head>
      <body className={`${roboto.variable} ${poppins.variable} font-sans antialiased`}>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KL5K4PTR" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        <NavigationLoadingProvider>
          <BrandProvider initialBrand={brand}>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00349B] focus:text-white focus:rounded-md focus:shadow-lg"
            >
              Skip to content
            </a>
            <Header
              viewer={
                viewer
                  ? {
                      firstName: viewer.firstName,
                      email: viewer.email,
                      role: viewer.role,
                      hrBinaryRole: viewer.hrBinaryRole,
                      profilePictureUrl: viewer.profilePictureUrl,
                    }
                  : null
              }
            />
            <main id="content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </BrandProvider>
        </NavigationLoadingProvider>
        <Script id="hubspot-forms" src="https://js.hsforms.net/forms/embed/v2.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
