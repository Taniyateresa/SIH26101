/**
 * STATS AI - Comprehensive Tagged Assessment Question Bank
 * Questions contain internal topic & subtopic tags (hidden during exam).
 */

const QUESTION_BANK = [
  // --- PYTHON BASICS (2 Questions) ---
  {
    id: "QB-PY-01",
    topic: "Python Basics",
    subtopic: "List comprehension & iterables",
    difficulty: "Beginner",
    question: "Which of the following Python expressions correctly creates a list of squared numbers from 1 to 5 using list comprehension?",
    options: [
      "[x**2 for x in range(1, 6)]",
      "[for x in range(1, 5) x**2]",
      "list(x^2 for x in 1..5)",
      "[x*2 while x in range(1, 6)]"
    ],
    correctIndex: 0,
    correctAnswer: "[x**2 for x in range(1, 6)]",
    explanation: "List comprehension syntax in Python is [expression for item in iterable]. range(1, 6) generates numbers 1 through 5, and ** is the exponentiation operator."
  },
  {
    id: "QB-PY-02",
    topic: "Python Basics",
    subtopic: "Dictionary data structures",
    difficulty: "Beginner",
    question: "What will be the output of dict.get('state_code', 'NA') if 'state_code' does not exist as a key in the dictionary?",
    options: [
      "Throws KeyError exception",
      "Returns 'NA'",
      "Returns None",
      "Returns False"
    ],
    correctIndex: 1,
    correctAnswer: "Returns 'NA'",
    explanation: "The get() method of a Python dictionary takes an optional default value as the second argument, which is returned if the specified key is not found, avoiding a KeyError."
  },

  // --- DATA HANDLING (3 Questions) ---
  {
    id: "QB-DH-01",
    topic: "Data Handling",
    subtopic: "Pandas operations",
    difficulty: "Intermediate",
    question: "Which Python library and method is commonly used to load tabular national survey data directly from a CSV file into memory?",
    options: [
      "numpy.read_array()",
      "pandas.read_csv()",
      "scipy.load_table()",
      "csv.parse_dataframe()"
    ],
    correctIndex: 1,
    correctAnswer: "pandas.read_csv()",
    explanation: "pandas.read_csv() is the standard industry and government function for reading CSV data into a Pandas DataFrame for data handling and manipulation."
  },
  {
    id: "QB-DH-02",
    topic: "Data Handling",
    subtopic: "Missing-value handling",
    difficulty: "Intermediate",
    question: "In Pandas, which method is used to fill missing (NaN) survey values with the column mean or a specified constant?",
    options: [
      "df.fillna()",
      "df.dropna()",
      "df.replace_null()",
      "df.impute_empty()"
    ],
    correctIndex: 0,
    correctAnswer: "df.fillna()",
    explanation: "df.fillna(value) fills NA/NaN values using the specified method or value, which is essential for missing-value handling in survey data cleaning."
  },
  {
    id: "QB-DH-03",
    topic: "Data Handling",
    subtopic: "Data cleaning & transformation",
    difficulty: "Intermediate",
    question: "When cleaning government administrative datasets, which Pandas command removes duplicated records based on specific identification columns?",
    options: [
      "df.drop_duplicates(subset=['id'])",
      "df.remove_clones(column='id')",
      "df.unique_rows(key='id')",
      "df.filter_distinct(['id'])"
    ],
    correctIndex: 0,
    correctAnswer: "df.drop_duplicates(subset=['id'])",
    explanation: "df.drop_duplicates(subset=['id']) filters out recurring duplicate entries, ensuring clean and reliable records for official reporting."
  },

  // --- DATA VISUALIZATION (2 Questions) ---
  {
    id: "QB-DV-01",
    topic: "Data Visualization",
    subtopic: "Distribution & Boxplots",
    difficulty: "Intermediate",
    question: "Which chart type is best suited to display the five-number summary (minimum, Q1, median, Q3, maximum) and detect outliers across rural vs urban income groups?",
    options: [
      "Pie Chart",
      "Box and Whisker Plot",
      "Scatter Plot",
      "Donut Chart"
    ],
    correctIndex: 1,
    correctAnswer: "Box and Whisker Plot",
    explanation: "Box and whisker plots visually show the five-number summary and highlight potential outliers, making them the standard tool for distribution analysis."
  },
  {
    id: "QB-DV-02",
    topic: "Data Visualization",
    subtopic: "Matplotlib & Seaborn styling",
    difficulty: "Beginner",
    question: "In Seaborn, which function is designed to plot the correlation matrix of multiple statistical indicators as an annotated color grid?",
    options: [
      "sns.heatmap()",
      "sns.gridplot()",
      "sns.corrplot()",
      "sns.matrixview()"
    ],
    correctIndex: 0,
    correctAnswer: "sns.heatmap()",
    explanation: "sns.heatmap() generates a 2D color-encoded matrix, ideal for visualizing correlation coefficients across demographic and economic variables."
  },

  // --- STATISTICS (3 Questions) ---
  {
    id: "QB-ST-01",
    topic: "Statistics",
    subtopic: "Sampling theory & stratified design",
    difficulty: "Intermediate",
    question: "In nationwide socioeconomic surveys, why is Stratified Random Sampling preferred over Simple Random Sampling?",
    options: [
      "It requires no sampling frame",
      "It guarantees representation of distinct sub-populations (strata) and reduces variance",
      "It completely eliminates non-sampling errors",
      "It is always cheaper and takes zero planning"
    ],
    correctIndex: 1,
    correctAnswer: "It guarantees representation of distinct sub-populations (strata) and reduces variance",
    explanation: "Stratified random sampling divides the population into homogeneous subgroups (strata) ensuring minority or regional groups are represented and reducing sampling error."
  },
  {
    id: "QB-ST-02",
    topic: "Statistics",
    subtopic: "Hypothesis testing & p-values",
    difficulty: "Advanced",
    question: "In hypothesis testing, if the calculated p-value is 0.02 and the significance level (alpha) is 0.05, what is the appropriate statistical conclusion?",
    options: [
      "Fail to reject the null hypothesis",
      "Reject the null hypothesis as the result is statistically significant",
      "Accept the null hypothesis with 98% certainty",
      "The sample size is insufficient to decide"
    ],
    correctIndex: 1,
    correctAnswer: "Reject the null hypothesis as the result is statistically significant",
    explanation: "When p-value < alpha (0.02 < 0.05), there is sufficient evidence against the null hypothesis to reject it in favor of the alternative hypothesis."
  },
  {
    id: "QB-ST-03",
    topic: "Statistics",
    subtopic: "Measures of dispersion & variance",
    difficulty: "Beginner",
    question: "Which metric measures the relative dispersion of a dataset independent of its measurement units?",
    options: [
      "Standard Deviation",
      "Variance",
      "Coefficient of Variation (CV)",
      "Interquartile Range (IQR)"
    ],
    correctIndex: 2,
    correctAnswer: "Coefficient of Variation (CV)",
    explanation: "Coefficient of Variation (CV = standard deviation / mean * 100%) is dimensionless, allowing comparison of variability across surveys with different units."
  }
];

