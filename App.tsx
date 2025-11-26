import React, { useState, useEffect, useRef, memo } from 'react';
import { 
  Menu, X, Moon, Sun, Github, Linkedin, Mail, Twitter, Download, 
  ExternalLink, MapPin, Phone, Briefcase, Award, Brain, Cpu, Code, Globe, 
  Terminal, Database, ChevronUp, Trophy, Medal, Lightbulb, ScrollText, GraduationCap, ZoomIn, PlayCircle,
  FileCode, Layout, Server, Workflow, GitBranch, Code2, Puzzle, Search, BookOpen, MessageSquare, Users, Clock, Flag, MonitorPlay, Sparkles, Activity, FileText, FileSpreadsheet, Presentation
} from 'lucide-react';
import { NAV_ITEMS, HERO_STRINGS, SKILLS, EXPERIENCES, EDUCATION, PROJECTS, CERTIFICATIONS, AWARDS, PUBLICATIONS } from './constants';
import ParticleBackground from './components/ParticleBackground';
import Loading from './components/Loading';
import { Certification } from './types';

const MemoizedParticleBackground = memo(ParticleBackground);

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const IconMap: Record<string, React.ElementType> = {
  brain: Brain,
  cpu: Cpu,
  code: Code,
  globe: Globe,
  terminal: Terminal,
  database: Database,
  award: Award,
  trophy: Trophy,
  medal: Medal,
  lightbulb: Lightbulb,
  "file-code": FileCode,
  "layout": Layout,
  "server": Server,
  "workflow": Workflow,
  "git-branch": GitBranch,
  "code-2": Code2,
  "puzzle": Puzzle,
  "search": Search,
  "book-open": BookOpen,
  "message-square": MessageSquare,
  "users": Users,
  "clock": Clock,
  "flag": Flag,
  "monitor-play": MonitorPlay,
  "sparkles": Sparkles,
  "activity": Activity,
  "briefcase": Briefcase,
  "file-text": FileText,
  "file-spreadsheet": FileSpreadsheet,
  "presentation": Presentation
};

