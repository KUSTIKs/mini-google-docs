type Template = {
  id: string;
  label: string;
  imageSrc: string;
  initialContent: string;
};

const templates = [
  {
    id: 'blankDocument',
    label: 'Blank Document',
    imageSrc: '/templates/blank-document.svg',
    initialContent: ``,
  },
  {
    id: 'projectProposal',
    label: 'Project Proposal',
    imageSrc: '/templates/project-proposal.svg',
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Introduction</h2>
      <p>Provide a brief overview of the project, its objectives, and the problem it aims to solve.</p>
      <hr>
      <h2>Scope</h2>
      <p>Describe the scope of the project, including deliverables and key milestones.</p>
      <hr>
      <h2>Budget</h2>
      <p>Outline the estimated budget required to complete the project.</p>
      <hr>
      <h2>Conclusion</h2>
      <p>Summarize the proposal and invite feedback or approval.</p>
    `,
  },
  {
    id: 'softwareProposal',
    label: 'Software Proposal',
    imageSrc: '/templates/software-proposal.svg',
    initialContent: `
      <h1>Software Proposal</h1>
      <h2>Executive Summary</h2>
      <p>Provide a summary of the proposed software solution and its key benefits.</p>
      <hr>
      <h2>Features</h2>
      <ul>
        <li>Feature 1: Brief description</li>
        <li>Feature 2: Brief description</li>
        <li>Feature 3: Brief description</li>
      </ul>
      <hr>
      <h2>Implementation Plan</h2>
      <p>Outline the timeline and steps for implementing the software.</p>
      <hr>
      <h2>Cost Estimate</h2>
      <p>Provide an estimated cost for the software development and deployment.</p>
    `,
  },
  {
    id: 'businessLetter',
    label: 'Business Letter',
    imageSrc: '/templates/business-letter.svg',
    initialContent: `
      <p>Your Name</p>
      <p>Your Address</p>
      <p>Date</p>
      <p>Recipient Name</p>
      <p>Recipient Address</p>
      <hr>
      <p>Dear [Recipient Name],</p>
      <p>Write the main body of your letter here. Be concise and professional.</p>
      <hr>
      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: 'coverLetter',
    label: 'Cover Letter',
    imageSrc: '/templates/cover-letter.svg',
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[Date]</p>
      <p>[Hiring Manager's Name]</p>
      <p>[Company Name]</p>
      <hr>
      <p>Dear [Hiring Manager's Name],</p>
      <p>I am excited to apply for the [Position Name] role at [Company Name]. Briefly explain your interest and qualifications.</p>
      <p>Highlight your key achievements and experiences relevant to the position.</p>
      <p>Thank you for considering my application. I look forward to the opportunity to discuss how my skills align with [Company Name]'s goals.</p>
      <hr>
      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: 'letter',
    label: 'Letter',
    imageSrc: '/templates/letter.svg',
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[Date]</p>
      <hr>
      <p>Dear [Recipient Name],</p>
      <p>Write the body of your letter here. Use a friendly or formal tone depending on the purpose.</p>
      <hr>
      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: 'resume',
    label: 'Resume',
    imageSrc: '/templates/resume.svg',
    initialContent: `
      <h1>[Your Name]</h1>
      <p>[Your Contact Information]</p>
      <hr>
      <h2>Objective</h2>
      <p>Write a brief statement about your career goals and objectives.</p>
      <hr>
      <h2>Experience</h2>
      <ul>
        <li><strong>[Job Title]</strong> - [Company Name] (Dates)
          <p>Key achievements and responsibilities</p>
        </li>
        <li><strong>[Job Title]</strong> - [Company Name] (Dates)
          <p>Key achievements and responsibilities</p>
        </li>
      </ul>
      <hr>
      <h2>Education</h2>
      <p>[Degree] - [Institution Name] (Year)</p>
      <hr>
      <h2>Skills</h2>
      <ul>
        <li>Skill 1</li>
        <li>Skill 2</li>
        <li>Skill 3</li>
      </ul>
    `,
  },
];

export type { Template };
export { templates };
