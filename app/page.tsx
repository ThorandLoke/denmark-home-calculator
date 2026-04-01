"use client";

import { useState } from "react";

// 从真实PDF数据提取的费用结构
const BUYING_COSTS = {
  tinglysning_af_skøde: 0.006,
  moms_på_mæglersalær: 0.25,
  berigtigelse: 5500,
  ejerskifteforsikring: 8500,
  tilstandsrapport: 5700,
  elinstallationsrapport: 3000,
};

const SELLING_COSTS = {
  ejerskifteforsikring: 8500,
  tilstandsrapport: 5700,
  elinstallationsrapport: 3000,
  berigtigelse: 5500,
};

const AGENT_FEES = {
  low: 0.015,
  medium: 0.02,
  high: 0.025,
  fixed_low: 45000,
  fixed_high: 57000,
};

// 太阳能板数据（基于丹麦市场）
const SOLAR_DATA = {
  costPerKwp: 12000, // DKK per kW (含安装)
  areaPerKwp: 7, // 平米 per kW
  annualKwhPerKwp: 1000, // 丹麦每年每kW发电量
  electricityPrice: 2.5, // DKK/kWh
  subsidy: 0, // 2026年补贴政策可能有变化
};

// 热泵数据（基于丹麦市场）
const HEATPUMP_DATA = {
  airWater: { cost: 150000, savings: 15000 }, // 空气源热泵
  ground: { cost: 250000, savings: 20000 }, // 地源热泵
  annualHeatingCost: 20000, // 当前燃气供暖年费用
};

// 窗户数据
const WINDOW_DATA = {
  costPerWindow: 8000, // DKK/扇
  costPerDoor: 12000, // DKK/扇
};

// 保暖改造数据
const INSULATION_DATA = {
  wall: { costPerSqm: 800, saving: 15 }, // 墙体外保温
  attic: { costPerSqm: 400, saving: 10 }, // 阁楼保温
  floor: { costPerSqm: 600, saving: 8 }, // 地面保温
};

