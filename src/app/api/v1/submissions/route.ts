import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { submissionFormSchema } from '@/lib/validations/submission';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = submissionFormSchema.parse(body);
    
    // Create submission in database
    const submission = await prisma.submission.create({
      data: {
        name: validatedData.name || null,
        question: validatedData.question,
        category: validatedData.category,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Submission created successfully',
      data: submission,
    });
  } catch (error) {
    console.error('Submission creation error:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error.issues.reduce((acc: Record<string, string>, err: any) => {
            acc[err.path[0]] = err.message;
            return acc;
          }, {}),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create submission',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error('Submissions fetch error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch submissions',
      },
      { status: 500 }
    );
  }
}
