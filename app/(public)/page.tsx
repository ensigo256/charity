"use client";

import { Hero } from "@/components/public/hero";
import { ImpactMetrics } from "@/components/public/impact-metrics";
import { ProgramsSection } from "@/components/public/programs-section";
import { AboutPreview } from "@/components/public/about-preview";
import { Testimonials } from "@/components/public/testimonials";
import { GallerySkeleton } from "@/components/public/gallery-skeleton";
import { GetInvolvedSection } from "@/components/public/get-involved-section";
import { EventsSkeleton } from "@/components/public/events-skeleton";
import { BlogCard } from "@/components/public/blog-card";
import { NewsSkeleton } from "@/components/public/news-skeleton";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ArrowUp,
  CalendarClock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  PhoneCall,
  Send,
} from "lucide-react";
import Link from "next/link";
import ScrollStack, { ScrollStackItem } from "@/lib/scrollStackJs";
import StackCards from "@/components/public/scroll-stack";
import {
  AnimatedElement,
  AnimatedContainer,
  AnimatedCard,
} from "@/components/motion/animated-elements";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import ScrollReveal from "@/lib/fontAnimation";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/query-client";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { FAQSchema } from "@/components/seo/faq-schema";

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);

  const { data: galleryData, isLoading: galleryLoading } = useQuery<any[]>({
    queryKey: ["gallery", "all"],
  });
  const { data: postsData, isLoading: postsLoading } = useQuery<any[]>({
    queryKey: ["blogs", "all"],
  });
  const { data: eventsData, isLoading: eventsLoading } = useQuery<any[]>({
    queryKey: ["events", "all"],
  });
  const { data: stripePaymentSettings, isLoading: stripePaymentSettingsLoading } = useQuery<{
    configured: boolean;
    paymentUrl: string;
  }>({
    queryKey: ["stripe-payment-link", "public"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/sponsors/settings/stripe-payment-link/public");
      return response.json();
    },
  });

  useEffect(() => {
    if (galleryData) {
      setGallery((galleryData as any) || []);
    }

    if (postsData) {
      setPosts((postsData as any) || []);
    }
    if (eventsData) {
      setEvents((eventsData as any) || []);
    }
  }, [galleryData, postsData, eventsData]);
  const impactMetrics = [
    {
      label: "Communities Impacted",
      value: "20+",
      img: "/counter-icon-1-1.png",
    },
    { label: "Meals Provided", value: "500+", img: "/counter-icon-1-2.png" },
    {
      label: "Children Supported",
      value: "100+",
      img: "/counter-icon-1-3.png",
    },
    { label: "transparency", value: "15+", img: "/counter-icon-1-4.png" },
  ];

  const images = [
    { src: "/donation-image.jpg", alt: "Community outreach program" },
    { src: "/event-image.png", alt: "Educational workshop" },
    { src: "/volunter-bg.jpg", alt: "Volunteer activities" },
    { src: "/hero-bg-1-1.jpg", alt: "School supplies distribution" },
    { src: "/hero-bg-1-2.jpg", alt: "Clean water initiative" },
    { src: "/hero-bg-1-3.jpg", alt: "Nutrition support program" },
  ];

  const donators = [
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-1.jpg",
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-2.jpg",
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-3.jpg",
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-4.jpg",
  ];

  const handleNewsletterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedEmail = newsletterEmail.trim();
    if (!trimmedEmail) {
      setNewsletterStatus("error");
      setNewsletterMessage("Please enter your email address.");
      return;
    }

    try {
      setNewsletterSubmitting(true);
      const response = await apiRequest("POST", "/newsletter/subscribe", {
        email: trimmedEmail,
        name: "Website Visitor",
      });
      const data = await response.json();

      setNewsletterStatus("success");
      setNewsletterMessage(data.message || "Thank you for subscribing!");
      setNewsletterEmail("");
    } catch (error) {
      setNewsletterStatus("error");
      setNewsletterMessage(error instanceof Error ? error.message : "Unable to subscribe right now.");
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const socialMediaLinks = [
    { icon: Facebook, url: "https://www.facebook.com/SeedsOfLove" },
    { icon: "", url: "https://twitter.com/SeedsOfLove" },
    { icon: Instagram, url: "https://www.instagram.com/SeedsOfLove" },
    { icon: Linkedin, url: "https://www.linkedin.com/company/SeedsOfLove" },
  ];
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <OrganizationSchema />
      <FAQSchema />
      <Navbar />

      <Hero />
      <Marquee className="bg-white gap-3 flex items-center justify-evenly">
        <a target="_blank" href="https://btm.ug/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGqs4wL9zZB2_C6S3uHd7HrmvHapPu3NeM8w&s"
            className="w-40   h-30 shadow-lg mr-5 border-r-2 border-l-2 border-green-800"
          />
        </a>
        <a target="_blank" href="https://faithlifeministries-ug.vercel.app/">
          <img
            src="https://res.cloudinary.com/ghost150/image/upload/v1761738140/FAITHLIFE_LOGO_z9xkpt.png"
            className="w-40   h-30 shadow-lg mr-5  border-green-800"
          />
        </a>
        <a target="_blank" href="#">
          <img
            src="https://pbs.twimg.com/profile_images/1818999907979538432/lQW2Lplg_400x400.jpg"
            className="w-40   h-30 shadow-lg mr-5  border-green-800"
          />
        </a>
      </Marquee>

      <ProgramsSection />

      <AboutPreview />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Why families and donors trust us
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              Compassionate support for children, families, and communities
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Direct care
              </p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Education & meals
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                We help meet everyday essentials so children can learn, grow,
                and feel safe.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Community
              </p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Family support
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                We stand with vulnerable households through practical care and
                meaningful community outreach.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Transparent
              </p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Real impact
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Our work is rooted in accountability, dignity, and long-term
                support for those we serve.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Secure giving
              </p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Simple donation
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Support a child or give to a program with a clear, safe, and easy
                giving experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ImpactMetrics />

      <Testimonials />

      {/* Gallery Section */}
      {galleryLoading ? (
        <GallerySkeleton />
      ) : (
        gallery.length > 0 && (
          <AnimatedElement variant="fadeInUp">
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2
                    style={{ fontFamily: "Quicksand" }}
                    className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                  >
                    Our Impact in Action
                  </h2>
                  <p
                    style={{ fontFamily: "Quicksand" }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  >
                    See the difference we're making in communities around the
                    world through our programs and initiatives.
                  </p>
                </div>

                <Splide
                  options={{
                    type: "loop",
                    perPage: 4,
                    perMove: 1,
                    gap: "1rem",
                    autoplay: true,
                    interval: 3000,
                    pauseOnHover: true,
                    breakpoints: {
                      768: {
                        perPage: 2,
                      },
                      640: {
                        perPage: 1,
                      },
                    },
                  }}
                  className="gallery-slider"
                >
                  {gallery.map((image: any, index: number) => (
                    <SplideSlide key={index}>
                      <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg group">
                        <img
                          src={image?.image?.url}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white text-center px-4 font-medium">
                            {image.title}
                          </p>
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
            </section>
          </AnimatedElement>
        )
      )}

      {/* Volunteer section */}
      <AnimatedElement variant="fadeInUp">
        <section className="py-14 sm:py-16  px-2 sm:px-4 mt-14 md:px-0 bg-card">
          {/* relative sm:mt-14 sm:flex z-10 max-w-6xl mx-auto */}
          <section className="py-16 text-right rounded-md relative sm:px-4 md:px-8 bg-green-900 h-96  sm:h-140   border-y sm:mx-10 border-green-800">
            <Link
              style={{ fontFamily: "Quicksand" }}
              href="/contact"
              className="absolute flex items-center justify-center bg-primary  text-white rounded-lg  lg:hidden top-0 left-5  p-2"
            >
              Join Us
            </Link>
            <span className="  sm:absolute z-10 left-40 md:left-10 top-20">
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-2xl font-bold sm:text-4xl text-white sm:font-bold mb-4 text-left pl-4 sm:text-center "
              >
                VOLUNTEERS MAKING A <br /> DIFFERENCE
              </p>
            </span>
            <span className="sm:absolute z-10 right-50 top-20">
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-xl lg:hidden text-xlg sm:text-4xl text-white font-bold sm:font-bold mb-4 pl-4 text-left sm:text-center"
              >
                With Over 20+ YEARS OF <br /> IMPACT
              </p>
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-xl text-xlg sm:text-4xl text-white font-semibold sm:font-bold mb-4 pl-4 text-left sm:text-center"
              >
                With Over <br />
                <b className="text-5xl font-bold">
                  <AnimatedCounter value={100} duration={2500} suffix="+" />
                </b>
                <br />
                Volunteers
              </p>
            </span>
            <img
              src="frame1-1.png"
              className="hidden sm:inline-block w-60 h-60 absolute top-0 left-70"
            />
            <img
              src="vec-1-1.png"
              className="hidden sm:inline-block w-40 h-50 absolute top-20 left-0"
            />
            <img
              src="shape1-4.png"
              className="hidden sm:inline-block w-[60%] h-[90%] text-green-300 absolute -right-5 -top-5"
            />
            <img
              src="/volunter-bg.jpg"
              className="w-[90%] sm:h-[70%] h-50 rounded-md absolute -bottom-[10%] right-[5%]"
            />
            <Link
              style={{ fontFamily: "Quicksand" }}
              href="/contact"
              className="absolute  hidden sm:flex bottom-0 sm:-bottom-26 left-[50%]   bg-primary hover:bg-accent/90 text-white px-8 text-lg cursor-pointer font-bold rounded-full p-5"
            >
              Join Us
            </Link>
          </section>

          <AnimatedContainer staggerDelay={0.1}>
            <span className="w-full    grid mt-20 sm:flex gap-2 items-center justify-center sm:mt-30 sm:justify-center h-auto sm:h-60 ">
              {impactMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center mx-10"
                >
                  <span className="flex items-center w-full gap-3">
                    <span className="flex items-center w-10 h-10  sm:w-20 sm:h-20 justify-center pt-3 rounded-full bg-orange-100 sm:pt-2">
                      <img
                        src={metric.img}
                        className="w-5 h-5 sm:w-10 sm:h-10 mb-4"
                      />
                    </span>
                    <span style={{ fontFamily: "Quicksand" }}>
                      <p className="text-xl sm:text-5xl font-bold text-accent">
                        <AnimatedCounter
                          value={parseInt(metric.value)}
                          duration={2500}
                          suffix="+"
                        />
                      </p>
                      <p className="text-md sm:text-lg text-muted-foreground">
                        {metric.label}
                      </p>
                    </span>
                  </span>
                </div>
              ))}
            </span>
          </AnimatedContainer>
        </section>
      </AnimatedElement>

      <GetInvolvedSection />

      {/* Donations */}
      <AnimatedElement variant="slideInUp">
        <section className="py-5 sm:py-0 px-2 sm:px-4 sm:flex justify-center items-center mt-14 md:px-8 bg-card relative">
          <img
            src="/donation-image.jpg"
            className="rounded-md hidden w-1/2 sm:inline-block"
          />
          <div className="flex-1 bg-white w-1/2 h-full"></div>
          <img
            src="/shape1-3.png"
            className="w-20   h-50  absolute hidden sm:inline-block right-20 bottom-0"
          />
          <img
            src="/shape1-2.png"
            className="w-30 h-30 absolute hidden sm:inline-block right-5 top-10"
          />
          <img
            src="/shape1-1.png"
            className="w-40 h-40 absolute hidden sm:inline-block bottom-5 left-15"
          />

          <div className="w-full  max-w-5xl   h-auto  xl:h-120   sm:shadow-md   bg-card      rounded-2xl shadow-md overflow-hidden sm:absolute    flex flex-col md:flex-row">
            {/* LEFT SIDE */}
            <div className="w-full sm:w-1/2 xl:w-1/2 bg-green-800 text-white p-6 sm:p-10 xl:p-10 relative flex flex-col justify-between">
              <img
                src="/hand-shape.png"
                className="w-16 h-16 hidden sm:block absolute top-6 right-6 opacity-80"
              />

              <div className="space-y-3">
                <p className="text-orange-300 text-sm">Help & Donate</p>

                <h1
                  style={{ fontFamily: "Quicksand" }}
                  className="text-xl  lg:text-4xl  font-bold leading-snug"
                >
                  Your Small Contribution can Change a Life
                </h1>

                <p className="text-sm   sm:text-base text-gray-200">
                  Your generous donations help us maintain our work, provide
                  community services, and educate future generations. Every
                  contribution counts and is greatly appreciated.
                </p>
              </div>

              {/* DONATORS */}
              <div className="  flex border-2 mt-4 border-border p-2 rounded-full px-5 items-center gap-3 flex-wrap">
                <div className="flex  rounded-full p-1">
                  {donators.map((donator, i) => (
                    <img
                      key={i}
                      src={donator}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full -ml-2 first:ml-0 border-2 border-green-800"
                    />
                  ))}
                </div>

                <p className="text-xs  sm:text-sm ml-auto text-right">
                  <span className="text-orange-400 font-bold">
                    $ <AnimatedCounter value={3546} duration={2500} />
                  </span>
                  <br />
                  {donators.length} Donors
                </p>
              </div>

              <Link
                href="/contact"
                className="text-white p-3 flex items-center justify-center rounded-full bg-primary hover:bg-primary/20 font-medium"
              >
                Join Our Mission
              </Link>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-1/2 bg-background p-6 sm:p-10 flex flex-col justify-center">
              <h1
                style={{ fontFamily: "Quicksand" }}
                className="text-xl sm:text-2xl font-bold text-accent mb-4"
              >
                Make A Donation
              </h1>

              <div className="space-y-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  Choose your donation amount and enter your payment details on Stripe&apos;s secure checkout.
                </p>
                <Button
                  type="button"
                  disabled={stripePaymentSettingsLoading || !stripePaymentSettings?.configured}
                  onClick={() => {
                    const value = stripePaymentSettings?.paymentUrl;
                    if (!value) return;
                    try {
                      const paymentUrl = new URL(value);
                      if (
                        paymentUrl.protocol !== "https:" ||
                        !["buy.stripe.com", "donate.stripe.com"].includes(paymentUrl.hostname.toLowerCase())
                      ) return;
                      paymentUrl.searchParams.set("client_reference_id", `DONATION-${crypto.randomUUID()}`);
                      window.location.assign(paymentUrl.toString());
                    } catch {
                      return;
                    }
                  }}
                  className="w-full bg-primary text-white font-bold py-4 text-lg rounded-lg"
                >
                  {stripePaymentSettingsLoading
                    ? "Loading donation checkout..."
                    : stripePaymentSettings?.configured
                      ? "Donate Now"
                      : "Donation checkout unavailable"}
                </Button>
                {!stripePaymentSettingsLoading && !stripePaymentSettings?.configured ? (
                  <p className="text-xs text-muted-foreground leading-5">
                    Online donations are temporarily unavailable. You can visit the{" "}
                  <Link href="/donate" className="font-semibold text-primary underline underline-offset-2">
                    donation page
                  </Link>{" "}
                    to explore child sponsorship.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Upcoming Events */}
      {eventsLoading ? (
        <EventsSkeleton />
      ) : (
        events.length > 0 && (
          <AnimatedElement variant="fadeInUp">
            <section className="p-4 sm:px-5 bg-white relative mt-14 md:px-8">
              <div className="max-w-7xl mx-auto">
                <h1 style={{ fontFamily: "Quicksand" }} className="text-sm">
                  Our Events
                </h1>
                <h2
                  style={{ fontFamily: "Quicksand" }}
                  className="text-3xl sm:text-5xl font-bold text-accent mb-2"
                >
                  Be Part of our Upcoming Events
                </h2>
                <p
                  style={{ fontFamily: "Quicksand" }}
                  className="mb-10 text-muted-foreground"
                >
                  Scroll up the events to view more!
                </p>

                {/* Desktop Events - ScrollStack */}
                <div className="w-full hidden lg:flex bg-background relative z-10 mx-auto p-4 rounded-md h-120 items-center">
                  <ScrollStack className="relative w-full">
                    {events.map((event: any, index: number) => (
                      <ScrollStackItem
                        key={event._id || index}
                        itemClassName="bg-white flex rounded-lg shadow-md p-4"
                      >
                        <div className="flex items-center w-full gap-4 h-full">
                          {/* Date/Icon Section */}
                          <div className="flex flex-col h-full relative  p-4 bg-primary/10 rounded-full min-w-20">
                            <div className="  flex p-2 items-center justify-center rounded-full bg-primary mb-2">
                              <CalendarClock size={50} className="text-white" />
                            </div>
                            <p
                              style={{ fontFamily: "Quicksand" }}
                              className="text-sm font-bold right-3  absolute bottom-10 text-primary text-center"
                            >
                              {event.date}
                            </p>
                          </div>

                          {/* Content Section */}
                          <div className="flex-1 flex h-full    items-center gap-6">
                            <div className="flex-1">
                              <h3
                                style={{ fontFamily: "Quicksand" }}
                                className="text-xl font-bold text-accent mb-2"
                              >
                                {event.title}
                              </h3>
                              <p
                                style={{ fontFamily: "Quicksand" }}
                                className="text-sm text-muted-foreground mb-3 line-clamp-2"
                              >
                                {event.description}
                              </p>
                              <div className="space-y-1 text-xs font-semibold text-accent">
                                <p>
                                  <span className="text-primary font-bold">
                                    Topic:
                                  </span>{" "}
                                  {event.topic}
                                </p>
                                <p>
                                  <span className="text-primary font-bold">
                                    Time:
                                  </span>{" "}
                                  {event.time}
                                </p>
                                <p>
                                  <span className="text-primary font-bold">
                                    Location:
                                  </span>{" "}
                                  {event.location.address}
                                </p>
                              </div>
                              <div className="mt-4">
                                <Link
                                  href="/contact"
                                  style={{ fontFamily: "Quicksand" }}
                                  className="inline-block bg-primary/20 hover:bg-green-800 hover:text-white text-primary px-4 py-2 text-sm font-bold rounded-lg transition-colors"
                                >
                                  Join Now
                                </Link>
                              </div>
                            </div>

                            {/* Image Section */}
                            <div className="w-2/5 h-full  shrink-0">
                              <img
                                src={
                                  event.image?.url || "/placeholder-event.jpg"
                                }
                                alt={event.title}
                                className="w-full h-full object-cover rounded-md"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/placeholder-event.jpg";
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </ScrollStackItem>
                    ))}
                  </ScrollStack>
                </div>

                {/* Mobile Events - Grid Layout */}
                <div className="lg:hidden grid gap-6 sm:grid-cols-2">
                  {events.map((event: any, index: number) => (
                    <div
                      key={event._id || index}
                      className="bg-background rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={event.image?.url || "/placeholder-event.jpg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-event.jpg";
                          }}
                        />
                      </div>

                      <div className="p-4">
                        <h3
                          style={{ fontFamily: "Quicksand" }}
                          className="text-lg font-bold text-accent mb-2 line-clamp-2"
                        >
                          {event.title}
                        </h3>

                        <p
                          style={{ fontFamily: "Quicksand" }}
                          className="text-sm text-muted-foreground mb-3 line-clamp-3"
                        >
                          {event.description}
                        </p>

                        <div className="space-y-1 text-xs font-semibold text-accent mb-4">
                          <p>
                            <span className="text-primary font-bold">
                              Topic:
                            </span>{" "}
                            {event.topic}
                          </p>
                          <p>
                            <span className="text-primary font-bold">
                              Date:
                            </span>{" "}
                            {event.date}
                          </p>
                          <p>
                            <span className="text-primary font-bold">
                              Time:
                            </span>{" "}
                            {event.time}
                          </p>
                          <p className="line-clamp-2">
                            <span className="text-primary font-bold">
                              Location:
                            </span>{" "}
                            {event.location.address}
                          </p>
                        </div>

                        <Button
                          asChild
                          className="w-full bg-primary/20 hover:bg-green-800 hover:text-white text-primary font-bold"
                        >
                          <Link href="/contact">Join Now</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedElement>
        )
      )}

      {/* Latest News Section */}
      {postsLoading ? (
        <NewsSkeleton />
      ) : (
        posts.length > 0 && (
          <AnimatedElement variant="fadeInUp">
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2
                    style={{ fontFamily: "Quicksand" }}
                    className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                  >
                    Latest News & Updates
                  </h2>
                  <p
                    style={{ fontFamily: "Quicksand" }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  >
                    Stay informed about our latest activities, success stories,
                    and community impact.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.slice(0, 3).map((post: any) => (
                    <BlogCard
                      key={post._id}
                      _id={post._id}
                      title={post.title}
                      excerpt={post.excerpt}
                      image={post.image}
                      author={post.author}
                      date={post.date}
                      likes={post.likes}
                      views={post.views}
                      comments={post.comments}
                      createdAt={post.createdAt}
                    />
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link href="/blog">
                    <Button
                      style={{ fontFamily: "Quicksand" }}
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
                    >
                      View All News →
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </AnimatedElement>
        )
      )}

      {/* Footer */}
      <footer className="hidden sm:flex shadow-lg relative overflow-hidden bg-pink-400">
        <img
          src="/footer-bg.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 py-8 lg:px-6">
          <div className="grid gap-6 border-b border-white/20 pb-8 md:grid-cols-2 xl:grid-cols-3">
            <div className="min-w-0 text-white">
              <Link
                style={{ fontFamily: "Quicksand" }}
                href="/"
                className="mb-5 flex cursor-pointer items-center gap-2 transition-colors"
              >
                <img src="/logo.png" className="h-12 w-12" alt="Seeds of Love logo" />
                <span className="hidden text-center sm:inline-block text-xm">
                  <p className="text-lg font-extrabold text-primary">ENSIGO OF LOVE</p>
                  <p className="text-xs">We Rise By Lifting Others</p>
                </span>
              </Link>

              <p
                style={{ fontFamily: "Quicksand" }}
                className="mt-4 text-sm text-muted"
              >
                Empowering communities through education, nutrition, and
                sustainable development. One seed at a time.
              </p>

              <span
                style={{ fontFamily: "Quicksand" }}
                className="mt-5 flex flex-wrap items-center gap-3"
              >
                {socialMediaLinks.map((social, i) => (
                  <Link
                    style={{ fontFamily: "Quicksand" }}
                    key={i}
                    href={social.url}
                    target="_blank"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-white transition-colors hover:bg-green-800 hover:text-white"
                  >
                    {social.icon ? (
                      <social.icon size={18} />
                    ) : (
                      <span className="text-sm font-bold">𝕏</span>
                    )}
                  </Link>
                ))}
              </span>
            </div>

            <div className="min-w-0 text-white">
              <span className="w-full items-center">
                <h2
                  style={{ fontFamily: "Quicksand" }}
                  className="text-xl font-bold text-white"
                >
                  Quick Links
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li>
                    <Link
                      style={{ fontFamily: "Quicksand" }}
                      href="/about"
                      className="text-lg transition-colors hover:text-primary"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontFamily: "Quicksand" }}
                      href="/gallery"
                      className="text-lg transition-colors hover:text-primary"
                    >
                      Our Gallery
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontFamily: "Quicksand" }}
                      href="/blog"
                      className="text-lg transition-colors hover:text-primary"
                    >
                      Our News
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontFamily: "Quicksand" }}
                      href="/contact"
                      className="text-lg transition-colors hover:text-primary"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ fontFamily: "Quicksand" }}
                      href="/donate"
                      className="text-lg transition-colors hover:text-primary"
                    >
                      Donate
                    </Link>
                  </li>
                </ul>
              </span>
            </div>

            <div className="min-w-0 text-white">
              <span className="w-full font-bold text-accent">
                <h2
                  style={{ fontFamily: "Quicksand" }}
                  className="font-bold text-white"
                >
                  Contact us
                </h2>
                <ul className="mt-4 space-y-4 text-sm text-muted">
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-1 shrink-0 text-primary" size={16} />
                    <p style={{ fontFamily: "Quicksand" }}>
                      Gayaza Rd, Kumukaaga, <br />
                      Opposite kumbuzi, <br /> Kyadondo East,
                      <br />
                      Wakiso District, Uganda
                    </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <PhoneCall className="text-primary" size={16} />
                    <span style={{ fontFamily: "Quicksand" }}>
                      (+256) 705-300-671 / 705-181-487
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="text-primary" size={16} />
                    <span style={{ fontFamily: "Quicksand" }}>
                      ensigooflove@gmail.com
                    </span>
                  </li>
                </ul>
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center lg:justify-start">
              <Link
                style={{ fontFamily: "Quicksand" }}
                href="/privacy-policy"
                className="cursor-pointer text-sm text-muted transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                style={{ fontFamily: "Quicksand" }}
                href="/terms-of-service"
                className="cursor-pointer text-sm text-muted transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>

            <div className="mx-auto w-full max-w-xl">
              <form onSubmit={handleNewsletterSubmit} className="flex w-full flex-col gap-3 rounded-full border border-white/20 bg-white/5 p-2 sm:flex-row">
                <Input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  style={{ fontFamily: "Quicksand" }}
                  placeholder="Subscribe to our newsletter"
                  className="h-12 flex-1 rounded-full border-0 bg-transparent p-5 text-sm text-white placeholder:text-white/60 focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  disabled={newsletterSubmitting}
                  style={{ fontFamily: "Quicksand" }}
                  className="h-12 rounded-full bg-primary px-6 text-lg font-bold text-white transition-colors hover:bg-green-800"
                >
                  {newsletterSubmitting ? "Sending..." : <Send size={18} />}
                </Button>
              </form>
              {newsletterMessage && (
                <p className={`mt-2 text-xs ${newsletterStatus === "success" ? "text-emerald-200" : "text-red-200"}`}>
                  {newsletterMessage}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center text-sm text-muted sm:flex-row sm:justify-between">
            <span>
              &copy; {new Date().getFullYear()} Seeds of Love. All rights reserved.
            </span>
          </div>
        </div>

        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute bottom-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-primary hover:bg-accent"
        >
          <ArrowUp size={18} className="text-white" />
        </span>
      </footer>

      <section className="lg:hidden">
        <Footer />
      </section>
    </main>
  );
}
