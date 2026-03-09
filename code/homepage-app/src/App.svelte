<script>
  let currentYear = new Date().getFullYear();
  
  // 真实团队数据
  const teamMembers = [
    {
      id: 'creator',
      name: 'Creator',
      role: 'Founder & Director',
      description: 'Visionary leader and project overseer.',
      expertise: ['Strategic Planning', 'Research Direction'],
      color: '#4F46E5'
    },
    {
      id: 'roy-batty',
      name: 'Roy Batty',
      role: 'Lead Researcher',
      description: 'Directs specialized research initiatives.',
      expertise: ['Behavioral Research', 'Data Analysis'],
      color: '#10B981'
    },
    {
      id: 'mirage-manager',
      name: 'Mirage Manager',
      role: 'Operations Director',
      description: 'Coordinates team workflows and timelines.',
      expertise: ['Team Coordination', 'Process Optimization'],
      color: '#F59E0B'
    }
  ];

  const activeProjects = [
    {
      id: 'emma-training',
      name: 'Emma Training Project',
      status: 'Active',
      lead: 'Roy Batty',
      progress: 85
    },
    {
      id: 'mirage-homepage',
      name: 'Mirage Studio Website',
      status: 'Active',
      lead: 'Mirage Manager',
      progress: 90
    }
  ];
</script>

<main>
  <!-- 导航栏 -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">
        <span class="logo-text">Mirage Studio</span>
        <span class="logo-subtitle">Research Collective</span>
      </div>
      <div class="nav-menu">
        <a href="#about" class="nav-link">About</a>
        <a href="#team" class="nav-link">Team</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
    </div>
  </nav>

  <!-- 主标题区域 -->
  <section class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">
          Intelligent Research Through
          <span class="accent">Collaborative Expertise</span>
        </h1>
        <p class="hero-description">
          A specialized research collective combining methodological rigor with structured teamwork.
        </p>
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-number">{teamMembers.length}</div>
            <div class="stat-label">Team Members</div>
          </div>
          <div class="stat">
            <div class="stat-number">{activeProjects.length}</div>
            <div class="stat-label">Active Projects</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 团队架构 -->
  <section class="team" id="team">
    <div class="section-container">
      <h2 class="section-title">Team Structure</h2>
      <p class="section-subtitle">A carefully organized collective of specialists</p>
      
      <div class="team-grid">
        {#each teamMembers as member}
          <div class="team-card">
            <div class="member-avatar" style="background: {member.color}">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 class="member-name">{member.name}</h3>
            <div class="member-role">{member.role}</div>
            <p class="member-description">{member.description}</p>
            <div class="member-expertise">
              {#each member.expertise as skill}
                <span class="skill-tag">{skill}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 项目展示 -->
  <section class="projects" id="projects">
    <div class="section-container">
      <h2 class="section-title">Active Projects</h2>
      <p class="section-subtitle">Current research initiatives</p>
      
      <div class="projects-grid">
        {#each activeProjects as project}
          <div class="project-card">
            <div class="project-header">
              <div class="project-status">{project.status}</div>
              <div class="project-lead">Lead: {project.lead}</div>
            </div>
            <h3 class="project-title">{project.name}</h3>
            <div class="progress-bar">
              <div class="progress-fill" style="width: {project.progress}%"></div>
            </div>
            <div class="progress-text">{project.progress}% Complete</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- 页脚 -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">Mirage Studio</div>
          <p class="footer-tagline">Research · Collaboration · Excellence</p>
        </div>
        <div class="copyright">
          &copy; {currentYear} Mirage Studio Research Collective
        </div>
      </div>
    </div>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #fafafa;
    color: #1a1a1a;
    line-height: 1.6;
  }

  /* 导航栏 */
  .navbar {
    padding: 1.5rem 2rem;
    background: white;
    border-bottom: 1px solid #e5e5e5;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    flex-direction: column;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
  }

  .logo-subtitle {
    font-size: 0.75rem;
    color: #666;
  }

  .nav-menu {
    display: flex;
    gap: 2rem;
  }

  .nav-link {
    color: #555;
    text-decoration: none;
    font-weight: 500;
  }

  .nav-link:hover {
    color: #4F46E5;
  }

  /* 主标题区域 */
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .hero {
    padding: 4rem 0;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .accent {
    color: #4F46E5;
  }

  .hero-description {
    font-size: 1.125rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto 2rem;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #4F46E5;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #666;
  }

  /* 团队架构 */
  .team {
    padding: 4rem 0;
    background: white;
  }

  .section-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .section-subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 3rem;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .team-card {
    background: #f8f9fa;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    border: 1px solid #e9ecef;
  }

  .member-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 auto 1rem;
  }

  .member-name {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.25rem;
  }

  .member-role {
    color: #4F46E5;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .member-description {
    color: #666;
    margin-bottom: 1rem;
  }

  .member-expertise {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .skill-tag {
    padding: 0.25rem 0.75rem;
    background: rgba(79, 70, 229, 0.1);
    border: 1px solid rgba(79, 70, 229, 0.2);
    border-radius: 1rem;
    font-size: 0.75rem;
    color: #4F46E5;
  }

  /* 项目展示 */
  .projects {
    padding: 4rem 0;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .project-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid #e9ecef;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .project-status {
    padding: 0.25rem 0.75rem;
    background: #10B981;
    color: white;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .project-lead {
    font-size: 0.875rem;
    color: #666;
  }

  .project-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1rem;
  }

  .progress-bar {
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .progress-fill {
    height: 100%;
    background: #4F46E5;
    border-radius: 4px;
  }

  .progress-text {
    font-size: 0.875rem;
    color: #666;
    text-align: right;
  }

  /* 页脚 */
  .footer {
    padding: 2rem 0;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1a1a1a;
  }

  .footer-tagline {
    color: #666;
    font-size: 0.875rem;
  }

  .copyright {
    color: #666;
    font-size: 0.875rem;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-stats {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .nav-menu {
      display: none;
    }
    
    .footer-content {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
    }
  }
</style>