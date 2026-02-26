import { useState, useEffect, useRef } from "react";

const C = {
  bg:"#F7FDF9",white:"#FFFFFF",card:"#F0FAF2",border:"#C8E6D0",
  green:"#1A7A3C",greenDark:"#145F2E",text:"#0D2B1A",muted:"#4A7A5A",dim:"#8AB89A",
  danger:"#DC2626",dangerLight:"#FEE2E2",success:"#059669",successLight:"#D1FAE5",
};

const COUNTRIES = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Brazzaville)","Congo (Kinshasa)","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

const CURRENCIES = [
  {symbol:"₦",name:"Nigerian Naira"},{symbol:"$",name:"US Dollar"},{symbol:"£",name:"British Pound"},
  {symbol:"€",name:"Euro"},{symbol:"KES",name:"Kenyan Shilling"},{symbol:"GHS",name:"Ghanaian Cedi"},
  {symbol:"ZAR",name:"South African Rand"},{symbol:"UGX",name:"Ugandan Shilling"},{symbol:"ETB",name:"Ethiopian Birr"},
  {symbol:"TZS",name:"Tanzanian Shilling"},{symbol:"RWF",name:"Rwandan Franc"},{symbol:"XOF",name:"West African CFA"},
  {symbol:"EGP",name:"Egyptian Pound"},{symbol:"MAD",name:"Moroccan Dirham"},{symbol:"C$",name:"Canadian Dollar"},
  {symbol:"A$",name:"Australian Dollar"},{symbol:"INR",name:"Indian Rupee"},{symbol:"AED",name:"UAE Dirham"},
  {symbol:"Other",name:"Other Currency"},
];

