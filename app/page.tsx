import { Inter } from 'next/font/google'
import "tailwindcss/tailwind.css"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <h1 className='text-purple-500 text-xl'> Hello there!</h1>
  )
}