// Additional question pool for re-taking or targeted testing
const EXTENDED_QUESTION_POOL = [
  {
    id: "QB-EXT-DH-01",
    topic: "Data Handling",
    subtopic: "Pandas operations",
    difficulty: "Intermediate",
    question: "Which Pandas function is used to concatenate or join two DataFrames along a specific axis (rows or columns)?",
    options: [
      "pd.concat()",
      "pd.attach()",
      "pd.unite()",
      "pd.append_all()"
    ],
    correctIndex: 0,
    correctAnswer: "pd.concat()",
    explanation: "pd.concat() performs concatenation operations along an axis while performing optional set logic."
  },
  {
    id: "QB-EXT-DH-02",
    topic: "Data Handling",
    subtopic: "Data Manipulation",
    difficulty: "Intermediate",
    question: "Which Pandas method allows grouping survey responses by State and calculating the mean household income?",
    options: [
      "df.cluster('State')['Income'].mean()",
      "df.groupby('State')['Income'].mean()",
      "df.aggregate_by('State', mean='Income')",
      "df.split('State').average('Income')"
    ],
    correctIndex: 1,
    correctAnswer: "df.groupby('State')['Income'].mean()",
    explanation: "df.groupby() implements the split-apply-combine strategy for data analysis in Pandas."
  },
  {
    id: "QB-EXT-PY-01",
    topic: "Python Basics",
    subtopic: "Functions and lambda expressions",
    difficulty: "Beginner",
    question: "What keyword is used in Python to define an anonymous, single-line inline function?",
    options: ["def", "lambda", "inline", "anonymous"],
    correctIndex: 1,
    correctAnswer: "lambda",
    explanation: "The lambda keyword is used to create small anonymous functions."
  },
  {
    id: "QB-EXT-ST-01",
    topic: "Statistics",
    subtopic: "Sampling theory & stratified design",
    difficulty: "Intermediate",
    question: "What is the standard formula for Sample Variance (s²) for n observations with sample mean x̄?",
    options: [
      "Σ(x - x̄)² / n",
      "Σ(x - x̄)² / (n - 1)",
      "√[Σ(x - x̄)² / n]",
      "Σ|x - x̄| / (n - 1)"
    ],
    correctIndex: 1,
    correctAnswer: "Σ(x - x̄)² / (n - 1)",
    explanation: "Sample variance divides by (n-1) (Bessel's correction) to provide an unbiased estimate of the population variance."
  },
  {
    id: "QB-EXT-DV-01",
    topic: "Data Visualization",
    subtopic: "Matplotlib & Seaborn styling",
    difficulty: "Beginner",
    question: "Which Matplotlib method is used to save a rendered chart to a file such as a PNG or PDF?",
    options: ["plt.export()", "plt.savefig()", "plt.write_image()", "plt.download()"],
    correctIndex: 1,
    correctAnswer: "plt.savefig()",
    explanation: "plt.savefig('filename.png') writes the current figure to disk."
  }
];

window.QUESTION_BANK = QUESTION_BANK;
window.EXTENDED_QUESTION_POOL = EXTENDED_QUESTION_POOL;
