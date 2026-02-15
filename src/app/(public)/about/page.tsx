"use client";
import { CheckCircle, XCircle, Target, Cog, DollarSign, Clock, AlertTriangle } from "lucide-react";
/**
 * About Page Component - Purple Civic Theme
 * Detailed explanation of JAI with enhanced visuals and interactive elements
 */
const About = () => {
const whatIsNot = [
    { text: "उम्मेदवार होइन", icon: XCircle },
    { text: "पार्टी होइन", icon: XCircle },
    { text: "प्रचारक होइन", icon: XCircle },
    { text: "भविष्यवाणी गर्ने होइन", icon: XCircle },
  ];
const dimensions = [
    { 
title: "Feasibility", 
titleNepali: "सम्भाव्यता",
desc: "के यो सम्भव छ?",
icon: CheckCircle,
color: "from-green-500 to-green-600",
bgColor: "bg-green-50",
textColor: "text-green-700"
    },
    { 
title: "Cost", 
titleNepali: "लागत",
desc: "यसको लागत कति हो?",
icon: DollarSign,
color: "from-blue-500 to-blue-600",
bgColor: "bg-blue-50",
textColor: "text-blue-700"
    },
    { 
title: "Timeline", 
titleNepali: "समयसीमा",
desc: "कति समय लाग्छ?",
icon: Clock,
color: "from-orange-500 to-orange-600",
bgColor: "bg-orange-50",
textColor: "text-orange-700"
    },
    { 
title: "Risk", 
titleNepali: "जोखिम",
desc: "जोखिम के-के छन्?",
icon: AlertTriangle,
color: "from-red-500 to-red-600",
bgColor: "bg-red-50",
textColor: "text-red-700"
    },
  ];
return (
<article className="min-h-screen bg-gradient-to-b from-white to-gray-50">
{/* Hero Header */}
<section className="relative overflow-hidden bg-gradient-to-r from-[#800080] to-[#4A148C] px-6 py-20 md:py-28">
{/* Decorative elements */}
<div className="absolute inset-0 opacity-10">
<div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
<div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
</div>
<div className="relative mx-auto max-w-4xl text-center space-y-6">
{/* Logo/Icon */}
<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 mb-4">
<span className="text-4xl font-bold text-white">J</span>
</div>
<h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            JAI को बारेमा
</h1>
<p className="text-xl text-white/90 max-w-2xl mx-auto">
            नेपालको पहिलो सार्वजनिक-जवाफदेही AI चरित्र
</p>
</div>
</section>
{/* Main Content */}
<div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
{/* Section 1: What is JAI */}
<section className="mb-16 animate-fade-in-up">
<div className="flex items-center gap-3 mb-6">
<div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
<Target className="text-[#800080]" size={24} />
</div>
<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              JAI के हो?
</h2>
</div>
<div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 shadow-lg hover:border-[#800080]/30 transition-all duration-300">
<p className="text-lg leading-relaxed text-gray-700">
              JAI एक काल्पनिक सार्वजनिक–जवाफदेही AI चरित्र हो।
              यो नेपालको निर्वाचन २०८२ मा केन्द्रित छ।
              JAI ले सार्वजनिक दाबी र वाचाहरूको तथ्यपरक विश्लेषण गर्छ —
<span className="font-semibold text-gray-900"> भावनाको होइन, तथ्यको आधारमा</span>।
</p>
</div>
</section>
{/* Section 2: What JAI is NOT */}
<section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
<div className="flex items-center gap-3 mb-6">
<div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
<XCircle className="text-[#800080]" size={24} />
</div>
<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              JAI के होइन?
</h2>
</div>
<div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 p-8 md:p-10 shadow-lg">
<div className="grid sm:grid-cols-2 gap-4">
{whatIsNot.map((item, index) => (
<div 
key={item.text}
className="flex items-center gap-3 bg-white rounded-xl p-4 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-md"
style={{ animationDelay: `${index * 0.1}s` }}
>
<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
<item.icon className="text-[#800080]" size={20} />
</div>
<span className="font-semibold text-gray-900">{item.text}</span>
</div>
              ))}
</div>
</div>
</section>
{/* Section 3: Why JAI is Needed */}
<section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
<div className="flex items-center gap-3 mb-6">
<div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
<Cog className="text-[#800080]" size={24} />
</div>
<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              JAI किन आवश्यक छ?
</h2>
</div>
<div className="space-y-6">
{/* Quote Card */}
<div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
{/* Decorative quote mark */}
<div className="absolute top-4 right-4 text-8xl font-serif text-white/5">"</div>
<div className="relative space-y-6">
<p className="text-xl md:text-2xl font-bold leading-relaxed">
                  भावनाले देश चल्दैन। नियत मात्र पर्याप्त हुँदैन।
</p>
<div className="h-px bg-white/20"></div>
<p className="text-lg leading-relaxed text-white/90">
                  हरेक नीतिको एउटा मूल्य हुन्छ —
</p>
{/* Key metrics */}
<div className="flex flex-wrap gap-3">
{['लागत', 'समय', 'क्षमता'].map((metric) => (
<div 
key={metric}
className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
>
<span className="font-semibold">{metric}</span>
</div>
                  ))}
</div>
<p className="text-lg leading-relaxed text-white/90 border-l-4 border-[#800080] pl-4">
                  यो हिसाब नगरी बनाइएको कुनै पनि वाचा अधुरो छ।
</p>
</div>
</div>
</div>
</section>
{/* Section 4: How JAI Works */}
<section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
<div className="flex items-center gap-3 mb-6">
<div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
<CheckCircle className="text-[#800080]" size={24} />
</div>
<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              JAI कसरी काम गर्छ?
</h2>
</div>
<div className="space-y-8">
{/* Intro text */}
<div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 shadow-lg">
<p className="text-lg leading-relaxed text-gray-700">
                JAI ले सार्वजनिक दाबीहरूको विश्लेषण गर्छ — 
<span className="font-bold text-[#800080]"> चार आयाममा</span>:
</p>
</div>
{/* 4 Dimensions Grid */}
<div className="grid gap-6 md:grid-cols-2">
{dimensions.map((item, index) => (
<div 
key={item.title}
className="group relative bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8 shadow-lg hover:border-[#800080]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
style={{ animationDelay: `${index * 0.1}s` }}
>
{/* Icon */}
<div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
<item.icon className="text-white" size={26} />
</div>
{/* Title */}
<div className="space-y-2 mb-3">
<h3 className="text-lg font-bold text-gray-900">
{item.titleNepali}
</h3>
<p className={`text-sm font-medium ${item.textColor}`}>
{item.title}
</p>
</div>
{/* Description */}
<p className="text-gray-600 leading-relaxed">
{item.desc}
</p>
{/* Decorative element */}
<div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${item.color.replace('from-', 'bg-').split(' ')[0]} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
</div>
              ))}
</div>
</div>
</section>
{/* CTA Section */}
<section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
<div className="bg-gradient-to-r from-[#800080] to-[#4A148C] rounded-2xl p-8 md:p-12 text-center shadow-2xl">
<h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              तथ्यमा आधारित निर्णय लिनुहोस्
</h3>
<p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              JAI सँग मिलेर नेपालको राजनीतिक जवाफदेहिता बढाउनुहोस्
</p>
<div className="flex flex-col sm:flex-row gap-4 justify-center">
<button className="px-8 py-4 bg-white text-[#800080] font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                JAI लाई प्रश्न गर्नुहोस्
</button>
<button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">
                थप जान्नुहोस्
</button>
</div>
</div>
</section>
</div>
</article>
  );
};
export default About;