import Link from 'next/link'import Link from 'next/link'

import { getInternships } from '@/lib/strapi'import { getInternships, type Internship } from '@/lib/strapi'

import { Container, Section } from '@/components/layout'import { Container, Section } from '@/components/layout'

import { Button } from '@/components/button'import { Button } from '@/components/button'



export default async function InternshipsPage() {export default async function InternshipsPage() {

  // Fetch internships from Strapi  // Fetch internships from Strapi

  const internships = await getInternships({ status: 'Open' })  const internships = await getInternships({ status: 'Open' })



  return (    // Filter by status

    <main className="min-h-screen bg-white pt-20">    if (statusFilter !== 'All') {

      <Section className="py-16">      filtered = filtered.filter(i => i.status === statusFilter)

        <Container>    }

          <div className="max-w-3xl mx-auto text-center mb-12">

            <h1 className="text-4xl md:text-5xl font-bold mb-6">    // Filter by category

              Internship Opportunities    if (selectedCategory !== 'All') {

            </h1>      filtered = filtered.filter(i => i.category === selectedCategory)

            <p className="text-xl text-gray-600">    }

              Join our team and work on cutting-edge technology. All positions are remote and offer hands-on experience in robotics, AI, and software development.

            </p>    // Filter by search

          </div>    if (searchQuery) {

      const query = searchQuery.toLowerCase()

          {internships.length === 0 ? (      filtered = filtered.filter(

            <div className="text-center py-12">        i =>

              <p className="text-xl text-gray-600">          i.title.toLowerCase().includes(query) ||

                No open internships at the moment. Check back soon!          i.description.toLowerCase().includes(query)

              </p>      )

            </div>    }

          ) : (

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">    return filtered

              {internships.map((internship) => (  }, [searchQuery, selectedCategory, statusFilter])

                <Link

                  key={internship.id}  const handleSearch = debounce((value: string) => {

                  href={`/internships/${internship.slug}`}    setSearchQuery(value)

                  className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"  }, 300)

                >

                  <div className="flex items-start justify-between mb-4">  return (

                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">    <>

                      {internship.title}      <Section className="bg-linear-to-br from-blue-50 via-white to-purple-50 py-12">

                    </h3>        <Container>

                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">          <div className="max-w-3xl mx-auto text-center">

                      {internship.status}            <h1 className="text-4xl md:text-5xl font-bold mb-4">

                    </span>              Internship Opportunities

                  </div>            </h1>

                              <p className="text-lg text-gray-600">

                  {internship.location && (              Join our team and work on cutting-edge projects in AI, robotics, and technology

                    <p className="text-sm text-gray-600 mb-2">            </p>

                      📍 {internship.location}          </div>

                    </p>        </Container>

                  )}      </Section>

                  

                  {internship.duration && (      <Section>

                    <p className="text-sm text-gray-600 mb-4">        <Container>

                      ⏱️ {internship.duration}          {/* Search and Filters */}

                    </p>          <div className="mb-12 space-y-6">

                  )}            {/* Search Bar */}

                              <div className="max-w-2xl mx-auto">

                  <p className="text-gray-700 line-clamp-3 mb-4">              <input

                    {internship.description}                type="text"

                  </p>                placeholder="Search internships..."

                                  onChange={(e) => handleSearch(e.target.value)}

                  <Button variant="outline" className="w-full">                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"

                    Learn More →              />

                  </Button>            </div>

                </Link>

              ))}            {/* Category Filters */}

            </div>            <div className="flex flex-wrap gap-3 justify-center">

          )}              <button

        </Container>                onClick={() => setSelectedCategory('All')}

      </Section>                className={`px-4 py-2 rounded-lg font-medium transition-all ${

    </main>                  selectedCategory === 'All'

  )                    ? 'bg-blue-600 text-white'

}                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'

                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex gap-3 justify-center">
              {(['All', 'Open', 'Closed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center text-gray-600">
            Showing {filteredInternships.length} {filteredInternships.length === 1 ? 'position' : 'positions'}
          </div>

          {/* Internship Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <InternshipCard internship={internship} />
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredInternships.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No internships found matching your criteria</p>
              <Button onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
                setStatusFilter('Open')
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

function InternshipCard({ internship }: Readonly<{ internship: Internship }>) {
  return (
    <Link href={`/internships/${internship.slug}`}>
      <div className="h-full p-6 bg-white border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start justify-between mb-3">
          <span className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full">
            {internship.category}
          </span>
          {internship.status === 'Open' && (
            <span className="px-3 py-1 text-sm font-medium bg-green-50 text-green-700 rounded-full">
              Open
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
          {internship.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {internship.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {internship.location && (
            <span className="flex items-center gap-1">
              📍 {internship.location}
            </span>
          )}
          {internship.duration && (
            <span className="flex items-center gap-1">
              ⏱️ {internship.duration}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
