import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Script from "next/script";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="q7Iz4hswuM51RriyDBt8nxz3kLPZcUDl5vvsm-k6IYg"
        />

        {/* Google Analytics */}
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

        {/* Heap Analytics */}
        <Script
          id="heap"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.heapReadyCb = window.heapReadyCb || [];
              window.heap = window.heap || [];
              heap.load = function(e, t) {
                window.heap.envId = e;
                window.heap.clientConfig = t = t || {};
                window.heap.clientConfig.shouldFetchServerConfig = false;
                var a = document.createElement("script");
                a.type = "text/javascript";
                a.async = true;
                a.src = "https://cdn.us.heap-api.com/config/" + e + "/heap_config.js";
                var r = document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(a, r);
                var n = ["init","startTracking","stopTracking","track","resetIdentity","identify","identifyHashed","getSessionId","getUserId","getIdentity","addUserProperties","addEventProperties","removeEventProperty","clearEventProperties","addAccountProperties","addAdapter","addTransformer","addTransformerFn","onReady","addPageviewProperties","removePageviewProperty","clearPageviewProperties","trackPageview"];
                var i = function(e) {
                  return function() {
                    var t = Array.prototype.slice.call(arguments, 0);
                    window.heapReadyCb.push({name: e, fn: function() { heap[e] && heap[e].apply(heap, t) }});
                  }
                };
                for (var p = 0; p < n.length; p++) heap[n[p]] = i(n[p]);
              };
              heap.load("1179613009");
            `,
          }}
        />

        {/* Mixpanel - Exact snippet you provided, placed as one Script block */}
        <Script
          id="mixpanel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(e,c){if(!c.__SV){var l,h;window.mixpanel=c;c._i=[];c.init=function(q,r,f){function t(d,a){var g=a.split(".");2==g.length&&(d=d[g[0]],a=g[1]);d[a]=function(){d.push([a].concat(Array.prototype.slice.call(arguments,0)))}}var b=c;"undefined"!==typeof f?b=c[f]=[]:f="mixpanel";b.people=b.people||[];b.toString=function(d){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);d||(a+=" (stub)");return a};b.people.toString=function(){return b.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" "); for(h=0;h<l.length;h++)t(b,l[h]);var n="set set_once union unset remove delete".split(" ");b.get_group=function(){function d(p){a[p]=function(){b.push([g,[p].concat(Array.prototype.slice.call(arguments,0))])}}for(var a={},g=["get_group"].concat(Array.prototype.slice.call(arguments,0)),m=0;m<n.length;m++)d(n[m]);return a};c._i.push([q,r,f])};c.__SV=1.2;var k=e.createElement("script");k.type="text/javascript";k.async=!0;k.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"=== e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(new RegExp("^//"))?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=e.getElementsByTagName("script")[0];e.parentNode.insertBefore(k,e)}})(document,window.mixpanel||[]);

             if (window.mixpanel && typeof window.mixpanel.init === 'function') {
              window.mixpanel.init('0c148ce055d32e1a5780196cb8f3721a', {
                 autocapture: true,
                 record_sessions_percent: 100,
        });
        console.log('Mixpanel initialized successfully');
      } else {
        console.warn('Mixpanel not ready yet - waiting for script load');
      }
            `,
          }}
        />
      </head>

      <body
        className={`${roboto.variable} ${poppins.variable} font-sans antialiased`}>
        {/* Skip to content for accessibility */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00349B] focus:text-white focus:rounded-md focus:shadow-lg">
          Skip to content
        </a>

        <Header />

        <main id="content" className="min-h-[calc(100vh-80px)] lg:min-h-screen">
          {children}
        </main>

        <Footer />

        {/* HubSpot Forms */}
        <Script
          id="hubspot-forms"
          src="https://js.hsforms.net/forms/embed/v2.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Roboto, Poppins } from "next/font/google";
// import "./globals.css";
// import { Header } from "@/components/header";
// import { Footer } from "@/components/footer";
// import Script from "next/script";

// const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   variable: "--font-roboto",
// });

// const poppins = Poppins({
//   weight: ["400", "500", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });

// export const metadata: Metadata = {
//   title: "Flolabs International | Innovation in AI & Robotics",
//   description:
//     "Join Flolabs International - Building the future through innovation in AI, robotics, and cutting-edge technology. Explore internship opportunities.",
//   keywords:
//     "AI, robotics, internships, technology, machine learning, engineering",
//   verification: {
//     google: "q7Iz4hswuM51RriyDBt8nxz3kLPZcUDl5vvsm-k6IYg",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* ================= Google Site Verification ================= */}
//         <meta
//           name="google-site-verification"
//           content="q7Iz4hswuM51RriyDBt8nxz3kLPZcUDl5vvsm-k6IYg"
//         />

//         {/* ================= Google Analytics ================= */}
//         <Script
//           id="ga-src"
//           strategy="afterInteractive"
//           src="https://www.googletagmanager.com/gtag/js?id=G-N505KSHR9D"
//         />

//         <Script
//           id="ga-init"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'G-N505KSHR9D');
//             `,
//           }}
//         />

//         {/* ================= Mixpanel FIXED ================= */}

//         {/* Load library */}
//         <Script
//           id="mixpanel-lib"
//           strategy="afterInteractive"
//           src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"
//         />

//         {/* Init + tracking */}
//         <Script
//           id="mixpanel-init"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.mixpanel = window.mixpanel || [];

