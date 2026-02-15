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
        className="relative flex min-h-screen lg:min-h-[85vh] flex-col items-center justify-center px-4 sm:px-6 py-12 lg:py-0 overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-slow"></div>
          <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-10 sm:-bottom-20 left-1/2 -translate-x-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center animate-fade-in-up">
            {/* Left Side - Clean Video Frame */}
            <div className="relative flex justify-center lg:justify-start order-1 lg:order-1 w-full">
              <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md">
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
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500/90 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium flex items-center gap-1 sm:gap-2 animate-pulse shadow-lg">
                      <span>🔇</span>
                      <span className="hidden xs:inline">Click anywhere to enable audio</span>
                      <span className="xs:hidden">Tap for audio</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-2">
              {/* Logo/Symbol */}
              <div className="mb-4 sm:mb-6 lg:mb-8 inline-flex flex-col items-center lg:items-start gap-3 sm:gap-4">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 rounded-full border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-green-700">२०८२ को निर्वाचन</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                  म भोट माग्दिन।
                  <br />
                  <span className="text-gradient-purple">म हिसाब चाहन्छु।</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed px-4 sm:px-0">
                  नेपालको पहिलो AI-संचालित सार्वजनिक जवाफदेहिता प्लेटफर्म। 
                  पारदर्शिता, डाटा, र सत्यता।
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 px-4 sm:px-0">
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
<div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 lg:pt-8 px-2 sm:px-0">
  {stats.map((stat, index) => (
    <div 
      key={stat.label} 
      className="text-center lg:text-left animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-100 text-[#800080] mb-2 sm:mb-3">
        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
        {stat.value}
      </p>
      <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 leading-tight">
        {stat.label}
      </p>
    </div>
  ))}
</div>
            </div>
          </div>
        </div>
      </section>

{/* Video Section */}
<section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
  <div className="mx-auto max-w-5xl">
    {/* Section Header */}
    <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in-up">
      <div className="inline-block mb-3 sm:mb-4">
  <div className="badge-civic-purple px-3 py-1.5 sm:px-4 sm:py-2">
    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">
      परिचय भिडियो
    </span>
  </div>
</div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4 sm:px-0">
        JAI कसरी काम गर्छ?
      </h2>
      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
        २ मिनेटमा JAI को बारेमा सबै थाहा पाउनुहोस्
      </p>
    </div>

    {/* Video Player */}
    <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl animate-fade-in-up">
      {/* Video Container */}
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 min-h-[200px] sm:min-h-[250px] md:min-h-[400px] lg:min-h-[500px]">
        <video
          src="/videos/video.mp4"
          poster="/images/video-thumbnail.jpg"
          controls
          className="h-full w-full object-cover"
        />
        
        {/* Optional: Custom overlay on thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 sm:py-1.5 bg-purple-700 text-white text-[10px] sm:text-xs font-bold rounded-full pointer-events-none">
          NEW
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 lg:p-6 pointer-events-none">
        <div className="flex items-center justify-between text-white gap-2">
          <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
            <p className="font-semibold text-xs sm:text-sm lg:text-base truncate">Janatako AI - परिचय २०८२</p>
            <p className="text-[10px] sm:text-xs text-white/80 truncate">नागरिक जवाफदेहिता प्लेटफर्म</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex-shrink-0">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></div>
            <span className="hidden xs:inline">हेर्नुहोस्</span>
            <span className="xs:hidden">▶</span>
          </div>
        </div>
      </div>
    </div>

    {/* Video features */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 lg:mt-12">
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
          <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{feature.title}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section */}
       <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Purple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#800080] to-[#4A148C]"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-pattern-dots opacity-5"></div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto">
        {/* Main Content */}
        <div className="text-center space-y-8 mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <CheckCircle size={16} className="text-white" />
            <span className="text-sm font-medium text-white">
              जनताको आवाज, JAI सँग
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white px-4 sm:px-0 leading-tight">
            तपाईं पनि JAI को हिस्सा बन्नुहोस्
          </h2>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
            नेपालको भविष्य निर्माण गर्न हामीसँग सहकार्य गर्नुहोस्। 
            पारदर्शी र जवाफदेही शासनको लागि आफ्नो योगदान दिनुहोस्।
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 px-4 sm:px-0">
            {/* Primary Button */}
            <Link 
              href="/participate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#800080] font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl group"
            >
              <Users size={20} />
              <span>सहभागी हुनुहोस्</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* Secondary Button */}
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white bg-transparent text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <span>सम्पर्क गर्नुहोस्</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto pt-8 border-t border-white/20">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-sm sm:text-base text-white/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default HomePage;