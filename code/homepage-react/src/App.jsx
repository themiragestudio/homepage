import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import ModelsPage from './components/models/ModelsPage'
import './App.css'

// ─── Home page (existing content) ───────────────────────────────────────────
function HomePage() {
  const currentYear = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

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

  const activeProjects = [
    {
      id: 'mirage-homepage',
      name: 'Mirage Studio Website',
      status: 'Active',
      lead: 'Michael Scott',
      progress: 95
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <div className="mt-6 text-lg font-semibold text-gray-900">Initializing Mirage Framework</div>
          <div className="text-sm text-gray-500 mt-2">Loading structured collaboration protocols...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-8">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
          Transform Research with
          <span className="text-indigo-600"> AI-Powered Collaboration</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          We pioneer structured AI-human collaboration frameworks that deliver 3x faster insights with methodological precision.
        </p>
        {/* Models CTA */}
        <div className="mb-10">
          <Link
            to="/models"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 no-underline"
          >
            <span>🤖</span>
            <span>浏览 AI 模型目录</span>
            <span>→</span>
          </Link>
        </div>
        <div className="flex justify-center gap-12 mt-4">
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
      </section>

      {/* Methodology Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50 -mx-8 px-8" id="methodology">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Our Methodology</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            A structured framework that combines AI precision with human insight for accelerated, validated results
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🔍', color: 'indigo', title: 'Structured Research',
                desc: 'Systematic analysis protocols that ensure comprehensive coverage and methodological rigor.',
                points: ['Multi-source validation', 'Bias detection algorithms', 'Insight synthesis frameworks']
              },
              {
                emoji: '🤝', color: 'emerald', title: 'AI-Human Orchestration',
                desc: 'Specialized AI agents working in coordinated workflows, supervised by human expertise.',
                points: ['Role-based task allocation', 'Real-time collaboration protocols', 'Quality assurance checkpoints']
              },
              {
                emoji: '🚀', color: 'amber', title: 'Accelerated Delivery',
                desc: 'Optimized workflows that deliver 3x faster insights without compromising quality.',
                points: ['Parallel processing pipelines', 'Automated validation cycles', 'Continuous improvement feedback']
              }
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg">
                <div className={`w-12 h-12 bg-${card.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                  <span className="text-2xl">{card.emoji}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.desc}</p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {card.points.map(p => (
                    <li key={p} className="flex items-center">
                      <span className={`w-1.5 h-1.5 bg-${card.color}-500 rounded-full mr-2`}></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
                className="group bg-white rounded-2xl p-8 text-center border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: member.color, boxShadow: `0 4px 14px 0 ${member.color}40` }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-900 group-hover:text-indigo-700 transition-colors">{member.name}</h3>
                <div className="text-indigo-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 rounded-full text-xs font-medium text-indigo-700">
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
          <div className="max-w-2xl mx-auto">
            {activeProjects.map(project => (
              <div key={project.id} className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-xs font-semibold">
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-600">Lead: <span className="font-medium">{project.lead}</span></span>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-indigo-700 transition-colors">{project.name}</h3>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-semibold text-indigo-600">{project.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-700"
                      style={{ width: `${project.progress}%` }}
                      role="progressbar"
                      aria-valuenow={project.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Root App with Router ─────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/models" element={<ModelsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
