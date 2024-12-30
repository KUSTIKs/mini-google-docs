type TemplateType =
  | 'blankDocument'
  | 'businessLetter'
  | 'coverLetter'
  | 'letter'
  | 'projectProposal'
  | 'resume'
  | 'softwareProposal';

type Template = {
  id: TemplateType;
  label: string;
  imageSrc: string;
};

const templates: Template[] = [
  {
    id: 'blankDocument',
    label: 'Blank Document',
    imageSrc: '/templates/blank-document.svg',
  },
  {
    id: 'projectProposal',
    label: 'Project Proposal',
    imageSrc: '/templates/project-proposal.svg',
  },
  {
    id: 'softwareProposal',
    label: 'Software Proposal',
    imageSrc: '/templates/software-proposal.svg',
  },
  {
    id: 'businessLetter',
    label: 'Business Letter',
    imageSrc: '/templates/business-letter.svg',
  },
  {
    id: 'coverLetter',
    label: 'Cover Letter',
    imageSrc: '/templates/cover-letter.svg',
  },
  {
    id: 'letter',
    label: 'Letter',
    imageSrc: '/templates/letter.svg',
  },
  {
    id: 'resume',
    label: 'Resume',
    imageSrc: '/templates/resume.svg',
  },
];

export { templates };
