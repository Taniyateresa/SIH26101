/**
 * STATS AI - Core Assessment & Competency Analytics Engine
 * Calculates real mathematically verified scores, identifies primary skill gaps & subtopic weaknesses.
 */

class AssessmentEngine {
  /**
   * Evaluates user responses against the question bank.
   * @param {Array} questions - Array of question objects
   * @param {Object} userAnswers - Map of { questionId: selectedOptionIndex }
   * @returns {Object} Complete evaluation report
   */
  static evaluateAssessment(questions, userAnswers) {
    const totalQuestions = questions.length;
    let totalCorrect = 0;
    
    // Topic aggregates: { [topicName]: { total: number, correct: number, subtopics: Set } }
    const topicStats = {};
    const subtopicWeaknesses = new Set();
    const detailedResults = [];

    questions.forEach((q, index) => {
      const selectedIndex = userAnswers[q.id];
      const isAttempted = selectedIndex !== undefined && selectedIndex !== null;
      const isCorrect = isAttempted && selectedIndex === q.correctIndex;

      if (isCorrect) {
        totalCorrect++;
      } else {
        // If wrong answer or unattempted, record the actual subtopic as an area requiring improvement
        if (q.subtopic) {
          subtopicWeaknesses.add(q.subtopic);
        }
      }

      // Initialize topic tracking
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = {
          topic: q.topic,
          total: 0,
          correct: 0,
          questions: []
        };
      }

      topicStats[q.topic].total += 1;
      if (isCorrect) {
        topicStats[q.topic].correct += 1;
      }
      topicStats[q.topic].questions.push({
        id: q.id,
        subtopic: q.subtopic,
        isCorrect: isCorrect,
        userAnswer: isAttempted ? q.options[selectedIndex] : "Not Attempted",
        correctAnswer: q.options[q.correctIndex]
      });

      detailedResults.push({
        questionNumber: index + 1,
        id: q.id,
        topic: q.topic,
        subtopic: q.subtopic,
        question: q.question,
        options: q.options,
        userAnswerIndex: selectedIndex,
        userAnswerText: isAttempted ? q.options[selectedIndex] : "Not Attempted",
        correctAnswerIndex: q.correctIndex,
        correctAnswerText: q.options[q.correctIndex],
        isCorrect: isCorrect,
        explanation: q.explanation
      });
    });

    // 1. Calculate Overall Score
    const overallScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    // 2. Calculate Topic-wise Scores & Categories
    const topicBreakdown = [];
    let lowestScore = 101;
    let highestScore = -1;

    Object.keys(topicStats).forEach(topicName => {
      const stat = topicStats[topicName];
      const score = Math.round((stat.correct / stat.total) * 100);
      const categoryInfo = this.getPerformanceCategory(score);

      if (score < lowestScore) {
        lowestScore = score;
      }
      if (score > highestScore) {
        highestScore = score;
      }

      topicBreakdown.push({
        topic: topicName,
        totalQuestions: stat.total,
        correctAnswers: stat.correct,
        score: score,
        category: categoryInfo.name,
        categoryClass: categoryInfo.badgeClass,
        barColor: categoryInfo.barColor,
        description: categoryInfo.description
      });
    });

    // 3. Identify Primary Skill Gap(s) (handles ties dynamically)
    const primarySkillGaps = topicBreakdown.filter(t => t.score === lowestScore);
    const strongestCompetencies = topicBreakdown.filter(t => t.score === highestScore);

    // Primary gap explanation
    let primaryGapExplanation = "";
    if (primarySkillGaps.length === 1) {
      primaryGapExplanation = `Your assessment indicates that ${primarySkillGaps[0].topic} is currently your weakest competency (${primarySkillGaps[0].score}%). Additional learning in this area is recommended.`;
    } else {
      const gapNames = primarySkillGaps.map(g => `${g.topic} (${g.score}%)`).join(" and ");
      primaryGapExplanation = `Your assessment indicates that ${gapNames} are currently your lowest scoring competencies. Targeted learning in these areas is recommended.`;
    }

    // 4. Construct Full Evaluation Report
    const report = {
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      totalQuestions: totalQuestions,
      attemptedCount: Object.keys(userAnswers).length,
      correctCount: totalCorrect,
      incorrectCount: totalQuestions - totalCorrect,
      overallScore: overallScore,
      topicBreakdown: topicBreakdown,
      primarySkillGaps: primarySkillGaps,
      primarySkillGap: primarySkillGaps[0], // primary single
      primaryGapExplanation: primaryGapExplanation,
      strongestCompetencies: strongestCompetencies,
      strongestCompetency: strongestCompetencies[0],
      subtopicWeaknesses: Array.from(subtopicWeaknesses),
      detailedResults: detailedResults
    };

    return report;
  }

  /**
   * Performance Category thresholds:
   * 80–100% -> STRONG
   * 60–79%  -> GOOD / MINOR IMPROVEMENT
   * 40–59%  -> NEEDS IMPROVEMENT
   * 0–39%   -> CRITICAL SKILL GAP
   */
  static getPerformanceCategory(score) {
    if (score >= 80) {
      return {
        name: "STRONG",
        badgeClass: "badge-strong",
        barColor: "bg-emerald-500",
        textColor: "text-emerald-400",
        description: "Demonstrates comprehensive proficiency and mastery in this domain."
      };
    } else if (score >= 60) {
      return {
        name: "GOOD",
        badgeClass: "badge-good",
        barColor: "bg-blue-500",
        textColor: "text-blue-400",
        description: "Solid conceptual foundation with minor areas for refinement."
      };
    } else if (score >= 40) {
      return {
        name: "NEEDS IMPROVEMENT",
        badgeClass: "badge-needs-imp",
        barColor: "bg-amber-500",
        textColor: "text-amber-400",
        description: "Moderate knowledge gap. Targeted module completion required."
      };
    } else {
      return {
        name: "CRITICAL SKILL GAP",
        badgeClass: "badge-critical",
        barColor: "bg-red-500",
        textColor: "text-red-400",
        description: "Significant knowledge gap detected. Immediate intervention and training required."
      };
    }
  }

  /**
   * Syncs latest assessment scores into the employee's competency profile
   */
  static updateEmployeeCompetencyProfile(profile, evaluationReport) {
    const updatedProfile = JSON.parse(JSON.stringify(profile));
    
    // Store before assessment scores snapshot if not present
    if (!updatedProfile.beforeAssessmentCompetencies) {
      updatedProfile.beforeAssessmentCompetencies = { ...updatedProfile.baselineCompetencies };
    }

    // Apply new topic scores from real assessment
    evaluationReport.topicBreakdown.forEach(item => {
      updatedProfile.currentCompetencies[item.topic] = item.score;
    });

    updatedProfile.latestAssessment = {
      overallScore: evaluationReport.overallScore,
      timestamp: evaluationReport.formattedDate,
      primarySkillGap: evaluationReport.primarySkillGap.topic,
      primarySkillGapScore: evaluationReport.primarySkillGap.score,
      strongestTopic: evaluationReport.strongestCompetency.topic,
      strongestScore: evaluationReport.strongestCompetency.score
    };

    return updatedProfile;
  }
}

window.AssessmentEngine = AssessmentEngine;
