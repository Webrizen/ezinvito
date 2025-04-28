import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="w-full min-h-screen md:p-10 p-5">
        <div className="container mx-auto w-full h-full bg-primary/5 dark:bg-accent/50 dark:text-inherit text-zinc-50 rounded-xl">
          <div className="w-full space-y-6 py-24 px-4 md:text-center text-left flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:max-w-5xl bg-gradient-to-tr dark:from-zinc-300 dark:to-zinc-600 from-zinc-900 to-zinc-500 bg-clip-text text-transparent">
            Create stunning digital invitations for any occasion with AI.
            </h1>

            <p className="text-md md:text-xl dark:text-zinc-200 text-zinc-600 max-w-4xl">
              Create stunning, customizable invitations for any occasion in
              minutes. Share digitally or print - the choice is yours, and it's
              all powered by AI. 
            </p>

            <div className="flex flex-row md:justify-center md:items-center justify-left items-start gap-4 pt-4 w-full">
              <Link href="/auth/sign-up" className="bg-white text-zinc-900 hover:bg-zinc-100/80 md:px-8 md:py-3 px-6 py-3 rounded-full font-semibold md:text-lg text-sm transition-all dark:shadow-[inset_20px_30px_69px_-39px_rgba(0,_0,_0,_0.7)] shadow-[20px_30px_69px_-39px_rgba(0,_0,_0,_0.7)]">
                Create Invitation
              </Link>
              <Link href="/showcase" className="border-2 dark:border-white border-zinc-900/50 dark:text-white hover:dark:text-zinc-900 text-zinc-900 hover:bg-white hover:text-zinc-900 hover:bg-opacity-10 md:px-8 md:py-3 px-6 py-3 rounded-full font-semibold md:text-lg text-sm transition-all">
                See Examples
              </Link>
            </div>

            <div className="flex md:items-center md:justify-center w-full md:flex-row flex-col gap-2 pt-4 dark:text-zinc-300 text-zinc-600">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <img
                    key={item}
                    src={`https://randomuser.me/api/portraits/${
                      item % 2 === 0 ? "women" : "men"
                    }/${item}0.jpg`}
                    className="w-10 h-10 rounded-full border-2 border-zinc-900/30"
                    alt="Happy user"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm">Trusted by 10,000+ happy customers</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm ml-1">4.9 (1.2k reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
