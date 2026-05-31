import { createEmailComposeUrl } from '../utils/contactLinks';

const emailAddress = 'ayushsinghal0703@gmail.com';
const emailComposeUrl = createEmailComposeUrl(emailAddress);

export const portfolioData = {
  site: {
    title: 'Ayush Singhal | AI-ML And Full-Stack Developer',
    siteName: 'Ayush Singhal Portfolio',
    description:
      'Portfolio of Ayush Singhal, an AI-ML and full-stack developer building intelligent web platforms, machine learning models, and data-driven applications.',
    keywords: [
      'Ayush Singhal',
      'AI ML developer',
      'Machine learning developer',
      'Python developer',
      'Flask developer',
      'Full stack developer',
      'TensorFlow',
      'Scikit-learn',
      'React portfolio',
      'Data science',
      'JIIT Noida',
    ],
    author: 'Ayush Singhal',
    defaultImage: '/Profile.webp',
  },
  profile: {
    name: 'Ayush Singhal',
    initials: 'AS',
    role: 'AI-ML & Full-Stack Developer',
    secondaryRole: 'Integrated CSE Student Building AI-Driven Full-Stack Applications',
    location: 'Delhi, India / JIIT Noida',
    email: emailAddress,
    phone: '+91 9310109974',
    githubUsername: 'Ayush1974-RGB',
    githubUrl: 'https://github.com/Ayush1974-RGB',
    linkedinUrl: 'https://www.linkedin.com/in/aayush-singhal-90011337a',
    instagramUrl: '',
    resumeUrl: '/Final_Resume.pdf',
    profileImage: '/Profile.webp',
    profileImageAvif: '/Profile.avif',
    profileImageFallback: '/Profile.jpg',
  },
  navigation: [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'Approach' },
    { id: 'skills', label: 'Skills' },
    { id: 'security', label: 'AI Focus' },
    { id: 'learning', label: 'Growth' },
    { id: 'projects', label: 'Projects' },
    { id: 'clubs', label: 'Volunteering' },
    { id: 'experience', label: 'Journey' },
  ],
  hero: {
    eyebrow: 'Full-Stack Developer / AI-ML / Data Science',
    title: 'Ayush Singhal',
    subtitle: 'AI-ML and full-stack developer building intelligent systems, prediction platforms, and practical data-driven applications.',
    description:
      'Integrated Computer Science student at JIIT Noida with hands-on experience in TensorFlow, Scikit-learn, Flask, React, full-stack web development, and applied machine learning projects.',
    whyMe:
      'I build AI-ML ideas as complete full-stack products, connecting model logic, REST APIs, databases, React interfaces, and deployment-ready user flows.',
    badges: [
      'Python',
      'TensorFlow',
      'Scikit-learn',
      'Flask',
      'FastAPI',
      'React',
      'JavaScript',
      'REST APIs',
      'MySQL',
      'Full Stack',
    ],
    callouts: [
      {
        label: 'What I build',
        value: 'AI-powered full-stack platforms that turn models into usable web experiences with clear prediction flows and fast feedback.',
      },
      {
        label: 'Current focus',
        value: 'Strengthening machine learning, deep learning, NLP, full-stack development, data preprocessing, and real-world model deployment skills.',
      },
      {
        label: 'Best fit',
        value: 'AI-ML, full-stack, data science, Python, and software development opportunities where applied learning and execution matter.',
      },
    ],
  },
  keyHighlights: {
    label: 'Key Highlights',
    title: 'A quick snapshot of the AI, full-stack, data, and product work behind this portfolio.',
    description:
      'A recruiter-friendly view of Ayush\'s machine learning projects, full-stack delivery, technical volunteering, and growing AI development direction.',
    items: [
      {
        value: '05+',
        label: 'Featured AI Projects',
        description: 'Applied builds across skin analysis, model inference, prediction workflows, and AI-backed full-stack web platforms.',
      },
      {
        value: '100+',
        label: 'Platform Users',
        description: 'PredictX AI Portal was built to help users generate predictions without needing machine learning expertise.',
      },
      {
        value: '50+',
        label: 'Concurrent Users',
        description: 'AI Derma integrates Flask and React for instant prediction feedback under concurrent usage.',
      },
      {
        value: '200+',
        label: 'Workshop Participants',
        description: 'Supported technical events, workshops, troubleshooting, and student learning through volunteer roles.',
      },
    ],
  },
  about: {
    label: 'How I Work',
    title: 'Full-stack development shaped by AI-ML thinking, clean APIs, and usable product experiences.',
    introduction:
      'My approach combines AI-ML model work with full-stack engineering, so ideas can move from data and backend logic into usable, responsive web applications.',
    mantra:
      'I care about systems that are intelligent under the hood, reliable in the backend, clear on the frontend, and simple for real users to interact with.',
    paragraphs: [
      'I am an Integrated Computer Science student with a strong interest in Artificial Intelligence, Machine Learning, and full-stack product development.',
      'I like building across the complete flow: preparing data, training or integrating models, creating APIs, connecting databases, and designing frontend interfaces that make the result easy to use.',
    ],
    watermark: 'AI + FULL STACK',
    facts: [
      { label: 'Based in', value: 'Delhi, India' },
      { label: 'Core lens', value: 'AI-ML and full-stack development with product-ready implementation' },
    ],
    strengths: [
      {
        title: 'AI-ML foundations',
        description: 'I build model-backed projects using TensorFlow, Scikit-learn, preprocessing, feature engineering, and prediction pipelines.',
      },
      {
        title: 'Backend and APIs',
        description: 'I use Flask, FastAPI, REST patterns, and database-backed workflows to connect application logic with model inference and result handling.',
      },
      {
        title: 'Frontend delivery',
        description: 'I use React, HTML, CSS, and JavaScript to turn AI and backend workflows into responsive interfaces people can actually use.',
      },
    ],
  },
  securityFocus: {
    label: 'AI Focus',
    title: 'My technical direction sits at the intersection of models, APIs, data, and user-facing AI tools.',
    introduction:
      'I am building depth across the practical layers needed to turn machine learning concepts into working applications.',
    items: [
      {
        eyebrow: '01 / Models',
        title: 'Machine learning and deep learning',
        description:
          'I work with Scikit-learn and TensorFlow to build prediction systems, classification workflows, and CNN-based image analysis models.',
      },
      {
        eyebrow: '02 / Data',
        title: 'Preprocessing and feature engineering',
        description:
          'I focus on resizing, normalization, noise reduction, feature engineering, and data preparation because model quality starts before training.',
      },
      {
        eyebrow: '03 / APIs',
        title: 'Model inference services',
        description:
          'I use Flask and FastAPI to expose model predictions through modular APIs with clear request handling and low-latency feedback.',
      },
      {
        eyebrow: '04 / Product',
        title: 'Accessible full-stack AI experiences',
        description:
          'I care about making AI tools usable through clean interfaces, connected backends, instant prediction feedback, and features such as voice interaction.',
      },
    ],
  },
  skills: {
    label: 'What I Do',
    title: 'AI-ML and full-stack development backed by Python, data science tooling, and web implementation.',
    introduction:
      'My strengths span machine learning, backend model APIs, frontend development, databases, and the tools needed to experiment, analyze, and ship full-stack AI projects.',
    categories: [
      {
        index: '01',
        eyebrow: 'Languages',
        title: 'Programming and development foundations',
        description:
          'Core languages and workflow tools I use while building projects, notebooks, and application logic.',
        items: ['Python, C, C++, and Java', 'Git and GitHub', 'Jupyter Notebook and Linux'],
      },
      {
        index: '02',
        eyebrow: 'AI & Data',
        title: 'Machine learning and data science tools',
        description:
          'Libraries and frameworks I use for preprocessing, visualization, modeling, and AI experimentation.',
        highlighted: true,
        items: ['NumPy, Pandas, Matplotlib, Seaborn', 'Scikit-learn and SciPy', 'TensorFlow, Machine Learning, and Artificial Intelligence'],
      },
      {
        index: '03',
        eyebrow: 'Web Stack',
        title: 'Full-stack web development',
        description:
          'Tools I use to connect model logic with usable web products, backend services, and persistent data workflows.',
        items: ['HTML, CSS, JavaScript, and React', 'Flask, FastAPI, and REST APIs', 'MySQL and database-backed workflows'],
      },
    ],
  },
  currentlyLearning: {
    label: 'Currently Learning',
    title: 'Going deeper into AI systems, model quality, and production-minded machine learning workflows.',
    introduction:
      'My learning path is focused on strengthening the model, data, and application layers behind useful AI products.',
    highlights: [
      {
        eyebrow: 'ML',
        title: 'Machine learning model development',
        description:
          'Improving my understanding of model selection, evaluation, feature engineering, and real-world prediction workflows.',
      },
      {
        eyebrow: 'DL',
        title: 'Deep learning and CNNs',
        description:
          'Building stronger foundations in image-based models, TensorFlow workflows, and performance-aware inference.',
      },
      {
        eyebrow: 'NLP',
        title: 'Natural language processing',
        description:
          'Learning NLP concepts through bootcamp work and hands-on projects that connect text data with practical applications.',
      },
      {
        eyebrow: 'APIs',
        title: 'Deployable AI backends',
        description:
          'Sharpening how I structure Flask and FastAPI services for preprocessing, inference, and clear result delivery.',
      },
    ],
    note:
      'This path is shaping the kind of developer I want to become: someone who can build intelligent systems from model logic to backend services and user experience.',
  },
  clubs: {
    label: 'Volunteer Experience',
    title: 'Technical and management communities where I support events, workshops, and execution.',
    introduction:
      'These roles show how I contribute beyond projects: helping organize technical activity, managing event flow, supporting students, troubleshooting, and creating learning content.',
    overviewTitle: 'Volunteer roles that sharpen communication, execution, management, and technical support.',
    overviewDescription:
      'Together these experiences strengthen how I explain technical ideas, coordinate teams, support participants, manage event logistics, and handle practical delivery around AI and programming communities.',
    stats: [
      { value: '02+', label: 'Club roles', valueClassName: 'text-foreground' },
      { value: '200+', label: 'Participants supported', valueClassName: 'text-accent' },
      { value: 'Many', label: 'Events volunteered', valueClassName: 'text-foreground' },
    ],
    focusAreas: [
      'Supporting technical events and workshops with setup, troubleshooting, participant guidance, and smooth execution.',
      'Volunteering across management work such as coordination, registrations, on-ground flow, communication, and event operations.',
      'Contributing to both AIML Hub and AI Tronics Hub through AI/programming activities, student support, and digital learning content.',
    ],
    roles: [
       {
        eyebrow: 'Leadership + operations',
        title: 'Chief of Execution',
        org: 'AI Tronics Hub',
        period: '2026- Present',
        location: 'Student technical and management community',
        summary:
          'Leading execution for AI Tronics Hub by coordinating planning, operations, event delivery, volunteer responsibilities, and technical support across club activities.',
        points: [
          'Coordinate event execution from planning to on-ground delivery across technical and management activities',
          'Assign responsibilities, track readiness, and help volunteers stay aligned during events',
          'Support technical workshops, programming sessions, and participant guidance when needed',
          'Contributed to online C++ workshops, practice-based learning, and digital technical content',
          'Worked on communication, logistics, troubleshooting, and post-event follow-up for smoother club operations',
        ],
        tags: ['Chief of Execution', 'Leadership', 'Operations', 'Technical Events', 'Management'],
      },
      {
        eyebrow: 'AI + event execution',
        title: 'AIML Hub Volunteer',
        org: 'AIML Hub',
        period: '2025',
        location: 'Technical and management events',
        summary:
          'Supported AIML Hub across technical sessions and event management work, helping with planning, setup, participant support, and smooth on-ground execution.',
        points: [
          'Volunteered in multiple AI-ML and programming events, workshops, and student activities',
          'Helped manage registrations, coordination, communication, setup, and event flow',
          'Guided participants during technical activities and supported troubleshooting during sessions',
          'Contributed to both technical delivery and management responsibilities so events could run smoothly',
        ],
        tags: ['AI-ML', 'Event Management', 'Workshops', 'Coordination'],
      },
     
    ],
  },
  projects: {
    label: 'Projects',
    title: 'Featured Projects',
    subtitle:
      'A focused selection of AI, machine learning, and full-stack projects where model development, APIs, data preprocessing, and web delivery come together.',
    items: [
      {
        index: '01',
        name: 'AI Derma AI Skin Analyzer',
        summary:
          'AI-powered skin analysis platform that detects common dermatological conditions from webcam and uploaded images.',
        description:
          'Developed an AI-powered skin analysis platform using TensorFlow CNN models, OpenCV, Flask, and React. The system supports webcam and uploaded images, real-time preprocessing, instant API-backed prediction feedback, and voice interaction for accessibility.',
        detail:
          'This project connects image preprocessing, deep learning inference, backend APIs, and a usable frontend into one applied AI workflow.',
        outcome:
          'Improved model accuracy by 12%, reduced inference time by 40%, supported 50+ concurrent users, and achieved low-latency predictions under one second.',
        thumbnail: {
          eyebrow: 'AI Healthcare',
          title: 'Skin Condition Analysis',
          meta: 'TensorFlow CNN with Flask and React',
          tags: ['TensorFlow', 'OpenCV', 'Flask', 'React'],
        },
        caseStudy: {
          problem:
            'Skin-image analysis is difficult for normal users because visual symptoms are hard to compare, manual checking is slow, and most ML demos stay inside notebooks instead of becoming usable tools.',
          solution:
            'Built a full-stack AI workflow where users can upload an image or use the webcam, the backend preprocesses the input, the TensorFlow CNN model performs prediction, and the React interface returns clear feedback quickly.',
          implementation:
            'The project combines OpenCV preprocessing, image resizing and normalization, Flask API endpoints, model inference handling, React upload/webcam flows, and voice interaction through STT/TTS so the experience is more accessible and interactive.',
          impact:
            'Improved model accuracy by 12%, reduced inference time by 40%, supported 50+ concurrent users, and created a more practical AI-healthcare demo with low-latency prediction feedback under one second.',
        },
        role: 'AI-ML & Full-Stack Developer',
        stack: [
          'TensorFlow',
          'CNN',
          'OpenCV',
          'Python',
          'Flask',
          'REST APIs',
          'React',
          'JavaScript',
          'HTML',
          'CSS',
          'Image Preprocessing',
          'STT/TTS',
        ],
        githubUrl: 'https://github.com/Ayush1974-RGB/Aiderma',
        liveUrl: '',
        featured: true,
        availability: 'Project demo / GitHub',
      },
      {
        index: '02',
        name: 'PredictX AI Portal',
        summary:
          'AI-powered web platform that helps users generate predictions without needing machine learning expertise.',
        description:
          'Built an AI-powered prediction portal using Scikit-learn, Python, and Flask. The platform includes multiple ML pipelines such as gold price prediction, credit card fraud detection, spam classification, and rainfall prediction, with modular APIs for inference, preprocessing, and result visualization.',
        outcome:
          'Enabled 100+ users to run predictions, improved model accuracy by up to 15% through feature engineering, and delivered API latency under one second.',
        thumbnail: {
          eyebrow: 'Prediction Platform',
          title: 'Multi-Model AI Portal',
          meta: 'Flask APIs for real-world prediction workflows',
          tags: ['Scikit-learn', 'Python', 'Flask', 'Pandas'],
        },
        caseStudy: {
          problem:
            'Many useful ML models are difficult for non-technical users to try because prediction logic, preprocessing, and evaluation usually remain scattered across notebooks, scripts, or separate demos.',
          solution:
            'Built a multi-model prediction portal with separate workflows for gold price prediction, credit card fraud detection, spam classification, and rainfall prediction, all exposed through a cleaner web interface.',
          implementation:
            'Created modular Flask API routes for preprocessing, feature handling, model loading, prediction responses, and result visualization. Each model pipeline was structured separately so new prediction use cases can be added without rewriting the whole system.',
          impact:
            'Made prediction workflows accessible to 100+ users, improved model accuracy by up to 15% through feature engineering, and kept API responses under one second for a smoother user experience.',
        },
        role: 'Machine Learning & Full-Stack Developer',
        stack: [
          'Scikit-learn',
          'Python',
          'Flask',
          'REST APIs',
          'Pandas',
          'NumPy',
          'Feature Engineering',
          'Model Inference',
          'Classification',
          'Regression',
          'HTML',
          'CSS',
          'JavaScript',
        ],
        githubUrl: 'https://github.com/Ayush1974-RGB/PredictX-AI-Portal',
        liveUrl: 'https://predict-x-ai-portal.vercel.app/login',
        availability: 'Live demo / GitHub',
      },
    ],
  },
  experience: {
    label: 'Why It Matters',
    title: 'The broader signals behind my AI-ML and full-stack direction are visible across leadership, projects, education, and technical learning.',
    introduction:
      'This timeline connects my club leadership, applied projects, student community work, education, and certifications into one clearer story of growth.',
    sidebarTitle: 'Impact comes from combining study, projects, and practical delivery.',
    sidebarDescription:
      'The milestones on the right focus on execution leadership, project delivery, academic foundations, and focused learning in full-stack AI development.',
    signalStats: [
      { value: '02', label: 'AI builds', valueClassName: 'text-foreground' },
      { value: '04', label: 'Core signals', valueClassName: 'text-accent' },
    ],
    highlights: [
      { value: '02', label: 'AI projects' },
      { value: '02+', label: 'Club roles' },
      { value: '01', label: 'Data science certification' },
    ],
    timeline: [
      {
        type: 'Leadership',
        title: 'Chief of Execution',
        org: 'AI Tronics Hub',
        period: '2026 - Present',
        location: 'Student technical and management community',
        summary:
          'Leading execution responsibilities for AI Tronics Hub by helping plan, coordinate, and deliver club activities across technical events, management tasks, and participant-facing operations.',
        points: [
          'Coordinate event execution from planning, task assignment, setup, live flow, and post-event follow-up',
          'Work with volunteers to manage logistics, communication, participant support, and readiness before sessions',
          'Support technical workshops, programming activities, troubleshooting, and learning-focused event delivery',
          'Bridge technical and management responsibilities so AI Tronics activities run smoothly and feel organized',
        ],
        tags: ['Chief of Execution', 'Leadership', 'AI Tronics Hub', 'Event Operations', 'Management'],
      },
      {
        type: 'Project',
        title: 'Applied AI and full-stack project development',
        org: 'AI Derma + PredictX AI Portal',
        period: 'March 2025 - present',
        location: 'Independent projects',
        summary:
          'Built AI-backed full-stack applications that connect trained models, preprocessing, Flask APIs, React interfaces, and fast prediction feedback.',
        points: [
          'Developed TensorFlow CNN and Scikit-learn workflows for real-world prediction use cases',
          'Integrated model inference with Flask APIs, frontend interfaces, and usable full-stack flows',
          'Improved accuracy, latency, and usability through preprocessing and modular backend design',
        ],
        tags: ['TensorFlow', 'Scikit-learn', 'Flask', 'React', 'Full Stack'],
      },
      {
        type: 'Experience',
        title: 'Technical and management volunteering',
        org: 'AIML Hub + AI Tronics Hub',
        period: '2025',
        location: 'Student communities',
        summary:
          'Supported technical workshops, management work, participant guidance, troubleshooting, C++ learning sessions, and educational content across club activities.',
        points: [
          'Volunteered in multiple technical and management events across AIML Hub and AI Tronics Hub',
          'Helped with coordination, registrations, setup, communication, participant support, and on-ground flow',
          'Supported online C++ workshops, technical troubleshooting, and digital learning content',
        ],
        tags: ['Workshops', 'Management', 'C++', 'Technical Support'],
      },
      {
        type: 'Education',
        title: 'Integrated CSE (B.Tech + M.Tech)',
        org: 'Jaypee Institute of Information Technology (JIIT), Noida',
        period: '2024 - 2029',
        location: 'Noida, India',
        summary:
          'Building computer science foundations while developing practical skills in AI, machine learning, Python, full-stack development, data science, and web-backed model deployment.',
        points: [
          'Studying integrated Computer Science Engineering',
          'Completed Senior Secondary PCM from SBV Senior Secondary School, Delhi in 2024',
          'Learning through coursework, projects, communities, and independent AI practice',
        ],
        tags: ['CSE', 'AI-ML', 'Python', 'Full Stack', 'Data Science'],
      },
    ],
    credentials: [
      'Complete Data Science, Machine Learning, DL, NLP Bootcamp',
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Hands-on projects and mathematical foundations',
    ],
    associations: ['Chief of Execution', 'AIML Hub', 'AI Tronics Hub', 'JIIT Noida', 'AI-ML Developer', 'Full-Stack Developer'],
  },
  contact: {
    label: 'How To Reach Me',
    title: 'Available for AI-ML, full-stack, data science, Python, and software development opportunities.',
    ctaText: "Let's build something intelligent and useful.",
    cta: "Let's build something intelligent and useful.",
    description:
      'I am looking for opportunities where I can contribute machine learning implementation, full-stack development, Python development, API integration, and AI product thinking.',
    note: 'Email is the fastest way to reach me. You can also review my work on GitHub, connect on LinkedIn, or open my resume directly below.',
    primaryActionLabel: 'Email Me',
    secondaryActionLabel: 'View Resume',
    highlight:
      'Open to AI-ML projects, full-stack internships, data science roles, and technically ambitious collaborations involving intelligent systems.',
    availabilityItems: [
      {
        label: 'Based In',
        value: 'Delhi, India / JIIT Noida',
      },
      {
        label: 'Looking For',
        value: 'AI-ML, full-stack, data science, Python, and software development opportunities',
      },
      {
        label: 'Response Time',
        value: 'Usually within 24 hours for email and LinkedIn outreach',
      },
    ],
    links: [
      {
        label: 'Email',
        value: emailAddress,
        href: emailComposeUrl,
        description: 'Best for direct outreach, interviews, internships, and project conversations.',
      },
      {
        label: 'GitHub',
        value: 'github.com/Ayush1974-RGB',
        href: 'https://github.com/Ayush1974-RGB',
        description: 'Review projects, source code, and the technical direction behind my AI-ML and full-stack work.',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/aayush-singhal-90011337a',
        href: 'https://www.linkedin.com/in/aayush-singhal-90011337a',
        description: 'Connect professionally and view my profile in a recruiter-friendly format.',
      },
      {
        label: 'Resume',
        value: 'Preview resume',
        href: '/Final_Resume.pdf',
        description: 'Open my latest resume directly for a quick view of education, projects, skills, and experience.',
      },
    ],
  },
  footer: {
    note: 'Built to present AI-ML development, full-stack development, data science learning, project execution, and a clearer technical identity in one place.',
    socials: [
      { name: 'Email', url: emailComposeUrl },
      { name: 'GitHub', url: 'https://github.com/Ayush1974-RGB' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aayush-singhal-90011337a' },
      { name: 'Resume', url: '/Final_Resume.pdf' },
    ],
  },
};
