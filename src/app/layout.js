import "./globals.css";

export const metadata = {
  title: "社交平台账号悼念馆",
  description: "主流社区被封禁/停权账号纪念馆。它们没有违反社群守则，它们只是运气不好。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
