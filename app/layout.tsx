
import './globals.css'
import { Nunito } from 'next/font/google'
import { Navbar } from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/modals/Modal'

export const metadata = {
  title: 'KeBnB',
  description: 'KeBnB next app',
}

const font = Nunito({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly> <Navbar /> <Modal title="I am here" isOpen /> </ClientOnly>
        {children}</body>
    </html>
  )
}
