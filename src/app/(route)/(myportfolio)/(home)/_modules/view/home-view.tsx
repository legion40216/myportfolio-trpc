import React from 'react'

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import { FeaturedSection } from '../section/featured-section';
import { TechnologiesSection } from '../section/technologies-section';

export default function HomeView() {
  return (
    <div className="space-y-9">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Image first on mobile, right side on desktop */}
        <div className="order-1 sm:order-2 col-span-1 place-items-center sm:place-content-start place">
          <Image
            src="https://github.com/shadcn.png"
            alt="Suleman Lohar"
            width={180}
            height={180}
            className="rounded-full"
          />
        </div>

        {/* Text second on mobile, left side on desktop */}
        <div className="order-2 sm:order-1 text-center space-y-3 
        sm:text-start sm:col-span-2"
        >
          <div>
            <h1 className="text-4xl font-bold">Suleman Lohar</h1>
            <span className="font-medium text-muted-foreground">
              Fullstack Developer
            </span>
          </div>
          <div>
            <p className="text-muted-foreground">
              Hello! I&apos;m{" "}
              <strong className="text-primary">Suleman Lohar</strong>, a
              passionate full-stack developer who loves bringing ideas to life
              through code. I enjoy building web applications that are not only
              functional but also delightful to use. Check out some of my
              favorite projects below!
            </p>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-medium">Featured Projects</h2>
        <FeaturedSection />
      </div>
      <div>
        <Button asChild variant={"outline"} size={"lg"}>
          <Link href="/myprojects">
            View All Projects
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-medium">Skills</h2>
        <TechnologiesSection />
      </div>
    </div>
  );
}
