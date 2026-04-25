import { sekuya } from "@/enums/fonts";
import Image from "next/image";
import heroImg from "@/assets/hero.png";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <section className="w-full min-h-[calc(100vh-85px)] relative flex flex-col justify-end">
      <Image src={heroImg} quality={[100, 75]} placeholder="blur" alt="Hero" className="w-full h-full object-cover absolute top-0 left-0 z-0" />
      <div className="absolute bottom-0 top-auto size-full bg-linear-to-t from-black via-black/50 to-transparent" />
      <div className="relative z-10 text-left space-y-3 p-6 h-full flex flex-col justify-end">
        <h1 className={`text-7xl font-bold ${sekuya.className} bg-linear-to-r from-teal-50 via-teal-100 to-teal-200 bg-clip-text text-transparent`}>Bring back the way we celebrate.</h1>
        <span className="text-3xl max-w-4xl text-white">Every moment, every celebration, every memory using our state of the art platform and LLMs.</span>
        <p className="text-lg max-w-4xl text-white/50">We believe that every celebration deserves to be remembered, and every memory deserves to be shared.</p>
        <div className="flex items-center gap-4">
          <Link href="/auth/sign-up" className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors w-min whitespace-nowrap">
            Get Started
          </Link>
          <Link href="/#features" className="text-white/80 px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors w-min whitespace-nowrap">
            Learn more
          </Link>
        </div>
      </div>
    </section>
    <section className="w-full min-h-screen flex justify-center items-center">
     <h2 className="text-7xl font-bold">More Sections to come soon...</h2>
    </section>
    </>
  );
}