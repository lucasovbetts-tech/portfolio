/**
 * UK Income Tax Calculator — 2025/26 tax year
 * England, Wales & Northern Ireland rates
 *
 * Income Tax bands (after Personal Allowance):
 *   Personal Allowance  £0 – £12,570          0%
 *   Basic rate          £12,571 – £50,270     20%
 *   Higher rate         £50,271 – £125,140    40%
 *   Additional rate     above £125,140         45%
 *
 * Personal Allowance taper:
 *   Reduced £1 per £2 earned above £100,000
 *   Fully withdrawn at £125,140 (creating ~60% effective marginal rate)
 *
 * Employee National Insurance (Class 1):
 *   Primary threshold   £12,570/yr             0%
 *   Main rate           £12,571 – £50,270      8%
 *   Upper earnings      above £50,270           2%
 */

"use strict";

/* ── TAX CONSTANTS ─────────────────────────────────── */
const TAX = {
  PERSONAL_ALLOWANCE:      12570,
  BASIC_RATE_LIMIT:        50270,
  HIGHER_RATE_LIMIT:      125140,
  TAPER_START:            100000,

  BASIC_RATE:              0.20,
  HIGHER_RATE:             0.40,
  ADDITIONAL_RATE:         0.45,
};

const NI = {
  PRIMARY_THRESHOLD:       12570,
  UPPER_EARNINGS_LIMIT:    50270,
  MAIN_RATE:               0.08,
  UPPER_RATE:              0.02,
};

/* ── PERSONAL ALLOWANCE (with £100k taper) ────────── */
function getPersonalAllowance(grossIncome) {
  if (grossIncome <= TAX.TAPER_START) return TAX.PERSONAL_ALLOWANCE;
  const reduction = Math.floor((grossIncome - TAX.TAPER_START) / 2);
  return Math.max(0, TAX.PERSONAL_ALLOWANCE - reduction);
}

/* ── INCOME TAX ────────────────────────────────────── */
function calculateIncomeTax(grossIncome) {
  const personalAllowance = getPersonalAllowance(grossIncome);
  const taxableIncome = Math.max(0, grossIncome - personalAllowance);

  let tax = 0;
  const bands = [];

  // Basic rate band: taxable income £0 – £37,700 (i.e. gross £12,571 – £50,270)
  const basicBandSize = TAX.BASIC_RATE_LIMIT - TAX.PERSONAL_ALLOWANCE; // £37,700
  const basicIncome = Math.min(taxableIncome, basicBandSize);
  if (basicIncome > 0) {
    const basicTax = basicIncome * TAX.BASIC_RATE;
    tax += basicTax;
    bands.push({
      label: "Basic rate (20%)",
      income: basicIncome,
      tax: basicTax,
    });
  }

  // Higher rate band: taxable income £37,701 – £112,570 (gross £50,271 – £125,140)
  const higherBandStart = basicBandSize;
  const higherBandEnd   = TAX.HIGHER_RATE_LIMIT - personalAllowance;
  const higherIncome = Math.min(
    Math.max(0, taxableIncome - higherBandStart),
    higherBandEnd - higherBandStart
  );
  if (higherIncome > 0) {
    const higherTax = higherIncome * TAX.HIGHER_RATE;
    tax += higherTax;
    bands.push({
      label: "Higher rate (40%)",
      income: higherIncome,
      tax: higherTax,
    });
  }

  // Additional rate: taxable income above £112,570 (gross above £125,140)
  const additionalIncome = Math.max(
    0,
    taxableIncome - (TAX.HIGHER_RATE_LIMIT - personalAllowance)
  );
  if (additionalIncome > 0) {
    const additionalTax = additionalIncome * TAX.ADDITIONAL_RATE;
    tax += additionalTax;
    bands.push({
      label: "Additional rate (45%)",
      income: additionalIncome,
      tax: additionalTax,
    });
  }

  return { tax, bands, personalAllowance, taxableIncome };
}

