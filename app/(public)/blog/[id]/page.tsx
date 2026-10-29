"use client";

import { BlogDetail } from "@/components/public/blog-detail";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useEffect, useState } from "react";
import { BlogDetailPageSkeleton } from "@/components/blog/blog-skeleton-loaders";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // params is a Promise
}) {
  // Unwrap the params Promise using React.use()
  const { id } = React.use(params);
  const [post, setPost] = useState<any>(null);

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery<any>({
    queryKey: ["blogs", "published", `${id}`],
  });

  useEffect(() => {
    if (blog) {
      setPost(blog);
    }
  }, [blog, params]);
  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col bg-background">
        {/* <Navbar /> */}
        <div className="flex-1">
          <BlogDetailPageSkeleton />
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !blog) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* <Navbar /> */}
      <div className="flex-1">
        <BlogDetail {...post} />
      </div>
      <Footer />
    </main>
  );
}