//               mixpanel.init("0c148ce055d32e1a5780196cb8f3721a", {
//                 autocapture: true,
//                 track_pageview: true,
//                 persistence: "localStorage",
//                 record_sessions_percent: 100
//               });

//               mixpanel.track("Page Loaded");
//             `,
//           }}
//         />

//         {/* ================= Heap ================= */}
//         <Script
//           id="heap-init"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[];
//               heap.load=function(e,t){
//                 window.heap.envId=e;
//                 window.heap.clientConfig=t=t||{};
//                 var a=document.createElement("script");
//                 a.type="text/javascript";
//                 a.async=!0;
//                 a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";
//                 var r=document.getElementsByTagName("script")[0];
//                 r.parentNode.insertBefore(a,r);
//               };
//               heap.load("1179613009");
//             `,
//           }}
//         />
//       </head>

//       <body
//         className={`${roboto.variable} ${poppins.variable} font-sans antialiased`}
//       >
//         {/* Accessibility */}
//         <a
//           href="#content"
//           className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00349B] focus:text-white focus:rounded-md focus:shadow-lg"
//         >
//           Skip to content
//         </a>

//         <Header />

//         <main
//           id="content"
//           className="min-h-[calc(100vh-80px)] lg:min-h-screen"
//         >
//           {children}
//         </main>

//         <Footer />

//         {/* ================= HubSpot ================= */}
//         <Script
//           id="hubspot-forms"
//           src="https://js.hsforms.net/forms/embed/v2.js"
//           strategy="lazyOnload"
//         />
//       </body>
//     </html>
//   );
// }

// import type { Metadata } from "next";
// import { Roboto, Poppins } from "next/font/google";
// import "./globals.css";
// import { Header } from "@/components/header";
// import { Footer } from "@/components/footer";
// import Script from "next/script";

// const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   variable: "--font-roboto",
// });

// const poppins = Poppins({
//   weight: ["400", "500", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });

// export const metadata: Metadata = {
//   title: "Flolabs International | Innovation in AI & Robotics",
//   description:
//     "Join Flolabs International - Building the future through innovation in AI, robotics, and cutting-edge technology. Explore internship opportunities.",
//   keywords: "AI, robotics, internships, technology, machine learning, engineering",
//   verification: {
//     google: "q7Iz4hswuM51RriyDBt8nxz3kLPZcUDl5vvsm-k6IYg", // 🚀 Google Site Verification
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* ================= Google Site Verification ================= */}
//         <meta
//           name="google-site-verification"
//           content="q7Iz4hswuM51RriyDBt8nxz3kLPZcUDl5vvsm-k6IYg"
//         />

//         {/* ================= Google Analytics (GA4) ================= */}
//         <Script
//           id="ga-src"
//           strategy="afterInteractive"
//           src="https://www.googletagmanager.com/gtag/js?id=G-N505KSHR9D"
//         />
//         <Script
//           id="ga-init"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'G-N505KSHR9D');
//             `,
//           }}
//         />

//         {/* ================= Mixpanel ================= */}
//         <Script
//           id="mixpanel-all"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{
//             __html: `
//               (function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,f){function c(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var g=a;"undefined"!==typeof f?g=a[f]=[]:f="mixpanel";g.people=g.people||[];g.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};g.people.toString=function(){return g.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)c(g,l[h]);var e="set set_once union unset remove delete".split(" ");g.get_group=function(){function a(c){b[c]=function(){g.push([d,[c].concat(Array.prototype.slice.call(arguments,0))])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<e.length;c++)a(e[c]);return b};a._i.push([b,d,f])};a.__SV=1.2;var p=c.createElement("script");p.type="text/javascript";p.async=!0;p.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(p,d)}})(document,window.mixpanel||[]);
//               mixpanel.init('0c148ce055d32e1a5780196cb8f3721a', {
//                 autocapture: true,
//                 record_sessions_percent: 100,
//               });
//             `,
//           }}
//         />

//         {/* ================= Heap ================= */}
//         <Script
//           id="heap-init"
//           strategy="afterInteractive"
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],heap.load=function(e,t){window.heap.envId=e,window.heap.clientConfig=t=t||{},window.heap.clientConfig.shouldFetchServerConfig=!1;var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r);var n=["init","startTracking","stopTracking","track","resetIdentity","identify","getSessionId","getUserId","getUserProperties","addUserProperties","addEventProperties","removeEventProperty","clearEventProperties","addAccountProperties","addAdapter","addTransformer","addTransformerFn","onReady","addPageviewProperties","removePageviewProperty","clearPageviewProperties","trackPageview"],i=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);window.heapReadyCb.push({name:e,fn:function(){heap[e]&&heap[e].apply(heap,t)}})}};for(var p=0;p<n.length;p++)heap[n[p]]=i(n[p])};
//               heap.load("1179613009");
//             `,
//           }}
//         />
//       </head>

//       <body className={`${roboto.variable} ${poppins.variable} font-sans antialiased`}>
//         {/* Skip to content link for accessibility */}
//         <a
//           href="#content"
//           className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00349B] focus:text-white focus:rounded-md focus:shadow-lg transition-all duration-200"
//           aria-label="Skip to main content"
//         >
//           Skip to content
//         </a>

//         <Header />
//         <main id="content" className="min-h-[calc(100vh-80px)] lg:min-h-screen">
//           {children}
//         </main>
//         <Footer />

//         {/* ================= HubSpot ================= */}
//         <Script
//           id="hubspot-forms"
//           src="https://js.hsforms.net/forms/embed/v2.js"
//           strategy="lazyOnload"
//         />
//       </body>
//     </html>
//   );
// }
