const Vision = () => {
  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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

        <div className="relative mx-auto max-w-4xl text-center space-y-4 sm:space-y-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 mb-2 sm:mb-4 shadow-2xl shadow-purple-900/30">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            JAI को भिजन
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            तथ्यमा आधारित नीति निर्माणको लागि एक नयाँ मानक
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 -mt-8 sm:-mt-12 relative z-10">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-purple-100/50 border-2 border-purple-50 p-6 sm:p-8 md:p-12 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/30 pointer-events-none"></div>

          <div className="relative z-10 space-y-8 sm:space-y-10">
            {/* Vision Points */}
            <div className="space-y-6 sm:space-y-8">
              {/* Point 1 */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                      राज्य प्रयोगशाला होइन। जनताको जीवन परीक्षणको विषय होइन।
                      हरेक नीतिगत निर्णयको नतिजा वास्तविक मानिसहरूले भोग्छन् —
                      त्यसैले नीति बनाउँदा तथ्य र क्षमताको हिसाब अनिवार्य छ।
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                      संस्था बलियो हुनुपर्छ। व्यक्ति आउँछन्, जान्छन् —
                      तर संस्थाले निरन्तरता दिन्छ। कमजोर संस्थाले न नीति बनाउन सक्छ,
                      न कार्यान्वयन गर्न सक्छ।
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 3 */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                      नीति बनाउँदा क्षमता गन्नुपर्छ। कति लाग्छ? कसले गर्छ? कहिलेसम्म हुन्छ?
                      यी प्रश्नहरूको जवाफ बिना कुनै पनि योजना अधुरो छ।
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 4 */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                      जनतालाई तथ्य चाहिन्छ, नारा होइन।
                      सूचित नागरिकले मात्र सही निर्णय गर्न सक्छ।
                      JAI ले यही तथ्य प्रदान गर्ने लक्ष्य राख्छ।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="bg-white px-4">
                  <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 sm:p-8 md:p-10 border-l-4 border-purple-500 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed mb-2">
                    This is not a manifesto.
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 leading-relaxed">
                    This is a benchmark.
                  </p>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <p className="text-sm text-gray-600 italic">
                      — JAI Vision Statement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">तथ्यमा आधारित</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">प्रमाण र डाटाको आधारमा निर्णय</p>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">पारदर्शी</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">खुला र जवाफदेही प्रक्रिया</p>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200 group sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">प्रभावकारी</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">नतिजामुखी दृष्टिकोण</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Vision;