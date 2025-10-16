import { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  BarChart, // ← ADD THIS
  Bar, // ← ADD THIS
  LineChart,
  Line,
  PieChart, // ← ADD THIS
  Pie, // ← ADD THIS
  Cell, // ← ADD THIS
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend, // ← ADD THIS
  ResponsiveContainer,
  RadarChart, // ← ADD THIS
  PolarGrid, // ← ADD THIS
  PolarAngleAxis, // ← ADD THIS
  PolarRadiusAxis, // ← ADD THIS
  Radar, // ← ADD THIS
} from "recharts";
import {
  Sun,
  Wind,
  Droplets,
  MapPin,
  Battery,
  Target,
  Gauge,
  CheckCircle,
  Activity,
  Database,
  Zap,
  MessageCircle,
  Minimize2,
  Send,
  Leaf,
  Play,
  Pause,
  RotateCcw,
  Building2,
  Check,
  ChevronRight,
  Download,
  Sparkles,
  ChevronLeft,
  Menu,
  X,
  Globe,
  Users,
  ArrowRight,
  User,
  BarChart3,
  Shield,
  Clock,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === "simulator" && (
        <SimulatorPage onNavigate={setCurrentPage} />
      )}
      {currentPage === "signup" && (
        <SignupPage onComplete={() => setCurrentPage("home")} />
      )}
    </div>
  );
};
const SignupPage = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    password: "",
  });

  const accountTypes = [
    {
      id: "organization",
      icon: Building2,
      title: "Organization Account",
      description:
        "For companies (energy firms, transporters, industries). Includes team dashboards, advanced analytics, API integrations.",
      target: "Businesses / Governments",
      gradient: "from-cyan-500/20 to-blue-600/20",
      border: "border-cyan-500/30",
      iconColor: "text-cyan-400",
    },
    {
      id: "individual",
      icon: User,
      title: "Individual Account",
      description:
        "For single users (researchers, consultants, enthusiasts). Limited scale, simple dashboards.",
      target: "Individuals / Students / Small producers",
      gradient: "from-emerald-500/20 to-green-600/20",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400",
    },
  ];

  const plans = [
    {
      id: "free",
      name: "Free / Basic",
      price: "₹0",
      period: "forever",
      icon: Zap,
      description: "Perfect for small users or demo",
      features: [
        "Access to sample data",
        "Limited monitoring & storage",
        "Basic dashboard",
        "Community support",
      ],
      gradient: "from-slate-500/20 to-slate-600/20",
      border: "border-slate-500/30",
      iconColor: "text-slate-400",
      buttonText: "Start Free",
      bestFor: "Small users or demo",
    },
    {
      id: "payg",
      name: "Pay-As-You-Go",
      price: "Usage-based",
      
      icon: TrendingUp,
      description: "Pay only for what you produce",
      features: [
        "Usage-based pricing",
        "Real-time monitoring",
        "Standard analytics",
        "Email support",
        "Ideal for scaling gradually",
      ],
      gradient: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
      iconColor: "text-blue-400",
      buttonText: "Choose Plan",
      bestFor: "Startups, small plants",
      popular: true,
    },
    {
      id: "pro",
      name: "Pro / Subscription",
      period: "per month",
      icon: Shield,
      description: "Unlimited access for organizations",
      features: [
        "Unlimited dashboards",
        "Advanced analytics",
        "AI optimization",
        "Carbon tracking",
        "API access",
        "Priority support",
      ],
      gradient: "from-emerald-500/20 to-emerald-600/20",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      buttonText: "Go Pro",
      bestFor: "Established organizations",
    },
    {
      id: "enterprise",
      name: "Enterprise / Custom",
      price: "Custom",
      period: "pricing",
      icon: Building2,
      description: "Tailored for large-scale operations",
      features: [
        "On-premise deployment",
        "Team management",

        "Custom features",
        "Dedicated support",
        "SLA guarantee",
      ],
      gradient: "from-cyan-500/20 to-purple-600/20",
      border: "border-cyan-500/30",
      iconColor: "text-cyan-400",
      buttonText: "Contact Sales",
      bestFor: "Governments / Large energy firms",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAccountTypeSelect = (type) => {
    setAccountType(type);
    setStep(2);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setStep(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", { accountType, selectedPlan, formData });
    onComplete();
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-cyan-400 w-10 h-10" />
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Join Green Hydrogen Platform
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Start your journey towards sustainable energy production
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-slate-800/50 text-slate-500 border border-slate-700/30"
                }`}
              >
                {step > s ? <Check size={20} /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 mx-2 rounded-full transition-all ${
                    step > s
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "bg-slate-700/30"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-slate-200 mb-2">
            {step === 1 && "Step 1: Choose Account Type"}
            {step === 2 && "Step 2: Select Your Plan"}
            {step === 3 && "Step 3: Complete Your Profile"}
          </h2>
          <p className="text-slate-400">
            {step === 1 && "Select the account type that best fits your needs"}
            {step === 2 && "Choose a plan that matches your requirements"}
            {step === 3 && "Fill in your details to get started"}
          </p>
        </div>

        {/* Step 1: Account Type Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {accountTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => handleAccountTypeSelect(type.id)}
                className={`bg-gradient-to-br ${type.gradient} backdrop-blur-xl rounded-3xl p-8 border ${type.border} hover:scale-105 transition-all shadow-2xl cursor-pointer group`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`p-4 rounded-2xl bg-slate-900/50 ${type.iconColor} group-hover:scale-110 transition-transform`}
                  >
                    <type.icon size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm text-cyan-400 font-medium">
                      {type.target}
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {type.description}
                </p>
                <button className="w-full py-3 bg-slate-900/50 hover:bg-slate-800/50 text-white rounded-full font-bold transition-all flex items-center justify-center gap-2 group-hover:gap-4">
                  Select
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Plan Selection */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handlePlanSelect(plan.id)}
                className={`bg-gradient-to-br ${plan.gradient} backdrop-blur-xl rounded-3xl p-6 border ${plan.border} hover:scale-105 transition-all shadow-2xl cursor-pointer relative group`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                    POPULAR
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <plan.icon className={`${plan.iconColor} w-8 h-8`} />
                  <div
                    className={`w-3 h-3 rounded-full ${plan.iconColor.replace(
                      "text",
                      "bg"
                    )} animate-pulse`}
                  ></div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-cyan-400">
                    {plan.price}
                  </span>
                  <span className="text-slate-400 text-sm ml-2">
                    {plan.period}
                  </span>
                </div>

                <p className="text-slate-300 text-sm mb-4">
                  {plan.description}
                </p>

                <div className="mb-6 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check
                        size={16}
                        className="text-emerald-400 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-400 mb-4 italic">
                  Best for: {plan.bestFor}
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-full font-bold transition-all shadow-lg group-hover:shadow-cyan-500/30">
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Step 3: Form */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                {accountType === "organization" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="Your company name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="Create a strong password"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-full font-bold transition-all border border-slate-700/30"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-full font-bold transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>

            <p className="text-center text-slate-400 text-sm mt-6">
              Already have an account?{" "}
              <button
                onClick={() => onComplete()}
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
const HomePage = ({ onNavigate }) => {
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

const SimulatorPage = ({ onNavigate }) => {
  // Tab navigation
  const [currentTab, setCurrentTab] = useState(0);
  
  // Tab 1: Location
  const [location, setLocation] = useState({ city: '', state: '', country: '' });
  
  // Tab 2: Renewable Energy
  const [energySource, setEnergySource] = useState('solar');
  const [energyCapacity, setEnergyCapacity] = useState(1000);
  const [energyUnit, setEnergyUnit] = useState('kW');
  
  // Tab 3: Electrolyzer
  const [electrolyzerType, setElectrolyzerType] = useState('PEM');
  const [electrolyzerCapacity, setElectrolyzerCapacity] = useState(500);
  const [efficiency, setEfficiency] = useState(50);
  
  // Tab 4: Storage
  const [storageType, setStorageType] = useState('compressed');
  const [storageCapacity, setStorageCapacity] = useState(100);
  
  // Tab 5: Production Parameters
  const [targetProduction, setTargetProduction] = useState(50);
  const [purity, setPurity] = useState(99.9);
  
  // Tab 6: Infrastructure
  const [gridCapacity, setGridCapacity] = useState(1500);
  const [waterSupply, setWaterSupply] = useState(10);
  const [distanceToUser, setDistanceToUser] = useState(5);
  
  // Simulation state
  const [isRunning, setIsRunning] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);
  const timeCounter = useRef(0);

  const tabs = [
    { id: 0, name: "Location", icon: MapPin },
    { id: 1, name: "Energy Source", icon: Zap },
    { id: 2, name: "Electrolyzer", icon: Activity },
    { id: 3, name: "Storage", icon: Battery},
    { id: 4, name: "Production", icon: Target },
    { id: 5, name: "Infrastructure", icon: Gauge}
  ]
  const calculateOutputs = () => {
    const capacityInKW = energyUnit === 'MW' ? energyCapacity * 1000 : energyCapacity;
    const efficiencyFactor = efficiency / 100;
    const hydrogenRate = ((capacityInKW * efficiencyFactor) / 50).toFixed(2);
    const storageTank = Math.min(((timeCounter.current * parseFloat(hydrogenRate)) / storageCapacity) * 100, 95);
    const powerConsumption = (capacityInKW * 0.85).toFixed(1);
    const co2Savings = (hydrogenRate * 9.5).toFixed(2);
    const waterUsed = (hydrogenRate * 9).toFixed(2);

    return {
      hydrogenRate,
      storageTank,
      powerConsumption,
      co2Savings,
      waterUsed,
      efficiency: efficiencyFactor * 100
    };
  };

  const outputs = calculateOutputs();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      timeCounter.current += 1;
      const timestamp = new Date(Date.now() - (100 - timeCounter.current) * 36000).toLocaleTimeString();

      setHistoricalData((prev) => {
        const newData = [
          ...prev,
          {
            time: timestamp,
            hydrogen: parseFloat(outputs.hydrogenRate),
            storage: outputs.storageTank,
            power: parseFloat(outputs.powerConsumption),
            water: parseFloat(outputs.waterUsed),
            efficiency: outputs.efficiency
          }
        ];
        return newData.slice(-50);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, outputs.hydrogenRate, outputs.storageTank, outputs.powerConsumption, outputs.waterUsed, outputs.efficiency]);

  const handleReset = () => {
    setIsRunning(false);
    timeCounter.current = 0;
    setHistoricalData([]);
  };

  const handleExport = () => {
    const csv = [
      ['Time', 'Hydrogen (kg/h)', 'Storage (%)', 'Power (kW)', 'Water (L)', 'Efficiency (%)'],
      ...historicalData.map((d) => [d.time, d.hydrogen, d.storage, d.power, d.water, d.efficiency])
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hydrogen_data.csv';
    a.click();
  };

  const nextTab = () => {
    if (currentTab < tabs.length - 1) setCurrentTab(currentTab + 1);
  };

  const prevTab = () => {
    if (currentTab > 0) setCurrentTab(currentTab - 1);
  };

  // Chart data generators
  const getEnergySourceData = () => {
    const sources = ['Solar', 'Wind', 'Hydro'];
    return sources.map(source => ({
      name: source,
      capacity: source.toLowerCase() === energySource ? (energyUnit === 'MW' ? energyCapacity * 1000 : energyCapacity) : 0,
      potential: source === 'Solar' ? 1500 : source === 'Wind' ? 1200 : 800
    }));
  };

  const getElectrolyzerComparisonData = () => {
    return [
      { name: 'PEM', efficiency: 65, cost: 1200, lifespan: 60000, selected: electrolyzerType === 'PEM' },
      { name: 'Alkaline', efficiency: 62, cost: 800, lifespan: 90000, selected: electrolyzerType === 'Alkaline' },
      { name: 'SOEC', efficiency: 85, cost: 2000, lifespan: 40000, selected: electrolyzerType === 'SOEC' }
    ];
  };

  const getStorageComparisonData = () => {
    return [
      { type: 'Compressed', energy: 1.5, safety: 85, cost: 500 },
      { type: 'Liquid', energy: 2.4, safety: 75, cost: 1200 }
    ];
  };

  const getProductionForecastData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      target: targetProduction,
      actual: targetProduction * (0.85 + Math.random() * 0.15),
      purity: purity - Math.random() * 0.5
    }));
  };

  const getInfrastructureData = () => {
    return [
      { name: 'Grid', capacity: gridCapacity, usage: parseFloat(outputs.powerConsumption) },
      { name: 'Water', capacity: waterSupply * 1000, usage: parseFloat(outputs.waterUsed) },
      { name: 'Storage', capacity: storageCapacity, usage: (outputs.storageTank / 100) * storageCapacity }
    ];
  };

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/30 hover:border-cyan-500/50 transition-all text-slate-300 hover:text-cyan-400"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <Sparkles className="text-cyan-400 w-8 h-8" />
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              H₂ Production Simulator
            </h1>
          </div>

          <div className="w-32"></div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-4 mb-6 shadow-2xl">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                  currentTab === tab.id
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-cyan-400'
                }`}
              >
                <span className="text-2xl">{tab.emoji}</span>
                <span className="text-xs font-bold text-center">{tab.name}</span>
                {currentTab > tab.id && (
                  <CheckCircle className="w-4 h-4 text-emerald-400 absolute top-2 right-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Input Panel */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{tabs[currentTab].emoji}</span>
              <h2 className="text-2xl font-bold text-cyan-400">{tabs[currentTab].name}</h2>
            </div>

            {/* Tab 0: Location */}
            {currentTab === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
                  <input
                    type="text"
                    value={location.city}
                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                    placeholder="e.g., Los Angeles"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">State</label>
                  <input
                    type="text"
                    value={location.state}
                    onChange={(e) => setLocation({ ...location, state: e.target.value })}
                    placeholder="e.g., California"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Country</label>
                  <input
                    type="text"
                    value={location.country}
                    onChange={(e) => setLocation({ ...location, country: e.target.value })}
                    placeholder="e.g., United States"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-sm text-slate-400">
                    <span className="font-bold text-cyan-400">Location:</span> {location.city || 'N/A'}, {location.state || 'N/A'}, {location.country || 'N/A'}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 1: Energy Source */}
            {currentTab === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Energy Source</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['solar', 'wind', 'hydro'].map((source) => (
                      <button
                        key={source}
                        onClick={() => setEnergySource(source)}
                        className={`p-4 rounded-xl transition-all ${
                          energySource === source
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                        }`}
                      >
                        {source === 'solar' && <Sun className="w-6 h-6 mx-auto mb-2" />}
                        {source === 'wind' && <Wind className="w-6 h-6 mx-auto mb-2" />}
                        {source === 'hydro' && <Droplets className="w-6 h-6 mx-auto mb-2" />}
                        <span className="text-xs font-bold capitalize">{source}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Capacity: {energyCapacity} {energyUnit}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={energyCapacity}
                    onChange={(e) => setEnergyCapacity(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #06b6d4 ${(energyCapacity / 5000) * 100}%, #1e293b ${(energyCapacity / 5000) * 100}%)`
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Unit</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['kW', 'MW'].map((unit) => (
                      <button
                        key={unit}
                        onClick={() => setEnergyUnit(unit)}
                        className={`p-3 rounded-xl transition-all font-bold ${
                          energyUnit === unit
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Electrolyzer */}
            {currentTab === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Electrolyzer Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['PEM', 'Alkaline', 'SOEC'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setElectrolyzerType(type)}
                        className={`p-4 rounded-xl transition-all ${
                          electrolyzerType === type
                            ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-lg'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                        }`}
                      >
                        <Zap className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-xs font-bold">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Capacity: {electrolyzerCapacity} kW
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={electrolyzerCapacity}
                    onChange={(e) => setElectrolyzerCapacity(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 ${(electrolyzerCapacity / 2000) * 100}%, #1e293b ${(electrolyzerCapacity / 2000) * 100}%)`
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Efficiency: {efficiency} kWh/kg H₂
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="85"
                    step="1"
                    value={efficiency}
                    onChange={(e) => setEfficiency(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f59e0b ${((efficiency - 40) / 45) * 100}%, #1e293b ${((efficiency - 40) / 45) * 100}%)`
                    }}
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Storage */}
            {currentTab === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Storage Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['compressed', 'liquid'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setStorageType(type)}
                        className={`p-4 rounded-xl transition-all ${
                          storageType === type
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                        }`}
                      >
                        <Battery className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-xs font-bold capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Storage Capacity: {storageCapacity} kg H₂
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={storageCapacity}
                    onChange={(e) => setStorageCapacity(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 ${(storageCapacity / 1000) * 100}%, #1e293b ${(storageCapacity / 1000) * 100}%)`
                    }}
                  />
                </div>
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-sm text-slate-400 mb-2">
                    <span className="font-bold text-blue-400">Type:</span> {storageType === 'compressed' ? 'Compressed (350-700 bar)' : 'Liquid (-253°C)'}
                  </p>
                  <p className="text-sm text-slate-400">
                    <span className="font-bold text-blue-400">Energy Density:</span> {storageType === 'compressed' ? '1.5 kWh/kg' : '2.4 kWh/kg'}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 4: Production Parameters */}
            {currentTab === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Target Production: {targetProduction} kg/day
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={targetProduction}
                    onChange={(e) => setTargetProduction(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 ${(targetProduction / 500) * 100}%, #1e293b ${(targetProduction / 500) * 100}%)`
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Purity: {purity.toFixed(1)}%
                  </label>
                  <input
                    type="range"
                    min="95"
                    max="99.999"
                    step="0.1"
                    value={purity}
                    onChange={(e) => setPurity(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ec4899 ${((purity - 95) / 4.999) * 100}%, #1e293b ${((purity - 95) / 4.999) * 100}%)`
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-xs text-slate-400 mb-1">Annual Production</p>
                    <p className="text-2xl font-bold text-purple-400">{(targetProduction * 365).toLocaleString()} kg</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-pink-500/30">
                    <p className="text-xs text-slate-400 mb-1">Quality Grade</p>
                    <p className="text-2xl font-bold text-pink-400">
                      {purity >= 99.9 ? 'Ultra Pure' : purity >= 99 ? 'High' : 'Standard'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Infrastructure */}
            {currentTab === 5 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Grid Capacity: {gridCapacity} kVA
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={gridCapacity}
                    onChange={(e) => setGridCapacity(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f59e0b ${(gridCapacity / 5000) * 100}%, #1e293b ${(gridCapacity / 5000) * 100}%)`
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Water Supply: {waterSupply} m³/hr
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={waterSupply}
                    onChange={(e) => setWaterSupply(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #06b6d4 ${(waterSupply / 50) * 100}%, #1e293b ${(waterSupply / 50) * 100}%)`
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Distance to User: {distanceToUser} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={distanceToUser}
                    onChange={(e) => setDistanceToUser(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 ${(distanceToUser / 100) * 100}%, #1e293b ${(distanceToUser / 100) * 100}%)`
                    }}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={prevTab}
                disabled={currentTab === 0}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/50 text-slate-400 rounded-xl font-bold transition-all hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={nextTab}
                disabled={currentTab === tabs.length - 1}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold transition-all hover:from-cyan-400 hover:to-blue-400 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Visualization Panel */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              Live Analytics
            </h3>
            {/* Tab 0: Location - World Map Placeholder */}
            {currentTab === 0 && (
              <div className="space-y-4">
                <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/40 h-96 flex items-center justify-center relative overflow-hidden">
                  {/* Animated background grid */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)',
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>
                  
                  <div className="text-center relative z-10">
                    <div className="relative inline-block mb-4">
                      <MapPin className="w-20 h-20 text-cyan-400 mx-auto" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-ping"></div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full"></div>
                    </div>
                    <p className="text-slate-400 text-lg font-medium">
                      {location.city && location.country ? (
                        <>Location: <span className="text-cyan-400 font-bold">{location.city}, {location.country}</span></>
                      ) : (
                        'Enter location details to see renewable potential'
                      )}
                    </p>
                    {location.city && location.state && location.country && (
                      <div className="mt-4 inline-block bg-cyan-500/20 border border-cyan-500/50 rounded-full px-6 py-2">
                        <p className="text-cyan-300 text-sm font-medium">
                          📍 {location.city}, {location.state}, {location.country}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-amber-500/10 to-slate-800/40 rounded-xl p-4 border border-amber-500/20">
                    <Sun className="w-8 h-8 text-amber-400 mb-2" />
                    <p className="text-xs text-slate-400">Solar Potential</p>
                    <p className="text-2xl font-bold text-amber-400">High</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500/10 to-slate-800/40 rounded-xl p-4 border border-cyan-500/20">
                    <Wind className="w-8 h-8 text-cyan-400 mb-2" />
                    <p className="text-xs text-slate-400">Wind Potential</p>
                    <p className="text-2xl font-bold text-cyan-400">Medium</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/40 rounded-xl p-4 border border-blue-500/20">
                    <Droplets className="w-8 h-8 text-blue-400 mb-2" />
                    <p className="text-xs text-slate-400">Hydro Potential</p>
                    <p className="text-2xl font-bold text-blue-400">Low</p>
                  </div>
                </div>
              </div>
            )}

{/* Tab 1: Energy Source Comparison */}
            {currentTab === 1 && (
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getEnergySourceData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '12px',
                        padding: '12px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="capacity" fill="#06b6d4" name="Selected Capacity (kW)" />
                    <Bar dataKey="potential" fill="#10b981" name="Max Potential (kW)" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-cyan-500/20">
                  <p className="text-sm text-slate-300">
                    <span className="font-bold text-cyan-400">Current Selection:</span> {energySource.charAt(0).toUpperCase() + energySource.slice(1)} - {energyCapacity} {energyUnit}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Estimated annual energy: {(energyCapacity * (energyUnit === 'MW' ? 1000 : 1) * 8760 * 0.3).toLocaleString()} kWh
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Electrolyzer Comparison */}
            {currentTab === 2 && (
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={getElectrolyzerComparisonData()}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <PolarRadiusAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Radar name="Efficiency %" dataKey="efficiency" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '12px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-3">
                  {getElectrolyzerComparisonData().map((item) => (
                    <div
                      key={item.name}
                      className={`rounded-xl p-3 border ${
                        item.selected
                          ? 'bg-emerald-500/20 border-emerald-500/50'
                          : 'bg-slate-800/40 border-slate-700/40'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-300 mb-2">{item.name}</p>
                      <p className="text-xs text-slate-400">Eff: {item.efficiency}%</p>
                      <p className="text-xs text-slate-400">Cost: ${item.cost}/kW</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Storage Comparison */}
            {currentTab === 3 && (
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Used', value: (outputs.storageTank / 100) * storageCapacity },
                        { name: 'Available', value: storageCapacity - (outputs.storageTank / 100) * storageCapacity }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#1e293b" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4">
                  {getStorageComparisonData().map((item, idx) => (
                    <div
                      key={item.type}
                      className={`rounded-xl p-4 border ${
                        item.type.toLowerCase() === storageType
                          ? 'bg-blue-500/20 border-blue-500/50'
                          : 'bg-slate-800/40 border-slate-700/40'
                      }`}
                    >
                      <p className="text-sm font-bold text-slate-300 mb-2">{item.type}</p>
                      <p className="text-xs text-slate-400">Energy: {item.energy} kWh/kg</p>
                      <p className="text-xs text-slate-400">Safety: {item.safety}%</p>
                      <p className="text-xs text-slate-400">Cost: ${item.cost}/kg</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Production Forecast */}
            {currentTab === 4 && (
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getProductionForecastData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '12px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="target" stroke="#8b5cf6" strokeWidth={2} name="Target (kg/day)" />
                    <Line type="monotone" dataKey="actual" stroke="#ec4899" strokeWidth={2} name="Forecast (kg/day)" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-xs text-slate-400 mb-1">Daily Target</p>
                    <p className="text-3xl font-bold text-purple-400">{targetProduction} kg</p>
                  </div>
                  <div className="bg-pink-500/10 rounded-xl p-4 border border-pink-500/30">
                    <p className="text-xs text-slate-400 mb-1">Purity Level</p>
                    <p className="text-3xl font-bold text-pink-400">{purity.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Infrastructure Usage */}
            {currentTab === 5 && (
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getInfrastructureData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: '1px solid #334155',
                        borderRadius: '12px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="capacity" fill="#64748b" name="Total Capacity" />
                    <Bar dataKey="usage" fill="#06b6d4" name="Current Usage" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
                    <p className="text-xs text-slate-400">Grid Usage</p>
                    <p className="text-xl font-bold text-amber-400">
                      {((parseFloat(outputs.powerConsumption) / gridCapacity) * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="bg-cyan-500/10 rounded-xl p-3 border border-cyan-500/30">
                    <p className="text-xs text-slate-400">Water Usage</p>
                    <p className="text-xl font-bold text-cyan-400">
                      {((parseFloat(outputs.waterUsed) / (waterSupply * 1000)) * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30">
                    <p className="text-xs text-slate-400">Transport</p>
                    <p className="text-xl font-bold text-emerald-400">{distanceToUser} km</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Simulation Control & Results */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-6 shadow-2xl mb-6">
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white transition-all shadow-xl hover:scale-105 ${
                isRunning
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400'
                  : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400'
              }`}
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
              {isRunning ? 'Pause' : 'Start'} Simulation
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-full font-bold transition-all shadow-xl hover:scale-105"
            >
              <RotateCcw size={20} />
              Reset
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-3 px-8 py-4 bg-slate-800/70 border-2 border-cyan-500 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-full font-bold transition-all shadow-xl hover:scale-105"
            >
              <Download size={20} />
              Export Data
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {
                label: 'H₂ Production',
                value: outputs.hydrogenRate,
                unit: 'kg/h',
                color: 'emerald',
                icon: Activity
              },
              {
                label: 'Storage Level',
                value: outputs.storageTank.toFixed(1),
                unit: '%',
                color: 'blue',
                icon: Battery
              },
              {
                label: 'Power Usage',
                value: outputs.powerConsumption,
                unit: 'kW',
                color: 'amber',
                icon: Zap
              },
              {
                label: 'CO₂ Saved',
                value: outputs.co2Savings,
                unit: 't/day',
                color: 'cyan',
                icon: Sparkles
              },
              {
                label: 'Water Used',
                value: outputs.waterUsed,
                unit: 'L/h',
                color: 'purple',
                icon: Droplets
              }
            ].map((metric) => (
              <div
                key={metric.label}
                className={`bg-gradient-to-br from-${metric.color}-500/10 to-slate-800/40 rounded-2xl p-4 border border-${metric.color}-500/30`}
              >
                <metric.icon className={`w-5 h-5 text-${metric.color}-400 mb-2`} />
                <p className="text-xs text-slate-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold text-${metric.color}-400`}>
                  {metric.value} <span className="text-sm">{metric.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
</div>
        {/* Real-time Charts */}
        {historicalData.length > 0 && (
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/30 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              Real-time Production Data
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="hydrogenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="storageGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" strokeOpacity={0.3} />
                <XAxis
                  dataKey="time"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={{ stroke: '#334155' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                    padding: '12px'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="hydrogen"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#hydrogenGrad)"
                  name="H₂ (kg/h)"
                />
                <Area
                  type="monotone"
                  dataKey="storage"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#storageGrad)"
                  name="Storage (%)"
                />
                <Area
                  type="monotone"
                  dataKey="power"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#powerGrad)"
                  name="Power (kW)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;