const INDUSTRIES = [
  {
    id:"ngo",icon:"🌍",name:"NGO / Non-Profit",color:"#1A7A3C",
    description:"Community development, advocacy, humanitarian operations",
    tagline:"Structure your mission. Execute with clarity.",
    projects:["Community Outreach","Health Campaign","Education Program","Conference / Symposium","Seminar / Workshop","Fundraising Campaign","Advocacy Campaign","Volunteer Mobilization","Research Initiative","Other"],
    roles:["Executive Director","Program Manager","Project Coordinator","Field Officer","M&E Officer","Communications Officer","Finance Officer","Grants & Fundraising Officer","Community Liaison Officer","Logistics Officer","Admin & Operations Officer","Research Officer","Gender & Inclusion Officer","Volunteer Coordinator","Volunteers","Driver / Field Support","Others"],
    tasks:{
      default:["Project kickoff meeting","Stakeholder mapping","Venue sourcing and booking","Budget preparation","Team briefing and onboarding","Materials procurement","Participant registration","Communications and publicity","Photography and documentation","Post-project evaluation","Financial reconciliation"],
      "Community Outreach":["Community needs assessment","Community leader engagement","Volunteer recruitment","Beneficiary registration","Distribution logistics","Awareness materials printing","Field team deployment","Data collection","Post-outreach follow-up"],
      "Health Campaign":["Medical team recruitment","Drug and equipment procurement","Health screening logistics","Patient registration setup","Referral pathway establishment","Community health education","Data and record management","Emergency response planning","Post-campaign health report"],
      "Conference / Symposium":["Speaker invitation","Agenda design","Venue scouting and booking","Catering planning","AV equipment setup","Registration coordination","Transport and accommodation","Programme booklet printing","Sponsorship outreach","Live streaming setup","Post-conference documentation"],
      "Seminar / Workshop":["Curriculum development","Facilitator sourcing","Participant recruitment","Training materials design","Pre-training assessment","Room setup","Attendance management","Post-training evaluation","Certificate distribution","Follow-up mentorship plan"],
      "Fundraising Campaign":["Fundraising strategy","Donor research","Campaign branding","Social media setup","Fundraising platform setup","Donor outreach","Progress tracking","Donor acknowledgement","Final impact report"],
      "Advocacy Campaign":["Policy research","Stakeholder mapping","Campaign messaging","Coalition building","Petition drive","Media engagement","Social media coordination","Official meetings scheduling","Impact documentation","Post-campaign report"],
    },
    formSections:[
      {id:"project",label:"Project Details",icon:"📋",fields:[
        {name:"projectName",label:"Project Name",type:"input",required:true,placeholder:"e.g. Lagos Community Health Outreach 2025"},
        {name:"description",label:"Project Description & Goals",type:"textarea",required:true,placeholder:"Describe the project, its purpose, what change you want to create, and who benefits..."},
        {name:"audience",label:"Target Beneficiaries",type:"input",placeholder:"e.g. Women aged 18-45 in Surulere, Lagos"},
        {name:"location",label:"Country / Location",type:"country"},
        {name:"expectedBeneficiaries",label:"Expected Number of Beneficiaries",type:"input",placeholder:"e.g. 500 individuals"},
        {name:"timeline",label:"Project Timeline",type:"input",placeholder:"e.g. 6 weeks, starting April 2025"},
      ]},
      {id:"funding",label:"Funding & Budget",icon:"💰",fields:[
        {name:"fundingSource",label:"Funding Source",type:"select",options:["Donor-funded","Government grant","Internal funds","Corporate sponsorship","Crowdfunding","Multiple sources","Other"]},
        {name:"budget",label:"Estimated Budget",type:"budget"},
        {name:"budgetConstraints",label:"Budget Constraints or Notes",type:"textarea",small:true,placeholder:"e.g. 30% must go to field operations, admin capped at 15%..."},
      ]},
      {id:"team",label:"Team & Tasks",icon:"✅",fields:[
        {name:"roles",label:"Team Roles & Headcount",type:"roles"},
        {name:"tasks",label:"Key Activities to Execute",type:"tasks"},
        {name:"volunteers",label:"Volunteers Involved?",type:"select",options:["Yes — already recruited","Yes — need to recruit","No volunteers","To be decided"]},
      ]},
      {id:"risk",label:"Risk & Environment",icon:"⚠️",fields:[
        {name:"knownRisks",label:"Known Risks or Challenges",type:"textarea",small:true,placeholder:"e.g. Low community turnout, funding delays, bad weather..."},
        {name:"riskContext",label:"Operating Environment",type:"textarea",small:true,placeholder:"e.g. Underserved community, rainy season likely, community leaders must approve first..."},
      ]},
      {id:"comms",label:"Communication Plan",icon:"📢",fields:[
        {name:"channels",label:"Communication Channels",type:"textarea",small:true,placeholder:"e.g. WhatsApp group for team, email newsletters, Facebook & Instagram for public..."},
        {name:"reportingNeeds",label:"Reporting Requirements",type:"select",options:["No formal reporting","Weekly progress updates","Monthly donor reports","Final impact report only","Real-time field data capture","Multiple report types"]},
      ]},
    ],
  },
  {
    id:"health",icon:"🏥",name:"Healthcare",color:"#1565C0",
    description:"Hospitals, clinics, public health, medical services",
    tagline:"Deliver quality care. Coordinate with precision.",
    projects:["Patient Awareness Campaign","Community Health Screening","Medical Conference","Staff Training & Development","Health Policy Advocacy","Research Study Rollout","Clinic / Facility Launch","Mental Health Program","Vaccination Drive","Other"],
    roles:["Medical Director","Hospital Administrator","Project Manager","Nurse Coordinator","Public Health Officer","Communications Lead","Finance Officer","Research Officer","Community Health Worker","Logistics Coordinator","Quality Assurance Officer","Training Coordinator","Data Manager","Volunteers","Others"],
    tasks:{
      default:["Project kickoff","Stakeholder mapping","Venue and facility setup","Budget preparation","Team training","Equipment procurement","Patient registration","Public communications","Documentation and reporting","Post-project evaluation"],
      "Community Health Screening":["Screening site setup","Medical team deployment","Equipment procurement","Participant registration","Triage workflow design","Data collection setup","Referral pathway","Adverse event protocol","Post-screening follow-up","Report writing"],
      "Vaccination Drive":["Target population mapping","Cold chain setup","Vaccine procurement","Community mobilization","Vaccination site setup","Adverse event monitoring","Data capture and reporting","Post-campaign analysis"],
      "Staff Training & Development":["Training needs assessment","Curriculum design","Facilitator sourcing","Participant selection","Pre-training assessment","Training delivery","Post-training evaluation","Competency certification","Follow-up mentorship"],
    },
    formSections:[
      {id:"project",label:"Program Details",icon:"🏥",fields:[
        {name:"projectName",label:"Program / Project Name",type:"input",required:true,placeholder:"e.g. Lagos Free Health Screening Day 2025"},
        {name:"description",label:"Program Description & Clinical Objectives",type:"textarea",required:true,placeholder:"Describe the health program, its clinical goals, services to be provided, and expected health outcomes..."},
        {name:"audience",label:"Target Patient / Beneficiary Population",type:"input",placeholder:"e.g. Adults 40+ with hypertension risk in Surulere"},
        {name:"location",label:"Country / Location",type:"country"},
        {name:"expectedPatients",label:"Expected Number of Patients",type:"input",placeholder:"e.g. 300 patients per day"},
        {name:"timeline",label:"Program Timeline",type:"input",placeholder:"e.g. 3-day screening, April 10-12 2025"},
        {name:"facilityType",label:"Delivery Setting",type:"select",options:["Community venue","Primary health centre","Secondary hospital","Tertiary hospital","Mobile health unit","Virtual / Telehealth","Multiple locations"]},
      ]},
      {id:"clinical",label:"Clinical & Operational Details",icon:"🩺",fields:[
        {name:"servicesOffered",label:"Health Services to be Provided",type:"textarea",small:true,placeholder:"e.g. Blood pressure check, malaria rapid test, HIV counselling, blood glucose, eye screening..."},
        {name:"referralSystem",label:"Referral & Follow-Up Plan",type:"textarea",small:true,placeholder:"e.g. Patients with hypertension referred to Lagos State Hospital, follow-up calls after 2 weeks..."},
        {name:"regulatoryNeeds",label:"Regulatory / Approval Requirements",type:"select",options:["No approval required","State Ministry of Health approval","NAFDAC clearance needed","Ethics committee approval","Multiple approvals needed","Not sure"]},
      ]},
      {id:"funding",label:"Budget & Funding",icon:"💰",fields:[
        {name:"fundingSource",label:"Funding Source",type:"select",options:["Hospital internal budget","Government grant","NGO / donor funded","Corporate CSR sponsorship","Multiple sources","Other"]},
        {name:"budget",label:"Estimated Program Budget",type:"budget"},
        {name:"budgetConstraints",label:"Budget Notes",type:"textarea",small:true,placeholder:"e.g. Drug costs capped at 40%, logistics limited to ₦200,000..."},
      ]},
      {id:"team",label:"Team & Tasks",icon:"✅",fields:[
        {name:"roles",label:"Clinical & Admin Team Roles",type:"roles"},
        {name:"tasks",label:"Key Program Activities",type:"tasks"},
      ]},
      {id:"risk",label:"Risk & Safety",icon:"⚠️",fields:[
        {name:"knownRisks",label:"Operational or Clinical Risks",type:"textarea",small:true,placeholder:"e.g. High patient volume, drug stockouts, adverse events, cold chain failure..."},
        {name:"safetyProtocol",label:"Patient Safety & Emergency Protocol",type:"textarea",small:true,placeholder:"e.g. On-site medical officer available, referral hospital 10 mins away..."},
      ]},
      {id:"comms",label:"Communication Plan",icon:"📢",fields:[
        {name:"channels",label:"Communication Channels",type:"textarea",small:true,placeholder:"e.g. Clinical WhatsApp groups, hospital notice boards, radio jingles, SMS to community..."},
        {name:"reportingNeeds",label:"Reporting Requirements",type:"select",options:["Internal clinical records only","Ministry of Health report required","Donor report required","Research publication intended","Multiple reports needed"]},
      ]},
    ],
  },
  {
    id:"education",icon:"🎓",name:"Education",color:"#6A1B9A",
    description:"Schools, universities, e-learning, skills training",
    tagline:"Design learning. Drive outcomes.",
    projects:["School Program Launch","Curriculum Development","Student Workshop / Bootcamp","Academic Conference","Teacher Training","Scholarship / Bursary Program","E-Learning Course Rollout","Literacy Campaign","STEM Outreach","Other"],
    roles:["Program Director","Academic Coordinator","Project Manager","Curriculum Developer","Lead Trainer / Facilitator","Student Affairs Officer","Communications Officer","Finance Officer","Admissions Coordinator","IT / LMS Officer","M&E Officer","Volunteer Teaching Assistants","Others"],
    tasks:{
      default:["Program planning and design","Stakeholder briefing","Venue setup","Budget preparation","Trainer sourcing","Learning materials development","Participant registration","Communications and outreach","Documentation","Post-program evaluation"],
      "Student Workshop / Bootcamp":["Curriculum design","Trainer recruitment","Participant onboarding","Pre-workshop assessment","Learning materials printing","Timetable planning","Workshop facilitation","Post-workshop evaluation","Certification","Alumni follow-up"],
      "Teacher Training":["Training needs assessment","Content design","Trainer sourcing","Participant selection","Venue setup","Pre-training assessment","Training delivery","Post-training evaluation","Mentorship and follow-up"],
      "Scholarship / Bursary Program":["Eligibility criteria design","Application portal setup","Outreach to schools","Application review","Interview process","Awardee onboarding","Disbursement plan","Scholar monitoring","Annual renewal process"],
    },
    formSections:[
      {id:"project",label:"Program Details",icon:"🎓",fields:[
        {name:"projectName",label:"Program / Project Name",type:"input",required:true,placeholder:"e.g. Girls in STEM Bootcamp Lagos 2025"},
        {name:"description",label:"Program Description & Learning Objectives",type:"textarea",required:true,placeholder:"Describe the program, what learners will gain, skills to be transferred, and expected outcomes..."},
        {name:"audience",label:"Target Learners / Participants",type:"input",placeholder:"e.g. Secondary school girls aged 14-18 in Abuja"},
        {name:"location",label:"Country / Location",type:"country"},
        {name:"expectedLearners",label:"Expected Number of Learners",type:"input",placeholder:"e.g. 100 students per cohort"},
        {name:"timeline",label:"Program Timeline",type:"input",placeholder:"e.g. 8-week bootcamp, May - June 2025"},
        {name:"deliveryMode",label:"Delivery Mode",type:"select",options:["In-person / physical","Online / virtual","Hybrid","Self-paced e-learning","On-site at school","Community-based"]},
      ]},
      {id:"academic",label:"Academic & Curriculum Details",icon:"📚",fields:[
        {name:"curriculum",label:"Curriculum / Content Overview",type:"textarea",small:true,placeholder:"e.g. Week 1: Intro to coding, Week 2: HTML/CSS, Week 3: Problem solving..."},
        {name:"accreditation",label:"Certification or Accreditation",type:"select",options:["No formal certification","Internal certificate of participation","Nationally accredited","University credit-bearing","Professional body certification","Not yet decided"]},
        {name:"prerequisites",label:"Entry Requirements",type:"textarea",small:true,placeholder:"e.g. Minimum WAEC 5 credits, basic computer literacy, or no requirements..."},
      ]},
      {id:"funding",label:"Budget & Funding",icon:"💰",fields:[
        {name:"fundingSource",label:"Funding Source",type:"select",options:["School / institution budget","Government grant","NGO / donor funded","Corporate sponsorship","Student fees","Scholarship fund","Multiple sources","Other"]},
        {name:"budget",label:"Estimated Program Budget",type:"budget"},
      ]},
      {id:"team",label:"Team & Tasks",icon:"✅",fields:[
        {name:"roles",label:"Academic & Support Team Roles",type:"roles"},
        {name:"tasks",label:"Key Program Activities",type:"tasks"},
      ]},
      {id:"risk",label:"Risks & Challenges",icon:"⚠️",fields:[
        {name:"knownRisks",label:"Known Risks or Challenges",type:"textarea",small:true,placeholder:"e.g. Low attendance, facilitator dropouts, internet connectivity issues..."},
        {name:"riskContext",label:"Learner & Community Context",type:"textarea",small:true,placeholder:"e.g. First-generation students, rural community, limited devices..."},
      ]},
      {id:"comms",label:"Communication Plan",icon:"📢",fields:[
        {name:"channels",label:"Communication Channels",type:"textarea",small:true,placeholder:"e.g. WhatsApp for students/parents, email to schools, Instagram for promotion..."},
        {name:"reportingNeeds",label:"Reporting Requirements",type:"select",options:["No formal reporting","Internal program report","Funder/donor report","Government authority report","Multiple reports"]},
      ]},
    ],
  },
  {
    id:"corporate",icon:"🏢",name:"Corporate / Business",color:"#B45309",
    description:"Companies, SMEs, enterprise operations",
    tagline:"Plan smart. Execute faster. Win.",
    projects:["Product Launch","Corporate Event / Summit","Staff Retreat","CSR Initiative","Brand Campaign","Investor / Stakeholder Meeting","Market Expansion","Internal Process Rollout","Sales Campaign","Annual General Meeting","Other"],
    roles:["CEO / MD","Project Manager","Operations Manager","Marketing Manager","Sales Lead","Finance Manager","HR Manager","Communications Lead","Product Manager","Brand Manager","Customer Success Lead","Legal / Compliance Officer","IT Manager","Executive Assistant","Others"],
    tasks:{
      default:["Project kickoff","Stakeholder alignment","Venue and logistics planning","Budget sign-off","Team role assignment","Vendor engagement","Communications and PR plan","Documentation and reporting","Post-project review","Financial reconciliation"],
      "Product Launch":["Market research","Product positioning","Launch event planning","Media and PR strategy","Social media campaign","Influencer outreach","Sales team briefing","Distribution setup","Post-launch review"],
      "Brand Campaign":["Brand audit","Campaign brief and messaging","Creative development","Media planning","Social media rollout","Influencer outreach","Performance tracking","Post-campaign analysis"],
      "CSR Initiative":["CSR strategy alignment","Community needs assessment","Partner identification","Budget planning","Volunteer mobilisation","Execution and delivery","PR and media coverage","Impact documentation","CSR report"],
    },
    formSections:[
      {id:"project",label:"Project Details",icon:"🏢",fields:[
        {name:"projectName",label:"Project / Initiative Name",type:"input",required:true,placeholder:"e.g. Q2 Product Launch — Lagos 2025"},
        {name:"description",label:"Project Description & Business Objective",type:"textarea",required:true,placeholder:"Describe the project, the business problem it solves, commercial goals, and what success looks like..."},
        {name:"audience",label:"Target Audience / Market",type:"input",placeholder:"e.g. SME owners in Lagos and Abuja, B2B enterprise clients"},
        {name:"location",label:"Country / Location",type:"country"},
        {name:"timeline",label:"Project Timeline",type:"input",placeholder:"e.g. 8 weeks, April - June 2025"},
        {name:"department",label:"Lead Department / Business Unit",type:"input",placeholder:"e.g. Marketing, Sales, Operations, Product"},
      ]},
      {id:"business",label:"Business Context",icon:"📊",fields:[
        {name:"kpis",label:"Key Performance Indicators (KPIs)",type:"textarea",small:true,placeholder:"e.g. 500 product units sold, 20% brand awareness lift, ₦10M revenue target..."},
        {name:"competitors",label:"Competitive Landscape",type:"textarea",small:true,placeholder:"e.g. 3 main competitors launching similar products, market is price-sensitive..."},
        {name:"approvals",label:"Approvals or Sign-offs Required",type:"select",options:["CEO/MD approval only","Board approval required","Multiple departmental sign-offs","No formal approval","Legal/regulatory clearance needed"]},
      ]},
      {id:"funding",label:"Budget & Resources",icon:"💰",fields:[
        {name:"fundingSource",label:"Budget Source",type:"select",options:["Departmental budget","Company-wide budget","External investor funding","Revenue-funded","Sponsorship or partnership","Other"]},
        {name:"budget",label:"Project Budget",type:"budget"},
        {name:"budgetConstraints",label:"Budget Notes",type:"textarea",small:true,placeholder:"e.g. Marketing spend capped at 30%, no CAPEX allowed..."},
      ]},
      {id:"team",label:"Team & Execution Plan",icon:"✅",fields:[
        {name:"roles",label:"Project Team Roles",type:"roles"},
        {name:"tasks",label:"Key Project Activities",type:"tasks"},
        {name:"vendors",label:"External Vendors or Agencies",type:"textarea",small:true,placeholder:"e.g. Creative agency for branding, event company for venue, PR firm for media..."},
      ]},
      {id:"risk",label:"Risks & Dependencies",icon:"⚠️",fields:[
        {name:"knownRisks",label:"Known Risks or Blockers",type:"textarea",small:true,placeholder:"e.g. Key team member leaving, supply chain delays, competitor counter-launch..."},
        {name:"dependencies",label:"Project Dependencies",type:"textarea",small:true,placeholder:"e.g. Product certification must be complete before launch, board approval needed by March 10..."},
      ]},
      {id:"comms",label:"Communication Plan",icon:"📢",fields:[
        {name:"channels",label:"Internal & External Channels",type:"textarea",small:true,placeholder:"e.g. Slack for team, email for stakeholders, press release, LinkedIn, paid social..."},
        {name:"reportingNeeds",label:"Reporting Requirements",type:"select",options:["Weekly team status updates","Board/executive reporting","Client-facing updates","Investor reporting","Multiple reporting layers"]},
      ]},
    ],
  },
  {
    id:"government",icon:"🏛️",name:"Government / Public Sector",color:"#7B1FA2",
    description:"MDAs, local government, public programs and policy",
    tagline:"Serve the people. Execute with accountability.",
    projects:["Public Sensitization Campaign","Policy Launch","Town Hall / Community Forum","Government Conference","Infrastructure Project","Social Welfare Program","Youth Empowerment Initiative","Public Health Program","Electoral Activity","Other"],
    roles:["Program Director / DG","Project Coordinator","Policy Officer","Communications Officer","Finance / Budget Officer","M&E Officer","Community Liaison Officer","Legal & Compliance Officer","Logistics Officer","Media Relations Officer","Admin Officer","Field Officers","Security Personnel","Others"],
    tasks:{
      default:["Ministerial briefing","Stakeholder mapping","Venue and logistics planning","Budget and procurement plan","Team coordination","Communications and press plan","Field team deployment","Documentation and reporting","Post-project evaluation"],
      "Public Sensitization Campaign":["Message development and approval","Community mapping","IEC materials design","Media placement","Community mobilization","Field sensitization sessions","Feedback collection","Impact documentation","Final report to ministry"],
      "Town Hall / Community Forum":["Agenda development","Community leader invitation","Venue setup","Transport logistics","Participant registration","Facilitation plan","Live coverage setup","Minutes documentation","Follow-up action plan"],
      "Policy Launch":["Policy brief development","Stakeholder consultation","Legal review","Media communication plan","Launch event planning","Policy dissemination","Implementation guidelines","Monitoring framework","Post-launch feedback"],
    },
    formSections:[
      {id:"project",label:"Program Details",icon:"🏛️",fields:[
        {name:"projectName",label:"Program / Initiative Name",type:"input",required:true,placeholder:"e.g. Lagos State Youth Skills Empowerment Initiative 2025"},
        {name:"description",label:"Program Description & Policy Objectives",type:"textarea",required:true,placeholder:"Describe the program, the policy mandate behind it, target population, and expected public impact..."},
        {name:"audience",label:"Target Beneficiaries / Citizens",type:"input",placeholder:"e.g. Unemployed youth aged 18-35 across all LGAs in Rivers State"},
        {name:"location",label:"Country / Location",type:"country"},
        {name:"jurisdiction",label:"Jurisdiction / Coverage Area",type:"input",placeholder:"e.g. All 20 LGAs in Ogun State, or Federal - nationwide"},
        {name:"expectedBeneficiaries",label:"Expected Number of Beneficiaries",type:"input",placeholder:"e.g. 10,000 citizens"},
        {name:"timeline",label:"Program Timeline",type:"input",placeholder:"e.g. 12 weeks, commencing June 2025"},
        {name:"mandatoryAuthority",label:"Authorising Authority / Policy Mandate",type:"input",placeholder:"e.g. Ministry of Youth and Sports Development"},
      ]},
      {id:"policy",label:"Policy & Compliance",icon:"📜",fields:[
        {name:"policyBasis",label:"Relevant Policy, Law or Regulation",type:"textarea",small:true,placeholder:"e.g. National Youth Policy 2019, SDG Goal 8, Lagos State Employment Trust Fund Act..."},
        {name:"approvals",label:"Approvals or Sign-offs Required",type:"select",options:["Ministry head approval","Commissioner sign-off","Governor's Office approval","Federal Executive Council","National Assembly ratification","Multiple approvals","Procurement/ICPC compliance"]},
        {name:"procurementMethod",label:"Procurement Method",type:"select",options:["Open competitive tender","Restricted tender","Direct procurement","PPP","In-house delivery","Not applicable"]},
      ]},
      {id:"funding",label:"Budget & Funding",icon:"💰",fields:[
        {name:"fundingSource",label:"Funding Source",type:"select",options:["Government annual budget","World Bank / IMF grant","UNDP / UN agency funding","Federal-to-state allocation","NGO partnership funding","Bilateral donor","Multiple sources"]},
        {name:"budget",label:"Approved / Estimated Budget",type:"budget"},
        {name:"budgetConstraints",label:"Budget Notes & Procurement Constraints",type:"textarea",small:true,placeholder:"e.g. Must follow BPSR guidelines, 5% reserved for M&E, funds released in tranches..."},
      ]},
      {id:"team",label:"Team & Tasks",icon:"✅",fields:[
        {name:"roles",label:"Government & Field Team Roles",type:"roles"},
        {name:"tasks",label:"Key Program Activities",type:"tasks"},
      ]},
      {id:"risk",label:"Risk & Accountability",icon:"⚠️",fields:[
        {name:"knownRisks",label:"Operational or Political Risks",type:"textarea",small:true,placeholder:"e.g. Political interference, community resistance, budget release delays..."},
        {name:"accountability",label:"Accountability & Anti-Corruption Measures",type:"textarea",small:true,placeholder:"e.g. ICPC oversight, public procurement portal, beneficiary verification system..."},
      ]},
      {id:"comms",label:"Communication Plan",icon:"📢",fields:[
        {name:"channels",label:"Communication Channels",type:"textarea",small:true,placeholder:"e.g. Press briefing, NTA/AIT, community town halls, LGA notice boards, radio jingles..."},
        {name:"reportingNeeds",label:"Reporting Requirements",type:"select",options:["Monthly ministerial briefing","Quarterly National Assembly report","World Bank/donor progress report","Real-time field data capture","Multiple reports"]},
      ]},
    ],
  },
  {
    id:"startup",icon:"🚀",name:"Startup / Tech",color:"#0097A7",
    description:"Tech startups, product teams, innovation hubs",
    tagline:"Move fast. Build right. Scale smart.",
    projects:["MVP / Product Launch","Hackathon","Demo Day","Fundraising Round Prep","User Research Sprint","Beta Testing Program","Community / User Event","Partnership Campaign","Team Offsite / Retreat","Other"],
    roles:["Founder / CEO","CTO / Tech Lead","Product Manager","UX / UI Designer","Frontend Developer","Backend Developer","Growth / Marketing Lead","Community Manager","Data Analyst","Operations Lead","Customer Success","Investor Relations","Interns","Others"],
    tasks:{
      default:["Project scoping and sprint planning","Team alignment","Tool and environment setup","Budget planning","Stakeholder briefing","Communications plan","Documentation","Post-sprint retrospective"],
      "MVP / Product Launch":["Feature scoping","UI/UX prototyping","Development sprints","QA testing","Beta user onboarding","Launch communications","App deployment","Post-launch feedback","Iteration planning"],
      "Demo Day":["Pitch coaching sessions","Presenter selection","Slide deck review","Venue setup","Investor invitations","AV and livestream setup","Programme design","Post-event networking","Follow-up outreach"],
      "Fundraising Round Prep":["Financial model update","Pitch deck creation","Investor list mapping","Data room preparation","Legal and cap table review","Warm introduction outreach","Investor meeting scheduling","Due diligence preparation","Term sheet review"],
      "Beta Testing Program":["Beta user recruitment","Beta onboarding flow","In-app feedback setup","Bug reporting system","Weekly beta check-ins","Feedback synthesis","Bug fix sprints","Beta graduation and launch prep"],
    },
    formSections:[
      {id:"project",label:"Project Details",icon:"🚀",fields:[
        {name:"projectName",label:"Project / Initiative Name",type:"input",required:true,placeholder:"e.g. Sphragis AI MVP Launch - April 2025"},
        {name:"description",label:"Project Description & Goals",type:"textarea",required:true,placeholder:"Describe the project, the problem being solved, the user you're building for, and what success looks like..."},
        {name:"audience",label:"Target Users / Customers",type:"input",placeholder:"e.g. SME owners in Nigeria, B2B SaaS buyers, African university students"},
        {name:"location",label:"Country / Primary Market",type:"country"},
        {name:"timeline",label:"Sprint / Project Timeline",type:"input",placeholder:"e.g. 6-week sprint, starting March 10 2025"},
        {name:"stage",label:"Startup Stage",type:"select",options:["Idea / Pre-seed","MVP / Building","Seed stage","Series A","Growth stage","Not a startup - team/project only"]},
      ]},
      {id:"product",label:"Product & Tech Context",icon:"💻",fields:[
        {name:"productStack",label:"Tech Stack / Platform",type:"textarea",small:true,placeholder:"e.g. React Native frontend, Node.js backend, AWS hosting, PostgreSQL..."},
        {name:"metrics",label:"Key Success Metrics (OKRs / KPIs)",type:"textarea",small:true,placeholder:"e.g. 500 beta signups, 80 NPS, $10K MRR by month 3..."},
        {name:"integrations",label:"Key Integrations or Dependencies",type:"textarea",small:true,placeholder:"e.g. Paystack for payments, Twilio for SMS, Google Auth..."},
      ]},
      {id:"funding",label:"Budget & Runway",icon:"💰",fields:[
        {name:"fundingSource",label:"Funding Source",type:"select",options:["Bootstrapped / founder-funded","Pre-seed round","Seed round","Grant / accelerator funding","Revenue-funded","Investor top-up","Other"]},
        {name:"budget",label:"Project Budget / Runway Allocation",type:"budget"},
      ]},
      {id:"team",label:"Team & Tasks",icon:"✅",fields:[
        {name:"roles",label:"Team Roles",type:"roles"},
        {name:"tasks",label:"Sprint Activities",type:"tasks"},
        {name:"tools",label:"Project Management Tools",type:"textarea",small:true,placeholder:"e.g. Notion for docs, Linear for tasks, Slack for comms, Figma for design..."},
      ]},
      {id:"risk",label:"Risks & Blockers",icon:"⚠️",fields:[
        {name:"knownRisks",label:"Known Risks or Blockers",type:"textarea",small:true,placeholder:"e.g. Technical debt, key engineer on vacation, runway < 6 months..."},
        {name:"riskContext",label:"Market & Competitive Context",type:"textarea",small:true,placeholder:"e.g. 2 well-funded competitors launching Q2, market still being educated..."},
      ]},
      {id:"comms",label:"Communication Plan",icon:"📢",fields:[
        {name:"channels",label:"Team & External Channels",type:"textarea",small:true,placeholder:"e.g. Slack for team, Twitter/X for launch, LinkedIn for investors, Product Hunt for launch day..."},
        {name:"reportingNeeds",label:"Reporting Requirements",type:"select",options:["Weekly standup updates","Investor monthly update","Board reporting","No formal reporting","Public launch announcement only"]},
      ]},
    ],
  },
  {
    id:"events",icon:"🎪",name:"Events & Entertainment",color:"#C62828",
    description:"Concerts, festivals, fashion, sports, cultural events",
    tagline:"Create experiences. Deliver memories.",
    projects:["Concert / Live Show","Cultural Festival","Sports Tournament","Award Ceremony","Exhibition / Expo","Community Fair","Corporate Gala","Comedy Show","Fashion Pop-Up Shop","Fashion Show / Runway","Fashion Week Activation","Designer Showcase & Exhibition","Fashion Market / Bazaar","Brand Collaboration Event","Other"],
    roles:["Event Director","Production Manager","Stage Manager","Artist / Talent Liaison","Logistics Coordinator","Marketing & PR Lead","Ticketing Manager","Sponsorship Manager","Security Coordinator","Volunteer Coordinator","Technical Director (AV / Lighting)","Catering Manager","Finance Officer","Fashion Show Producer","Creative Director","Runway / Show Director","Wardrobe & Styling Manager","Model Coordinator","Makeup & Hair Lead","Set & Decor Designer","Brand Partnerships Manager","Photographer / Videographer","Content Creator / BTS Lead","Vendor & Exhibitor Coordinator","Retail & Sales Manager","Others"],
    tasks:{
      default:["Event concept and brief","Venue sourcing and booking","Budget planning","Vendor and supplier sourcing","Talent/artist booking","Marketing and ticket sales","Logistics and transport planning","On-site coordination plan","Post-event report and reconciliation"],
      "Concert / Live Show":["Artist booking and contracts","Stage and production design","Sound and lighting setup","Ticketing platform setup","Marketing campaign","Crowd management plan","Security deployment","Backstage coordination","Post-show accounting"],
      "Award Ceremony":["Category and criteria design","Nominations and voting system","Venue and decor setup","Guest and nominee invitations","Programme and rundown design","MC and entertainment booking","Gifts and trophies procurement","AV setup","Media and PR coverage","Post-event publication"],
      "Sports Tournament":["Tournament format and rules design","Team/participant registration","Venue and pitch/court booking","Referee and officials sourcing","Equipment procurement","Sponsorship outreach","Marketing and promotion","Match scheduling","Medic/first aid deployment","Prize and trophy procurement","Post-tournament report"],
      "Cultural Festival":["Festival theme and concept","Performer/exhibitor curation","Venue layout and zoning plan","Ticketing and accreditation","Food and vendor management","Security and crowd flow plan","Marketing campaign","Sponsorship deals","Post-festival impact report"],
      "Fashion Pop-Up Shop":["Concept and theme development","Brand/designer curation and outreach","Venue scouting and booking","Pop-up layout and spatial design","Vendor agreements and contracts","Visual merchandising plan","Inventory and stock logistics","RSVP system","Photographer and content creator booking","Influencer and press invitations","Social media teaser campaign","On-site styling and brand activation","Payment and POS setup","Post-pop-up sales report"],
      "Fashion Show / Runway":["Show concept and theme development","Designer and collection curation","Venue selection and runway setup","Lighting and AV design","Model casting and fitting schedule","Wardrobe and styling coordination","Makeup and hair team booking","Music selection and sound design","Front-of-house and seating plan","Press and media accreditation","Rehearsal and run-of-show planning","Guest and VIP invitation management","Live streaming setup","Post-show media distribution"],
      "Fashion Week Activation":["Brand brief and activation concept","Venue or pop-up space sourcing","Installation and set design","Designer and label partnerships","Model and talent booking","Influencer and KOL outreach","Press kit and lookbook production","Social media live coverage strategy","RSVP and guest management","Post-activation campaign report"],
      "Designer Showcase & Exhibition":["Exhibition concept and narrative","Designer selection and curation","Gallery or venue booking","Display and installation design","Lookbook and catalogue production","Opening night planning","Press and media invitations","Buyer and trade guest outreach","Photography and documentation","Post-exhibition coverage and report"],
      "Fashion Market / Bazaar":["Market concept and theme","Vendor/designer application and selection","Venue layout and booth planning","Vendor agreements and fee collection","Marketing and ticket management","Visual identity and signage design","Entertainment and activation planning","Food and beverage curation","Social media and influencer strategy","Post-market feedback","Financial reconciliation"],
      "Brand Collaboration Event":["Collaboration concept and co-branding brief","Brand partner agreements","Venue sourcing and setup","Product or collection showcase planning","Guest list and RSVP management","Influencer and press outreach","Photography and content production","Social media rollout strategy","Post-event coverage and metrics report"],
    },
    formSections:[
      {id:"project",label:"Event Details",icon:"🎪",fields:[
        {name:"projectName",label:"Event Name",type:"input",required:true,placeholder:"e.g. Lagos Sound Festival 2025 / The Edit Pop-Up Lagos"},
        {name:"description",label:"Event Description & Vision",type:"textarea",required:true,placeholder:"Describe the event, its theme, the experience you want to create, and what makes it unique..."},
        {name:"audience",label:"Target Audience",type:"input",placeholder:"e.g. Fashion-forward millennials in Lagos, music lovers aged 18-35"},
        {name:"location",label:"Country / Location",type:"country"},
        {name:"venue",label:"Venue / Event Space",type:"input",placeholder:"e.g. Eko Convention Centre, The Lab Lagos, rooftop Victoria Island"},
        {name:"expectedAttendance",label:"Expected Attendance",type:"input",placeholder:"e.g. 500 guests, 200 per day over 3 days, 50 VIP + 300 general"},
        {name:"timeline",label:"Event Date / Timeline",type:"input",placeholder:"e.g. Saturday June 14 2025, or build-up starts May 1"},
        {name:"eventType",label:"Event Format",type:"select",options:["Ticketed public event","Invite-only / private","Free community event","Hybrid (physical + livestream)","Multi-day event","Trade / industry only","Mixed: trade + public"]},
      ]},
      {id:"fashion",label:"Fashion & Creative Details",icon:"👗",fields:[
        {name:"fashionConcept",label:"Creative Concept / Aesthetic Direction",type:"textarea",small:true,placeholder:"e.g. Afrofuturism meets Lagos street culture, minimalist luxury, vibrant marketplace energy..."},
        {name:"designers",label:"Designers / Brands / Labels Involved",type:"textarea",small:true,placeholder:"e.g. 10 emerging Lagos designers confirmed, 3 international brands, 1 headline designer TBC..."},
        {name:"collections",label:"Collections / Products to be Featured",type:"textarea",small:true,placeholder:"e.g. SS25 ready-to-wear collections, accessories and jewellery, limited edition capsule..."},
        {name:"contentStrategy",label:"Content & Photography Strategy",type:"textarea",small:true,placeholder:"e.g. BTS content creator on-site, editorial shoot day before, live Instagram coverage..."},
        {name:"dresscode",label:"Dress Code / Guest Experience Theme",type:"input",placeholder:"e.g. All-white, Afrocentric, cocktail, smart casual"},
        {name:"permits",label:"Permits & Regulatory Requirements",type:"select",options:["No permits needed","State government event permit","LASAA permit","Fire safety inspection","Security/police clearance","Multiple permits needed","Not yet determined"]},
      ]},
      {id:"production",label:"Production & Logistics",icon:"🎬",fields:[
        {name:"production",label:"Production & Set Requirements",type:"textarea",small:true,placeholder:"e.g. Runway 15m x 2m with LED panels, 5 fitting rooms, 3 vendor booths, DJ setup..."},
        {name:"styling",label:"Styling, Makeup & Hair Requirements",type:"textarea",small:true,placeholder:"e.g. 2 lead stylists, 4 makeup artists, 3 hair stylists, 10 models..."},
        {name:"vendors",label:"Vendors / Exhibitors / Stalls",type:"textarea",small:true,placeholder:"e.g. 20 fashion vendor stalls, 5 accessory brands, 3 beauty brands, 2 food vendors..."},
      ]},
      {id:"funding",label:"Budget & Revenue",icon:"💰",fields:[
        {name:"fundingSource",label:"Revenue / Funding Model",type:"select",options:["Ticket sales primary","Vendor stall fees primary","Brand sponsorship primary","Ticket + sponsorship mix","Brand-funded / internal","Vendor fees + sponsorship","Multiple revenue streams"]},
        {name:"budget",label:"Event Budget",type:"budget"},
        {name:"revenueTarget",label:"Revenue Target",type:"input",placeholder:"e.g. ₦3,000,000 from vendor fees, ₦2,000,000 from tickets"},
        {name:"vendorFees",label:"Vendor / Exhibitor Fee Structure",type:"input",placeholder:"e.g. ₦150,000 per booth, ₦80,000 for shared table"},
        {name:"budgetConstraints",label:"Budget Notes",type:"textarea",small:true,placeholder:"e.g. Production capped at ₦2M, all payments to vendors 2 weeks before event..."},
      ]},
      {id:"team",label:"Team & Tasks",icon:"✅",fields:[
        {name:"roles",label:"Event & Creative Team Roles",type:"roles"},
        {name:"tasks",label:"Key Event Activities",type:"tasks"},
      ]},
      {id:"risk",label:"Risk & Contingency",icon:"⚠️",fields:[
        {name:"knownRisks",label:"Known Risks",type:"textarea",small:true,placeholder:"e.g. Designer pulling out last minute, low ticket sales, venue cancellation, bad weather..."},
        {name:"riskContext",label:"Venue & Environmental Context",type:"textarea",small:true,placeholder:"e.g. Outdoor venue weather-dependent, noise curfew at 10pm, limited parking..."},
        {name:"contingency",label:"Contingency Plans",type:"textarea",small:true,placeholder:"e.g. Backup designer list ready, refund policy drafted, indoor backup venue identified..."},
      ]},
      {id:"comms",label:"Communication & Marketing Plan",icon:"📢",fields:[
        {name:"channels",label:"Marketing & Communication Channels",type:"textarea",small:true,placeholder:"e.g. Instagram/TikTok countdown, fashion blogger outreach, WhatsApp broadcast, press release..."},
        {name:"influencers",label:"Influencer & Press Strategy",type:"textarea",small:true,placeholder:"e.g. 5 micro-influencers (50K-200K), 2 fashion editors invited, Style Vitae and Bella Naija targeted..."},
        {name:"reportingNeeds",label:"Post-Event Reporting",type:"select",options:["No formal report needed","Sponsor ROI report","Sales and revenue report","Media coverage report","Full post-event report"]},
      ]},
    ],
  },
  {
    id:"creative",icon:"🎨",name:"Creative & Media",color:"#BE185D",
    description:"Agencies, content creators, film, music, publishing",
    tagline:"Make it meaningful. Ship it brilliantly.",
    projects:["Content Campaign","Film / Video Production","Music Release","Podcast Launch","Photo Shoot / Editorial","Brand Identity Project","Publishing / Book Launch","Creative Agency Pitch","Influencer Campaign","Digital Media Strategy","Other"],
    roles:["Creative Director","Executive Producer","Project Manager","Art Director","Content Strategist","Copywriter","Graphic Designer","Videographer / DP","Photographer","Editor (Video/Audio)","Social Media Manager","PR & Comms Lead","Client Services Lead","Music Producer","Talent / Talent Manager","Others"],
    tasks:{
      default:["Project brief and creative kick-off","Mood board and concept development","Client or stakeholder alignment","Budget sign-off","Team role assignment","Timeline and production schedule","Asset creation and review","Client feedback and revisions","Final delivery and handover","Post-project review"],
      "Film / Video Production":["Script development and sign-off","Location scouting and permits","Casting and talent agreements","Shot list and storyboard","Equipment hire and setup","Production days (filming)","Raw footage review","Editing and colour grading","Music licensing and sound design","Final cut review and approval","Distribution and delivery"],
      "Content Campaign":["Campaign brief and strategy","Content pillars and messaging","Content calendar design","Asset creation (copy, graphics, video)","Scheduling and publishing plan","Influencer integration","Community management plan","Weekly performance review","End-of-campaign report"],
      "Music Release":["Recording and mixing sessions","Mastering","Artwork and visual identity design","Distribution platform upload","Pre-release campaign","Music video production","Press and playlist pitching","Release day coordination","Post-release promotion plan"],
      "Brand Identity Project":["Discovery and brand audit","Competitor and market research","Brand strategy workshop","Logo and visual identity design","Brand guidelines development","Touchpoint design","Client presentation and feedback","Final brand handover","Brand launch plan"],
    },
    formSections:[
      {id:"project",label:"Project Details",icon:"🎨",fields:[
        {name:"projectName",label:"Project / Campaign Name",type:"input",required:true,placeholder:"e.g. Sphragis Brand Film - Q2 2025"},
        {name:"description",label:"Project Description & Creative Vision",type:"textarea",required:true,placeholder:"Describe the project, the creative vision, what you're making, who it's for, and what impact you want it to have..."},
        {name:"audience",label:"Target Audience",type:"input",placeholder:"e.g. Young professionals aged 25-40 in Lagos, global African diaspora"},
        {name:"location",label:"Country / Primary Market",type:"country"},
        {name:"timeline",label:"Production / Project Timeline",type:"input",placeholder:"e.g. 6-week production, delivering April 30 2025"},
        {name:"deliverables",label:"Key Deliverables",type:"textarea",small:true,placeholder:"e.g. 1 x 3-min brand film, 5 x social media cut-downs, 10 x photography stills..."},
      ]},
      {id:"creative",label:"Creative & Production Details",icon:"🎬",fields:[
        {name:"concept",label:"Creative Concept / Treatment",type:"textarea",small:true,placeholder:"e.g. Documentary-style brand film following 3 entrepreneurs in Lagos over one week. Warm, authentic, cinematic tone..."},
        {name:"references",label:"Reference / Inspiration",type:"textarea",small:true,placeholder:"e.g. Apple's Shot on iPhone series, Afrocentric editorial photography, Chicken Republic's recent TV ad..."},
        {name:"tone",label:"Tone & Style Direction",type:"select",options:["Bold and energetic","Warm and authentic","Clean and minimal","Luxury and refined","Playful and fun","Dramatic and cinematic","Educational and informative","Inspirational and aspirational"]},
        {name:"platforms",label:"Distribution Platforms / Channels",type:"textarea",small:true,placeholder:"e.g. YouTube (primary), Instagram Reels, TikTok, cinema pre-roll, client website..."},
      ]},
      {id:"client",label:"Client & Commercial Context",icon:"📊",fields:[
        {name:"clientName",label:"Client / Brand Name",type:"input",placeholder:"e.g. SPHRAGIS, Access Bank - or own project"},
        {name:"budget",label:"Project / Production Budget",type:"budget"},
        {name:"fundingSource",label:"Budget Source",type:"select",options:["Client-commissioned","Agency internal investment","Brand partnership","Grant-funded","Self-funded creative project","Multiple sources"]},
        {name:"approvals",label:"Client Approval Process",type:"select",options:["Single client sign-off","Multiple stakeholder sign-offs","Legal review required","No approvals - internal project","Board or executive sign-off"]},
      ]},
      {id:"team",label:"Team & Tasks",icon:"✅",fields:[
        {name:"roles",label:"Creative & Production Team Roles",type:"roles"},
        {name:"tasks",label:"Key Production Activities",type:"tasks"},
        {name:"vendors",label:"External Vendors / Freelancers",type:"textarea",small:true,placeholder:"e.g. Freelance DOP, post-production house in Lagos, music composer, voiceover artist..."},
      ]},
      {id:"risk",label:"Risks & Challenges",icon:"⚠️",fields:[
        {name:"knownRisks",label:"Known Risks or Blockers",type:"textarea",small:true,placeholder:"e.g. Location permit delays, talent unavailability, client brief changes, weather for outdoor shoot..."},
        {name:"riskContext",label:"Project Context",type:"textarea",small:true,placeholder:"e.g. Client has changed brief twice already, shoot location is in a busy public area, tight deadline..."},
      ]},
      {id:"comms",label:"Communication Plan",icon:"📢",fields:[
        {name:"channels",label:"Client & Team Communication Channels",type:"textarea",small:true,placeholder:"e.g. Weekly client call, WhatsApp for team, Frame.io for video review, email for formal sign-offs..."},
        {name:"reportingNeeds",label:"Reporting & Review Structure",type:"select",options:["Weekly client status report","Milestone-based check-ins only","Daily team standups","End-of-project debrief only","Formal presentations at each phase"]},
      ]},
    ],
  },
  {
    id:"faith",icon:"⛪",name:"Faith & Religious Organisations",color:"#92400E",
    description:"Churches, mosques, faith-based NGOs, religious programs",
    tagline:"Organise the mission. Serve the congregation.",
    projects:["Church / Mosque Program","Annual Convention / Conference","Crusade / Revival","Community Outreach (Faith-based)","Youth Program","Leadership Summit","Fundraising / Tithe Campaign","Mission Trip","Faith-based Education Program","Other"],
    roles:["Senior Pastor / Imam / Leader","Program Director","Project Coordinator","Church Administrator","Communications Officer","Choir / Worship Coordinator","Ushering Coordinator","Prayer Team Lead","Media & AV Director","Children's Ministry Coordinator","Youth Coordinator","Finance Officer / Treasurer","Logistics Coordinator","Volunteers / Ushers","Others"],
    tasks:{
      default:["Planning and prayer meeting","Leadership briefing","Venue preparation and setup","Budget preparation","Team role assignment","Publicity and announcement","Registration or guest invitation","Programme and order of service design","Logistics and refreshment planning","Media and AV setup","Post-program review"],
      "Annual Convention / Conference":["Theme and vision development","Speaker and minister invitation","Venue booking and setup","Accommodation for ministers/guests","Registration and delegate management","Programme booklet design","Worship and choir coordination","AV and live streaming setup","Ushering and crowd management","Refreshment and hospitality","Post-conference follow-up"],
      "Crusade / Revival":["Evangelism strategy and territory mapping","Ground team and counsellor recruitment","Venue permits and community leader engagement","Stage and sound setup","Counselling and follow-up team training","Publicity (radio, flyers, social media)","Prayer and intercession team coordination","Logistics and medical standby","New convert follow-up plan"],
      "Community Outreach (Faith-based)":["Community needs assessment","Leadership approval and vision alignment","Volunteer recruitment from congregation","Resource and material procurement","Outreach site setup","Beneficiary registration","Programme execution (food, health, prayer)","Documentation and testimonies","Post-outreach follow-up and discipleship"],
      "Youth Program":["Youth theme and curriculum design","Youth leader recruitment and training","Participant registration","Venue and accommodation setup","Programme schedule design","Mentorship pairing","Workshop and session facilitation","Talent and creativity showcase","Post-program discipleship plan"],
    },
    formSections:[
      {id:"project",label:"Program Details",icon:"⛪",fields:[
        {name:"projectName",label:"Program / Event Name",type:"input",required:true,placeholder:"e.g. Dominion Church Annual Convention 2025 / Ramadan Community Outreach"},
        {name:"description",label:"Program Description & Vision",type:"textarea",required:true,placeholder:"Describe the program, its spiritual vision and goals, who it serves, and what you believe God will do through it..."},
        {name:"audience",label:"Target Congregation / Participants",type:"input",placeholder:"e.g. All church members, youth aged 13-25, community residents, visiting ministers"},
        {name:"location",label:"Country / Location",type:"country"},
        {name:"venue",label:"Venue / Worship Space",type:"input",placeholder:"e.g. Church auditorium, convention centre, community open ground, school hall"},
        {name:"expectedAttendance",label:"Expected Attendance",type:"input",placeholder:"e.g. 2,000 members, 500 youth, 10,000 for crusade ground"},
        {name:"timeline",label:"Program Date / Timeline",type:"input",placeholder:"e.g. 3-day convention: April 11-13 2025, or 4-week youth program starting May"},
      ]},
      {id:"spiritual",label:"Spiritual & Program Details",icon:"🙏",fields:[
        {name:"theme",label:"Program Theme / Scripture",type:"input",placeholder:'e.g. "Rising in Dominion" - Joshua 1:9, or "The Year of Overflow"'},
        {name:"speakers",label:"Speakers / Ministers / Special Guests",type:"textarea",small:true,placeholder:"e.g. Senior Pastor preaching all 3 days, Bishop Adeyemi as guest minister, 2 worship leaders..."},
        {name:"programOrder",label:"Order of Service / Program Outline",type:"textarea",small:true,placeholder:"e.g. Day 1: Worship Night, Day 2: Teaching Session + Altar Call, Day 3: Commissioning Service..."},
        {name:"worship",label:"Worship & Music Details",type:"textarea",small:true,placeholder:"e.g. 50-member choir, 8-piece live band, special musical guest, 45-minute worship set before preaching..."},
      ]},
      {id:"funding",label:"Budget & Giving",icon:"💰",fields:[
        {name:"fundingSource",label:"Funding Source",type:"select",options:["Church general offering","Special convention offering","Tithe and first-fruit contributions","Corporate and member sponsorship","External donors / partner churches","Multiple sources","Trust/endowment fund"]},
        {name:"budget",label:"Estimated Program Budget",type:"budget"},
        {name:"budgetConstraints",label:"Budget Notes",type:"textarea",small:true,placeholder:"e.g. Hospitality for ministers budgeted at ₦500,000, media production capped at ₦300,000..."},
      ]},
      {id:"team",label:"Team & Tasks",icon:"✅",fields:[
        {name:"roles",label:"Ministry & Coordination Team Roles",type:"roles"},
        {name:"tasks",label:"Key Program Activities",type:"tasks"},
        {name:"volunteerNeeds",label:"Volunteer Needs",type:"textarea",small:true,placeholder:"e.g. 30 ushers, 10 counsellors, 15 traffic and parking team, 5 media volunteers..."},
      ]},
      {id:"risk",label:"Risk & Logistics",icon:"⚠️",fields:[
        {name:"knownRisks",label:"Known Risks or Challenges",type:"textarea",small:true,placeholder:"e.g. Large crowd management, generator failure, rain for outdoor crusade, sound system issues..."},
        {name:"safetyPlan",label:"Safety & Emergency Plan",type:"textarea",small:true,placeholder:"e.g. Medical team on standby, fire exits marked, crowd marshals deployed, nearest hospital 5 mins away..."},
      ]},
      {id:"comms",label:"Communication Plan",icon:"📢",fields:[
        {name:"channels",label:"Communication Channels",type:"textarea",small:true,placeholder:"e.g. Church WhatsApp groups, Sunday announcement, flyers and posters, Instagram/Facebook, radio station..."},
        {name:"mediaNeeds",label:"Media & Documentation Needs",type:"textarea",small:true,placeholder:"e.g. Live streaming on YouTube, photography for church magazine, video testimonials to share after..."},
        {name:"reportingNeeds",label:"Post-Program Reporting",type:"select",options:["No formal report needed","Pastor's debrief only","Finance reconciliation report","Full post-program report to leadership","Multiple reports"]},
      ]},
    ],
  },
];

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://fwkyipqtbncxossqrgeb.supabase.co";
const SUPABASE_KEY = "sb_publishable_qtV-YXr1d70nH5TUE1K5Ag_HcYke88D";


