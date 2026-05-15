export const criteriaDefinitions = {
  A: {
    code: 'A',
    name: 'Lifecycle Economic Value',
    abbr: 'LEV',
    subCriteria: [
      'Net present value of all cost streams over full operational life',
      'Acquisition, implementation, operations, maintenance, end-of-life/disposal',
      'Discount rate = provincial borrowing cost + 1.5% risk premium',
      'Should-cost model mandatory before RFP opens (not shared with bidders)',
      'Sensitivity analysis at ±20% on key assumptions',
      'All costs in constant-year dollars with stated inflation methodology',
    ],
    scoringAnchors: {
      '90–100': 'LEV within 5% of should-cost model; strong operating cost controls; lifecycle risk well-transferred',
      '70–89': 'LEV within 15% of should-cost; reasonable risk allocation',
      '50–69': 'LEV 15–30% above should-cost; some risk retention concerns',
      'Below 50': 'LEV >30% above should-cost, or insufficient cost data to score',
    },
  },
  B: {
    code: 'B',
    name: 'Québec & Canadian Economic Development',
    abbr: 'QCED',
    subCriteria: [
      'Direct and first-tier subcontract economic benefits to QC/CA-domiciled firms',
      'Binding Québec and Canadian Economic Benefit Plan (QCEBP) required',
      'Liquidated damages for non-performance of QCEBP',
      'Trade-agreement compliant: evaluation weighting permitted; explicit mandates are not',
      'Net public return test: NPV of Quebec benefits must exceed EDP by ≥1.5×',
    ],
    scoringAnchors: {
      '90–100': '>70% Quebec content; binding QCEBP with meaningful liquidated damages',
      '70–89': '50–70% Quebec content; binding commitments on major work packages',
      '50–69': '30–50% Quebec content; some binding elements',
      'Below 50': '<30% Quebec content, or commitments are aspirational (MOUs only)',
    },
  },
  C: {
    code: 'C',
    name: 'Supply Chain Sovereignty & Security of Supply',
    abbr: 'SCSS',
    subCriteria: [
      'C1: Supplier domicile geopolitical risk (NATO/Five Eyes preferred; PRC/adversary = disqualifying concern)',
      'C2: Single-source dependency (concentration risk in critical components)',
      'C3: Technology substitutability (alternative suppliers within 24 months without disruption)',
      'C4: Data/IP custody (where does sensitive data reside? Who controls IP?)',
      'C5: Financial health of supplier (audited; stress-tested; lesson of Lion Electric)',
    ],
    scoringAnchors: {
      '90–100': 'NATO-allied supplier; no single-source dependency; technology substitutable; data in Canadian jurisdiction; strong financial health',
      '70–89': 'Allied but non-NATO; limited dependencies manageable; some substitutability',
      '50–69': 'Non-allied but non-adversary supplier; meaningful dependencies; data sovereignty concerns',
      'Below 50': 'Adversary-state supplier or affiliate; critical single-source dependency; data outside Canadian/allied control',
    },
  },
  D: {
    code: 'D',
    name: 'Risk Profile & Allocation',
    abbr: 'RPA',
    subCriteria: [
      'D1: Technology readiness (TRL 1–9; TRL 7+ required for major public-facing infrastructure)',
      'D2: Delivery track record (comparable projects; on-time, on-budget history)',
      'D3: Risk transfer quality (what risk is genuinely transferred vs. retained by Crown?)',
      'D4: Scope clarity gate (must score ≥70 before P3/collaborative procurement can be initiated)',
      'D5: Residual Crown risk (unmitigated risk remaining with procuring authority)',
    ],
    scoringAnchors: {
      '90–100': 'TRL 9, 3+ comparable projects delivered on-budget, genuine risk transfer, D4 ≥85',
      '70–89': 'TRL 7–8, comparable experience, reasonable risk transfer, D4 ≥70',
      '50–69': 'TRL 5–6, some track record, limited risk transfer, D4 50–69',
      'Below 50': 'TRL <5, no comparable experience, Crown retains dominant risk, D4 <50',
    },
  },
  E: {
    code: 'E',
    name: 'Environmental & Climate Performance',
    abbr: 'ECP',
    subCriteria: [
      'E1: Lifecycle GHG (ISO 14044 methodology; full life cycle assessment)',
      'E2: Climate resilience (asset designed for 2050–2080 climate projections)',
      'E3: Environmental assessment status (BAPE/federal IA complete or on track)',
      'E4: Federal conditionality alignment (federal funding conditions met)',
    ],
    scoringAnchors: {
      '90–100': 'Net-zero lifecycle GHG; 2080 climate resilience; BAPE complete; all federal conditions met',
      '70–89': 'Low-GHG; 2050 resilience minimum; BAPE underway; federal conditions substantially met',
      '50–69': 'Moderate GHG; baseline resilience; BAPE avis submitted; some federal conditions outstanding',
      'Below 50': 'High-GHG, no climate resilience analysis, no BAPE, federal conditions not met',
    },
  },
  F: {
    code: 'F',
    name: 'Social Value & Reconciliation',
    abbr: 'SVR',
    subCriteria: [
      'F1: Indigenous partnership (minimum floor: 20% equity or binding CBA — non-negotiable)',
      'F2: Social acceptability (documented municipal and community support)',
      'F3: Accessibility (AODA/Quebec accessibility standards; universal design)',
      'F4: Employment equity (binding commitments; not aspirational)',
    ],
    scoringAnchors: {
      '90–100': 'Majority Indigenous ownership or equity, binding CBA, Indigenous employment targets binding',
      '70–89': '20%+ equity or strong CBA, documented community consultation, binding employment elements',
      '50–69': 'CBA in negotiation, consultation underway, accessibility standards met',
      'Below 50': 'No Indigenous partnership, no CBA, limited consultation',
    },
  },
  G: {
    code: 'G',
    name: 'Innovation & Long-Term Industrial Capability',
    abbr: 'ILIC',
    subCriteria: [
      'G1: Technology transfer (binding obligations, not aspirational)',
      'G2: R&D investment (committed dollar amounts in Quebec/Canada)',
      'G3: Export potential (independent analysis, not vendor claims)',
      'G4: Skills ecosystem (apprenticeship, training, CEGEP/university partnerships)',
      'Note: G weight = 0% for Major Infrastructure (P3) — innovation should be a separate R&D instrument',
    ],
    scoringAnchors: {
      '90–100': 'Binding technology transfer with measurable outcomes; committed R&D; verified export potential',
      '70–89': 'Substantial technology transfer commitments; R&D investment planned; reasonable export case',
      '50–69': 'Some technology transfer; limited R&D; export potential unverified',
      'Below 50': 'No binding technology transfer; aspirational only; no export case',
    },
  },
  H: {
    code: 'H',
    name: 'Procurement Process Integrity & Governance',
    abbr: 'PPIG',
    subCriteria: [
      'H1: Competition depth (number of qualified bidders; thin market = H1 cannot exceed 50; redesign if <3 qualified)',
      'H2: Transparency (evaluation criteria published before RFP closes; scores published after award)',
      'H3: Conflict management (identified conflicts declared and managed; independent fairness monitor)',
      'H4: Post-award accountability (performance register publicly accessible; AMP notification of award)',
    ],
    scoringAnchors: {
      '90–100': '5+ qualified bidders; full criteria published; all conflicts managed; public performance register live',
      '70–89': '3–4 qualified bidders; criteria published; conflicts declared; performance framework in place',
      '50–69': '2–3 bidders; some transparency; partial conflict management',
      'Below 50': '<2 qualified bidders or RENA issues; criteria not published; conflicts unmanaged',
    },
  },
};

