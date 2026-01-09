import React from "react"

import { Github, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type FeaturedCardProps = {
  imgSrc: string
  title: string
  description: string
  link: string
  github: string
  technologies: string[]
}

export default function FeaturedCard({
  imgSrc,
  title,
  description,
  link,
  github,
  technologies,
}: FeaturedCardProps) {
  return (
    <div className="group p-3 rounded-md bg-portfolio-primary
     text-portfolio-primary-foreground"
     >
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="min-w-[220px]">
          <div className="relative aspect-video border rounded-md 
          overflow-hidden hover:scale-105 transition-transform duration-200"
          >
            <Link href={link || "/"} target="_blank" rel="noreferrer">
              <Image 
                src={imgSrc} 
                alt={title} 
                fill 
                className="object-cover" 
              />
            </Link>
          </div>
        </div>

        {/* Title + Description + Tech */}
        <div className="flex flex-col justify-between gap-4">
          <div>
            <Link
              href={link || "/"}
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              <h3 className="text-lg text-primary font-medium 
              group-hover:underline"
              >
                {title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="flex flex-wrap gap-1">
            {technologies?.map((item, index) => (
              <Badge
                className="bg-portfolio-secondary 
                text-portfolio-secondary-foreground"
                key={index}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* GitHub + External Links */}
        <div className="flex flex-row sm:flex-col gap-1">
          <Button
            asChild
            size={"icon"}
            className="bg-portfolio-secondary 
            text-portfolio-secondary-foreground
            hover:bg-portfolio-secondary/80"
          >
            <Link href={github || "/"} target="_blank" rel="noreferrer">
              <Github className="size-5" />
            </Link>
          </Button>

          <Button
            asChild
            size={"icon"}
            className="bg-portfolio-secondary 
            text-portfolio-secondary-foreground
            hover:bg-portfolio-secondary/80"
          >
            <Link href={link || "/"} target="_blank" rel="noreferrer">
              <LinkIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
