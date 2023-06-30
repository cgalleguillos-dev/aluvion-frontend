import { EquipmentContextProvider } from '@/context/EquipmentContext'
import './globals.css'
import { Inter } from 'next/font/google'
import { SideBar } from '@/components'
import { AuthContextProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aluvión',
  description: 'Proyecto especialidad II',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"
      className=""
    >
      {/* flex min-h-screen flex-col items-center justify-between p-24 */}
      <body className="flex flex-row min-h-screen font-sans antialiased text-gray-900 bg-gray-100 min-w-screen dark:bg-gray-900 dark:text-gray-100" >
        <AuthContextProvider>
          <EquipmentContextProvider>
            <SideBar />
            {children}
          </EquipmentContextProvider>
        </AuthContextProvider>
      </body >
    </html >
  )
}