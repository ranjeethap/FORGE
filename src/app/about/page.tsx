import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">About FORGE</h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              FORGE is a revolutionary platform that connects talented developers, designers, and tech professionals 
              with innovative projects and teams. We believe in the power of collaboration and the impact that 
              skilled teams can have on the world.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Do</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Team Formation</h4>
                <p className="text-blue-800">
                  We help you build high-performing teams by matching skilled professionals 
                  with complementary expertise and shared goals.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Project Matching</h4>
                <p className="text-green-800">
                  Connect with exciting projects that match your skills, interests, 
                  and career aspirations.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li><strong>Collaboration:</strong> We believe great things happen when people work together</li>
              <li><strong>Innovation:</strong> We foster creativity and encourage thinking outside the box</li>
              <li><strong>Quality:</strong> We maintain high standards for all projects and teams</li>
              <li><strong>Transparency:</strong> We believe in open communication and clear expectations</li>
            </ul>

            <div className="text-center">
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
