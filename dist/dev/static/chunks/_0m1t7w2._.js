(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/ai-advisor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
        confidence: regionData && size ? "high" : "medium"
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
            name: lang === "zh" ? "安装热泵（空气源）" : lang === "en" ? "Air-to-water heat pump" : "Luft-til-vand varmepumpe",
            cost: 150000,
            valueAdd: 200000,
            roi: 33
        },
        {
            name: lang === "zh" ? "太阳能板（6kW）" : lang === "en" ? "Solar panels (6kW)" : "Solceller (6kW)",
            cost: 72000,
            valueAdd: 90000,
            roi: 25
        },
        {
            name: lang === "zh" ? "厨房翻新" : lang === "en" ? "Kitchen renovation" : "Køkkenrenovering",
            cost: 80000,
            valueAdd: 120000,
            roi: 50
        },
        {
            name: lang === "zh" ? "浴室翻新" : lang === "en" ? "Bathroom renovation" : "Baderenovering",
            cost: 60000,
            valueAdd: 85000,
            roi: 42
        },
        {
            name: lang === "zh" ? "阁楼保温" : lang === "en" ? "Attic insulation" : "Loftsisolering",
            cost: size ? size * 0.9 * 400 : 40000,
            valueAdd: size ? size * 0.9 * 600 : 60000,
            roi: 50
        },
        {
            name: lang === "zh" ? "外墙重漆" : lang === "en" ? "Exterior painting" : "Udvendig maling",
            cost: 30000,
            valueAdd: 50000,
            roi: 67
        },
        {
            name: lang === "zh" ? "地板翻新（实木）" : lang === "en" ? "Hardwood floor renovation" : "Trægulvsrenovering",
            cost: size ? size * 400 : 50000,
            valueAdd: size ? size * 500 : 65000,
            roi: 30
        }
    ];
    // 按 ROI 排序
    const sorted = [
        ...ROI_ITEMS
    ].sort((a, b)=>b.roi - a.roi);
    const top3 = sorted.slice(0, 3);
    top3.forEach((item, idx)=>{
        points.push({
            type: idx === 0 ? "positive" : "tip",
            text: lang === "zh" ? `${item.name}：投入 ${fmt(item.cost)}，可增加房产价值约 ${fmt(item.valueAdd)}，投产比 ${item.roi}%` : lang === "en" ? `${item.name}: Cost ${fmt(item.cost)}, adds ~${fmt(item.valueAdd)} value, ROI ${item.roi}%` : `${item.name}: Koster ${fmt(item.cost)}, tilføjer ~${fmt(item.valueAdd)}, ROI ${item.roi}%`,
            value: `ROI ${item.roi}%`
        });
    });
    points.push({
        type: "info",
        text: lang === "zh" ? `丹麦节能改造可申请 Energistyrelsen 补贴，最高可抵扣费用 25%` : lang === "en" ? `Energy renovations may qualify for Energistyrelsen grants — up to 25% rebate` : `Energirenoveringer kan få tilskud fra Energistyrelsen — op til 25% rabat`
    });
    return {
        title: lang === "zh" ? "装修优先级建议" : lang === "en" ? "Renovation Priority" : "Renoveringsprioritet",
        icon: "🔧",
        summary: lang === "zh" ? `投资回报率最高的是：${top3[0].name}（ROI ${top3[0].roi}%）` : lang === "en" ? `Highest ROI renovation: ${top3[0].name} (${top3[0].roi}% ROI)` : `Højeste ROI renovering: ${top3[0].name} (${top3[0].roi}% ROI)`,
        points,
        confidence: "medium"
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
    const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_OPENAI_KEY || (("TURBOPACK compile-time truthy", 1) ? window.OPENAI_KEY : "TURBOPACK unreachable");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AIAdvisorPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AIAdvisorPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai-advisor.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
    _s();
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const meta = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_FEATURES"][featureId];
    const handleAnalyze = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FeatureCard.useCallback[handleAnalyze]": async ()=>{
            if (result) {
                setExpanded(!expanded);
                return;
            }
            setLoading(true);
            setExpanded(true);
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runAIAnalysis"])(featureId, ctx);
                setResult(res);
            } catch  {
                setResult((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runLocalAnalysis"])(featureId, ctx));
            } finally{
                setLoading(false);
            }
        }
    }["FeatureCard.useCallback[handleAnalyze]"], [
        featureId,
        ctx,
        result,
        expanded
    ]);
    const confidence = result?.confidence || "medium";
    const badge = CONFIDENCE_BADGE[confidence];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border rounded-xl overflow-hidden transition-all duration-200 ${expanded ? "border-purple-300 shadow-md" : "border-gray-200 hover:border-purple-200 hover:shadow-sm"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "w-full flex items-center justify-between p-4 bg-white hover:bg-purple-50 transition text-left",
                onClick: handleAnalyze,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl",
                                children: meta.icon
                            }, void 0, false, {
                                fileName: "[project]/components/AIAdvisorPanel.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-gray-900 text-sm",
                                        children: meta.title[lang]
                                    }, void 0, false, {
                                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-0.5",
                                        children: meta.desc[lang]
                                    }, void 0, false, {
                                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AIAdvisorPanel.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-xs px-2 py-0.5 rounded-full font-medium ${badge.color}`,
                                children: badge.text[lang]
                            }, void 0, false, {
                                fileName: "[project]/components/AIAdvisorPanel.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-400 text-sm ml-1",
                                children: loading ? "⏳" : expanded ? "▲" : "▼"
                            }, void 0, false, {
                                fileName: "[project]/components/AIAdvisorPanel.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-100 bg-gradient-to-b from-purple-50 to-white p-4",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-2 py-6 text-gray-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-spin w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                            lineNumber: 88,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm",
                            children: lang === "zh" ? "AI 分析中..." : lang === "en" ? "Analyzing..." : "Analyserer..."
                        }, void 0, false, {
                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                            lineNumber: 89,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AIAdvisorPanel.tsx",
                    lineNumber: 87,
                    columnNumber: 13
                }, this) : result ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-purple-900 mb-3 p-3 bg-purple-100 rounded-lg",
                            children: [
                                result.icon,
                                " ",
                                result.summary
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                            lineNumber: 96,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: result.points.map((point, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `p-3 rounded-lg border text-sm flex items-start gap-2 ${TYPE_STYLES[point.type] || TYPE_STYLES.info}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 mt-0.5",
                                            children: TYPE_ICONS[point.type]
                                        }, void 0, false, {
                                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                                            lineNumber: 106,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: point.text
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAdvisorPanel.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 23
                                                }, this),
                                                point.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 font-bold text-xs px-1.5 py-0.5 bg-white/60 rounded",
                                                    children: point.value
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AIAdvisorPanel.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                                            lineNumber: 107,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/components/AIAdvisorPanel.tsx",
                                    lineNumber: 102,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/AIAdvisorPanel.tsx",
                            lineNumber: 100,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true) : null
            }, void 0, false, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AIAdvisorPanel.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(FeatureCard, "PHWFcJllOSLjFhD/xSfwAxMPOKo=");
