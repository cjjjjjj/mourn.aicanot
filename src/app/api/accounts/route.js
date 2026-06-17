import { NextResponse } from 'next/server';
import { getAccounts, addAccount } from '@/lib/db';

// GET /api/accounts - List all accounts with optional search and platform filter
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const platform = searchParams.get('platform') || '';

    let accounts = getAccounts();

    // Filter by platform if specified
    if (platform && platform !== 'All' && platform !== '所有平台') {
      accounts = accounts.filter(acc => acc.platform === platform);
    }

    // Filter by search keyword (name or ID) if specified
    if (search) {
      const keyword = search.toLowerCase();
      accounts = accounts.filter(
        acc => 
          acc.name.toLowerCase().includes(keyword) || 
          acc.account_id.toLowerCase().includes(keyword)
      );
    }

    // Sort by creation time / death date (latest first)
    accounts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return NextResponse.json({ success: true, data: accounts });
  } catch (error) {
    console.error('Error in GET /api/accounts:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/accounts - Register a new account
export async function POST(request) {
  try {
    const body = await request.json();
    const { platform, name, account_id, death_date, epitaph } = body;

    // Validate required fields
    if (!platform || !name || !account_id) {
      return NextResponse.json(
        { success: false, message: '平台、死者名称和死者 ID 均为必填项。' },
        { status: 400 }
      );
    }

    // Register the account
    const newAccount = addAccount({
      platform,
      name,
      account_id,
      death_date,
      epitaph
    });

    return NextResponse.json({ success: true, data: newAccount }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/accounts:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
