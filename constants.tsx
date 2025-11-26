import { Project, Experience, Education, SkillCategory, Certification, NavItem, Award, Publication } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

export const HERO_STRINGS = [
  "Building AI Solutions That Work.",
  "Computer Vision & LLM Developer.",
  "Turning Data Into Action.",
  "AI Engineer | Problem Solver."
];

export const SKILLS: SkillCategory[] = [
  {
    title: "AI & Data Science",
    icon: "brain",
    skills: [
      { name: "Python", iconName: "file-code" },
      { name: "Scikit-learn", iconName: "activity" },
      { name: "PyTorch/TensorFlow", iconName: "cpu" },
      { name: "Hugging Face", iconName: "smile" },
      { name: "LLM/GenAI", iconName: "sparkles" }
    ]
  },
  {
    title: "Engineering & MLOps",
    icon: "terminal",
    skills: [
      { name: "C/C++", iconName: "code-2" },
      { name: "HTML/CSS/JS", iconName: "layout" },
      { name: "SQL Server", iconName: "database" },
      { name: "PostgreSQL", iconName: "database" },
      { name: "FastAPI/Flask", iconName: "server" },
      { name: "Airflow/MLflow", iconName: "workflow" },
      { name: "Hadoop", iconName: "network" },
      { name: "Github/Git", iconName: "git-branch" }
    ]
  },
  {
    title: "Professional Skills",
    icon: "users",
    skills: [
      { name: "Problem Solving", iconName: "puzzle" },
      { name: "Critical Thinking", iconName: "search" },
      { name: "Technical Writing", iconName: "file-text" },
      { name: "Self-Study", iconName: "book-open" },
      { name: "Creative", iconName: "lightbulb" },
      { name: "Communication", iconName: "message-square" },
      { name: "Teamwork", iconName: "users" },
      { name: "Time Management", iconName: "clock" },
      { name: "Leadership", iconName: "flag" },
      { name: "Presentation", iconName: "monitor-play" },
      { name: "Project Management", iconName: "briefcase" }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "AI Engineer Intern",
    company: "DLK Technologies Company Limited",
    period: "Feb 2025 - July 2025",
    description: "Implemented end-to-end deep learning pipelines including data annotation, augmentation, model training, and deployment. Contributed to computer vision projects including smoke/fire detection systems and waste classification models. Gained hands-on experience with MLOps practices."
  },
  {
    id: "exp2",
    role: "IT Intern",
    company: "Ho Chi Minh City Oncology Hospital",
    period: "June 2023 - Aug 2023",
    description: "Analyzed and optimized hospital management software systems. Provided technical support for healthcare IT systems. Explored applications of machine learning for healthcare data processing."
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu1",
    degree: "Bachelor of Computer Science - AI Specialization",
    school: "Saigon International University (SIU), Ho Chi Minh City",
    period: "2021 – 2025",
    details: "Major: Artificial Intelligence. GPA: 3.71/4.00 (Equivalent to 8.72/10). Focus on Computer Vision and NLP."
  },
  {
    id: "edu2",
    degree: "High School Diploma - Specialized in Biology",
    school: "Hung Vuong High School for the Gifted, Ho Chi Minh City",
    period: "2018 – 2021",
    details: "Specialized High School for the Gifted. Specialized biology class."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Wildlife Conservation AI System",
    description: "Multi-model AI system for identifying 92 wildlife species with AR 3D visualization and intelligent context analysis.",
    problem: "Conservation teams need fast, accurate species identification in the field and automated context understanding for better decision-making.",
    solution: "Built ensemble of specialized models: EfficientNetB3 (95.5% acc, 89.2% F1), YAMNet audio (85.2% acc, 84.1% F1), YOLOv11 detection (F1 0.73), CLIP with Gemini for query optimization (top-5 accuracy 93%+). Integrated Three.js AR 3D, Zoobot with Gemini Flash 2.5 for context analysis (94.5% Context Precision).",
    impact: "Achieved high accuracy across multiple modalities. Demonstrated ability to integrate cutting-edge models and APIs for practical conservation applications.",
    tags: ["EfficientNetB3", "YOLOv11", "YAMNet", "CLIP", "Zoobot", "Gemini", "Three.js", "AR"],
    image: "/projects/p1.png",
    links: { 
      demo: "#", 
      video: "#"
    }
  },
  {
    id: "p2",
    title: "Smoke & Fire Detection System",
    description: "Real-time surveillance system for detecting smoke and fire incidents with low-latency alerts.",
    problem: "Early detection of fire is critical for preventing disasters. Existing systems struggle with high false alarm rates.",
    solution: "Implemented YOLOv11/v12 detection models with OpenCV for real-time inference streaming via Flask. Achieved F1 score 0.75. Integrated flask-mail for instant alert notifications when smoke/fire is detected.",
    impact: "Successfully demonstrated practical computer vision deployment with real-time performance. Learned production alert systems and automated notification workflows.",
    tags: ["YOLOv11", "Flask", "Flask-Mail", "OpenCV", "Real-time Detection"],
    image: "/projects/p2.png",
    links: { 
      video: "#"
    }
  },
  {
    id: "p3",
    title: "SIU Tour Chatbot",
    description: "Intelligent conversational AI for university campus tours and information retrieval.",
    problem: "Visitors need 24/7 assistance for campus navigation and information without human tour guides.",
    solution: "Built LLM-based chatbot with Neo4j graph database storing campus information. Implemented prompt guardrails for maintaining context and accuracy. Python backend with intelligent query routing.",
    impact: "Successfully automated repetitive queries and demonstrated LLM integration with knowledge graphs. Showed practical application of prompt engineering.",
    tags: ["LLM", "Neo4j", "Python", "Prompt Engineering", "Chatbot"],
    image: "https://images.unsplash.com/photo-1586769852044-692d6e8dba28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    links: { 
      video: "#"
    }
  },
  {
    id: "p4",
    title: "Violence Detection System",
    description: "Action recognition system for detecting violent behaviors in surveillance footage.",
    problem: "Manual surveillance review is labor-intensive and delays incident response.",
    solution: "Implemented action recognition deep learning model optimized for edge device deployment. Focused on efficient inference without sacrificing accuracy.",
    impact: "Demonstrated understanding of edge AI optimization trade-offs and real-time video processing. Applicable to public safety systems.",
    tags: ["Deep Learning", "Computer Vision", "Edge AI", "Video Processing"],
    image: "/projects/p4.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p5",
    title: "Smart Waste Classification",
    description: "YOLO-based automated waste sorting system for 10 waste categories.",
    problem: "Manual waste sorting is inefficient, labor-intensive, and limits recycling effectiveness.",
    solution: "Trained YOLOv11 for multi-class waste detection across 10 categories (Organic, Plastic, Metal, Paper, Glass, etc). Achieved F1 score 0.93 with FastAPI backend for real-time predictions.",
    impact: "High classification accuracy demonstrates practical application of object detection for environmental sustainability and smart city initiatives.",
    tags: ["YOLOv11", "FastAPI", "Computer Vision", "10-Class Detection"],
    image: "/projects/p5.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p6",
    title: "Tomato Detection MLOps Pipeline",
    description: "Fully automated daily pipeline for collecting, processing, and retraining tomato detection models.",
    problem: "Manual model updates are time-consuming, error-prone, and require constant human intervention.",
    solution: "Built Apache Airflow DAG that automatically: (1) Crawls and collects tomato images daily at midnight, (2) Auto-labels images, (3) Splits into train/val/test, (4) Trains YOLOv11 model, (5) Compares accuracy and replaces model if performance improves. Tracked experiments and model versions with MLflow.",
    impact: "Fully automated production MLOps system. Demonstrated understanding of workflow orchestration, continuous model improvement, and deployment automation.",
    tags: ["Airflow", "MLflow", "MLOps", "YOLO", "Automation", "CI/CD"],
    image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p7",
    title: "Face Recognition with Adaface",
    description: "High-accuracy facial identification and verification system using Adaface model.",
    problem: "Biometric authentication requires fast, accurate, and robust face recognition.",
    solution: "Implemented pure Adaface model for facial feature extraction and similarity matching. Achieved high accuracy with Adaface's advanced face representation.",
    impact: "Practical biometric authentication system. Learned about state-of-the-art face recognition architectures and their applications in security systems.",
    tags: ["Computer Vision", "Adaface", "Face Recognition", "Biometrics"],
    image: "/projects/p7.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p8",
    title: "Toxic Comment Detection",
    description: "Multi-modal NLP system for detecting toxic content from both text and audio sources.",
    problem: "Rising toxicity in online spaces affects community health. Manual moderation at scale is inefficient.",
    solution: "Built end-to-end pipeline: Input YouTube link → auto-crawl comments via tool + speech-to-text using Wav2Vec → classify using LSTM with GloVe and Word2Vec embeddings. Achieved LSTM_GloVe accuracy 89.79% and LSTM_Word2Vec 88.98%.",
    impact: "Successfully automated toxic content detection from multiple sources. Demonstrated multi-modal NLP and practical content moderation solutions.",
    tags: ["NLP", "LSTM", "Wav2Vec", "GloVe", "Word2Vec", "YouTube", "Multi-modal"],
    image: "/projects/p8.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p9",
    title: "Crop Recommendation System",
    description: "ML-powered recommendation system for optimal crop selection across 20 crop classes.",
    problem: "Farmers lack data-driven guidance for crop selection, leading to suboptimal yields and resource waste.",
    solution: "Implemented and rigorously compared three ML algorithms on 20-class dataset: KNN (98.1% acc, 97.89% F1), Naive Bayes (99.5% acc, 99.4% F1), Logistic Regression (93.78% acc, 94% F1). Selected Naive Bayes as best performer.",
    impact: "Achieved 99.5% accuracy. Demonstrated systematic model comparison methodology and practical agricultural ML application.",
    tags: ["KNN", "Naive Bayes", "Logistic Regression", "Model Evaluation", "20-Class"],
    image: "/projects/p9.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p16",
    title: "Weather Analysis & Advisory System",
    description: "Intelligent weather analysis system that provides region-specific insights and recommendations.",
    problem: "Users need accurate, actionable weather insights beyond just forecasts for planning activities.",
    solution: "Integrated OpenWeather API to fetch regional weather data, processed with Gemini Flash 2.5 for intelligent analysis and personalized recommendations. Built Flask backend for seamless API integration.",
    impact: "Demonstrated API integration and LLM utilization for practical real-world applications. Showed ability to combine multiple services for enhanced user experience.",
    tags: ["Flask", "OpenWeather API", "Gemini", "Weather Analysis", "Backend"],
    image: "/projects/p16.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p17",
    title: "Animal Memory Match Game",
    description: "Interactive memory card game featuring animals with progressive difficulty levels.",
    problem: "Need engaging educational tools to improve memory and teach children about animals.",
    solution: "Built matching game with matching animal cards. Features progressive difficulty: Level 1 (8 cards), Level 2 (12 cards), Level 3 (16 cards) with adaptive time limits. Developed with pure HTML/CSS/JavaScript.",
    impact: "Practical educational application combining gamification with learning. Demonstrated ability to create engaging interactive web experiences.",
    tags: ["HTML/CSS", "JavaScript", "Educational"],
    image: "/projects/p17.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p10",
    title: "Tech E-commerce Website",
    description: "Full-featured e-commerce platform for technology products with complete CRUD operations.",
    problem: "Need functional e-commerce system for selling technology products online.",
    solution: "Built with ASP.NET backend and HTML/CSS/JavaScript frontend. Implemented shopping cart, product search, user authentication, and admin dashboard.",
    impact: "Gained full-stack web development experience. Demonstrated ability to build complete business applications.",
    tags: ["ASP.NET", "HTML/CSS", "JavaScript", "E-commerce", "Full-stack"],
    image: "/projects/p10.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p11",
    title: "Bookstore Mobile App",
    description: "Native Android mobile application for browsing and purchasing books.",
    problem: "Need mobile platform for customers to browse and purchase books on-the-go.",
    solution: "Developed Java-based Android app with full e-commerce features: product browsing, shopping cart, order management, and push notifications.",
    impact: "Demonstrated mobile development skills and ability to create user-friendly applications.",
    tags: ["Java", "Android", "Mobile Development", "E-commerce"],
    image: "/projects/p11.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p12",
    title: "Knight's Tour Visualization",
    description: "Interactive visualization of the knight's tour backtracking algorithm.",
    problem: "Complex algorithms difficult to visualize and understand for learning purposes.",
    solution: "Built interactive HTML/CSS/JavaScript visualization showing backtracking algorithm in real-time with color-coded board states and step-by-step execution.",
    impact: "Created educational tool demonstrating problem-solving and algorithm visualization skills.",
    tags: ["HTML/CSS", "JavaScript", "Algorithms", "Visualization"],
    image: "/projects/p12.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p13",
    title: "Cafe Management Software",
    description: "Desktop application for managing cafe operations and inventory.",
    problem: "Manual cafe management processes leading to order errors, slow service, and inventory mismatches.",
    solution: "Developed C# Winform desktop application with comprehensive features: order management, billing system, real-time inventory tracking, and sales reporting.",
    impact: "Demonstrated business software development and ability to create efficient operational tools.",
    tags: ["C#", "Winform", "Desktop Application", "Management", "Inventory"],
    image: "/projects/p13.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p14",
    title: "Real-time Personal Blog",
    description: "Blog platform with real-time updates using Socket programming.",
    problem: "Traditional blogs lack real-time interactivity and instant content updates.",
    solution: "Built blog platform using Socket.js programming for real-time bidirectional communication: instant post updates, live comments, and user notifications.",
    impact: "Demonstrated real-time web communication skills and understanding of WebSocket technologies.",
    tags: ["HTML/CSS", "JavaScript", "Socket.js", "Real-time", "Web Development"],
    image: "/projects/p14.png",
    links: { 
      video: "#",
      github: "#" 
    }
  },
  {
    id: "p15",
    title: "Interactive Periodic Table",
    description: "Educational web tool for exploring chemical elements and properties.",
    problem: "Students struggle to learn and remember periodic table elements and their properties effectively.",
    solution: "Created interactive web tool with visual periodic table layout, detailed element information cards, and search/filter functionality for quick property lookup.",
    impact: "Developed educational web tool demonstrating UI/UX design and frontend interactivity skills.",
    tags: ["HTML/CSS", "JavaScript", "Education", "Interactive", "Web Tool"],
    image: "/projects/p15.png",
    links: { 
      video: "#",
      github: "#" 
    }
  }
];

