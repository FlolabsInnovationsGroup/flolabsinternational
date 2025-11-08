import Link from 'next/link'
import { Container } from './layout'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ],
  opportunities: [
    { name: 'Internships', href: '/internships' },
    { name: 'Engineering', href: '/internships?category=Engineering' },
    { name: 'Design', href: '/internships?category=Design' },
    { name: 'Research', href: '/internships?category=Research' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-black">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-white">
                  Flolabs International
                </span>
              </Link>
              <p className="text-sm text-white/80 mb-4 max-w-md">
                Building the future through innovation in AI, robotics, and cutting-edge technology. 
                Join our team and make an impact.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">Opportunities</h3>
              <ul className="space-y-2">
                {footerLinks.opportunities.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-white/20 pt-8">
            <p className="text-sm text-white/70 text-center">
              © {new Date().getFullYear()} Flolabs International. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
