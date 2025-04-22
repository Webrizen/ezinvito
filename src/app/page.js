import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="py-8 mt-24">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row lg:items-stretch gap-10">
          <div className="lg:w-1/2 lg:py-10 xl:py-12 text-center lg:text-left max-w-2xl md:max-w-3xl mx-auto ">
            <h1 className="font-semibold leading-tight text-indigo-950 dark:text-white text-4xl md:text-5xl lg:text-6xl">
              Events die. {" "}
              <div className="relative after:absolute after:inset-x-0 after:h-3 after:bg-indigo-100 dark:after:bg-indigo-950 after:bottom-2 inline-block px-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-tr from-indigo-800 to-indigo-400">
                Memories don’t.
                </span>
              </div>
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300 text-lg">
            ezinvito doesn’t just manage your events. It captures every photo, RSVP, expense, and emotion — forever. 
            Because the people you invite? They matter.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href="#"
                className="flex items-center justify-center gap-x-2 px-5 py-2.5 border border-transparent bg-indigo-700 text-white"
              >
                Create Event
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/auth/sign-in"
                className="flex items-center justify-center gap-x-2 px-5 py-2.5 border border-gray-200 text-indigo-700 dark:border-gray-800 dark:text-white"
              >
                Explore Features
              </Link>
            </div>
            <div className="flex items-center gap-1 mt-10 justify-center lg:justify-start gap-x-3">
              <div className="flex items-center -space-x-2">
                <Image
                  src="/placeholder.svg"
                  width={2250}
                  height={1400}
                  alt="listener avatar"
                  className="w-10 h-10 object-cover rounded-full ring-4 ring-white dark:ring-gray-950"
                />
                <Image
                  src="/placeholder.svg"
                  width={2250}
                  height={1400}
                  alt="listener avatar"
                  className="w-10 h-10 object-cover rounded-full ring-4 ring-white dark:ring-gray-950"
                />
                <Image
                  src="/placeholder.svg"
                  width={2250}
                  height={1400}
                  alt="listener avatar"
                  className="w-10 h-10 object-cover rounded-full ring-4 ring-white dark:ring-gray-950"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  +12k
                </span>
                <span className="text-gray-600 text-sm dark:text-gray-300">
                  Events created
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative lg:h-auto max-w-2xl md:max-w-3xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-8 px-10 py-1.5 bg-white text-center border border-gray-100 shadow-lg shadow-gray-200/40 rounded-md">
              <span className="font-bold text-3xl text-indigo-950">+25</span>
              <p className="text-gray-600">Event Templates</p>
            </div>
            <Image
              src="/placeholder.svg"
              width={500}
              height={500}
              alt="sidebiew image"
              className="lg:w-full lg:h-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
