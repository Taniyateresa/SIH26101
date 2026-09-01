/**
 * STATS AI - Course & Learning Recommendations Catalog
 * Labeled clearly as "iGOT/NSSTA Integration – Prototype Data"
 */

const COURSE_CATALOG = {
  "Data Handling": [
    {
      id: "CRS-DH-101",
      title: "Pandas Fundamentals for Survey Data",
      level: "Beginner",
      duration: "6 Hours",
      provider: "iGOT Karmayogi / NSSTA",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended because of your Data Handling gap.",
      subtopicMatch: "Pandas operations",
      description: "Master DataFrames, Series indexing, filtering, CSV loading, and column arithmetic for official government statistics.",
      modules: [
        "1. Introduction to Pandas DataStructures & Series",
        "2. Reading MoSPI Survey Datasets into DataFrames",
        "3. Indexing, Filtering and Slicing Techniques",
        "4. Handling Column Formats and Schema Alignments"
      ],
      rating: 4.8,
      enrolledCount: 1420
    },
    {
      id: "CRS-DH-102",
      title: "Data Cleaning with Python",
      level: "Intermediate",
      duration: "8 Hours",
      provider: "NSSTA - National Academy",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended because of your assessment performance.",
      subtopicMatch: "Missing-value handling",
      description: "Standard operating procedures for identifying missing records, handling NA/NaNs, removing duplicate survey entries, and data normalization.",
      modules: [
        "1. Imputation Methods for Missing Survey Values",
        "2. Duplicate Record Detection and Multi-column Deduplication",
        "3. String Sanitization and Categorical Data Encoding",
        "4. Validation Rules for Official Statistical Release"
      ],
      rating: 4.9,
      enrolledCount: 1180
    },
    {
      id: "CRS-DH-103",
      title: "Data Manipulation Techniques",
      level: "Intermediate",
      duration: "10 Hours",
      provider: "iGOT Karmayogi",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended to strengthen Data Handling skills.",
      subtopicMatch: "Data Manipulation",
      description: "Advanced grouping, aggregation, pivoting, merging relational tables, and window functions for administrative data processing.",
      modules: [
        "1. Split-Apply-Combine with GroupBy Operations",
        "2. Pivot Tables and Cross-tabulations for Tabular Reports",
        "3. Merging and Concatenating Multi-district Datasets",
        "4. Performance Optimization for Large Survey Batches"
      ],
      rating: 4.7,
      enrolledCount: 950
    }
  ],

  "Python Basics": [
    {
      id: "CRS-PY-101",
      title: "Python Scripting for Statistical Officers",
      level: "Beginner",
      duration: "8 Hours",
      provider: "iGOT Karmayogi",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended to build core scripting foundational skills.",
      subtopicMatch: "List comprehension & iterables",
      description: "Introduction to Python data types, loops, list comprehensions, dictionary mappings, and custom functions.",
      modules: [
        "1. Variables, Control Flow & Data Types",
        "2. List Comprehensions & Efficient Loops",
        "3. Dictionary Methods & Safe Access Patterns",
        "4. Writing Reusable Python Functions"
      ],
      rating: 4.9,
      enrolledCount: 2200
    },
    {
      id: "CRS-PY-102",
      title: "Functional Programming & Error Handling in Python",
      level: "Intermediate",
      duration: "5 Hours",
      provider: "NSSTA - National Academy",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended because of your assessment response patterns.",
      subtopicMatch: "Dictionary data structures",
      description: "Exception handling, lambda expressions, map-filter-reduce pipelines, and robust automation scripts.",
      modules: [
        "1. Exception Handling & Defensive Coding",
        "2. Lambda Functions & Higher-Order Methods",
        "3. Modular Packaging for Statistical Scripts"
      ],
      rating: 4.6,
      enrolledCount: 780
    }
  ],

  "Data Visualization": [
    {
      id: "CRS-DV-101",
      title: "Statistical Data Visualization with Matplotlib & Seaborn",
      level: "Beginner to Intermediate",
      duration: "7 Hours",
      provider: "iGOT Karmayogi",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended to bridge your Data Visualization gap.",
      subtopicMatch: "Matplotlib & Seaborn styling",
      description: "Create publication-ready bar charts, line plots, heatmaps, and faceted charts for government survey publications.",
      modules: [
        "1. Fundamentals of Chart Geometry & Aesthetics",
        "2. Heatmaps & Correlation Matrices for Indicators",
        "3. Faceted Categorical Grid Visualizations",
        "4. Exporting High-Resolution Vector Figures"
      ],
      rating: 4.8,
      enrolledCount: 1650
    },
    {
      id: "CRS-DV-102",
      title: "Exploratory Data Analysis & Outlier Detection",
      level: "Intermediate",
      duration: "6 Hours",
      provider: "NSSTA - National Academy",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended to enhance distribution and outlier diagnostics.",
      subtopicMatch: "Distribution & Boxplots",
      description: "Interpreting boxplots, kernel density estimates, histograms, and violin plots to identify anomalous survey submissions.",
      modules: [
        "1. Five-Number Summary & Boxplot Interpretation",
        "2. Detecting Skewness and Heavy-Tailed Distributions",
        "3. Multi-variable Interactive Visual Analytics"
      ],
      rating: 4.7,
      enrolledCount: 890
    }
  ],

  "Statistics": [
    {
      id: "CRS-ST-101",
      title: "Advanced Survey Sampling & Stratification Techniques",
      level: "Intermediate",
      duration: "12 Hours",
      provider: "NSSTA - National Academy",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended to strengthen statistical sampling foundations.",
      subtopicMatch: "Sampling theory & stratified design",
      description: "Rigorous coverage of Stratified Sampling, Multi-stage Cluster Sampling, PPS Sampling, and Design Effects in National Sample Surveys.",
      modules: [
        "1. Stratification Allocation Schemes (Neyman vs Proportional)",
        "2. Multi-Stage Sampling in Large Scale Surveys",
        "3. Calculation of Sampling Weights & Multipliers",
        "4. Non-Sampling Error Minimization Strategies"
      ],
      rating: 4.9,
      enrolledCount: 1840
    },
    {
      id: "CRS-ST-102",
      title: "Applied Hypothesis Testing & Inferential Statistics",
      level: "Intermediate to Advanced",
      duration: "9 Hours",
      provider: "iGOT Karmayogi",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended because of your inferential test results.",
      subtopicMatch: "Hypothesis testing & p-values",
      description: "Practical guide to parametric & non-parametric tests, p-value interpretation, ANOVA, and Chi-Square contingency testing.",
      modules: [
        "1. Formulation of Null and Alternative Hypotheses",
        "2. Two-Sample T-Tests and Z-Tests for Sample Means",
        "3. ANOVA for Multi-Group Socioeconomic Comparisons",
        "4. P-Value Interpretation and Confidence Intervals"
      ],
      rating: 4.8,
      enrolledCount: 1310
    }
  ],

  "AI/ML": [
    {
      id: "CRS-AI-101",
      title: "Machine Learning for Official Statistics & Forecasting",
      level: "Intermediate",
      duration: "14 Hours",
      provider: "iGOT Karmayogi",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended to build modern predictive modeling competency.",
      subtopicMatch: "Predictive modeling",
      description: "Using regression, tree-based models, and clustering to detect survey anomalies and forecast economic indices.",
      modules: [
        "1. Supervised Learning & Regression Models",
        "2. Time-series Forecasting for CPI / IIP Indices",
        "3. Clustering for Regional Typology Groupings"
      ],
      rating: 4.9,
      enrolledCount: 1050
    }
  ],

  "GIS": [
    {
      id: "CRS-GIS-101",
      title: "Spatial Data Analysis with GeoPandas & QGIS",
      level: "Intermediate",
      duration: "10 Hours",
      provider: "NSSTA - National Academy",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended for district and block-level geocoding.",
      subtopicMatch: "Spatial joins & choropleths",
      description: "Vector mapping, coordinate reference systems (CRS), spatial joins, and thematic cartography for MoSPI indicators.",
      modules: [
        "1. Shapefiles, GeoJSON and Coordinate Systems",
        "2. Spatial Joins between Survey Data and District Boundaries",
        "3. Generating Thematic Choropleth Maps"
      ],
      rating: 4.8,
      enrolledCount: 920
    }
  ],

  "Statistical Computing": [
    {
      id: "CRS-SC-101",
      title: "Automated Statistical Pipelines with NumPy & SciPy",
      level: "Intermediate",
      duration: "8 Hours",
      provider: "iGOT Karmayogi",
      tag: "iGOT/NSSTA Integration – Prototype Data",
      matchReason: "Recommended to optimize statistical data calculations.",
      subtopicMatch: "Vectorized computations",
      description: "Vectorized array calculations, matrix operations, statistical distributions, and numerical methods in Python.",
      modules: [
        "1. High-Performance Vectorized Array Math",
        "2. Probability Density Functions & SciPy Stats",
        "3. Building Reproducible Batch Data Pipelines"
      ],
      rating: 4.7,
      enrolledCount: 760
    }
  ]
};

window.COURSE_CATALOG = COURSE_CATALOG;