async function authFetch(path, body, method = "POST") {
  const res = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method,
    headers: {
      "apikey": SUPABASE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || data.message || "Auth error");
  return data;
}

function getSession() {
  try { return JSON.parse(localStorage.getItem("sflow_session") || "null"); } catch { return null; }
}
function setSession(s) {
  if (s) localStorage.setItem("sflow_session", JSON.stringify(s));
  else localStorage.removeItem("sflow_session");
}

// ─── AUTH COLORS ──────────────────────────────────────────────────────────────
const AC = {
  bg: "#F7FDF9", white: "#FFFFFF", green: "#1A7A3C", greenDark: "#145F2E",
  text: "#0D2B1A", muted: "#4A7A5A", dim: "#8AB89A", border: "#C8E6D0",
  card: "#F0FAF2", danger: "#DC2626", dangerLight: "#FEE2E2",
  success: "#059669", successLight: "#D1FAE5",
};

// ─── AUTH SCREEN ─────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login"); // login | signup | reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputStyle = {
    width: "100%", background: AC.bg, border: `1.5px solid ${AC.border}`,
    borderRadius: 8, color: AC.text, padding: "12px 16px", fontSize: 15,
    fontFamily: "Georgia, serif", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.18s",
  };
  const focus = e => { e.target.style.borderColor = AC.green; e.target.style.boxShadow = `0 0 0 3px ${AC.green}22`; };
  const blur = e => { e.target.style.borderColor = AC.border; e.target.style.boxShadow = "none"; };

  const handleSubmit = async () => {
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (mode === "login") {
        const data = await authFetch("/token?grant_type=password", { email, password });
        setSession(data);
        onAuth(data);
      } else if (mode === "signup") {
        if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
        const data = await authFetch("/signup", { email, password, data: { full_name: name } });
        if (data.access_token) {
          setSession(data);
          onAuth(data);
        } else {
          setSuccess("Account created! Check your email to confirm, then log in.");
          setMode("login");
        }
      } else if (mode === "reset") {
        await authFetch("/recover", { email });
        setSuccess("Password reset email sent! Check your inbox.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = e => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${AC.greenDark} 0%, ${AC.green} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "Georgia, serif" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", background: AC.white, borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 420, boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 5, color: AC.green, fontFamily: "Georgia, serif", textTransform: "uppercase", lineHeight: 1 }}>SPHRAGIS</div>
          <div style={{ fontSize: 11, color: AC.muted, fontFamily: "monospace", letterSpacing: 2, marginTop: 4, textTransform: "uppercase" }}>The Good Operations</div>
          <div style={{ width: 40, height: 3, background: AC.green, borderRadius: 2, margin: "12px auto 0" }} />
        </div>

        {/* Mode tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 28, background: AC.card, borderRadius: 8, padding: 4 }}>
          {[["login", "Log In"], ["signup", "Sign Up"]].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); setError(""); setSuccess(""); }} style={{ flex: 1, padding: "9px", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", borderRadius: 6, border: "none", fontWeight: 700, background: mode === m ? AC.green : "transparent", color: mode === m ? "#fff" : AC.muted, transition: "all 0.18s" }}>
              {label}
            </button>
          ))}
        </div>

        {mode === "reset" && (
          <div style={{ fontSize: 13, color: AC.muted, marginBottom: 20, lineHeight: 1.6, fontFamily: "monospace" }}>
            Enter your email and we'll send you a link to reset your password.
          </div>
        )}

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "signup" && (
            <div>
              <label style={{ display: "block", fontSize: 11, color: AC.muted, marginBottom: 6, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase" }}>Full Name</label>
              <input style={inputStyle} placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} onFocus={focus} onBlur={blur} onKeyDown={handleKey} />
            </div>
          )}
          <div>
            <label style={{ display: "block", fontSize: 11, color: AC.muted, marginBottom: 6, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase" }}>Email Address</label>
            <input style={inputStyle} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onFocus={focus} onBlur={blur} onKeyDown={handleKey} />
          </div>
          {mode !== "reset" && (
            <div>
              <label style={{ display: "block", fontSize: 11, color: AC.muted, marginBottom: 6, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase" }}>Password</label>
              <input style={inputStyle} type="password" placeholder={mode === "signup" ? "Min. 6 characters" : "Your password"} value={password} onChange={e => setPassword(e.target.value)} onFocus={focus} onBlur={blur} onKeyDown={handleKey} />
            </div>
          )}
        </div>

        {/* Error / Success */}
        {error && <div style={{ background: AC.dangerLight, border: `1px solid ${AC.danger}`, borderRadius: 8, padding: "10px 14px", color: AC.danger, fontSize: 13, marginTop: 14, fontFamily: "monospace" }}>{error}</div>}
        {success && <div style={{ background: AC.successLight, border: `1px solid ${AC.success}`, borderRadius: 8, padding: "10px 14px", color: AC.success, fontSize: 13, marginTop: 14, fontFamily: "monospace" }}>{success}</div>}

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", marginTop: 22, background: loading ? AC.dim : AC.green, color: "#fff", border: "none", padding: "14px", fontFamily: "monospace", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", borderRadius: 8, fontWeight: 700, transition: "all 0.18s" }}>
          {loading ? "Please wait..." : mode === "login" ? "Log In →" : mode === "signup" ? "Create Account →" : "Send Reset Email →"}
        </button>

        {/* Footer links */}
        <div style={{ textAlign: "center", marginTop: 18 }}>
          {mode !== "reset" && (
            <button onClick={() => { setMode("reset"); setError(""); setSuccess(""); }} style={{ background: "none", border: "none", color: AC.muted, fontSize: 12, fontFamily: "monospace", cursor: "pointer", textDecoration: "underline" }}>
              Forgot password?
            </button>
          )}
          {mode === "reset" && (
            <button onClick={() => { setMode("login"); setError(""); setSuccess(""); }} style={{ background: "none", border: "none", color: AC.muted, fontSize: 12, fontFamily: "monospace", cursor: "pointer", textDecoration: "underline" }}>
              Back to login
            </button>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 11, color: AC.dim, fontFamily: "monospace", letterSpacing: 1 }}>
          S-Flow by SPHRAGIS — The Good Operations
        </div>
      </div>
    </div>
  );
}

