import fs from 'fs';
import path from 'path';

// Define the directory and file path for the JSON database
const dataDir = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const dbPath = path.join(dataDir, 'db.json');

// Initialize the database directory and file if they do not exist
function initDb() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    const defaultData = {
      accounts: [],
      messages: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

// Read database file
function readDb() {
  initDb();
  try {
    const fileContent = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to read JSON database:', error);
    return { accounts: [], messages: [] };
  }
}

// Write database file
function writeDb(data) {
  initDb();
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Failed to write to JSON database:', error);
    return false;
  }
}

// Get all accounts
export function getAccounts() {
  const db = readDb();
  return db.accounts || [];
}

// Add a new account
export function addAccount(account) {
  const db = readDb();
  
  // Format the new account item
  const newAccount = {
    id: `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    platform: account.platform,
    name: account.name,
    account_id: account.account_id,
    death_date: account.death_date || new Date().toISOString().split('T')[0],
    epitaph: account.epitaph || '',
    candles: 0,
    created_at: new Date().toISOString()
  };

  db.accounts.push(newAccount);
  writeDb(db);
  return newAccount;
}

// Increment candle count for a specific account
export function incrementCandle(accountId) {
  const db = readDb();
  const account = db.accounts.find(acc => acc.id === accountId);
  
  if (account) {
    account.candles = (account.candles || 0) + 1;
    writeDb(db);
    return account;
  }
  return null;
}

// Get all messages for a specific account
export function getMessages(accountId) {
  const db = readDb();
  const messages = db.messages || [];
  return messages
    .filter(msg => msg.account_id === accountId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Latest messages first
}

// Add a message (condolence) for a specific account
export function addMessage(accountId, author, content) {
  const db = readDb();
  if (!db.messages) {
    db.messages = [];
  }

  const newMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    account_id: accountId,
    author: author || '路过悼念的网友',
    content: content || '默默点亮一盏灯，愿逝去账号的灵魂安息。',
    created_at: new Date().toISOString()
  };

  db.messages.push(newMessage);
  writeDb(db);
  return newMessage;
}