export const weightMatrix = {
  'Transit Rolling Stock': { A: 30, B: 20, C: 10, D: 15, E: 10, F: 5, G: 5, H: 5 },
  'Major Infrastructure (P3)': { A: 35, B: 15, C: 5, D: 25, E: 10, F: 5, G: 0, H: 5 },
  'Defence Materiel': { A: 20, B: 15, C: 25, D: 15, E: 5, F: 5, G: 10, H: 5 },
  'Digital/IT Systems': { A: 25, B: 15, C: 20, D: 15, E: 5, F: 5, G: 10, H: 5 },
  'Energy Infrastructure': { A: 30, B: 15, C: 10, D: 10, E: 20, F: 10, G: 0, H: 5 },
};

export const tier1Thresholds = {
  T1: {
    code: 'T1',
    name: 'Integrity (RENA/AMF)',
    description: 'No disqualifying convictions under RENA or AMF sanctions. Applies to prime contractor and all first-tier subcontractors with contracts >$1M.',
    details: [
      'No disqualifying convictions under RENA (Registre des entreprises non admissibles)',
      'No AMF (Autorité des marchés financiers) sanctions disqualifying participation',
      'Applies to prime contractor and all first-tier subcontractors with contracts >$1M',
      'Standard due diligence questionnaire (DDQ) process',
    ],
    failureConsequence: 'Immediate disqualification; no waiver mechanism',
  },
  T2: {
    code: 'T2',
    name: 'Technical Minimum',
    description: 'Demonstrated comparable scope reference contract for any contract >$100M. Same category, ≥50% of contract value, completed within 10 years.',
    details: [
      'Demonstrated comparable scope reference contract required for any contract >$100M',
      '"Comparable" = same procurement category, ≥50% of contract value, completed within 10 years',
      'Third-party verification of reference contract required',
    ],
    failureConsequence: 'Disqualification; eligible for re-qualification after demonstrated experience',
  },
  T3: {
    code: 'T3',
    name: 'Financial Viability',
    description: 'Audited financial statements and bonding capacity. Special application: applies to procuring authority\'s own fiscal envelope — unconfirmed funding suspends procurement.',
    details: [
      'Audited financial statements demonstrating capacity to undertake contract',
      'Bonding capacity confirmation from qualified surety',
      'Independent financial due diligence mandatory for contracts >$50M',
      'Special: applies to procuring authority\'s own fiscal envelope — unconfirmed funding suspends procurement',
    ],
    failureConsequence: 'Procurement suspended until financing confirmed; bidder failure = disqualification',
  },
  T4: {
    code: 'T4',
    name: 'Legal/Regulatory Compliance',
    description: 'Full compliance with applicable trade agreements, environmental assessment status, and data/privacy compliance for IT contracts.',
    details: [
      'Full compliance with applicable trade agreements (CFTA, CETA, CUSMA as relevant)',
      'Environmental assessment status: BAPE avis de projet submitted if required under LQE',
      'Data/privacy compliance: Loi 25 and Digital Sovereignty Policy for IT contracts',
    ],
    failureConsequence: 'Procurement suspended until regulatory pathway established; bidder failure = disqualification',
  },
  T5: {
    code: 'T5',
    name: 'Scope Responsiveness',
    description: 'Proposal must be materially responsive to all mandatory specifications. Non-responsive to any mandatory specification = disqualification.',
    details: [
      'Proposal must be materially responsive to all mandatory specifications in the RFP',
      'Non-responsive to any mandatory specification = disqualification',
      'Conditional bids acceptable only where RFP explicitly permits conditionality',
    ],
    failureConsequence: 'Bidder disqualification; does not affect other bidders',
  },
};