const useTypewriter = (text: string | string[], speed: number = 50, delay: number = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  const strings = React.useMemo(() => typeof text === 'string' ? [text] : text, [text]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const i = loopNum % strings.length;
    const fullText = strings[i];

    const handleTyping = () => {
      setDisplayText(curr => 
        isDeleting ? fullText.substring(0, curr.length - 1) : fullText.substring(0, curr.length + 1)
      );

      setTypingSpeed(isDeleting ? speed / 2 : speed);

      if (!isDeleting && displayText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(handleTyping, 500);
      } else {
        timer = setTimeout(handleTyping, typingSpeed);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, strings, delay, speed]);

  return displayText;
};

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Navbar: React.FC<{ isDark: boolean; toggleTheme: () => void }> = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'py-3 backdrop-blur-xl bg-lightPrimary/90 dark:bg-darkPrimary/90 border-gray-200 dark:border-white/5 shadow-md' : 'py-5 bg-transparent border-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-heading font-bold text-lightTextPrimary dark:text-darkTextPrimary flex items-center gap-2 group">
          <div className="relative">
             <img src="/logo/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          <span>Le Tran <span className="text-lightAccent dark:text-darkAccent">Song Phuong</span></span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-medium text-lightTextSecondary dark:text-darkTextSecondary hover:text-lightAccent dark:hover:text-darkAccent transition-colors relative group">
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lightAccent dark:bg-darkAccent transition-all group-hover:w-full"></span>
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full border dark:border-gray-700 border-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-lightAccent dark:text-darkAccent">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-lightAccent dark:text-darkAccent">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-lightTextPrimary dark:text-darkTextPrimary">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-lightPrimary dark:bg-darkSecondary shadow-xl border-t border-gray-100 dark:border-gray-800 animate-fade-in-up">
          <div className="flex flex-col p-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-lightTextPrimary dark:text-darkTextPrimary hover:text-lightAccent dark:hover:text-darkAccent">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const typingText = useTypewriter(HERO_STRINGS);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <MemoizedParticleBackground isDark={isDark} />
      
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-lightAccent/20 dark:bg-darkAccent/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/20 dark:bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn delay={100}>
          <div className="relative">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lightAccent/10 dark:bg-darkAccent/10 text-lightAccent dark:text-darkAccent border border-lightAccent/20 dark:border-darkAccent/20 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lightAccent dark:bg-darkAccent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lightAccent dark:bg-darkAccent"></span>
                </span>
                Open to Opportunities
             </div>
            <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6 leading-tight drop-shadow-sm">
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lightAccent via-purple-600 via-pink-500 to-lightAccent dark:from-darkAccent dark:via-purple-500 dark:via-pink-400 dark:to-darkAccent bg-[length:200%_auto] animate-shimmer-gradient">
                  Hello, I'm
                </span>
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-lightAccent via-purple-600 via-pink-500 to-lightAccent dark:from-darkAccent dark:via-purple-500 dark:via-pink-400 dark:to-darkAccent bg-[length:200%_auto] animate-shimmer-gradient blur-sm opacity-50">
                  Hello, I'm
                </span>
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lightAccent via-purple-600 via-pink-500 to-lightAccent dark:from-darkAccent dark:via-purple-500 dark:via-pink-400 dark:to-darkAccent bg-[length:200%_auto] animate-shimmer-gradient" style={{ animationDelay: '0.5s' }}>
                  AI Engineer
                </span>
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-lightAccent via-purple-600 via-pink-500 to-lightAccent dark:from-darkAccent dark:via-purple-500 dark:via-pink-400 dark:to-darkAccent bg-[length:200%_auto] animate-shimmer-gradient blur-sm opacity-50" style={{ animationDelay: '0.5s' }}>
                  AI Engineer
                </span>
              </span>
            </h1>
            <h2 className="text-xl lg:text-2xl font-medium text-lightTextSecondary dark:text-darkTextSecondary mb-8 h-8">
              {typingText}<span className="animate-pulse text-lightAccent dark:text-darkAccent">|</span>
            </h2>
            <p className="text-lg text-lightTextSecondary dark:text-darkTextSecondary mb-10 max-w-lg leading-relaxed">
              I'm a fresher AI Engineer passionate about Computer Vision and LLMs. I combine academic knowledge with hands-on project experience to develop practical AI solutions that solve real problems.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="relative px-8 py-3.5 rounded-full bg-gradient-to-r from-lightAccent via-purple-600 to-pink-500 dark:from-darkAccent dark:via-purple-500 dark:to-pink-400 text-white dark:text-darkPrimary font-bold overflow-hidden group shadow-lg hover:shadow-2xl hover:shadow-lightAccent/50 dark:hover:shadow-darkAccent/50 transition-all transform hover:-translate-y-1 z-20">
                 <div className="absolute inset-0 bg-gradient-to-r from-lightAccent via-purple-600 to-pink-500 dark:from-darkAccent dark:via-purple-500 dark:to-pink-400 bg-[length:200%_auto] animate-shimmer-gradient opacity-90"></div>
                 <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"></div>
                 <span className="relative z-20 drop-shadow-lg">Explore Work</span>
              </a>
              
              <button className="relative px-8 py-3.5 rounded-full border-2 border-transparent bg-gradient-to-r from-lightAccent via-purple-600 to-pink-500 dark:from-darkAccent dark:via-purple-500 dark:to-pink-400 bg-clip-padding group backdrop-blur-sm z-20 overflow-hidden">
                <div className="absolute inset-[2px] rounded-full bg-lightPrimary dark:bg-darkPrimary z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-lightAccent via-purple-600 to-pink-500 dark:from-darkAccent dark:via-purple-500 dark:to-pink-400 bg-[length:200%_auto] animate-shimmer-gradient opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
                <div className="relative z-20 flex items-center gap-2 text-lightTextPrimary dark:text-darkTextPrimary font-semibold">
                  <Download size={18} className="group-hover:animate-bounce" /> 
                  <span>Download CV</span>
                </div>
              </button>
            </div>

            <div className="mt-12 flex gap-6 items-center">
              {[
                { Icon: Github, href: "https://github.com/songphuongle" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/song-phương-lê-58baa2350" },
                { Icon: Twitter, href: "#" },
                { Icon: Mail, href: "mailto:letransongphuong@gmail.com" }
              ].map((item, i) => (
                <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-lightTextSecondary dark:text-darkTextSecondary hover:text-lightAccent dark:hover:text-darkAccent transition-colors transform hover:scale-110 z-20">
                  <item.Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={300} className="flex justify-center lg:justify-end relative pointer-events-none">
          <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-square group pointer-events-auto perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-lightAccent to-purple-600 dark:from-darkAccent dark:to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse-slow"></div>
            
            <div className="w-full h-full rounded-full p-2 border-2 border-dashed border-lightAccent/30 dark:border-darkAccent/30 relative animate-[spin_20s_linear_infinite]"></div>
            
            <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>

            <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-lightPrimary dark:border-darkSecondary shadow-2xl z-10 bg-darkSecondary">
              <img 
                  src="/avata/avt.png" 
                  alt="Profile" 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Shine effect - sweeping light */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg] animate-shine pointer-events-none z-30"></div>
              
              {/* Sparkles effect */}
              <div className="absolute inset-0 pointer-events-none z-30">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                    style={{
                      left: `${15 + (i * 12)}%`,
                      top: `${10 + (i * 11)}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: `${2 + (i % 3)}s`,
                    }}
                  ></div>
                ))}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`sparkle-${i}`}
                    className="absolute w-1.5 h-1.5 bg-gradient-to-r from-lightAccent to-purple-500 dark:from-darkAccent dark:to-purple-400 rounded-full animate-pulse"
                    style={{
                      left: `${20 + (i * 15)}%`,
                      top: `${15 + (i * 12)}%`,
                      animationDelay: `${i * 0.4}s`,
                      animationDuration: `${1.5 + (i % 2) * 0.5}s`,
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-lightAccent/10 via-transparent via-purple-500/10 to-transparent dark:from-darkAccent/10 dark:via-transparent dark:via-purple-400/10 pointer-events-none z-25 mix-blend-overlay"></div>
              
              {/* Grain texture */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-20"></div>
            </div>
            
            <div className="absolute top-10 right-0 lg:-right-4 bg-lightPrimary dark:bg-darkSecondary p-3 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 animate-float-slow z-20">
               <Brain className="text-lightAccent dark:text-darkAccent" size={24} />
            </div>
             <div className="absolute bottom-10 left-0 lg:-left-4 bg-lightPrimary dark:bg-darkSecondary p-3 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 animate-float-delayed z-20">
               <Cpu className="text-purple-500 dark:text-purple-400" size={24} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const About: React.FC = () => (
  <section id="about" className="py-24 bg-lightSecondary/50 dark:bg-darkSecondary/50">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <FadeIn delay={200} className="space-y-6">
            <h2 className="text-sm font-bold tracking-widest text-lightAccent dark:text-darkAccent uppercase mb-2">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-lightTextPrimary dark:text-darkTextPrimary mb-6">Passionate About AI & Learning</h3>
            <p className="text-lg text-lightTextSecondary dark:text-darkTextSecondary leading-relaxed">
                I'm an <span className="font-semibold text-lightAccent dark:text-darkAccent">AI Engineer</span> starting my career with solid fundamentals in deep learning, computer vision, and NLP. I learn quickly and enjoy tackling challenging problems.
            </p>
            <p className="text-lg text-lightTextSecondary dark:text-darkTextSecondary leading-relaxed">
                Through academic projects and personal initiatives, I've gained practical experience in building ML pipelines, training models, and deploying solutions. I'm eager to contribute to impactful AI projects and grow alongside a talented team.
            </p>
            
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6">
               <div className="text-center p-4 bg-lightPrimary dark:bg-darkPrimary rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <h4 className="text-3xl font-bold text-lightAccent dark:text-darkAccent">15+</h4>
                  <p className="text-xs uppercase tracking-wide text-lightTextSecondary dark:text-darkTextSecondary mt-1">Projects</p>
               </div>
               <div className="text-center p-4 bg-lightPrimary dark:bg-darkPrimary rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <h4 className="text-3xl font-bold text-purple-600 dark:text-purple-400">04</h4>
                  <p className="text-xs uppercase tracking-wide text-lightTextSecondary dark:text-darkTextSecondary mt-1">Awards</p>
               </div>
               <div className="text-center p-4 bg-lightPrimary dark:bg-darkPrimary rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <h4 className="text-3xl font-bold text-pink-500 dark:text-pink-400">02</h4>
                  <p className="text-xs uppercase tracking-wide text-lightTextSecondary dark:text-darkTextSecondary mt-1">Publications</p>
               </div>
            </div>
        </FadeIn>

        <FadeIn delay={400}>
            <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: MapPin, title: "Location", value: "An Phu ward, Ho Chi Minh City, VN" },
                  { icon: Mail, title: "Email", value: "letransongphuong@gmail.com" },
                  { icon: Phone, title: "Phone", value: "+(84) 866 421 819" },
                  { icon: Briefcase, title: "Position", value: "AI Engineer" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center p-4 rounded-xl bg-lightPrimary dark:bg-darkPrimary shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 group">
                      <div className="p-3 rounded-full bg-lightSecondary dark:bg-darkSecondary text-lightAccent dark:text-darkAccent mr-4 group-hover:scale-110 transition-transform">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase text-lightTextSecondary dark:text-darkTextSecondary">{item.title}</h3>
                        <p className="font-medium text-lightTextPrimary dark:text-darkTextPrimary">{item.value}</p>
                      </div>
                  </div>
                ))}
            </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-lightPrimary dark:bg-darkPrimary">
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-lightAccent dark:text-darkAccent uppercase mb-2">Technical Arsenal</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-lightTextPrimary dark:text-darkTextPrimary">Skills & Technologies</h3>
          </div>
        </FadeIn>
      </div>
      
      <div className="flex flex-col gap-12">
          {SKILLS.map((category, idx) => {
            const Icon = IconMap[category.icon] || Code;
            return (
              <div key={idx} className="space-y-6">
                 <div className="container mx-auto px-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Icon size={20} className="text-lightAccent dark:text-darkAccent" />
                        <h4 className="text-xl font-heading font-bold text-lightTextPrimary dark:text-darkTextPrimary">{category.title}</h4>
                    </div>
                 </div>

                 <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {category.skills.map((skill, i) => {
                           const SkillIcon = IconMap[skill.iconName] || Code;
                           return (
                             <div 
                               key={i}
                               className="flex items-center gap-3 px-4 py-3 rounded-xl bg-lightSecondary/50 dark:bg-darkSecondary/50 border border-gray-200 dark:border-gray-800 hover:border-lightAccent dark:hover:border-darkAccent hover:bg-lightPrimary dark:hover:bg-darkSecondary transition-all duration-300 hover:-translate-y-1"
                             >
                                <div className="p-2 rounded-lg bg-lightPrimary dark:bg-darkPrimary text-lightAccent dark:text-darkAccent shadow-sm shrink-0">
                                  <SkillIcon size={18} />
                                </div>
                                <span className="font-semibold text-sm md:text-base text-lightTextPrimary dark:text-darkTextPrimary">{skill.name}</span>
                             </div>
                           );
                        })}
                    </div>
                 </div>
              </div>
            );
          })}
        </div>
    </section>
  );
};

const Projects: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 bg-lightSecondary dark:bg-darkSecondary transition-colors">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-lightAccent dark:text-darkAccent uppercase mb-2">Portfolio</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-lightTextPrimary dark:text-darkTextPrimary">Featured Projects</h3>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <FadeIn key={project.id} delay={idx % 2 * 100}>
              <div className="group h-full bg-lightPrimary dark:bg-darkPrimary rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-lightAccent/10 dark:hover:shadow-darkAccent/10 transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-darkPrimary via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors">{project.title}</h3>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                          {project.links.demo && (
                            <a href={project.links.demo} title="Live Site" className="p-2 bg-lightPrimary dark:bg-darkSecondary rounded-full text-lightAccent dark:text-darkAccent hover:scale-110 transition-transform shadow-lg">
                                <ExternalLink size={20} />
                            </a>
                          )}
                          {(project.links.video || project.links.github) && (
                            project.links.video ? (
                              <button 
                                onClick={() => setSelectedVideo(project.links.video!)} 
                                title="Watch Demo" 
                                className="p-2 bg-lightPrimary dark:bg-darkSecondary rounded-full text-red-500 dark:text-red-400 hover:scale-110 transition-transform shadow-lg"
                              >
                                <PlayCircle size={20} />
                              </button>
                            ) : (
                              <a href={project.links.github} title="View Code" className="p-2 bg-lightPrimary dark:bg-darkSecondary rounded-full text-lightTextPrimary dark:text-darkTextPrimary hover:scale-110 transition-transform shadow-lg">
                                <Github size={20} />
                              </a>
                            )
                          )}
                      </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                      <p className="text-lightTextSecondary dark:text-darkTextSecondary mb-6 leading-relaxed">{project.description}</p>
                      
                      {(project.problem || project.solution || project.impact) && (
                        <div className="space-y-3 mb-6 bg-lightSecondary dark:bg-darkSecondary/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50 text-sm">
                            {project.problem && (
                              <div className="flex gap-3">
                                <div className="min-w-[4rem] text-xs font-bold uppercase text-red-500 dark:text-red-400 pt-0.5">Problem</div>
                                <div className="text-lightTextSecondary dark:text-darkTextSecondary">{project.problem}</div>
                              </div>
                            )}
                            {project.solution && (
                              <div className="flex gap-3">
                                <div className="min-w-[4rem] text-xs font-bold uppercase text-yellow-500 dark:text-yellow-400 pt-0.5">Solution</div>
                                <div className="text-lightTextSecondary dark:text-darkTextSecondary">{project.solution}</div>
                              </div>
                            )}
                            {project.impact && (
                              <div className="flex gap-3">
                                <div className="min-w-[4rem] text-xs font-bold uppercase text-green-500 dark:text-green-400 pt-0.5">Impact</div>
                                <div className="text-lightTextPrimary dark:text-darkTextPrimary font-medium">{project.impact}</div>
                              </div>
                            )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tags.map(tag => (
                              <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full bg-lightSecondary dark:bg-darkSecondary text-lightTextSecondary dark:text-darkTextSecondary border border-gray-200 dark:border-gray-700">
                                  {tag}
                              </span>
                          ))}
                      </div>
                  </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in-up"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="absolute top-6 right-6 z-50">
             <button 
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
             >
                <X size={32} />
             </button>
          </div>
           
           <div 
            className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 ring-1 ring-lightAccent/50 dark:ring-darkAccent/50"
            onClick={e => e.stopPropagation()}
           >
              <iframe 
                src={selectedVideo} 
                title="Project Demo Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
           </div>
        </div>
      )}
    </section>
  );
};

const ExperienceAndEducation: React.FC = () => (
    <section id="experience" className="py-24 overflow-hidden relative bg-lightPrimary dark:bg-darkPrimary">
        <div className="container mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-sm font-bold tracking-widest text-lightAccent dark:text-darkAccent uppercase mb-2">My Journey</h2>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-lightTextPrimary dark:text-darkTextPrimary">Experience & Education</h3>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-16">
                <div>
                    <h4 className="text-2xl font-bold font-heading mb-8 text-lightTextPrimary dark:text-darkTextPrimary flex items-center gap-3">
                        <Briefcase className="text-lightAccent dark:text-darkAccent" /> Professional Experience
                    </h4>
                    <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 space-y-12">
                        {EXPERIENCES.map((exp, index) => (
                          <div key={exp.id} className="relative pl-8">
                            <span className="absolute -left-[9px] top-0 h-5 w-5 rounded-full border-4 border-lightPrimary dark:border-darkPrimary bg-lightAccent dark:bg-darkAccent shadow-lg shadow-lightAccent/50 dark:shadow-darkAccent/50"></span>
                            <FadeIn delay={index * 100}>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                <h4 className="text-xl font-bold text-lightTextPrimary dark:text-darkTextPrimary">{exp.role}</h4>
                                <span className="text-xs font-bold uppercase tracking-wider text-lightTextSecondary dark:text-darkTextSecondary bg-lightSecondary dark:bg-darkSecondary px-2 py-1 rounded inline-block w-fit mt-1 sm:mt-0">{exp.period}</span>
                              </div>
                              <h5 className="text-lg font-medium text-lightAccent dark:text-darkAccent mb-4">{exp.company}</h5>
                              <p className="text-lightTextSecondary dark:text-darkTextSecondary leading-relaxed bg-lightSecondary/30 dark:bg-darkSecondary/30 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-lightAccent/30 dark:hover:border-darkAccent/30 transition-colors">
                                {exp.description}
                              </p>
                            </FadeIn>
                          </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-2xl font-bold font-heading mb-8 text-lightTextPrimary dark:text-darkTextPrimary flex items-center gap-3">
                        <GraduationCap className="text-purple-500 dark:text-purple-400" /> Education
                    </h4>
                    <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-3 space-y-12">
                         {EDUCATION.map((edu, index) => (
                          <div key={edu.id} className="relative pl-8">
                             <span className="absolute -left-[9px] top-0 h-5 w-5 rounded-full border-4 border-lightPrimary dark:border-darkPrimary bg-purple-500 dark:bg-purple-400 shadow-lg shadow-purple-500/50"></span>
                            <FadeIn delay={200 + index * 100}>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                 <h4 className="text-xl font-bold text-lightTextPrimary dark:text-darkTextPrimary">{edu.degree}</h4>
                                 <span className="text-xs font-bold uppercase tracking-wider text-lightTextSecondary dark:text-darkTextSecondary bg-lightSecondary dark:bg-darkSecondary px-3 py-1 rounded whitespace-nowrap mt-1 sm:mt-0">{edu.period}</span>
                              </div>
                              <h5 className="text-lg font-medium text-purple-600 dark:text-purple-400 mb-2">{edu.school}</h5>
                              <p className="text-sm font-medium text-lightTextSecondary dark:text-darkTextSecondary bg-lightSecondary/30 dark:bg-darkSecondary/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-500/30 transition-colors">
                                {edu.details}
                              </p>
                            </FadeIn>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const CredentialsAndHonors: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="credentials" className="py-24 bg-lightSecondary/30 dark:bg-darkSecondary/30">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-lightAccent dark:text-darkAccent uppercase mb-2">Recognition</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-lightTextPrimary dark:text-darkTextPrimary">Awards & Credentials</h3>
          </div>
        </FadeIn>

        <div className="mb-20">
             <div className="flex items-center gap-3 mb-8">
               <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500"><ScrollText size={24} /></div>
               <h3 className="text-2xl font-bold font-heading text-lightTextPrimary dark:text-darkTextPrimary">Scientific Publications</h3>
             </div>
             
             <div className="grid md:grid-cols-2 gap-6">
               {PUBLICATIONS.map((pub, idx) => (
                  <FadeIn key={pub.id} delay={idx * 100}>
                    <div className="group h-full p-6 rounded-xl bg-lightPrimary dark:bg-darkPrimary border border-gray-100 dark:border-gray-800 shadow-sm hover:border-pink-500/50 dark:hover:border-pink-500/50 transition-all hover:-translate-y-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <h4 className="font-bold text-lg mb-3 text-lightTextPrimary dark:text-darkTextPrimary group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors relative z-10">
                        {pub.title}
                      </h4>
                      <p className="text-sm text-lightTextSecondary dark:text-darkTextSecondary mb-4 italic leading-relaxed relative z-10">
                        {pub.authors}
                      </p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto border-t border-gray-100 dark:border-gray-800 pt-4 relative z-10">
                        <span className="text-xs font-bold uppercase tracking-wide text-lightTextSecondary dark:text-darkTextSecondary bg-lightSecondary dark:bg-darkSecondary px-2 py-1 rounded">
                          {pub.conference.split('-')[0]}
                        </span>
                        {pub.doi && (
                          <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-pink-600 dark:text-pink-400 flex items-center gap-1 hover:underline">
                            View DOI <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </FadeIn>
               ))}
             </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
               <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500"><Trophy size={24} /></div>
               <h3 className="text-2xl font-bold font-heading text-lightTextPrimary dark:text-darkTextPrimary">Awards & Honors</h3>
            </div>
            <div className="space-y-6">
              {AWARDS.map((award, idx) => {
                 const Icon = IconMap[award.iconName] || Trophy;
                 return (
                  <FadeIn key={award.id} delay={idx * 100}>
                    <div className="flex gap-4 p-5 rounded-xl bg-lightPrimary dark:bg-darkPrimary border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-yellow-500/30 transition-all">
                      <div className="flex-shrink-0 mt-1">
                        <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 dark:text-yellow-400">
                          <Icon size={20} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lightTextPrimary dark:text-darkTextPrimary text-lg">{award.title}</h4>
                        <p className="text-sm text-lightAccent dark:text-darkAccent font-medium mb-2">{award.organization} • {award.year}</p>
                        <p className="text-sm text-lightTextSecondary dark:text-darkTextSecondary">{award.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                 );
              })}
            </div>
          </div>

          <div>
             <div className="flex items-center gap-3 mb-8">
               <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><Award size={24} /></div>
               <h3 className="text-2xl font-bold font-heading text-lightTextPrimary dark:text-darkTextPrimary">Certifications</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <FadeIn key={cert.id} delay={idx * 50}>
                    <div 
                      className="group cursor-pointer p-4 rounded-xl bg-lightPrimary dark:bg-darkPrimary border border-gray-100 dark:border-gray-800 hover:border-purple-500/50 hover:shadow-lg transition-all relative overflow-hidden h-full flex flex-col"
                      onClick={() => setSelectedCert(cert)}
                    >
                       <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors duration-500"></div>

                       <div className="relative z-10 flex items-start justify-between mb-3">
                          <div className="p-1.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                              {React.createElement(IconMap[cert.iconName] || Award, { size: 16 })}
                          </div>
                          <span className="text-[10px] font-bold text-lightTextSecondary dark:text-darkTextSecondary border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded">{cert.date}</span>
                       </div>
                       <h4 className="relative z-10 text-sm font-bold text-lightTextPrimary dark:text-darkTextPrimary leading-tight mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{cert.name}</h4>
                       <p className="relative z-10 text-xs text-lightTextSecondary dark:text-darkTextSecondary mb-2">{cert.issuer}</p>

                       {cert.score && (
                          <div className="relative z-10 mt-auto mb-2 inline-flex items-center">
                            <span className="text-[10px] font-bold text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/10 px-1.5 py-0.5 rounded">
                              Score: {cert.score}
                            </span>
                          </div>
                       )}
                       
                       <div className={`relative z-10 ${cert.score ? 'mt-1' : 'mt-auto'} flex items-center gap-1 text-xs text-purple-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>
                          <ZoomIn size={12} /> View
                       </div>
                    </div>
                  </FadeIn>
                ))}
             </div>
          </div>
        </div>
      </div>

      {selectedCert && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setSelectedCert(null)}
        >
           <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-50">
              <X size={32} />
           </button>
           
           <div 
            className="bg-lightPrimary dark:bg-darkSecondary rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col relative"
            onClick={e => e.stopPropagation()}
           >
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-lightTextPrimary dark:text-darkTextPrimary flex items-center gap-3">
                        {selectedCert.name}
                        {selectedCert.score && (
                             <span className="text-xs font-bold text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 px-2 py-1 rounded-full">
                                {selectedCert.score}
                             </span>
                        )}
                    </h3>
                    <p className="text-sm text-lightTextSecondary dark:text-darkTextSecondary">{selectedCert.issuer} • {selectedCert.date}</p>
                  </div>
              </div>
              <div className="flex-1 overflow-auto bg-gray-100 dark:bg-black/50 flex items-center justify-center p-4">
                  {selectedCert.image ? (
                    <img src={selectedCert.image} alt={selectedCert.name} className="max-w-full max-h-[60vh] object-contain shadow-lg rounded" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-lightTextSecondary dark:text-darkTextSecondary py-20">
                       <Award size={64} className="mb-4 opacity-20" />
                       <p>No preview image available</p>
                    </div>
                  )}
              </div>
           </div>
        </div>
      )}
    </section>
  );
};

