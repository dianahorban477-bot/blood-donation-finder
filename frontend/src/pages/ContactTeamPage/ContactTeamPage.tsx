import styles from './ContactTeamPage.module.scss'

const teamMembers = [
  {
    name: 'Oksana Palahecha',
    role: 'Frontend Developer',
    contribution:
      'Developed the frontend interface, authentication flows, user profiles, route protection and API integration.',
    tools: [
      'UI/UX Design & Frontend Development (React, TypeScript, SCSS)',
  'API Integration & Authentication Flows (REST, JWT, Session Management)',
  'Role-Based Access Control & Protected Routes',
  'Form Validation, Error Handling & Responsive UI',
  'Frontend–Backend Coordination & API Contract Alignment',
    ],
    linkedin: 'https://www.linkedin.com/in/oksana-palahecha/',
  },
  {
    name: 'Oleksandra Kupriichuk',
    role: 'Backend Developer',
    contribution:
      'Developed and maintained the backend API, authentication, database models and business logic.',
    tools: ['Backend Architecture & API Design (FastAPI, REST contracts, Frontend/QA coordination)',
  'Authentication & Authorization (JWT access/refresh tokens, RBAC, hospital verification)',
  'PostgreSQL Schema Design & Migrations (SQLAlchemy, Alembic)',
  'Docker Containerization & Local Development (Docker Compose)',
  'GDPR-Aware Data Handling & Structured Error Handling',],
    linkedin: 'https://www.linkedin.com/in/oleksandra-kupriichuk?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    name: 'Mateusz Janczura',
    role: 'QA Engineer',
    contribution:
      'Tested user flows, validated requirements, reported issues and verified fixes.',
    tools: ['Manual Testing', 'API Testing', 'Jira', 'Postman'],
    linkedin: 'https://www.linkedin.com/in/mateusz-janczura/',
  },
  {
    name: 'Diana Horban',
    role: 'DevOps / Infrastructure Lead',
    contribution:
      'Configured deployment, environments and infrastructure required to run the application.',
    tools: [
      'Database Management & Administration (Supabase)',
      'Cloud Infrastructure & Deployment (Vercel, Render)',
      'Infrastructure Setup & Environment Configuration (SMTP, Auth, Domain Mapping)',
      'Technical Troubleshooting & Cross-Functional Coordination',
    ],
    linkedin: 'https://www.linkedin.com/in/diana-horban-b7b1763aa/',
  },
  {
    name: 'Sofia Serediuk',
    role: 'Marketing Specialist',
    contribution:
      'Worked on project positioning, audience research and communication strategy.',
    tools: ['Market Research', 'Content Strategy', 'Analytics'],
    linkedin: 'https://www.linkedin.com/in/sofiia-s-3893761b2/',
  },
  {
    name: 'Anton Sulyha',
    role: 'Project Manager',
    contribution:
      'Coordinated the team, managed sprint planning, tasks, priorities and communication.',
    tools: [
      'Agile & Scrum',
      'Project Planning',
      'Jira & Confluence',
      'Stakeholder Management',
    ],
    linkedin: 'https://www.linkedin.com/in/anton-sulyha-212b28423/',
  },
]

export const ContactTeamPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.intro} aria-labelledby='contact-team-title'>
        <div className={styles.intro__inner}>
          <p className={styles.intro__eyebrow}>The people behind the project</p>
          <h1 className={styles.intro__title} id='contact-team-title'>
            Contact &amp; Team
          </h1>
          <p className={styles.intro__description}>
            Blood Donation Finder is a collaborative learning project created by a cross-functional team working together on product development, testing, infrastructure, and project coordination.
          </p>
        </div>
      </section>

      <section className={styles.team} aria-labelledby='team-title'>
        <div className={styles.team__inner}>
          <div className={styles.team__grid}>
            {teamMembers.map((member, index) => (
              <article className={styles.card} key={`${member.role}-${index}`}>
                <div className={styles.card__top}>
                  <h3 className={styles.card__name}>{member.name}</h3>
                </div>
                <p className={styles.card__role}>{member.role}</p>
                <p className={styles.card__contribution}>{member.contribution}</p>
                <ul className={styles.card__tools} aria-label={`${member.name}'s tools`}>
                  {member.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                <a
                  className={styles.card__link}
                  href={member.linkedin}
                  rel='noreferrer'
                  target='_blank'
                >
                  LinkedIn
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
