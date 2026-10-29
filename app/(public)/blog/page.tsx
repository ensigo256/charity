"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { BlogCard } from "@/components/public/blog-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { data: blogData } = useQuery<any[]>({
    queryKey: ["blogs", "published"],
    refetchInterval: 10_000,
  });

  useEffect(() => {
    if (blogData) {
      setPosts(blogData);
    }
  }, [blogData]);

  const filteredBlogs: any[] =
    posts
      .filter((blog) => blog.status === "published")
      .filter((blog) => {
        const matchesSearch =
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
          selectedFilter === "all" ||
          selectedFilter === blog.status ||
          (selectedFilter === "popular" && blog.likes.length > 2);

        return matchesSearch && matchesFilter;
      }) || [];

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-8 bg-linear-to-r from-green-900 to-green-800">
        <Image
          src="https://thumbs.dreamstime.com/b/stock-photo-presents-stack-old-newspapers-placed-rustic-wooden-surface-visibly-aged-yellowed-paper-404835748.jpg"
          alt="Blog background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-green-900/70"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1
            style={{ fontFamily: "Quicksand" }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Our Stories & Insights
          </h1>
          <p
            style={{ fontFamily: "Quicksand" }}
            className="text-base sm:text-lg text-white/90 max-w-2xl"
          >
            Discover inspiring stories, insights, and updates from Seeds of Love
            Foundation. Learn how we're making a difference in communities
            across the region.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-8 sm:py-12 md:py-16 px-3 sm:px-6 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter Bar */}
          <div className="mb-8 md:mb-12 space-y-4 sm:space-y-0">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                placeholder="Search articles by title, author, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 sm:py-4 text-sm sm:text-base bg-card border-border focus:ring-primary"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex mt-3 flex-wrap gap-2 sm:gap-3">
              <Button
                onClick={() => setSelectedFilter("all")}
                variant={selectedFilter === "all" ? "default" : "outline"}
                className={`text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all ${
                  selectedFilter === "all"
                    ? "bg-primary text-white"
                    : "bg-card hover:bg-card/80 text-foreground"
                }`}
              >
                All Articles
              </Button>
              <Button
                onClick={() => setSelectedFilter("popular")}
                variant={selectedFilter === "popular" ? "default" : "outline"}
                className={`text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all ${
                  selectedFilter === "popular"
                    ? "bg-primary text-white"
                    : "bg-card hover:bg-card/80 text-foreground"
                }`}
              >
                Most Liked
              </Button>
            </div>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredBlogs.map((blog, index) => (
                <BlogCard key={blog._id || index} {...blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-lg sm:text-xl text-muted-foreground mb-4"
              >
                No articles found matching your search.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFilter("all");
                }}
                variant="outline"
                className="text-sm sm:text-base px-6 py-2 sm:py-3"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-6 md:px-8 bg-green-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            style={{ fontFamily: "Quicksand" }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            Have a Story to Share?
          </h2>
          <p
            style={{ fontFamily: "Quicksand" }}
            className="text-sm sm:text-base md:text-lg text-white/90 mb-6"
          >
            If you have an inspiring story or would like to contribute to our
            blog, we'd love to hear from you.
          </p>
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2 sm:py-3 font-semibold rounded-lg text-sm sm:text-base"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// export const blogData = async () => {
//   const { data: blogData } = useQuery({
//     queryKey: ["blogs", "all"],
//   });

//   let posts = null;
//   useEffect(() => {
//     if (blogData) {
//       posts = blogData;
//     }
//   }, []);

//   return posts;
// };