// ─── PROGRESS RING ───────────────────────────────────────────────────────────
function ProgressRing({ percent, color, size = 64 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E8F5EC" strokeWidth={7} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color || "#1A7A3C"} strokeWidth={7}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }} />
    </svg>
  );
}

// ─── PROJECT TRACKER ─────────────────────────────────────────────────────────
function ProjectTracker({ project, onBack, onUpdate }) {
  const [tasks, setTasks] = useState(project.tasks || []);
  const [notes, setNotes] = useState(project.notes || []);
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState(project.status || "Planning");

  const completedCount = tasks.filter(t => t.done).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const save = (updatedTasks, updatedNotes, updatedStatus) => {
    const updated = {
      ...project,
      tasks: updatedTasks,
      notes: updatedNotes,
      status: updatedStatus,
      progress: updatedTasks.length > 0 ? Math.round((updatedTasks.filter(t => t.done).length / updatedTasks.length) * 100) : 0,
      updatedAt: new Date().toLocaleString(),
    };
    onUpdate(updated);
  };

  const toggleTask = (idx) => {
    const updated = tasks.map((t, i) => i === idx ? { ...t, done: !t.done } : t);
    setTasks(updated);
    save(updated, notes, status);
  };

  const removeTask = (idx) => {
    const updated = tasks.filter((_, i) => i !== idx);
    setTasks(updated);
    save(updated, notes, status);
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    const updated = [{ text: newNote.trim(), addedAt: new Date().toLocaleString() }, ...notes];
    setNotes(updated);
    setNewNote("");
    save(tasks, updated, status);
  };

  const changeStatus = (s) => {
    setStatus(s);
    save(tasks, notes, s);
  };

  const inputStyle = {
    flex: 1, background: "#F7FDF9", border: "1.5px solid #C8E6D0", borderRadius: 8,
    color: "#0D2B1A", padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif",
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 36px 60px" }}>
      {/* Back + header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #C8E6D0", borderRadius: 8, padding: "8px 16px", fontFamily: "monospace", fontSize: 11, color: "#4A7A5A", cursor: "pointer", letterSpacing: 1 }}>← Back</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontFamily: "monospace", color: "#4A7A5A", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{project.industry} · {project.projectType}</div>
          <h2 style={{ fontSize: "clamp(18px,3vw,28px)", fontWeight: 900, color: "#0D2B1A", fontFamily: "Georgia, serif" }}>{project.projectName}</h2>
        </div>
        <div style={{ textAlign: "center" }}>
          <ProgressRing percent={progress} color={STATUS_COLORS[status]} size={72} />
          <div style={{ fontSize: 11, fontFamily: "monospace", color: "#4A7A5A", marginTop: 4 }}>{progress}% done</div>
        </div>
      </div>

      {/* Status selector */}
      <div style={{ background: "#fff", border: "1px solid #C8E6D0", borderRadius: 10, padding: "18px 20px", marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontFamily: "monospace", color: "#4A7A5A", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Project Status</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Planning", "In Progress", "Completed", "Post-Execution"].map(s => (
            <button key={s} onClick={() => changeStatus(s)} style={{
              padding: "8px 18px", borderRadius: 20, border: `1.5px solid ${STATUS_COLORS[s]}`,
              background: status === s ? STATUS_COLORS[s] : STATUS_BG[s],
              color: status === s ? "#fff" : STATUS_COLORS[s],
              fontFamily: "monospace", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div style={{ background: "#fff", border: "1px solid #C8E6D0", borderRadius: 10, padding: "18px 20px", marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontFamily: "monospace", color: "#4A7A5A", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>
          Task Checklist — {completedCount}/{tasks.length} completed
        </div>
        {tasks.length === 0 && (
          <div style={{ fontSize: 13, color: "#8AB89A", fontFamily: "monospace", marginBottom: 14 }}>
            No tasks found in this plan. Try re-tracking the project from the plan view.
          </div>
        )}
        {tasks.map((task, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #F0FAF2" }}>
            <input type="checkbox" checked={task.done} onChange={() => toggleTask(i)}
              style={{ width: 18, height: 18, accentColor: "#1A7A3C", cursor: "pointer", flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 14, color: task.done ? "#8AB89A" : "#0D2B1A", textDecoration: task.done ? "line-through" : "none", fontFamily: "Georgia, serif" }}>{task.text}</span>
            <button onClick={() => removeTask(i)} style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: 16, padding: "0 4px" }}>×</button>
          </div>
        ))}
        <div style={{ fontSize: 11, color: "#8AB89A", fontFamily: "monospace", marginTop: 10, fontStyle: "italic" }}>
          Tasks are automatically generated from your operations plan.
        </div>
      </div>

      {/* Field Notes */}
      <div style={{ background: "#fff", border: "1px solid #C8E6D0", borderRadius: 10, padding: "18px 20px", marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontFamily: "monospace", color: "#4A7A5A", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Field Notes & Updates</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <textarea style={{ ...inputStyle, minHeight: 72, resize: "vertical" }} placeholder="Log what's happening on the ground — decisions made, changes, wins, blockers..." value={newNote} onChange={e => setNewNote(e.target.value)} />
          <button onClick={addNote} style={{ background: "#1A7A3C", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 8, fontFamily: "monospace", fontSize: 12, cursor: "pointer", fontWeight: 700, alignSelf: "flex-end", whiteSpace: "nowrap" }}>+ Log</button>
        </div>
        {notes.length === 0 && (
          <div style={{ fontSize: 13, color: "#8AB89A", fontFamily: "monospace" }}>No notes yet. Start logging your project activity.</div>
        )}
        {notes.map((note, i) => (
          <div key={i} style={{ background: "#F0FAF2", border: "1px solid #C8E6D0", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 14, color: "#0D2B1A", lineHeight: 1.6, fontFamily: "Georgia, serif", marginBottom: 6 }}>{note.text}</div>
            <div style={{ fontSize: 11, color: "#8AB89A", fontFamily: "monospace" }}>{note.addedAt}</div>
          </div>
        ))}
      </div>

      {/* View original plan */}
      <div style={{ textAlign: "center", padding: "16px 0", borderTop: "1px solid #C8E6D0", color: "#8AB89A", fontFamily: "monospace", fontSize: 11, letterSpacing: 1 }}>
        S-Flow by SPHRAGIS — Project Tracker · Last updated {project.updatedAt}
      </div>
    </div>
  );
}

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
function DashboardPage({ userId, onBack }) {
  const [projects, setProjects] = useState(() => loadProjects(userId));
  const [activeProject, setActiveProject] = useState(null);

  const updateProject = (updated) => {
    const newProjects = projects.map(p => p.id === updated.id ? updated : p);
    setProjects(newProjects);
    saveProjects(newProjects, userId);
    setActiveProject(updated);
  };

  const removeProject = (id) => {
    const newProjects = projects.filter(p => p.id !== id);
    setProjects(newProjects);
    saveProjects(newProjects, userId);
  };

  if (activeProject) {
    return (
      <>
        <div style={{ borderBottom: "2px solid #1A7A3C", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", height: 68, position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 4, color: "#1A7A3C", fontFamily: "Georgia, serif" }}>SPHRAGIS</div>
          <div style={{ fontSize: 11, fontFamily: "monospace", color: "#4A7A5A", letterSpacing: 2, textTransform: "uppercase" }}>Project Tracker</div>
        </div>
        <ProjectTracker project={activeProject} onBack={() => setActiveProject(null)} onUpdate={updateProject} />
      </>
    );
  }

  const statusCounts = { "Planning": 0, "In Progress": 0, "Completed": 0, "Post-Execution": 0 };
  projects.forEach(p => { if (statusCounts[p.status] !== undefined) statusCounts[p.status]++; });

  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "32px 36px 60px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #C8E6D0", borderRadius: 8, padding: "8px 16px", fontFamily: "monospace", fontSize: 11, color: "#4A7A5A", cursor: "pointer", letterSpacing: 1 }}>← Back</button>
        <div>
          <h2 style={{ fontSize: "clamp(20px,3vw,30px)", fontWeight: 900, color: "#0D2B1A", fontFamily: "Georgia, serif" }}>Project Dashboard</h2>
          <div style={{ fontSize: 12, color: "#4A7A5A", fontFamily: "monospace" }}>{projects.length} project{projects.length !== 1 ? "s" : ""} being tracked</div>
        </div>
      </div>

      {/* Summary cards */}
      {projects.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginBottom: 28 }}>
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} style={{ background: STATUS_BG[status], border: `1px solid ${STATUS_COLORS[status]}33`, borderRadius: 10, padding: "14px 16px", borderLeft: `4px solid ${STATUS_COLORS[status]}` }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: STATUS_COLORS[status], fontFamily: "monospace" }}>{count}</div>
              <div style={{ fontSize: 11, color: STATUS_COLORS[status], fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{status}</div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {projects.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 40px", background: "#fff", border: "1px solid #C8E6D0", borderRadius: 12, color: "#4A7A5A", fontFamily: "monospace", fontSize: 13 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>No projects tracked yet</div>
          <div style={{ color: "#8AB89A" }}>Generate a plan and click "Track This Project" to start monitoring it here.</div>
        </div>
      )}

      {/* Project cards */}
      {projects.map(project => (
        <div key={project.id} style={{ background: "#fff", border: "1px solid #C8E6D0", borderRadius: 12, padding: "20px 22px", marginBottom: 14, display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ flexShrink: 0 }}>
            <ProgressRing percent={project.progress || 0} color={STATUS_COLORS[project.status]} size={64} />
            <div style={{ textAlign: "center", fontSize: 11, fontFamily: "monospace", color: "#4A7A5A", marginTop: 2 }}>{project.progress || 0}%</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0D2B1A", marginBottom: 4, fontFamily: "Georgia, serif" }}>{project.projectName}</div>
            <div style={{ fontSize: 12, color: "#4A7A5A", fontFamily: "monospace", marginBottom: 8 }}>{project.industry} · {project.projectType}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: STATUS_COLORS[project.status], background: STATUS_BG[project.status], border: `1px solid ${STATUS_COLORS[project.status]}44`, padding: "3px 10px", borderRadius: 20 }}>{project.status}</span>
              <span style={{ fontSize: 11, color: "#8AB89A", fontFamily: "monospace" }}>{project.tasks?.length || 0} tasks · {project.notes?.length || 0} notes</span>
              <span style={{ fontSize: 11, color: "#8AB89A", fontFamily: "monospace" }}>Updated {project.updatedAt}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
            <button onClick={() => setActiveProject(project)} style={{ background: "#1A7A3C", color: "#fff", border: "none", padding: "9px 18px", borderRadius: 8, fontFamily: "monospace", fontSize: 11, letterSpacing: 1, cursor: "pointer", fontWeight: 700, textTransform: "uppercase" }}>Track →</button>
            <button onClick={() => removeProject(project.id)} style={{ background: "none", color: "#DC2626", border: "1px solid #DC262633", padding: "7px 18px", borderRadius: 8, fontFamily: "monospace", fontSize: 11, cursor: "pointer" }}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}


// ─── HISTORY HELPERS ─────────────────────────────────────────────────────────
const STORAGE_KEY = "sflow_history_v2";
function loadHistory(userId) {
  try {
    const key = userId ? `${STORAGE_KEY}_${userId}` : STORAGE_KEY;
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch { return []; }
}
function saveToHistory(entry, userId) {
  try {
    const key = userId ? `${STORAGE_KEY}_${userId}` : STORAGE_KEY;
    const h = loadHistory(userId);
    h.unshift({ ...entry, id: Date.now(), savedAt: new Date().toLocaleString() });
    localStorage.setItem(key, JSON.stringify(h.slice(0, 20)));
  } catch(e) { console.warn("Could not save to history", e); }
}

// ─── DASHBOARD HELPERS ───────────────────────────────────────────────────────
const DASHBOARD_KEY = "sflow_dashboard_v1";

function loadProjects(userId) {
  try {
    const key = userId ? `${DASHBOARD_KEY}_${userId}` : DASHBOARD_KEY;
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch { return []; }
}

function saveProjects(projects, userId) {
  try {
    const key = userId ? `${DASHBOARD_KEY}_${userId}` : DASHBOARD_KEY;
    localStorage.setItem(key, JSON.stringify(projects));
  } catch(e) { console.warn("Could not save projects", e); }
}

function addProjectToDashboard(entry, userId) {
  try {
    const projects = loadProjects(userId);
    const existing = projects.find(p => p.id === entry.id);
    if (existing) return; // already tracked
    // Auto-extract tasks from the plan's task breakdown section
    const autoTasks = extractTasksFromPlan(entry.plan?.tasks || "");
    projects.unshift({
      ...entry,
      status: "Planning",
      progress: 0,
      tasks: autoTasks,
      notes: [],
      addedAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    });
    saveProjects(projects, userId);
  } catch(e) { console.warn("Could not add project", e); }
}

const STATUS_COLORS = {
  "Planning": "#D97706",
  "In Progress": "#1A7A3C",
  "Completed": "#059669",
  "Post-Execution": "#6A1B9A",
};

const STATUS_BG = {
  "Planning": "#FEF3C7",
  "In Progress": "#E8F5EC",
  "Completed": "#D1FAE5",
  "Post-Execution": "#F3E8FF",
};

// ─── SHARE HELPERS ────────────────────────────────────────────────────────────
function encodePlan(data) {
  try { return btoa(encodeURIComponent(JSON.stringify(data))); } catch { return ""; }
}
function decodePlan(str) {
  try { return JSON.parse(decodeURIComponent(atob(str))); } catch { return null; }
}

// ─── PARSE PLAN ───────────────────────────────────────────────────────────────
function parsePlan(raw) {
  const sections = { objectives:"", timeline:"", tasks:"", risks:"", communication:"" };
  const markers = {
    objectives: /PROJECT OBJECTIVES/i,
    timeline: /TIMELINE & MILESTONES/i,
    tasks: /TASK BREAKDOWN & ROLES/i,
    risks: /RISK ASSESSMENT/i,
    communication: /COMMUNICATION PLAN/i,
  };
  const keys = Object.keys(markers);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const start = raw.search(markers[key]);
    if (start === -1) continue;
    const nexts = keys.slice(i + 1).map(k => raw.search(markers[k])).filter(p => p > start);
    sections[key] = raw.slice(start, nexts.length ? Math.min(...nexts) : raw.length)
      .replace(markers[key], "").replace(/^[\s\-=:]+/, "").trim();
  }
  return sections;
}

// ─── EXTRACT TASKS FROM PLAN TEXT ────────────────────────────────────────────
function extractTasksFromPlan(tasksText) {
  if (!tasksText) return [];
  const lines = tasksText.split("\n");
  const tasks = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue;
    const isNumbered = /^\d+[\.\)]\s+/.test(trimmed);
    const isBulleted = /^[-*•]\s+/.test(trimmed);
    if (isNumbered || isBulleted) {
      const taskText = trimmed.replace(/^\d+[\.\)]\s+|^[-*•]\s+/, "").trim();
      if (taskText.length > 8) {
        tasks.push({ text: taskText, done: false });
      }
    }
  }
  if (tasks.length === 0) {
    return tasksText
      .split("\n")
      .map(s => s.trim())
      .filter(s => s.length > 15)
      .slice(0, 15)
      .map(s => ({ text: s, done: false }));
  }
  return tasks.slice(0, 25);
}
// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  app: { minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"Georgia, 'Times New Roman', serif" },
  header: { borderBottom:`2px solid ${C.green}`, padding:"0 36px", display:"flex", alignItems:"center", justifyContent:"space-between", background:C.white, boxShadow:"0 2px 12px rgba(26,122,60,0.08)", height:68, position:"sticky", top:0, zIndex:100 },
  sectionCard: { background:C.white, border:`1px solid ${C.border}`, borderRadius:10, marginBottom:14, overflow:"hidden" },
  sectionHead: { background:C.card, borderBottom:`1px solid ${C.border}`, padding:"13px 20px", display:"flex", alignItems:"center", gap:10, cursor:"pointer", userSelect:"none" },
  sectionTitle: { fontSize:12, fontWeight:700, color:C.text, flex:1, fontFamily:"monospace", letterSpacing:1, textTransform:"uppercase" },
  sectionBody: { padding:"22px 20px" },
  formGroup: { marginBottom:18 },
  label: { display:"block", fontSize:11, color:C.muted, marginBottom:6, letterSpacing:1, fontFamily:"monospace", textTransform:"uppercase" },
  input: { width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:6, color:C.text, padding:"11px 14px", fontSize:15, fontFamily:"Georgia, serif", outline:"none", boxSizing:"border-box", transition:"border-color 0.18s" },
  textarea: { width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:6, color:C.text, padding:"11px 14px", fontSize:15, fontFamily:"Georgia, serif", outline:"none", boxSizing:"border-box", resize:"vertical", minHeight:88, transition:"border-color 0.18s" },
  textareaSmall: { width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:6, color:C.text, padding:"11px 14px", fontSize:15, fontFamily:"Georgia, serif", outline:"none", boxSizing:"border-box", resize:"vertical", minHeight:68, transition:"border-color 0.18s" },
  select: { width:"100%", background:C.bg, border:`1.5px solid ${C.border}`, borderRadius:6, color:C.text, padding:"11px 14px", fontSize:15, fontFamily:"Georgia, serif", outline:"none", boxSizing:"border-box", cursor:"pointer" },
  grid2: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 },
  btn: { background:C.green, color:"#fff", border:"none", padding:"13px 32px", fontSize:12, fontFamily:"monospace", letterSpacing:2, textTransform:"uppercase", cursor:"pointer", borderRadius:8, fontWeight:700, display:"inline-flex", alignItems:"center", gap:8 },
  btnOutline: { background:"transparent", color:C.green, border:`1.5px solid ${C.green}`, padding:"9px 20px", fontSize:11, fontFamily:"monospace", letterSpacing:2, textTransform:"uppercase", cursor:"pointer", borderRadius:8, fontWeight:700 },
  btnGhost: { background:"transparent", color:C.muted, border:`1px solid ${C.border}`, padding:"8px 16px", fontSize:11, fontFamily:"monospace", letterSpacing:1, textTransform:"uppercase", cursor:"pointer", borderRadius:6 },
  btnSmall: { background:C.green, color:"#fff", border:"none", padding:"0 14px", fontSize:12, fontFamily:"monospace", cursor:"pointer", borderRadius:6, fontWeight:700, height:42, whiteSpace:"nowrap" },
  btnRemove: { background:"transparent", color:C.danger, border:`1px solid ${C.danger}`, padding:"3px 9px", fontSize:12, cursor:"pointer", borderRadius:6 },
  loadingWrap: { textAlign:"center", padding:"100px 40px" },
  spinner: { width:48, height:48, border:`4px solid ${C.border}`, borderTop:`4px solid ${C.green}`, borderRadius:"50%", animation:"spin 0.9s linear infinite", margin:"0 auto 24px" },
  planSection: { marginBottom:28, background:C.white, border:`1px solid ${C.border}`, borderRadius:10, overflow:"hidden" },
  planSectionHead: { background:C.card, borderBottom:`1px solid ${C.border}`, padding:"13px 22px", display:"flex", alignItems:"center", gap:10 },
  planSectionTitle: { fontSize:11, letterSpacing:2, textTransform:"uppercase", fontFamily:"monospace", color:C.green, fontWeight:700 },
  planText: { fontSize:15, lineHeight:1.85, color:C.text, whiteSpace:"pre-wrap", padding:"22px", fontFamily:"Georgia, serif" },
  errorBox: { background:C.dangerLight, border:`1px solid ${C.danger}`, borderRadius:8, padding:"12px 16px", color:C.danger, fontSize:13, marginTop:14, fontFamily:"monospace" },
  roleCard: { background:C.card, border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 14px", marginBottom:8, display:"flex", alignItems:"center", gap:10 },
  tag: { display:"inline-flex", alignItems:"center", gap:5, background:`${C.green}12`, border:`1px solid ${C.green}`, borderRadius:20, padding:"4px 11px", fontSize:12, color:C.green, fontFamily:"monospace", marginRight:7, marginBottom:7 },
  hint: { fontFamily:"monospace", fontSize:12, color:C.dim, marginTop:7 },
  successBox: { background:C.successLight, border:`1px solid ${C.success}`, borderRadius:8, padding:"10px 14px", fontSize:13, color:C.success, fontFamily:"monospace", display:"inline-flex", alignItems:"center", gap:8 },
};

// ─── FIELD RENDERER ───────────────────────────────────────────────────────────
function DynamicField({ field, value, onChange, formData, roles, setRoles, selectedTasks, setSelectedTasks, industry, projectType }) {
  const [pendingRole, setPendingRole] = useState("");
  const [pendingCount, setPendingCount] = useState(1);
  const [pendingCustom, setPendingCustom] = useState("");

  const addRole = () => {
    const name = pendingRole === "Others" ? pendingCustom.trim() : pendingRole;
    if (!name) return;
    setRoles([...roles, { role: name, count: pendingCount }]);
    setPendingRole(""); setPendingCount(1); setPendingCustom("");
  };

  const taskPool = industry ? [
    ...(industry.tasks[projectType] || []),
    ...industry.tasks.default.filter(t => !(industry.tasks[projectType] || []).includes(t)),
  ].filter(t => !selectedTasks.includes(t)) : [];

  const focus = e => { e.target.style.borderColor = C.green; e.target.style.boxShadow = `0 0 0 3px ${C.green}22`; };
  const blur = e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; };

  if (field.type === "input") return (
    <div style={S.formGroup}>
      <label style={S.label}>{field.label}{field.required ? " *" : ""}</label>
      <input style={S.input} name={field.name} value={value || ""} onChange={onChange} onFocus={focus} onBlur={blur} placeholder={field.placeholder || ""} />
    </div>
  );
  if (field.type === "textarea") return (
    <div style={S.formGroup}>
      <label style={S.label}>{field.label}{field.required ? " *" : ""}</label>
      <textarea style={field.small ? S.textareaSmall : S.textarea} name={field.name} value={value || ""} onChange={onChange} onFocus={focus} onBlur={blur} placeholder={field.placeholder || ""} />
    </div>
  );
  if (field.type === "select") return (
    <div style={S.formGroup}>
      <label style={S.label}>{field.label}</label>
      <select style={S.select} name={field.name} value={value || ""} onChange={onChange} onFocus={focus} onBlur={blur}>
        <option value="">Select...</option>
        {(field.options || []).map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
  if (field.type === "country") return (
    <div style={S.formGroup}>
      <label style={S.label}>{field.label || "Country / Location"}</label>
      <select style={S.select} name={field.name} value={value || ""} onChange={onChange} onFocus={focus} onBlur={blur}>
        <option value="">Select country...</option>
        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
  if (field.type === "budget") return (
    <div style={S.formGroup}>
      <label style={S.label}>Estimated Budget</label>
      <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
        <select style={{ ...S.select, width:200, flexShrink:0 }} name="currencySymbol" value={formData.currencySymbol || "₦"} onChange={onChange}>
          {CURRENCIES.map(c => <option key={c.symbol} value={c.symbol}>{c.symbol}  {c.name}</option>)}
        </select>
        <input style={{ ...S.input, flex:1, minWidth:80 }} name="budgetMin" value={formData.budgetMin || ""} onChange={onChange} onFocus={focus} onBlur={blur} placeholder="Min" />
        <span style={{ color:C.dim, fontFamily:"monospace" }}>–</span>
        <input style={{ ...S.input, flex:1, minWidth:80 }} name="budgetMax" value={formData.budgetMax || ""} onChange={onChange} onFocus={focus} onBlur={blur} placeholder="Max" />
      </div>
    </div>
  );
  if (field.type === "roles") return (
    <div style={S.formGroup}>
      <label style={S.label}>Team Roles & Headcount</label>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 68px", gap:10, alignItems:"start" }}>
        <div>
          <select style={S.select} value={pendingRole} onChange={e => { setPendingRole(e.target.value); setPendingCustom(""); }} onFocus={focus} onBlur={blur}>
            <option value="">Select role...</option>
            {(industry?.roles || []).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {pendingRole === "Others" && (
            <input style={{ ...S.input, marginTop:8 }} value={pendingCustom} onChange={e => setPendingCustom(e.target.value)} onFocus={focus} onBlur={blur} placeholder="Type the role name..." />
          )}
        </div>
        <div>
          <label style={{ ...S.label, marginBottom:5 }}>Count</label>
          <input type="number" min="1" max="999" style={{ ...S.input, textAlign:"center", padding:"11px 6px" }} value={pendingCount} onChange={e => setPendingCount(Number(e.target.value))} onFocus={focus} onBlur={blur} />
        </div>
        <div style={{ paddingTop:20 }}>
          <button style={{ ...S.btnSmall, width:"100%" }} onClick={addRole}>+ Add</button>
        </div>
      </div>
      {roles.length > 0 ? (
        <div style={{ marginTop:12 }}>
          {roles.map((r, i) => (
            <div key={i} style={S.roleCard}>
              <div style={{ flex:1, fontFamily:"monospace", fontSize:13, display:"flex", alignItems:"center", gap:8 }}>
                <span>{r.role}</span>
                <span style={{ background:C.green, color:"#fff", borderRadius:20, padding:"1px 9px", fontSize:11, fontWeight:700 }}>×{r.count}</span>
              </div>
              <button style={S.btnRemove} onClick={() => setRoles(roles.filter((_, idx) => idx !== i))}>✕</button>
            </div>
          ))}
        </div>
      ) : <div style={S.hint}>No roles added yet. Add roles to help S-Flow assign tasks accurately.</div>}
    </div>
  );
  if (field.type === "tasks") return (
    <div style={S.formGroup}>
      <label style={S.label}>Key Activities — Suggestions for {projectType}</label>
      <select style={S.select} value="" onChange={e => { if (e.target.value && !selectedTasks.includes(e.target.value)) setSelectedTasks([...selectedTasks, e.target.value]); }} onFocus={focus} onBlur={blur}>
        <option value="">Choose an activity to add...</option>
        {taskPool.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      {selectedTasks.length > 0 ? (
        <div style={{ marginTop:12, display:"flex", flexWrap:"wrap" }}>
          {selectedTasks.map(t => (
            <span key={t} style={S.tag}>{t}
              <span onClick={() => setSelectedTasks(selectedTasks.filter(x => x !== t))} style={{ cursor:"pointer", fontWeight:900, fontSize:14 }}>×</span>
            </span>
          ))}
        </div>
      ) : <div style={S.hint}>No activities selected yet. Pick from the list — select as many as apply.</div>}
    </div>
  );
  return null;
}

// ─── PLAN SECTION ─────────────────────────────────────────────────────────────
function PlanSection({ icon, title, content }) {
  return (
    <div style={S.planSection}>
      <div style={S.planSectionHead}>
        <span style={{ fontSize:16 }}>{icon}</span>
        <span style={S.planSectionTitle}>{title}</span>
      </div>
      <div style={S.planText}>{content}</div>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ onStart, onHistory, onDashboard }) {
  const features = [
    { icon:"🎯", title:"Industry-Specific Plans", desc:"9 industries, dozens of project types. Every plan tailored to your exact sector." },
    { icon:"⚡", title:"Plans in 30 Seconds", desc:"Describe your project. S-Flow structures objectives, timeline, tasks, risks, and comms." },
    { icon:"👥", title:"Role-Based Execution", desc:"Assign tasks to real people on your team with accurate headcount tracking." },
    { icon:"⚠️", title:"Risk Intelligence", desc:"Identify risks before they happen. Get mitigation strategies built into every plan." },
    { icon:"📤", title:"Export & Share", desc:"Download as PDF or text. Share a link. Your plan lives where your team does." },
    { icon:"📂", title:"Save Your History", desc:"Every plan saved automatically. Come back anytime and pick up where you left off." },
  ];
  return (
    <div style={{ minHeight:"100vh", background:C.white }}>
      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg, ${C.greenDark} 0%, ${C.green} 100%)`, padding:"80px 40px 90px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07) 0%, transparent 50%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", maxWidth:680, margin:"0 auto" }}>
          <div style={{ fontSize:11, letterSpacing:4, color:"rgba(255,255,255,0.65)", fontFamily:"monospace", textTransform:"uppercase", marginBottom:20 }}>SPHRAGIS — The Good Operations</div>
          <h1 style={{ fontSize:"clamp(48px,7vw,80px)", fontWeight:900, color:"#fff", lineHeight:1.05, marginBottom:16, fontFamily:"Georgia, serif", letterSpacing:-1 }}>S-Flow</h1>
          <p style={{ fontSize:"clamp(16px,2vw,21px)", color:"rgba(255,255,255,0.82)", lineHeight:1.7, marginBottom:40 }}>
            Operations intelligence for every industry.<br />Turn any project idea into a complete execution plan in seconds.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={onStart} style={{ background:"#fff", color:C.green, border:"none", padding:"15px 38px", fontFamily:"monospace", fontSize:13, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", borderRadius:8, fontWeight:700, boxShadow:"0 8px 28px rgba(0,0,0,0.18)" }}>
              Generate a Plan →
            </button>
            <button onClick={onHistory} style={{ background:"transparent", color:"#fff", border:"2px solid rgba(255,255,255,0.45)", padding:"15px 28px", fontFamily:"monospace", fontSize:12, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", borderRadius:8, fontWeight:700 }}>
              📂 Saved Plans
            </button>
            <button onClick={onDashboard} style={{ background:"transparent", color:"#fff", border:"2px solid rgba(255,255,255,0.45)", padding:"15px 28px", fontFamily:"monospace", fontSize:12, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", borderRadius:8, fontWeight:700 }}>
              📊 Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Industries grid */}
      <div style={{ padding:"60px 40px 20px", maxWidth:960, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ fontSize:11, letterSpacing:3, color:C.muted, fontFamily:"monospace", textTransform:"uppercase", marginBottom:8 }}>Built for every sector</div>
          <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:900, color:C.text, fontFamily:"Georgia, serif" }}>9 Industries. One Platform.</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(170px, 1fr))", gap:12, marginBottom:60 }}>
          {INDUSTRIES.map(ind => (
            <div key={ind.id} onClick={onStart} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"18px 14px", cursor:"pointer", textAlign:"center", transition:"all 0.18s", borderTop:`3px solid ${ind.color}` }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 24px ${ind.color}22`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize:26, marginBottom:8 }}>{ind.icon}</div>
              <div style={{ fontSize:13, fontWeight:700, color:C.text, lineHeight:1.3 }}>{ind.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ background:C.card, padding:"56px 40px", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:11, letterSpacing:3, color:C.muted, fontFamily:"monospace", textTransform:"uppercase", marginBottom:8 }}>What S-Flow does</div>
            <h2 style={{ fontSize:"clamp(20px,3vw,30px)", fontWeight:900, color:C.text, fontFamily:"Georgia, serif" }}>Operations intelligence, not just a template.</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))", gap:18 }}>
            {features.map(f => (
              <div key={f.title} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"20px 18px" }}>
                <div style={{ fontSize:22, marginBottom:10 }}>{f.icon}</div>
                <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:6 }}>{f.title}</div>
                <div style={{ fontSize:14, color:C.muted, lineHeight:1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding:"60px 40px", textAlign:"center", maxWidth:580, margin:"0 auto" }}>
        <h2 style={{ fontSize:"clamp(22px,3vw,36px)", fontWeight:900, color:C.text, marginBottom:14, fontFamily:"Georgia, serif" }}>Ready to execute with clarity?</h2>
        <p style={{ fontSize:16, color:C.muted, marginBottom:30, lineHeight:1.7 }}>Join organisations across every sector using S-Flow to structure their operations and deliver with confidence.</p>
        <button onClick={onStart} style={{ ...S.btn, fontSize:13, padding:"15px 44px" }}>Get Started — It's Free →</button>
      </div>

      <div style={{ textAlign:"center", padding:"24px", borderTop:`1px solid ${C.border}`, fontFamily:"monospace", fontSize:11, color:C.dim, letterSpacing:1 }}>
        S-Flow by SPHRAGIS — The Good Operations
      </div>
    </div>
  );
}

