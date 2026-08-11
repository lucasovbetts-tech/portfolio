// ── Element references ─────────────────────────────
const form = document.getElementById(`invest-form`);
const startingBalance = document.getElementById(`startingBalance`);
const annualReturn = document.getElementById(`annualReturn`);
const yearsInvested = document.getElementById(`yearsInvested`);
const compoundFrequency = document.getElementById(`compoundFrequency`);
const contribution = document.getElementById(`contribution`);
const inputError = document.getElementById(`inputError`);
const results = document.getElementById(`results`);
const finalBalance = document.getElementById(`finalBalance`);
const totalContributed = document.getElementById(`totalContributed`);
const interestEarned = document.getElementById(`interestEarned`);
const chartWrap = document.getElementById(`chartWrap`);

// Format a number as pounds, e.g. 1234.5 -> £1,234.50
function fmt(value) {
    return value.toLocaleString(`en-GB`, { style: `currency`, currency: `GBP` });
}

// Short money for axis ticks, e.g. 56000 -> £56k
function fmtCompact(value) {
    if (value >= 1e6) return `£` + parseFloat((value / 1e6).toFixed(1)) + `M`;
    if (value >= 1e3) return `£` + parseFloat((value / 1e3).toFixed(1)) + `k`;
    return `£` + Math.round(value);
}

function showError(message) {
    inputError.textContent = message;
    inputError.hidden = false;
    results.hidden = true;
}

form.addEventListener(`submit`, function (e) {
    e.preventDefault();

    const balanceStart = Number(startingBalance.value);
    const rate = Number(annualReturn.value) / 100;
    const years = Number(yearsInvested.value);
    const periodsPerYear = Number(compoundFrequency.value);
    const extra = contribution.value === `` ? 0 : Number(contribution.value);
    const contribFrequency = document.querySelector(`input[name="contribFrequency"]:checked`).value;

    // ── Validation ─────────────────────────────────
    if (startingBalance.value === `` || annualReturn.value === `` || yearsInvested.value === ``) {
        showError(`Fill in the starting balance, return per year, and years invested.`);
        return;
    }
    if (balanceStart < 0 || rate < 0 || extra < 0) {
        showError(`Values can't be negative.`);
        return;
    }
    if (years < 1 || !Number.isInteger(years)) {
        showError(`Years invested must be a whole number of 1 or more.`);
        return;
    }
    inputError.hidden = true;

    // ── Compound growth ────────────────────────────
    // Interest is added every compounding period, and contributions
    // are spread evenly across the periods of each year. A snapshot
    // is recorded at the end of every year for the chart.
    const contribsPerYear = contribFrequency === `monthly` ? 12 : 1;
    const ratePerPeriod = rate / periodsPerYear;
    const contributionPerPeriod = (extra * contribsPerYear) / periodsPerYear;

    const balances = [balanceStart];
    const contributed = [balanceStart];
    let balance = balanceStart;

    for (let year = 1; year <= years; year++) {
        for (let p = 0; p < periodsPerYear; p++) {
            balance = balance * (1 + ratePerPeriod) + contributionPerPeriod;
        }
        balances.push(balance);
        contributed.push(balanceStart + extra * contribsPerYear * year);
    }

    const totalIn = contributed[years];

    // ── Show results ───────────────────────────────
    finalBalance.textContent = fmt(balance);
    totalContributed.textContent = fmt(totalIn);
    interestEarned.textContent = fmt(balance - totalIn);
    results.hidden = false;

    drawChart(balances, contributed);
});

/* ── GROWTH CHART ──────────────────────────────────── */

// Pick a clean tick step (1 / 2 / 2.5 / 5 × a power of ten)
function niceStep(rough) {
    const power = Math.pow(10, Math.floor(Math.log10(rough)));
    const base = rough / power;
    let step;
    if (base <= 1) step = 1;
    else if (base <= 2) step = 2;
    else if (base <= 2.5) step = 2.5;
    else if (base <= 5) step = 5;
    else step = 10;
    return step * power;
}

