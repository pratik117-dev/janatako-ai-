"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, CheckCircle, Users, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const HomePage = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const stats = [
    { icon: Users, value: "50,000+", label: "सक्रिय नागरिकहरू" },
    { icon: CheckCircle, value: "1,200+", label: "सत्यापित दावीहरू" },
    { icon: TrendingUp, value: "98%", label: "सटीकता दर" },
  ];

  useEffect(() => {
    if (videoRef.current) {
      const playWithSound = async () => {
        try {
          videoRef.current!.muted = false;
          await videoRef.current!.play();
          setHasInteracted(true);
        } catch (err) {
          // If that fails, play muted
          console.log("Autoplay with audio blocked, playing muted");
          videoRef.current!.muted = true;
          await videoRef.current!.play();
        }
      };
      
      playWithSound();
    }
  }, []);

  // Enable audio on any user interaction
  useEffect(() => {
    const enableAudio = (e: Event) => {
      // Don't interfere if clicking on the video itself
      if (e.target === videoRef.current) {
        return;
      }
      
      if (!hasInteracted && videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setHasInteracted(true);
      }
    };

    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('touchstart', enableAudio, { once: true, passive: true });
    document.addEventListener('keydown', enableAudio, { once: true });

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
  }, [hasInteracted]);

  // Stop audio when scrolling away from hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current && videoRef.current) {
        const heroRect = heroSectionRef.current.getBoundingClientRect();
        const isHeroVisible = heroRect.bottom > 100;
        
        // If hero section is not visible (scrolled past), mute the video
        if (!isHeroVisible && !videoRef.current.muted) {
          videoRef.current.muted = true;
        }
        // If scrolled back to hero section, unmute if user has interacted
        else if (isHeroVisible && hasInteracted && videoRef.current.muted) {
          videoRef.current.muted = false;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasInteracted]);

  const handlePlayIntroVideo = () => {
  setVideoPlaying(true);
};

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        ref={heroSectionRef}
        className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center animate-fade-in-up">
            {/* Left Side - Clean Video Frame */}
            <div className="relative flex justify-center lg:justify-start order-1 lg:order-1">
              <div className="relative w-full max-w-md">
                {/* Video container - clean, no borders */}
                <div className="relative w-full">
                  <video
                    ref={videoRef}
                    loop
                    playsInline
                    muted
                    className="w-full h-auto"
                    style={{
                      mixBlendMode: 'normal',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      // Enable audio if not already enabled
                      if (videoRef.current && videoRef.current.muted) {
                        videoRef.current.muted = false;
                        setHasInteracted(true);
                      }
                      // Ensure video keeps playing
                      if (videoRef.current && videoRef.current.paused) {
                        videoRef.current.play();
                      }
                    }}
                    onTouchStart={(e) => {
                      // Enable audio on touch
                      if (videoRef.current && videoRef.current.muted) {
                        videoRef.current.muted = false;
                        setHasInteracted(true);
                      }
                    }}
                  >
                    <source src="/videos/mainvideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Audio prompt - shows until user interacts */}
                  {!hasInteracted && (
                    <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 animate-pulse shadow-lg">
                      <span>🔇</span>
                      <span>Click anywhere to enable audio</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="text-center lg:text-left space-y-8 order-2 lg:order-2">
              {/* Logo/Symbol */}
              <div className="mb-8 inline-flex flex-col items-center lg:items-start gap-4">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">२०८२ को निर्वाचन</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  म भोट माग्दिन।
                  <br />
                  <span className="text-gradient-red">म हिसाब चाहन्छु।</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  नेपालको पहिलो AI-संचालित सार्वजनिक जवाफदेहिता प्लेटफर्म। 
                  पारदर्शिता, डाटा, र सत्यता।
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button asChild size="lg" className="btn-civic-primary gap-2 group">
                  <Link href="/about">
                    JAI के हो?
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="btn-civic-secondary">
                  <Link href="/benchmark">
                    निर्वाचन बेन्चमार्क हेर्नुहोस्
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className="text-center lg:text-left animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 text-red-600 mb-3">
                      <stat.icon size={24} />
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-red-300 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </section>

{/* Video Section */}
<section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
  <div className="mx-auto max-w-5xl">
    {/* Section Header */}
    <div className="text-center mb-12 animate-fade-in-up">
      <div className="inline-block mb-4">
        <div className="px-4 py-2 bg-red-100 rounded-full border border-red-200">
          <span className="text-sm font-bold text-red-600 uppercase tracking-wide">
            परिचय भिडियो
          </span>
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        JAI कसरी काम गर्छ?
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        २ मिनेटमा JAI को बारेमा सबै थाहा पाउनुहोस्
      </p>
    </div>

    {/* Video Player */}
    <div className="relative group overflow-hidden rounded-2xl shadow-2xl animate-fade-in-up">
      {/* Video Container */}
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
        <video
          src="/videos/video.mp4"
          poster="/images/video-thumbnail.jpg"
          controls
          className="h-full w-full object-cover"
        />
        
        {/* Optional: Custom overlay on thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full pointer-events-none">
          NEW
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pointer-events-none">
        <div className="flex items-center justify-between text-white">
          <div className="space-y-1">
            <p className="font-semibold">Janatako AI - परिचय २०८२</p>
            <p className="text-xs text-white/80">नागरिक जवाफदेहिता प्लेटफर्म</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>हेर्नुहोस्</span>
          </div>
        </div>
      </div>
    </div>

    {/* Video features */}
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {[
        { title: "डाटा-संचालित", desc: "सत्यापित तथ्याङ्क र विश्लेषण" },
        { title: "पारदर्शी", desc: "सबै स्रोत खुला र पहुँचयोग्य" },
        { title: "निष्पक्ष", desc: "राजनीतिक प्रभावबाट मुक्त" },
      ].map((feature, index) => (
        <div 
          key={feature.title}
          className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            तपाईं पनि JAI को हिस्सा बन्नुहोस्
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            नेपालको भविष्य निर्माण गर्न हामीसँग सहकार्य गर्नुहोस्। 
            पारदर्शी र जवाफदेही शासनको लागि आफ्नो योगदान दिनुहोस्।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold">
              <Link href="/participate">
                सहभागी हुनुहोस्
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
              <Link href="/contact">
                सम्पर्क गर्नुहोस्
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;