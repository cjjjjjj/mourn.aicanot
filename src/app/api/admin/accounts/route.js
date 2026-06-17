import { NextResponse } from "next/server";
import { getAccounts, updateAccount, deleteAccount } from "@/lib/db";

// Helper to verify admin session cookie
function isAuthenticated(request) {
  const cookie = request.cookies.get("admin_session")?.value;
  return cookie === "authenticated_token_secure_mourn";
}

// GET all accounts (for admin view)
export async function GET(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const accounts = getAccounts();
    // Sort by creation date or ID descending
    const sorted = [...accounts].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    return NextResponse.json({ success: true, data: sorted });
  } catch (error) {
    console.error("Admin Accounts GET Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// PUT (update) an account
export async function PUT(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, platform, name, account_id, death_date, epitaph } = body;

    if (!id || !name || !account_id) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const updated = updateAccount(id, { platform, name, account_id, death_date, epitaph });
    if (updated) {
      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ success: false, message: "Account not found" }, { status: 404 });
  } catch (error) {
    console.error("Admin Accounts PUT Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// DELETE an account
export async function DELETE(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing id parameter" }, { status: 400 });
    }

    const deleted = deleteAccount(id);
    if (deleted) {
      return NextResponse.json({ success: true, message: "Account deleted successfully" });
    }

    return NextResponse.json({ success: false, message: "Failed to delete account" }, { status: 500 });
  } catch (error) {
    console.error("Admin Accounts DELETE Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
