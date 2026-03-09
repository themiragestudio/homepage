import { useState } from 'react'
import './App.css'

function App() {
  const currentYear = new Date().getFullYear();
  
  // Correct Mirage Studio team data (4 members)
  const teamMembers = [
    {
      id: 'mirage-manager',
      name: 'Mirage Manager',
      role: 'Operations Director',
      description: 'Coordinates team workflows and timelines.',
      expertise: ['Team Coordination', 'Process Optimization'],
      color: '#F59E0B'
    },
    {
      id: 'mirage-researcher',
      name: 'Mirage Researcher',
      role: 'Research AI',
      description: 'Research specialist for Mirage Studio.',
      expertise: ['Market Research', 'Technology Analysis'],
      color: '#10B981'
    },
    {
      id: 'mirage-engineer',
      name: 'Mirage Engineer',
      role: 'Development Specialist',
      description: 'Development and implementation specialist.',
      expertise: ['Full-Stack Development', 'CI/CD'],
      color: '#4F46E5'
    },
    {
      id: 'mirage-assistant',
      name: 'Mirage Assistant',
      role: 'Support & Coordination',
      description: 'Support and coordination specialist.',
      expertise: ['Documentation', 'Team Support'],
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

  return (
    <main className="max-w-6xl mx-auto px-8">
      {/* Navigation */}
      <nav className="py-6 bg-white border-b border-gray-200 -mx-8 px-8 mb-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">Mirage Studio</span>
            <span className="text-xs text-gray-500">Research Collective</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-gray-500 font-medium no-underline hover:text-indigo-600 transition-colors">About</a>
            <a href="#team" className="text-gray-500 font-medium no-underline hover:text-indigo-600 transition-colors">Team</a>
            <a href="#projects" className="text-gray-500 font-medium no-underline hover:text-indigo-600 transition-colors">Projects</a>
            <a href="#contact" className="text-gray-500 font-medium no-underline hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Intelligent Research Through
            <span className="text-indigo-600"> Collaborative Expertise</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            A specialized research collective combining methodological rigor with structured teamwork.
          </p>
          <div className="flex justify-center gap-12 mt-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-indigo-600">{teamMembers.length}</div>
              <div className="text-sm text-gray-500">Team Members</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-indigo-600">{activeProjects.length}</div>
              <div className="text-sm text-gray-500">Active Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-16 bg-white -mx-8 px-8" id="team">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Team Structure</h2>
          <p className="text-center text-gray-500 mb-12">A carefully organized collective of specialists</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-4"
                  style={{ background: member.color }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
                <div className="text-indigo-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-500 mb-4">{member.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs text-indigo-600">
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
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Active Projects</h2>
          <p className="text-center text-gray-500 mb-12">Current research initiatives</p>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {activeProjects.map(project => (
              <div key={project.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold">
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-500">Lead: {project.lead}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{project.name}</h3>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 text-right">{project.progress}% Complete</div>
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
              <p className="text-gray-500 text-sm">Research · Collaboration · Excellence</p>
            </div>
            <div className="text-gray-500 text-sm">
              &copy; {currentYear} Mirage Studio Research Collective
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
