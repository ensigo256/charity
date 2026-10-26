"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { apiRequest } from "@/lib/query-client";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/messages/contact", formData);
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Message sent",
        description:
          "Thank you. We received your message and will get back to you soon.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unable to send message",
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section - Reduced height */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <Image
          src="https://burst.shopifycdn.com/photos/contact-us-image.jpg?width=1000&format=pjpg&exif=0&iptc=0"
          alt="Children learning in classroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-green-900/60"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1
            style={{ fontFamily: "Quicksand" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance leading-tight drop-shadow-lg"
          >
            Contact Us
          </h1>
          <p
            style={{ fontFamily: "Quicksand" }}
            className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-balance drop-shadow-md"
          >
            We would love to hear from you! Whether you have questions about our
            programs, want to get involved, or just want to say hello, feel free
            to reach out.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section
        style={{ fontFamily: "Quicksand" }}
        className="py-16 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form - Primary CTA */}
          <Card className="p-8 bg-card border-border shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-accent mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-accent mb-2">
                    Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent mb-2">
                  Subject *
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full p-3 bg-background border border-border rounded-md text-foreground resize-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg font-semibold"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          {/* Contact Information - Secondary */}
          <div className="space-y-8">
            <Card className="p-8 bg-card border-border shadow-lg">
              <h3 className="text-2xl font-bold text-accent mb-6">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-accent mb-2">Email</h4>
                  <p className="text-muted-foreground">info@ensigooflove.org</p>
                </div>

                <div>
                  <h4 className="font-semibold text-accent mb-2">Phone</h4>
                  <p className="text-muted-foreground">+1(341)219-7178</p>
                  <p className="text-muted-foreground">+1(808)469-5819</p>
                </div>

                <div>
                  <h4 className="font-semibold text-accent mb-2">
                    Office Address
                  </h4>
                  <p className="text-muted-foreground">
                    Gayaza Rd, Kumukaaga,
                    <br />
                    Opposite kumbuzi, Kyadondo East
                    <br />
                    Wakiso District, Uganda
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-accent mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61590070790632&sk=about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                      aria-label="Visit our Facebook page"
                    >
                      <span className="text-lg font-bold">f</span>
                    </a>
                    <a
                      href="https://x.com/Ensigo_ya_Love"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                      aria-label="Visit our X profile"
                    >
                      <span className="text-lg font-bold">𝕏</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/SeedsOfLove"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                      aria-label="Visit our LinkedIn page"
                    >
                      <span className="text-lg font-bold">in</span>
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-accent/5 border-accent/20">
              <div className="text-center">
                <h4 className="font-semibold text-accent mb-2">
                  Need Immediate Help?
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with us on WhatsApp for instant support
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-accent cursor-pointer text-accent bg-white hover:bg-accent/10 hover:text-accent-foreground"
                >
                  <a
                    href="https://wa.me/13412197178"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/whats-app.png"
                      className="w-10 h-10 mr-2"
                      alt="WhatsApp"
                    />
                    Chat with Us
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        style={{ fontFamily: "Quicksand" }}
        className="py-16 px-4 md:px-8 max-w-6xl w-full mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
            Find Our Location
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit us at our office or find us on the map below.
          </p>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto w-full">
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-100">
            <iframe
              src="https://www.google.com/maps?q=0.402749113762963,32.58166666859604&z=15&output=embed"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ensi Go of Love Office Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
