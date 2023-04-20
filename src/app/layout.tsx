import QueryProvider from '@/components/utilities/QueryProvider'
import './globals.css'

export const metadata = {
  title: 'GPT Deck',
  description: 'GPTを使う',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