/* ── NATIONAL INSURANCE ────────────────────────────── */
function calculateNI(grossIncome) {
  let ni = 0;
  const bands = [];

  // Main rate: £12,570 – £50,270
  const mainBandIncome = Math.min(
    Math.max(0, grossIncome - NI.PRIMARY_THRESHOLD),
    NI.UPPER_EARNINGS_LIMIT - NI.PRIMARY_THRESHOLD
  );
  if (mainBandIncome > 0) {
    const mainNI = mainBandIncome * NI.MAIN_RATE;
    ni += mainNI;
    bands.push({ label: "NI main rate (8%)", income: mainBandIncome, tax: mainNI });
  }

  // Upper rate: above £50,270
  const upperBandIncome = Math.max(0, grossIncome - NI.UPPER_EARNINGS_LIMIT);
  if (upperBandIncome > 0) {
    const upperNI = upperBandIncome * NI.UPPER_RATE;
    ni += upperNI;
    bands.push({ label: "NI upper rate (2%)", income: upperBandIncome, tax: upperNI });
  }

  return { ni, bands };
}

/* ── FORMATTING ────────────────────────────────────── */
function fmt(n) {
  return "£" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function pct(part, total) {
  return total > 0 ? ((part / total) * 100).toFixed(1) + "%" : "0.0%";
}

/* ── RENDER RESULTS ────────────────────────────────── */
function renderResults(gross, incomeTax, niResult) {
  const totalDeductions = incomeTax.tax + niResult.ni;
  const takeHome        = gross - totalDeductions;
  const effectiveRate   = pct(totalDeductions, gross);

  // Summary values
  document.getElementById("taxPaid").textContent    = fmt(incomeTax.tax);
  document.getElementById("niPaid").textContent     = fmt(niResult.ni);
  document.getElementById("totalDed").textContent   = fmt(totalDeductions);
  document.getElementById("afterTax").textContent   = fmt(takeHome);
  document.getElementById("effectiveRate").textContent = effectiveRate;

  // Monthly / weekly
  document.getElementById("monthlyTakeHome").textContent = fmt(takeHome / 12);
  document.getElementById("weeklyTakeHome").textContent  = fmt(takeHome / 52);

  // Personal allowance note
  const paEl = document.getElementById("personalAllowance");
  if (incomeTax.personalAllowance < TAX.PERSONAL_ALLOWANCE) {
    paEl.textContent = `Personal allowance: ${fmt(incomeTax.personalAllowance)} (tapered — you earn above £100,000)`;
    paEl.classList.add("tapered");
  } else {
    paEl.textContent = `Personal allowance: ${fmt(incomeTax.personalAllowance)}`;
    paEl.classList.remove("tapered");
  }

  // Band breakdown
  const breakdownEl = document.getElementById("bandBreakdown");
  breakdownEl.innerHTML = "";

  const allBands = [
    ...incomeTax.bands,
    ...niResult.bands,
  ];

  allBands.forEach(({ label, income, tax }) => {
    const row = document.createElement("div");
    row.className = "band-row";
    row.innerHTML = `
      <span class="band-label">${label}</span>
      <span class="band-income">on ${fmt(income)}</span>
      <span class="band-tax">${fmt(tax)}</span>
    `;
    breakdownEl.appendChild(row);
  });

  // Show results
  document.getElementById("results").hidden = false;
}

/* ── MAIN HANDLER ──────────────────────────────────── */
function runCalculation(e) {
  if (e) e.preventDefault();

  const input = document.getElementById("income");
  const errorEl = document.getElementById("inputError");
  const gross = parseFloat(input.value);

  // Validation
  if (isNaN(gross) || gross < 0) {
    errorEl.textContent = "Please enter a valid annual income.";
    errorEl.hidden = false;
    document.getElementById("results").hidden = true;
    return;
  }
  errorEl.hidden = true;

  if (gross === 0) {
    // Zero income — show zeroed results
    renderResults(0, { tax: 0, bands: [], personalAllowance: TAX.PERSONAL_ALLOWANCE, taxableIncome: 0 }, { ni: 0, bands: [] });
    return;
  }

  const incomeTax = calculateIncomeTax(gross);
  const niResult  = calculateNI(gross);
  renderResults(gross, incomeTax, niResult);
}

/* ── EVENT LISTENERS ───────────────────────────────── */
document.getElementById("tax-form").addEventListener("submit", runCalculation);

// Allow Enter key from input
document.getElementById("income").addEventListener("keydown", function (e) {
  if (e.key === "Enter") runCalculation(e);
});