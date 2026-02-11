import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ProjectActions from '../ProjectActions';


interface Project {
  id: string;
  title: string;
  liveLink: string;
  createdAt: string;
}


async function getProjects(): Promise<Project[]> {

  const cookie = (await cookies()).get('next-auth.session-token')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/projects`, {
    headers: {
      Cookie: `next-auth.session-token=${cookie}`,
    },
    cache: 'no-store', 
  });

  if (!res.ok) {
    console.error('Failed to fetch projects');
    return [];
  }
  const data = await res.json();
  return data.data;
}

export default async function ProjectsDashboardPage() {
  const projects = await getProjects();

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">JAI परियोजनाहरू</h1>
          <p className="text-muted-foreground">
            जनताको AI प्लेटफर्मका विश्लेषण तथा अन्तर्क्रियात्मक परियोजनाहरू
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/create">Add New Project</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Published Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Name</TableHead>
                <TableHead>Live Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        className="underline hover:text-primary"
                      >
                        View Site
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <ProjectActions projectId={project.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No projects found. Start by creating a new one!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}