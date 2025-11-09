'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from './layout'
import { Button } from './button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50" />
      
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Building the Future Through{' '}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Flolabs International is at the forefront of AI, robotics, and cutting-edge 
              technology. Join our team of innovators and shape tomorrow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/internships">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Internships
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
