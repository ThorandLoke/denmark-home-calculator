"use client";

import { useState } from "react";

// 从真实PDF数据提取的费用结构
const BUYING_COSTS = {
  // 买房费用 (基于真实数据)
  tinglysning_af_skøde: 0.006, // 0.6% 登记费
  moms_på_mæglersalær: 0.25, // 中介费25%增值税
  // 其他固定费用
  berigtigelse: 5500, // 律师费
  ejerskifteforsikring: 8500, // 产权保险 (一半)
  tilstandsrapport: 5700, // 房屋状况报告
  elinstallationsrapport: 3000, // 电力报告
};

const SELLING_COSTS = {
  // 卖房费用 (基于真实数据)
  ejerskifteforsikring: 8500, // 产权保险 (一半)
  tilstandsrapport: 5700, // 房屋状况报告
  elinstallationsrapport: 3000, // 电力报告
  berigtigelse: 5500, // 律师费
};

// 中介费率 (基于真实数据)
const AGENT_FEES = {
  low: 0.015, // 1.5% (低价房)
  medium: 0.02, // 2% (中等价位)
  high: 0.025, // 2.5% (高价房)
  fixed_low: 45000, // 固定费用低价
  fixed_high: 57000, // 固定费用高价
};

export default function Home() {
  const [price, setPrice] = useState<string>("");
  const [userType, setUserType] = useState<"danish" | "foreign">("danish");
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");
  const [language, setLanguage] = useState<"da" | "en" | "zh">("da");

  const calculateCosts = () => {
    const p = parseFloat(price) || 0;
    
    if (transactionType === "buy") {
      // 买房成本计算
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
      // 卖房成本计算
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

  const costs = calculateCosts();

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
    },
    en: {
      title: "Denmark Home Calculator",
      subtitle: "Calculate all costs when buying/selling property in Denmark",
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
    },
    zh: {
      title: "丹麦房产计算器",
      subtitle: "计算在丹麦买房/卖房的所有费用",
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
    },
  }[language];

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

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
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

          {/* Transaction Type */}
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

          {/* Results */}
          {price && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📊 {t.totalCosts}
              </h3>
              
              <div className="space-y-3">
                {transactionType === "buy" ? (
                  <>
                    <CostRow label="Tinglysning af skøde (0.6%)" amount={costs.tinglysning} />
                    <CostRow label="Ejendomsmægler salær" amount={costs.agentFee} />
                    <CostRow label="Moms (25%)" amount={costs.moms} />
                    <CostRow label="Berigtigelse / Advokat" amount={costs.berigtigelse} />
                    <CostRow label="Ejerskifteforsikring (½)" amount={costs.ejerskifteforsikring} />
                    <CostRow label="Tilstandsrapport" amount={costs.tilstandsrapport} />
                    <CostRow label="Elinstallationsrapport" amount={costs.elinstallationsrapport} />
                  </>
                ) : (
                  <>
                    <CostRow label="Ejendomsmægler salær" amount={costs.agentFee} />
                    <CostRow label="Moms (25%)" amount={costs.moms} />
                    <CostRow label="Ejerskifteforsikring (½)" amount={costs.ejerskifteforsikring} />
                    <CostRow label="Tilstandsrapport" amount={costs.tilstandsrapport} />
                    <CostRow label="Elinstallationsrapport" amount={costs.elinstallationsrapport} />
                    <CostRow label="Berigtigelse" amount={costs.berigtigelse} />
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
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <InfoCard
            icon="📋"
            title="Tjekliste"
            description="Komplet tjekliste for køb/salg af bolig"
          />
          <InfoCard
            icon="📈"
            title="Markedsdata"
            description="Se prisudvikling i dit område"
          />
          <InfoCard
            icon="⚖️"
            title="Juridisk guide"
            description="Forstå reglerne for udlændinge"
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Baseret på reelle salgsbudgetter fra danske ejendomsmæglere</p>
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

function InfoCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md transition cursor-pointer">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
