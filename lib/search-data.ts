export type SearchItem = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
  content?: string;           // ← Real page text for powerful search
};

export const searchData: SearchItem[] = [
  // ==================== SERVICES ====================
  {
    title: "PhD Thesis Writing Services",
    description: "Complete PhD thesis writing support from topic to final submission with guaranteed quality.",
    href: "/services/phd-thesis-writing",
    keywords: ["phd", "thesis", "writing", "dissertation", "research"],
    content: `Our PhD Thesis Writing Services provide complete support for doctoral scholars. From identifying a research-worthy topic to crafting well-structured chapters, we guide you through every step of your thesis journey. Our team of PhD experts ensures your thesis meets international academic standards and your university requirements.
Complete thesis writing from Chapter 1 to Chapter 6, Research methodology design and implementation, Statistical data analysis using SPSS, R, Python, Literature review with proper citations, Plagiarism-free content with Turnitin report, Unlimited revisions until supervisor approval.`,
  },
  {
    title: "Research Paper Writing Services",
    description: "High-quality research paper writing for Scopus, SCI, and high-impact journals with publication support.",
    href: "/services/research-paper-writing",
    keywords: ["research", "paper", "journal", "scopus", "sci", "publication"],
    content: `Our Research Paper Writing Services help researchers publish their work in reputable journals. From conceptualization to publication, we support you in crafting high-quality research papers that meet journal standards and increase your chances of acceptance.
Complete paper writing, Journal selection guidance, Abstract and introduction writing, Methodology documentation, Results presentation, Discussion and conclusion.`,
  },
  {
    title: "PhD Thesis Writing Assistance",
    description: "Targeted help with specific thesis chapters, methodology, data analysis, or literature review.",
    href: "/services/thesis-assistance",
    keywords: ["thesis", "assistance", "chapter", "methodology", "data analysis"],
    content: `Our PhD Thesis Writing Assistance service is perfect for scholars who need help with specific aspects of their thesis. Whether you need support with literature review, methodology, data analysis, or any specific chapter, our experts provide targeted assistance while you maintain control of your research.
Chapter-specific writing support, Literature review assistance, Methodology guidance, Data analysis support.`,
  },
  {
    title: "Dissertation Consultation Services",
    description: "Strategic guidance and mentorship for Masters and PhD dissertation writing.",
    href: "/services/dissertation-consultation",
    keywords: ["dissertation", "consultation", "guidance", "mentorship"],
    content: `Our Dissertation Consultation Services provide strategic guidance for Masters and PhD students. Get expert advice on structuring your dissertation, refining your research questions, selecting appropriate methodologies, and ensuring academic rigor throughout your work.
Research proposal development, Methodology consultation, Structure and outline planning, Literature review guidance.`,
  },
  {
    title: "Plagiarism Check & Removal Services",
    description: "Turnitin plagiarism check, detailed report, and professional removal with below 10% guarantee.",
    href: "/services/plagiarism-removal",
    keywords: ["plagiarism", "removal", "turnitin", "originality"],
    content: `Our Plagiarism Check & Removal Services ensure your academic work is 100% original. Using industry-standard tools like Turnitin, we identify all instances of similarity and professionally rewrite content to reduce plagiarism while maintaining academic integrity.
Turnitin plagiarism check, Detailed similarity report, Professional paraphrasing, Below 10% similarity guarantee.`,
  },
  {
  title: "Article Writing Services",
  description: "Professional academic article writing for peer-reviewed journals, magazines, and academic platforms with publication support.",
  href: "/services/article-writing",
  keywords: ["article writing", "journal article", "research article", "review article", "peer reviewed", "scopus", "publication", "academic article"],
  content: `Our Article Writing Services provide high-quality academic articles crafted by subject-matter experts for peer-reviewed journals, industry magazines, and academic platforms worldwide. Journal Article Writing, Review Articles, Abstract & Keywords optimization, Proper Formatting (APA, MLA, Chicago, Harvard, IEEE), Journal Targeting & Selection, Revision & Reviewer Response Support. Publication-ready quality with 85% acceptance rate and 5000+ articles published.`,
},
{
  title: "PhD Thesis Topic Selection Services",
  description: "Expert PhD topic selection and research gap identification with guaranteed university approval.",
  href: "/services/topic-selection",
  keywords: ["topic selection", "phd topic", "research topic", "thesis topic", "research gap", "phd proposal"],
  content: `Professional PhD Thesis Topic Selection Services. We help you choose a unique, research-worthy, and feasible topic aligned with your domain and university guidelines. Includes research gap analysis, problem statement formulation, objectives refinement, and preliminary literature review. Part of our comprehensive Services offering.`,
},
{
  title: "PhD Consultation Services",
  description: "One-on-one expert PhD consultation with PhD holders for methodology, data analysis, thesis guidance, and viva preparation.",
  href: "/services/phd-consultation",
  keywords: ["phd consultation", "phd guidance", "thesis consultation", "research consultation", "viva preparation", "methodology help"],
  content: `Expert PhD Consultation Services. Personalized one-on-one sessions with experienced PhD holders covering Research Methodology, Data Analysis Support, Thesis Writing Guidance, Viva Preparation, Milestone Planning, and Research Design. 500+ PhD experts, 8000+ sessions completed, 4.9/5 scholar rating. Flexible scheduling and actionable guidance at every stage of your doctoral journey.`,
},
{
  title: "Coding & Implementation Services",
  description: "Professional research coding and software implementation support using Python, R, MATLAB, Java, and more.",
  href: "/services/coding-implementation",
  keywords: ["coding", "implementation", "python", "r", "matlab", "data analysis code", "algorithm development", "research coding"],
  content: `Research Coding & Implementation Services. Expert developers translate your research requirements into clean, well-documented, and reproducible code. Algorithm Development, Statistical Analysis, Data Processing, Simulation & Modeling, Web & App Prototypes. Support for 15+ programming languages with full walkthrough and knowledge transfer. 3000+ projects delivered.`,
},
{
  title: "Research Proposal Writing Services",
  description: "Professional research proposal and synopsis writing with 96% university approval rate.",
  href: "/services/research-proposal",
  keywords: ["research proposal", "synopsis", "phd proposal", "proposal writing", "research plan", "grant proposal"],
  content: `Professional Research Proposal Writing Services. We craft compelling, approval-ready research proposals and synopses. Problem Statement, Objectives & Questions, Literature Review, Methodology Design, Timeline & Work Plan, Budget & Outcomes. 96% approval rate and 7000+ proposals written. Perfect for PhD admissions, university approval, and funding applications.`,
},
{
  title: "Research Consultation Services",
  description: "Strategic expert research consultation for research design, methodology, analysis, and publication planning.",
  href: "/services/research-consultation",
  keywords: ["research consultation", "research guidance", "research design", "methodology consultation", "publication strategy"],
  content: `Expert Research Consultation Services. Strategic guidance on Research Design, Methodology Selection, Data Analysis Advice, Literature Strategy, Publication Planning, and Ethics & Compliance. 200+ research domains covered and 6000+ scholars guided. Actionable roadmaps that accelerate your research and publication success.`,
},
{
  title: "Research Report Writing Services",
  description: "Comprehensive research report writing with data analysis, findings, visualizations, and recommendations.",
  href: "/services/research-report",
  keywords: ["research report", "report writing", "academic report", "data analysis report", "project report"],
  content: `Professional Research Report Writing Services. We deliver clear, well-structured research reports with Executive Summary, Data Analysis, Visual Aids (charts, graphs, tables), Findings & Discussion, Recommendations, and Appendices. Academic and corporate formats supported. 4000+ reports delivered with 100% data accuracy.`,
},
{
  title: "Conference Paper Writing Services",
  description: "High-quality conference papers for IEEE, ACM, Springer, and international academic conferences.",
  href: "/services/conference-paper",
  keywords: ["conference paper", "conference writing", "ieee paper", "acm paper", "paper submission", "conference presentation"],
  content: `Conference Paper Writing Services. Expert papers tailored to specific conference themes with strict template compliance (IEEE, ACM, Springer, Elsevier). Includes Presentation Support, Visual Aids, and Camera-Ready preparation. 3000+ papers accepted with 90% acceptance rate and express delivery options.`,
},
{
  title: "Proofreading & Editing Services",
  description: "Professional academic proofreading and editing services with track changes and publication-ready polish.",
  href: "/services/proofreading-editing",
  keywords: ["proofreading", "editing", "academic editing", "thesis editing", "paper editing", "grammar check"],
  content: `Professional Proofreading & Editing Services. Native English-speaking editors refine Grammar & Spelling, Sentence Structure, Academic Tone, Consistency, Citation Verification, and more. Two-tier review process with track changes. 12,000+ documents edited with 24-hour express options.`,
},
{
  title: "Scopus Paper Writing Services",
  description: "Expert Scopus-indexed journal paper writing with journal selection and high acceptance support.",
  href: "/services/scopus-paper",
  keywords: ["scopus paper", "scopus writing", "scopus publication", "journal paper", "sci paper", "high impact journal"],
  content: `Scopus-Indexed Paper Writing Services. Complete support from Journal Selection and Impact Factor Analysis to Manuscript Preparation, Data & Results, Indexing Optimization, and Peer Review Support. 2500+ Scopus papers published with 88% acceptance rate. Boost your h-index and citations.`,
},
{
  title: "Literature Review Writing Services",
  description: "Comprehensive systematic and narrative literature reviews with gap identification and synthesis.",
  href: "/services/literature-review",
  keywords: ["literature review", "systematic review", "narrative review", "thesis chapter 2", "research gap analysis"],
  content: `Expert Literature Review Writing Services. Systematic search across premium databases, Critical Analysis, Thematic Synthesis, Gap Identification, and Visual Mapping. 8000+ literature reviews completed with 200+ sources per review. Follows PRISMA guidelines and delivers publication-ready quality.`,
},
{
  title: "Review Paper Writing Services",
  description: "High-impact systematic review, survey, and meta-analysis papers for top journals.",
  href: "/services/review-paper",
  keywords: ["review paper", "systematic review", "survey paper", "meta analysis", "literature survey"],
  content: `Expert Review Paper Writing Services. Comprehensive surveys that identify trends, compare methodologies, and provide future research directions. High citation potential with taxonomy, classification tables, and journal-ready formatting. Suitable for Q1/Q2 journals.`,
},
{
  title: "LaTeX Editor & Thesis Formatting Services",
  description: "Professional LaTeX editing, real-time compilation, and academic document formatting with live PDF preview.",
  href: "/services/latex-editor",
  keywords: ["latex", "latex editor", "thesis formatting", "latex thesis", "overleaf", "academic latex"],
  content: `LaTeX Editor & Professional Formatting Services. Real-time LaTeX to PDF converter with live preview, CodeMirror editor, undo/redo, dark/light theme, and instant compilation. Perfect for PhD theses, research papers, and complex academic documents. Includes expert LaTeX help and template customization.`,
},
{
  title: "Book Writing & Publishing Services",
  description: "End-to-end academic book writing and publishing support from manuscript to print and distribution.",
  href: "/services/publishing",
  keywords: ["book writing", "academic book", "book publishing", "monograph", "textbook publishing", "isbn"],
  content: `Academic Book Writing & Publishing Services. Complete support including Book Proposal & Outline, Chapter Writing, Publisher Outreach, ISBN & Copyright, Cover Design & Typesetting, and Print & E-Book Setup. 500+ books published with connections to 50+ academic publishers.`,
},

  // ==================== MAIN PAGES ====================
  {
    title: "About CogniCode",
    description: "Learn about our 15+ years of experience and mission to support PhD scholars worldwide.",
    href: "/about",
    keywords: ["about", "team", "mission", "vision", "leadership"],
    content: `We are a team of dedicated academic professionals committed to helping scholars achieve their research goals. With over 15 years of experience, we have supported thousands of researchers worldwide.
Our Mission: To empower scholars worldwide by providing expert academic writing support.`,
  },
  {
    title: "Why Choose Us",
    description: "15+ years experience, 12,000+ projects completed, 100% on-time delivery, and 95% success rate.",
    href: "/why-us",
    keywords: ["why us", "reasons", "trust", "quality", "success"],
    content: `Discover why thousands of PhD scholars choose CogniCode. 15+ Years of Experience, 12,000+ Projects Completed, 100% Original Content, 24/7 Dedicated Support, High Success Rate.`,
  },
  {
    title: "News & Updates",
    description: "Latest UGC guidelines, PhD regulations, journal updates, and important notices for scholars.",
    href: "/news",
    keywords: ["news", "ugc", "guidelines", "regulations", "updates"],
    content: `Stay updated with the latest UGC guidelines, academic regulations, and important news relevant to PhD scholars and researchers across India.`,
  },
  {
    title: "Blog & Resources",
    description: "Expert academic writing tips, research guides, thesis advice, and publication strategies.",
    href: "/blog",
    keywords: ["blog", "tips", "guides", "research", "academic"],
    content: `Expert insights, research tips, and academic writing guides from our team of PhD scholars. Stay updated with the latest in academic writing.`,
  },
  {
    title: "PhD Admissions Guidance",
    description: "Complete support for PhD admission process, university selection, SOP, and interview preparation.",
    href: "/admissions",
    keywords: ["admissions", "phd admission", "university selection", "sop"],
    content: `Navigate the complex PhD admission process with confidence. From university selection to final enrollment, we provide comprehensive guidance at every step.`,
  },
  {
    title: "PhD Thesis Writing",
    description: "End-to-end PhD thesis writing from topic selection to final submission with expert PhD writers.",
    href: "/thesis-writing",
    keywords: ["thesis", "writing", "phd thesis", "chapter"],
    content: `Expert PhD Thesis Writing Support Services. Get comprehensive thesis writing support from topic selection to final submission. Our team of PhD experts ensures your thesis meets the highest academic standards.`,
  },
  {
    title: "Synopsis Writing Services",
    description: "Professional PhD synopsis / research proposal writing with 98% university approval rate.",
    href: "/synopsis-writing",
    keywords: ["synopsis", "proposal", "research proposal"],
    content: `Professional PhD Synopsis Writing Services. A well-crafted synopsis is the foundation of your PhD journey. Our expert team helps you create a compelling research proposal that gets approved quickly.`,
  },
  {
    title: "Research Paper Writing & Publication",
    description: "Professional research paper writing for Scopus, SCI, UGC journals with publication support.",
    href: "/research-writing",
    keywords: ["research paper", "publication", "scopus", "sci"],
    content: `Get Your Research Published in Top Journals. Professional research paper writing and publication support for Scopus, SCI, and UGC-approved journals.`,
  },
  {
    title: "Frequently Asked Questions",
    description: "Answers to all common questions about thesis, research paper, pricing, and support.",
    href: "/faqs",
    keywords: ["faq", "questions", "help", "support"],
    content: `Frequently Asked Questions. Find answers to common questions about our academic research writing services.`,
  },
  {
    title: "Pricing Plans",
    description: "Flexible and transparent pricing for Standard and Premium academic writing packages.",
    href: "/pricing",
    keywords: ["pricing", "plans", "packages", "cost"],
    content: `Flexible Pricing Plans. Choose a plan that matches your academic goals and budget. Standard and Premium packages available.`,
  },
  {
    title: "Samples & Portfolio",
    description: "View real PhD thesis, synopsis, research paper, and literature review samples.",
    href: "/samples",
    keywords: ["samples", "portfolio", "examples", "thesis samples"],
    content: `Work Samples. Explore our portfolio of academic writing samples. View the quality and standards we maintain in thesis, synopsis, research papers, and more.`,
  },
  {
    title: "Contact Us",
    description: "Get in touch with our academic experts for free consultation and support.",
    href: "/contact",
    keywords: ["contact", "support", "consultation", "help"],
    content: `Contact Us. Have a question or ready to start your project? Get in touch with our team. We're here to help you succeed in your academic journey.`,
  },

  // ==================== GLOBAL & UNIVERSITY PAGES ====================
  {
    title: "Global Presence",
    description: "Academic writing support for scholars in UK, USA, UAE, Australia, Canada, and 50+ countries.",
    href: "/global",
    keywords: ["global", "international", "uk", "usa", "uae"],
    content: `Academic Support Across the Globe. CogniCode brings trusted academic support to scholars worldwide.`,
  },
  {
    title: "UK Academic Support",
    description: "PhD thesis, dissertation, and assignment help tailored for UK universities (Oxford, Cambridge, etc.).",
    href: "/global/uk",
    keywords: ["uk", "british", "oxford", "cambridge", "united kingdom", "london", "manchester", "edinburgh", "birmingham"],
    content: `Academic Writing Support for UK Scholars. Expert academic support tailored for UK universities.`,
  },
  {
    title: "US Academic Support",
    description: "Dissertation and research paper help for US universities (Harvard, Stanford, MIT, etc.).",
    href: "/global/us",
    keywords: ["usa", "american", "harvard", "stanford"],
    content: `Academic Writing Support for US Scholars. Expert academic support designed for American universities.`,
  },
  {
    title: "UAE Academic Support",
    description: "PhD research and MBA dissertation support for UAE universities (UAEU, Khalifa, etc.).",
    href: "/global/uae",
    keywords: ["uae", "dubai", "abu dhabi", "khalifa university"],
    content: `Academic Writing Support for UAE Scholars. Expert academic support tailored for UAE universities.`,
  },
  {
    title: "University-Specific Support",
    description: "Customized PhD support for Amity, Delhi University, SRM, Manav Rachna, GLA, and 100+ universities.",
    href: "/university-support",
    keywords: ["university", "amity", "delhi university", "srm"],
    content: `University Scholars Support. Specialized PhD research support tailored for scholars from specific universities.`,
  },

  // ==================== ADDITIONAL GLOBAL PAGES ====================
  {
    title: "Australia Academic Support",
    description: "PhD research, MBA dissertation, and publication support for Australian universities (Melbourne, Sydney, ANU, etc.).",
    href: "/global/australia",
    keywords: ["australia", "australian", "melbourne", "sydney", "anu", "monash", "queensland", "uwa", "adelaide", "rmit"],
    content: `Academic Writing Support for Australian Scholars. Expert academic support tailored for Australian universities. CogniCode provides trusted research writing services across Australia with deep understanding of Australian academic requirements. PhD Research Support, MBA Dissertations, Research Publications, Academic Writing, Data Analysis with SPSS, R, NVivo, Proofreading & Editing. Knowledge of Australian Research Council (ARC) funding, support across all Australian time zones (AEST, AWST, ACST), and experience with Indigenous research methodologies. Nationwide support from Sydney to Perth.`,
  },
  {
    title: "Canada Academic Support",
    description: "PhD research and MBA dissertation help for Canadian universities (Toronto, UBC, McGill, McMaster, Waterloo).",
    href: "/global/canada",
    keywords: ["canada", "canadian", "toronto", "ubc", "mcgill", "mcmaster", "waterloo", "alberta", "montreal", "ottawa", "calgary"],
    content: `Academic Writing Support for Canadian Scholars. Expert academic support tailored for Canadian universities from coast to coast. Bilingual support for English and French research. Knowledge of Tri-Council funding requirements (SSHRC, NSERC, CIHR). PhD Research Support, MBA Dissertations, Research Publications, Academic Writing, Data Analysis, Proofreading & Editing. Familiarity with specific Canadian university guidelines, support across all Canadian time zones (PST to AST), experience with Indigenous research methodologies, and Canadian innovation and sustainability research.`,
  },
  {
    title: "Germany Academic Support",
    description: "PhD research and dissertation support for German universities (TU Munich, LMU, Heidelberg, Humboldt, RWTH Aachen).",
    href: "/global/germany",
    keywords: ["germany", "german", "deutschland", "munich", "berlin", "heidelberg", "lmu", "tum", "rwth", "aachen", "freiburg", "hamburg", "frankfurt"],
    content: `Academic Writing Support for German Scholars. Expert academic support tailored for German universities. CogniCode provides trusted research writing services across Germany with deep understanding of German academic requirements. PhD Research Support, MBA Dissertations, Research Publications, Academic Writing, Data Analysis, Proofreading & Editing. Bilingual support for English and German research. Knowledge of DFG (Deutsche Forschungsgemeinschaft) funding requirements, familiarity with German Promotionsordnungen, support for CET/CEST time zone, and deep knowledge of EU and German research ethics.`,
  },

  // ==================== SERVICES HUB ====================
  {
    title: "Our Services - All Academic Solutions",
    description: "Comprehensive academic writing services hub: thesis, research papers, data analysis, AI/ML, NLP, statistics, and more.",
    href: "/services",
    keywords: ["services", "all services", "academic services", "research services", "writing services"],
    content: `Our Services. Comprehensive academic writing support services tailored to your research needs. Explore our complete range including PhD Thesis Writing, Research Paper Writing, Topic Selection, Consultation, Coding & Implementation, Article Writing, Conference Papers, Proofreading & Editing, Publishing, Statistical Analysis, AI & Machine Learning, Computer Vision, Natural Language Processing, Data Science & Big Data, and Tools & Technologies training.`,
  },

  // ==================== AI & MACHINE LEARNING ====================
  {
    title: "AI & Machine Learning Research Support",
    description: "Expert AI and ML research support — model development, deep learning, neural networks, predictive modeling, and optimization.",
    href: "/services/ai-ml",
    keywords: ["ai", "ml", "machine learning", "artificial intelligence", "deep learning", "neural networks"],
    content: `AI & Machine Learning Research Support. From classical ML algorithms to state-of-the-art deep learning architectures, our AI experts turn your research ideas into production-grade, reproducible models with measurable impact. Services include ML Model Development, Deep Learning & Neural Networks, Predictive Modeling & Forecasting, and Model Evaluation & Optimization for PhD scholars and industry researchers.`,
  },
  {
    title: "Machine Learning Model Development",
    description: "End-to-end custom ML model development for PhD research — supervised, unsupervised, and reinforcement learning.",
    href: "/services/ai-ml/ml-model",
    keywords: ["ml model", "machine learning model", "supervised learning", "unsupervised learning", "reinforcement learning", "scikit-learn", "xgboost"],
    content: `Custom Machine Learning Models for PhD Research. End-to-end ML model development covering supervised, unsupervised, and reinforcement learning with full reproducibility, documentation, and publication-ready deliverables. Includes feature engineering, model selection, training, validation, hyperparameter tuning, and academic-quality reporting.`,
  },
  {
    title: "Deep Learning & Neural Networks",
    description: "Advanced Deep Learning and Neural Networks — CNNs, RNNs, LSTMs, GANs, and Transformers for PhD research.",
    href: "/services/ai-ml/dl-neural-network",
    keywords: ["deep learning", "neural networks", "cnn", "rnn", "lstm", "gan", "transformer", "tensorflow", "pytorch", "keras"],
    content: `Advanced Deep Learning and Neural Networks. Expert Deep Learning and Neural Network development for PhD research. Build CNNs, RNNs, LSTMs, GANs, and Transformer architectures with TensorFlow, PyTorch and Keras. Fully reproducible and publication-ready models with rigorous training pipelines, transfer learning, and explainable outputs.`,
  },
  {
    title: "Predictive Modeling & Forecasting",
    description: "Predictive modeling and time-series forecasting — ARIMA, Prophet, LSTM, XGBoost, and Transformer-based forecasting.",
    href: "/services/ai-ml/predict-modelling-forecast",
    keywords: ["predictive modeling", "forecasting", "time series", "arima", "prophet", "lstm forecasting", "xgboost"],
    content: `Predictive Modeling & Forecasting. Expert predictive modeling and time-series forecasting for PhD research using ARIMA, Prophet, LSTM, XGBoost, and Transformer-based forecasting models. Includes statistical validation, residual diagnostics, confidence intervals, and publication-ready forecast results with full reproducibility.`,
  },
  {
    title: "Model Evaluation & Optimization",
    description: "Rigorous model evaluation, hyperparameter tuning, explainability (SHAP, LIME), and optimization with Optuna.",
    href: "/services/ai-ml/model-eval-optim",
    keywords: ["model evaluation", "hyperparameter tuning", "optuna", "shap", "lime", "explainability", "optimization", "ablation"],
    content: `Model Evaluation & Optimization. Expert model evaluation, hyperparameter tuning, explainability analysis, and optimization for PhD research. Rigorous validation, ablation studies, and publication-ready performance reports using SHAP, LIME, Optuna, and more. Cross-validation strategies, fairness assessment, and benchmark comparisons included.`,
  },

  // ==================== COMPUTER VISION ====================
  {
    title: "Computer Vision Research Support",
    description: "Expert Computer Vision research — image processing, object detection, medical imaging, and video analytics.",
    href: "/services/computer-vision",
    keywords: ["computer vision", "cv", "image", "vision", "opencv", "vision transformer"],
    content: `Computer Vision Research Support. From classical image processing to cutting-edge Vision Transformers, our CV experts help you build, train, and deploy vision systems that deliver research-grade accuracy and reproducibility. Services include Image Processing & Analysis, Object Detection & Recognition, Medical Image Analysis, and Video Analytics.`,
  },
  {
    title: "Image Processing & Analysis",
    description: "Image enhancement, segmentation, feature extraction, and pattern recognition with OpenCV, scikit-image, and DL.",
    href: "/services/computer-vision/image-processing",
    keywords: ["image processing", "image analysis", "image segmentation", "opencv", "scikit-image", "morphological operations", "feature extraction"],
    content: `Image Processing & Analysis. Expert image processing and analysis for PhD research including advanced enhancement, segmentation, feature extraction, morphological operations, and pattern recognition using OpenCV, scikit-image, and deep learning. Custom pipelines, noise reduction, edge detection, and academic-grade documentation.`,
  },
  {
    title: "Object Detection & Recognition",
    description: "Object detection with YOLO, Faster R-CNN, SSD, DETR, and transformer-based models for PhD research.",
    href: "/services/computer-vision/object-detection",
    keywords: ["object detection", "yolo", "faster r-cnn", "ssd", "detr", "object recognition", "real-time detection"],
    content: `Object Detection & Recognition. Expert object detection and recognition for PhD research using YOLO, Faster R-CNN, SSD, DETR, and transformer-based models. Achieve state-of-the-art accuracy with real-time performance and full academic documentation. Custom dataset annotation, model training, and deployment-ready outputs included.`,
  },
  {
    title: "Medical Image Analysis",
    description: "MRI, CT, X-ray, histopathology, and ultrasound segmentation & classification with U-Net, nnU-Net, and transformers.",
    href: "/services/computer-vision/medical-image-analysis",
    keywords: ["medical image", "mri", "ct scan", "x-ray", "histopathology", "ultrasound", "u-net", "nnu-net", "medical ai", "clinical research"],
    content: `Medical Image Analysis. Expert medical image analysis for PhD and clinical research. Specialized in MRI, CT, X-ray, histopathology, and ultrasound segmentation & classification using U-Net, nnU-Net, and transformer-based models. DICOM handling, ROI extraction, radiomics, and clinical-grade validation for healthcare research.`,
  },
  {
    title: "Video Analytics & Understanding",
    description: "Action recognition, activity detection, motion analysis, and surveillance with 3D CNNs, SlowFast, and Video Transformers.",
    href: "/services/computer-vision/video-analytics",
    keywords: ["video analytics", "action recognition", "activity detection", "motion analysis", "3d cnn", "slowfast", "video transformer", "surveillance"],
    content: `Video Analytics & Understanding. Expert video analytics and understanding for PhD research covering action recognition, activity detection, motion analysis, and surveillance systems using 3D CNNs, SlowFast, Video Transformers, and temporal models. Optical flow, tracking, and temporal segmentation pipelines included.`,
  },

  // ==================== DATA SCIENCE & BIG DATA ====================
  {
    title: "Data Science & Big Data Research Support",
    description: "Data cleaning, EDA, Big Data analytics with Spark/Hadoop, and interactive dashboards using Python, Tableau, Power BI.",
    href: "/services/ds-big-data",
    keywords: ["data science", "big data", "spark", "hadoop", "data analytics", "dashboards", "tableau", "power bi"],
    content: `Data Science & Big Data Research Support. Expert support including data cleaning, Exploratory Data Analysis (EDA), Big Data Analytics with Spark/Hadoop, and interactive dashboards using Python, Tableau, Power BI for PhD and industry projects. 20+ Big Data Tools & Frameworks with 100% reproducible results.`,
  },
  {
    title: "Data Cleaning & Preprocessing",
    description: "Handling missing values, outliers, normalization, encoding, and automated pipelines using Pandas, NumPy, PySpark.",
    href: "/services/ds-big-data/data-cleaning-preprocessing",
    keywords: ["data cleaning", "preprocessing", "missing values", "outliers", "normalization", "feature scaling", "pandas", "numpy", "pyspark"],
    content: `Data Cleaning & Preprocessing. Expert data cleaning and preprocessing for PhD research and big data projects. Handling missing values, outliers, duplicates, normalization, feature scaling, encoding, and automated pipelines using Pandas, NumPy, and PySpark. Production-grade ETL workflows for reproducible research.`,
  },
  {
    title: "Exploratory Data Analysis (EDA)",
    description: "In-depth statistical summaries, correlation analysis, distribution visualization, and pattern discovery with Python and R.",
    href: "/services/ds-big-data/exploratory-data-analysis",
    keywords: ["eda", "exploratory data analysis", "data exploration", "correlation analysis", "distribution analysis", "pattern discovery", "jupyter"],
    content: `Exploratory Data Analysis (EDA). Expert Exploratory Data Analysis for PhD research and big data projects. In-depth statistical summaries, correlation analysis, distribution visualization, pattern discovery, and actionable insights using Python, R, and interactive notebooks. Hypothesis generation and feature selection groundwork included.`,
  },
  {
    title: "Big Data Analytics",
    description: "Scalable processing with Apache Spark, Hadoop, Hive, Kafka — real-time and batch analytics with distributed computing.",
    href: "/services/ds-big-data/big-data-analytics",
    keywords: ["big data", "apache spark", "hadoop", "hive", "kafka", "distributed computing", "real-time analytics", "batch processing"],
    content: `Big Data Analytics. Expert Big Data Analytics for PhD research and large-scale projects. Scalable processing with Apache Spark, Hadoop, Hive, Kafka — real-time and batch analytics with distributed computing. Cluster deployment, MapReduce paradigms, streaming analytics, and petabyte-scale data handling.`,
  },
  {
    title: "Data Visualization & Dashboarding",
    description: "Interactive dashboards with Tableau, Power BI, Matplotlib, Seaborn, Plotly, Dash, and Streamlit.",
    href: "/services/ds-big-data/data-visualization-dashboarding",
    keywords: ["data visualization", "dashboard", "tableau", "power bi", "matplotlib", "seaborn", "plotly", "dash", "streamlit"],
    content: `Data Visualization & Dashboarding. Expert data visualization and interactive dashboard development using Tableau, Power BI, Matplotlib, Seaborn, Plotly, Dash, and Streamlit for PhD research and publication-ready insights. Storytelling with data, KPI dashboards, and journal-quality figures included.`,
  },

  // ==================== NATURAL LANGUAGE PROCESSING ====================
  {
    title: "NLP Research & Development Support",
    description: "Text mining, sentiment analysis, chatbot development, document classification, and topic modeling expertise.",
    href: "/services/natural-language-processing",
    keywords: ["nlp", "natural language processing", "text mining", "sentiment analysis", "llm", "language models"],
    content: `NLP Research & Development Support. From classical text mining to state-of-the-art large language models, our NLP experts help you extract meaning from text, build conversational systems, and publish research-grade language understanding solutions. Services include Text Mining & Sentiment Analysis, Chatbot Development, Document Classification, and Topic Modeling.`,
  },
  {
    title: "Text Mining & Sentiment Analysis",
    description: "Sentiment scoring, aspect-based analysis, emotion detection, and opinion mining with BERT, RoBERTa, and VADER.",
    href: "/services/natural-language-processing/text-mining-sentiment",
    keywords: ["text mining", "sentiment analysis", "opinion mining", "emotion detection", "bert", "roberta", "vader", "aspect-based"],
    content: `Text Mining & Sentiment Analysis. Expert text mining and sentiment analysis for PhD research with advanced sentiment scoring, aspect-based analysis, emotion detection, and opinion mining using BERT, RoBERTa, VADER, and custom NLP pipelines. Social media analytics, review mining, and multi-language support included.`,
  },
  {
    title: "Intelligent Chatbot Development",
    description: "Domain-specific chatbots, RAG systems, intent recognition, and dialogue management powered by LLMs.",
    href: "/services/natural-language-processing/chatbot-development",
    keywords: ["chatbot", "conversational ai", "rag", "intent recognition", "dialogue management", "llm chatbot", "virtual assistant"],
    content: `Intelligent Chatbot Development. Expert chatbot development for PhD research including intelligent conversational agents, domain-specific chatbots, RAG systems, intent recognition, and dialogue management powered by LLMs. End-to-end design with NLU, dialogue policies, knowledge integration, and evaluation metrics.`,
  },
  {
    title: "Document Classification",
    description: "Automated categorization of research papers, legal, and medical documents using BERT, RoBERTa, and transformers.",
    href: "/services/natural-language-processing/document-classification",
    keywords: ["document classification", "text classification", "bert", "roberta", "multi-label", "hierarchical classification", "transformer"],
    content: `Document Classification. Expert document classification for PhD research with automated categorization of research papers, legal documents, medical records, and large text corpora using BERT, RoBERTa, and transformer-based multi-label & hierarchical classifiers. Active learning and weakly-supervised approaches supported.`,
  },
  {
    title: "Topic Modeling & Language Understanding",
    description: "Uncover hidden themes with LDA, BERTopic, NMF, and embedding-based clustering using fine-tuned transformers.",
    href: "/services/natural-language-processing/topic-modeling",
    keywords: ["topic modeling", "lda", "bertopic", "nmf", "language understanding", "semantic analysis", "embedding clustering"],
    content: `Topic Modeling & Language Understanding. Expert topic modeling and language understanding for PhD research. Uncover hidden themes using LDA, BERTopic, NMF, and embedding-based clustering with deep semantic analysis via fine-tuned transformers. Coherence scoring, topic visualization, and longitudinal trend analysis included.`,
  },

  // ==================== STATISTICAL ANALYSIS ====================
  {
    title: "Statistical Analysis & Data Analytics Research Support",
    description: "Statistical analysis using SPSS, R, Python — hypothesis testing, regression, multivariate & factor analysis.",
    href: "/services/statistical-analysis-data-analytics",
    keywords: ["statistical analysis", "data analytics", "spss", "r", "python", "statistics", "phd statistics"],
    content: `Statistical Analysis & Data Analytics Research Support. Expert statistical analysis and data analytics support using SPSS, R, Python — covering hypothesis testing, regression, multivariate & factor analysis for PhD research and academic publications. Includes SPSS/R/Python-based analysis, hypothesis testing, regression & correlation, and multivariate & factor analysis.`,
  },
  {
    title: "SPSS / R / Python-Based Analysis",
    description: "End-to-end statistical analysis using SPSS, R, and Python — data cleaning, scripting, and reproducible pipelines.",
    href: "/services/statistical-analysis-data-analytics/spss-r-python",
    keywords: ["spss analysis", "r programming", "python statistics", "statistical software", "scripting", "automation", "reproducible research"],
    content: `SPSS, R & Python Statistical Analysis. Expert end-to-end statistical analysis using SPSS, R, and Python including data cleaning, visualization, scripting, automation, and reproducible research pipelines for PhD thesis and academic publications. Code documentation, syntax files, and journal-ready outputs.`,
  },
  {
    title: "Hypothesis Testing",
    description: "Parametric and non-parametric tests — t-tests, ANOVA, chi-square, Mann-Whitney, and Wilcoxon with full interpretation.",
    href: "/services/statistical-analysis-data-analytics/hypothesis-testing",
    keywords: ["hypothesis testing", "t-test", "anova", "chi-square", "mann-whitney", "wilcoxon", "p-value", "effect size", "non-parametric"],
    content: `Hypothesis Testing. Expert hypothesis testing for PhD research covering parametric and non-parametric tests including t-tests, ANOVA, chi-square, Mann-Whitney, Wilcoxon, and more — with clear interpretation, p-values, effect sizes, and publication-ready reports. Assumption checking, post-hoc analysis, and power calculations included.`,
  },
  {
    title: "Regression & Correlation Analysis",
    description: "Linear, multiple, logistic, polynomial, and nonlinear regression with multicollinearity diagnostics.",
    href: "/services/statistical-analysis-data-analytics/regression-correlation",
    keywords: ["regression", "correlation", "linear regression", "logistic regression", "polynomial", "multicollinearity", "spss regression"],
    content: `Regression & Correlation Analysis. Expert regression and correlation analysis for PhD research including linear, multiple, logistic, polynomial, and nonlinear regression models with correlation analysis, multicollinearity diagnostics, and publication-ready results using SPSS, R, and Python. Residual analysis and model fit reporting included.`,
  },
  {
    title: "Multivariate & Factor Analysis",
    description: "MANOVA, PCA, EFA/CFA, Cluster Analysis, Discriminant Analysis, and Structural Equation Modeling (SEM).",
    href: "/services/statistical-analysis-data-analytics/multivariate-factor",
    keywords: ["multivariate analysis", "factor analysis", "manova", "pca", "efa", "cfa", "cluster analysis", "discriminant analysis", "sem", "structural equation modeling"],
    content: `Multivariate & Factor Analysis. Expert multivariate and factor analysis for PhD research including MANOVA, PCA, Exploratory & Confirmatory Factor Analysis, Cluster Analysis, Discriminant Analysis, and Structural Equation Modeling (SEM) using SPSS, R, and Python. AMOS and Lavaan-based SEM with model fit indices.`,
  },

  // ==================== TOOLS & TECHNOLOGIES ====================
  {
    title: "Tools & Technologies Research Support",
    description: "Implementation and training in Python, R, MATLAB, SPSS, STATA, TensorFlow, PyTorch, Tableau, and Power BI.",
    href: "/services/tools-technologies",
    keywords: ["tools", "technologies", "programming", "software", "training", "research tools"],
    content: `Tools & Technologies Research Support. Expert implementation and training in Python, R, MATLAB, SPSS, STATA, TensorFlow, PyTorch, Tableau, and Power BI — professional tool mastery for data science, statistical analysis, machine learning, and research projects. One-on-one mentoring and hands-on project support included.`,
  },
  {
    title: "Python, R & MATLAB",
    description: "Advanced programming and scripting in Python, R, and MATLAB for data analysis, modeling, and simulations.",
    href: "/services/tools-technologies/python-r-matlab",
    keywords: ["python", "r programming", "matlab", "scripting", "simulations", "algorithm development", "scientific computing"],
    content: `Python, R & MATLAB. Expert advanced programming and scripting in Python, R, and MATLAB for PhD research. Data analysis, statistical modeling, simulations, algorithm development, and reproducible research workflows. Custom toolboxes, package development, and performance optimization included.`,
  },
  {
    title: "SPSS & STATA",
    description: "Professional statistical analysis using SPSS and STATA for PhD research, econometrics, and hypothesis testing.",
    href: "/services/tools-technologies/spss-stata",
    keywords: ["spss", "stata", "statistical software", "econometrics", "data management", "syntax files"],
    content: `SPSS & STATA. Professional statistical analysis using SPSS and STATA for PhD research. From data management and descriptive statistics to complex econometric modeling, hypothesis testing, and publication-ready outputs. Panel data analysis, survey weights, and longitudinal modeling supported.`,
  },
  {
    title: "Tableau & Power BI",
    description: "Interactive data visualization and BI dashboards using Tableau and Power BI for publication-ready insights.",
    href: "/services/tools-technologies/tableau-power-bi",
    keywords: ["tableau", "power bi", "business intelligence", "dashboards", "data visualization", "bi reports", "interactive analytics"],
    content: `Tableau & Power BI. Expert interactive data visualization and business intelligence dashboard development using Tableau and Power BI — creating publication-ready reports, real-time analytics, and compelling data storytelling for PhD research. DAX formulas, calculated fields, and live data connections included.`,
  },
  {
    title: "TensorFlow & PyTorch",
    description: "Deep learning model development with TensorFlow and PyTorch — custom architectures, training, and deployment.",
    href: "/services/tools-technologies/tensorflow-pytorch",
    keywords: ["tensorflow", "pytorch", "deep learning frameworks", "transfer learning", "model deployment", "training pipelines", "keras"],
    content: `TensorFlow & PyTorch. Expert deep learning and machine learning model development with TensorFlow and PyTorch. Custom architectures, training pipelines, transfer learning, model optimization, and deployment for PhD research. ONNX export, GPU acceleration, and distributed training supported.`,
  },

];