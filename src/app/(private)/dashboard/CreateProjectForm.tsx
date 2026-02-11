'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { projectFormSchema } from '@/lib/validations/project';
import { handleApiError } from '@/lib/utils/errorHandler';

export default function CreateProjectForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      description: '',
      features: '',
      technologies: '',
      liveLink: '',
      githubLink: '',
      thumbnail: '',
    },
  });

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    try {
      const response = await fetch('/api/v1/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        handleApiError(result, response);
        return;
      }

      toast.success('सफल!', { description: 'JAI परियोजना सफलतापूर्वक सिर्जना गरियो!' });
      router.push('/dashboard/projects');
      router.refresh();
    } catch (error) {
      handleApiError(error, undefined);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Policy Analysis Tool" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe what this project does and its purpose..." rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Features</FormLabel>
              <FormControl>
                <Textarea placeholder="Data Analysis, Reporting, Interactive Visualization" rows={3} {...field} />
              </FormControl>
              <FormDescription>Separate features with commas</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies Used</FormLabel>
              <FormControl>
                <Input placeholder="AI, Machine Learning, Data Analysis" {...field} />
              </FormControl>
              <FormDescription>Separate technologies with commas</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="liveLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Site URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://jai.example.com/analysis-tool" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Link (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/jai-platform/analysis-tool" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Creating...' : 'Create JAI Project'}
        </Button>
      </form>
    </Form>
  );
}