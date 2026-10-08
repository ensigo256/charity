"use client";

import { ArrowUp, Facebook, Mail, MapPin, PhoneCall, Twitter } from "lucide-react";
import Link from "next/link";
import { TikTokIcon } from "@/components/shared/tiktok-icon";

const TIKTOK_URL = "https://www.tiktok.com/@ensigooflove256";

export function Footer() {
  return (
    <footer className="bg-card border-t relative border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <Link
              style={{ fontFamily: "Quicksand" }}
              href="/"
              className={`flex items-center gap-2   mb-5 cursor-pointer  transition-colors `}
            >
              <img src="/logo.png" className="w-12 h-12" />
              <span className=" text-center  text-xs ">
                <p className="font-extrabold text-lg text-primary">
                  ENSIGO OF LOVE
                </p>
                <p className="text-xs">We Rise By Lifting Others</p>
              </span>
            </Link>
            <p
              style={{ fontFamily: "Quicksand" }}
              className="text-foreground/70 text-sm"
            >
              Creating lasting change through education, nutrition, and
              community empowerment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{ fontFamily: "Quicksand" }}
              className="font-semibold text-foreground mb-4"
            >
              Quick Links
            </h4>
            <ul
              style={{ fontFamily: "Quicksand" }}
              className="space-y-2 text-sm"
            >
              <li>
                <Link
                  href="/about"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Our News
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Our Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{ fontFamily: "Quicksand" }}
              className="font-semibold text-foreground mb-4"
            >
              Contact
            </h4>
            <div
              style={{ fontFamily: "Quicksand" }}
              className="text-sm text-foreground/70 space-y-1"
            >
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 mr-2" />
                ensigooflove@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 mr-2" />
                (+256) 705-300-671 / 705-181-487
              </p>
              <p className="flex ">
                <MapPin className="w-5 h-5 mr-2" />
                Gayaza Rd, Kumukaaga,
                <br />
                Opposite kumbuzi, Kyadondo East
                <br />
                Wakiso District, Uganda
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4
              style={{ fontFamily: "Quicksand" }}
              className="font-semibold text-foreground mb-4"
            >
              Follow Us
            </h4>
            <div style={{ fontFamily: "Quicksand" }} className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61590070790632&sk=about"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://x.com/Ensigo_ya_Love"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our X profile"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our TikTok profile"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <TikTokIcon />
              </a>
              <a
                href="#"
                aria-label="Visit our LinkedIn page"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <span className="text-lg">in</span>
              </a>
            </div>
          </div>
        </div>

        <div
          style={{ fontFamily: "Quicksand" }}
          className="border-t border-border pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>&copy; 2024 Seeds of Love Foundation. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      <span
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-10 h-10 absolute bottom-5 cursor-pointer text-primary border-2 border-primary hover:text-accent hover:bg-white hover:border-accent h right-3 sm:right-10 rounded-full bg-white flex items-center justify-center"
      >
        <ArrowUp size={18} />
      </span>
    </footer>
  );
}
