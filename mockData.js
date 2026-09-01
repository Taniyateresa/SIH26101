/**
 * STATS AI - Mock Data & Initial Profiles
 * Ministry of Statistics & Programme Implementation (MoSPI)
 */

const STATS_DATA = {
  // Employee Profiles
  profiles: [
    {
      id: "EMP-MOSPI-1082",
      name: "Ramesh Kumar",
      designation: "Senior Statistical Officer",
      department: "National Statistical Systems Training Academy (NSSTA)",
      ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
      email: "ramesh.kumar@mospi.gov.in",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      experienceYears: 6,
      batch: "ISS Batch 2018",
      zone: "HQ - New Delhi",
      baselineCompetencies: {
        "Python Basics": 70,
        "Data Handling": 45,
        "Data Visualization": 55,
        "Statistics": 65,
        "AI/ML": 40,
        "GIS": 50,
        "Statistical Computing": 60
      },
      currentCompetencies: {
        "Python Basics": 70,
        "Data Handling": 45,
        "Data Visualization": 55,
        "Statistics": 65,
        "AI/ML": 40,
        "GIS": 50,
        "Statistical Computing": 60
      }
    },
    {
      id: "EMP-MOSPI-2041",
      name: "Dr. Ananya Iyer",
      designation: "Assistant Director (Data Analytics)",
      department: "Data Quality & Innovation Division",
      ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
      email: "ananya.iyer@mospi.gov.in",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      experienceYears: 4,
      batch: "ISS Batch 2020",
      zone: "Kolkata Hub",
      baselineCompetencies: {
        "Python Basics": 85,
        "Data Handling": 60,
        "Data Visualization": 75,
        "Statistics": 80,
        "AI/ML": 65,
        "GIS": 45,
        "Statistical Computing": 70
      },
      currentCompetencies: {
        "Python Basics": 85,
        "Data Handling": 60,
        "Data Visualization": 75,
        "Statistics": 80,
        "AI/ML": 65,
        "GIS": 45,
        "Statistical Computing": 70
      }
    },
    {
      id: "EMP-MOSPI-3199",
      name: "Vikramaditya Rao",
      designation: "Deputy Director (Field Operations)",
      department: "Field Operations Division (FOD)",
      ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
      email: "vikram.rao@mospi.gov.in",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      experienceYears: 9,
      batch: "ISS Batch 2015",
      zone: "Hyderabad Regional Office",
      baselineCompetencies: {
        "Python Basics": 50,
        "Data Handling": 40,
        "Data Visualization": 60,
        "Statistics": 90,
        "AI/ML": 30,
        "GIS": 70,
        "Statistical Computing": 55
      },
      currentCompetencies: {
        "Python Basics": 50,
        "Data Handling": 40,
        "Data Visualization": 60,
        "Statistics": 90,
        "AI/ML": 30,
        "GIS": 70,
        "Statistical Computing": 55
      }
    }
  ],

  // Role benchmarks
  roleRequirements: {
    "Senior Statistical Officer": {
      "Statistics": 85,
      "Python Basics": 80,
      "Data Handling": 85,
      "Data Visualization": 75,
      "Statistical Computing": 80,
      "AI/ML": 60,
      "GIS": 65
    }
  },

  // Pre-Assessment Initial Course Recommendations
  initialRecommendations: [
    {
      id: "REC-INIT-1",
      title: "Foundations of National Statistical Surveys",
      provider: "NSSTA - National Academy",
      duration: "12 Hours",
      level: "Intermediate",
      targetCompetency: "Statistics",
      description: "Core methodologies in stratified sampling, error minimization, and census data collection frameworks for government statistical systems.",
      badge: "Mandatory MoSPI Core",
      progress: 60
    },
    {
      id: "REC-INIT-2",
      title: "Applied Statistical Computing with Python",
      provider: "iGOT Karmayogi",
      duration: "18 Hours",
      level: "Beginner to Intermediate",
      targetCompetency: "Statistical Computing",
      description: "Automating tabular aggregation, standard deviation computations, and index number generation using modern script pipelines.",
      badge: "iGOT Flagship",
      progress: 40
    },
    {
      id: "REC-INIT-3",
      title: "GIS & Spatial Analytics for District-Level Indicators",
      provider: "iGOT Karmayogi / ISRO-MoSPI Joint Wing",
      duration: "15 Hours",
      level: "Intermediate",
      targetCompetency: "GIS",
      description: "Mapping socioeconomic indicators, geocoding enumeration blocks, and thematic choropleth generation.",
      badge: "Digital India Track",
      progress: 25
    }
  ],

  // Initial Assessment History
  initialHistory: [
    {
      id: "ASSESS-001",
      title: "Assessment 1 - Baseline Officer Competency Exam",
      date: "15-Aug-2026, 11:30 AM",
      overallScore: 62,
      totalQuestions: 10,
      correctAnswers: 6,
      strongestTopic: "Statistics",
      strongestScore: 80,
      primarySkillGap: "Data Handling",
      primaryGapScore: 33,
      status: "COMPLETED",
      topicBreakdown: {
        "Statistics": 80,
        "Python Basics": 60,
        "Data Handling": 33,
        "Data Visualization": 50
      }
    }
  ]
};

// Export to window for global access
window.STATS_DATA = STATS_DATA;