_c = FeatureCard;
function AIAdvisorPanel({ ctx, lang }) {
    _s1();
    const [showAll, setShowAll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
    const FEATURES_ALL = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$advisor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AI_FEATURES"]);
    const visibleFeatures = showAll ? FEATURES_ALL : FEATURES_ALL.slice(0, 4);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 bg-white rounded-2xl shadow-lg overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-white font-bold text-lg",
                        children: TITLE[lang]
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-purple-200 text-sm mt-0.5",
                        children: SUBTITLE[lang]
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            !ctx.price ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 text-center text-gray-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-4xl mb-2",
                        children: "🏠"
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm",
                        children: lang === "zh" ? "请先输入房产价格以启用 AI 分析" : lang === "en" ? "Enter a property price to enable AI analysis" : "Indtast en ejendomspris for at aktivere AI-analyse"
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3",
                        children: visibleFeatures.map((fId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureCard, {
                                featureId: fId,
                                ctx: ctx,
                                lang: lang
                            }, fId, false, {
                                fileName: "[project]/components/AIAdvisorPanel.tsx",
                                lineNumber: 175,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this),
                    FEATURES_ALL.length > 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAll(!showAll),
                        className: "mt-3 w-full py-2 text-sm text-purple-600 hover:text-purple-800 font-medium transition",
                        children: showAll ? SHOW_LESS[lang] : SHOW_MORE[lang]
                    }, void 0, false, {
                        fileName: "[project]/components/AIAdvisorPanel.tsx",
                        lineNumber: 180,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AIAdvisorPanel.tsx",
                lineNumber: 172,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AIAdvisorPanel.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_s1(AIAdvisorPanel, "XC0nqMp5RnZIWkiCcJL//MdTvak=");
_c1 = AIAdvisorPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "FeatureCard");
__turbopack_context__.k.register(_c1, "AIAdvisorPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AIAdvisorPanel.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/AIAdvisorPanel.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_0m1t7w2._.js.map