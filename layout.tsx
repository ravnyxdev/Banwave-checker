import './globals.css'

export const metadata = {
  title: 'Roblox Ban Wave Tracker',
  description: 'Real-time crowdsourced Roblox ban wave tracking hub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
