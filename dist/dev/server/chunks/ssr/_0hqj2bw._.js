module.exports = [
"[project]/lib/ai-advisor.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ==================== AI 智能顾问 ====================
// 前端直接调用 OpenAI API
// 支持：定价建议、隐藏费用预警、贷款优化、投资回报、装修优先级、市场趋势、比价助手
__turbopack_context__.s([
    "AI_FEATURES",
    ()=>AI_FEATURES,
    "runAIAnalysis",
    ()=>runAIAnalysis,
    "runLocalAnalysis",
    ()=>runLocalAnalysis
]);
// ---- 本地规则引擎（无需 API Key 也能工作）----
const REGION_MARKET = {
    kobenhavn: {
        trend: "stable",
        avgPrice: 55000,
        growth: 1.2
    },
    frederiksberg: {
        trend: "stable",
        avgPrice: 58000,
        growth: 1.5
    },
    gentofte: {
        trend: "stable",
        avgPrice: 65000,
        growth: 0.8
    },
    aarhus: {
        trend: "up",
        avgPrice: 32000,
        growth: 4.5
    },
    odense: {
        trend: "stable",
        avgPrice: 18000,
        growth: 2.1
    },
    aalborg: {
        trend: "up",
        avgPrice: 16000,
        growth: 5.2
    },
    kolding: {
        trend: "up",
        avgPrice: 18000,
        growth: 3.8
    },
    horsens: {
        trend: "up",
        avgPrice: 15000,
        growth: 4.1
    },
    vejle: {
        trend: "up",
        avgPrice: 17000,
        growth: 3.5
    },
    roskilde: {
        trend: "up",
        avgPrice: 28000,
        growth: 3.0
    },
    middelfart: {
        trend: "up",
        avgPrice: 18000,
        growth: 3.2
    },
    esbjerg: {
        trend: "down",
        avgPrice: 14000,
        growth: -0.5
    },
    nakskov: {
        trend: "down",
        avgPrice: 8000,
        growth: -2.1
    }
};
function fmt(n) {
    return new Intl.NumberFormat("da-DK", {
        style: "currency",
        currency: "DKK",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(n);
}
// ---- 1. 智能定价建议 ----
function analyzePricing(ctx) {
    const { price, region, size, lang } = ctx;
    const regionData = region ? REGION_MARKET[region] : null;
    const points = [];
    let summary = "";
    if (regionData && size) {
        const pricePerSqm = price / size;
        const avgSqm = regionData.avgPrice;
        const diff = (pricePerSqm - avgSqm) / avgSqm * 100;
        const absDiff = Math.abs(diff);
        if (diff > 15) {
            summary = lang === "zh" ? `该房产单价比区域均价高 ${absDiff.toFixed(0)}%，存在溢价风险` : lang === "en" ? `Price/m² is ${absDiff.toFixed(0)}% above area average — overpricing risk` : `Pris/m² er ${absDiff.toFixed(0)}% over områdegennemsnittet — overprisrisiko`;
            points.push({
                type: "warning",
                text: lang === "zh" ? `单价 ${fmt(pricePerSqm)}/m²，区域均价 ${fmt(avgSqm)}/m²` : lang === "en" ? `Your price: ${fmt(pricePerSqm)}/m², area avg: ${fmt(avgSqm)}/m²` : `Din pris: ${fmt(pricePerSqm)}/m², områdegennemsnit: ${fmt(avgSqm)}/m²`,
                value: `+${absDiff.toFixed(1)}%`
            });
        } else if (diff < -10) {
            summary = lang === "zh" ? `房价低于区域均价 ${absDiff.toFixed(0)}%，可能是隐藏的好机会` : lang === "en" ? `Price is ${absDiff.toFixed(0)}% below area average — potential opportunity` : `Prisen er ${absDiff.toFixed(0)}% under gennemsnittet — potentiel god handel`;
            points.push({
                type: "positive",
                text: lang === "zh" ? `低于市场均价，值得深入调查原因` : lang === "en" ? `Below market price — investigate why` : `Under markedspris — undersøg årsagen`,
                value: `-${absDiff.toFixed(1)}%`
            });
        } else {
            summary = lang === "zh" ? `房价与区域市场基本吻合（偏差 ${diff.toFixed(1)}%）` : lang === "en" ? `Price aligns with local market (${diff > 0 ? "+" : ""}${diff.toFixed(1)}%)` : `Prisen svarer til markedet (${diff > 0 ? "+" : ""}${diff.toFixed(1)}%)`;
            points.push({
                type: "info",
                text: lang === "zh" ? `与区域均价相差在合理范围内` : lang === "en" ? `Within normal range of area average` : `Inden for normalområdet for gennemsnitspris`
            });
        }
        if (regionData.trend === "up") {
            points.push({
                type: "positive",
                text: lang === "zh" ? `该区域房价呈上涨趋势，年增长约 ${regionData.growth}%` : lang === "en" ? `Area prices are rising ~${regionData.growth}%/year` : `Priserne i området stiger ~${regionData.growth}%/år`,
                value: `+${regionData.growth}%/år`
            });
        } else if (regionData.trend === "down") {
            points.push({
                type: "warning",
                text: lang === "zh" ? `该区域房价下跌趋势，年变化约 ${regionData.growth}%` : lang === "en" ? `Area prices are declining ~${regionData.growth}%/year` : `Priserne i området falder ~${Math.abs(regionData.growth)}%/år`,
                value: `${regionData.growth}%/år`
            });
        }
    } else {
        summary = lang === "zh" ? "请填写房屋面积和区域以获取更精准定价分析" : lang === "en" ? "Add house size and region for detailed pricing analysis" : "Tilføj husstørrelse og område for detaljeret prisanalyse";
        points.push({
            type: "tip",
            text: lang === "zh" ? `一般丹麦房屋议价空间为标价的 3-8%` : lang === "en" ? `Typical negotiation margin in Denmark: 3-8% off asking price` : `Typisk forhandlingsrum i Danmark: 3-8% af udbudsprisen`
        });
    }
    // 通用建议
    points.push({
        type: "tip",
        text: lang === "zh" ? `查看 boligsiden.dk 同区域近期成交价，了解真实市场` : lang === "en" ? `Check recent sold prices on boligsiden.dk for actual market data` : `Tjek seneste salgspriser på boligsiden.dk for reelle markedsdata`
    });
    return {
        title: lang === "zh" ? "智能定价建议" : lang === "en" ? "Smart Pricing" : "Prisanalyse",
        icon: "📊",
        summary,
        points,
        confidence: regionData && size ? "high" : "medium",
        disclaimer: lang === "zh" ? "⚠️ 数据来源：基于区域历史均价估算，非实时数据。实际房价受房屋状况、地段、市场波动影响。建议查询 boligsiden.dk 获取最新成交价。" : lang === "en" ? "⚠️ Data source: Estimated based on historical area averages, not real-time data. Actual prices vary by condition, location, and market. Check boligsiden.dk for recent sales." : "⚠️ Datakilde: Estimeret baseret på historiske områdegennemsnit, ikke realtidsdata. Faktiske priser varierer. Tjek boligsiden.dk for nylige salg."
    };
}
// ---- 2. 隐藏费用预警 ----
function analyzeHiddenCosts(ctx) {
    const { price, transactionType, lang } = ctx;
    const points = [];
    const hidden = transactionType === "buy" ? [
        {
            name: lang === "zh" ? "房屋检测/鉴定费" : lang === "en" ? "Building inspection" : "Bygningsinspektør",
            amount: 8000,
            desc: lang === "zh" ? "独立建筑检测，不要只依赖卖家的报告" : lang === "en" ? "Independent survey — don't rely solely on seller's report" : "Uafhængig inspektion — stol ikke kun på sælgers rapport"
        },
        {
            name: lang === "zh" ? "银行手续费" : lang === "en" ? "Bank processing fees" : "Bankgebyrer",
            amount: 5000,
            desc: lang === "zh" ? "贷款审批和账户手续费，各行不同" : lang === "en" ? "Loan processing & account fees vary by bank" : "Lånebehandlings- og kontogebyrer varierer"
        },
        {
            name: lang === "zh" ? "搬家费用" : lang === "en" ? "Moving costs" : "Flytteomkostninger",
            amount: 12000,
            desc: lang === "zh" ? "专业搬家公司报价范围 8000-20000 DKK" : lang === "en" ? "Professional movers: DKK 8,000–20,000" : "Professionelle flytmænd: 8.000–20.000 kr."
        },
        {
            name: lang === "zh" ? "首年房屋保险" : lang === "en" ? "First-year home insurance" : "Første års husforsikring",
            amount: 8000,
            desc: lang === "zh" ? "购房后立即需要，年费约 6000-12000 DKK" : lang === "en" ? "Required immediately: ~DKK 6,000–12,000/year" : "Kræves straks: ca. 6.000–12.000 kr./år"
        },
        {
            name: lang === "zh" ? "基础装修/粉刷" : lang === "en" ? "Basic decoration / painting" : "Maling / grundrenovering",
            amount: 30000,
            desc: lang === "zh" ? "大多数新购房者会在入住前改造，预算勿忽略" : lang === "en" ? "Most buyers renovate before moving in — budget for it" : "De fleste køber renoverer inden indflytning"
        }
    ] : [
        {
            name: lang === "zh" ? "提前还款罚款" : lang === "en" ? "Early mortgage repayment fee" : "Indfrielsesgebyr",
            amount: Math.round(price * 0.005),
            desc: lang === "zh" ? "提前还清贷款可能有 0.5-1% 违约金" : lang === "en" ? "0.5–1% penalty may apply for early repayment" : "0,5–1% gebyr kan gælde ved tidlig indfrielse"
        },
        {
            name: lang === "zh" ? "能源证书（若过期）" : lang === "en" ? "Energy certificate renewal" : "Energimærke fornyelse",
            amount: 3500,
            desc: lang === "zh" ? "能源证书超过10年需更新，费用约 3000-4000 DKK" : lang === "en" ? "Required if certificate > 10 years old: ~DKK 3,000–4,000" : "Kræves hvis certifikat >10 år: ca. 3.000–4.000 kr."
        },
        {
            name: lang === "zh" ? "房屋小修补" : lang === "en" ? "Pre-sale repairs" : "Reparationer inden salg",
            amount: 20000,
            desc: lang === "zh" ? "买家验房前需处理明显缺陷，否则压价" : lang === "en" ? "Fix obvious defects before inspection to avoid price cuts" : "Udbedring af synlige fejl inden inspektion"
        }
    ];
    const totalHidden = hidden.reduce((s, h)=>s + h.amount, 0);
    hidden.forEach((h)=>{
        points.push({
            type: "warning",
            text: `${h.name}: ${h.desc}`,
            value: fmt(h.amount)
        });
    });
    points.push({
        type: "tip",
        text: lang === "zh" ? `建议额外预留 ${fmt(totalHidden)} 作为隐藏费用缓冲` : lang === "en" ? `Budget an extra ${fmt(totalHidden)} for hidden costs` : `Sæt ekstra ${fmt(totalHidden)} af til skjulte omkostninger`,
        value: fmt(totalHidden)
    });
    return {
        title: lang === "zh" ? "隐藏费用预警" : lang === "en" ? "Hidden Cost Alert" : "Skjulte Udgifter",
        icon: "⚠️",
        summary: lang === "zh" ? `估计隐藏费用合计约 ${fmt(totalHidden)}，请在预算中预留` : lang === "en" ? `Estimated hidden costs: ~${fmt(totalHidden)} — include in your budget` : `Anslåede skjulte omkostninger: ~${fmt(totalHidden)}`,
        points,
        confidence: "medium"
    };
}
// ---- 3. 贷款优化方案 ----
function analyzeLoan(ctx) {
    const { price, downPaymentPercent = 20, loanRate = 3.2, loanYears = 30, lang } = ctx;
    const points = [];
    const loanAmount = price * (1 - downPaymentPercent / 100);
    // 对比不同银行利率模拟
    const BANK_RATES = [
        {
            name: lang === "zh" ? "Nykredit" : "Nykredit",
            rate: 3.0,
            fixedYears: 30
        },
        {
            name: lang === "zh" ? "Realkredit Danmark" : "Realkredit Danmark",
            rate: 3.15,
            fixedYears: 30
        },
        {
            name: lang === "zh" ? "Jyske Realkredit" : "Jyske Realkredit",
            rate: 3.25,
            fixedYears: 30
        },
        {
            name: lang === "zh" ? "BRFkredit" : "BRFkredit",
            rate: 3.1,
            fixedYears: 30
        }
    ];
    const calcMonthly = (principal, rate, years)=>{
        const mr = rate / 100 / 12;
        const n = years * 12;
        if (mr === 0) return principal / n;
        return principal * (mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
    };
    const currentMonthly = calcMonthly(loanAmount, loanRate, loanYears);
    BANK_RATES.forEach((bank)=>{
        const monthly = calcMonthly(loanAmount, bank.rate, loanYears);
        const diff = currentMonthly - monthly;
        if (diff > 100) {
            points.push({
                type: "positive",
                text: lang === "zh" ? `${bank.name}（${bank.rate}%）月供约 ${fmt(monthly)}，比您当前方案低 ${fmt(diff)}/月` : lang === "en" ? `${bank.name} (${bank.rate}%) ~${fmt(monthly)}/month — ${fmt(diff)} cheaper/month` : `${bank.name} (${bank.rate}%) ~${fmt(monthly)}/md. — ${fmt(diff)} billigere/md.`,
                value: `-${fmt(diff)}/md.`
            });
        }
    });
    // F1 vs F30 建议
    const f1Rate = 2.1;
    const f1Monthly = calcMonthly(loanAmount, f1Rate, loanYears);
    const f1Saving = currentMonthly - f1Monthly;
    if (f1Saving > 500) {
        points.push({
            type: "tip",
            text: lang === "zh" ? `浮动利率（F1）当前约 ${f1Rate}%，月供约 ${fmt(f1Monthly)}，比固定利率低 ${fmt(f1Saving)}/月，但利率风险更高` : lang === "en" ? `Variable rate (F1) at ~${f1Rate}% gives ~${fmt(f1Monthly)}/month — ${fmt(f1Saving)} cheaper but higher rate risk` : `Variabel rente (F1) på ~${f1Rate}% giver ~${fmt(f1Monthly)}/md. — ${fmt(f1Saving)} billigere men højere risiko`,
            value: `-${fmt(f1Saving)}/md.`
        });
    }
    // 首付建议
    if (downPaymentPercent < 20) {
        points.push({
            type: "warning",
            text: lang === "zh" ? `首付低于 20%，需额外支付贷款保险，建议凑足 20% 首付` : lang === "en" ? `Down payment < 20% requires mortgage insurance — try to reach 20%` : `Udbetaling under 20% kræver låneforsikring — forsøg at nå 20%`
        });
    }
    if (points.length === 0) {
        points.push({
            type: "info",
            text: lang === "zh" ? "您的贷款条件在市场合理范围内，可尝试议价" : lang === "en" ? "Your loan terms are reasonable — still worth negotiating" : "Dine lånevilkår er rimelige — forhandling er stadig mulig"
        });
    }
    points.push({
        type: "tip",
        text: lang === "zh" ? `使用 mybanker.dk 或 lendo.dk 同时比较多家银行贷款利率` : lang === "en" ? `Use mybanker.dk or lendo.dk to compare multiple banks at once` : `Brug mybanker.dk eller lendo.dk til at sammenligne banker`
    });
    return {
        title: lang === "zh" ? "贷款优化方案" : lang === "en" ? "Mortgage Optimizer" : "Låneoptimering",
        icon: "🏦",
        summary: lang === "zh" ? `当前月供 ${fmt(currentMonthly)}，优化后最多可省 ${fmt(Math.max(0, currentMonthly - calcMonthly(loanAmount, 3.0, loanYears)))}/月` : lang === "en" ? `Current monthly: ${fmt(currentMonthly)} — optimization could save up to ${fmt(Math.max(0, currentMonthly - calcMonthly(loanAmount, 3.0, loanYears)))}/month` : `Nuværende månedlig ydelse: ${fmt(currentMonthly)}`,
        points,
        confidence: "high"
    };
}
// ---- 4. 投资回报预测（出租） ----
function analyzeROI(ctx) {
    const { price, region, size, lang } = ctx;
    const points = [];
    // 丹麦平均租金估算 DKK/m²/月
    const RENT_PER_SQM = {
        kobenhavn: 180,
        frederiksberg: 170,
        gentofte: 160,
        aarhus: 110,
        odense: 80,
        aalborg: 75,
        horsens: 70,
        vejle: 75,
        kolding: 72,
        middelfart: 68
    };
    const rentPerSqm = region ? RENT_PER_SQM[region] || 70 : 90;
    const estimatedSize = size || price / 25000; // 粗估面积
    const monthlyRent = rentPerSqm * estimatedSize;
    const annualRent = monthlyRent * 12;
    const grossYield = annualRent / price * 100;
    // 扣税和费用后净收益
    const expenses = annualRent * 0.3; // 税+维修+空置约30%
    const netAnnual = annualRent - expenses;
    const netYield = netAnnual / price * 100;
    const breakEvenYears = price / netAnnual;
    if (grossYield > 4) {
        points.push({
            type: "positive",
            text: lang === "zh" ? `毛租金回报率约 ${grossYield.toFixed(1)}%，高于丹麦国债利率，投资价值较高` : lang === "en" ? `Gross rental yield ~${grossYield.toFixed(1)}% — above Danish bond rate, good investment` : `Bruttolejeafkast ~${grossYield.toFixed(1)}% — over dansk obligationsrente, godt`,
            value: `${grossYield.toFixed(1)}%`
        });
    } else {
        points.push({
            type: "warning",
            text: lang === "zh" ? `毛租金回报率约 ${grossYield.toFixed(1)}%，相对较低，纯投资角度需谨慎` : lang === "en" ? `Gross yield ~${grossYield.toFixed(1)}% is relatively low for pure investment` : `Bruttolejeafkast ~${grossYield.toFixed(1)}% er relativt lavt`,
            value: `${grossYield.toFixed(1)}%`
        });
    }
    points.push({
        type: "info",
        text: lang === "zh" ? `预估月租金 ${fmt(monthlyRent)}，年租金 ${fmt(annualRent)}` : lang === "en" ? `Estimated rent: ${fmt(monthlyRent)}/month, ${fmt(annualRent)}/year` : `Anslået leje: ${fmt(monthlyRent)}/md., ${fmt(annualRent)}/år`,
        value: fmt(monthlyRent)
    });
    points.push({
        type: "info",
        text: lang === "zh" ? `扣除税费和维修（约30%）后净收益 ${fmt(netAnnual)}/年，净回报率 ${netYield.toFixed(1)}%` : lang === "en" ? `Net income after costs (~30%): ${fmt(netAnnual)}/year, net yield ${netYield.toFixed(1)}%` : `Nettoudbytte efter udgifter (~30%): ${fmt(netAnnual)}/år, nettoafkast ${netYield.toFixed(1)}%`,
        value: `${netYield.toFixed(1)}%`
    });
    points.push({
        type: "tip",
        text: lang === "zh" ? `按当前净收益，约 ${breakEvenYears.toFixed(0)} 年回本（不考虑房价升值）` : lang === "en" ? `Break-even in ~${breakEvenYears.toFixed(0)} years at current net income (excluding price appreciation)` : `Break-even om ~${breakEvenYears.toFixed(0)} år ved nuværende nettoindkomst`,
        value: `${breakEvenYears.toFixed(0)} år`
    });
    return {
        title: lang === "zh" ? "投资回报预测" : lang === "en" ? "ROI Forecast" : "Investeringsafkast",
        icon: "📈",
        summary: lang === "zh" ? `预估毛回报率 ${grossYield.toFixed(1)}%，净回报率 ${netYield.toFixed(1)}%，约 ${breakEvenYears.toFixed(0)} 年回本` : lang === "en" ? `Gross yield ~${grossYield.toFixed(1)}%, net yield ~${netYield.toFixed(1)}%, break-even ~${breakEvenYears.toFixed(0)} yrs` : `Bruttolejeafkast ~${grossYield.toFixed(1)}%, nettoafkast ~${netYield.toFixed(1)}%`,
        points,
        confidence: size ? "medium" : "low"
    };
}
// ---- 5. 装修优先级建议 ----
function analyzeRenovation(ctx) {
    const { price, size, lang } = ctx;
    const points = [];
    const ROI_ITEMS = [
        {
            name: lang === "zh" ? "外墙重漆" : lang === "en" ? "Exterior painting" : "Udvendig maling",
            cost: 30000,
            valueAdd: 50000,
            roi: 67,
            category: "maintenance"
        },
        {
            name: lang === "zh" ? "厨房翻新" : lang === "en" ? "Kitchen renovation" : "Køkkenrenovering",
            cost: 80000,
            valueAdd: 120000,
            roi: 50,
            category: "aesthetic"
        },
        {
            name: lang === "zh" ? "阁楼保温" : lang === "en" ? "Attic insulation" : "Loftsisolering",
            cost: size ? size * 0.9 * 400 : 40000,
            valueAdd: size ? size * 0.9 * 600 : 60000,
            roi: 50,
            category: "energy"
        },
        {
            name: lang === "zh" ? "浴室翻新" : lang === "en" ? "Bathroom renovation" : "Baderenovering",
            cost: 60000,
            valueAdd: 85000,
            roi: 42,
            category: "aesthetic"
        },
        {
            name: lang === "zh" ? "安装热泵（空气源）" : lang === "en" ? "Air-to-water heat pump" : "Luft-til-vand varmepumpe",
            cost: 150000,
            valueAdd: 200000,
            roi: 33,
            category: "energy"
        },
        {
            name: lang === "zh" ? "地板翻新（实木）" : lang === "en" ? "Hardwood floor renovation" : "Trægulvsrenovering",
            cost: size ? size * 400 : 50000,
            valueAdd: size ? size * 500 : 65000,
            roi: 30,
            category: "aesthetic"
        },
        {
            name: lang === "zh" ? "太阳能板（6kW）" : lang === "en" ? "Solar panels (6kW)" : "Solceller (6kW)",
            cost: 72000,
            valueAdd: 90000,
            roi: 25,
            category: "energy"
        }
    ];
    // 按 ROI 排序
    const sorted = [
        ...ROI_ITEMS
    ].sort((a, b)=>b.roi - a.roi);
    // 优先级推荐：分高、中、低三档
    points.push({
        type: "info",
        text: lang === "zh" ? "🔴 高优先级（ROI > 50%）：性价比最高，强烈推荐优先考虑" : lang === "en" ? "🔴 High priority (ROI > 50%): Best value, strongly recommended" : "🔴 Høj prioritet (ROI > 50%): Bedst værdi, anbefales"
    });
    sorted.filter((item)=>item.roi > 50).forEach((item, idx)=>{
        points.push({
            type: "positive",
            text: lang === "zh" ? `${item.name}：投入 ${fmt(item.cost)}，增值 ${fmt(item.valueAdd)}，ROI ${item.roi}%` : lang === "en" ? `${item.name}: Cost ${fmt(item.cost)}, adds ${fmt(item.valueAdd)} value, ROI ${item.roi}%` : `${item.name}: Koster ${fmt(item.cost)}, tilføjer ${fmt(item.valueAdd)}, ROI ${item.roi}%`,
            value: `ROI ${item.roi}%`
        });
    });
    points.push({
        type: "info",
        text: lang === "zh" ? "🟡 中优先级（ROI 30-50%）：投资回报良好，可根据预算选择" : lang === "en" ? "🟡 Medium priority (ROI 30-50%): Good returns, choose based on budget" : "🟡 Medium prioritet (ROI 30-50%): Gode afkast, vælg baseret på budget"
    });
    sorted.filter((item)=>item.roi >= 30 && item.roi <= 50).forEach((item)=>{
        points.push({
            type: "tip",
            text: lang === "zh" ? `${item.name}：投入 ${fmt(item.cost)}，增值 ${fmt(item.valueAdd)}，ROI ${item.roi}%` : lang === "en" ? `${item.name}: Cost ${fmt(item.cost)}, adds ${fmt(item.valueAdd)} value, ROI ${item.roi}%` : `${item.name}: Koster ${fmt(item.cost)}, tilføjer ${fmt(item.valueAdd)}, ROI ${item.roi}%`,
            value: `ROI ${item.roi}%`
        });
    });
    points.push({
        type: "info",
        text: lang === "zh" ? "🟢 低优先级（ROI < 30%）：长期投资，节能效果显著" : lang === "en" ? "🟢 Low priority (ROI < 30%): Long-term investment, significant energy savings" : "🟢 Lav prioritet (ROI < 30%): Langsigtet investering"
    });
    sorted.filter((item)=>item.roi < 30).forEach((item)=>{
        points.push({
            type: "tip",
            text: lang === "zh" ? `${item.name}：投入 ${fmt(item.cost)}，增值 ${fmt(item.valueAdd)}，ROI ${item.roi}%` : lang === "en" ? `${item.name}: Cost ${fmt(item.cost)}, adds ${fmt(item.valueAdd)} value, ROI ${item.roi}%` : `${item.name}: Koster ${fmt(item.cost)}, tilføjer ${fmt(item.valueAdd)}, ROI ${item.roi}%`,
            value: `ROI ${item.roi}%`
        });
    });
    // 节能改造补贴信息
    const energyItems = sorted.filter((item)=>item.category === "energy");
    points.push({
        type: "info",
        text: lang === "zh" ? `💰 节能改造可申请 Energistyrelsen 补贴，最高可抵扣费用 25%（热泵、太阳能板、保温）` : lang === "en" ? `💰 Energy renovations (heat pump, solar, insulation) may qualify for Energistyrelsen grants — up to 25% rebate` : `💰 Energirenoveringer kan få tilskud fra Energistyrelsen — op til 25% rabat`
    });
    return {
        title: lang === "zh" ? "装修优先级建议" : lang === "en" ? "Renovation Priority" : "Renoveringsprioritet",
        icon: "🔧",
        summary: lang === "zh" ? `按投资回报率排序，${sorted[0].name} 性价比最高（ROI ${sorted[0].roi}%）` : lang === "en" ? `Sorted by ROI, ${sorted[0].name} offers best value (${sorted[0].roi}% ROI)` : `Sorteret efter ROI, ${sorted[0].name} giver bedst værdi (${sorted[0].roi}% ROI)`,
        points,
        confidence: "medium",
        disclaimer: lang === "zh" ? "⚠️ 数据来源：基于丹麦装修市场平均成本和增值估算，实际 ROI 因房屋状况、位置、施工质量等因素差异较大。建议咨询多位承包商获取准确报价。" : lang === "en" ? "⚠️ Data source: Estimated based on Danish renovation market averages and typical value additions. Actual ROI varies significantly by condition, location, and quality. Get quotes from multiple contractors." : "⚠️ Datakilde: Estimeret baseret på danske renoveringsmarkedsgennemsnit. Faktisk ROI varierer betydeligt. Få tilbud fra flere entreprenører."
    };
}
// ---- 6. 市场趋势分析 ----
function analyzeMarket(ctx) {
    const { region, lang } = ctx;
    const points = [];
    const data = region ? REGION_MARKET[region] : null;
    if (data) {
        const trendText = data.trend === "up" ? lang === "zh" ? "上涨" : lang === "en" ? "Rising" : "Stigende" : data.trend === "down" ? lang === "zh" ? "下跌" : lang === "en" ? "Falling" : "Faldende" : lang === "zh" ? "平稳" : lang === "en" ? "Stable" : "Stabilt";
        points.push({
            type: data.trend === "up" ? "positive" : data.trend === "down" ? "negative" : "info",
            text: lang === "zh" ? `区域价格趋势：${trendText}，年均增长 ${data.growth}%` : lang === "en" ? `Area trend: ${trendText}, avg growth ${data.growth}%/year` : `Område tendens: ${trendText}, gennemsnitsvækst ${data.growth}%/år`,
            value: `${data.growth}%/år`
        });
        points.push({
            type: "info",
            text: lang === "zh" ? `区域平均成交价约 ${fmt(data.avgPrice)}/m²` : lang === "en" ? `Area average: ${fmt(data.avgPrice)}/m²` : `Område gennemsnit: ${fmt(data.avgPrice)}/m²`,
            value: `${fmt(data.avgPrice)}/m²`
        });
    }
    // 宏观丹麦市场分析
    points.push({
        type: "info",
        text: lang === "zh" ? "丹麦整体房市 2026年：利率趋于稳定，大城市需求仍强，中小城市分化加剧" : lang === "en" ? "Denmark 2026 market: rates stabilizing, major city demand remains strong, smaller cities diverging" : "Danmarks boligmarked 2026: renter stabiliserer sig, efterspørgsel stærk i storbyer"
    });
    points.push({
        type: "tip",
        text: lang === "zh" ? "参考 Danmarks Statistik 和 Boligsiden 获取最新成交数据" : lang === "en" ? "See Danmarks Statistik & Boligsiden for up-to-date transaction data" : "Se Danmarks Statistik og Boligsiden for aktuelle handelsdata"
    });
    if (!data) {
        points.push({
            type: "warning",
            text: lang === "zh" ? "请在计算器中选择具体区域以获取针对性分析" : lang === "en" ? "Select a region in the calculator for area-specific analysis" : "Vælg et område for at få en specifik analyse"
        });
    }
    return {
        title: lang === "zh" ? "市场趋势分析" : lang === "en" ? "Market Trends" : "Markedstendenser",
        icon: "🌍",
        summary: data ? lang === "zh" ? `该区域房价${data.trend === "up" ? "上涨" : data.trend === "down" ? "下跌" : "平稳"}，年变化 ${data.growth}%` : lang === "en" ? `Area prices ${data.trend === "up" ? "rising" : data.trend === "down" ? "falling" : "stable"} at ${data.growth}%/year` : `Priserne er ${data.trend === "up" ? "stigende" : data.trend === "down" ? "faldende" : "stabile"} med ${data.growth}%/år` : lang === "zh" ? "选择区域查看具体趋势" : lang === "en" ? "Select a region to see trends" : "Vælg område for tendenser",
        points,
        confidence: data ? "medium" : "low"
    };
}
// ---- 7. 比价助手 ----
function analyzeComparison(ctx) {
    const { price, region, size, lang } = ctx;
    const points = [];
    const data = region ? REGION_MARKET[region] : null;
    if (data && size) {
        const pricePerSqm = price / size;
        const ref = data.avgPrice;
        // 对比周边城市
        const NEARBY = {
            kobenhavn: [
                "frederiksberg",
                "gentofte",
                "roskilde",
                "køge"
            ],
            aarhus: [
                "horsens",
                "silkeborg",
                "randers"
            ],
            odense: [
                "middelfart",
                "svendborg",
                "fredericia"
            ],
            aalborg: [
                "frederikshavn",
                "viborg",
                "thisted"
            ],
            middelfart: [
                "fredericia",
                "vejle",
                "odense"
            ]
        };
        const nearby = region ? NEARBY[region] || [] : [];
        points.push({
            type: "info",
            text: lang === "zh" ? `该房产单价 ${fmt(pricePerSqm)}/m²，区域均价 ${fmt(ref)}/m²` : lang === "en" ? `This property: ${fmt(pricePerSqm)}/m² vs area avg ${fmt(ref)}/m²` : `Denne bolig: ${fmt(pricePerSqm)}/m² vs. gennemsnit ${fmt(ref)}/m²`,
            value: fmt(pricePerSqm)
        });
        nearby.slice(0, 3).forEach((nearRegion)=>{
            const nData = REGION_MARKET[nearRegion];
            if (nData) {
                const priceDiff = (nData.avgPrice - ref) / ref * 100;
                points.push({
                    type: priceDiff < 0 ? "positive" : "info",
                    text: lang === "zh" ? `${nearRegion}：均价 ${fmt(nData.avgPrice)}/m²（${priceDiff > 0 ? "+" : ""}${priceDiff.toFixed(0)}%），通勤距离可考虑` : lang === "en" ? `${nearRegion}: avg ${fmt(nData.avgPrice)}/m² (${priceDiff > 0 ? "+" : ""}${priceDiff.toFixed(0)}%) — worth considering for commuters` : `${nearRegion}: gns. ${fmt(nData.avgPrice)}/m² (${priceDiff > 0 ? "+" : ""}${priceDiff.toFixed(0)}%)`,
                    value: `${fmt(nData.avgPrice)}/m²`
                });
            }
        });
    }
    points.push({
        type: "tip",
        text: lang === "zh" ? "在 boligsiden.dk 搜索同区域、同大小、近3个月成交的房源，获取最真实对比" : lang === "en" ? "Search boligsiden.dk for similar homes sold in the last 3 months in your area" : "Søg på boligsiden.dk efter lignende boliger solgt inden for 3 måneder i dit område"
    });
    return {
        title: lang === "zh" ? "比价助手" : lang === "en" ? "Price Comparison" : "Prissammenligning",
        icon: "🔍",
        summary: data && size ? lang === "zh" ? `与区域均价对比，该房产每平方米溢价/折价 ${fmt(Math.abs(price / size - data.avgPrice))}` : lang === "en" ? `vs area average: ${fmt(Math.abs(price / size - data.avgPrice))}/m² ${price / size > data.avgPrice ? "premium" : "discount"}` : `Vs. gennemsnit: ${fmt(Math.abs(price / size - data.avgPrice))}/m²` : lang === "zh" ? "填写面积和区域以启用比价" : lang === "en" ? "Add size & region to compare" : "Tilføj størrelse og område for at sammenligne",
        points,
        confidence: data && size ? "medium" : "low"
    };
}
const AI_FEATURES = {
    pricing: {
        id: "pricing",
        icon: "📊",
        title: {
            zh: "智能定价",
            en: "Smart Pricing",
            da: "Prisanalyse"
        },
        desc: {
            zh: "与区域市场对比，判断房价合理性",
            en: "Compare with market to assess fair price",
            da: "Sammenlign med markedet"
        }
    },
    hidden: {
        id: "hidden",
        icon: "⚠️",
        title: {
            zh: "隐藏费用",
            en: "Hidden Costs",
            da: "Skjulte Udgifter"
        },
        desc: {
            zh: "识别容易忽略的隐性支出",
            en: "Uncover easily-missed expenses",
            da: "Opdage skjulte udgifter"
        }
    },
    loan: {
        id: "loan",
        icon: "🏦",
        title: {
            zh: "贷款优化",
            en: "Loan Optimizer",
            da: "Låneoptimering"
        },
        desc: {
            zh: "比较各银行贷款方案，找最优解",
            en: "Compare bank loans to find the best deal",
            da: "Sammenlign banklån"
        }
    },
    roi: {
        id: "roi",
        icon: "📈",
        title: {
            zh: "投资回报",
            en: "ROI Forecast",
            da: "Investeringsafkast"
        },
        desc: {
            zh: "若出租，预测年回报率和回本周期",
            en: "Rental yield & break-even forecast",
            da: "Lejeafkast og break-even"
        }
    },
    renovation: {
        id: "renovation",
        icon: "🔧",
        title: {
            zh: "装修优先级",
            en: "Renovation ROI",
            da: "Renoveringsprioritet"
        },
        desc: {
            zh: "哪些改造投资回报率最高",
            en: "Which renovations give best returns",
            da: "Hvilke renoveringer giver bedst afkast"
        }
    },
    market: {
        id: "market",
        icon: "🌍",
        title: {
            zh: "市场趋势",
            en: "Market Trends",
            da: "Markedstendenser"
        },
        desc: {
            zh: "分析区域房价涨跌趋势",
            en: "Area price trend analysis",
            da: "Prisudviklingsanalyse"
        }
    },
    compare: {
        id: "compare",
        icon: "🔍",
        title: {
            zh: "比价助手",
            en: "Price Compare",
            da: "Prissammenligning"
        },
        desc: {
            zh: "对比同区域同类型房源价格",
            en: "Compare similar properties nearby",
            da: "Sammenlign lignende boliger"
        }
    }
};
function runLocalAnalysis(feature, ctx) {
    switch(feature){
        case "pricing":
            return analyzePricing(ctx);
        case "hidden":
            return analyzeHiddenCosts(ctx);
        case "loan":
            return analyzeLoan(ctx);
        case "roi":
            return analyzeROI(ctx);
        case "renovation":
            return analyzeRenovation(ctx);
        case "market":
            return analyzeMarket(ctx);
        case "compare":
            return analyzeComparison(ctx);
        default:
            return {
                title: "Unknown",
                icon: "❓",
                summary: "Feature not found",
                points: []
            };
    }
}
async function runAIAnalysis(feature, ctx) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined);
    // 先用本地逻辑出结果，再用 AI 增强
    const localResult = runLocalAnalysis(feature, ctx);
    if (!apiKey) {
        return localResult; // 没有 API key，直接返回本地结果
    }
    const featureMeta = AI_FEATURES[feature];
    const systemPrompt = `You are a Danish real estate expert. Analyze the following property and provide ${featureMeta?.title[ctx.lang] || feature} advice in ${ctx.lang === "zh" ? "Chinese" : ctx.lang === "en" ? "English" : "Danish"}. Be concise and specific to Denmark's market. Use real Danish data.`;
    const userPrompt = `Property context:
- Price: DKK ${ctx.price.toLocaleString()}
- Region: ${ctx.region || "unknown"}
- Size: ${ctx.size || "unknown"} m²
- Transaction: ${ctx.transactionType}
- Year built: ${ctx.yearBuilt || "unknown"}
- Energy label: ${ctx.energyLabel || "unknown"}

Provide 3-5 specific insights for "${featureMeta?.title[ctx.lang]}" in JSON format:
{"summary": "...", "points": [{"type": "tip|warning|info|positive", "text": "...", "value": "optional DKK value"}]}`;
    try {
        const resp = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: userPrompt
                    }
                ],
                temperature: 0.4,
                max_tokens: 600,
                response_format: {
                    type: "json_object"
                }
            })
        });
        if (!resp.ok) throw new Error(`OpenAI ${resp.status}`);
        const data = await resp.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        return {
            ...localResult,
            summary: parsed.summary || localResult.summary,
            points: [
                ...parsed.points || [],
                ...localResult.points.slice(0, 2)
            ],
            confidence: "high"
        };
    } catch  {
        // AI 失败则静默返回本地结果
        return localResult;
    }
}
}),
"[project]/components/FormulaTooltip.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AI_FEATURE_FORMULAS",
    ()=>AI_FEATURE_FORMULAS,
    "default",
    ()=>FormulaTooltip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AI_FEATURE_FORMULAS = {
    // 1. 智能定价
    pricing: {
        title: {
            zh: "📊 智能定价计算公式",
            en: "📊 Smart Pricing Formula",
            da: "📊 Prisanalyse formel"
        },
        content: {
            zh: `计算方法：
与区域均价对比

区域均价 = 该区域最近6个月成交房产的平均单价（DKK/m²）

评估逻辑：
· 如果您的预算 > 区域均价：可能买贵了
· 如果您的预算 ≈ 区域均价：价格合理
· 如果您的预算 < 区域均价：有议价空间

数据来源：
丹麦房产成交数据（估算值）`,
            en: `Calculation Method:
Compare with area average price

Area Average = Average price per m² of recent sales in the area (last 6 months)

Assessment Logic:
· If your budget > area average: May be overpriced
· If your budget ≈ area average: Fair price
· If your budget < area average: Room for negotiation

Data Source:
Danish property sales data (estimated)`,
            da: `Beregningsmetode:
Sammenlign med områdegennemsnit

Områdegennemsnit = Gennemsnitlig pris per m² for nylige salg i området (sidste 6 måneder)

Vurderingslogik:
· Hvis din budget > områdegennemsnit: Kan være overpris
· Hvis din budget ≈ områdegennemsnit: Retfærdig pris
· Hvis din budget < områdegennemsnit: Forhandlingsrum

Datakilde:
Danske ejendomssalg (estimeret)`
        }
    },
    // 2. 隐藏费用
    hidden: {
        title: {
            zh: "⚠️ 隐藏费用计算公式",
            en: "⚠️ Hidden Costs Formula",
            da: "⚠️ Skjulte udgifter formel"
        },
        content: {
            zh: `计算方法：
基于丹麦房产交易标准费用估算

主要隐藏费用项：
1. 登记费 = 房价 × 0.6%
2. 律师费 = 房价 × 0.15% (最低10,000 DKK)
3. 产权保险 = 房价 × 0.05% (或固定2,500 DKK)
4. 房屋状况报告 ≈ 4,000-8,000 DKK
5. 电力检查报告 ≈ 1,500-3,500 DKK
6. 能源标识 ≈ 1,500-3,000 DKK

总计估算：
约为房价的 1-2%（不含中介费）`,
            en: `Calculation Method:
Based on standard Danish property transaction fees

Main Hidden Costs:
1. Land Registry Fee = Price × 0.6%
2. Legal Fees = Price × 0.15% (min 10,000 DKK)
3. Property Insurance = Price × 0.05% (or fixed 2,500 DKK)
4. Condition Report ≈ 4,000-8,000 DKK
5. Electrical Report ≈ 1,500-3,500 DKK
6. Energy Label ≈ 1,500-3,000 DKK

Total Estimate:
Approximately 1-2% of property price (excl. agent fees)`,
            da: `Beregningsmetode:
Baseret på standard danske ejendomshandelsgebyrer

Vigtige skjulte omkostninger:
1. Tinglysningsafgift = Pris × 0,6%
2. Advokathonorar = Pris × 0,15% (min 10.000 DKK)
3. Ejendomsforsikring = Pris × 0,05% (eller fast 2.500 DKK)
4. Tilstandsrapport ≈ 4.000-8.000 DKK
5. Elinstallationsrapport ≈ 1.500-3.500 DKK
6. Energimærkning ≈ 1.500-3.000 DKK

Samlet estimat:
Ca. 1-2% af ejendomsprisen (ekskl. mæglergebyrer)`
        }
    },
    // 3. 贷款优化
    loan: {
        title: {
            zh: "🏦 贷款计算公式",
            en: "🏦 Loan Calculation Formula",
            da: "🏦 Låneberegning formel"
        },
        content: {
            zh: `计算方法：
等额本息还款法

月供计算：
M = P × [r(1+r)^n] / [(1+r)^n - 1]

其中：
M = 每月还款额
P = 贷款本金
r = 月利率 (年利率 ÷ 12)
n = 还款月数

丹麦常见参数：
· 首付比例：通常 20%
· 利率：约 3-4% (2024年)
· 贷款期限：通常 20-30 年

注意事项：
实际利率因银行而异，建议比较多家银行方案`,
            en: `Calculation Method:
Equal monthly payment (annuity)

Monthly Payment Formula:
M = P × [r(1+r)^n] / [(1+r)^n - 1]

Where:
M = Monthly payment
P = Principal
r = Monthly rate (annual rate ÷ 12)
n = Number of payments

Common Danish Parameters:
· Down payment: Typically 20%
· Interest rate: ~3-4% (2024)
· Loan term: Usually 20-30 years

Note:
Actual rates vary by bank. Compare multiple options.`,
            da: `Beregningsmetode:
Lige månedlige betalinger (annuitet)

Månedlig betalingsformel:
M = P × [r(1+r)^n] / [(1+r)^n - 1]

Hvor:
M = Månedlig betaling
P = Hovedstol
r = Månedlig rente (årlig rente ÷ 12)
n = Antal betalinger

Almindelige danske parametre:
· Udbetaling: Typisk 20%
· Rente: Ca. 3-4% (2024)
· Låneperiode: Normalt 20-30 år

Bemærk:
Faktiske satser varierer efter bank. Sammenlign flere muligheder.`
        }
    },
    // 4. 投资回报
    roi: {
        title: {
            zh: "📈 投资回报计算公式",
            en: "📈 ROI Calculation Formula",
            da: "📈 Investeringsafkast formel"
        },
        content: {
            zh: `计算方法：
租金回报率分析

毛租金回报率：
毛回报率 = (年租金 ÷ 房价) × 100%

净租金回报率：
净回报率 = (年租金 × 70%) ÷ 房价 × 100%
（扣除30%：税费约15% + 维修约10% + 空置约5%）

回本周期：
回本年限 = 房价 ÷ 年净收益

示例（200万房产，100m²）：
· 月租金：180 × 100 = 18,000 DKK
· 年租金：216,000 DKK
· 毛回报率：216,000 ÷ 2,000,000 = 10.8%
· 净回报率：216,000 × 0.7 ÷ 2,000,000 = 7.5%`,
            en: `Calculation Method:
Rental yield analysis

Gross Rental Yield:
Gross Yield = (Annual Rent ÷ Price) × 100%

Net Rental Yield:
Net Yield = (Annual Rent × 70%) ÷ Price × 100%
(Deducting 30%: tax ~15% + maintenance ~10% + vacancy ~5%)

Break-even Period:
Years to Break-even = Price ÷ Annual Net Income

Example (2M property, 100m²):
· Monthly rent: 180 × 100 = 18,000 DKK
· Annual rent: 216,000 DKK
· Gross yield: 216,000 ÷ 2,000,000 = 10.8%
· Net yield: 216,000 × 0.7 ÷ 2,000,000 = 7.5%`,
            da: `Beregningsmetode:
Lejeafkast analyse

Bruttolejeafkast:
Bruttoafkast = (Årlig leje ÷ Pris) × 100%

Nettolejeafkast:
Nettoafkast = (Årlig leje × 70%) ÷ Pris × 100%
(Fratrækker 30%: skat ~15% + vedligeholdelse ~10% + tomgang ~5%)

Break-even periode:
År til break-even = Pris ÷ Årlig nettoindkomst

Eksempel (2M ejendom, 100m²):
· Månedlig leje: 180 × 100 = 18.000 DKK
· Årlig leje: 216.000 DKK
· Bruttoafkast: 216.000 ÷ 2.000.000 = 10,8%
· Nettoafkast: 216.000 × 0,7 ÷ 2.000.000 = 7,5%`
        }
    },
    // 5. 装修优先级
    renovation: {
        title: {
            zh: "🔧 装修 ROI 计算公式",
            en: "🔧 Renovation ROI Formula",
            da: "🔧 Renovering ROI formel"
        },
        content: {
            zh: `计算方法：
装修投资回报率分析

单次装修 ROI：
装修 ROI = (增值额 - 成本) ÷ 成本 × 100%

考虑增值率：
· 能源改造（热泵、保温）：增值率高（约1.5-2x投资）
· 厨房/卫生间翻新：中等增值（约1.2-1.5x投资）
· 美观改造（油漆、地板）：增值率较低（约1.1x投资）

丹麦常见装修成本估算：
· 热泵安装：80,000-150,000 DKK
· 窗户更换：3,000-6,000 DKK/扇
· 外墙保温：800-1,500 DKK/m²
· 厨房翻新：100,000-300,000 DKK`,
            en: `Calculation Method:
Renovation ROI analysis

Single Renovation ROI:
Renovation ROI = (Value Added - Cost) ÷ Cost × 100%

Value-Add Rates:
· Energy improvements (heat pump, insulation): High (~1.5-2x)
· Kitchen/bathroom renovation: Medium (~1.2-1.5x)
· Cosmetic improvements (paint, flooring): Lower (~1.1x)

Common Danish Renovation Costs:
· Heat pump installation: 80,000-150,000 DKK
· Window replacement: 3,000-6,000 DKK/window
· Wall insulation: 800-1,500 DKK/m²
· Kitchen renovation: 100,000-300,000 DKK`,
            da: `Beregningsmetode:
Renovering ROI analyse

Enkelt renovering ROI:
Renovering ROI = (Værditilvækst - Omkostning) ÷ Omkostning × 100%

Værditilvækst satser:
· Energieffektivisering (varmepumpe, isolering): Høj (~1,5-2x)
· Køkken/badeværelse renovering: Mellem (~1,2-1,5x)
· Kosmetiske forbedringer (maling, gulve): Lavere (~1,1x)

Almindelige danske renoveringsomkostninger:
· Varmepumpe installation: 80.000-150.000 DKK
· Vinduesudskiftning: 3.000-6.000 DKK/vindue
· Vægisolering: 800-1.500 DKK/m²
· Køkkenrenovering: 100.000-300.000 DKK`
        }
    },
    // 6. 市场趋势
    market: {
        title: {
            zh: "🌍 市场趋势分析说明",
            en: "🌍 Market Trend Analysis",
            da: "🌍 Markedstendens analyse"
        },
        content: {
            zh: `分析方法：
基于区域历史价格数据

趋势判断依据：
· 过去12个月价格变化
· 与全国平均涨幅对比
· 供需关系分析

趋势类型：
📈 上升：价格持续上涨，适合买入
📉 下降：价格下跌，考虑等待或议价
➡️ 稳定：价格波动小，按需购买

数据来源：
丹麦房产历史成交数据（估算）`,
            en: `Analysis Method:
Based on regional historical price data

Trend Indicators:
· Price changes over past 12 months
· Comparison with national average growth
· Supply and demand analysis

Trend Types:
📈 Rising: Prices steadily increasing, good time to buy
📉 Falling: Prices declining, consider waiting or negotiating
➡️ Stable: Minimal price fluctuation, buy as needed

Data Source:
Danish property historical sales data (estimated)`,
            da: `Analysemetode:
Baseret på regionale historiske prisdatas

Tendensindikatorer:
· Prisændringer over de seneste 12 måneder
· Sammenligning med national gennemsnitlig vækst
· Udbud og efterspørgselsanalyse

Tendens typer:
📈 Stigende: Priserne stiger støt, god tid at købe
📉 Faldende: Priserne falder, overvej at vente eller forhandle
➡️ Stabil: Minimal prissvingning, køb efter behov

Datakilde:
Danske ejendoms historiske salgsdata (estimeret)`
        }
    },
    // 7. 比价助手
    compare: {
        title: {
            zh: "🔍 比价助手说明",
            en: "🔍 Price Comparison Guide",
            da: "🔍 Prissammenligning vejledning"
        },
        content: {
            zh: `对比方法：
同区域同类型房源价格比较

比较维度：
1. 单价对比（DKK/m²）
   - 您的房产 vs 区域平均
2. 房型对比
   - 相同卧室数量的价格
3. 房龄对比
   - 同年代房子的价格区间
4. 配套对比
   - 能源标识、装修状况

评估标准：
• 低于均价10%以内：合理
• 低于均价10-20%：有竞争力
• 高于均价10%+：需谨慎`,
            en: `Comparison Method:
Compare similar properties in the same area

Comparison Dimensions:
1. Price per m²
   - Your property vs area average
2. Property Type
   - Prices for similar bedroom count
3. Age
   - Price range for similar age properties
4. Condition
   - Energy label, renovation status

Assessment Standards:
· Within 10% of average: Reasonable
· 10-20% below average: Competitive
· 10%+ above average: Proceed with caution`,
            da: `Sammenligningsmetode:
Sammenlign lignende ejendomme i samme område

Sammenligningsdimensioner:
1. Pris per m²
   - Din ejendom vs områdegennemsnit
2. Ejendomstype
   - Priser for lignende værelsetal
3. Alder
   - Prisinterval for ejendomme af lignende alder
4. Stand
   - Energimærke, renoveringsstatus

Vurderingsstandarder:
· Inden for 10% af gennemsnit: Rimelig
· 10-20% under gennemsnit: Konkurrencedygtig
· 10%+ over gennemsnit: Udvis forsigtighed`
        }
    }
};
function FormulaTooltip({ formula, lang, icon = "💡" }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-block ml-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                role: "button",
                tabIndex: 0,
                className: "inline-flex items-center justify-center w-5 h-5 text-xs text-purple-500 bg-purple-100 rounded-full cursor-pointer hover:bg-purple-200 transition-colors",
                title: lang === "zh" ? "查看计算公式" : lang === "en" ? "View formula" : "Se formel",
                onMouseEnter: ()=>setExpanded(true),
                onMouseLeave: ()=>setExpanded(false),
                onFocus: ()=>setExpanded(true),
                onBlur: ()=>setExpanded(false),
                children: icon
            }, void 0, false, {
                fileName: "[project]/components/FormulaTooltip.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-4 bottom-4 w-80 p-4 bg-white border-2 border-purple-300 rounded-xl shadow-2xl text-xs z-[100]",
                style: {
                    maxHeight: '400px',
                    overflowY: 'auto',
                    minHeight: '200px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-bold text-purple-900",
                                children: formula.title[lang]
                            }, void 0, false, {
                                fileName: "[project]/components/FormulaTooltip.tsx",
                                lineNumber: 452,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                role: "button",
                                tabIndex: 0,
                                onClick: ()=>setExpanded(false),
                                onKeyDown: (e)=>{
                                    if (e.key === "Enter" || e.key === " ") {
                                        setExpanded(false);
                                    }
                                },
                                className: "text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/components/FormulaTooltip.tsx",
                                lineNumber: 455,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FormulaTooltip.tsx",
                        lineNumber: 451,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-700 whitespace-pre-wrap leading-relaxed text-sm",
                        children: formula.content[lang].replace(/\n{3,}/g, '\n\n').replace(/\*\*/g, '').replace(/•/g, '·').trim()
                    }, void 0, false, {
                        fileName: "[project]/components/FormulaTooltip.tsx",
                        lineNumber: 469,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormulaTooltip.tsx",
                lineNumber: 447,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FormulaTooltip.tsx",
        lineNumber: 432,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/AIAdvisorPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AIAdvisorPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai-advisor.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormulaTooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FormulaTooltip.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const TYPE_STYLES = {
    tip: "bg-green-50  border-green-200  text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50   border-blue-200   text-blue-700",
    positive: "bg-emerald-50 border-emerald-200 text-emerald-800",
    negative: "bg-red-50    border-red-200    text-red-800"
};
const TYPE_ICONS = {
    tip: "💡",
    warning: "⚠️",
    info: "ℹ️",
    positive: "✅",
    negative: "❌"
};
const CONFIDENCE_BADGE = {
    high: {
        text: {
            da: "Høj sikkerhed",
            en: "High confidence",
            zh: "高可信度"
        },
        color: "bg-green-100 text-green-700"
    },
    medium: {
        text: {
            da: "Middel sikkerhed",
            en: "Moderate confidence",
            zh: "中等可信度"
        },
        color: "bg-yellow-100 text-yellow-700"
    },
    low: {
        text: {
            da: "Lav sikkerhed",
            en: "Low confidence",
            zh: "低可信度（需更多信息）"
        },
        color: "bg-gray-100 text-gray-600"
    }
};
function FeatureCard({ featureId, ctx, lang }) {
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 上下文变化时自动重新分析
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (result) {
            // 自动用新参数重新分析
            setLoading(true);
            setExpanded(true);
            const timeout = setTimeout(async ()=>{
                try {
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runAIAnalysis"])(featureId, ctx);
                    setResult(res);
                } catch  {
                    setResult((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runLocalAnalysis"])(featureId, ctx));
                } finally{
                    setLoading(false);
                }
            }, 300); // 防抖 300ms
            return ()=>clearTimeout(timeout);
        }
    }, [
        ctx.region,
        ctx.size,
        ctx.price,
        ctx.transactionType,
        featureId,
        ctx
    ]);
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AI_FEATURES"][featureId];
    const handleAnalyze = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (result) {
            setExpanded(!expanded);
            return;
        }
        setLoading(true);
        setExpanded(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runAIAnalysis"])(featureId, ctx);
            setResult(res);
        } catch  {
            setResult((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runLocalAnalysis"])(featureId, ctx));
        } finally{
            setLoading(false);
        }
    }, [
        featureId,
        ctx,
        result,
        expanded
    ]);
    const confidence = result?.confidence || "medium";
    const badge = CONFIDENCE_BADGE[confidence];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border rounded-xl overflow-hidden transition-all duration-200 ${expanded ? "border-purple-300 shadow-md" : "border-gray-200 hover:border-purple-200 hover:shadow-sm"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "w-full flex items-center justify-between p-4 bg-white hover:bg-purple-50 transition text-left",
                onClick: handleAnalyze,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl",
                                children: meta.icon
                            }, void 0, false, {
                                fileName: "[project]/components/AIAdvisorPanel.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-gray-900 text-sm",
                                        children: meta.title[lang]
                                    }, void 0, false, {
                                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormulaTooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AI_FEATURE_FORMULAS"][featureId] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormulaTooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        formula: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormulaTooltip$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AI_FEATURE_FORMULAS"][featureId],
                                        lang: lang,
                                        icon: "💡"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AIAdvisorPanel.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs px-2 py-0.5 rounded-full font-medium ${badge.color}`,
                                children: badge.text[lang]
                            }, void 0, false, {
                                fileName: "[project]/components/AIAdvisorPanel.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400 text-sm ml-1",
                                children: loading ? "⏳" : expanded ? "▲" : "▼"
                            }, void 0, false, {
                                fileName: "[project]/components/AIAdvisorPanel.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-100 bg-gradient-to-b from-purple-50 to-white p-4",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-2 py-6 text-gray-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm",
                            children: lang === "zh" ? "AI 分析中..." : lang === "en" ? "Analyzing..." : "Analyserer..."
                        }, void 0, false, {
                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                            lineNumber: 116,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AIAdvisorPanel.tsx",
                    lineNumber: 114,
                    columnNumber: 13
                }, this) : result ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-purple-900 mb-3 p-3 bg-purple-100 rounded-lg",
                            children: [
                                result.icon,
                                " ",
                                result.summary
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                            lineNumber: 123,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: result.points.map((point, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `p-3 rounded-lg border text-sm flex items-start gap-2 ${TYPE_STYLES[point.type] || TYPE_STYLES.info}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 mt-0.5",
                                            children: TYPE_ICONS[point.type]
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                                            lineNumber: 133,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: point.text
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAdvisorPanel.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 23
                                                }, this),
                                                point.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 font-bold text-xs px-1.5 py-0.5 bg-white/60 rounded",
                                                    children: point.value
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAdvisorPanel.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                                            lineNumber: 134,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/AIAdvisorPanel.tsx",
                                    lineNumber: 129,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                            lineNumber: 127,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true) : null
            }, void 0, false, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AIAdvisorPanel.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