// ─── HISTORY PAGE ─────────────────────────────────────────────────────────────
function HistoryPage({ onBack, onLoadPlan, userId }) {
  const history = loadHistory(userId);
  return (
    <div style={{ maxWidth:780, margin:"0 auto", padding:"40px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:28 }}>
        <button style={S.btnGhost} onClick={onBack}>← Back</button>
        <div>
          <h2 style={{ fontSize:22, fontWeight:900, color:C.text, fontFamily:"Georgia, serif" }}>Saved Plans</h2>
          <div style={{ fontSize:12, color:C.muted, fontFamily:"monospace" }}>{history.length} plan{history.length !== 1 ? "s" : ""} saved on this device</div>
        </div>
      </div>
      {history.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 40px", background:C.white, border:`1px solid ${C.border}`, borderRadius:12, color:C.muted, fontFamily:"monospace", fontSize:13 }}>
          <div style={{ fontSize:40, marginBottom:16 }}>📂</div>
          No saved plans yet. Generate your first plan to see it here.
        </div>
      ) : history.map(h => (
        <div key={h.id} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"18px 20px", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:3 }}>{h.projectName}</div>
            <div style={{ fontSize:12, color:C.muted, fontFamily:"monospace" }}>{h.industry} · {h.projectType}</div>
            <div style={{ fontSize:11, color:C.dim, fontFamily:"monospace", marginTop:3 }}>Saved {h.savedAt}</div>
          </div>
          <button style={S.btnOutline} onClick={() => onLoadPlan(h)}>View Plan →</button>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function SFlow({ session, onLogout }) {
  const [screen, setScreen] = useState("landing");
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [openSections, setOpenSections] = useState({});
  const [formData, setFormData] = useState({});
  const [roles, setRoles] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [plan, setPlan] = useState(null);
  const [rawPlan, setRawPlan] = useState("");
  const [error, setError] = useState("");
  const [shareMsg, setShareMsg] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);
  const [formReadiness, setFormReadiness] = useState(0);
  const autoGenRef = useRef(null);


  const loadingMessages = [
    "Analysing your project context...",
    "Mapping roles to tasks...",
    "Building your timeline...",
    "Assessing risks and mitigations...",
    "Structuring your communication plan...",
    "Finalising your operations plan...",
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("plan");
    if (shared) {
      const decoded = decodePlan(shared);
      if (decoded) {
        setPlan(decoded.plan);
        setRawPlan(decoded.rawPlan || "");
        setSelectedIndustry(INDUSTRIES.find(i => i.id === decoded.industryId) || null);
        setSelectedProject(decoded.projectType || "");
        setFormData(decoded.formData || {});
        setScreen("plan");
      }
    }
  }, []);

  useEffect(() => {
    if (screen !== "loading") return;
    const interval = setInterval(() => setLoadingStep(s => (s + 1) % loadingMessages.length), 2200);
    return () => clearInterval(interval);
  }, [screen]);

  // Calculate form readiness score (0-100)
  useEffect(() => {
    if (screen !== "form") return;
    let score = 0;
    if (formData.projectName) score += 30;
    if (formData.description && formData.description.length > 20) score += 30;
    if (roles.length > 0) score += 20;
    if (selectedTasks.length > 0) score += 10;
    if (formData.location) score += 5;
    if (formData.timeline) score += 5;
    setFormReadiness(score);
  }, [formData, roles, selectedTasks, screen]);


  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const ind = selectedIndustry;

  const pickIndustry = i => {
    setSelectedIndustry(i);
    setScreen("project");
    setRoles([]); setSelectedTasks([]); setFormData({});
    const open = {};
    (i.formSections || []).forEach((_, idx) => { open[idx] = true; });
    setOpenSections(open);
  };

  const pickProject = proj => {
    setSelectedProject(proj);
    setScreen("form");
  };

  const goBack = () => {
    if (screen === "dashboard") setScreen("landing");
    else if (screen === "project") { setScreen("industry"); setSelectedIndustry(null); }
    else if (screen === "form") setScreen("project");
    else if (screen === "plan") setScreen("form");
    else if (screen === "history") setScreen("landing");
    else setScreen("landing");
  };

  const toggleSection = i => setOpenSections(prev => ({ ...prev, [i]: !prev[i] }));

  const budgetText = (formData.budgetMin || formData.budgetMax)
    ? `${formData.currencySymbol || ""}${formData.budgetMin || ""} – ${formData.currencySymbol || ""}${formData.budgetMax || ""}`
    : "Not specified";

  const buildPrompt = () => {
    const fieldLines = (ind?.formSections || []).flatMap(sec =>
      sec.fields
        .filter(f => !["roles", "tasks", "budget"].includes(f.type))
        .map(f => `${f.label}: ${formData[f.name] || "Not provided"}`)
    ).join("\n");
    const rolesText = roles.length ? roles.map(r => `${r.role} (x${r.count})`).join(", ") : "Not specified";
    const tasksText = selectedTasks.length ? selectedTasks.join(", ") : "Not specified";
    return `You are S-Flow, an expert operations strategist. A ${ind?.name} organisation is planning a ${selectedProject}.

INDUSTRY: ${ind?.name}
PROJECT TYPE: ${selectedProject}

USER INPUTS:
${fieldLines}

TEAM (use ONLY these roles for task assignment):
${rolesText}

KEY ACTIVITIES IDENTIFIED:
${tasksText}

BUDGET: ${budgetText}

Write a comprehensive, actionable operations plan. Use EXACTLY these five section headers:

PROJECT OBJECTIVES
Write 4-6 numbered SMART objectives specific to this ${ind?.name} project.

TIMELINE & MILESTONES
Break into phases (Phase 1, Phase 2, etc.) with specific milestones. Reference the timeline the user provided.

TASK BREAKDOWN & ROLES
For each task: task name, what it involves, which role is responsible (from the list above only), and estimated duration. Group by phase. Use numbered lists.

RISK ASSESSMENT
List 4-6 risks. For each: Risk name, description, Likelihood (High/Medium/Low), Impact (High/Medium/Low), Mitigation strategy.

COMMUNICATION PLAN
Specific internal team cadence, stakeholder update schedule, public-facing channels. Reference the channels and tools the user mentioned. Be specific to ${ind?.name} industry norms.

Write as their dedicated ${ind?.name} operations consultant. Be precise, practical, and industry-specific.`;
  };

  const generatePlan = async () => {
    if (!formData.projectName || !formData.description) {
      setError("Please fill in the project name and description to continue.");
      return;
    }
    setError(""); setScreen("loading"); setLoadingStep(0);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: buildPrompt() }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `API error ${res.status}`);
      }
      const data = await res.json();
      const text = data.text || "";
      if (!text) throw new Error("Empty response. Please try again.");
      const parsed = parsePlan(text);
      setRawPlan(text); setPlan(parsed); setScreen("plan");
      saveToHistory({
        projectName: formData.projectName,
        industry: ind?.name,
        industryId: ind?.id,
        projectType: selectedProject,
        plan: parsed,
        rawPlan: text,
        formData,
      }, session?.user?.id);
    } catch (err) {
      console.error("S-Flow API error:", err);
      setError(`Could not generate plan: ${err.message}. If this persists, check your API key is set correctly in your environment.`);
      setScreen("form");
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([rawPlan], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${formData.projectName || "sflow-plan"}.txt`;
    a.click();
  };

  const sharePlan = () => {
    const encoded = encodePlan({ plan, rawPlan, industryId: ind?.id, projectType: selectedProject, formData });
    const url = `${window.location.origin}${window.location.pathname}?plan=${encoded}`;
    navigator.clipboard.writeText(url)
      .then(() => { setShareMsg("Link copied to clipboard!"); setTimeout(() => setShareMsg(""), 3000); })
      .catch(() => { setShareMsg("Could not copy — share the URL from your browser."); setTimeout(() => setShareMsg(""), 4000); });
  };

  // ── HEADER ──────────────────────────────────────────────────────────────────
  const Header = ({ showBack }) => (
    <header style={S.header} className="no-print">
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        <div style={{ position:"relative", paddingBottom:14 }}>
          <div style={{ fontSize:28, fontWeight:900, letterSpacing:5, color:C.green, fontFamily:"Georgia, serif", textTransform:"uppercase", lineHeight:1 }}>SPHRAGIS</div>
          <div style={{ position:"absolute", left:90, top:32, fontSize:11, color:"#333", fontFamily:"Georgia, serif", whiteSpace:"nowrap", fontStyle:"italic" }}>The Good Operations</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:1 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:C.green, opacity:0.5 }} />
          <div style={{ fontSize:11, letterSpacing:3, color:C.muted, fontFamily:"monospace", textTransform:"uppercase", fontWeight:600 }}>S-Flow</div>
          <div style={{ fontSize:10, color:C.dim, fontFamily:"monospace", opacity:0.7 }}>— Operations Intelligence</div>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <button style={S.btnGhost} onClick={() => setScreen("dashboard")}>📊 Dashboard</button>
        <button style={S.btnGhost} onClick={() => setScreen("history")}>📂 Saved Plans</button>
        <button style={S.btnGhost} onClick={() => setScreen("landing")}>Home</button>
        {showBack && <button style={S.btnOutline} onClick={goBack}>← Back</button>}
        <div style={{ display:"flex", alignItems:"center", gap:8, background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:"6px 14px" }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:C.success }} />
          <span style={{ fontSize:11, fontFamily:"monospace", color:C.muted, maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {session?.user?.user_metadata?.full_name || session?.user?.email || "Account"}
          </span>
          <button onClick={onLogout} style={{ background:"none", border:"none", color:C.danger, fontSize:11, fontFamily:"monospace", cursor:"pointer", paddingLeft:6, fontWeight:700 }}>Sign out</button>
        </div>
      </div>
    </header>
  );

  const CSS = `
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    .fadeUp { animation: fadeUp 0.45s ease both; }
    input:focus, textarea:focus, select:focus { outline: none; }
    button { transition: all 0.15s ease; }
    button:hover { opacity: 0.87; transform: translateY(-1px); }
    @media print { .no-print { display: none !important; } }
    @media (max-width: 640px) { .grid2 { grid-template-columns: 1fr !important; } }
  `;

  return (
    <div style={S.app}>
      <style>{CSS}</style>

      {/* LANDING */}
      {screen === "landing" && <LandingPage onStart={() => setScreen("industry")} onHistory={() => setScreen("history")} onDashboard={() => setScreen("dashboard")} />}

      {/* HISTORY */}
      {screen === "dashboard" && (
        <>
          <Header showBack={true} />
          <DashboardPage
            userId={session?.user?.id}
            onBack={() => setScreen("landing")}
          />
        </>
      )}

      {screen === "history" && (
        <>
          <Header showBack={true} />
          <HistoryPage userId={session?.user?.id} onBack={() => setScreen("landing")} onLoadPlan={h => {
            setPlan(h.plan); setRawPlan(h.rawPlan || "");
            setSelectedIndustry(INDUSTRIES.find(i => i.id === h.industryId) || null);
            setSelectedProject(h.projectType || ""); setFormData(h.formData || {});
            setScreen("plan");
          }} />
        </>
      )}

      {/* INDUSTRY SELECTION */}
      {screen === "industry" && (
        <>
          <Header showBack={true} />
          <div style={{ padding:"44px 40px 20px", maxWidth:900, margin:"0 auto", textAlign:"center" }} className="fadeUp">
            <div style={{ fontSize:11, letterSpacing:3, color:C.muted, fontFamily:"monospace", textTransform:"uppercase", marginBottom:10 }}>S-Flow by SPHRAGIS</div>
            <h1 style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:900, color:C.text, marginBottom:10, fontFamily:"Georgia, serif" }}>What industry are you operating in?</h1>
            <p style={{ fontSize:16, color:C.muted, marginBottom:36, lineHeight:1.7 }}>Select your industry and S-Flow will build a tailored operations plan for your exact context.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(190px, 1fr))", gap:14, maxWidth:900, margin:"0 auto", padding:"0 40px 80px" }}>
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.id} className="fadeUp" style={{ animationDelay:`${i * 0.05}s`, background:C.white, border:`1px solid ${C.border}`, borderRadius:10, padding:"20px 16px", cursor:"pointer", transition:"all 0.18s", textAlign:"left", position:"relative", overflow:"hidden" }}
                onClick={() => pickIndustry(ind)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ind.color; e.currentTarget.style.boxShadow = `0 6px 24px ${ind.color}22`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:ind.color }} />
                <span style={{ fontSize:28, marginBottom:10, display:"block" }}>{ind.icon}</span>
                <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:4 }}>{ind.name}</div>
                <div style={{ fontSize:12, color:C.muted, lineHeight:1.5, fontFamily:"monospace", marginBottom:8 }}>{ind.description}</div>
                <div style={{ fontSize:11, color:ind.color, fontFamily:"monospace", fontStyle:"italic" }}>{ind.tagline}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PROJECT TYPE */}
      {screen === "project" && ind && (
        <>
          <Header showBack={true} />
          <div style={{ maxWidth:680, margin:"0 auto", padding:"44px 40px" }} className="fadeUp">
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:C.card, border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 16px", marginBottom:24 }}>
              <span style={{ fontSize:22 }}>{ind.icon}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:15, color:C.text }}>{ind.name}</div>
                <div style={{ fontSize:11, color:ind.color, fontFamily:"monospace", fontStyle:"italic" }}>{ind.tagline}</div>
              </div>
            </div>
            <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:900, color:C.text, marginBottom:8, fontFamily:"Georgia, serif" }}>What kind of project are you planning?</h2>
            <p style={{ color:C.muted, fontSize:15, marginBottom:26, lineHeight:1.6 }}>Select the project type and S-Flow will load the right roles, tasks, and form fields for your industry.</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {ind.projects.map((proj, i) => (
                <div key={proj} className="fadeUp" style={{ animationDelay:`${i * 0.04}s`, background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"14px 16px", cursor:"pointer", transition:"all 0.15s", fontFamily:"monospace", fontSize:13, color:C.text }}
                  onClick={() => pickProject(proj)}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ind.color; e.currentTarget.style.background = `${ind.color}08`; e.currentTarget.style.color = ind.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.white; e.currentTarget.style.color = C.text; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <span style={{ marginRight:8, opacity:0.4 }}>→</span>{proj}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* FORM */}
      {screen === "form" && ind && (
        <>
          <Header showBack={true} />
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 36px 16px" }} className="fadeUp">
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, fontFamily:"monospace", fontSize:12, color:C.muted }}>
              <span>{ind.icon}</span><span>{ind.name}</span>
              <span style={{ color:C.border }}>›</span>
              <span style={{ color:C.green, fontWeight:700 }}>{selectedProject}</span>
            </div>
            <h2 style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:900, color:C.text, marginBottom:6, fontFamily:"Georgia, serif" }}>Tell us about your {selectedProject}</h2>
            <p style={{ color:C.muted, fontSize:14, marginBottom:8, lineHeight:1.6 }}>
              This form is built for <strong style={{ color:C.text }}>{ind.name}</strong>. Fill in as much detail as you can — the more context, the sharper your plan.
            </p>
            {/* Readiness bar */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <div style={{ flex:1, height:5, background:C.border, borderRadius:99, overflow:"hidden" }}>
                <div style={{ width:`${formReadiness}%`, height:"100%", background: formReadiness >= 80 ? C.success : formReadiness >= 50 ? C.green : C.muted, borderRadius:99, transition:"width 0.5s ease" }} />
              </div>
              <span style={{ fontSize:11, fontFamily:"monospace", color: formReadiness >= 50 ? C.green : C.muted, whiteSpace:"nowrap" }}>
                {formReadiness < 50 ? "Fill in more details to generate your plan" : formReadiness < 80 ? "✓ Looking good — add more detail for a sharper plan" : "✓ Ready to generate"}
              </span>
            </div>
          </div>

          <div style={{ maxWidth:780, margin:"0 auto", padding:"0 36px 80px" }}>
            {(ind.formSections || []).map((section, si) => (
              <div key={section.id} style={S.sectionCard}>
                <div style={S.sectionHead} onClick={() => toggleSection(si)}>
                  <span style={{ fontSize:18 }}>{section.icon}</span>
                  <span style={S.sectionTitle}>{section.label}</span>
                  <span style={{ fontFamily:"monospace", fontSize:18, color:C.muted, fontWeight:300 }}>{openSections[si] ? "−" : "+"}</span>
                </div>
                {openSections[si] && (
                  <div style={S.sectionBody}>
                    {section.fields.map((field, fi) => {
                      const wide = ["textarea", "roles", "tasks", "budget"].includes(field.type);
                      const next = section.fields[fi + 1];
                      const nextWide = next && ["textarea", "roles", "tasks", "budget"].includes(next.type);
                      const pairWithNext = !wide && next && !nextWide && ["input","select","country"].includes(field.type) && ["input","select","country"].includes(next.type);
                      // Skip if this field was already rendered as the second in a pair
                      if (fi > 0) {
                        const prev = section.fields[fi - 1];
                        const prevWide = ["textarea","roles","tasks","budget"].includes(prev.type);
                        const prevPairCandidate = !prevWide && ["input","select","country"].includes(prev.type) && !wide;
                        const nextOfPrev = section.fields[fi];
                        if (prevPairCandidate && section.fields[fi-1] && !["textarea","roles","tasks","budget"].includes(section.fields[fi-1].type)) {
                          const pprev = section.fields[fi-1];
                          const pprevNext = section.fields[fi];
                          const pprevNextWide = ["textarea","roles","tasks","budget"].includes(pprevNext.type);
                          if (!pprevNextWide && ["input","select","country"].includes(pprev.type) && ["input","select","country"].includes(pprevNext.type)) {
                            return null;
                          }
                        }
                      }
                      if (pairWithNext) {
                        return (
                          <div key={field.name} style={S.grid2} className="grid2">
                            <DynamicField field={field} value={formData[field.name]} onChange={handleChange} formData={formData} roles={roles} setRoles={setRoles} selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} industry={ind} projectType={selectedProject} />
                            <DynamicField field={next} value={formData[next.name]} onChange={handleChange} formData={formData} roles={roles} setRoles={setRoles} selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} industry={ind} projectType={selectedProject} />
                          </div>
                        );
                      }
                      return (
                        <DynamicField key={field.name} field={field} value={formData[field.name]} onChange={handleChange} formData={formData} roles={roles} setRoles={setRoles} selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} industry={ind} projectType={selectedProject} />
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {error && <div style={S.errorBox}>{error}</div>}
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:22 }}>
              <button style={S.btn} onClick={generatePlan}>Generate Operations Plan →</button>
            </div>
          </div>
        </>
      )}

      {/* LOADING */}
      {screen === "loading" && (
        <>
          <Header showBack={false} />
          <div style={S.loadingWrap}>
            <div style={S.spinner} />
            <div style={{ fontFamily:"monospace", letterSpacing:2, color:C.green, fontSize:13, textTransform:"uppercase", marginBottom:12 }}>
              Building Your Operations Plan
            </div>
            <div style={{ color:C.muted, fontSize:14, fontFamily:"Georgia, serif", minHeight:24 }}>
              {loadingMessages[loadingStep]}
            </div>
            <div style={{ display:"flex", gap:7, justifyContent:"center", marginTop:20 }}>
              {loadingMessages.map((_, i) => (
                <div key={i} style={{ width:7, height:7, borderRadius:"50%", background: i === loadingStep ? C.green : C.border, transition:"background 0.3s" }} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* PLAN */}
      {screen === "plan" && plan && (
        <>
          <Header showBack={true} />
          <div style={{ maxWidth:880, margin:"0 auto", padding:"24px 36px 8px", display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }} className="no-print">
            <button style={S.btn} onClick={() => window.print()}>⬇ Save as PDF</button>
            <button style={S.btnOutline} onClick={downloadTxt}>⬇ Download Text</button>
            <button style={S.btnGhost} onClick={sharePlan}>🔗 Share Plan</button>
            <button style={S.btnGhost} onClick={() => setScreen("industry")}>+ New Plan</button>
            <button style={{ ...S.btnGhost, borderColor:"#1A7A3C", color:"#1A7A3C", fontWeight:700 }} onClick={() => {
              const entry = {
                id: Date.now(),
                projectName: formData.projectName,
                industry: ind?.name,
                industryId: ind?.id,
                projectType: selectedProject,
                plan, rawPlan, formData,
              };
              addProjectToDashboard(entry, session?.user?.id);
              setScreen("dashboard");
            }}>📊 Track This Project</button>
            {shareMsg && <div style={S.successBox}>✓ {shareMsg}</div>}
          </div>

          <div style={{ maxWidth:880, margin:"0 auto", padding:"24px 36px 60px" }}>
            <div style={{ borderBottom:`1px solid ${C.border}`, paddingBottom:24, marginBottom:32 }}>
              <div style={{ fontFamily:"monospace", fontSize:11, letterSpacing:2, color:C.green, textTransform:"uppercase", marginBottom:8 }}>Operations Plan — S-Flow by SPHRAGIS</div>
              <div style={{ fontSize:"clamp(20px,3vw,34px)", fontWeight:900, color:C.text, marginBottom:12, fontFamily:"Georgia, serif" }}>{formData.projectName}</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:11, letterSpacing:1, fontFamily:"monospace", textTransform:"uppercase", color: ind?.color || C.green, border:`1px solid ${ind?.color || C.green}`, padding:"4px 10px", borderRadius:4, background:`${ind?.color || C.green}10` }}>{ind?.icon} {ind?.name}</span>
                <span style={{ fontSize:11, letterSpacing:1, fontFamily:"monospace", color:C.muted, border:`1px solid ${C.border}`, padding:"4px 10px", borderRadius:4 }}>{selectedProject}</span>
                {formData.location && <span style={{ fontSize:11, fontFamily:"monospace", color:C.muted, border:`1px solid ${C.border}`, padding:"4px 10px", borderRadius:4 }}>📍 {formData.location}</span>}
                {formData.timeline && <span style={{ fontSize:11, fontFamily:"monospace", color:C.muted, border:`1px solid ${C.border}`, padding:"4px 10px", borderRadius:4 }}>🗓 {formData.timeline}</span>}
                {(formData.budgetMin || formData.budgetMax) && <span style={{ fontSize:11, fontFamily:"monospace", color:C.muted, border:`1px solid ${C.border}`, padding:"4px 10px", borderRadius:4 }}>💰 {budgetText}</span>}
                {roles.length > 0 && <span style={{ fontSize:11, fontFamily:"monospace", color:C.muted, border:`1px solid ${C.border}`, padding:"4px 10px", borderRadius:4 }}>👥 {roles.reduce((s, r) => s + r.count, 0)} team members</span>}
              </div>
            </div>

            <PlanSection icon="🎯" title="Project Objectives" content={plan.objectives} />
            <PlanSection icon="📅" title="Timeline & Milestones" content={plan.timeline} />
            <PlanSection icon="✅" title="Task Breakdown & Roles" content={plan.tasks} />
            <PlanSection icon="⚠️" title="Risk Assessment" content={plan.risks} />
            <PlanSection icon="📢" title="Communication Plan" content={plan.communication} />

            <div style={{ textAlign:"center", padding:"32px 0", borderTop:`1px solid ${C.border}`, color:C.dim, fontFamily:"monospace", fontSize:11, letterSpacing:1 }}>
              S-Flow by SPHRAGIS — The Good Operations · Generated {new Date().toLocaleDateString()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}



// ─── ROOT WRAPPER ─────────────────────────────────────────────────────────────
export default function Root() {
  const [session, setSession] = useState(() => getSession());
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Verify stored session is still valid
    const s = getSession();
    if (s?.access_token) {
      fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${s.access_token}` }
      }).then(r => {
        if (r.ok) setSession(s);
        else { setSession(null); setSession(null); localStorage.removeItem("sflow_session"); }
      }).catch(() => setSession(s)) // if offline, trust stored session
      .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  const handleAuth = (data) => {
    setSession(data);
  };

  const handleLogout = () => {
    setSession(null);
    setSession(null);
    localStorage.removeItem("sflow_session");
  };

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", background: "#F7FDF9", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 44, height: 44, border: "4px solid #C8E6D0", borderTop: "4px solid #1A7A3C", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!session) return <AuthScreen onAuth={handleAuth} />;
  return <SFlow session={session} onLogout={handleLogout} />;
}
