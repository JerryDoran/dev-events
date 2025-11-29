'use server';

import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

export async function getSimilarEventsBySlug(slug: string) {
  try {
    await connectDB();

    const event = await Event.findOne({ slug }).exec();
    if (!event) {
      return [];
    }

    // need to use .lean() to get plain JS objects
    const similarEvents = await Event.find({
      _id: { $ne: event._id }, // Exclude the current event
      tags: { $in: event.tags }, // Find events with at least one matching tag
    }).lean();

    return similarEvents;
  } catch (error) {
    console.error('Error fetching similar events:', error);
    return [];
  }
}
