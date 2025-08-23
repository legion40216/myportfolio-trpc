import React from "react";
import Link from "next/link";
import { Github, LinkIcon, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";

export type ProjectCardProps = {
  imgSrc: string;
  title: string;
  description: string;
  isFeatured: boolean;
  technologies: string[];
  link: string;
  github: string;
};

export default function ProjectCard({
  imgSrc,
  title,
  description,
  isFeatured,
  technologies,
  link,
  github,
}: ProjectCardProps & {}) {
  return (
    <div className="group p-2 rounded-md bg-portfolio-primary 
    text-portfolio-primary-foreground 
    hover:bg-portfolio-primary/80 transition space-y-8"
    >
      <div className="space-y-4">
          <div className="relative aspect-video border rounded-md">
            <Link 
              href={link || "/"} 
              target="_blank" 
              rel="noreferrer"
            >
              <Image 
                src={imgSrc} 
                alt={title} 
                fill 
                className="object-contain" 
              />
            </Link>
          </div>


        <div className="flex flex-col justify-between gap-4 flex-1">
          <div>
            <div className="flex item-start justify-between gap-2">
              <Link
                href={link || "/"}
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <h3
                  className="text-lg font-medium group-hover:underline 
                text-primary"
                >
                  {title}
                </h3>
              </Link>

              {isFeatured && (
                <div className="pt-1">
                  <Star
                    className="h-4 text-yellow-500
                 fill-yellow-500"
                  />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {technologies && technologies.length > 0 ? (
            technologies.map((item, index) => (
              <Badge
                className="bg-portfolio-secondary 
                text-portfolio-secondary-foreground"
                key={index}
              >
                {item}
              </Badge>
            ))
          ) : (
            <Badge>No technologies</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-1">
        <Button
          asChild
          size="icon"
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
          size="icon"
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
  );
}