export const CERTIFICATIONS: Certification[] = [
  { 
    id: "c1", 
    name: "Machine Learning", 
    issuer: "Coursera (Stanford)", 
    iconName: "brain",
    date: "2022",
    image: "/certificates/c1.png"
  },
  { 
    id: "c2", 
    name: "Improving Deep Neural Networks", 
    issuer: "Coursera (deeplearning.ai)", 
    iconName: "cpu",
    date: "2022",
    image: "/certificates/c2.png"
  },
  { 
    id: "c3", 
    name: "Python for Everybody", 
    issuer: "Coursera (Univ. of Michigan)", 
    iconName: "code",
    date: "2022",
    image: "/certificates/c3.png"
  },
  { 
    id: "c4", 
    name: "Python 3 Programming", 
    issuer: "Coursera (Univ. of Michigan)", 
    iconName: "code",
    date: "2022",
    image: "/certificates/c4.png"
  },
  { 
    id: "c5", 
    name: "Microsoft Word 2019", 
    issuer: "Microsoft Office Specialist", 
    iconName: "file-text",
    date: "2025",
    score: "1000/1000",
    image: "/certificates/c5.png"
  },
  { 
    id: "c6", 
    name: "Microsoft Excel 2019", 
    issuer: "Microsoft Office Specialist", 
    iconName: "file-spreadsheet",
    date: "2025",
    score: "1000/1000",
    image: "/certificates/c6.png"
  },
  { 
    id: "c7", 
    name: "Microsoft PowerPoint 2019", 
    issuer: "Microsoft Office Specialist", 
    iconName: "presentation",
    date: "2025",
    score: "1000/1000",
    image: "/certificates/c7.png"
  },
  { 
    id: "c8", 
    name: "TOEIC Certificate", 
    issuer: "ETS", 
    iconName: "globe",
    date: "2025",
    score: "660",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
];

export const AWARDS: Award[] = [
  {
    id: "a1",
    title: "Consolation Prize",
    organization: "HCMC AI Challenge",
    year: "2024",
    description: "Recognized for exceptional achievement in the HCMC AI Challenge competition.",
    iconName: "trophy"
  },
  {
    id: "a2",
    title: "Second Prize",
    organization: "University-level Scientific Research",
    year: "2024",
    description: "Awarded for excellence in scientific research at the university level.",
    iconName: "medal"
  },
  {
    id: "a3",
    title: "Consolation Prize",
    organization: "HCMC AI Challenge",
    year: "2023",
    description: "Awarded for outstanding performance in the HCMC AI Challenge competition.",
    iconName: "trophy"
  },
  {
    id: "a4",
    title: "Most Favorite Idea Award",
    organization: "Stem Cell Innovation 6th Edition",
    year: "2019",
    description: "Recognized for the most popular and innovative idea in the competition.",
    iconName: "lightbulb"
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub1",
    title: "An Optimized and Interactive Video Event Retrieval System with an Improved Temporal Algorithm",
    authors: "Kiet Pham Gia, Nhi Nguyen Truong Cong, Long Nguyen Huynh Phi, Vinh Nguyen Quoc, Phuong Le Tran Song, Binh Tran Le Hai, Tri Pham Xuan, Duong Tran Ham, Tin Huynh, Kiem Hoang",
    conference: "SOICT'24 - International Symposium on Information and Communication Technology, 2024",
    doi: "https://doi.org/10.1007/978-981-96-4291-5_9"
  },
  {
    id: "pub2",
    title: "An Interactive System for Multimedia Retrieval in Video Collection with Temporal Integration",
    authors: "Kiet Pham Gia, Hai Binh Tran Le, Phi Long Nguyen Huynh, Song Phuong Le Tran, Long Pham Hoang, Tri Pham Xuan, Duong Tran Ham, Tin Huynh Ngoc, Kiem Hoang",
    conference: "SOICT'23 - International Symposium on Information and Communication Technology, 2023",
    doi: "https://doi.org/10.1145/3628797.3629019"
  }
];