const Contact: React.FC = () => (
    <section id="contact" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
            <FadeIn>
               <div className="grid md:grid-cols-2 gap-12 items-center bg-lightPrimary dark:bg-darkSecondary rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden relative">
                  
                  <div className="absolute top-0 right-0 w-64 h-64 bg-lightAccent/5 dark:bg-darkAccent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                  <div className="relative z-10">
                      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-lightTextPrimary dark:text-darkTextPrimary">Let's Connect</h2>
                      <p className="mb-8 text-lightTextSecondary dark:text-darkTextSecondary leading-relaxed">
                        Interested in discussing AI research, collaboration opportunities, or my work? I'm always open to new conversations.
                      </p>
                      
                      <div className="space-y-5">
                          <a href="mailto:letransongphuong@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-lightSecondary dark:bg-darkPrimary hover:bg-lightAccent/10 dark:hover:bg-darkAccent/10 transition-colors border border-transparent hover:border-lightAccent dark:hover:border-darkAccent group">
                              <Mail className="text-lightAccent dark:text-darkAccent" />
                              <span className="font-medium text-lightTextPrimary dark:text-darkTextPrimary">letransongphuong@gmail.com</span>
                          </a>
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-lightSecondary dark:bg-darkPrimary border border-transparent">
                              <MapPin className="text-lightAccent dark:text-darkAccent" />
                              <span className="font-medium text-lightTextPrimary dark:text-darkTextPrimary">Ho Chi Minh City, Vietnam</span>
                          </div>
                      </div>

                      <div className="flex gap-4 mt-8">
                          <a href="https://github.com/songphuongle" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-lightSecondary dark:bg-darkPrimary text-lightTextSecondary dark:text-darkTextSecondary hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all hover:scale-110"><Github size={20} /></a>
                          <a href="https://www.linkedin.com/in/song-phương-lê-58baa2350" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-lightSecondary dark:bg-darkPrimary text-lightTextSecondary dark:text-darkTextSecondary hover:text-white hover:bg-[#0077b5] transition-all hover:scale-110"><Linkedin size={20} /></a>
                          <a href="#" className="p-3 rounded-full bg-lightSecondary dark:bg-darkPrimary text-lightTextSecondary dark:text-darkTextSecondary hover:text-white hover:bg-[#1DA1F2] transition-all hover:scale-110"><Twitter size={20} /></a>
                      </div>
                  </div>

                  <form className="relative z-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div>
                          <label className="block text-xs font-bold uppercase mb-2 text-lightTextSecondary dark:text-darkTextSecondary ml-1">Name</label>
                          <input type="text" className="w-full px-5 py-3 rounded-xl bg-lightSecondary dark:bg-darkPrimary border border-transparent focus:border-lightAccent dark:focus:border-darkAccent focus:bg-lightPrimary dark:focus:bg-darkSecondary focus:outline-none transition-all text-lightTextPrimary dark:text-darkTextPrimary" placeholder="Your Name" />
                      </div>
                      <div>
                          <label className="block text-xs font-bold uppercase mb-2 text-lightTextSecondary dark:text-darkTextSecondary ml-1">Email</label>
                          <input type="email" className="w-full px-5 py-3 rounded-xl bg-lightSecondary dark:bg-darkPrimary border border-transparent focus:border-lightAccent dark:focus:border-darkAccent focus:bg-lightPrimary dark:focus:bg-darkSecondary focus:outline-none transition-all text-lightTextPrimary dark:text-darkTextPrimary" placeholder="email@example.com" />
                      </div>
                      <div>
                          <label className="block text-xs font-bold uppercase mb-2 text-lightTextSecondary dark:text-darkTextSecondary ml-1">Message</label>
                          <textarea rows={4} className="w-full px-5 py-3 rounded-xl bg-lightSecondary dark:bg-darkPrimary border border-transparent focus:border-lightAccent dark:focus:border-darkAccent focus:bg-lightPrimary dark:focus:bg-darkSecondary focus:outline-none transition-all text-lightTextPrimary dark:text-darkTextPrimary resize-none" placeholder="Let's build something great..." />
                      </div>
                      <button className="relative w-full py-4 rounded-xl bg-gradient-to-r from-lightAccent to-purple-600 dark:from-darkAccent dark:to-purple-500 text-white font-bold shadow-lg shadow-lightAccent/30 dark:shadow-darkAccent/30 overflow-hidden group transform transition-all active:scale-95 hover:shadow-xl">
                          <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"></div>
                          <span className="relative z-20">Send Message</span>
                      </button>
                  </form>
               </div>
            </FadeIn>
        </div>
    </section>
);

const Footer: React.FC = () => (
    <footer className="py-12 border-t border-gray-200 dark:border-white/5 bg-lightPrimary dark:bg-darkPrimary">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h4 className="font-bold text-lg text-lightTextPrimary dark:text-darkTextPrimary mb-2 flex items-center justify-center md:justify-start gap-2">
            <img src="/logo/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
            Le Tran Song Phuong
          </h4>
          <p className="text-sm text-lightTextSecondary dark:text-darkTextSecondary">© 2025. Designed with <span className="text-red-500">♥</span> for Innovation.</p>
        </div>
        <div className="flex gap-8 text-sm font-medium text-lightTextSecondary dark:text-darkTextSecondary">
          <a href="#hero" className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">Home</a>
          <a href="#projects" className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">Projects</a>
          <a href="#contact" className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">Contact</a>
        </div>
      </div>
    </footer>
);

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set dark mode immediately to prevent flash
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);

    // Simulate loading time (can be adjusted or removed if you have real async operations)
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loadTimer);
    };
  }, []);

  // Ensure dark class is applied when isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="font-body selection:bg-lightAccent selection:text-white dark:selection:bg-darkAccent dark:selection:text-darkPrimary bg-lightPrimary dark:bg-darkPrimary transition-colors duration-300">
      {isLoading && <Loading isDark={isDark} />}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero isDark={isDark} />
        <About />
        <Skills />
        <ExperienceAndEducation />
        <Projects />
        <CredentialsAndHonors />
        <Contact />
      </main>
      <Footer />
      
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-lightAccent dark:bg-darkAccent text-white dark:text-darkPrimary shadow-xl z-40 transition-all duration-300 transform ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} strokeWidth={3} />
      </button>
    </div>
  );
};

export default App;