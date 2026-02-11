"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        {/* Symbolic JAI mark */}
        <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5">
          <span className="text-4xl font-bold text-primary">J</span>
        </div>

        <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
          म भोट माग्दिन।
          <br />
          <span className="text-primary">म हिसाब चाहन्छु।</span>
        </h1>

        <p className="mt-5 text-sm tracking-widest text-muted-foreground uppercase">
          Election 2082 &nbsp;|&nbsp; Public Accountability AI
        </p>

        <Button asChild className="mt-10" size="lg">
          <Link href="/about">JAI के हो?</Link>
        </Button>
      </section>

      {/* Intro Video Placeholder */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div
          className="relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-border bg-secondary/50 min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]"
          onClick={() => setVideoPlaying(true)}
          role="button"
          tabIndex={0}
          aria-label="Play intro video"
        >
          {videoPlaying ? (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <p className="text-sm">भिडियो छिट्टै आउँदैछ।</p>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/5" />
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform hover:scale-105">
                  <Play size={32} className="ml-1" />
                </div>
                <p className="text-sm text-muted-foreground">JAI को परिचय हेर्नुहोस्</p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
