"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submissionFormSchema } from "@/lib/validations/submission";
import { MessageSquare, CheckCircle, Sparkles, Shield, Users } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(submissionFormSchema),
    defaultValues: {
      name: "",
      question: "",
      category: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof submissionFormSchema>) {
    try {
      const response = await fetch('/api/v1/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          // Handle validation errors
          Object.entries(result.errors).forEach(([field, messages]) => {
            form.setError(field as any, { message: Array.isArray(messages) ? messages[0] : messages });
          });
          return;
        }
        throw new Error(result.message || 'Failed to submit');
      }

      toast.success('सफल!', { description: 'तपाईंको प्रश्न प्राप्त भयो।' });
      form.reset();
      setSubmitted(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      toast.error('त्रुटि', { 
        description: error instanceof Error ? error.message : 'पेश गर्न असफल भयो। कृपया पुन: प्रयास गर्नुहोस्।' 
      });
    }
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20">
      {/* Hero Header - Professional Purple Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-28">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

        <div className="relative mx-auto max-w-4xl text-center space-y-6 sm:space-y-8">
          {/* Enhanced Icon with professional styling */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 mb-2 sm:mb-4 shadow-2xl shadow-purple-900/30 hover:scale-105 hover:bg-white/20 transition-all duration-300">
            <MessageSquare className="text-white" size={32} strokeWidth={2.5} />
          </div>

          <div className="space-y-4 sm:space-y-5 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              JAI लाई सोध्नुहोस्
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed font-normal">
              तपाईंको प्रश्न, दाबी वा योजना पेश गर्नुहोस्। JAI ले विश्लेषणयोग्य प्रश्नहरू छान्छ।
            </p>
          </div>

          {/* Trust badges - Professional design */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 px-2">
            <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 hover:border-white/30 transition-all duration-300 shadow-lg shadow-purple-900/20">
              <Shield className="text-white/90" size={18} />
              <span className="text-sm sm:text-base text-white font-medium">पारदर्शी</span>
            </div>
            <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 hover:border-white/30 transition-all duration-300 shadow-lg shadow-purple-900/20">
              <Sparkles className="text-white/90" size={18} />
              <span className="text-sm sm:text-base text-white font-medium">तथ्यमा आधारित</span>
            </div>
            <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 hover:border-white/30 transition-all duration-300 shadow-lg shadow-purple-900/20">
              <Users className="text-white/90" size={18} />
              <span className="text-sm sm:text-base text-white font-medium">निष्पक्ष</span>
            </div>
          </div>

          {/* Optional: Add a subtle call-to-action hint */}
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 text-white/80 text-sm animate-pulse">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>तल स्क्रोल गर्नुहोस्</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section - Enhanced with better card design */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20 -mt-8 sm:-mt-12 relative z-10">
        {/* Success Message - Enhanced */}
        {submitted && (
          <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 flex items-start gap-3 sm:gap-4 shadow-lg shadow-green-100 animate-fade-in-up">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-1 text-sm sm:text-base">सफलतापूर्वक पेश गरियो!</h3>
              <p className="text-xs sm:text-sm text-green-700">तपाईंको प्रश्न प्राप्त भयो। हामी चाँडै प्रतिक्रिया दिनेछौं।</p>
            </div>
          </div>
        )}

        {/* Main Form Card - Enhanced with glassmorphism */}
        <div className="card-civic p-5 sm:p-8 md:p-10 lg:p-12 shadow-xl sm:shadow-2xl shadow-purple-100/50 border-2 border-purple-50 relative overflow-hidden rounded-xl sm:rounded-2xl">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/30 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="mb-6 sm:mb-8 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">आफ्नो प्रश्न पेश गर्नुहोस्</h2>
              <p className="text-sm sm:text-base text-gray-600">JAI तपाईंको प्रश्नको विश्लेषण गर्नेछ</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 md:space-y-7">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-semibold text-sm sm:text-base flex items-center gap-2">
                        नाम 
                        <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">ऐच्छिक</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="तपाईंको नाम" 
                          className="input-civic h-11 sm:h-12 text-sm sm:text-base shadow-sm focus:shadow-md transition-shadow"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-semibold text-sm sm:text-base flex items-center gap-2">
                        प्रश्न / दाबी / योजना 
                        <span className="text-xs font-normal text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="तपाईंको प्रश्न यहाँ लेख्नुहोस्..."
                          rows={5}
                          className="textarea-civic text-sm sm:text-base shadow-sm focus:shadow-md transition-shadow resize-none min-h-[120px] sm:min-h-[140px]"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1.5 sm:mt-2">विस्तृत प्रश्न राख्नुहोस् जसमा सन्दर्भ र पृष्ठभूमि समावेश छ</p>
                      <FormMessage className="text-red-600 text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-semibold text-sm sm:text-base flex items-center gap-2">
                        क्षेत्र 
                        <span className="text-xs font-normal text-red-500">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="input-civic h-11 sm:h-12 text-sm sm:text-base shadow-sm focus:shadow-md transition-shadow">
                            <SelectValue placeholder="क्षेत्र छान्नुहोस्" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="policy" className="text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                              नीति (Policy)
                            </div>
                          </SelectItem>
                          <SelectItem value="economy" className="text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              अर्थतन्त्र (Economy)
                            </div>
                          </SelectItem>
                          <SelectItem value="governance" className="text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              शासन (Governance)
                            </div>
                          </SelectItem>
                          <SelectItem value="election_process" className="text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                              निर्वाचन प्रक्रिया (Election Process)
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-600 text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <div className="badge-civic-purple rounded-lg sm:rounded-xl border-2 p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-blue-50 shadow-sm">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-100 flex items-center justify-center mt-0.5">
                      <Sparkles className="text-purple-600" size={14} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">महत्त्वपूर्ण जानकारी</h4>
                      <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
                        JAI ले प्रश्न छान्छ। सबैको जवाफ तुरुन्त दिइँदैन। तर सबै प्रश्न ध्यानपूर्वक समीक्षा गरिन्छ।
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                  className="btn-civic-primary w-full h-12 sm:h-14 text-base sm:text-lg font-semibold shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      पठाउँदैछ...
                    </span>
                  ) : (
                    "पेश गर्नुहोस्"
                  )}
                </button>
              </form>
            </Form>
          </div>
        </div>

        {/* Info Cards Section - Enhanced with better hover effects */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          <div className="card-civic p-5 sm:p-6 md:p-7 text-center card-civic-hover group shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200 rounded-xl sm:rounded-2xl">
            <div className="icon-container-purple w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
              <Sparkles className="text-white" size={22} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-base sm:text-lg">तथ्यमा आधारित</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">डाटा र प्रमाणमा आधारित विश्लेषण</p>
          </div>

          <div className="card-civic p-5 sm:p-6 md:p-7 text-center card-civic-hover group shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200 rounded-xl sm:rounded-2xl">
            <div className="icon-container-purple w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
              <Shield className="text-white" size={22} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-base sm:text-lg">पारदर्शी</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">सबै स्रोत खुला र पहुँचयोग्य</p>
          </div>

          <div className="card-civic p-5 sm:p-6 md:p-7 text-center card-civic-hover group shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200 rounded-xl sm:rounded-2xl sm:col-span-2 md:col-span-1">
            <div className="icon-container-purple w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
              <Users className="text-white" size={22} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-base sm:text-lg">निष्पक्ष</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">राजनीतिक प्रभावबाट मुक्त</p>
          </div>
        </div>

        {/* Additional info section */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            JAI - सूचनायुक्त नागरिकको लागि कृत्रिम बुद्धिमत्ता
          </p>
        </div>
      </div>
    </article>
  );
};

export default Contact;