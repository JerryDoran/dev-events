import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model'; // Adjust import path as needed

// Type for route params
type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();
    // Extract and validate slug parameter
    const { slug } = await params;

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Slug parameter is required and must be a string',
        },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric, hyphens, underscores only)
    const slugRegex = /^[a-z0-9-_]+$/i;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid slug format. Only alphanumeric characters, hyphens, and underscores are allowed',
        },
        { status: 400 }
      );
    }

    // Trim slug to prevent whitespace issues
    const sanitizedSlug = slug.trim().toLowerCase();

    // Query event by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean().exec();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: `Event with slug '${sanitizedSlug}' not found`,
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (use proper logging service in production)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching event by slug:', error);
    }
    // Handle Mongoose-specific errors
    if (error instanceof Error) {
      if (error.message.includes('MONGODB_URI')) {
        return NextResponse.json(
          {
            success: false,
            error: 'Database configuration error',
          },
          { status: 500 }
        );
      }
      // Handle generic errors
      return NextResponse.json(
        {
          success: false,
          error: error.message || 'An error occurred',
        },
        { status: 500 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
