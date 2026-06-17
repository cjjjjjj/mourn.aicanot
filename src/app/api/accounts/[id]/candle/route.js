import { NextResponse } from 'next/server';
import { incrementCandle } from '@/lib/db';

// POST /api/accounts/[id]/candle - Increment the candle count for an account
export async function POST(request, { params }) {
  try {
    // Await params if using Next.js 15
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing account ID' },
        { status: 400 }
      );
    }

    const updatedAccount = incrementCandle(id);

    if (!updatedAccount) {
      return NextResponse.json(
        { success: false, message: '未找到指定的账号' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedAccount });
  } catch (error) {
    console.error('Error in POST /api/accounts/[id]/candle:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
