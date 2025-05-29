import { AuroraBackground } from "@/components/ui/aurora-background";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { QrCode, Ticket, Scan, CalendarCheck, Users, Sparkles, ArrowRight, MapPin, BadgeCheck } from "lucide-react";
import { eventItems } from "@/enums/static-data";
import { cn } from "@/lib/utils";
import GridDistortion from "@/components/ui/grid-distortion";

export default function Home() {
  return (
    <>
      <section className="w-full min-h-screen md:p-10 p-5 relative bg-[url(/hero-bg.png)] bg-cover bg-center bg-no-repeat">
        <div className="container mx-auto w-full h-full rounded-xl">
          <div className="w-full space-y-6 py-24 px-4 md:text-center text-left flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:max-w-5xl bg-gradient-to-bl from-zinc-50 to-zinc-200 bg-clip-text text-transparent">
              Create stunning digital invitations for any occasion with AI.
            </h1>

            <p className="text-md md:text-xl text-zinc-400 max-w-4xl">
              Create stunning, customizable invitations for any occasion in
              minutes. Share digitally or print - the choice is yours, and it's
              all powered by AI.
            </p>

            <div className="flex flex-row md:justify-center md:items-center justify-left items-start gap-4 pt-4 w-full">
              <Link
                href="/auth/sign-up"
                className="bg-white text-zinc-600 hover:bg-zinc-100 md:px-8 md:py-3 px-6 py-3 rounded-full font-semibold md:text-lg text-sm transition-all shadow-[20px_30px_69px_-39px_rgba(0,_0,_0,_0.3)]"
              >
                Create Invitation
              </Link>
              <Link
                href="/showcase"
                className="border-2 border-zinc-400 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-700 md:px-8 md:py-3 px-6 py-3 rounded-full font-semibold md:text-lg text-sm transition-all"
              >
                See Examples
              </Link>
            </div>

            <div className="flex md:items-center md:justify-center w-full md:flex-row flex-col gap-2 pt-4 text-zinc-600">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <img
                    key={item}
                    src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? "women" : "men"
                      }/${item}0.jpg`}
                    className="w-10 h-10 rounded-full border-2 border-zinc-200"
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

      <section className="w-full py-20 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-purple-500/20 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full filter blur-3xl opacity-30 dark:opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r dark:from-white from-zinc-900 dark:to-zinc-400 to-zinc-600 bg-clip-text text-transparent">
            Powerful Event Management Features
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-12 text-center max-w-xl mx-auto">
            Our platform offers a comprehensive suite of tools designed to enhance every aspect of event management, from planning to execution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-zinc-700/50 shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant QR Code RSVPs</h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Generate unique QR codes for each event that guests can scan to instantly RSVP, reducing no-shows by up to 70%.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-zinc-700/50 shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Generated VIP Passes</h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Our AI automatically designs custom VIP passes based on your event theme, complete with QR verification.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-zinc-700/50 shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Calendar Sync</h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Automatic calendar integration ensures guests never miss your event with timely reminders and updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-zinc-100 dark:bg-zinc-950">
        <div className="container mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r dark:from-white from-zinc-900 dark:to-zinc-400 to-zinc-600 bg-clip-text text-transparent">
            Explore Our Event Management Solutions.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-12 text-center max-w-xl mx-auto">
            From AI-generated invitations to real-time guest management, our platform offers everything you need to create unforgettable events.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
            {eventItems.map((item) => (
              <Link
                href="#"
                key={`${item.title}-${item.status || item.meta}`}
                className={cn(
                  "group relative",
                  item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
                )}
              >
                <Card
                  className={cn(
                    "h-full transition-all duration-300",
                    "hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600",
                    "border border-zinc-200 dark:border-zinc-800",
                    "bg-white dark:bg-zinc-900",
                    {
                      "shadow-md border-zinc-300 dark:border-zinc-600":
                        item.hasPersistentHover,
                    }
                  )}
                >
                  {/* Grid texture overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="h-full w-full [background-size:20px_20px] [background-image:linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
                  </div>

                  <CardHeader className="relative space-y-0 p-6 pb-0">
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        "bg-zinc-100 dark:bg-zinc-800",
                        "group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700",
                        "transition-colors duration-300"
                      )}>
                        {item.icon}
                      </div>
                      {item.status && (
                        <span className={cn(
                          "text-xs font-medium px-2.5 py-1 rounded-full",
                          "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300",
                          "group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700",
                          "transition-colors duration-300"
                        )}>
                          {item.status}
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="relative space-y-0 p-6">
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight text-lg">
                        {item.title}
                      </h3>
                      {item.meta && (
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
                          {item.meta}
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-snug">
                      {item.description}
                    </p>
                  </CardContent>

                  <CardFooter className="relative p-6 py-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        {item.tags?.map((tag) => (
                          <span
                            key={`${item.title}-${tag}`}
                            className={cn(
                              "px-2.5 py-1 rounded-full",
                              "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300",
                              "group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700",
                              "transition-colors duration-300"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </CardFooter>

                  {/* Hover border animation */}
                  <div className={cn(
                    "absolute inset-0 rounded-lg pointer-events-none",
                    "border-2 border-transparent group-hover:border-zinc-200 dark:group-hover:border-zinc-700",
                    "transition-all duration-300",
                    item.hasPersistentHover ? "border-zinc-200 dark:border-zinc-700" : ""
                  )} />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 relative">
        <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5">
            <div className="grid grid-cols-5 grid-rows-5 w-full h-full">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="border border-zinc-300 dark:border-zinc-700"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r dark:from-white from-zinc-900 dark:to-zinc-400 to-zinc-600 bg-clip-text text-transparent">
            Trusted by Event Planners Worldwide
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-12 text-center max-w-xl mx-auto">
            Hear from our satisfied customers who have transformed their events with our AI-powered invitation platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform cut our event setup time by 80% and made check-ins a breeze with the QR system.",
                name: "Sarah Johnson",
                title: "Corporate Events Director",
                rating: 5
              },
              {
                quote: "The AI-generated invitations get compliments every time. Our guests love the digital passes!",
                name: "Michael Chen",
                title: "Wedding Planner",
                rating: 5
              },
              {
                quote: "From small meetups to 500+ person conferences, this tool scales beautifully.",
                name: "David Rodriguez",
                title: "Tech Conference Organizer",
                rating: 4
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-lg rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg italic mb-6 text-zinc-700 dark:text-zinc-200">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 mr-3 overflow-hidden">
                    <img
                      src={`https://randomuser.me/api/portraits/${idx % 2 === 0 ? "women" : "men"}/${idx + 10}.jpg`}
                      width={40}
                      height={40}
                      alt={testimonial.name}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-zinc-100 dark:bg-zinc-950">
        <div className="container mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r dark:from-white from-zinc-900 dark:to-zinc-400 to-zinc-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                q: "Is there a free plan available?",
                a: "Yes! We offer a generous free tier with access to basic features and limited exports.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Of course! You can cancel your subscription at any time without any hidden fees.",
              },
              {
                q: "Do I own the rights to the invitations I create?",
                a: "Yes. All invitations you create are yours to use freely for personal or commercial purposes.",
              },
              {
                q: "Can I collaborate with others on an invitation?",
                a: "Yes! Invite team members or guests to view or edit your invitation in real-time.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow transition-shadow"
              >
                <h3 className="font-semibold text-lg">{faq.q}</h3>
                <p className="text-zinc-600 dark:text-zinc-300 mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-zinc-50 dark:bg-zinc-900 text-white relative overflow-hidden md:h-[60vh] h-auto flex justify-center items-center">
        <div className="w-full h-20 bg-white/10 blur-[990px] absolute -top-5 left-0 right-0 mx-auto" />
        <GridDistortion
          imageSrc="/cta-bg.png"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="h-full w-full absolute inset-0 left-0 right-0 top-0 bottom-0"
        />
        <div className="max-w-7xl mx-auto px-5 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Events?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of event professionals creating unforgettable experiences with our AI-powered platform,
            completely free for 14 days.
          </p>
        </div>
      </section>
    </>
  );
}
