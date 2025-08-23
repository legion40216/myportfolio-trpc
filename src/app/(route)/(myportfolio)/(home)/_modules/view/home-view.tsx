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
      <div className="flex flex-col-reverse sm:flex-row gap-10 
      items-center"
      >
        <div className="text-center sm:text-start space-y-3">
          <div>
            <h1 className="text-4xl font-bold">Suleman Lohar</h1>
            <span className="font-medium text-muted-foreground">
              Fullstack Developer
            </span>
          </div>
          <div>
            <p className="text-muted-foreground">
            Hello! I&apos;m <strong className="text-primary">Suleman Lohar</strong>
            , a passionate full-stack developer who loves bringing ideas to
            life through code. I enjoy building web applications that are not
            only functional but also delightful to use. Check out some of my
            favorite projects below!
            </p>
          </div>
        </div>

        <Image
          src="https://github.com/shadcn.png"
          alt="Suleman Lohar"
          width={180}
          height={180}
          className="rounded-full"
        />
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
