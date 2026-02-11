// src/app/(public)/blogs/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import MarkdownRenderer from "@/components/shared/markdown-renderer";

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  createdAt: string;
  description?: string;
  tags?: string[];
  readTime?: number;
}

async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Failed to fetch blog with ID ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return { title: "Blog Post Not Found" };
  }

  // For description, try to use the description field first, then extract from content
  let description = blog.description || "";
  if (!description) {
    // Remove markdown formatting for plain text
    const plainText = blog.content
      .replace(/[#*`\[\]]/g, '') // Remove markdown symbols
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
      .replace(/\$\$[\s\S]*?\$\$/g, '') // Remove math blocks
      .replace(/\$.*?\$/g, ''); // Remove inline math
    
    description = plainText.substring(0, 160).trim();
  }

  return {
    title: `${blog.title} | Your Blog`,
    description,
    openGraph: {
      title: blog.title,
      description,
      images: blog.thumbnail ? [blog.thumbnail] : [],
      type: "article",
      publishedTime: blog.createdAt,
    },
    twitter: {
      card: blog.thumbnail ? "summary_large_image" : "summary",
      title: blog.title,
      description,
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs`);
    const data = await res.json();
    const blogs: Blog[] = data.data || [];
    return blogs.map((blog) => ({ id: blog.id }));
  } catch (error) {
    console.error("Failed to generate static params for blogs:", error);
    return [];
  }
}

// Helper function to calculate read time
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Improved helper function to strip HTML tags and normalize markdown
function stripHtmlTags(html: string): string {
  let clean = html;
  
  // Convert block-level elements to newlines to preserve structure
  clean = clean.replace(/<br\s*\/?>/gi, '\n'); // Line breaks
  clean = clean.replace(/<\/p>/gi, '\n\n'); // Paragraphs
  clean = clean.replace(/<\/div>/gi, '\n\n'); // Divs
  clean = clean.replace(/<\/h[1-6]>/gi, '\n\n'); // Headings
  clean = clean.replace(/<\/li>/gi, '\n'); // List items
  clean = clean.replace(/<\/ul>/gi, '\n\n'); // Unordered lists
  clean = clean.replace(/<\/ol>/gi, '\n\n'); // Ordered lists
  
  // Remove all remaining HTML tags
  clean = clean.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities (e.g., &amp; to &)
  clean = clean.replace(/&amp;/g, '&');
  clean = clean.replace(/&lt;/g, '<');
  clean = clean.replace(/&gt;/g, '>');
  clean = clean.replace(/&quot;/g, '"');
  clean = clean.replace(/&#039;/g, "'");
  clean = clean.replace(/&nbsp;/g, ' ');
  
  // Normalize multiple newlines to at most two (for paragraphs)
  clean = clean.replace(/\n{3,}/g, '\n\n');
  
  // Clean up spaces at the beginning of lines
  clean = clean.replace(/^\s+/gm, '');
  
  // Trim leading/trailing whitespace
  return clean.trim();
}

// Alternative: More aggressive content normalization
function normalizeMarkdownContent(content: string): string {
  let normalized = stripHtmlTags(content);
  
  // Split into lines and process each line
  const lines = normalized.split('\n');
  const processedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      processedLines.push('');
      continue;
    }
    
    // Add the line
    processedLines.push(line);
    
    // Add a blank line after each non-empty line to create paragraph breaks
    if (i < lines.length - 1) {
      processedLines.push('');
    }
  }
  
  // Join and clean up excessive newlines
  let result = processedLines.join('\n');
  result = result.replace(/\n{3,}/g, '\n\n');
  
  return result.trim();
}

export default async function SingleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const readTime = blog.readTime || calculateReadTime(blog.content);
  
  // Strip HTML tags and normalize markdown content
  // Use normalizeMarkdownContent for better formatting
  const cleanContent = normalizeMarkdownContent(blog.content);

  return (
    <main className="container max-w-4xl mx-auto py-12 md:py-20 px-4">
      <article className="blog-article">
        <header className="mb-10">
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl text-center">
            {blog.title}
          </h1>
          
          <div className="mt-4 text-sm text-muted-foreground text-center space-x-4">
            <span>
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: 'UTC',
              })}
            </span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
          
          {blog.thumbnail && (
            <div className="mt-8 relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
        </header>

        {/* Rich content rendering with markdown */}
        <div className="mt-8 markdown-content prose prose-lg dark:prose-invert max-w-none">
          <MarkdownRenderer content={cleanContent} />
        </div>

        {/* Author bio section */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/jeevankc17/image/upload/v1770086725/llpp_v7ssqd.jpg"
                alt="Jeevan KC"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">Jeevan KC</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Software developer and blogger passionate about web technologies, databases, and system design. 
                Sharing knowledge to help others grow in their tech journey.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="https://www.linkedin.com/in/jeevankc17/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}