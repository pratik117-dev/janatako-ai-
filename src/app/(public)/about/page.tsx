const About = () => {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="mb-12 text-3xl font-bold text-foreground md:text-4xl">JAI को बारेमा</h1>

      {/* Section 1 */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground">JAI के हो</h2>
        <p className="leading-relaxed text-muted-foreground">
          JAI एक काल्पनिक सार्वजनिक–जवाफदेही AI चरित्र हो।
          यो नेपालको निर्वाचन २०८२ मा केन्द्रित छ।
          JAI ले सार्वजनिक दाबी र वाचाहरूको तथ्यपरक विश्लेषण गर्छ —
          भावनाको होइन, तथ्यको आधारमा।
        </p>
      </section>

      {/* Section 2 - Bold */}
      <section className="mb-12 rounded-lg border border-border bg-secondary/30 p-6 md:p-8">
        <h2 className="mb-4 text-xl font-bold text-foreground">JAI के होइन</h2>
        <ul className="space-y-2 text-foreground font-medium">
          <li>• उम्मेदवार होइन</li>
          <li>• पार्टी होइन</li>
          <li>• प्रचारक होइन</li>
          <li>• भविष्यवाणी गर्ने होइन</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground">JAI किन आवश्यक छ</h2>
        <div className="space-y-3 leading-relaxed text-muted-foreground">
          <p>भावनाले देश चल्दैन। नियत मात्र पर्याप्त हुँदैन।</p>
          <p>
            हरेक नीतिको एउटा मूल्य हुन्छ — <span className="text-foreground font-medium">लागत + समय + क्षमता</span>।
            यो हिसाब नगरी बनाइएको कुनै पनि वाचा अधुरो छ।
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-foreground">JAI कसरी काम गर्छ</h2>
        <p className="mb-4 leading-relaxed text-muted-foreground">
          JAI ले सार्वजनिक दाबीहरूको विश्लेषण गर्छ — चार आयाममा:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Feasibility", desc: "के यो सम्भव छ?" },
            { title: "Cost", desc: "यसको लागत कति हो?" },
            { title: "Timeline", desc: "कति समय लाग्छ?" },
            { title: "Risk", desc: "जोखिम के-के छन्?" },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-border p-4">
              <p className="text-sm font-semibold text-primary">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default About;