export default function Home() {
  const [tab, setTab] = useState<"buy" | "sell" | "renovate">("buy");
  const [price, setPrice] = useState<string>("");
  const [userType, setUserType] = useState<"danish" | "foreign">("danish");
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");
  const [language, setLanguage] = useState<"da" | "en" | "zh">("da");
  
  // 改造相关状态
  const [houseSize, setHouseSize] = useState<string>("");
  const [solarKw, setSolarKw] = useState<string>("");
  const [heatPumpType, setHeatPumpType] = useState<"air" | "ground">("air");
  const [windowCount, setWindowCount] = useState<string>("");
  const [renovations, setRenovations] = useState<string[]>([]);

  const calculateCosts = () => {
    const p = parseFloat(price) || 0;
    
    if (transactionType === "buy") {
      const tinglysning = p * BUYING_COSTS.tinglysning_af_skøde;
      const agentFee = p > 1000000 ? AGENT_FEES.fixed_high : AGENT_FEES.fixed_low;
      const moms = agentFee * BUYING_COSTS.moms_på_mæglersalær;
      
      const total = tinglysning + agentFee + moms + 
        BUYING_COSTS.berigtigelse + 
        BUYING_COSTS.ejerskifteforsikring +
        BUYING_COSTS.tilstandsrapport +
        BUYING_COSTS.elinstallationsrapport;
      
      return {
        tinglysning,
        agentFee,
        moms,
        berigtigelse: BUYING_COSTS.berigtigelse,
        ejerskifteforsikring: BUYING_COSTS.ejerskifteforsikring,
        tilstandsrapport: BUYING_COSTS.tilstandsrapport,
        elinstallationsrapport: BUYING_COSTS.elinstallationsrapport,
        total,
      };
    } else {
      const agentFee = p > 1000000 ? AGENT_FEES.fixed_high : AGENT_FEES.fixed_low;
      const moms = agentFee * BUYING_COSTS.moms_på_mæglersalær;
      
      const total = agentFee + moms +
        SELLING_COSTS.ejerskifteforsikring +
        SELLING_COSTS.tilstandsrapport +
        SELLING_COSTS.elinstallationsrapport +
        SELLING_COSTS.berigtigelse;
      
      return {
        tinglysning: 0,
        agentFee,
        moms,
        ejerskifteforsikring: SELLING_COSTS.ejerskifteforsikring,
        tilstandsrapport: SELLING_COSTS.tilstandsrapport,
        elinstallationsrapport: SELLING_COSTS.elinstallationsrapport,
        berigtigelse: SELLING_COSTS.berigtigelse,
        total,
      };
    }
  };

  // 太阳能计算
  const calculateSolar = () => {
    const kw = parseFloat(solarKw) || 0;
    const size = parseFloat(houseSize) || 0;
    const estimatedKw = size * 0.01; // 估算：房屋面积 * 0.01 = 需要的kW
    
    const systemCost = kw * SOLAR_DATA.costPerKwp;
    const annualProduction = kw * SOLAR_DATA.annualKwhPerKwp;
    const annualSavings = annualProduction * SOLAR_DATA.electricityPrice;
    const paybackYears = systemCost / annualSavings;
    
    return {
      cost: systemCost,
      area: kw * SOLAR_DATA.areaPerKwp,
      annualProduction,
      annualSavings,
      paybackYears: paybackYears.toFixed(1),
    };
  };

  // 热泵计算
  const calculateHeatPump = () => {
    const data = heatPumpType === "air" ? HEATPUMP_DATA.airWater : HEATPUMP_DATA.ground;
    const annualSavings = HEATPUMP_DATA.annualHeatingCost - data.savings;
    const payback = data.cost / annualSavings;
    
    return {
      cost: data.cost,
      annualSavings,
      annualCost: data.savings,
      paybackYears: payback.toFixed(1),
    };
  };

  // 窗户计算
  const calculateWindows = () => {
    const count = parseFloat(windowCount) || 0;
    return {
      cost: count * WINDOW_DATA.costPerWindow,
      count,
    };
  };

  // 保暖计算
  const calculateInsulation = () => {
    const size = parseFloat(houseSize) || 0;
    const wallArea = size * 0.8;
    const atticArea = size * 0.9;
    const floorArea = size * 0.85;
    
    const costs: Record<string, number> = {};
    const savings: Record<string, number> = {};
    
    if (renovations.includes("wall")) {
      costs["wall"] = wallArea * INSULATION_DATA.wall.costPerSqm;
      savings["wall"] = (wallArea / 10) * INSULATION_DATA.wall.saving * 1000;
    }
    if (renovations.includes("attic")) {
      costs["attic"] = atticArea * INSULATION_DATA.attic.costPerSqm;
      savings["attic"] = (atticArea / 10) * INSULATION_DATA.attic.saving * 1000;
    }
    if (renovations.includes("floor")) {
      costs["floor"] = floorArea * INSULATION_DATA.floor.costPerSqm;
      savings["floor"] = (floorArea / 10) * INSULATION_DATA.floor.saving * 1000;
    }
    
    const totalCost = Object.values(costs).reduce((a, b) => a + b, 0);
    const totalSavings = Object.values(savings).reduce((a, b) => a + b, 0);
    
    return { costs, savings, totalCost, totalSavings };
  };

  const costs = calculateCosts();
  const solar = calculateSolar();
  const heatPump = calculateHeatPump();
  const windows = calculateWindows();
  const insulation = calculateInsulation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("da-DK", {
      style: "currency",
      currency: "DKK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const t = {
    da: {
      title: "BoligBeregner Danmark",
      subtitle: "Beregn alle omkostninger ved køb/salg af bolig i Danmark",
      tabs: { buy: "Køb bolig", sell: "Sælg bolig", renovate: "Renovering" },
      priceLabel: "Boligens pris (kr.)",
      userTypeLabel: "Brugertype",
      danish: "Dansk statsborger",
      foreign: "Udlænding",
      transactionLabel: "Transaktionstype",
      buy: "Køb af bolig",
      sell: "Salg af bolig",
      calculate: "Beregn omkostninger",
      totalCosts: "Samlede omkostninger",
      price: "Kontantpris",
      netProceeds: "Rådighedsbeløb",
      tinglysning: "Tinglysning af skøde (0.6%)",
      agentFee: "Ejendomsmægler salær",
      moms: "Moms (25%)",
      berigtigelse: "Berigtigelse / Advokat",
      ejerskifteforsikring: "Ejerskifteforsikring (½)",
      tilstandsrapport: "Tilstandsrapport",
      elinstallationsrapport: "Elinstallationsrapport",
      needLoan: "Har du brug for boliglån? Sammenlign lån nu!",
      compareLoan: "Sammenlign boliglån →",
      // 改造相关
      houseSize: "Boligareal (m²)",
      solarTitle: "Solceller / Solenergi",
      solarKw: "Ønsket effekt (kW)",
      solarCost: "Anlægspris",
      solarArea: "Nødvendig tagareal",
      solarAnnual: "Årlig produktion",
      solarSavings: "Årlig besparelse",
      solarPayback: "Tilbagebetaling",
      solarYears: "år",
      heatPumpTitle: "Varmepumpe",
      heatPumpType: "Varmepumpetype",
      heatPumpAir: "Luft-til-vand (anbefalet)",
      heatPumpGround: "Jordvarme",
      heatPumpCost: "Anlægspris",
      heatPumpNewCost: "Ny årlig varmeregning",
      heatPumpSavings: "Årlig besparelse",
      heatPumpPayback: "Tilbagebetaling",
      windowsTitle: "Vinduer & Døre",
      windowCount: "Antal vinduer",
      windowCost: "Samlet pris",
      insulationTitle: "Isolering",
      renovationTypes: "Vælg forbedringer",
      wallInsulation: "Vægisolering",
      atticInsulation: "Loftsisolering",
      floorInsulation: "Gulvisolering",
      insulationCost: "Samlet pris",
      insulationSavings: "Årlig besparelse",
      getQuotes: "Få tilbud fra leverandører →",
      infoTjekliste: "Komplet tjekliste for køb/salg af bolig",
      infoMarkedsdata: "Se prisudvikling i dit område",
      infoJuridisk: "Forstå reglerne for udlændinge",
    },
    en: {
      title: "Denmark Home Calculator",
      subtitle: "Calculate all costs when buying/selling property in Denmark",
      tabs: { buy: "Buy", sell: "Sell", renovate: "Renovate" },
      priceLabel: "Property price (DKK)",
      userTypeLabel: "User type",
      danish: "Danish citizen",
      foreign: "Foreigner",
      transactionLabel: "Transaction type",
      buy: "Buy property",
      sell: "Sell property",
      calculate: "Calculate costs",
      totalCosts: "Total costs",
      price: "Cash price",
      netProceeds: "Net proceeds",
      tinglysning: "Land registry fee (0.6%)",
      agentFee: "Real estate agent fee",
      moms: "VAT (25%)",
      berigtigelse: "Legal fees",
      ejerskifteforsikring: "Property transfer insurance (½)",
      tilstandsrapport: "Building condition report",
      elinstallationsrapport: "Electrical inspection report",
      needLoan: "Need a mortgage? Compare loans now!",
      compareLoan: "Compare mortgages →",
      houseSize: "House area (m²)",
      solarTitle: "Solar Panels",
      solarKw: "Desired capacity (kW)",
      solarCost: "System cost",
      solarArea: "Required roof area",
      solarAnnual: "Annual production",
      solarSavings: "Annual savings",
      solarPayback: "Payback period",
      solarYears: "years",
      heatPumpTitle: "Heat Pump",
      heatPumpType: "Heat pump type",
      heatPumpAir: "Air-to-water (recommended)",
      heatPumpGround: "Ground source",
      heatPumpCost: "System cost",
      heatPumpNewCost: "New annual heating cost",
      heatPumpSavings: "Annual savings",
      heatPumpPayback: "Payback period",
      windowsTitle: "Windows & Doors",
      windowCount: "Number of windows",
      windowCost: "Total cost",
      insulationTitle: "Insulation",
      renovationTypes: "Select improvements",
      wallInsulation: "Wall insulation",
      atticInsulation: "Attic insulation",
      floorInsulation: "Floor insulation",
      insulationCost: "Total cost",
      insulationSavings: "Annual savings",
      getQuotes: "Get quotes from suppliers →",
      infoTjekliste: "Complete checklist for buying/selling",
      infoMarkedsdata: "See price trends in your area",
      infoJuridisk: "Understand rules for foreigners",
    },
    zh: {
      title: "丹麦房产计算器",
      subtitle: "计算在丹麦买房/卖房/改造的所有费用",
      tabs: { buy: "买房", sell: "卖房", renovate: "改造" },
      priceLabel: "房产价格 (丹麦克朗)",
      userTypeLabel: "用户类型",
      danish: "丹麦公民",
      foreign: "外国人",
      transactionLabel: "交易类型",
      buy: "购买房产",
      sell: "出售房产",
      calculate: "计算费用",
      totalCosts: "总费用",
      price: "现金价格",
      netProceeds: "净收益",
      tinglysning: "登记费 (0.6%)",
      agentFee: "房产中介费",
      moms: "增值税 (25%)",
      berigtigelse: "律师费/公证费",
      ejerskifteforsikring: "产权保险 (一半)",
      tilstandsrapport: "房屋状况报告",
      elinstallationsrapport: "电力检查报告",
      needLoan: "需要房贷吗？立即比较贷款！",
      compareLoan: "比较房贷 →",
      houseSize: "房屋面积 (平方米)",
      solarTitle: "太阳能板",
      solarKw: "期望功率 (kW)",
      solarCost: "系统价格",
      solarArea: "所需屋顶面积",
      solarAnnual: "年发电量",
      solarSavings: "年节省",
      solarPayback: "回收期",
      solarYears: "年",
      heatPumpTitle: "热泵",
      heatPumpType: "热泵类型",
      heatPumpAir: "空气源热泵 (推荐)",
      heatPumpGround: "地源热泵",
      heatPumpCost: "系统价格",
      heatPumpNewCost: "新年取暖费",
      heatPumpSavings: "年节省",
      heatPumpPayback: "回收期",
      windowsTitle: "窗户与门",
      windowCount: "窗户数量",
      windowCost: "总价",
      insulationTitle: "保暖改造",
      renovationTypes: "选择改造项目",
      wallInsulation: "墙体保温",
      atticInsulation: "阁楼保温",
      floorInsulation: "地面保温",
      insulationCost: "总费用",
      insulationSavings: "年节省",
      getQuotes: "获取供应商报价 →",
      infoTjekliste: "买卖房产完整清单",
      infoMarkedsdata: "查看您所在区域的房价趋势",
      infoJuridisk: "了解外国人购房规定",
    },
  }[language];

  const toggleRenovation = (type: string) => {
    if (renovations.includes(type)) {
      setRenovations(renovations.filter(r => r !== type));
    } else {
      setRenovations([...renovations, type]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">🏠 {t.title}</h1>
          <div className="flex gap-2">
            {(["da", "en", "zh"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  language === lang
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {lang === "da" ? "DA" : lang === "en" ? "EN" : "中文"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("buy")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
              tab === "buy"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border"
            }`}
          >
            🏠 {t.tabs.buy}
          </button>
          <button
            onClick={() => setTab("sell")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
              tab === "sell"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border"
            }`}
          >
            🏷️ {t.tabs.sell}
          </button>
          <button
            onClick={() => setTab("renovate")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
              tab === "renovate"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border"
            }`}
          >
            🔨 {t.tabs.renovate}
          </button>
        </div>

        {tab === "buy" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Buy/Sell Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.transactionLabel}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTransactionType("buy")}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition ${
                    transactionType === "buy"
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  🛒 {t.buy}
                </button>
                <button
                  onClick={() => setTransactionType("sell")}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition ${
                    transactionType === "sell"
                      ? "border-orange-600 bg-orange-50 text-orange-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  🏷️ {t.sell}
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.priceLabel}
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="1.275.000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.userTypeLabel}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUserType("danish")}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition ${
                      userType === "danish"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {t.danish}
                  </button>
                  <button
                    onClick={() => setUserType("foreign")}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition ${
                      userType === "foreign"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {t.foreign}
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {price && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📊 {t.totalCosts}
                </h3>
                
                <div className="space-y-3">
                  {transactionType === "buy" ? (
                    <>
                      <CostRow label={t.tinglysning} amount={costs.tinglysning} />
                      <CostRow label={t.agentFee} amount={costs.agentFee} />
                      <CostRow label={t.moms} amount={costs.moms} />
                      <CostRow label={t.berigtigelse} amount={costs.berigtigelse} />
                      <CostRow label={t.ejerskifteforsikring} amount={costs.ejerskifteforsikring} />
                      <CostRow label={t.tilstandsrapport} amount={costs.tilstandsrapport} />
                      <CostRow label={t.elinstallationsrapport} amount={costs.elinstallationsrapport} />
                    </>
                  ) : (
                    <>
                      <CostRow label={t.agentFee} amount={costs.agentFee} />
                      <CostRow label={t.moms} amount={costs.moms} />
                      <CostRow label={t.ejerskifteforsikring} amount={costs.ejerskifteforsikring} />
                      <CostRow label={t.tilstandsrapport} amount={costs.tilstandsrapport} />
                      <CostRow label={t.elinstallationsrapport} amount={costs.elinstallationsrapport} />
                      <CostRow label={t.berigtigelse} amount={costs.berigtigelse} />
                    </>
                  )}
                </div>

                {/* Total */}
                <div className="mt-6 pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-900">{t.totalCosts}</span>
                    <span className="text-blue-600">{formatCurrency(costs.total)}</span>
                  </div>
                  
                  {transactionType === "sell" && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-green-900">{t.netProceeds}</span>
                        <span className="text-2xl font-bold text-green-600">
                          {formatCurrency(parseFloat(price) - costs.total)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Affiliate Link - Pantsat.dk */}
                {transactionType === "buy" && price && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-center">
                      <p className="text-sm text-blue-700 mb-3">
                        💰 {t.needLoan}
                      </p>
                      <a
                        href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=78126"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                      >
                        {t.compareLoan}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {tab === "renovate" && (
          <div className="space-y-6">
            {/* House Size Input */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.houseSize}
              </label>
              <input
                type="number"
                value={houseSize}
                onChange={(e) => setHouseSize(e.target.value)}
                placeholder="150"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Solar Panel */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔆 {t.solarTitle}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.solarKw}
                  </label>
                  <input
                    type="number"
                    value={solarKw}
                    onChange={(e) => setSolarKw(e.target.value)}
                    placeholder="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {language === "zh" ? "建议：每100平米房屋约6kW" : "Anbefaling: ~6kW per 100m²"}
                  </p>
                </div>
                {solarKw && (
                  <div className="bg-yellow-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.solarCost}:</span>
                      <span className="font-bold">{formatCurrency(solar.cost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.solarArea}:</span>
                      <span className="font-bold">{solar.area} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.solarAnnual}:</span>
                      <span className="font-bold">{solar.annualProduction} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.solarSavings}:</span>
                      <span className="font-bold text-green-600">{formatCurrency(solar.annualSavings)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">{t.solarPayback}:</span>
                      <span className="font-bold text-purple-600">{solar.paybackYears} {t.solarYears}</span>
                    </div>
                  </div>
                )}
              </div>
              {solarKw && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
                  <a
                    href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=78126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 font-medium hover:underline"
                  >
                    {t.getQuotes}
                  </a>
                </div>
              )}
            </div>

            {/* Heat Pump */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🌡️ {t.heatPumpTitle}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.heatPumpType}
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setHeatPumpType("air")}
                      className={`w-full px-4 py-3 rounded-lg border-2 font-medium transition ${
                        heatPumpType === "air"
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {t.heatPumpAir}
                    </button>
                    <button
                      onClick={() => setHeatPumpType("ground")}
                      className={`w-full px-4 py-3 rounded-lg border-2 font-medium transition ${
                        heatPumpType === "ground"
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {t.heatPumpGround}
                    </button>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.heatPumpCost}:</span>
                    <span className="font-bold">{formatCurrency(heatPump.cost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.heatPumpNewCost}:</span>
                    <span className="font-bold">{formatCurrency(heatPump.annualCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.heatPumpSavings}:</span>
                    <span className="font-bold text-green-600">{formatCurrency(heatPump.annualSavings)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">{t.heatPumpPayback}:</span>
                    <span className="font-bold text-purple-600">{heatPump.paybackYears} {t.solarYears}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
                <a
                  href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=78126"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 font-medium hover:underline"
                >
                  {t.getQuotes}
                </a>
              </div>
            </div>

            {/* Windows */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🪟 {t.windowsTitle}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.windowCount}
                  </label>
                  <input
                    type="number"
                    value={windowCount}
                    onChange={(e) => setWindowCount(e.target.value)}
                    placeholder="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {windowCount && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.windowCost}:</span>
                      <span className="font-bold text-2xl">{formatCurrency(windows.cost)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Insulation */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🏠 {t.insulationTitle}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.renovationTypes}
                </label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => toggleRenovation("wall")}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                      renovations.includes("wall")
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    🧱 {t.wallInsulation}
                  </button>
                  <button
                    onClick={() => toggleRenovation("attic")}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                      renovations.includes("attic")
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    📐 {t.atticInsulation}
                  </button>
                  <button
                    onClick={() => toggleRenovation("floor")}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                      renovations.includes("floor")
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                   🏠 {t.floorInsulation}
                  </button>
                </div>
              </div>
              {renovations.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.insulationCost}:</span>
                    <span className="font-bold text-2xl">{formatCurrency(insulation.totalCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.insulationSavings}:</span>
                    <span className="font-bold text-green-600">{formatCurrency(insulation.totalSavings)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Baseret på reelle priser fra danske leverandører 2026</p>
          <p className="mt-1">© 2026 BoligBeregner Danmark</p>
        </footer>
      </div>
    </main>
  );
}

function CostRow({ label, amount }: { label: string; amount: number }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("da-DK", {
      style: "currency",
      currency: "DKK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{formatCurrency(amount)}</span>
    </div>
  );
}