function AIAdvisorPanel({ ctx, lang }) {
    const [showAll, setShowAll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const TITLE = {
        da: "🤖 AI Rådgiver",
        en: "🤖 AI Advisor",
        zh: "🤖 AI 智能顾问"
    };
    const SUBTITLE = {
        da: "7 intelligente analyser til at støtte din boligbeslutning",
        en: "7 smart analyses to support your property decision",
        zh: "7 项智能分析，辅助您的房产决策"
    };
    const SUBTITLE_RENOVATE = {
        da: "AI-analyse af renoveringsprioritet og investeringsafkast",
        en: "AI renovation priority and ROI analysis",
        zh: "AI 装修优先级和投资回报分析"
    };
    const SHOW_MORE = {
        da: "Vis alle analyser ▼",
        en: "Show all analyses ▼",
        zh: "展开全部分析 ▼"
    };
    const SHOW_LESS = {
        da: "Vis færre ▲",
        en: "Show fewer ▲",
        zh: "收起 ▲"
    };
    // 根据tab类型选择要显示的AI功能
    const getFeaturesForTab = ()=>{
        if (ctx.tabType === "renovate") {
            return [
                "renovation"
            ]; // 房屋改造只显示装修优先级分析
        }
        return Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AI_FEATURES"]); // 其他tab显示所有功能
    };
    const FEATURES_ALL = getFeaturesForTab();
    const visibleFeatures = showAll ? FEATURES_ALL : FEATURES_ALL.slice(0, FEATURES_ALL.length);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 bg-white rounded-2xl shadow-lg overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-white font-bold text-lg",
                        children: TITLE[lang]
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-purple-200 text-sm mt-0.5",
                        children: ctx.tabType === "renovate" ? SUBTITLE_RENOVATE[lang] : SUBTITLE[lang]
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            !ctx.price && ctx.tabType !== "renovate" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 text-center text-gray-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-4xl mb-2",
                        children: "🏠"
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: lang === "zh" ? "请先输入房产价格以启用 AI 分析" : lang === "en" ? "Enter a property price to enable AI analysis" : "Indtast en ejendomspris for at aktivere AI-analyse"
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 205,
                columnNumber: 9
            }, this) : ctx.tabType === "renovate" && !ctx.size ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 text-center text-gray-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-4xl mb-2",
                        children: "🏠"
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: lang === "zh" ? "请先输入房屋面积以启用 AI 分析" : lang === "en" ? "Enter house size to enable AI analysis" : "Indtast husstørrelse for at aktivere AI-analyse"
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 214,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3",
                        children: visibleFeatures.map((fId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureCard, {
                                featureId: fId,
                                ctx: ctx,
                                lang: lang
                            }, fId, false, {
                                fileName: "[project]/components/AIAdvisorPanel.tsx",
                                lineNumber: 226,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this),
                    FEATURES_ALL.length > 4 && ctx.tabType !== "renovate" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAll(!showAll),
                        className: "mt-3 w-full py-2 text-sm text-purple-600 hover:text-purple-800 font-medium transition",
                        children: showAll ? SHOW_LESS[lang] : SHOW_MORE[lang]
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 231,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 223,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AIAdvisorPanel.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/SmartInput.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SmartNumberInput",
    ()=>SmartNumberInput,
    "default",
    ()=>SmartInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function SmartInput({ type = "text", value, onChange, placeholder, formatDisplay, parseInput, className = "", inputClassName = "", onFocusCustom, onBlurCustom }) {
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasInteracted, setHasInteracted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 处理 focus - 清空方便用户输入
    const handleFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsFocused(true);
        if (!hasInteracted && placeholder) {
            onChange("");
        }
        onFocusCustom?.();
    }, [
        hasInteracted,
        placeholder,
        onChange,
        onFocusCustom
    ]);
    // 处理 blur
    const handleBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsFocused(false);
        onBlurCustom?.();
    }, [
        onBlurCustom
    ]);
    // 处理输入变化
    const handleChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        setHasInteracted(true);
        const rawValue = e.target.value;
        if (parseInput) {
            // 如果有解析函数（如去掉千分位），先解析再传给 onChange
            const parsed = parseInput(rawValue);
            onChange(parsed);
        } else {
            onChange(rawValue);
        }
    }, [
        parseInput,
        onChange
    ]);
    // 显示值 - 始终应用格式化（包括输入过程中）
    const displayValue = (()=>{
        if (formatDisplay && value) {
            return formatDisplay(value);
        }
        return value;
    })();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: type,
            value: displayValue,
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            placeholder: placeholder,
            className: inputClassName
        }, void 0, false, {
            fileName: "[project]/components/SmartInput.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SmartInput.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
function SmartNumberInput({ value, onChange, placeholder = "0", className = "", inputClassName = "", thousandSeparator = "." }) {
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 格式化显示值（支持输入时实时格式化）
    const formatDisplay = (val, focused)=>{
        if (!val) return "";
        // 只格式化纯数字（不接受负号、小数点等）
        const digitsOnly = val.replace(/[^0-9]/g, "");
        if (!digitsOnly) return val;
        const num = parseInt(digitsOnly, 10);
        if (isNaN(num)) return val;
        // 输入时（focus）也格式化，不再区分 blur
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    };
    const parseInput = (display)=>{
        // 去掉所有千分位符号和非数字字符
        return display.replace(/\./g, "").replace(/[^0-9]/g, "");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SmartInput, {
        type: "text",
        value: value,
        onChange: onChange,
        placeholder: placeholder,
        formatDisplay: (val)=>formatDisplay(val, isFocused),
        parseInput: parseInput,
        className: className,
        inputClassName: inputClassName,
        onFocusCustom: ()=>setIsFocused(true),
        onBlurCustom: ()=>setIsFocused(false)
    }, void 0, false, {
        fileName: "[project]/components/SmartInput.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "REGION_PRICES",
    ()=>REGION_PRICES,
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AIAdvisorPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AIAdvisorPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SmartInput.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const REGION_PRICES = {
    kobenhavn: {
        name: "København",
        avgPrice: 55000,
        trend: "stable"
    },
    frederiksberg: {
        name: "Frederiksberg",
        avgPrice: 58000,
        trend: "stable"
    },
    gentofte: {
        name: "Gentofte",
        avgPrice: 65000,
        trend: "stable"
    },
    aarhus: {
        name: "Aarhus",
        avgPrice: 32000,
        trend: "up"
    },
    odense: {
        name: "Odense",
        avgPrice: 18000,
        trend: "stable"
    },
    aalborg: {
        name: "Aalborg",
        avgPrice: 16000,
        trend: "up"
    },
    esbjerg: {
        name: "Esbjerg",
        avgPrice: 14000,
        trend: "down"
    },
    randers: {
        name: "Randers",
        avgPrice: 12000,
        trend: "stable"
    },
    kolding: {
        name: "Kolding",
        avgPrice: 18000,
        trend: "up"
    },
    horsens: {
        name: "Horsens",
        avgPrice: 15000,
        trend: "up"
    },
    vejle: {
        name: "Vejle",
        avgPrice: 17000,
        trend: "up"
    },
    roskilde: {
        name: "Roskilde",
        avgPrice: 28000,
        trend: "up"
    },
    silkeborg: {
        name: "Silkeborg",
        avgPrice: 20000,
        trend: "up"
    },
    herning: {
        name: "Herning",
        avgPrice: 14000,
        trend: "up"
    },
    holstebro: {
        name: "Holstebro",
        avgPrice: 13000,
        trend: "stable"
    },
    viborg: {
        name: "Viborg",
        avgPrice: 13000,
        trend: "stable"
    },
    fredericia: {
        name: "Fredericia",
        avgPrice: 15000,
        trend: "stable"
    },
    middelfart: {
        name: "Middelfart",
        avgPrice: 18000,
        trend: "up"
    },
    thisted: {
        name: "Thisted",
        avgPrice: 10000,
        trend: "stable"
    },
    svendborg: {
        name: "Svendborg",
        avgPrice: 14000,
        trend: "stable"
    },
    holbæk: {
        name: "Holbæk",
        avgPrice: 15000,
        trend: "up"
    },
    køge: {
        name: "Køge",
        avgPrice: 23000,
        trend: "up"
    },
    nakskov: {
        name: "Nakskov",
        avgPrice: 8000,
        trend: "down"
    },
    frederikshavn: {
        name: "Frederikshavn",
        avgPrice: 9000,
        trend: "down"
    }
};
// 中介费结构（基于真实PDF）
const AGENT_FEE_ITEMS = {
    valuation: {
        price: 4500
    },
    budget: {
        price: 5000
    },
    materials: {
        price: 5750
    },
    contract: {
        price: 6500
    },
    aftercare: {
        price: 10000
    },
    saleswork: {
        price: 10000
    },
    baseTotal: 41750
};
// 营销费用（基于真实PDF）
const MARKETING_ITEMS = {
    online: {
        price: 5000
    },
    photos: {
        price: 5000
    },
    digital: {
        price: 5250
    },
    social: {
        price: 3000
    },
    marketingTotal: 18250
};
// 第三方支出
const THIRD_PARTY_FEES = {
    ejendomsdatarapport: {
        price: 105
    },
    edh: {
        price: 473
    },
    edokument: {
        price: 509
    },
    thirdPartyTotal: 1087
};
// 其他卖房费用（基于真实PDF）
const OTHER_SELLING_COSTS = {
    halfInsurance: {
        price: 7500
    },
    reports: {
        price: 12695
    },
    liability: {
        price: 1963
    },
    digitalTinglysning: {
        price: 6250
    },
    settlement: {
        price: 2250
    },
    bankCosts: {
        price: 5695
    }
};
// 买房固定费用（2026年真实丹麦市场数据）
// 数据来源: Finanstilsynet, SKAT, Forbrugerrådet Tænk
const BUYING_FIXED_COSTS = {
    // 律师费/公证费 - 包含25% VAT
    advokat: {
        price: 15000,
        note: "Advokatomkostninger (inkl. moms)"
    },
    // 房产评估费 - 银行贷款需要
    taksering: {
        price: 7500,
        note: "Ejendomsvurdering"
    },
    // 贷款设立费 - 银行手续费
    stiftelsesgebyr: {
        price: 2000,
        note: "Bankens stiftelsesomkostninger"
    },
    // 验房报告 - 卖方提供，买方也可自购
    tilstandsrapport: {
        price: 0,
        note: "Tilstandsrapport (sælger betaler)"
    },
    // 电力检查报告
    elrapport: {
        price: 0,
        note: "Elinstallationsrapport (sælger betaler)"
    },
    // 能源标签 - 通常卖方提供
    energimrkning: {
        price: 0,
        note: "Energimærkning (sælger betaler)"
    },
    // 产权保险（可选但推荐）
    ejerskifteforsikring: {
        price: 5000,
        note: "Ejerskifteforsikring (anbefales)"
    }
};
// 太阳能板数据
const SOLAR_DATA = {
    costPerKwp: 12000,
    areaPerKwp: 7,
    annualKwhPerKwp: 1000,
    electricityPrice: 2.5
};
// 热泵数据（基于丹麦市场数据）
const HEATPUMP_DATA = {
    // 空气源热泵：初期投入低，但效率较低
    air: {
        cost: 150000,
        savings: 14000,
        efficiency: 300
    },
    // 地源热泵：初期投入高，但效率高，长期更省钱
    ground: {
        cost: 280000,
        savings: 25000,
        efficiency: 450
    },
    annualHeatingCost: 20000
};
// 窗户数据
const WINDOW_DATA = {
    costPerWindow: 8000
};
// 保暖改造数据
const INSULATION_DATA = {
    wall: {
        costPerSqm: 800,
        saving: 15
    },
    attic: {
        costPerSqm: 400,
        saving: 10
    },
    floor: {
        costPerSqm: 600,
        saving: 8
    }
};
// ==================== 翻译配置 ====================
const translations = {
    da: {
        title: "BoligBeregner Danmark",
        subtitle: "Beregn alle omkostninger ved køb, salg og renovering i Danmark",
        tabs: {
            buy: "Jeg vil købe bolig",
            sell: "Jeg vil sælge bolig",
            renovate: "Renovering",
            market: "Boligmarked",
            pdf: "📄 Analyser tilbud"
        },
        priceLabel: "Min budget (DKK)",
        calculate: "Beregn omkostninger",
        totalCosts: "Samlede omkostninger",
        netProceeds: "Netto provenu",
        // 买房费用项
        tinglysning: "Tinglysningsafgift (0,6%)",
        berigtigelse: "Berigtigelseshonorar",
        ejerskifteforsikring: "Ejerskifteforsikring",
        tilstandsrapport: "Tilstandsrapport",
        elinstallationsrapport: "Elinstallationsrapport",
        energimrkning: "Energimærkning",
        // 卖房费用项 - 中介费
        agentFee: "Mæglerhonorar (inkl. moms)",
        agentValuation: "  - Vurdering og prisansættelse",
        agentBudget: "  - Salgsbudget",
        agentMaterials: "  - Salgsmateriale",
        agentContract: "  - Købsaftale",
        agentAftercare: "  - Efternøgle",
        agentSalesWork: "  - Salgsarbejde",
        // 卖房费用项 - 营销费
        marketingFee: "Markedsføringsomkostninger",
        marketingOnline: "  - Netannonce",
        marketingPhotos: "  - Fotosuite",
        marketingDigital: "  - Digital markedsføring",
        marketingSocial: "  - Sociale medier",
        // 卖房费用项 - 第三方
        thirdParty: "Tredjepartsudlæg",
        ejendomsdatarapport: "  - Ejendomsdatarapport",
        edh: "  - EDH dokument",
        edokument: "  - E-dokumentation",
        // 卖房费用项 - 其他
        otherCosts: "Øvrige omkostninger",
        halfInsurance: "  - Halv ejerskifteforsikring",
        reports: "  - Tilstands- og elrapport",
        liability: "  - Sælgeransvarsforsikring",
        digitalTinglysning: "  - Digital tinglysning",
        settlement: "  - Aflæsning og afslutning",
        bankCosts: "  - Bankgebyrer",
        needLoan: "Har du brug for et boliglån?",
        compareLoan: "Sammenlign boliglån →",
        needInsurance: "Har du brug for forsikring?",
        compareInsurance: "Sammenlign forsikring →",
        // 改造相关
        houseSize: "Boligareal (m²)",
        solarTitle: "☀️ Solceller / Solenergi",
        solarKw: "Ønsket effekt (kW)",
        solarCost: "Anlægspris",
        solarArea: "Nødvendig tagareal",
        solarAnnual: "Årlig produktion",
        solarSavings: "Årlig besparelse",
        solarPayback: "Tilbagebetaling",
        solarYears: "år",
        heatPumpTitle: "🌡️ Varmepumpe",
        heatPumpType: "Varmepumpetype",
        heatPumpAir: "Luft-til-vand (anbefalet)",
        heatPumpGround: "Jordvarme",
        heatPumpCost: "Anlægspris",
        heatPumpNewCost: "Ny årlig varmeregning",
        heatPumpSavings: "Årlig besparelse",
        heatPumpPayback: "Tilbagebetaling",
        windowsTitle: "🪟 Vinduer & Døre",
        windowCount: "Antal vinduer",
        windowCost: "Samlet pris",
        insulationTitle: "🏠 Isolering",
        renovationTypes: "Vælg forbedringer",
        wallInsulation: "Vægisolering",
        atticInsulation: "Loftsisolering",
        floorInsulation: "Gulvisolering",
        insulationCost: "Samlet pris",
        insulationSavings: "Årlig besparelse",
        getQuotes: "Få tilbud fra leverandører →",
        // 房贷计算器
        showLoanCalc: "Vis boliglånsberegner",
        hideLoanCalc: "Skjul boliglånsberegner",
        downPayment: "Udbetaling",
        interestRate: "Rente (%)",
        loanTerm: "Låneperiode",
        monthlyPayment: "Månedlig ydelse",
        totalInterest: "Samlet rente",
        loanAmount: "Lånebeløb",
        aiAdvice: "💡 Anbefalinger",
        // 费用类别标题
        categoryAgent: "🏷️ Mæglerhonorar",
        categoryMarketing: "📢 Markedsføring",
        categoryThirdParty: "📋 Tredjepartsudlæg",
        categoryOther: "🔧 Øvrige",
        categoryBuying: "💰 Købsomkostninger",
        // 买房模块 - 登记费
        tinglysningTitle: "📋 Tinglysningsafgift",
        segmentTotal: "I alt",
        // 买房模块 - 银行与律师
        bankAdvokat: "🏦 Bank & Advokat",
        advokatomkostninger: "Advokatomkostninger (inkl. moms)",
        ejendomsvurdering: "Ejendomsvurdering",
        bankRequires: "(kræves af bank)",
        stiftelsesgebyr: "Stiftelsesgebyr",
        bankFee: "(bankens gebyr)",
        // 买房模块 - 推荐项目
        recommendedOptional: "🛡️ Anbefalede (valgfri)",
        sellerPaysNote: "* Tilstandsrapport, elrapport og energimærkning betales typisk af sælger",
        // 买房模块 - 购房总价
        totalPurchasePrice: "Faktisk købspris",
        // 房贷计算器
        mortgageCalculator: "🏦 Boliglånsberegner",
        years: "år",
        month: "md.",
        // 市场模块
        danishPropertyMarket: "📊 Dansk Boligmarked",
        selectCityHint: "Vælg en by for at se...",
        selectCityRegion: "Vælg by / region",
        avgPricePerSqm: "Gns. pris/m²",
        typical120m2: "Typisk 120m² samlet",
        marketTrend: "Markedstrend",
        rising: "↑ Stigende",
        falling: "↓ Faldende",
        stable: "→ Stabil",
        quickMortgage: "🏦 Hurtig boliglånberegning",
        targetPrice: "Ønsket boligpris (kr)",
        estMonthlyPayment: "Est. månedlig ydelse (80% LTV, 3,2%, 30 år)",
        loanAmountCalc: "Lånebeløb",
        nearbyAmenities: "🗺️ Nærliggende faciliteter",
        typicalLivingEnv: "Typisk bomiljø i %s",
        schools: "Skoler",
        walk10min: "10 min gang",
        hospital: "Hospital/Klinik",
        goodInBig: "God i storbyer",
        publicTransport: "Offentlig transport",
        metroBus: "Metro + Bus",
        bus: "Bus",
        supermarket: "Supermarked",
        gym: "Fitnesscenter",
        shopping: "Shopping",
        localMall: "Lokal indkøbscenter",
        viewOnMaps: "Se %s på Google Maps",
        compareRates: "🏦 Sammenlign boliglånsrenter →"
    },
    en: {
        title: "Denmark Home Calculator",
        subtitle: "Calculate all costs when buying/selling property in Denmark",
        tabs: {
            buy: "I Want to Buy",
            sell: "I Want to Sell",
            renovate: "Renovate",
            market: "Property Market",
            pdf: "📄 PDF Analysis"
        },
        priceLabel: "My budget (DKK)",
        calculate: "Calculate costs",
        totalCosts: "Total costs",
        netProceeds: "Net proceeds",
        // Buying costs
        tinglysning: "Land registry fee (0.6%)",
        berigtigelse: "Legal fees",
        ejerskifteforsikring: "Property transfer insurance",
        tilstandsrapport: "Building condition report",
        elinstallationsrapport: "Electrical inspection report",
        energimrkning: "Energy label",
        // Selling costs - Agent
        agentFee: "Real estate agent fee (incl. VAT)",
        agentValuation: "  - Valuation and pricing",
        agentBudget: "  - Sales budget",
        agentMaterials: "  - Sales materials",
        agentContract: "  - Purchase agreement",
        agentAftercare: "  - Aftercare",
        agentSalesWork: "  - Sales work",
        // Selling costs - Marketing
        marketingFee: "Marketing costs",
        marketingOnline: "  - Online advertising",
        marketingPhotos: "  - Photo package",
        marketingDigital: "  - Digital marketing",
        marketingSocial: "  - Social media ads",
        // Selling costs - Third party
        thirdParty: "Third-party expenses",
        ejendomsdatarapport: "  - Property data report",
        edh: "  - EDH document",
        edokument: "  - E-documentation",
        // Selling costs - Other
        otherCosts: "Other costs",
        halfInsurance: "  - Half property insurance",
        reports: "  - Condition & electrical reports",
        liability: "  - Seller liability insurance",
        digitalTinglysning: "  - Digital registration",
        settlement: "  - Meter reading & settlement",
        bankCosts: "  - Bank fees",
        needLoan: "Need a mortgage?",
        compareLoan: "Compare mortgages →",
        needInsurance: "Need insurance?",
        compareInsurance: "Compare insurance →",
        // Renovation
        houseSize: "House area (m²)",
        solarTitle: "☀️ Solar Panels",
        solarKw: "Desired capacity (kW)",
        solarCost: "System cost",
        solarArea: "Required roof area",
        solarAnnual: "Annual production",
        solarSavings: "Annual savings",
        solarPayback: "Payback period",
        solarYears: "years",
        heatPumpTitle: "🌡️ Heat Pump",
        heatPumpType: "Heat pump type",
        heatPumpAir: "Air-to-water (recommended)",
        heatPumpGround: "Ground source",
        heatPumpCost: "System cost",
        heatPumpNewCost: "New annual heating cost",
        heatPumpSavings: "Annual savings",
        heatPumpPayback: "Payback period",
        windowsTitle: "🪟 Windows & Doors",
        windowCount: "Number of windows",
        windowCost: "Total cost",
        insulationTitle: "🏠 Insulation",
        renovationTypes: "Select improvements",
        wallInsulation: "Wall insulation",
        atticInsulation: "Attic insulation",
        floorInsulation: "Floor insulation",
        insulationCost: "Total cost",
        insulationSavings: "Annual savings",
        getQuotes: "Get quotes from suppliers →",
        // Mortgage calculator
        showLoanCalc: "Show mortgage calculator",
        hideLoanCalc: "Hide mortgage calculator",
        downPayment: "Down payment",
        interestRate: "Interest rate (%)",
        loanTerm: "Loan term",
        monthlyPayment: "Monthly payment",
        totalInterest: "Total interest",
        loanAmount: "Loan amount",
        aiAdvice: "💡 Recommendations",
        // Category titles
        categoryAgent: "🏷️ Agent Fee",
        categoryMarketing: "📢 Marketing",
        categoryThirdParty: "📋 Third Party",
        categoryOther: "🔧 Other Costs",
        categoryBuying: "💰 Buying Costs",
        // Buy module - Registry fee
        tinglysningTitle: "📋 Land Registry Fee",
        segmentTotal: "Total",
        // Buy module - Bank & Lawyer
        bankAdvokat: "🏦 Bank & Lawyer",
        advokatomkostninger: "Legal fees (incl. VAT)",
        ejendomsvurdering: "Property valuation",
        bankRequires: "(required by bank)",
        stiftelsesgebyr: "Loan setup fee",
        bankFee: "(bank fee)",
        // Buy module - Recommended
        recommendedOptional: "🛡️ Recommended (optional)",
        sellerPaysNote: "* Condition report, electrical report and energy label are typically paid by seller",
        // Buy module - Total purchase
        totalPurchasePrice: "Total purchase price",
        // Mortgage calculator
        mortgageCalculator: "🏦 Mortgage Calculator",
        years: "years",
        month: "month",
        // Market module
        danishPropertyMarket: "📊 Danish Property Market",
        selectCityHint: "Select a city to see...",
        selectCityRegion: "Select City / Region",
        avgPricePerSqm: "Avg. price/m²",
        typical120m2: "Typical 120m² total",
        marketTrend: "Market trend",
        rising: "↑ Rising",
        falling: "↓ Falling",
        stable: "→ Stable",
        quickMortgage: "🏦 Quick Mortgage Estimate",
        targetPrice: "Target price (kr)",
        estMonthlyPayment: "Est. monthly payment (80% LTV, 3.2%, 30yr)",
        loanAmountCalc: "Loan amount",
        nearbyAmenities: "🗺️ Nearby Amenities",
        typicalLivingEnv: "Typical living environment in %s",
        schools: "Schools",
        walk10min: "10 min walk",
        hospital: "Hospital/Clinic",
        goodInBig: "Good in big cities",
        publicTransport: "Public Transport",
        metroBus: "Metro + Bus",
        bus: "Bus",
        supermarket: "Supermarket",
        gym: "Gym",
        shopping: "Shopping",
        localMall: "Local mall",
        viewOnMaps: "View %s on Google Maps",
        compareRates: "🏦 Compare mortgage rates →"
    },
    zh: {
        title: "丹麦房产计算器",
        subtitle: "计算在丹麦买房/卖房/改造的所有费用",
        tabs: {
            buy: "我要买房",
            sell: "我要卖房",
            renovate: "房屋改造",
            market: "房价市场",
            pdf: "📄 PDF报价分析"
        },
        priceLabel: "我的报价 (丹麦克朗)",
        calculate: "计算费用",
        totalCosts: "总费用",
        netProceeds: "净收益",
        // 买房费用
        tinglysning: "登记费 (0.6%)",
        berigtigelse: "律师费/公证费",
        ejerskifteforsikring: "产权保险",
        tilstandsrapport: "房屋状况报告",
        elinstallationsrapport: "电力检查报告",
        energimrkning: "能源标识",
        // 卖房费用 - 中介费
        agentFee: "中介费（含增值税）",
        agentValuation: "  - 估值和定价",
        agentBudget: "  - 销售预算",
        agentMaterials: "  - 销售资料",
        agentContract: "  - 起草购买协议",
        agentAftercare: "  - 售后服务",
        agentSalesWork: "  - 销售工作",
        // 卖房费用 - 营销费
        marketingFee: "营销费用",
        marketingOnline: "  - 网上广告",
        marketingPhotos: "  - 照片套餐",
        marketingDigital: "  - 数字营销",
        marketingSocial: "  - 社交媒体广告",
        // 卖房费用 - 第三方
        thirdParty: "第三方支出",
        ejendomsdatarapport: "  - 房产数据报告",
        edh: "  - EDH文档",
        edokument: "  - 电子文档",
        // 卖房费用 - 其他
        otherCosts: "其他费用",
        halfInsurance: "  - 半份产权保险",
        reports: "  - 验房+电力报告",
        liability: "  - 卖家责任险",
        digitalTinglysning: "  - 数字产权证",
        settlement: "  - 结算/读表",
        bankCosts: "  - 银行费用",
        needLoan: "需要房贷吗？",
        compareLoan: "比较房贷 →",
        needInsurance: "需要保险吗？",
        compareInsurance: "比较保险 →",
        // 改造相关
        houseSize: "房屋面积 (平方米)",
        solarTitle: "☀️ 太阳能板",
        solarKw: "期望功率 (kW)",
        solarCost: "系统价格",
        solarArea: "所需屋顶面积",
        solarAnnual: "年发电量",
        solarSavings: "年节省",
        solarPayback: "回收期",
        solarYears: "年",
        heatPumpTitle: "🌡️ 热泵",
        heatPumpType: "热泵类型",
        heatPumpAir: "空气源热泵 (推荐)",
        heatPumpGround: "地源热泵",
        heatPumpCost: "系统价格",
        heatPumpNewCost: "新年取暖费",
        heatPumpSavings: "年节省",
        heatPumpPayback: "回收期",
        windowsTitle: "🪟 窗户与门",
        windowCount: "窗户数量",
        windowCost: "总价",
        insulationTitle: "🏠 保暖改造",
        renovationTypes: "选择改造项目",
        wallInsulation: "墙体保温",
        atticInsulation: "阁楼保温",
        floorInsulation: "地板保温",
        insulationCost: "总价",
        insulationSavings: "年节省",
        getQuotes: "获取报价 →",
        // 房贷计算器
        showLoanCalc: "显示房贷计算器",
        hideLoanCalc: "隐藏房贷计算器",
        downPayment: "首付",
        interestRate: "利率 (%)",
        loanTerm: "贷款期限",
        monthlyPayment: "月供",
        totalInterest: "总利息",
        loanAmount: "贷款金额",
        aiAdvice: "💡 智能建议",
        // 费用类别标题
        categoryAgent: "🏷️ 中介费",
        categoryMarketing: "📢 营销费",
        categoryThirdParty: "📋 第三方",
        categoryOther: "🔧 其他费用",
        categoryBuying: "💰 买房费用",
        // 买房模块 - 登记费
        tinglysningTitle: "📋 登记费",
        segmentTotal: "合计",
        // 买房模块 - 银行与律师
        bankAdvokat: "🏦 银行与律师",
        advokatomkostninger: "律师费（含增值税）",
        ejendomsvurdering: "房产评估",
        bankRequires: "（银行要求）",
        stiftelsesgebyr: "贷款设立费",
        bankFee: "（银行手续费）",
        // 买房模块 - 推荐项目
        recommendedOptional: "🛡️ 推荐项目（可选）",
        sellerPaysNote: "* 房屋状况报告、电力检查报告和能源标识通常由卖家支付",
        // 买房模块 - 购房总价
        totalPurchasePrice: "实际购房总价",
        // 房贷计算器
        mortgageCalculator: "🏦 房贷计算器",
        years: "年",
        month: "月",
        // 市场模块
        danishPropertyMarket: "📊 丹麦房价市场",
        selectCityHint: "选择城市查看...",
        selectCityRegion: "选择城市/地区",
        avgPricePerSqm: "平均单价",
        typical120m2: "典型120m²总价",
        marketTrend: "市场趋势",
        rising: "↑ 上涨中",
        falling: "↓ 下跌中",
        stable: "→ 平稳",
        quickMortgage: "🏦 快速房贷估算",
        targetPrice: "意向房价 (kr)",
        estMonthlyPayment: "月供估算（80%贷款，3.2%利率，30年）",
        loanAmountCalc: "贷款金额",
        nearbyAmenities: "🗺️ 周边生活环境",
        typicalLivingEnv: "%s 典型居住环境",
        schools: "学校",
        walk10min: "步行10分钟内",
        hospital: "医院/诊所",
        goodInBig: "大城市覆盖好",
        publicTransport: "公共交通",
        metroBus: "地铁+公交",
        bus: "公交",
        supermarket: "超市",
        gym: "健身房",
        shopping: "购物商圈",
        localMall: "本地购物中心",
        viewOnMaps: "在 Google Maps 查看 %s",
        compareRates: "🏦 比较最低利率房贷 →"
    }
};
// ==================== 计算函数 ====================
function calculateSellingCosts(price) {
    const agentFee = AGENT_FEE_ITEMS.baseTotal;
    const marketingFee = MARKETING_ITEMS.marketingTotal;
    const thirdParty = THIRD_PARTY_FEES.thirdPartyTotal;
    const otherCosts = OTHER_SELLING_COSTS.halfInsurance.price + OTHER_SELLING_COSTS.reports.price + OTHER_SELLING_COSTS.liability.price + OTHER_SELLING_COSTS.digitalTinglysning.price + OTHER_SELLING_COSTS.settlement.price + OTHER_SELLING_COSTS.bankCosts.price;
    const total = agentFee + marketingFee + thirdParty + otherCosts;
    return {
        agentFee,
        marketingFee,
        thirdParty,
        otherCosts,
        total,
        netProceeds: price - total,
        // 分项详情
        agentBreakdown: AGENT_FEE_ITEMS,
        marketingBreakdown: MARKETING_ITEMS,
        thirdPartyBreakdown: THIRD_PARTY_FEES,
        otherBreakdown: OTHER_SELLING_COSTS
    };
}
// 登记费（Tinglysningsafgift）累进制计算（丹麦官方算法）
// 数据来源: SKAT Danmark 2026
function calculateTinglysningsafgift(price) {
    let tinglysning = 0;
    if (price <= 260000) {
        tinglysning = 1090; // 固定费用
    } else if (price <= 930000) {
        tinglysning = 1090 + (price - 260000) * 0.015;
    } else if (price <= 1860000) {
        tinglysning = 1090 + 670000 * 0.015 + (price - 930000) * 0.01;
    } else {
        tinglysning = 1090 + 670000 * 0.015 + 930000 * 0.01 + (price - 1860000) * 0.006;
    }
    return Math.round(tinglysning);
}
function calculateBuyingCosts(price) {
    const tinglysning = calculateTinglysningsafgift(price);
    // 只计算买方实际需要支付的费用（排除卖方支付的）
    const fixedCosts = Object.values(BUYING_FIXED_COSTS).reduce((sum, item)=>sum + item.price, 0);
    const total = tinglysning + fixedCosts;
    return {
        tinglysning,
        fixedCosts,
        total,
        totalWithPrice: price + total,
        tinglysningBreakdown: getTinglysningBreakdown(price)
    };
}
// 登记费分段明细
function getTinglysningBreakdown(price) {
    const breakdown = [];
    if (price <= 260000) {
        breakdown.push({
            range: "0 - 260.000 kr",
            percent: "fast",
            amount: 1090
        });
    } else if (price <= 930000) {
        breakdown.push({
            range: "0 - 260.000 kr",
            percent: "fast",
            amount: 1090
        });
        breakdown.push({
            range: "260.001 - 930.000 kr",
            percent: "1,5%",
            amount: Math.round((price - 260000) * 0.015)
        });
    } else if (price <= 1860000) {
        breakdown.push({
            range: "0 - 260.000 kr",
            percent: "fast",
            amount: 1090
        });
        breakdown.push({
            range: "260.001 - 930.000 kr",
            percent: "1,5%",
            amount: 10050
        });
        breakdown.push({
            range: "930.001 - 1.860.000 kr",
            percent: "1,0%",
            amount: Math.round((price - 930000) * 0.01)
        });
    } else {
        breakdown.push({
            range: "0 - 260.000 kr",
            percent: "fast",
            amount: 1090
        });
        breakdown.push({
            range: "260.001 - 930.000 kr",
            percent: "1,5%",
            amount: 10050
        });
        breakdown.push({
            range: "930.001 - 1.860.000 kr",
            percent: "1,0%",
            amount: 9300
        });
        breakdown.push({
            range: "Over 1.860.000 kr",
            percent: "0,6%",
            amount: Math.round((price - 1860000) * 0.006)
        });
    }
    return breakdown;
}
function calculateLoan(params) {
    const { price, downPaymentPercent, rate, years } = params;
    const loanAmount = price * (1 - downPaymentPercent / 100);
    const monthlyRate = rate / 100 / 12;
    const totalPayments = years * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const totalPaid = monthlyPayment * totalPayments;
    const totalInterest = totalPaid - loanAmount;
    return {
        loanAmount,
        monthlyPayment,
        totalInterest,
        totalPaid
    };
}
function generateAIAdvice(price, type, language) {
    const advice = [];
    if (type === "sell") {
        // 费用占比提醒
        const totalCost = calculateSellingCosts(price).total;
        const costPercent = (totalCost / price * 100).toFixed(1);
        if (language === "zh") {
            advice.push({
                type: "info",
                icon: "💡",
                text: `卖房费用约占房价的 ${costPercent}%，约 ${totalCost.toLocaleString()} kr`
            });
            advice.push({
                type: "tip",
                icon: "📸",
                text: "建议：请专业摄影师拍摄房屋照片，可提升售价5-10%"
            });
            advice.push({
                type: "warning",
                icon: "🔍",
                text: "买房者通常会在交房前要求验房，建议提前准备"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "多家比较房贷利率，当前市场利率约3-4% (FlexKort)"
            });
        } else if (language === "en") {
            advice.push({
                type: "info",
                icon: "💡",
                text: `Selling costs are approximately ${costPercent}% of property price`
            });
            advice.push({
                type: "tip",
                icon: "📸",
                text: "Professional photos can increase sale price by 5-10%"
            });
            advice.push({
                type: "warning",
                icon: "🔍",
                text: "Buyers usually require inspection before closing"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "Compare mortgage rates - current market ~3-4% (FlexKort)"
            });
        } else {
            advice.push({
                type: "info",
                icon: "💡",
                text: `Salgsomkostninger udgør ca. ${costPercent}% af boligprisen`
            });
            advice.push({
                type: "tip",
                icon: "📸",
                text: "Professionelle fotos kan øge salgsprisen med 5-10%"
            });
            advice.push({
                type: "warning",
                icon: "🔍",
                text: "Købere kræver typisk inspektion før overdragelse"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "Sammenlign boliglånsrenter - nuværende marked ~3-4% (FlexKort)"
            });
        }
    } else {
        // 买房建议
        if (language === "zh") {
            advice.push({
                type: "tip",
                icon: "🔍",
                text: "买房前建议聘请专业验房师检查房屋状况"
            });
            advice.push({
                type: "tip",
                icon: "📋",
                text: "丹麦法律规定卖家必须提供验房报告"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "多家比较房贷利率，当前市场参考利率：5年固定约3.5%，10年固定约3.8%"
            });
            advice.push({
                type: "warning",
                icon: "⚠️",
                text: "外国人购房可能需要额外准备文件和更高的首付"
            });
        } else if (language === "en") {
            advice.push({
                type: "tip",
                icon: "🔍",
                text: "Hire a professional inspector before buying"
            });
            advice.push({
                type: "tip",
                icon: "📋",
                text: "Danish law requires sellers to provide condition report"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "Compare mortgage rates: 5-year fixed ~3.5%, 10-year fixed ~3.8%"
            });
            advice.push({
                type: "warning",
                icon: "⚠️",
                text: "Foreigners may need additional documentation and higher down payment"
            });
        } else {
            advice.push({
                type: "tip",
                icon: "🔍",
                text: "Få en professionel bygningsinspektør før køb"
            });
            advice.push({
                type: "tip",
                icon: "📋",
                text: "Dansk lovgivning kræver sælger tilstandsrapport"
            });
            advice.push({
                type: "tip",
                icon: "🏦",
                text: "Sammenlign boliglånsrenter: 5-års fast ~3,5%, 10-års fast ~3,8%"
            });
            advice.push({
                type: "warning",
                icon: "⚠️",
                text: "Udlændinge kan have brug for ekstra dokumentation og højere udbetaling"
            });
        }
    }
    return advice;
}
// ==================== PDF 解析函数 ====================
async function extractTextFromPDF(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = async (e)=>{
            try {
                const typedArray = new Uint8Array(e.target?.result);
                // 动态导入 pdf.js
                const pdfjsLib = window.pdfjsLib;
                if (!pdfjsLib) {
                    // 如果没有加载 pdf.js，返回原始文本（用户可以从 PDF 中复制）
                    reject(new Error('PDF.js not loaded'));
                    return;
                }
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                const pdf = await pdfjsLib.getDocument(typedArray).promise;
                let fullText = '';
                for(let i = 1; i <= pdf.numPages; i++){
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map((item)=>item.str).join(' ');
                    fullText += pageText + '\n';
                }
                resolve(fullText);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
function Home() {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("buy");
    const [price, setPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("2000000");
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("da");
    // AI 分析相关
    const [selectedRegion, setSelectedRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [propertyArea, setPropertyArea] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // 改造相关
    const [houseSize, setHouseSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [solarKw, setSolarKw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [heatPumpType, setHeatPumpType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("air");
    const [windowCount, setWindowCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [renovations, setRenovations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // 贷款相关
    const [showLoan, setShowLoan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [downPaymentPercent, setDownPaymentPercent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(20);
    const [loanRate, setLoanRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(3.2);
    const [loanYears, setLoanYears] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(30);
    // 房价市场模块
    const [marketCity, setMarketCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("kobenhavn");
    const [marketMortgage, setMarketMortgage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // AI 分析模块 - 交易类型
    const [analyzeType, setAnalyzeType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("buy");
    // 报价分析模块
    const [quoteText, setQuoteText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [quoteAnalysis, setQuoteAnalysis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [analyzeLoading, setAnalyzeLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pdfFile, setPdfFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pdfLoading, setPdfLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 反馈表单模块
    const [feedbackText, setFeedbackText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [feedbackLink, setFeedbackLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [feedbackImage, setFeedbackImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewImage, setPreviewImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitSuccess, setSubmitSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // 计算结果
    const sellingCosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>price ? calculateSellingCosts(parseFloat(price)) : null, [
        price
    ]);
    const buyingCosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>price ? calculateBuyingCosts(parseFloat(price)) : null, [
        price
    ]);
    const loanResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>price && showLoan ? calculateLoan({
            price: parseFloat(price),
            downPaymentPercent,
            rate: loanRate,
            years: loanYears
        }) : null, [
        price,
        downPaymentPercent,
        loanRate,
        loanYears,
        showLoan
    ]);
    const aiAdvice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>price && !showLoan ? generateAIAdvice(parseFloat(price), tab === "buy" ? "buy" : "sell", language) : [], [
        price,
        tab,
        language,
        showLoan
    ]);
    // AI Advisor Panel 上下文
    const aiContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // 房屋改造tab不需要price，使用houseSize
        if (tab === "renovate") {
            return {
                price: houseSize ? parseFloat(houseSize) * 20000 : 1000000,
                transactionType: "buy",
                region: selectedRegion || undefined,
                size: houseSize ? parseFloat(houseSize) : undefined,
                lang: language,
                tabType: "renovate",
                renovations: renovations
            };
        }
        // 买房/卖房tab需要price
        if (!price) return null;
        const transactionType = tab === "buy" ? "buy" : "sell";
        return {
            price: parseFloat(price),
            transactionType,
            region: selectedRegion || undefined,
            size: propertyArea ? parseFloat(propertyArea) : undefined,
            lang: language,
            tabType: tab === "buy" ? "buy" : tab === "sell" ? "sell" : undefined
        };
    }, [
        price,
        tab,
        selectedRegion,
        propertyArea,
        language,
        houseSize,
        renovations
    ]);
    const t = translations[language];
    // 格式化货币显示（丹麦格式：点作千分位，如 1.275.000）
    const formatCurrency = (amount)=>{
        return Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' kr';
    };
    // 输入框显示格式化（千分位）
    const formatInputDisplay = (val)=>{
        if (!val) return '';
        const num = parseFloat(val);
        if (isNaN(num)) return val;
        return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    // 解析输入框中的格式化数字（去掉千分位点）
    const parseInputValue = (display)=>{
        // 去掉所有点（千分位），得到纯数字字符串
        return display.replace(/\./g, '').replace(/[^0-9]/g, '');
    };
    // 改造计算
    const solarResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!solarKw) return null;
        const kw = parseFloat(solarKw);
        const cost = kw * SOLAR_DATA.costPerKwp;
        const area = kw * SOLAR_DATA.areaPerKwp;
        const annualKwh = kw * SOLAR_DATA.annualKwhPerKwp;
        const annualSavings = annualKwh * SOLAR_DATA.electricityPrice;
        const payback = cost / annualSavings;
        return {
            cost,
            area,
            annualKwh,
            annualSavings,
            payback
        };
    }, [
        solarKw
    ]);
    const heatPumpResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const data = HEATPUMP_DATA[heatPumpType];
        const savings = data.savings;
        const payback = data.cost / savings;
        return {
            ...data,
            savings,
            payback
        };
    }, [
        heatPumpType
    ]);
    const windowResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!windowCount) return null;
        const count = parseInt(windowCount);
        const cost = count * WINDOW_DATA.costPerWindow;
        return {
            cost
        };
    }, [
        windowCount
    ]);
    const insulationResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!houseSize || renovations.length === 0) return null;
        const size = parseFloat(houseSize);
        let totalCost = 0;
        let totalSavings = 0;
        renovations.forEach((r)=>{
            if (r === 'wall') {
                totalCost += size * 0.4 * INSULATION_DATA.wall.costPerSqm;
                totalSavings += size * 0.4 * INSULATION_DATA.wall.saving;
            } else if (r === 'attic') {
                totalCost += size * 0.3 * INSULATION_DATA.attic.costPerSqm;
                totalSavings += size * 0.3 * INSULATION_DATA.attic.saving;
            } else if (r === 'floor') {
                totalCost += size * 0.3 * INSULATION_DATA.floor.costPerSqm;
                totalSavings += size * 0.3 * INSULATION_DATA.floor.saving;
            }
        });
        const payback = totalSavings > 0 ? totalCost / totalSavings : 0;
        return {
            cost: totalCost,
            savings: totalSavings,
            payback
        };
    }, [
        houseSize,
        renovations
    ]);
    // 反馈表单处理函数
    const handleImageUpload = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            setFeedbackImage(file);
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleFeedbackSubmit = async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);
        try {
            // 调用 Next.js API 保存反馈
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: feedbackText,
                    link: feedbackLink,
                    hasImage: !!feedbackImage,
                    language: language,
                    timestamp: new Date().toISOString()
                })
            });
            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }
            const result = await response.json();
            console.log('Feedback submitted:', result);
            // 重置表单
            setFeedbackText("");
            setFeedbackLink("");
            setFeedbackImage(null);
            setPreviewImage("");
            setSubmitSuccess(true);
            // 3秒后隐藏成功消息
            setTimeout(()=>setSubmitSuccess(false), 3000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert(language === 'zh' ? '提交失败，请重试' : language === 'en' ? 'Failed to submit, please try again' : 'Fejl ved indsendelse, prøv igen');
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white shadow-sm border-b",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-4 py-4 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/logo.png",
                                    alt: "BoligBeregner",
                                    className: "h-10 w-10"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 993,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl font-bold text-gray-900",
                                            children: "BoligBeregner"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 995,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: t.subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 996,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 994,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 992,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                'da',
                                'en',
                                'zh'
                            ].map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setLanguage(lang),
                                    className: `px-3 py-1.5 rounded-lg font-medium text-sm transition ${language === lang ? 'bg-blue-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                    children: lang === 'da' ? '🇩🇰 DA' : lang === 'en' ? '🇬🇧 EN' : '🇨🇳 中文'
                                }, lang, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1003,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1001,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 990,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 989,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto px-4 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-8 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTab("buy"),
                                className: `flex-1 min-w-[100px] px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${tab === "buy" ? "bg-green-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"}`,
                                children: [
                                    "🏠 ",
                                    t.tabs.buy
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1024,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTab("sell"),
                                className: `flex-1 min-w-[100px] px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${tab === "sell" ? "bg-orange-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"}`,
                                children: [
                                    "🏷️ ",
                                    t.tabs.sell
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1032,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTab("renovate"),
                                className: `flex-1 min-w-[100px] px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${tab === "renovate" ? "bg-purple-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"}`,
                                children: [
                                    "🔨 ",
                                    t.tabs.renovate
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1040,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTab("market"),
                                className: `flex-1 min-w-[100px] px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${tab === "market" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"}`,
                                children: [
                                    "📊 ",
                                    t.tabs.market
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1048,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setTab("pdf"),
                                className: `flex-1 min-w-[100px] px-4 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${tab === "pdf" ? "bg-red-500 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50"}`,
                                children: t.tabs.pdf
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1056,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1023,
                        columnNumber: 9
                    }, this),
                    (tab === "buy" || tab === "sell") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-xl p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: tab === "buy" ? t.priceLabel : language === 'zh' ? "我的报价 (丹麦克朗)" : language === 'en' ? "My Offer Price (DKK)" : "Mit tilbud (DKK)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1071,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full",
                                            children: [
                                                "💡 ",
                                                language === 'zh' ? tab === "buy" ? '试试看！输入您的购房预算，看看需要准备多少资金' : '输入您的房产报价，计算卖房收益' : language === 'en' ? tab === "buy" ? 'Try it! Enter your purchase budget to see total costs' : 'Enter your property offer to calculate net proceeds' : tab === "buy" ? 'Prøv det! Indtast din købsbudget for at se de samlede omkostninger' : 'Indtast dit boligtilbud for at beregne nettosalgssum'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1078,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1077,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SmartNumberInput"], {
                                        value: price,
                                        onChange: setPrice,
                                        placeholder: "1.275.000",
                                        inputClassName: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1087,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1070,
                                columnNumber: 13
                            }, this),
                            price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t pt-6",
                                children: [
                                    aiAdvice.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-purple-900 mb-3",
                                                children: [
                                                    "💡 ",
                                                    t.aiAdvice
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1102,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: aiAdvice.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `p-3 rounded-lg ${item.type === "warning" ? "bg-yellow-50 border-yellow-200" : item.type === "tip" ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-700",
                                                            children: [
                                                                item.icon,
                                                                " ",
                                                                item.text
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1106,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, i, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1103,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1101,
                                        columnNumber: 19
                                    }, this),
                                    tab === "buy" && buyingCosts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.tinglysningTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1118,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-indigo-50 rounded-xl p-4 space-y-1",
                                                        children: [
                                                            buyingCosts.tinglysningBreakdown?.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between text-sm",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-600",
                                                                            children: [
                                                                                item.range,
                                                                                " (",
                                                                                item.percent,
                                                                                ")"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 1122,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-medium",
                                                                            children: formatCurrency(item.amount)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 1123,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1121,
                                                                    columnNumber: 27
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between pt-2 mt-2 border-t border-indigo-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-indigo-800",
                                                                        children: t.segmentTotal
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1127,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-indigo-600",
                                                                        children: formatCurrency(buyingCosts.tinglysning)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1128,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1126,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1119,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1117,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.bankAdvokat
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1135,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-green-50 rounded-xl p-4 space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-gray-700",
                                                                            children: t.advokatomkostninger
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/page.tsx",
                                                                            lineNumber: 1139,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1138,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-gray-900",
                                                                        children: formatCurrency(BUYING_FIXED_COSTS.advokat.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1141,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1137,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-gray-700",
                                                                                children: t.ejendomsvurdering
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1145,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "block text-xs text-gray-500",
                                                                                children: t.bankRequires
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1146,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1144,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-gray-900",
                                                                        children: formatCurrency(BUYING_FIXED_COSTS.taksering.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1148,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1143,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-gray-700",
                                                                                children: t.stiftelsesgebyr
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1152,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "block text-xs text-gray-500",
                                                                                children: t.bankFee
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1153,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1151,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-gray-900",
                                                                        children: formatCurrency(BUYING_FIXED_COSTS.stiftelsesgebyr.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1155,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1150,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1136,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.recommendedOptional
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1162,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-amber-50 rounded-xl p-4 space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-gray-700",
                                                                                children: t.ejerskifteforsikring
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1166,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "block text-xs text-amber-600",
                                                                                children: [
                                                                                    "(",
                                                                                    t.bankRequires,
                                                                                    ")"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1167,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1165,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-gray-900",
                                                                        children: formatCurrency(BUYING_FIXED_COSTS.ejerskifteforsikring.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1169,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1164,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-500 italic mt-2",
                                                                children: t.sellerPaysNote
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1171,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1163,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1161,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 pt-4 border-t-2 border-gray-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center text-xl font-bold",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-900",
                                                                children: t.totalCosts
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1180,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-blue-600",
                                                                children: formatCurrency(buyingCosts.total)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1181,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1179,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 flex justify-between items-center text-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-600",
                                                                children: t.totalPurchasePrice
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1184,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-green-600",
                                                                children: formatCurrency(buyingCosts.totalWithPrice)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1185,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1183,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1178,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowLoan(!showLoan),
                                                    className: "w-full px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition border border-blue-200",
                                                    children: [
                                                        "🏦 ",
                                                        showLoan ? t.hideLoanCalc : t.showLoanCalc
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1191,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1190,
                                                columnNumber: 21
                                            }, this),
                                            showLoan && loanResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-bold text-blue-900 mb-4",
                                                        children: t.mortgageCalculator
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1202,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid md:grid-cols-3 gap-4 mb-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: t.downPayment
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1206,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "range",
                                                                        min: "5",
                                                                        max: "40",
                                                                        value: downPaymentPercent,
                                                                        onChange: (e)=>setDownPaymentPercent(parseInt(e.target.value)),
                                                                        className: "w-full"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1207,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center font-bold text-blue-600",
                                                                        children: [
                                                                            downPaymentPercent,
                                                                            "% (",
                                                                            formatCurrency(parseFloat(price) * downPaymentPercent / 100),
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1208,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1205,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: t.interestRate
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1211,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        step: "0.1",
                                                                        value: loanRate,
                                                                        onChange: (e)=>setLoanRate(parseFloat(e.target.value) || 0),
                                                                        className: "w-full px-3 py-2 border rounded-lg"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1212,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1210,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                                        children: t.loanTerm
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1215,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: loanYears,
                                                                        onChange: (e)=>setLoanYears(parseInt(e.target.value)),
                                                                        className: "w-full px-3 py-2 border rounded-lg bg-white",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: 10,
                                                                                children: [
                                                                                    "10 ",
                                                                                    t.years
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1217,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: 20,
                                                                                children: [
                                                                                    "20 ",
                                                                                    t.years
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1218,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: 30,
                                                                                children: [
                                                                                    "30 ",
                                                                                    t.years
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/page.tsx",
                                                                                lineNumber: 1219,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1216,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1214,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1204,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 bg-white rounded-lg space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            t.loanAmountCalc,
                                                                            ":"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1225,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold",
                                                                        children: formatCurrency(loanResult.loanAmount)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1225,
                                                                        columnNumber: 97
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1225,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            t.monthlyPayment,
                                                                            ":"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1226,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-xl text-green-600",
                                                                        children: formatCurrency(loanResult.monthlyPayment)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1226,
                                                                        columnNumber: 97
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1226,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            t.totalInterest,
                                                                            ":"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1227,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-yellow-600",
                                                                        children: formatCurrency(loanResult.totalInterest)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1227,
                                                                        columnNumber: 96
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1227,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1224,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-4 text-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=78126",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "inline-block px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition",
                                                            children: t.compareLoan
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1231,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1230,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1201,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-4 bg-green-50 rounded-xl border border-green-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-green-700 mb-3",
                                                            children: [
                                                                "🏠 ",
                                                                t.needInsurance
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1241,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://www.partner-ads.com/dk/landingpage.php?id=56504&prg=9363&bannerid=92764&desturl=https://velkommen.tilmeld-haandvaerker.dk/3maaned_gratis",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "inline-block px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition",
                                                            children: t.compareInsurance
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1242,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1240,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1239,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    tab === "sell" && sellingCosts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.categoryAgent
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1257,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-orange-50 rounded-xl p-4 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentValuation
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1260,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.valuation.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1261,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1259,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentBudget
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1264,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.budget.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1265,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1263,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentMaterials
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1268,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.materials.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1269,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1267,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentContract
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1272,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.contract.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1273,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1271,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentAftercare
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1276,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.aftercare.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1277,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1275,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.agentSalesWork
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1280,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(AGENT_FEE_ITEMS.saleswork.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1281,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1279,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between pt-2 mt-2 border-t border-orange-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-orange-800",
                                                                        children: t.agentFee
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1284,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-orange-600",
                                                                        children: formatCurrency(sellingCosts.agentFee)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1285,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1283,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1258,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1256,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.categoryMarketing
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1292,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-blue-50 rounded-xl p-4 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.marketingOnline
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1295,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(MARKETING_ITEMS.online.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1296,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1294,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.marketingPhotos
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1299,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(MARKETING_ITEMS.photos.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1300,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1298,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.marketingDigital
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1303,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(MARKETING_ITEMS.digital.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1304,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1302,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.marketingSocial
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1307,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(MARKETING_ITEMS.social.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1308,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1306,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between pt-2 mt-2 border-t border-blue-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-blue-800",
                                                                        children: t.marketingFee
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1311,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-blue-600",
                                                                        children: formatCurrency(sellingCosts.marketingFee)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1312,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1310,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1293,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1291,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.categoryThirdParty
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1319,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-50 rounded-xl p-4 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.ejendomsdatarapport
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1322,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(THIRD_PARTY_FEES.ejendomsdatarapport.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1323,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1321,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.edh
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1326,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(THIRD_PARTY_FEES.edh.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1327,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1325,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.edokument
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1330,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(THIRD_PARTY_FEES.edokument.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1331,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1329,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between pt-2 mt-2 border-t border-gray-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-gray-800",
                                                                        children: t.thirdParty
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1334,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-gray-600",
                                                                        children: formatCurrency(sellingCosts.thirdParty)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1335,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1333,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1320,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1318,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                                        children: t.categoryOther
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1342,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-purple-50 rounded-xl p-4 space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.halfInsurance
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1345,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.halfInsurance.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1346,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1344,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.reports
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1349,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.reports.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1350,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1348,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.liability
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1353,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.liability.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1354,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1352,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.digitalTinglysning
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1357,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.digitalTinglysning.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1358,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1356,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.settlement
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1361,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.settlement.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1362,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1360,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-700",
                                                                        children: t.bankCosts
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1365,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: formatCurrency(OTHER_SELLING_COSTS.bankCosts.price)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1366,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1364,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between pt-2 mt-2 border-t border-purple-200",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-purple-800",
                                                                        children: t.otherCosts
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1369,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-purple-600",
                                                                        children: formatCurrency(sellingCosts.otherCosts)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/page.tsx",
                                                                        lineNumber: 1370,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1368,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1343,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1341,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 pt-4 border-t-2 border-gray-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center text-xl font-bold",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-900",
                                                                children: t.totalCosts
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1378,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-blue-600",
                                                                children: formatCurrency(sellingCosts.total)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1379,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1377,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-4 p-4 bg-green-50 rounded-xl border border-green-200",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-green-900",
                                                                    children: t.netProceeds
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1384,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-2xl font-bold text-green-600",
                                                                    children: formatCurrency(sellingCosts.netProceeds)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/page.tsx",
                                                                    lineNumber: 1385,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1383,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1382,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1376,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-orange-700 mb-3",
                                                            children: language === 'zh' ? '📊 获取免费房产估值！' : language === 'en' ? '📊 Get a free property valuation!' : '📊 Få en gratis vurdering af din bolig!'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1393,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=71154",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "inline-block px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition",
                                                            children: language === 'zh' ? '获取估值 →' : language === 'en' ? 'Get Valuation →' : 'Få vurdering →'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1396,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1392,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1391,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-purple-700 mb-3",
                                                            children: language === 'zh' ? '🏠 需要专业卖房咨询？' : language === 'en' ? '🏠 Need professional sales advice?' : '🏠 Har du brug for professionel rådgivning?'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1405,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=66826",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "inline-block px-6 py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition",
                                                            children: language === 'zh' ? '获取咨询 →' : language === 'en' ? 'Get Advice →' : 'Få rådgivning →'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1408,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1404,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1403,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1097,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1068,
                        columnNumber: 11
                    }, this),
                    tab === "renovate" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: t.houseSize
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1425,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: houseSize,
                                        onChange: (e)=>setHouseSize(e.target.value),
                                        placeholder: "150",
                                        className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1426,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1424,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-yellow-900 mb-4",
                                        children: t.solarTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1437,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: t.solarKw
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1439,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: solarKw,
                                                onChange: (e)=>setSolarKw(e.target.value),
                                                placeholder: "6",
                                                className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1440,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1438,
                                        columnNumber: 15
                                    }, this),
                                    solarResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-yellow-50 rounded-xl p-4 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarCost,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1450,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: formatCurrency(solarResult.cost)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1450,
                                                        columnNumber: 84
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1450,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarArea,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1451,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            solarResult.area,
                                                            " m²"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1451,
                                                        columnNumber: 84
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1451,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarAnnual,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1452,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            solarResult.annualKwh,
                                                            " kWh"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1452,
                                                        columnNumber: 86
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1452,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarSavings,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1453,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-600 font-medium",
                                                        children: formatCurrency(solarResult.annualSavings)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1453,
                                                        columnNumber: 87
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1453,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between pt-2 border-t border-yellow-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarPayback,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1454,
                                                        columnNumber: 89
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: [
                                                            solarResult.payback.toFixed(1),
                                                            " ",
                                                            t.solarYears
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1454,
                                                        columnNumber: 119
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1454,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1449,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-lg",
                                            children: [
                                                "🌞 ",
                                                language === 'zh' ? '太阳能广告商 Coming Soon' : language === 'en' ? 'Solar affiliate Coming Soon' : 'Solcelle partner Coming Soon'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1459,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1458,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1436,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-red-900 mb-4",
                                        children: t.heatPumpTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1467,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: t.heatPumpType
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1469,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: heatPumpType,
                                                onChange: (e)=>setHeatPumpType(e.target.value),
                                                className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "air",
                                                        children: t.heatPumpAir
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1475,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "ground",
                                                        children: t.heatPumpGround
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1476,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1470,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1468,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-red-50 rounded-xl p-4 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.heatPumpCost,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1480,
                                                        columnNumber: 55
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: formatCurrency(heatPumpResult.cost)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1480,
                                                        columnNumber: 85
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1480,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.heatPumpSavings,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1481,
                                                        columnNumber: 55
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-600 font-medium",
                                                        children: formatCurrency(heatPumpResult.savings)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1481,
                                                        columnNumber: 88
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1481,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between pt-2 border-t border-red-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.heatPumpPayback,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1482,
                                                        columnNumber: 84
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: [
                                                            heatPumpResult.payback.toFixed(1),
                                                            " ",
                                                            t.solarYears
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1482,
                                                        columnNumber: 117
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1482,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1479,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=43265",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-block px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition",
                                            children: [
                                                "🔥 ",
                                                language === 'zh' ? '获取热泵报价 →' : language === 'en' ? 'Get Heat Pump Quotes →' : 'Få tilbud på varmepumpe →'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1486,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1485,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1466,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-blue-900 mb-4",
                                        children: t.windowsTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1494,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: t.windowCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1496,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: windowCount,
                                                onChange: (e)=>setWindowCount(e.target.value),
                                                placeholder: "10",
                                                className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1497,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1495,
                                        columnNumber: 15
                                    }, this),
                                    windowResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-50 rounded-xl p-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        t.windowCost,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1507,
                                                    columnNumber: 57
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-blue-600",
                                                    children: formatCurrency(windowResult.cost)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1507,
                                                    columnNumber: 85
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1507,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1506,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=109565",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition",
                                            children: [
                                                "🪟 ",
                                                language === 'zh' ? '获取窗户报价 →' : language === 'en' ? 'Get Window Quotes →' : 'Få tilbud på vinduer →'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1512,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1511,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1493,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-green-900 mb-4",
                                        children: t.insulationTitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1520,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                children: t.renovationTypes
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1522,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    'wall',
                                                    'attic',
                                                    'floor'
                                                ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                checked: renovations.includes(type),
                                                                onChange: (e)=>{
                                                                    if (e.target.checked) {
                                                                        setRenovations([
                                                                            ...renovations,
                                                                            type
                                                                        ]);
                                                                    } else {
                                                                        setRenovations(renovations.filter((r)=>r !== type));
                                                                    }
                                                                },
                                                                className: "w-5 h-5 text-green-600 rounded mr-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1526,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: type === 'wall' ? t.wallInsulation : type === 'attic' ? t.atticInsulation : t.floorInsulation
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1538,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, type, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1525,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1523,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1521,
                                        columnNumber: 15
                                    }, this),
                                    insulationResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-green-50 rounded-xl p-4 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.insulationCost,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1545,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: formatCurrency(insulationResult.cost)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1545,
                                                        columnNumber: 89
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1545,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.insulationSavings,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1546,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-600 font-medium",
                                                        children: formatCurrency(insulationResult.savings)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1546,
                                                        columnNumber: 92
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1546,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between pt-2 border-t border-green-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            t.solarPayback,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1547,
                                                        columnNumber: 88
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: [
                                                            insulationResult.payback.toFixed(1),
                                                            " ",
                                                            t.solarYears
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1547,
                                                        columnNumber: 118
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1547,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1544,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=105348",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-block px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition",
                                            children: [
                                                "🏠 ",
                                                t.getQuotes
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1552,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1551,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1519,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-orange-900 mb-4",
                                        children: language === 'zh' ? '🔥 壁炉/颗粒炉' : language === 'en' ? '🔥 Fireplace / Pellet Stove' : '🔥 Brændeovn / Pillefyr'
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1560,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-orange-50 rounded-xl p-4 mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-orange-700",
                                            children: language === 'zh' ? '升级为高效颗粒炉可节省大量取暖费用！' : language === 'en' ? 'Upgrade to an efficient pellet stove to save on heating costs!' : 'Opgrader til et effektivt pillefyr og spar på varmeudgifterne!'
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1562,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1561,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=59457",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-block px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition",
                                            children: [
                                                "🔥 ",
                                                language === 'zh' ? '获取壁炉/颗粒炉报价 →' : language === 'en' ? 'Get Fireplace Quotes →' : 'Få tilbud på brændeovn/pillefyr →'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1567,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1566,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1559,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-cyan-900 mb-4",
                                        children: [
                                            "🔧 ",
                                            language === 'zh' ? 'VVS 管道维修' : language === 'en' ? 'VVS Plumbing' : 'VVS Rørlægger'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1575,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-cyan-50 rounded-xl p-4 mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-cyan-700",
                                            children: language === 'zh' ? '需要更换管道、暖气系统或水龙头？' : language === 'en' ? 'Need to replace pipes, heating systems or faucets?' : 'Har du brug for at udskifte rør, varmesystemer eller armaturer?'
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1577,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1576,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=99217",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-block px-4 py-2 bg-cyan-500 text-white text-sm rounded-lg hover:bg-cyan-600 transition",
                                            children: [
                                                "🔧 ",
                                                language === 'zh' ? '获取 VVS 报价 →' : language === 'en' ? 'Get VVS Quotes →' : 'Få VVS tilbud →'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1582,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1581,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1574,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-sky-900 mb-4",
                                        children: [
                                            "🪟 ",
                                            language === 'zh' ? '窗户清洁服务' : language === 'en' ? 'Window Cleaning' : 'Vinduespudsning'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1590,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-sky-50 rounded-xl p-4 mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-sky-700",
                                            children: language === 'zh' ? '专业窗户清洁服务，让您的房屋焕然一新！' : language === 'en' ? 'Professional window cleaning service - make your home shine!' : 'Professionel vinduespudsning - få dit hjem til at skinne!'
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1592,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1591,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=112335",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "inline-block px-4 py-2 bg-sky-500 text-white text-sm rounded-lg hover:bg-sky-600 transition",
                                                children: [
                                                    "🧹 ",
                                                    language === 'zh' ? '预约窗户清洁 →' : language === 'en' ? 'Book Cleaning →' : 'Bestil vinduespudsning →'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1597,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=113490",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "inline-block px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition",
                                                children: [
                                                    "🤖 ",
                                                    language === 'zh' ? '购买清洁机器人 →' : language === 'en' ? 'Buy Cleaning Robot →' : 'Køb vinduespudser robot →'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1600,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1596,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1589,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white font-medium mb-4",
                                        children: language === 'zh' ? '需要装修或改造服务？获取多家报价比较！' : language === 'en' ? 'Need renovation services? Get quotes from multiple providers!' : 'Har du brug for renovering? Få tilbud fra flere leverandører!'
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1608,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=82599",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg",
                                        children: t.getQuotes
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1611,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1607,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1422,
                        columnNumber: 11
                    }, this),
                    tab === "market" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-gray-900 mb-2",
                                        children: t.danishPropertyMarket
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1628,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 text-sm mb-6",
                                        children: t.selectCityHint
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1631,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                        children: t.selectCityRegion
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1634,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: marketCity,
                                        onChange: (e)=>setMarketCity(e.target.value),
                                        className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none",
                                        children: Object.entries(REGION_PRICES).map(([key, val])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: key,
                                                children: val.name
                                            }, key, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1643,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1637,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1627,
                                columnNumber: 13
                            }, this),
                            (()=>{
                                const city = REGION_PRICES[marketCity];
                                const avgTotal = city.avgPrice * 120; // 120m² 典型丹麦住宅
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-50 rounded-2xl p-5 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl mb-2",
                                                    children: "🏠"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1655,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-500 mb-1",
                                                    children: t.avgPricePerSqm
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1656,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-blue-700",
                                                    children: [
                                                        city.avgPrice.toLocaleString('da-DK'),
                                                        " kr/m²"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1659,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1654,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-green-50 rounded-2xl p-5 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl mb-2",
                                                    children: "ℹ️"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1664,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-500 mb-1",
                                                    children: t.typical120m2
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1665,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-green-700",
                                                    children: [
                                                        avgTotal.toLocaleString('da-DK'),
                                                        " kr"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1668,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1663,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `rounded-2xl p-5 text-center ${city.trend === 'up' ? 'bg-red-50' : city.trend === 'down' ? 'bg-yellow-50' : 'bg-gray-50'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl mb-2",
                                                    children: city.trend === 'up' ? '📈' : city.trend === 'down' ? '📉' : '➡️'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1673,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-500 mb-1",
                                                    children: t.marketTrend
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1676,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `text-xl font-bold ${city.trend === 'up' ? 'text-red-600' : city.trend === 'down' ? 'text-yellow-600' : 'text-gray-600'}`,
                                                    children: city.trend === 'up' ? t.rising : city.trend === 'down' ? t.falling : t.stable
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1679,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1672,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1653,
                                    columnNumber: 17
                                }, this);
                            })(),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-gray-900 mb-4",
                                        children: t.quickMortgage
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1693,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                        children: t.targetPrice
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1698,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: marketMortgage ? parseFloat(marketMortgage).toLocaleString('da-DK') : '',
                                                        onChange: (e)=>{
                                                            const raw = e.target.value.replace(/\./g, '').replace(',', '.');
                                                            setMarketMortgage(raw);
                                                        },
                                                        placeholder: "2.500.000",
                                                        className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1701,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1697,
                                                columnNumber: 17
                                            }, this),
                                            marketMortgage && parseFloat(marketMortgage) > 0 && (()=>{
                                                const p = parseFloat(marketMortgage);
                                                const loan = p * 0.8;
                                                const monthlyRate = 3.2 / 100 / 12;
                                                const n = 30 * 12;
                                                const monthly = loan * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-blue-50 rounded-xl p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-gray-500",
                                                            children: t.estMonthlyPayment
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1720,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-2xl font-bold text-blue-700 mt-1",
                                                            children: [
                                                                "~",
                                                                Math.round(monthly).toLocaleString('da-DK'),
                                                                " kr/",
                                                                t.month
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1723,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-gray-400 mt-1",
                                                            children: [
                                                                t.loanAmountCalc,
                                                                ": ",
                                                                loan.toLocaleString('da-DK'),
                                                                " kr"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1726,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1719,
                                                    columnNumber: 21
                                                }, this);
                                            })()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1696,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1692,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-gray-900 mb-2",
                                        children: t.nearbyAmenities
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1737,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400 mb-4",
                                        children: t.typicalLivingEnv.replace('%s', REGION_PRICES[marketCity].name)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1740,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 md:grid-cols-3 gap-3",
                                        children: [
                                            {
                                                icon: '🏫',
                                                label: t.schools,
                                                value: t.walk10min
                                            },
                                            {
                                                icon: '🏥',
                                                label: t.hospital,
                                                value: t.goodInBig
                                            },
                                            {
                                                icon: '🚌',
                                                label: t.publicTransport,
                                                value: marketCity === 'kobenhavn' || marketCity === 'frederiksberg' ? t.metroBus : t.bus
                                            },
                                            {
                                                icon: '🛒',
                                                label: t.supermarket,
                                                value: 'Netto, Rema, Føtex'
                                            },
                                            {
                                                icon: '💪',
                                                label: t.gym,
                                                value: 'SATS, Fitness World'
                                            },
                                            {
                                                icon: '🛍️',
                                                label: t.shopping,
                                                value: marketCity === 'kobenhavn' ? "Strøget, Field's" : t.localMall
                                            }
                                        ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3 bg-gray-50 rounded-xl p-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl",
                                                        children: item.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1753,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-medium text-gray-700 text-sm",
                                                                children: item.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1755,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-gray-500 text-xs",
                                                                children: item.value
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1756,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1754,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1752,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1743,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 grid grid-cols-1 md:grid-cols-3 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=60068",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl hover:shadow-md transition group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl",
                                                        children: "🛡️"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1770,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-bold text-emerald-800",
                                                                children: language === 'zh' ? '房屋保险比较' : language === 'en' ? 'Compare Home Insurance' : 'Compare Home Insurance'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1772,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-emerald-600 truncate",
                                                                children: language === 'zh' ? '找最划算的房屋险 →' : language === 'en' ? 'Find best coverage →' : 'Find best coverage →'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1775,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1771,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1764,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.partner-ads.com/dk/landingpage.php?id=56504&prg=9363&bannerid=92764&desturl=https://velkommen.tilmeld-haandvaerker.dk/3maaned_gratis",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl hover:shadow-md transition group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl",
                                                        children: "🔨"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1788,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-bold text-amber-800",
                                                                children: language === 'zh' ? '装修工匠报价' : language === 'en' ? 'Get Renovation Quotes' : 'Get Renovation Quotes'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1790,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-amber-600 truncate",
                                                                children: language === 'zh' ? '比较本地工匠报价 →' : language === 'en' ? 'Compare local craftsmen →' : 'Compare local craftsmen →'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1793,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1789,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1782,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=78126",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-md transition group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-2xl",
                                                        children: "🏦"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1806,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-bold text-blue-800",
                                                                children: language === 'zh' ? '房贷利率比较' : language === 'en' ? 'Compare Mortgage Rates' : 'Compare Mortgage Rates'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1808,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-blue-600 truncate",
                                                                children: language === 'zh' ? '最低利率一键比较 →' : language === 'en' ? 'Find lowest rate →' : 'Find lowest rate →'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1811,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1807,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1800,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1762,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 p-3 bg-blue-50 rounded-xl text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://www.google.com/maps/search/${encodeURIComponent(REGION_PRICES[marketCity].name + ', Danmark')}`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-blue-600 font-medium hover:underline text-sm",
                                            children: [
                                                "🗺️ ",
                                                t.viewOnMaps.replace('%s', REGION_PRICES[marketCity].name)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1819,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1818,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1736,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=56504&bannerid=78126",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition",
                                    children: t.compareRates
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1832,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1831,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1625,
                        columnNumber: 11
                    }, this),
                    tab === "pdf" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-xl p-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mb-4",
                                children: "📄"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1843,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-gray-900 mb-2",
                                children: language === 'zh' ? 'PDF 报价分析' : language === 'en' ? 'PDF Quote Analysis' : 'PDF Tilbudsanalyse'
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1844,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 mb-6",
                                children: language === 'zh' ? '上传中介提供的报价文档，AI 将分析哪些费用可以协商砍价' : language === 'en' ? 'Upload agent quote documents, AI will analyze which fees can be negotiated' : 'Upload ejendomsmægler tilbud, AI vil analysere hvilke omkostninger der kan forhandles'
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1847,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-block px-6 py-3 bg-gray-100 text-gray-500 font-medium rounded-xl",
                                children: language === 'zh' ? '🚧 敬请期待' : language === 'en' ? '🚧 Coming Soon' : '🚧 Kort tid'
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1850,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-10 max-w-2xl mx-auto text-left",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-lg font-bold text-gray-800 mb-4 flex items-center gap-2",
                                            children: [
                                                "💬 ",
                                                language === 'zh' ? '您对我们有什么意见反馈，请在这里填写' : language === 'en' ? 'Share your feedback with us' : 'Del din feedback med os'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1857,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleFeedbackSubmit,
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: language === 'zh' ? '反馈内容' : language === 'en' ? 'Feedback' : 'Feedback'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1863,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            value: feedbackText,
                                                            onChange: (e)=>setFeedbackText(e.target.value),
                                                            placeholder: language === 'zh' ? '请输入您的意见或建议...' : language === 'en' ? 'Please share your thoughts or suggestions...' : 'Del dine tanker eller forslag...',
                                                            className: "w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none",
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1866,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1862,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: language === 'zh' ? '相关链接（可选）' : language === 'en' ? 'Related Links (Optional)' : 'Relaterede links (Valgfri)'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1876,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "url",
                                                            value: feedbackLink,
                                                            onChange: (e)=>setFeedbackLink(e.target.value),
                                                            placeholder: language === 'zh' ? 'https://...' : language === 'en' ? 'https://...' : 'https://...',
                                                            className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1879,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1875,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: language === 'zh' ? '上传截图（可选）' : language === 'en' ? 'Upload Screenshot (Optional)' : 'Upload skærmbillede (Valgfri)'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1889,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: handleImageUpload,
                                                            className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1892,
                                                            columnNumber: 21
                                                        }, this),
                                                        previewImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: previewImage,
                                                                alt: "Preview",
                                                                className: "max-h-40 rounded-lg border border-gray-200"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 1900,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1899,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1888,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    disabled: isSubmitting,
                                                    className: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl",
                                                    children: isSubmitting ? language === 'zh' ? '提交中...' : language === 'en' ? 'Submitting...' : 'Indsender...' : language === 'zh' ? '提交反馈 ✨' : language === 'en' ? 'Submit Feedback ✨' : 'Indsend Feedback ✨'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 1905,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1861,
                                            columnNumber: 17
                                        }, this),
                                        submitSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center",
                                            children: [
                                                "✅ ",
                                                language === 'zh' ? '感谢您的反馈！我们会认真阅读并改进。' : language === 'en' ? 'Thank you for your feedback! We will review it carefully.' : 'Tak for din feedback! Vi vil læse den grundigt.'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 1918,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 1856,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1855,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1842,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 text-center text-sm text-gray-500",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "© 2026 BoligBeregner Danmark | ",
                                language === 'zh' ? '数据基于真实中介合同' : language === 'en' ? 'Data based on real estate contracts' : 'Data baseret på ejendomsmæglerkontrakter'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 1929,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1928,
                        columnNumber: 9
                    }, this),
                    (tab === "buy" || tab === "sell") && price || tab === "renovate" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold text-white flex items-center gap-2",
                                        children: [
                                            "🤖 ",
                                            tab === "buy" ? language === "zh" ? "该购房预算的 AI 智能分析" : language === "en" ? "AI Smart Analysis for Your Budget" : "AI Smart Analyse for din budget" : tab === "sell" ? language === "zh" ? "该卖房报价的 AI 智能分析" : language === "en" ? "AI Smart Analysis for Your Selling Price" : "AI Smart Analyse for din salgspris" : language === "zh" ? "AI 装修智能分析" : language === "en" ? "AI Renovation Analysis" : "AI Renoveringsanalyse"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1937,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-purple-100 text-sm mt-1",
                                        children: tab === "buy" ? language === "zh" ? "基于您的预算、意向区域和房屋面积，评估这个购房投资是否合适" : language === "en" ? "Evaluate if this property investment is suitable based on your budget, preferred area, and desired size" : "Vurder om denne boliginvestering er passende baseret på din budget, foretrukne område og ønskede størrelse" : language === "zh" ? "基于您的报价、所在区域和房屋面积，评估该报价是否合理，并给出最佳售价建议" : language === "en" ? "Based on your offer price, location and size, evaluate if price is reasonable and provide optimal pricing advice" : "Baseret på din salgspris, beliggenhed og størrelse, vurder om prisen er rimelig og få optimal prisrådgivning"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1945,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1936,
                                columnNumber: 13
                            }, this),
                            tab !== "renovate" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 grid md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: [
                                                    "📍 ",
                                                    tab === "buy" ? language === "zh" ? "意向区域" : language === "en" ? "Preferred area" : "Foretrukket område" : language === "zh" ? "房产所在区域" : language === "en" ? "Property location" : "Ejendommens beliggenhed"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1965,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: selectedRegion,
                                                onChange: (e)=>setSelectedRegion(e.target.value),
                                                className: "w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 bg-white",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: tab === "buy" ? language === "zh" ? "选择意向区域（可选）" : language === "en" ? "Select preferred area" : "Vælg foretrukket område" : language === "zh" ? "选择区域（可选）" : language === "en" ? "Select location" : "Vælg beliggenhed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 1976,
                                                        columnNumber: 19
                                                    }, this),
                                                    Object.entries(REGION_PRICES).map(([key, val])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: key,
                                                            children: val.name
                                                        }, key, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 1981,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1971,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1964,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: [
                                                    "ℹ️ ",
                                                    language === "zh" ? "房屋面积 (m²)" : language === "en" ? "Property area (m²)" : "Boligareal (m²)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1986,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SmartNumberInput"], {
                                                value: propertyArea,
                                                onChange: setPropertyArea,
                                                placeholder: "120",
                                                inputClassName: "w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 1989,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 1985,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 1963,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 pb-4",
                                children: aiContext && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AIAdvisorPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    ctx: aiContext,
                                    lang: language
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2001,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 2000,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 pb-4 pt-2 border-t border-purple-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 flex items-start gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "ℹ️"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2007,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: language === "zh" ? "⚠️ 分析结果基于丹麦房产市场历史数据估算，实际数据可能有所不同。建议结合专业房产顾问的意见做出最终决策。" : language === "en" ? "⚠️ Analysis based on Danish property market historical data estimates. Actual data may vary. Consult a professional real estate advisor before making decisions." : "⚠️ Analyse baseret på historiske data fra det danske boligmarked. Faktiske data kan variere. Rådfør dig med en professionel ejendomsrådgiver, før du træffer beslutninger."
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 2008,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 2006,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 2005,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 1934,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 1020,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 987,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_0hqj2bw._.js.map