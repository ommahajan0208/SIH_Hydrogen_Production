import { useState, useEffect, useRef } from "react";

import {
  Sun,
  Wind,
  Droplets,
  Activity,
  Database,
  Zap,
  MessageCircle,
  Minimize2,
  Send,
  Leaf,
  Sparkles,
  Menu,
  X,
  Globe,
  Users,
  ArrowRight,
  User,
  BarChart3,
  Shield,
  TrendingUp,
} from "lucide-react";


export const HomePage = ({ onNavigate }) => {
  // Add this INSIDE your HomePage component function

  // States - Add at the top of HomePage component
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 I'm your HydraGenie  Assistant. How can I help you learn about green hydrogen today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Enhanced Q&A Database with more comprehensive coverage
  const qaDatabase = {
    greetings: {
      keywords: [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "greetings",
        "hola",
        "namaste",
      ],
      responses: [
        "Hello! 👋 Great to see you interested in green hydrogen! What would you like to know?",
        "Hi there! Ready to explore the future of clean energy? Ask me anything!",
        "Hey! Welcome to HydraGrid. I'm here to answer all your questions about green hydrogen!",
        "Namaste! 🙏 Excited to discuss green hydrogen with you. How can I help?",
      ],
    },

    whatIsGreenHydrogen: {
      keywords: [
        "what is green hydrogen",
        "what is h2",
        "define green hydrogen",
        "explain green hydrogen",
        "green hydrogen meaning",
        "tell me about green hydrogen",
        "what green hydrogen",
        "about green hydrogen",
      ],
      responses: [
        "Green hydrogen is the cleanest form of hydrogen! 💚\n\nIt's produced by splitting water (H₂O) into hydrogen and oxygen using electricity from renewable sources like solar or wind. The key difference:\n\n🟢 Green H₂: Made with renewables (zero emissions)\n⚫ Grey H₂: Made from fossil fuels (carbon emissions)\n🔵 Blue H₂: Made from fossil fuels with carbon capture\n\nGreen hydrogen is truly emission-free from start to finish! Want to know how it's made?",
      ],
    },

    howItWorks: {
      keywords: [
        "how does it work",
        "how is it made",
        "production process",
        "how to produce",
        "electrolysis",
        "how to make",
        "production method",
        "manufacturing",
        "create hydrogen",
      ],
      responses: [
        "Great question! Here's the step-by-step process 🔬\n\n1️⃣ Renewable energy (solar/wind) generates electricity\n2️⃣ Electricity powers an electrolyzer\n3️⃣ Electrolyzer splits water: 2H₂O → 2H₂ + O₂\n4️⃣ Pure hydrogen is collected and stored\n5️⃣ Oxygen is released (or captured for other uses)\n\nThe beauty? Only water + clean electricity = clean hydrogen! No carbon emissions at all. Curious about efficiency?",
      ],
    },

    benefits: {
      keywords: [
        "benefits",
        "advantages",
        "why green hydrogen",
        "why use",
        "pros",
        "positive",
        "good things",
        "why important",
      ],
      responses: [
        "Green hydrogen has incredible benefits! ✨\n\n🌍 Environmental:\n• Zero carbon emissions\n• Reduces air pollution\n• Fights climate change\n\n⚡ Energy:\n• Stores renewable energy long-term\n• Balances grid with intermittent renewables\n• High energy density\n\n🚀 Versatile:\n• Fuel for vehicles, ships, planes\n• Industrial feedstock\n• Power generation\n• Heat for buildings\n\n💼 Economic:\n• Job creation\n• Energy independence\n• Export opportunities\n\nIt's the missing piece in our clean energy puzzle!",
      ],
    },

    applications: {
      keywords: [
        "applications",
        "uses",
        "where used",
        "what for",
        "industries",
        "usage",
        "use cases",
        "sectors",
        "utilized",
      ],
      responses: [
        "Green hydrogen is incredibly versatile! Here are the major applications 🚀\n\n🚗 Transportation:\n• Fuel cell vehicles (cars, buses, trucks)\n• Ships and ferries\n• Aircraft (future aviation fuel)\n• Trains\n\n🏭 Industry:\n• Steel production (replacing coal)\n• Ammonia for fertilizers\n• Oil refining\n• Chemical manufacturing\n• Cement production\n\n⚡ Energy:\n• Grid balancing and storage\n• Power generation\n• Backup power systems\n\n🏠 Buildings:\n• Heating systems\n• Combined heat and power\n\nWhich sector interests you most?",
      ],
    },

    cost: {
      keywords: [
        "cost",
        "price",
        "expensive",
        "affordable",
        "how much",
        "pricing",
        "economics",
        "cheap",
        "roi",
        "investment",
      ],
      responses: [
        "Let's talk economics! 💰\n\n📊 Current Status (2024):\n• Green H₂: $4-7 per kg\n• Grey H₂: $1-2 per kg\n• Blue H₂: $2-3 per kg\n\n📉 Future Projections:\n• 2030: $1.50-3 per kg (competitive!)\n• 2040: $1-2 per kg (cheaper than fossil fuels)\n• 2050: <$1 per kg (game changer!)\n\n💡 Why prices are dropping:\n• Scaling up production\n• Better technology (85%+ efficient electrolyzers)\n• Cheaper renewables\n• Government incentives\n\nIndia's goal: Become the cheapest producer globally! Want to know about ROI?",
      ],
    },

    storage: {
      keywords: [
        "storage",
        "store",
        "how to store",
        "storage methods",
        "storing hydrogen",
        "keep hydrogen",
        "tank",
        "container",
      ],
      responses: [
        "Hydrogen storage has multiple solutions! 🔋\n\n1️⃣ Compressed Gas (most common):\n• 350-700 bar pressure tanks\n• Used in vehicles and small facilities\n• Quick refueling\n\n2️⃣ Liquid Hydrogen:\n• Cooled to -253°C\n• Higher density, more storage\n• Used for large-scale transport\n\n3️⃣ Metal Hydrides:\n• Hydrogen absorbed in metal alloys\n• Safer, solid-state storage\n• Still developing for large scale\n\n4️⃣ Underground Storage:\n• Salt caverns, depleted gas fields\n• Massive capacity (TWh scale)\n• Best for seasonal storage\n\n5️⃣ Ammonia (NH₃):\n• Hydrogen carrier\n• Easier to transport\n• Can be converted back to H₂\n\nEach has trade-offs in cost, density, and safety!",
      ],
    },

    safety: {
      keywords: [
        "safe",
        "safety",
        "dangerous",
        "risk",
        "explosion",
        "hazard",
        "accident",
        "secure",
      ],
      responses: [
        "Safety is paramount, and hydrogen is safer than you think! 🛡️\n\n✅ Natural Safety Features:\n• Lighter than air - disperses upward quickly\n• Non-toxic and non-poisonous\n• No environmental contamination if leaked\n\n✅ Decades of Safe Use:\n• Used in industry since 1800s\n• Space programs (rocket fuel)\n• Oil refineries worldwide\n\n✅ Modern Safety Systems:\n• Advanced leak detection\n• Automatic shut-off valves\n• Flame detectors\n• Strict building codes\n• Explosion-proof equipment\n\n⚠️ Yes, it's flammable, but:\n• Burns upward (unlike gasoline)\n• Lower radiation than gasoline fires\n• Can't explode in open air\n\nWith proper protocols, green hydrogen is as safe as natural gas!",
      ],
    },

    efficiency: {
      keywords: [
        "efficiency",
        "efficient",
        "energy loss",
        "conversion rate",
        "effective",
        "performance",
      ],
      responses: [
        "Let's break down the efficiency! 💡\n\n🔋 Electrolysis (Production):\n• Current: 60-70%\n• Best available: 70-80%\n• Future goal: 80-90%\n\n⚡ Fuel Cells (Using H₂):\n• Typical: 50-60%\n• Best systems: 60-70%\n\n🔄 Round-Trip (Store & Use):\n• Overall: 30-45%\n• Improving to: 40-50%\n\n📊 Comparison:\n• Batteries: 85-95% (better for short-term)\n• H₂: 30-45% (better for long-term storage)\n\nWhy still use H₂ if efficiency is lower?\n• Long-distance transport needs it\n• Heavy industry can't electrify directly\n• Seasonal energy storage\n• Aviation and shipping have no alternative\n\nEfficiency is improving fast with new tech!",
      ],
    },

    comparison: {
      keywords: [
        "vs battery",
        "vs electric",
        "better than",
        "comparison",
        "versus",
        "compare",
        "difference between",
        "vs batteries",
        "battery vs hydrogen",
      ],
      responses: [
        "Great question! They're complementary, not competitive 🤝\n\n⚡ BATTERIES:\n✅ Higher efficiency (85-95%)\n✅ Better for short distances\n✅ Cheaper for small scale\n✅ Mature technology\n❌ Heavy (limits range)\n❌ Slow charging\n❌ Limited lifecycle\n❌ Expensive at large scale\n\n💚 GREEN HYDROGEN:\n✅ Long-distance transport\n✅ Quick refueling (5 mins)\n✅ Lightweight\n✅ Unlimited storage duration\n✅ Scalable to TWh\n❌ Lower efficiency (30-45%)\n❌ More expensive currently\n❌ Infrastructure needed\n\n🎯 Best Use:\n• Batteries → Cars, home storage\n• Hydrogen → Trucks, ships, planes, industry, seasonal storage\n\nWe need BOTH for a clean energy future!",
      ],
    },

    future: {
      keywords: [
        "future",
        "upcoming",
        "prospects",
        "potential",
        "growth",
        "tomorrow",
        "next",
        "forecast",
        "2030",
        "2040",
        "2050",
      ],
      responses: [
        "The future is incredibly bright! 🌟\n\n📈 Market Growth:\n• 2024: ~10 million tons/year\n• 2030: 100-150 million tons/year\n• 2050: 500-600 million tons/year\n\n💰 Economic Impact:\n• 2030: $300 billion market\n• 2050: $2.5 trillion market\n• 30+ million jobs by 2050\n\n🌍 Global Adoption:\n• 90+ countries with H₂ strategies\n• $500+ billion committed investments\n• 1,000+ projects announced\n\n🎯 Key Milestones:\n• 2025: Cost parity in some applications\n• 2030: Mass production of fuel cell vehicles\n• 2035: Green steel commercially viable\n• 2040: Green aviation begins\n• 2050: 15-20% of global energy from H₂\n\nIndia aims to be a global leader and exporter!",
      ],
    },

    india: {
      keywords: [
        "india",
        "indian",
        "national hydrogen mission",
        "india hydrogen",
        "indian market",
        "indian production",
      ],
      responses: [
        "India is going ALL IN on green hydrogen! 🇮🇳\n\n🎯 National Green Hydrogen Mission:\n• Launched: January 2023\n• Budget: ₹19,744 crore ($2.4 billion)\n• Target: 5 MMT production by 2030\n• Goal: Become global hub & exporter\n\n💪 India's Advantages:\n• Abundant solar resources\n• Strong wind potential\n• Low production costs\n• Growing manufacturing base\n• Tech-savvy workforce\n\n🏭 Major Initiatives:\n• Green Hydrogen Hubs\n• Production incentives\n• R&D funding\n• Pilot projects in steel, refining\n• Export corridors to Europe/Asia\n\n📊 Impact:\n• Create 6 lakh+ jobs\n• Reduce import dependence\n• ₹8 lakh crore investment potential\n• Cut 50 MMT CO₂ emissions\n\nIndia could produce the cheapest green H₂ in the world!",
      ],
    },

    environment: {
      keywords: [
        "environment",
        "climate",
        "emissions",
        "carbon",
        "pollution",
        "eco friendly",
        "green",
        "clean",
        "sustainable",
      ],
      responses: [
        "Green hydrogen is a climate game-changer! 🌍\n\n✅ Zero Emissions:\n• Production: 0 kg CO₂\n• Usage: Only water vapor\n• Complete lifecycle: Carbon neutral\n\n🌡️ Climate Impact:\n• Can cut global emissions by 6 Gt CO₂/year\n• Essential to meet Paris Agreement goals\n• Decarbonizes hard-to-electrify sectors\n\n🏭 Industrial Revolution:\n• Green steel (90% less emissions)\n• Clean ammonia for fertilizers\n• Sustainable chemicals\n\n💧 Water Use:\n• Needs 9 liters water per kg H₂\n• Can use seawater (with desalination)\n• Returns water when used in fuel cells\n\n🌱 Additional Benefits:\n• No air pollution (SOx, NOx)\n• No water pollution\n• No soil contamination\n\nIt's the key to a sustainable future!",
      ],
    },

    vehicles: {
      keywords: [
        "vehicles",
        "cars",
        "trucks",
        "transportation",
        "fuel cell",
        "fcev",
        "automobile",
        "automotive",
      ],
      responses: [
        "Hydrogen vehicles are hitting the roads! 🚗💨\n\n🚙 Passenger Cars:\n• Models: Toyota Mirai, Hyundai Nexo\n• Range: 400-600 km per tank\n• Refueling: 3-5 minutes\n• Emissions: Only water!\n\n🚚 Heavy-Duty Trucks:\n• Perfect for long-haul (1000+ km)\n• Major players: Nikola, Hyundai, Daimler\n• Lower total cost than diesel by 2030\n\n🚌 Buses:\n• 50+ cities using H₂ buses\n• Zero emissions in city centers\n• Quieter than diesel\n\n⚓ Ships & Ferries:\n• First H₂ ferries operational\n• Maersk planning H₂ container ships\n• Cruise ships going green\n\n✈️ Aviation (Future):\n• H₂ planes by 2035-2040\n• Airbus leading development\n• Zero carbon long-haul flights\n\nThe transport revolution is here!",
      ],
    },

    electrolyzers: {
      keywords: [
        "electrolyzer",
        "electrolyser",
        "electrolysis",
        "alkaline",
        "pem",
        "soec",
        "technology",
      ],
      responses: [
        "Let's dive into electrolyzer tech! ⚙️\n\n1️⃣ Alkaline Electrolyzers:\n• Most mature technology\n• Lower cost\n• 60-70% efficiency\n• Large-scale production\n• Used for decades\n\n2️⃣ PEM (Proton Exchange Membrane):\n• Higher efficiency (70-80%)\n• Compact design\n• Fast response to renewables\n• More expensive\n• Growing fast\n\n3️⃣ SOEC (Solid Oxide):\n• Highest efficiency (80-90%)\n• Can use waste heat\n• Still in development\n• Most promising for future\n\n4️⃣ AEM (Anion Exchange):\n• Emerging technology\n• Combines benefits of alkaline & PEM\n• Lower cost materials\n\n📊 Market:\n• Cost dropping 50% by 2030\n• Capacity doubling every 2 years\n• Gigawatt-scale factories coming\n\nTech is evolving rapidly!",
      ],
    },

    challenges: {
      keywords: [
        "challenges",
        "problems",
        "issues",
        "difficulties",
        "obstacles",
        "barriers",
        "disadvantages",
        "cons",
        "drawbacks",
      ],
      responses: [
        "Let's be honest about the challenges 🎯\n\n💰 Current Issues:\n• High production cost ($4-7/kg)\n• Expensive infrastructure needed\n• Lower efficiency than batteries\n• Limited refueling stations\n\n🔧 Technical Hurdles:\n• Storage complexity\n• Transportation costs\n• Electrolyzer scaling\n• Material durability\n\n📋 Policy Gaps:\n• Standards still developing\n• Certification processes\n• Cross-border regulations\n\n✅ BUT - Solutions Emerging:\n• Costs dropping 50% by 2030\n• 1000+ projects announced\n• Governments investing billions\n• Technology improving fast\n• Infrastructure being built\n\n💪 What's Helping:\n• Economies of scale\n• R&D breakthroughs\n• Policy support\n• Private investment\n\nEvery major technology faced challenges initially. Green hydrogen is on track to overcome these!",
      ],
    },

    jobs: {
      keywords: [
        "jobs",
        "employment",
        "career",
        "work",
        "opportunities",
        "hiring",
      ],
      responses: [
        "Green hydrogen is creating massive job opportunities! 💼\n\n📊 Job Projections:\n• 2030: 5-10 million jobs globally\n• 2050: 30+ million jobs\n• India: 6+ lakh jobs by 2030\n\n🎓 Career Paths:\n• Engineers (chemical, mechanical, electrical)\n• Plant operators\n• R&D scientists\n• Safety specialists\n• Project managers\n• Business development\n• Policy advisors\n\n🏭 Sectors Hiring:\n• Electrolyzer manufacturers\n• Energy companies\n• Automotive industry\n• Infrastructure developers\n• Consulting firms\n• Startups\n\n💪 Skills Needed:\n• Engineering fundamentals\n• Renewable energy knowledge\n• Process optimization\n• Safety protocols\n• Data analysis\n\n🚀 India's Opportunity:\n• Growing manufacturing hub\n• Competitive salaries\n• Export industry potential\n\nThe hydrogen economy is creating the jobs of tomorrow!",
      ],
    },

    contact: {
      keywords: [
        "contact",
        "reach",
        "email",
        "phone",
        "get in touch",
        "talk",
        "connect",
        "call",
        "message",
      ],
      responses: [
        "I'd love to connect you with our team! 📧\n\n📬 Contact Information:\n📧 Email: greenh2-admin@gmail.com\n📱 Phone: +91 9876543210\n\n⏰ Response Time:\n• Usually within 24 hours\n• Business hours: Mon-Fri, 9 AM - 6 PM IST\n\n💬 What We Can Help With:\n• Project consultations\n• Technical queries\n• Partnership opportunities\n• Investment information\n• Custom solutions\n\n👇 You can also scroll down to our contact section on this page to send us a message directly!\n\nLooking forward to hearing from you! 🚀",
      ],
    },

    thanks: {
      keywords: ["thank", "thanks", "appreciate", "grateful", "thx"],
      responses: [
        "You're very welcome! 😊 Happy to help with green hydrogen!",
        "My pleasure! Feel free to ask anything else about green hydrogen! 💚",
        "Glad I could help! The more people know about green hydrogen, the better! 🌍",
        "Anytime! Together we're building a cleaner future! ⚡",
      ],
    },

    goodbye: {
      keywords: ["bye", "goodbye", "see you", "later", "leave", "exit"],
      responses: [
        "Goodbye! Feel free to come back anytime with more questions! 👋",
        "See you later! Keep exploring green hydrogen! 💚",
        "Take care! Remember, the future is green! 🌿",
        "Bye! Stay curious about clean energy! ⚡",
      ],
    },

    default: {
      responses: [
        "That's an interesting question! 🤔 While I don't have specific info on that, I can help you with:\n\n• What is green hydrogen & how it works\n• Benefits, applications & use cases\n• Cost, efficiency & economics\n• Storage methods & safety\n• Future prospects & opportunities\n• India's hydrogen mission\n• Environmental impact\n• Vehicles & transportation\n• Jobs & careers\n\nWhat would you like to explore?",
        "I'm not sure about that specific detail, but I'm here to answer questions about:\n\n✅ Green hydrogen production\n✅ Benefits and applications\n✅ Technology and efficiency\n✅ Safety and storage\n✅ Future market trends\n✅ India's initiatives\n\nWhat interests you most? 🚀",
      ],
    },
  };

  // Function to find the best matching response
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();

    // Check each category
    for (const [category, data] of Object.entries(qaDatabase)) {
      if (category === "default") continue;

      const matched = data.keywords.some((keyword) => msg.includes(keyword));
      if (matched) {
        const responses = data.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // Default response if no match
    const defaultResponses = qaDatabase.default.responses;
    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  // Handle message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      // Add user message
      setMessages((prev) => [...prev, { type: "user", text: inputMessage }]);
      const userMsg = inputMessage;
      setInputMessage("");

      // Show typing indicator
      setIsTyping(true);

      // Simulate bot thinking and typing (realistic delay)
      setTimeout(() => {
        setIsTyping(false);
        const botResponse = getBotResponse(userMsg);
        setMessages((prev) => [...prev, { type: "bot", text: botResponse }]);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-8 py-5 transition-all duration-500 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur-xl shadow-lg shadow-cyan-500/5 border-b border-slate-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <Droplets className="w-7 h-7 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
              <div className="absolute inset-0 blur-xl bg-cyan-500 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              HydraGrid
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1 bg-slate-900/60 backdrop-blur-md border border-slate-700/30 rounded-full px-2 py-2 shadow-lg shadow-slate-900/50">
              <a
                href="#solution"
                className="px-5 py-2 rounded-full hover:bg-slate-800/70 transition-all text-sm font-medium text-slate-300 hover:text-cyan-400"
              >
                Solution
              </a>
              <a
                href="#impact"
                className="px-5 py-2 rounded-full hover:bg-slate-800/70 transition-all text-sm font-medium text-slate-300 hover:text-cyan-400"
              >
                Impact
              </a>
              <a
                href="#energy-sources"
                className="px-5 py-2 rounded-full hover:bg-slate-800/70 transition-all text-sm font-medium text-slate-300 hover:text-cyan-400"
              >
                Energy
              </a>
              <button
                onClick={() => onNavigate("simulator")}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 hover:from-cyan-400 hover:via-blue-400 hover:to-emerald-400 transition-all text-sm font-medium text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-105"
              >
                Simulator
              </button>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-slate-900/60 backdrop-blur-sm transition-all text-slate-300 hover:text-cyan-400 border border-transparent hover:border-slate-700/30">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Log In</span>
            </button>

            <button
              onClick={() => onNavigate("signup")}
              className="rounded-full px-6 py-2.5 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105"
            >
              GET STARTED
            </button>
          </div>

          <button
            className="md:hidden text-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/30 shadow-2xl">
            <div className="flex flex-col space-y-4">
              <a
                href="#solution"
                className="text-slate-300 hover:text-cyan-400 transition-all font-medium"
              >
                Solution
              </a>
              <a
                href="#impact"
                className="text-slate-300 hover:text-cyan-400 transition-all font-medium"
              >
                Impact
              </a>
              <a
                href="#energy-sources"
                className="text-slate-300 hover:text-cyan-400 transition-all font-medium"
              >
                Energy Sources
              </a>
              <button
                onClick={() => onNavigate("simulator")}
                className="text-left text-cyan-400 hover:text-cyan-300 transition-all font-medium"
              >
                Launch Simulator
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div
            className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${
                mousePosition.y * 0.02
              }px)`,
            }}
          ></div>
          <div
            className="absolute top-1/3 right-0 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
            style={{
              animationDelay: "1s",
              transform: `translate(${mousePosition.x * -0.015}px, ${
                mousePosition.y * 0.015
              }px)`,
            }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-500 rounded-full filter blur-3xl animate-pulse"
            style={{
              animationDelay: "2s",
              transform: `translate(${mousePosition.x * 0.01}px, ${
                mousePosition.y * -0.01
              }px)`,
            }}
          ></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${
                  5 + Math.random() * 10
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px) translateX(0px); }
              25% { transform: translateY(-20px) translateX(10px); }
              50% { transform: translateY(-40px) translateX(-10px); }
              75% { transform: translateY(-20px) translateX(5px); }
            }
          `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center py-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
            Hydrogen Production from
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Renewable Energy
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl mb-12 text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Design smart process systems for production, storage, and
            transportation of Green Hydrogen
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => onNavigate("simulator")}
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 hover:from-cyan-400 hover:via-blue-400 hover:to-emerald-400 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-xl shadow-cyan-500/20"
            >
              <span>Launch Simulator</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: "100%", label: "Clean Energy" },
              { value: "Zero", label: "Emissions" },
              { value: "24/7", label: "Production" },
              { value: "∞", label: "Scalability" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-700/30 rounded-2xl p-6 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/20"
              >
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Challenges Section */}
      <section
        id="solution"
        data-animate
        className="py-32 px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible.solution
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">
                Innovation Opportunities
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Solution Challenges
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Key areas for innovation and development in green hydrogen
              technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Hydrogen Storage Optimization",
                desc: "Develop energy-efficient methods for large-scale hydrogen storage.",
                gradient: "from-cyan-500/10 via-blue-500/10 to-transparent",
                borderColor: "cyan-500",
                iconColor: "cyan-400",
                glowColor: "cyan-500",
              },
              {
                icon: Zap,
                title: "Electrolyzer Efficiency",
                desc: "Enhance water-splitting processes to reduce power consumption.",
                gradient: "from-blue-500/10 via-cyan-500/10 to-transparent",
                borderColor: "blue-500",
                iconColor: "blue-400",
                glowColor: "blue-500",
              },
              {
                icon: BarChart3,
                title: "Smart Energy Grids",
                desc: "Integrate AI-driven systems for renewable energy balancing.",
                gradient: "from-emerald-500/10 via-cyan-500/10 to-transparent",
                borderColor: "emerald-500",
                iconColor: "emerald-400",
                glowColor: "emerald-500",
              },
              {
                icon: Leaf,
                title: "Carbon-Neutral Transport",
                desc: "Design hydrogen-based fueling for logistics and EVs.",
                gradient: "from-cyan-500/10 via-emerald-500/10 to-transparent",
                borderColor: "cyan-500",
                iconColor: "cyan-400",
                glowColor: "cyan-500",
              },
              {
                icon: Shield,
                title: "Industrial Decarbonization",
                desc: "Apply hydrogen systems to replace fossil fuels in industries.",
                gradient: "from-blue-500/10 via-emerald-500/10 to-transparent",
                borderColor: "blue-500",
                iconColor: "blue-400",
                glowColor: "blue-500",
              },
              {
                icon: TrendingUp,
                title: "Global Scalability",
                desc: "Model real-time hydrogen production for diverse climates.",
                gradient: "from-emerald-500/10 via-blue-500/10 to-transparent",
                borderColor: "emerald-500",
                iconColor: "emerald-400",
                glowColor: "emerald-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`group relative bg-gradient-to-br ${
                  item.gradient
                } bg-slate-900/60 backdrop-blur-md border border-slate-700/30 hover:border-${
                  item.borderColor
                }/50 rounded-3xl p-8 transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-${
                  item.glowColor
                }/20 ${
                  isVisible.solution
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br from-${item.borderColor}/20 to-transparent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg shadow-${item.glowColor}/10`}
                >
                  <item.icon className={`w-8 h-8 text-${item.iconColor}`} />
                </div>
                <div className="text-2xl font-bold mb-4 text-slate-100">
                  {item.title}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Animated corner accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${item.borderColor}/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section
        id="impact"
        data-animate
        className="py-32 px-6 lg:px-8 bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible.impact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-emerald-500/20 mb-6 shadow-lg">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">
                Environmental Impact
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Transforming the Future
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Our green hydrogen solutions are making a measurable impact on
              global sustainability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                value: "2.5M",
                label: "Tons CO₂ Reduced",
                icon: Leaf,
                color: "emerald",
                suffix: "tons/year",
              },
              {
                value: "15+",
                label: "Stakeholders Engaged",
                icon: TrendingUp,
                color: "cyan",
                suffix: "worldwide",
              },
              {
                value: "50GW",
                label: "Clean Energy Generated",
                icon: Zap,
                color: "blue",
                suffix: "capacity",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`group relative bg-slate-900/60 backdrop-blur-md border border-slate-700/30 rounded-3xl p-8 hover:border-${
                  stat.color
                }-500/50 transition-all duration-500 hover:scale-105 shadow-xl ${
                  isVisible.impact
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br from-${stat.color}-500/20 to-transparent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className={`w-7 h-7 text-${stat.color}-400`} />
                  </div>
                  <div
                    className={`text-xs font-medium text-${stat.color}-400 bg-${stat.color}-500/10 px-3 py-1 rounded-full`}
                  >
                    {stat.suffix}
                  </div>
                </div>
                <div
                  className={`text-5xl font-bold text-${stat.color}-400 mb-2 group-hover:scale-110 transition-transform`}
                >
                  {stat.value}
                </div>
                <div className="text-lg text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Energy Sources Section */}
      <section
        id="energy-sources"
        data-animate
        className="py-32 px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.2),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible["energy-sources"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-blue-500/20 mb-6 shadow-lg">
              <Sun className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">
                Renewable Power
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Powered by Nature
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Multiple renewable energy sources working in harmony to produce
              clean hydrogen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sun,
                title: "Solar Energy",
                desc: "Harnessing photovoltaic technology to convert sunlight into clean electricity for electrolysis.",
                color: "blue",
                stats: "40% capacity factor",
              },
              {
                icon: Wind,
                title: "Wind Power",
                desc: "Utilizing offshore and onshore wind turbines for consistent, renewable energy generation.",
                color: "cyan",
                stats: "35% capacity factor",
              },
              {
                icon: Droplets,
                title: "Hydroelectric",
                desc: "Leveraging water flow and gravity to provide stable, baseload renewable power.",
                color: "emerald",
                stats: "25% capacity factor",
              },
            ].map((source, idx) => (
              <div
                key={idx}
                className={`group relative bg-slate-900/60 backdrop-blur-md border border-slate-700/30 hover:border-${
                  source.color
                }-500/50 rounded-3xl p-8 transition-all duration-500 hover:scale-105 shadow-xl overflow-hidden ${
                  isVisible["energy-sources"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${source.color}-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}
                ></div>

                <div
                  className={`relative w-20 h-20 bg-gradient-to-br from-${source.color}-500/20 to-transparent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                >
                  <source.icon
                    className={`w-10 h-10 text-${source.color}-400`}
                  />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-slate-100">
                  {source.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {source.desc}
                </p>

                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-${source.color}-500/10 border border-${source.color}-500/20`}
                >
                  <Activity className={`w-4 h-4 text-${source.color}-400`} />
                  <span
                    className={`text-xs font-medium text-${source.color}-400`}
                  >
                    {source.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section
        id="contact"
        data-animate
        className="py-32 px-6 lg:px-8 bg-slate-950 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible.contact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 mb-6 shadow-lg">
              <User className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Ready to transform your energy future? Let's discuss how green
              hydrogen can power your operations.
            </p>
          </div>

          <div
            className={`bg-slate-900/60 backdrop-blur-md border border-slate-700/30 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-1000 delay-200 ${
              isVisible.contact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10">
                    <Globe className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200 mb-1">Email</h3>
                    <a
                      href="mailto:info@greenh2.com"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      HydraGreen-admin@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <Users className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200 mb-1">
                      Phone Number
                    </h3>
                    <a
                      href="mailto:partners@greenh2.com"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      +91 9876543210
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-slate-100 placeholder-slate-500 transition-colors"
                />
                <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 hover:from-cyan-400 hover:via-blue-400 hover:to-emerald-400 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-cyan-500/20">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Chatbot */}
      {/* CHATBOT - ADD AT THE END, BEFORE CLOSING </div> */}
      <div className="fixed bottom-6 left-6 z-50">
        {chatOpen ? (
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-200 w-96 max-w-[calc(100vw-3rem)] overflow-hidden animate-slideIn">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-white">HydraGenie</h3>
                  <p className="text-xs text-emerald-100">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-emerald-700 p-2 rounded-lg transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages - THIS IS WHERE THE MESSAGES DIV GOES */}
            <div className="h-96 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === "user"
                        ? "bg-emerald-600 text-white rounded-br-none"
                        : "bg-white text-slate-900 border-2 border-slate-200 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-900 border-2 border-slate-200 rounded-2xl rounded-bl-none p-3">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-white border-t-2 border-slate-200"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 placeholder-slate-500 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 animate-bounce"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>

      <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}</style>
    </div>
  );
};
