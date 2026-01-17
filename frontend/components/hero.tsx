// import Image from "next/image";
// import { Container } from "./layout";
// import { getSectionContent } from "@/lib/strapi";
// import Galaxy from "./Galaxy";

// export async function Hero() {
//   const heroTitle = await getSectionContent("hero-title");
//   const heroSubtitle = await getSectionContent("hero-subtitle");
//   return (
//     <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
//       {/* Blue hero section with visible world map - matching WordPress EXACTLY */}
//       <div className="absolute inset-0">
//         {/* Radial gradient background matching WordPress */}
//         <div className="absolute inset-0 hero-gradient-bg" />
//         {/* World map background - VISIBLE like WordPress */}
//         <div
//           style={{
//             width: "100%",
//             height: "600px",
//             position: "relative",
//             backgroundColor: "black",
//           }}>
//           <Galaxy />
//         </div>
//         {/* <Image
//           src="https://res.cloudinary.com/dgb6qsvev/image/upload/v1763058470/cropped_Frame_3_5_6196a31cc0.jpg"
//           alt="Flo Labs Background"
//           fill
//           className="object-cover opacity-60"
//           priority
//         /> */}
//         {/* Subtle overlay to blend */}
//         <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0063b5]/10" />
//       </div>

//       <Container className="relative z-10">
//         <div className="mx-auto max-w-5xl text-center">
//           <div>
//             <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white">
//               {heroTitle?.content || "FloLabs Innovations Group"}
//             </h1>

//             <p className="text-2xl md:text-3xl text-white/95 mb-16">
//               {heroSubtitle?.content || "Advanced AI and Robotics Program"}
//             </p>

//             {/* Scroll indicator */}
//             <div className="mt-20">
//               <div className="inline-block text-white/70">
//                 <svg
//                   className="w-8 h-8 mx-auto animate-bounce"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

import Link from "next/link";
import { Container } from "./layout";
import { getSectionContent } from "@/lib/strapi";
import Galaxy from "./Galaxy";

export async function Hero() {
  const heroTitle = await getSectionContent("hero-title");
  const heroSubtitle = await getSectionContent("hero-subtitle");

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background. make it not capture clicks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 hero-gradient-bg" />

        <div
          className="absolute inset-0"
          style={{
            width: "100%",
            height: "100vh",
            position: "relative",
            backgroundColor: "black",
          }}>
          <Galaxy />
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0063b5]/10" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white">
            {heroTitle?.content || "FloLabs Innovations Group"}
          </h1>

          <p className="text-2xl md:text-3xl text-white/95 mb-16">
            {heroSubtitle?.content || "Advanced AI and Robotics Program"}
          </p>

          {/* Scroll indicator. clickable */}
          <div className="mt-20">
            <Link
              href="#home-content"
              aria-label="Scroll down"
              className="inline-flex items-center justify-center text-white/70 hover:text-white transition cursor-pointer">
              <svg
                className="w-8 h-8 mx-auto animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
