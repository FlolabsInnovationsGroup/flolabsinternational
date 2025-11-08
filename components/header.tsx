import Link from 'next/link'
import Image from 'next/image'
import { Container } from './layout'

const navigation = [
  { name: 'Blogs', href: '/blogs' },
  { name: 'About us', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Internships', href: '/internships' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/flo-labs-logo.jpg" 
              alt="Flo Labs R&D International" 
              width={91}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/internships"
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              View Internships
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}
