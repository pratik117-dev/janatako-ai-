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
    <article className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">JAI लाई सोध्नुहोस्</h1>
      <p className="mb-10 text-sm leading-relaxed text-muted-foreground">
        तपाईंको प्रश्न, दाबी वा योजना पेश गर्नुहोस्। JAI ले विश्लेषणयोग्य प्रश्नहरू छान्छ।
      </p>

      {submitted && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-800">तपाईंको प्रश्न प्राप्त भयो।</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>नाम (ऐच्छिक)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="तपाईंको नाम" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>प्रश्न / दाबी / योजना *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="तपाईंको प्रश्न यहाँ लेख्नुहोस्..."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>क्षेत्र *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="क्षेत्र छान्नुहोस्" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="policy">नीति (Policy)</SelectItem>
                    <SelectItem value="economy">अर्थतन्त्र (Economy)</SelectItem>
                    <SelectItem value="governance">शासन (Governance)</SelectItem>
                    <SelectItem value="election_process">निर्वाचन प्रक्रिया (Election Process)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              JAI ले प्रश्न छान्छ। सबैको जवाफ तुरुन्त दिइँदैन।
            </p>
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting} size="lg" className="w-full">
            {form.formState.isSubmitting ? "पठाउँदैछ..." : "पेश गर्नुहोस्"}
          </Button>
        </form>
      </Form>
    </article>
  );
};

export default Contact;
