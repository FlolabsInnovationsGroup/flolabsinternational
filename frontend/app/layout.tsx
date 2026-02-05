import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Script from "next/script";
import MixpanelTracker from "@/components/MixpanelTracker";

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
  title: "Flolabs International | Innovation in AI & Robotics",
  description:
    "Join Flolabs International - Building the future through innovation in AI, robotics, and cutting-edge technology. Explore internship opportunities.",
  keywords:
    "AI, robotics, internships, technology, machine learning, engineering",

  // ✅ Google Search Console verification
  verification: {
    google: "q7Iz4hswuM51RriyDBt8nxz3kLPZcUDl5vvsm-k6IYg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ================= Google Analytics ================= */}
        <Script
          id="ga-src"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-N505KSHR9D"
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N505KSHR9D');
            `,
          }}
        />

        {/* ================= Mixpanel ================= */}
        <Script
          id="mixpanel-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(f,b){
                if(!b.__SV){
                  var a,e,i,g;
                  window.mixpanel=b;
                  b._i=[];
                  b.init=function(e,f,c){
                    function g(a,d){
                      var b=d.split(".");
                      2==b.length&&(a=a[b[0]],d=b[1]);
                      a[d]=function(){
                        a.push([d].concat(Array.prototype.slice.call(arguments,0)))
                      }
                    }
                    var a=b;
                    "undefined"!==typeof c?a=b[c]=[]:c="mixpanel";
                    a.people=a.people||[];
                    a.toString=function(a){
                      var d="mixpanel";
                      "mixpanel"!==c&&(d+="."+c);
                      a||(d+=" (stub)");
                      return d
                    };
                    a.people.toString=function(){return a.toString(1)+".people (stub)"};                    
                    i="track track_pageview register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
                    for(g=0;g<i.length;g++)g(a,i[g]);
                    b._i.push([e,f,c])
                  };
                  b.__SV=1.2;
                  a=f.createElement("script");
                  a.type="text/javascript";
                  a.async=!0;
                  a.src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
                  e=f.getElementsByTagName("script")[0];
                  e.parentNode.insertBefore(a,e)
                }
              })(document,window.mixpanel||[]);

              if (window.mixpanel) {
                mixpanel.init("0c148ce055d32e1a5780196cb8f3721a", {
                  autocapture: true
                });
                mixpanel.track("Site Loaded");
              } else {
                console.error("Mixpanel not loaded.");
              }
            `,
          }}
        />

        {/* ================= Heap ================= */}
        <Script
          id="heap-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],
              heap.load=function(e,t){
                window.heap.envId=e;
                window.heap.clientConfig=t=t||{};
                window.heap.clientConfig.shouldFetchServerConfig=!1;
                var a=document.createElement("script");
                a.type="text/javascript";
                a.async=!0;
                a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";
                var r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(a,r);
              };
              if (window.heap) {
                heap.load("1179613009");
              } else {
                console.error("Heap not loaded.");
              }
            `,
          }}
        />
      </head>

      <body className={`${roboto.variable} ${poppins.variable} font-sans`}>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00349B] focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to content
        </a>

        <Header />

        {/* Page tracking */}
        <MixpanelTracker />

        <main id="content" className="min-h-screen">
          {children}
        </main>

        <Footer />

        {/* ================= HubSpot ================= */}
        <Script
          id="hubspot-forms"
          src="https://js.hsforms.net/forms/embed/v2.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
