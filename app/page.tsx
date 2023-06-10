import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin']})

export default function Home() {
  return (
    <div className="text-rose-500 text2xl">Hello Airbnb</div>
  )
}