export const tradeoffProtocols = {
  P1: {
    code: 'P1',
    name: 'Cost vs. Quebec Content',
    trigger: 'Highest QCED-scoring bid is not the lowest-LEV bid.',
    decisionRule: [
      'Calculate Economic Development Premium (EDP) = cost difference vs. lowest compliant bid',
      'Commission independent net public return analysis',
      'If NPV of Quebec economic benefits (direct + indirect, over contract life) exceeds EDP by ≥1.5×: higher-cost option is supportable',
      'If NPV of Quebec benefits < 1.5× EDP: lower-cost option must be selected; Ministerial justification required if higher-cost option chosen',
    ],
    criticalConstraint: 'Net public return test must be conducted by an independent body — not the procuring authority or preferred bidder. Vendor claims must be independently verified.',
  },
  P2: {
    code: 'P2',
    name: 'Risk Transfer vs. Speed',
    trigger: 'P3/collaborative procurement proposed; D4 score below threshold.',
    decisionRule: [
      'D4 must score ≥70 before any P3 or collaborative procurement can be initiated',
      'If D4 < 70: mandatory return to design development; no RFP until D4 threshold met',
      'Availability payment cap: cannot exceed 8% of procuring agency annual operating budget',
    ],
    criticalConstraint: 'Scope ambiguity at RFP stage transfers cost risk from contractor to Crown; the purpose of P3 (risk transfer) is negated by insufficient scope definition.',
  },
  P3: {
    code: 'P3',
    name: 'Digital Sovereignty vs. Best-in-Class',
    trigger: 'IT procurement where data sovereignty considerations conflict with best-performing solution.',
    decisionRule: [
      'MCN\'s 40-contract/$1.4B reserve envelope applies first to sovereignty-sensitive applications',
      'If outside reserve envelope, structured sovereignty gap analysis required',
      'Are data sovereignty provisions technically verifiable (not just contractually stated)?',
      'Are they legally enforceable under Canadian jurisdiction?',
      'What is the residual US CLOUD Act / foreign jurisdiction risk?',
      'All IT contracts >$50M must include a costed exit plan with maximum 12-month transition period',
    ],
    criticalConstraint: '"Verifiable sovereignty" test: provisions must be demonstrable through technical audit, not merely asserted in contract language.',
  },
  P4: {
    code: 'P4',
    name: 'Indigenous Partnership vs. Schedule',
    trigger: 'F1 floor (20% equity or binding CBA) not yet established; RFP schedule pressure.',
    decisionRule: [
      'F1 floor is non-negotiable on schedule grounds — schedule pressure is not a valid reason to bypass',
      '18-month buffer mandatory before final RFP issue to establish genuine partnerships',
      'If project is outside traditional territory: CBA with proximate Indigenous community required',
      'CBA reviewed by Secrétariat aux affaires autochtones',
      'UNDRIP principles (free, prior, and informed consent) apply to all stages',
    ],
    criticalConstraint: 'Projects lacking genuine Indigenous partnership face elevated social acceptability risk, legal challenge risk, and F2 score penalties that materially affect project viability.',
  },
  P5: {
    code: 'P5',
    name: 'Proven Technology vs. Innovation',
    trigger: 'Innovative solution offered at lower cost or higher technical capability than proven alternative.',
    decisionRule: [
      'TRL 7+ is a Tier 1 threshold equivalent for major public-facing infrastructure (cannot be waived)',
      'TRL 5+ for non-critical systems or back-office applications',
      'Innovation-linked procurement must be a separate R&D instrument (SBIR-equivalent)',
      'Contracts mixing TRL 5–6 technology with TRL 9 delivery obligations scored at lowest TRL component',
    ],
    criticalConstraint: 'Public transit and infrastructure users cannot be the testing environment for unproven technology.',
  },
  P6: {
    code: 'P6',
    name: 'Competition vs. Integrity',
    trigger: 'Market structure produces <3 qualified bidders; or RENA/AMF issues affect a potential bidder.',
    decisionRule: [
      'RENA disqualification is non-negotiable — there is no waiver for market competitiveness reasons',
      'If thin market is structural: mandatory procurement redesign (unbundling, phasing, open-book structures)',
      'Sole-source: requires AMP notification before award, public justification within 30 days, market development plan',
    ],
    criticalConstraint: 'Do not bypass integrity requirements to preserve competition — this creates moral hazard and long-term procurement system damage.',
  },
};

