import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const currentYear = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mirage Studio AI Team - Structured Collaboration Framework
  const teamMembers = [
    {
      id: 'mirage-manager',
      name: 'Michael Scott',
      role: 'Strategic Orchestrator',
      description: 'Designs and coordinates AI-human workflows, ensuring methodological precision and timely delivery.',
      expertise: ['Workflow Design', 'Quality Assurance', 'Client Coordination'],
      color: '#F59E0B'
    },
    {
      id: 'mirage-researcher',
      name: 'Dr. Brown',
      role: 'Research Methodology Specialist',
      description: 'Develops research frameworks and validates insights through structured analysis protocols.',
      expertise: ['Methodology Design', 'Data Validation', 'Insight Synthesis'],
      color: '#10B981'
    },
    {
      id: 'mirage-engineer',
      name: 'Victor Blake',
      role: 'Technical Implementation Lead',
      description: 'Transforms research insights into production-ready solutions with robust technical architecture.',
      expertise: ['System Architecture', 'Performance Optimization', 'CI/CD Pipelines'],
      color: '#4F46E5'
    },
    {
      id: 'mirage-quality',
      name: 'Adrian Monk',
      role: 'Quality Assurance Specialist',
      description: 'Ensures pixel-perfect execution and methodological consistency across all deliverables.',
      expertise: ['Visual Precision', 'Accessibility Compliance', 'Process Validation'],
      color: '#EC4899'
    }
  ];

  // Only Mirage Studio Website project
  const activeProjects = [
    {
      id: 'mirage-homepage',
      name: 'Mirage Studio Website',
      status: 'Active',
      lead: 'Mirage Manager',
      progress: 95
    }
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
            <div className="mt-6">
              <div className="text-lg font-semibold text-gray-900">Initializing Mirage Framework</div>
              <div className="text-sm text-gray-500 mt-2">Loading structured collaboration protocols...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center max-w-md mx-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Framework Connection Issue</h1>
          <p className="text-gray-600 mb-6">
            Our AI collaboration framework is experiencing a temporary disruption. 
            The team is working to restore optimal functionality.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Reinitialize Framework
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-8">
      {/* Navigation */}
      <nav className="py-6 bg-white border-b border-gray-200 -mx-8 px-8 mb-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">Mirage Studio</span>
            <span className="text-xs text-gray-500">AI-Powered Research Methodology</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a 
              href="#methodology" 
              className="text-gray-600 font-medium no-underline hover:text-indigo-600 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:rounded px-2 py-1"
              aria-label="View our methodology"
            >
              Methodology
            </a>
            <a 
              href="#team" 
              className="text-gray-600 font-medium no-underline hover:text-indigo-600 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:rounded px-2 py-1"
              aria-label="Meet our team"
            >
              Team
            </a>
            <a 
              href="#projects" 
              className="text-gray-600 font-medium no-underline hover:text-indigo-600 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:rounded px-2 py-1"
              aria-label="View our projects"
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="text-gray-600 font-medium no-underline hover:text-indigo-600 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:rounded px-2 py-1"
              aria-label="Contact us"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Transform Research with
            <span className="text-indigo-600"> AI-Powered Collaboration</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            We pioneer structured AI-human collaboration frameworks that deliver 3x faster insights with methodological precision.
          </p>
          <div className="flex justify-center gap-12 mt-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-indigo-600">4</div>
              <div className="text-sm text-gray-500">Specialized AI Roles</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-indigo-600">12+</div>
              <div className="text-sm text-gray-500">Projects Delivered</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-indigo-600">3x</div>
              <div className="text-sm text-gray-500">Faster Insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50 -mx-8 px-8" id="methodology">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Our Methodology</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            A structured framework that combines AI precision with human insight for accelerated, validated results
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Structured Research</h3>
              <p className="text-gray-600 mb-4">
                Systematic analysis protocols that ensure comprehensive coverage and methodological rigor.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                  Multi-source validation
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                  Bias detection algorithms
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                  Insight synthesis frameworks
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">AI-Human Orchestration</h3>
              <p className="text-gray-600 mb-4">
                Specialized AI agents working in coordinated workflows, supervised by human expertise.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                  Role-based task allocation
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                  Real-time collaboration protocols
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                  Quality assurance checkpoints
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Accelerated Delivery</h3>
              <p className="text-gray-600 mb-4">
                Optimized workflows that deliver 3x faster insights without compromising quality.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Parallel processing pipelines
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Automated validation cycles
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Continuous improvement feedback
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-16 bg-white -mx-8 px-8" id="team">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Structured AI Collaboration</h2>
          <p className="text-center text-gray-500 mb-12">Our unique methodology: specialized AI agents working in orchestrated workflows</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="group bg-white rounded-2xl p-8 text-center border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 will-change-transform focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
                style={{ animationDelay: `${index * 100}ms` }}
                tabIndex={0}
                role="article"
                aria-label={`Team member: ${member.name}, ${member.role}`}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{ 
                    background: member.color,
                    boxShadow: `0 4px 14px 0 ${member.color}40`
                  }}
                  aria-hidden="true"
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-900 group-hover:text-indigo-700 transition-colors">{member.name}</h3>
                <div className="text-indigo-600 font-medium mb-4 group-hover:text-indigo-800 transition-colors">{member.role}</div>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 rounded-full text-xs font-medium text-indigo-700 transition-all duration-200 hover:from-indigo-100 hover:to-indigo-200 hover:border-indigo-300 hover:scale-105"
                      aria-label={`Skill: ${skill}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Research Initiatives</h2>
          <p className="text-center text-gray-500 mb-12">Applying our AI-human collaboration framework to complex challenges</p>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {activeProjects.map(project => (
              <div 
                key={project.id} 
                className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 will-change-transform focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
                tabIndex={0}
                role="article"
                aria-label={`Project: ${project.name}, Status: ${project.status}`}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-xs font-semibold shadow-sm group-hover:shadow-md transition-shadow">
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    Lead: <span className="font-medium">{project.lead}</span>
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-indigo-700 transition-colors">{project.name}</h3>
                
                {/* Enhanced Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-semibold text-indigo-600">{project.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-700 ease-out group-hover:from-indigo-600 group-hover:to-indigo-700"
                      style={{ width: `${project.progress}%` }}
                      role="progressbar"
                      aria-valuenow={project.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div className="h-full w-full bg-gradient-to-r from-transparent to-white/20 animate-shimmer"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">Planning</span>
                    <span className="text-xs text-gray-500">Development</span>
                    <span className="text-xs text-gray-500">Testing</span>
                    <span className="text-xs text-gray-500">Launch</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-100">
                  <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    <span className="font-medium">Next Milestone:</span> Final accessibility audit and performance optimization
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200 -mx-8 px-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-xl font-bold text-gray-900">Mirage Studio</div>
              <p className="text-gray-500 text-sm">AI-Human Collaboration · Methodological Precision · Accelerated Insights</p>
            </div>
            <div className="text-gray-500 text-sm">
              &copy; {currentYear} Mirage Studio — Pioneering AI-Powered Research Methodology
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
