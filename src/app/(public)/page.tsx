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

  // Force autoplay on mount and page reload (works on both mobile and desktop)
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Reset video to start
          videoRef.current.currentTime = 0;
          videoRef.current.muted = true;
          
          // Force load and play
          videoRef.current.load();
          await videoRef.current.play();
          
          console.log("Video autoplay successful");
          
          // Try to unmute after a delay
          setTimeout(() => {
            if (videoRef.current && !hasInteracted) {
              videoRef.current.muted = false;
              setHasInteracted(true);
            }
          }, 500);
        } catch (err) {
          console.log("Autoplay failed, retrying muted:", err);
          
          // Fallback: ensure muted playback works
          if (videoRef.current) {
            videoRef.current.muted = true;
            try {
              await videoRef.current.play();
            } catch (e) {
              console.log("Muted playback also failed:", e);
            }
          }
        }
      }
    };

    // Play immediately on mount
    playVideo();

    // Also try to play after a short delay (helps with some browsers)
    const timeoutId = setTimeout(() => {
      playVideo();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array - only runs on mount/reload

  // Additional attempt to play when video metadata loads
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      if (video.paused) {
        video.play().catch(err => {
          console.log("Play on loadeddata failed:", err);
        });
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  // Enable audio on any user interaction (works on both mobile and desktop)
  useEffect(() => {
    const enableAudio = () => {
      if (!hasInteracted && videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play().then(() => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              setHasInteracted(true);
            }
          }).catch(err => {
            console.log("Play on interaction failed:", err);
          });
        } else if (videoRef.current.muted) {
          videoRef.current.muted = false;
          setHasInteracted(true);
        }
      }
    };

    // Listen to multiple interaction events (covers both mobile and desktop)
    const events = ['click', 'touchstart', 'touchend', 'scroll', 'keydown'];
    events.forEach(event => {
      window.addEventListener(event, enableAudio, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, enableAudio);
      });
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    
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
        className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in-up">
            {/* Left Side - Clean Video Frame */}
            <div className="relative flex justify-center lg:justify-start order-1 lg:order-1">
              <div className="relative w-full max-w-md">
                {/* Video container - clean, no borders */}
                <div className="relative w-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-auto rounded-lg sm:rounded-xl"
                    style={{
                      mixBlendMode: 'normal',
                    }}
                  >
                    <source src="/videos/mainvideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Audio prompt - shows until user interacts */}
                  {!hasInteracted && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500/90 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium flex items-center gap-1 sm:gap-2 animate-pulse shadow-lg">
                      <span>🔇</span>
                      <span className="hidden sm:inline">Click anywhere to enable audio</span>
                      <span className="sm:hidden">Tap for audio</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="text-center lg:text-left space-y-6 sm:space-y-8 order-2 lg:order-2 px-2 sm:px-0">
              {/* Logo/Symbol */}
              <div className="mb-4 sm:mb-8 inline-flex flex-col items-center lg:items-start gap-3 sm:gap-4">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 rounded-full border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-green-700">२०८२ को निर्वाचन</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
                  म भोट माग्दिन।
                  <br />
                  <span className="text-gradient-red">म हिसाब चाहन्छु।</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  नेपालको पहिलो AI-संचालित सार्वजनिक जवाफदेहिता प्लेटफर्म। 
                  पारदर्शिता, डाटा, र सत्यता।
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
                <Button asChild size="lg" className="btn-civic-primary gap-2 group w-full sm:w-auto">
                  <Link href="/about">
                    JAI के हो?
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="btn-civic-secondary w-full sm:w-auto">
                  <Link href="/benchmark">
                    निर्वाचन बेन्चमार्क हेर्नुहोस्
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-8">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className="text-center lg:text-left animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-red-100 text-red-600 mb-2 sm:mb-3">
                      <stat.icon size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-red-300 rounded-full flex items-start justify-center p-1.5 sm:p-2">
            <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <div className="inline-block mb-3 sm:mb-4">
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-100 rounded-full border border-red-200">
                <span className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-wide">
                  परिचय भिडियो
                </span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              JAI कसरी काम गर्छ?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              २ मिनेटमा JAI को बारेमा सबै थाहा पाउनुहोस्
            </p>
          </div>

          {/* Video Player */}
          <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl animate-fade-in-up">
            {/* Video Container */}
            <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <video
                src="/videos/video.mp4"
                poster="/images/video-thumbnail.jpg"
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
              
              {/* Optional: Custom overlay on thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 sm:py-1.5 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full pointer-events-none">
                NEW
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6 pointer-events-none">
              <div className="flex items-center justify-between text-white">
                <div className="space-y-0.5 sm:space-y-1">
                  <p className="text-xs sm:text-base font-semibold">Janatako AI - परिचय २०८२</p>
                  <p className="text-[10px] sm:text-xs text-white/80">नागरिक जवाफदेहिता प्लेटफर्म</p>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></div>
                  <span className="hidden sm:inline">हेर्नुहोस्</span>
                  <span className="sm:hidden">Play</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video features */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {[
              { title: "डाटा-संचालित", desc: "सत्यापित तथ्याङ्क र विश्लेषण" },
              { title: "पारदर्शी", desc: "सबै स्रोत खुला र पहुँचयोग्य" },
              { title: "निष्पक्ष", desc: "राजनीतिक प्रभावबाट मुक्त" },
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-4">
            तपाईं पनि JAI को हिस्सा बन्नुहोस्
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto px-4">
            नेपालको भविष्य निर्माण गर्न हामीसँग सहकार्य गर्नुहोस्। 
            पारदर्शी र जवाफदेही शासनको लागि आफ्नो योगदान दिनुहोस्।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold w-full sm:w-auto">
              <Link href="/participate">
                सहभागी हुनुहोस्
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto">
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