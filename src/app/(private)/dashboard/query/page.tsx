import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Submission {
  id: string;
  name: string | null;
  question: string;
  category: 'policy' | 'economy' | 'governance' | 'election_process';
  createdAt: string;
}

async function getSubmissions(): Promise<Submission[]> {
  const sessionCookie = (await cookies()).get('next-auth.session-token')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/submissions`, {
    headers: {
      Cookie: `next-auth.session-token=${sessionCookie}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    console.error('Failed to fetch submissions');
    return [];
  }
  const data = await res.json();
  return data.data;
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    policy: 'नीति',
    economy: 'अर्थतन्त्र',
    governance: 'शासन',
    election_process: 'निर्वाचन प्रक्रिया',
  };
  return labels[category] || category;
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    policy: 'bg-blue-100 text-blue-800',
    economy: 'bg-green-100 text-green-800',
    governance: 'bg-purple-100 text-purple-800',
    election_process: 'bg-orange-100 text-orange-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export default async function QueryPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }
  
  const submissions = await getSubmissions();

  return (
    <main className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">JAI प्रश्नहरू</h1>
        <p className="text-muted-foreground">
          जनताबाट प्राप्त प्रश्न, दाबी र योजनाहरू
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submitted Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Name</TableHead>
                <TableHead className="w-[40%]">Question</TableHead>
                <TableHead className="w-[15%]">Category</TableHead>
                <TableHead className="w-[15%]">Date</TableHead>
                <TableHead className="w-[10%] text-right">ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions && submissions.length > 0 ? (
                submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      {submission.name || 'अज्ञात'}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md truncate" title={submission.question}>
                        {submission.question}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(submission.category)}>
                        {getCategoryLabel(submission.category)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(submission.createdAt).toLocaleDateString('ne-NP', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        timeZone: 'Asia/Kathmandu',
                      })}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {submission.id.slice(0, 8)}...
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No questions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