export const governanceMatrix = [
  { value: '<$10M', authority: 'Deputy Minister or ADM', additional: 'Standard' },
  { value: '$10M–$100M', authority: 'Treasury Board (delegated) + SCT (IT: + MCN)', additional: 'Standard documentation' },
  { value: '$100M–$500M', authority: 'Treasury Board + AMP review + Fairness Monitor', additional: 'All documentation artifacts' },
  { value: '>$500M', authority: 'Council of Ministers + VFM analysis + external auditor + 90-day public comment', additional: 'All documentation artifacts' },
  { value: 'P3 (any value)', authority: 'Council of Ministers + all above requirements', additional: 'P3-specific documentation' },
];

export const documentationArtifacts = [
  { name: 'Procurement Strategy Record', description: 'Documents category classification, weight profile chosen, contextual adjustments applied, trade-off protocols triggered' },
  { name: 'Should-Cost Model', description: 'Independent lifecycle cost estimate produced before RFP opens; not shared with bidders; used to calibrate post-bid evaluation' },
  { name: 'Evaluation Scoring Record', description: 'Individual evaluator scores with rationale; committee deliberation minutes; final score justification for each criterion' },
  { name: 'Trade-off Decision Memo', description: 'For every Protocol triggered: the triggering condition, the analysis conducted, the decision rationale, the alternatives considered, the authority who approved' },
  { name: 'Post-Award Performance Register', description: 'Publicly accessible; updated at defined intervals; captures delivery milestones, financial performance, QCEBP compliance, IRB targets' },
];

