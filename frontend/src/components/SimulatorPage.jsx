import { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  LineChart,
  Line,
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend, 
  ResponsiveContainer,
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
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
  Zap,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Download,
  Sparkles,
  ChevronLeft,
  BarChart3,
  TrendingUp,
} from "lucide-react";

export const SimulatorPage = ({ onNavigate }) => {
  // Tab navigation
  const [currentTab, setCurrentTab] = useState(0);

  // Tab 1: Location
  const [location, setLocation] = useState({
    city: "",
    state: "",
    country: "",
  });

  // Tab 2: Renewable Energy
  const [energySource, setEnergySource] = useState("solar");
  const [energyCapacity, setEnergyCapacity] = useState(1000);
  const [energyUnit, setEnergyUnit] = useState("kW");

  // Tab 3: Electrolyzer
  const [electrolyzerType, setElectrolyzerType] = useState("PEM");
  const [electrolyzerCapacity, setElectrolyzerCapacity] = useState(500);
  const [efficiency, setEfficiency] = useState(50);

  // Tab 4: Storage
  const [storageType, setStorageType] = useState("compressed");
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
    { id: 3, name: "Storage", icon: Battery },
    { id: 4, name: "Production", icon: Target },
    { id: 5, name: "Infrastructure", icon: Gauge },
  ];
  const calculateOutputs = () => {
    const capacityInKW =
      energyUnit === "MW" ? energyCapacity * 1000 : energyCapacity;
    const efficiencyFactor = efficiency / 100;
    const hydrogenRate = ((capacityInKW * efficiencyFactor) / 50).toFixed(2);
    const storageTank = Math.min(
      ((timeCounter.current * parseFloat(hydrogenRate)) / storageCapacity) *
        100,
      95
    );
    const powerConsumption = (capacityInKW * 0.85).toFixed(1);
    const co2Savings = (hydrogenRate * 9.5).toFixed(2);
    const waterUsed = (hydrogenRate * 9).toFixed(2);

    return {
      hydrogenRate,
      storageTank,
      powerConsumption,
      co2Savings,
      waterUsed,
      efficiency: efficiencyFactor * 100,
    };
  };

  const outputs = calculateOutputs();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      timeCounter.current += 1;
      const timestamp = new Date(
        Date.now() - (100 - timeCounter.current) * 36000
      ).toLocaleTimeString();

      setHistoricalData((prev) => {
        const newData = [
          ...prev,
          {
            time: timestamp,
            hydrogen: parseFloat(outputs.hydrogenRate),
            storage: outputs.storageTank,
            power: parseFloat(outputs.powerConsumption),
            water: parseFloat(outputs.waterUsed),
            efficiency: outputs.efficiency,
          },
        ];
        return newData.slice(-50);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isRunning,
    outputs.hydrogenRate,
    outputs.storageTank,
    outputs.powerConsumption,
    outputs.waterUsed,
    outputs.efficiency,
  ]);

  const handleReset = () => {
    setIsRunning(false);
    timeCounter.current = 0;
    setHistoricalData([]);
  };

  const handleExport = () => {
    const csv = [
      [
        "Time",
        "Hydrogen (kg/h)",
        "Storage (%)",
        "Power (kW)",
        "Water (L)",
        "Efficiency (%)",
      ],
      ...historicalData.map((d) => [
        d.time,
        d.hydrogen,
        d.storage,
        d.power,
        d.water,
        d.efficiency,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hydrogen_data.csv";
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
    const sources = ["Solar", "Wind", "Hydro"];
    return sources.map((source) => ({
      name: source,
      capacity:
        source.toLowerCase() === energySource
          ? energyUnit === "MW"
            ? energyCapacity * 1000
            : energyCapacity
          : 0,
      potential: source === "Solar" ? 1500 : source === "Wind" ? 1200 : 800,
    }));
  };

  const getElectrolyzerComparisonData = () => {
    return [
      {
        name: "PEM",
        efficiency: 65,
        cost: 1200,
        lifespan: 60000,
        selected: electrolyzerType === "PEM",
      },
      {
        name: "Alkaline",
        efficiency: 62,
        cost: 800,
        lifespan: 90000,
        selected: electrolyzerType === "Alkaline",
      },
      {
        name: "SOEC",
        efficiency: 85,
        cost: 2000,
        lifespan: 40000,
        selected: electrolyzerType === "SOEC",
      },
    ];
  };

  const getStorageComparisonData = () => {
    return [
      { type: "Compressed", energy: 1.5, safety: 85, cost: 500 },
      { type: "Liquid", energy: 2.4, safety: 75, cost: 1200 },
    ];
  };

  const getProductionForecastData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      target: targetProduction,
      actual: targetProduction * (0.85 + Math.random() * 0.15),
      purity: purity - Math.random() * 0.5,
    }));
  };

  const getInfrastructureData = () => {
    return [
      {
        name: "Grid",
        capacity: gridCapacity,
        usage: parseFloat(outputs.powerConsumption),
      },
      {
        name: "Water",
        capacity: waterSupply * 1000,
        usage: parseFloat(outputs.waterUsed),
      },
      {
        name: "Storage",
        capacity: storageCapacity,
        usage: (outputs.storageTank / 100) * storageCapacity,
      },
    ];
  };

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate("home")}
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
                    ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-105"
                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-cyan-400"
                }`}
              >
                <span className="text-2xl">{tab.emoji}</span>
                <span className="text-xs font-bold text-center">
                  {tab.name}
                </span>
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
              <h2 className="text-2xl font-bold text-cyan-400">
                {tabs[currentTab].name}
              </h2>
            </div>

            {/* Tab 0: Location */}
            {currentTab === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={location.city}
                    onChange={(e) =>
                      setLocation({ ...location, city: e.target.value })
                    }
                    placeholder="e.g., Los Angeles"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={location.state}
                    onChange={(e) =>
                      setLocation({ ...location, state: e.target.value })
                    }
                    placeholder="e.g., California"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={location.country}
                    onChange={(e) =>
                      setLocation({ ...location, country: e.target.value })
                    }
                    placeholder="e.g., United States"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-sm text-slate-400">
                    <span className="font-bold text-cyan-400">Location:</span>{" "}
                    {location.city || "N/A"}, {location.state || "N/A"},{" "}
                    {location.country || "N/A"}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 1: Energy Source */}
            {currentTab === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Energy Source
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["solar", "wind", "hydro"].map((source) => (
                      <button
                        key={source}
                        onClick={() => setEnergySource(source)}
                        className={`p-4 rounded-xl transition-all ${
                          energySource === source
                            ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg"
                            : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50"
                        }`}
                      >
                        {source === "solar" && (
                          <Sun className="w-6 h-6 mx-auto mb-2" />
                        )}
                        {source === "wind" && (
                          <Wind className="w-6 h-6 mx-auto mb-2" />
                        )}
                        {source === "hydro" && (
                          <Droplets className="w-6 h-6 mx-auto mb-2" />
                        )}
                        <span className="text-xs font-bold capitalize">
                          {source}
                        </span>
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
                      background: `linear-gradient(to right, #06b6d4 ${
                        (energyCapacity / 5000) * 100
                      }%, #1e293b ${(energyCapacity / 5000) * 100}%)`,
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Unit
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["kW", "MW"].map((unit) => (
                      <button
                        key={unit}
                        onClick={() => setEnergyUnit(unit)}
                        className={`p-3 rounded-xl transition-all font-bold ${
                          energyUnit === unit
                            ? "bg-cyan-500 text-white"
                            : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50"
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
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Electrolyzer Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["PEM", "Alkaline", "SOEC"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setElectrolyzerType(type)}
                        className={`p-4 rounded-xl transition-all ${
                          electrolyzerType === type
                            ? "bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-lg"
                            : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50"
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
                    onChange={(e) =>
                      setElectrolyzerCapacity(Number(e.target.value))
                    }
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 ${
                        (electrolyzerCapacity / 2000) * 100
                      }%, #1e293b ${(electrolyzerCapacity / 2000) * 100}%)`,
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
                      background: `linear-gradient(to right, #f59e0b ${
                        ((efficiency - 40) / 45) * 100
                      }%, #1e293b ${((efficiency - 40) / 45) * 100}%)`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Storage */}
            {currentTab === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Storage Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["compressed", "liquid"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setStorageType(type)}
                        className={`p-4 rounded-xl transition-all ${
                          storageType === type
                            ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg"
                            : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50"
                        }`}
                      >
                        <Battery className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-xs font-bold capitalize">
                          {type}
                        </span>
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
                      background: `linear-gradient(to right, #3b82f6 ${
                        (storageCapacity / 1000) * 100
                      }%, #1e293b ${(storageCapacity / 1000) * 100}%)`,
                    }}
                  />
                </div>
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-sm text-slate-400 mb-2">
                    <span className="font-bold text-blue-400">Type:</span>{" "}
                    {storageType === "compressed"
                      ? "Compressed (350-700 bar)"
                      : "Liquid (-253°C)"}
                  </p>
                  <p className="text-sm text-slate-400">
                    <span className="font-bold text-blue-400">
                      Energy Density:
                    </span>{" "}
                    {storageType === "compressed" ? "1.5 kWh/kg" : "2.4 kWh/kg"}
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
                    onChange={(e) =>
                      setTargetProduction(Number(e.target.value))
                    }
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 ${
                        (targetProduction / 500) * 100
                      }%, #1e293b ${(targetProduction / 500) * 100}%)`,
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
                      background: `linear-gradient(to right, #ec4899 ${
                        ((purity - 95) / 4.999) * 100
                      }%, #1e293b ${((purity - 95) / 4.999) * 100}%)`,
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-xs text-slate-400 mb-1">
                      Annual Production
                    </p>
                    <p className="text-2xl font-bold text-purple-400">
                      {(targetProduction * 365).toLocaleString()} kg
                    </p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-4 border border-pink-500/30">
                    <p className="text-xs text-slate-400 mb-1">Quality Grade</p>
                    <p className="text-2xl font-bold text-pink-400">
                      {purity >= 99.9
                        ? "Ultra Pure"
                        : purity >= 99
                        ? "High"
                        : "Standard"}
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
                      background: `linear-gradient(to right, #f59e0b ${
                        (gridCapacity / 5000) * 100
                      }%, #1e293b ${(gridCapacity / 5000) * 100}%)`,
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
                      background: `linear-gradient(to right, #06b6d4 ${
                        (waterSupply / 50) * 100
                      }%, #1e293b ${(waterSupply / 50) * 100}%)`,
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
                      background: `linear-gradient(to right, #10b981 ${
                        (distanceToUser / 100) * 100
                      }%, #1e293b ${(distanceToUser / 100) * 100}%)`,
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
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    ></div>
                  </div>

                  <div className="text-center relative z-10">
                    <div className="relative inline-block mb-4">
                      <MapPin className="w-20 h-20 text-cyan-400 mx-auto" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-ping"></div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full"></div>
                    </div>
                    <p className="text-slate-400 text-lg font-medium">
                      {location.city && location.country ? (
                        <>
                          Location:{" "}
                          <span className="text-cyan-400 font-bold">
                            {location.city}, {location.country}
                          </span>
                        </>
                      ) : (
                        "Enter location details to see renewable potential"
                      )}
                    </p>
                    {location.city && location.state && location.country && (
                      <div className="mt-4 inline-block bg-cyan-500/20 border border-cyan-500/50 rounded-full px-6 py-2">
                        <p className="text-cyan-300 text-sm font-medium">
                          📍 {location.city}, {location.state},{" "}
                          {location.country}
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
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        padding: "12px",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="capacity"
                      fill="#06b6d4"
                      name="Selected Capacity (kW)"
                    />
                    <Bar
                      dataKey="potential"
                      fill="#10b981"
                      name="Max Potential (kW)"
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="bg-slate-800/40 rounded-xl p-4 border border-cyan-500/20">
                  <p className="text-sm text-slate-300">
                    <span className="font-bold text-cyan-400">
                      Current Selection:
                    </span>{" "}
                    {energySource.charAt(0).toUpperCase() +
                      energySource.slice(1)}{" "}
                    - {energyCapacity} {energyUnit}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Estimated annual energy:{" "}
                    {(
                      energyCapacity *
                      (energyUnit === "MW" ? 1000 : 1) *
                      8760 *
                      0.3
                    ).toLocaleString()}{" "}
                    kWh
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
                    <PolarAngleAxis
                      dataKey="name"
                      tick={{ fill: "#64748b", fontSize: 11 }}
                    />
                    <PolarRadiusAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                    <Radar
                      name="Efficiency %"
                      dataKey="efficiency"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "12px",
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
                          ? "bg-emerald-500/20 border-emerald-500/50"
                          : "bg-slate-800/40 border-slate-700/40"
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-300 mb-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        Eff: {item.efficiency}%
                      </p>
                      <p className="text-xs text-slate-400">
                        Cost: ${item.cost}/kW
                      </p>
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
                        {
                          name: "Used",
                          value: (outputs.storageTank / 100) * storageCapacity,
                        },
                        {
                          name: "Available",
                          value:
                            storageCapacity -
                            (outputs.storageTank / 100) * storageCapacity,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#1e293b" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "12px",
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
                          ? "bg-blue-500/20 border-blue-500/50"
                          : "bg-slate-800/40 border-slate-700/40"
                      }`}
                    >
                      <p className="text-sm font-bold text-slate-300 mb-2">
                        {item.type}
                      </p>
                      <p className="text-xs text-slate-400">
                        Energy: {item.energy} kWh/kg
                      </p>
                      <p className="text-xs text-slate-400">
                        Safety: {item.safety}%
                      </p>
                      <p className="text-xs text-slate-400">
                        Cost: ${item.cost}/kg
                      </p>
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
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#64748b", fontSize: 11 }}
                    />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      name="Target (kg/day)"
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#ec4899"
                      strokeWidth={2}
                      name="Forecast (kg/day)"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-xs text-slate-400 mb-1">Daily Target</p>
                    <p className="text-3xl font-bold text-purple-400">
                      {targetProduction} kg
                    </p>
                  </div>
                  <div className="bg-pink-500/10 rounded-xl p-4 border border-pink-500/30">
                    <p className="text-xs text-slate-400 mb-1">Purity Level</p>
                    <p className="text-3xl font-bold text-pink-400">
                      {purity.toFixed(1)}%
                    </p>
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
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="capacity"
                      fill="#64748b"
                      name="Total Capacity"
                    />
                    <Bar dataKey="usage" fill="#06b6d4" name="Current Usage" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
                    <p className="text-xs text-slate-400">Grid Usage</p>
                    <p className="text-xl font-bold text-amber-400">
                      {(
                        (parseFloat(outputs.powerConsumption) / gridCapacity) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                  </div>
                  <div className="bg-cyan-500/10 rounded-xl p-3 border border-cyan-500/30">
                    <p className="text-xs text-slate-400">Water Usage</p>
                    <p className="text-xl font-bold text-cyan-400">
                      {(
                        (parseFloat(outputs.waterUsed) / (waterSupply * 1000)) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30">
                    <p className="text-xs text-slate-400">Transport</p>
                    <p className="text-xl font-bold text-emerald-400">
                      {distanceToUser} km
                    </p>
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
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400"
                    : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400"
                }`}
              >
                {isRunning ? <Pause size={20} /> : <Play size={20} />}
                {isRunning ? "Pause" : "Start"} Simulation
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
                  label: "H₂ Production",
                  value: outputs.hydrogenRate,
                  unit: "kg/h",
                  color: "emerald",
                  icon: Activity,
                },
                {
                  label: "Storage Level",
                  value: outputs.storageTank.toFixed(1),
                  unit: "%",
                  color: "blue",
                  icon: Battery,
                },
                {
                  label: "Power Usage",
                  value: outputs.powerConsumption,
                  unit: "kW",
                  color: "amber",
                  icon: Zap,
                },
                {
                  label: "CO₂ Saved",
                  value: outputs.co2Savings,
                  unit: "t/day",
                  color: "cyan",
                  icon: Sparkles,
                },
                {
                  label: "Water Used",
                  value: outputs.waterUsed,
                  unit: "L/h",
                  color: "purple",
                  icon: Droplets,
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className={`bg-gradient-to-br from-${metric.color}-500/10 to-slate-800/40 rounded-2xl p-4 border border-${metric.color}-500/30`}
                >
                  <metric.icon
                    className={`w-5 h-5 text-${metric.color}-400 mb-2`}
                  />
                  <p className="text-xs text-slate-400 mb-1">{metric.label}</p>
                  <p className={`text-2xl font-bold text-${metric.color}-400`}>
                    {metric.value}{" "}
                    <span className="text-sm">{metric.unit}</span>
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
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  strokeOpacity={0.3}
                />
                <XAxis
                  dataKey="time"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#334155" }}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#334155" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "16px",
                    padding: "12px",
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