function drawChart(balances, contributed) {
    const years = balances.length - 1;
    const maxVal = Math.max(balances[years], contributed[years], 1);

    // Chart geometry (viewBox units — the SVG scales to fit the card)
    const W = 408;
    const H = 215;
    const pad = { top: 12, right: 12, bottom: 26, left: 48 };
    const plotW = W - pad.left - pad.right;
    const plotH = H - pad.top - pad.bottom;

    // Scales
    const yStep = niceStep(maxVal / 4);
    const yMax = Math.ceil(maxVal / yStep) * yStep;
    const x = (i) => pad.left + (i / years) * plotW;
    const y = (v) => pad.top + (1 - v / yMax) * plotH;

    // X tick spacing: at most ~6 labelled years
    const xStepOptions = [1, 2, 5, 10, 20, 25, 50];
    const xStep = xStepOptions.find(s => years / s <= 6) || 50;

    // ── Build the SVG ──────────────────────────────
    let grid = ``;
    let ticks = ``;

    for (let v = 0; v <= yMax; v += yStep) {
        grid += `<line class="chart-grid" x1="${pad.left}" y1="${y(v)}" x2="${W - pad.right}" y2="${y(v)}"/>`;
        ticks += `<text class="chart-tick" x="${pad.left - 7}" y="${y(v) + 3}" text-anchor="end">${fmtCompact(v)}</text>`;
    }
    for (let i = 0; i <= years; i += xStep) {
        ticks += `<text class="chart-tick" x="${x(i)}" y="${H - 8}" text-anchor="middle">${i}</text>`;
    }

    const linePath = (data) => data.map((v, i) => `${i === 0 ? `M` : `L`}${x(i)},${y(v)}`).join(` `);
    const areaPath = `${linePath(balances)} L${x(years)},${y(0)} L${x(0)},${y(0)} Z`;

    chartWrap.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}" role="img"
             aria-label="Chart: balance grows from ${fmt(balances[0])} to ${fmt(balances[years])} over ${years} years, with ${fmt(contributed[years])} contributed in total.">
            <defs>
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#6366f1" stop-opacity="0.16"/>
                    <stop offset="1" stop-color="#6366f1" stop-opacity="0.02"/>
                </linearGradient>
            </defs>
            ${grid}
            ${ticks}
            <path class="chart-area" d="${areaPath}"/>
            <path class="chart-line chart-line--contributed" d="${linePath(contributed)}"/>
            <path class="chart-line chart-line--balance" d="${linePath(balances)}"/>
            <g class="chart-hover">
                <line class="chart-crosshair" y1="${pad.top}" y2="${H - pad.bottom}"/>
                <circle class="chart-dot chart-dot--contributed" r="4.5"/>
                <circle class="chart-dot chart-dot--balance" r="4.5"/>
            </g>
            <rect class="chart-hit" x="${pad.left}" y="${pad.top}" width="${plotW}" height="${plotH}" fill="transparent"/>
        </svg>`;

    // ── Tooltip (built with textContent, positioned on hover) ──
    const tooltip = document.createElement(`div`);
    tooltip.className = `chart-tooltip`;

    const ttTitle = document.createElement(`div`);
    ttTitle.className = `chart-tooltip-title`;
    tooltip.appendChild(ttTitle);

    const ttRows = [
        { key: ``, label: `Balance`, data: balances },
        { key: `tt-key--contributed`, label: `Contributed`, data: contributed },
    ].map(series => {
        const row = document.createElement(`div`);
        row.className = `tt-row`;
        const key = document.createElement(`span`);
        key.className = `tt-key ${series.key}`;
        const value = document.createElement(`span`);
        value.className = `tt-value`;
        const label = document.createElement(`span`);
        label.className = `tt-label`;
        label.textContent = series.label;
        row.append(key, value, label);
        tooltip.appendChild(row);
        return { value, data: series.data };
    });

    chartWrap.appendChild(tooltip);

    // ── Crosshair interaction ──────────────────────
    const svg = chartWrap.querySelector(`svg`);
    const crosshair = svg.querySelector(`.chart-crosshair`);
    const dotBalance = svg.querySelector(`.chart-dot--balance`);
    const dotContributed = svg.querySelector(`.chart-dot--contributed`);

    svg.addEventListener(`pointermove`, function (e) {
        const rect = svg.getBoundingClientRect();
        const scale = W / rect.width;
        const vx = (e.clientX - rect.left) * scale;

        // Snap to the nearest year
        const i = Math.min(years, Math.max(0, Math.round(((vx - pad.left) / plotW) * years)));

        crosshair.setAttribute(`x1`, x(i));
        crosshair.setAttribute(`x2`, x(i));
        dotBalance.setAttribute(`cx`, x(i));
        dotBalance.setAttribute(`cy`, y(balances[i]));
        dotContributed.setAttribute(`cx`, x(i));
        dotContributed.setAttribute(`cy`, y(contributed[i]));

        ttTitle.textContent = i === 0 ? `Start` : `Year ${i}`;
        ttRows.forEach(row => { row.value.textContent = fmt(row.data[i]); });

        // Keep the tooltip on whichever side of the crosshair has room
        const px = (x(i) / W) * rect.width;
        tooltip.style.left = px < rect.width / 2
            ? `${px + 14}px`
            : `${px - tooltip.offsetWidth - 14}px`;

        chartWrap.classList.add(`hovering`);
        tooltip.classList.add(`visible`);
    });

    svg.addEventListener(`pointerleave`, function () {
        chartWrap.classList.remove(`hovering`);
        tooltip.classList.remove(`visible`);
    });
}