export const contextualAdjustments = [
  {
    name: 'Fiscal Stress',
    trigger: 'Deficit >1.5% GDP for 2 consecutive years',
    adjustments: [
      { criterion: 'A (LEV)', change: '+5pp', rationale: 'Lifecycle cost certainty becomes paramount when fiscal room is constrained' },
      { criterion: 'G (Innovation)', change: '-5pp', rationale: 'Innovation spend deferred when fiscal room is constrained' },
    ],
  },
  {
    name: 'Security Advisory',
    trigger: 'CSIS formal advisory on a sector or supplier',
    adjustments: [
      { criterion: 'C (SCSS)', change: '+5 to +10pp', rationale: 'Security of supply overrides pure cost optimization when CSIS identifies threat' },
      { criterion: 'A (LEV)', change: '-5 to -10pp', rationale: 'Cost optimization secondary to security when CSIS advisory active' },
    ],
  },
  {
    name: 'Thin Market',
    trigger: '<3 qualified bidders',
    adjustments: [
      { criterion: 'H1 (Competition depth)', change: 'Cannot exceed 50/100 regardless of other scores', rationale: 'Thin market structurally limits competition quality' },
      { criterion: 'Procurement design', change: 'Mandatory redesign required', rationale: 'Consider unbundling, phasing, open-book structures, pre-qualification registers' },
    ],
  },
];

export const decisionRules = [
  { rule: 'D4 Gate', description: 'D4 ≥70 is mandatory before P3 or collaborative procurement can be initiated. D4 <70 = return to design development.', protocol: 'P2' },
  { rule: 'Protocol 1 Threshold', description: 'NPV of Quebec economic benefits must exceed Economic Development Premium by ≥1.5× to justify higher-cost bid selection.', protocol: 'P1' },
  { rule: 'F1 Floor', description: '20% Indigenous equity or binding CBA is the minimum floor. 18-month buffer mandatory if not established.', protocol: 'P4' },
  { rule: 'RENA Non-Waiver', description: 'RENA disqualification is absolute — no waiver for market competitiveness reasons.', protocol: 'P6' },
  { rule: 'H1 Thin Market Cap', description: 'H1 cannot exceed 50/100 if fewer than 3 qualified bidders. Mandatory procurement redesign required.', protocol: 'P6' },
  { rule: 'TRL Minimum (Major Infrastructure)', description: 'TRL 7+ is a Tier 1 threshold equivalent for major public-facing infrastructure. Cannot be waived.', protocol: 'P5' },
  { rule: 'Availability Payment Cap', description: 'Availability payments cannot exceed 8% of procuring agency annual operating budget.', protocol: 'P2' },
  { rule: 'IT Exit Plan', description: 'All IT contracts >$50M must include a costed exit plan with maximum 12-month transition period.', protocol: 'P3' },
  { rule: 'T3 Financing Gate', description: 'Procurement cannot advance past pre-qualification stage if procuring authority\'s financing is not confirmed.', protocol: null },
  { rule: 'Sole-Source Transparency', description: 'Sole-source requires AMP notification before award, public justification within 30 days, and market development plan.', protocol: 'P6' },
];
