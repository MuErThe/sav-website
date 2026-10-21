/** Leadership, project management and the organisational structure. */

export interface Person {
  readonly slug: string;
  readonly name: string;
  readonly role: string;
  readonly experience: string;
  readonly bio: string;
}

export const teamIntro =
  'Led by qualified and experienced leadership, our company boasts a team of over 100 staff, including project managers, engineers, and purchasing managers, ensuring seamless project management. Additionally, we engage expert consultants for specialised advice as required.';

export const leadership: readonly Person[] = [
  {
    slug: 'ravindar-singh-gill',
    name: 'Ravindar Singh Gill',
    role: 'Chairman & Director',
    experience: '40+ years',
    bio: 'R. S. Gill is the Chairman and Director of Solid Assured Valued Construction Pvt. Ltd., bringing over 40 years of experience in the construction industry. A Civil Engineering graduate from SGITS, Indore, he is widely recognised for his expertise in structural engineering, construction methodologies, and innovative shuttering and scaffolding systems. Known for his exceptional ability to devise practical and ingenious solutions to complex site challenges, he has successfully led the execution of numerous industrial and infrastructure projects, establishing a legacy of technical excellence, quality, and client trust.',
  },
  {
    slug: 'sarvesh-singh-gill',
    name: 'Sarvesh Singh Gill',
    role: 'Director',
    experience: '10+ years',
    bio: "Sarvesh S. Gill is the Director of SAV Construction Pvt. Ltd. with expertise in industrial construction, project management, estimation, planning, and execution. He holds a Master's degree in Construction Management from the University of Florida, USA, and a Bachelor's degree in Civil Engineering from DAVV, Indore. An OSHA-certified safety professional and LEED Associate, he combines international exposure with extensive experience in the Indian construction industry. During his six-year tenure at United Project Construction Ltd. (UPCL), he successfully managed industrial and institutional projects, with a strong focus on quality, safety, timely delivery, and client satisfaction.",
  },
  {
    slug: 'rajesh-gupta',
    name: 'Rajesh Gupta',
    role: 'Senior Project Manager',
    experience: '30+ years',
    bio: 'A key member of our technical wing, Rajesh is an accomplished engineer who graduated from the prestigious SGITS, Indore in 1988. He has amassed a wealth of experience by leading numerous industrial and residential projects across India and internationally, earning a reputation for his disciplined approach and timely completions. Known for his dedication to quality, Rajesh consistently upholds the highest standards in engineering. His guiding principle of delivering superior engineering work has made him a respected figure in the industry.',
  },
];

export interface ProjectManager {
  readonly slug: string;
  readonly name: string;
  readonly role: string;
  readonly experience: string;
  readonly skills: readonly string[];
}

export const projectManagers: readonly ProjectManager[] = [
  {
    slug: 'anil-barodiya',
    name: 'Anil Barodiya',
    role: 'Senior Project Manager',
    experience: '25+ years',
    skills: [
      'Pharma projects',
      'Project planning',
      'Project execution',
      'Site management',
      'Team leadership',
      'Civil engineering',
    ],
  },
  {
    slug: 'anil-patel',
    name: 'Anil Patel',
    role: 'Senior Project Manager',
    experience: '20+ years',
    skills: [
      'Pharma projects',
      'Quality execution',
      'Client coordination',
      'Construction planning',
      'Team leadership',
      'Timely delivery',
    ],
  },
  {
    slug: 'manalal-salve',
    name: 'Manalal Salve',
    role: 'Senior Project Manager',
    experience: '30+ years',
    skills: [
      'Industrial projects',
      'Resource management',
      'Client coordination',
      'Timely delivery',
      'Civil engineering',
    ],
  },
];

/**
 * Organisational structure, rendered as a nested list so it stays readable to
 * screen readers and on narrow viewports (the deck version is a wide diagram).
 */
export interface OrgNode {
  readonly title: string;
  readonly children?: readonly OrgNode[];
}

export const organogram: OrgNode = {
  title: 'Director',
  children: [
    {
      title: 'General Manager',
      children: [
        {
          title: 'Finance & Accounting',
          children: [{ title: 'Head Accountant', children: [{ title: '4 Accountants' }] }],
        },
        { title: 'HR' },
        {
          title: 'Project Manager',
          children: [
            {
              title: 'Sites',
              children: [
                {
                  title: 'Construction Managers',
                  children: [
                    { title: 'Sub-contractors' },
                    {
                      title: 'Site Engineers',
                      children: [{ title: 'Mechanics' }, { title: 'Electricians' }],
                    },
                  ],
                },
              ],
            },
            { title: 'Quality & Safety', children: [{ title: 'Assistants' }] },
            { title: 'Billing Engineers', children: [{ title: 'Assistants' }] },
          ],
        },
        {
          title: 'Centralised Warehouse',
          children: [
            { title: 'Purchase Manager' },
            {
              title: 'Store Keeper',
              children: [{ title: 'Foreman' }, { title: 'Unskilled Labour' }],
            },
          ],
        },
      ],
    },
  ],
};
