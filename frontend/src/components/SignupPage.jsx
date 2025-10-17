import { useState } from "react";

import {
  Zap,
  Building2,
  Check,
  ChevronRight,
  Sparkles,
  ChevronLeft,
  User,
  Shield,
  TrendingUp,
} from "lucide-react";

export const SignupPage = ({ onComplete, onBack }) => {
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
