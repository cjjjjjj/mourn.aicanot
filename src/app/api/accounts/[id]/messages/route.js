import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/db';

// GET /api/accounts/[id]/messages - Get all messages for a specific account
export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing account ID' },
        { status: 400 }
      );
    }

    const messages = getMessages(id);
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error in GET /api/accounts/[id]/messages:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/accounts/[id]/messages - Leave a message/condolence for a specific account
export async function POST(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing account ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { author, content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, message: '寄语内容不能为空' },
        { status: 400 }
      );
    }

    const newMessage = addMessage(id, author, content);
    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/accounts/[id]/messages:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
