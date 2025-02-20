import SolarForm from "@/components/solar-form/SolarForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 z-0 lg:h-screen w-full h-fit py-10 lg:py-0"
        style={{
          backgroundImage: "url('/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* logo */}
        <div className="container">
          <div className="relative z-50">
            <div className="text-2xl font-bold text-white w-10 py-2">
              <Link className="text-white" href={"/"}>Homeowners
                Benefit</Link>
            </div>
            <div className="grid lg:grid-cols-5 lg:gap-10 pt-2 pb-6 lg:py-36 items-center">
              <div className="lg:col-span-3">
                <h1 className="text-2xl lg:text-6xl text-white font-medium lg:!leading-[75px]">Power Your Home. Empower Your Future. Switch to Solar Today!</h1>
                <ul className="text-white list-disc pl-6 mt-4 lg:mt-16 mb-5 lg:mb-0 lg:w-[500px]">
                  <li>Experience Lower Electricity Bills with Solar Power</li>
                  <li>Clean Energy Independence. Invest in a Greener Future</li>
                  <li>Transform Your Roof into a Revenue Stream. Monetize Surplus Solar Energy Through Grid Export</li>
                </ul>
              </div>
              <div className="lg:col-span-2">
                <SolarForm />
              </div>
            </div>

            <div className="flex flex-wrap justify-between lg:fixed bottom-2 lg:bottom-10 left-1/2 lg:-translate-x-1/2 lg:w-[1380px]">
              <div>
                <p className="text-white">© 2024 HomeownersBenifit. All rights reserved</p>
              </div>
                <ul className="flex justify-start items-center lg:gap-10 text-white">
                  <li >
                    <Link href={"/"}>Terms</Link>
                  </li>
                  <li className="border-x px-5 border-gray-500">
                    <Link href={"/"}>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href={"/"}>Licence Information</Link>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
