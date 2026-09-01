/**
 * STATS AI - Main Application Controller
 * Handles routing, state persistence, assessment execution, analytics rendering, and iGOT integration.
 */

const App = {
  currentView: 'login',
  currentProfile: null,
  activeQuizIndex: 0,
  activeQuestions: [],
  userAnswers: {},
  latestReport: null,
  assessmentHistory: [],
  competencyChartInstance: null,
  chartType: 'bar',

  /**
   * Application Initialization
   */
  init() {
    this.loadStateFromStorage();
    this.populateLoginProfiles();
    this.setupEventListeners();
    
    // Check initial view or default to login
    if (!this.currentProfile) {
      this.navigateTo('login');
    } else {
      this.updateNavbarUser();
      this.navigateTo(this.currentView || 'profile');
    }

    // Refresh icons
    if (window.lucide) {
      lucide.createIcons();
    }
  },

  /**
   * Load state from localStorage
   */
  loadStateFromStorage() {
    try {
      const savedProfile = localStorage.getItem('stats_ai_active_profile');
      if (savedProfile) {
        this.currentProfile = JSON.parse(savedProfile);
      } else if (window.STATS_DATA && window.STATS_DATA.profiles) {
        this.currentProfile = JSON.parse(JSON.stringify(window.STATS_DATA.profiles[0]));
      }

      const savedReport = localStorage.getItem('stats_ai_latest_report');
      if (savedReport) {
        this.latestReport = JSON.parse(savedReport);
      }

      const savedHistory = localStorage.getItem('stats_ai_assessment_history');
      if (savedHistory) {
        this.assessmentHistory = JSON.parse(savedHistory);
      } else if (window.STATS_DATA && window.STATS_DATA.initialHistory) {
        this.assessmentHistory = JSON.parse(JSON.stringify(window.STATS_DATA.initialHistory));
      }

      const savedAnswers = localStorage.getItem('stats_ai_quiz_answers');
      if (savedAnswers) {
        this.userAnswers = JSON.parse(savedAnswers);
      }

      this.activeQuestions = window.QUESTION_BANK ? [...window.QUESTION_BANK] : [];
    } catch (e) {
      console.warn("Storage loading error:", e);
    }
  },

  /**
   * Save state to localStorage
   */
  saveStateToStorage() {
    try {
      if (this.currentProfile) {
        localStorage.setItem('stats_ai_active_profile', JSON.stringify(this.currentProfile));
      }
      if (this.latestReport) {
        localStorage.setItem('stats_ai_latest_report', JSON.stringify(this.latestReport));
      }
      if (this.assessmentHistory) {
        localStorage.setItem('stats_ai_assessment_history', JSON.stringify(this.assessmentHistory));
      }
      localStorage.setItem('stats_ai_quiz_answers', JSON.stringify(this.userAnswers));
    } catch (e) {
      console.warn("Storage saving error:", e);
    }
  },

  /**
   * Populate Login Officer Profiles Dropdown
   */
  populateLoginProfiles() {
    const select = document.getElementById('login-officer-select');
    if (!select || !window.STATS_DATA) return;
    
    select.innerHTML = '';
    window.STATS_DATA.profiles.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = `${p.name} — ${p.designation} (${p.department.split('(')[0].trim()})`;
      if (this.currentProfile && this.currentProfile.id === p.id) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  },

  /**
   * Setup Event Listeners
   */
  setupEventListeners() {
    // Keyboard navigation for quiz
    document.addEventListener('keydown', (e) => {
      if (this.currentView === 'quiz') {
        if (e.key === 'ArrowRight') this.nextQuestion();
        if (e.key === 'ArrowLeft') this.prevQuestion();
      }
    });
  },

  /**
   * Navigation Controller
   */
  navigateTo(viewId) {
    this.currentView = viewId;
    
    // Hide all views
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.add('hidden');
    });

    // Show target view
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.remove('hidden');
    }

    // Update Stepper styling
    this.updateStepper(viewId);

    // Render view-specific data
    switch (viewId) {
      case 'login':
        document.getElementById('nav-user-chip')?.classList.add('hidden');
        document.getElementById('btn-quick-demo')?.classList.add('hidden');
        break;
      case 'profile':
        this.renderProfileView();
        break;
      case 'skill-gap':
        this.renderSkillGapView();
        break;
      case 'recommendation':
        this.renderInitialRecommendations();
        break;
      case 'quiz':
        this.renderQuizView();
        break;
      case 'topic-result':
        this.renderTopicResultView();
        break;
      case 'personalized-recommendation':
        this.renderPersonalizedRecommendations();
        break;
      case 'dashboard':
        this.renderDashboardView();
        break;
    }

    if (viewId !== 'login') {
      document.getElementById('nav-user-chip')?.classList.remove('hidden');
      document.getElementById('btn-quick-demo')?.classList.remove('hidden');
      this.updateNavbarUser();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) lucide.createIcons();
  },

  /**
   * Updates Stepper Navigation Bar
   */
  updateStepper(activeStep) {
    const stepOrder = ['login', 'profile', 'skill-gap', 'recommendation', 'quiz', 'topic-result', 'personalized-recommendation', 'dashboard'];
    const activeIndex = stepOrder.indexOf(activeStep);

    document.querySelectorAll('.step-item').forEach(item => {
      const stepName = item.getAttribute('data-step');
      const stepIndex = stepOrder.indexOf(stepName);

      item.classList.remove('active', 'completed');
      
      if (stepIndex === activeIndex) {
        item.classList.add('active');
      } else if (stepIndex < activeIndex) {
        item.classList.add('completed');
      }
    });
  },

  /**
   * Update top user badge
   */
  updateNavbarUser() {
    if (!this.currentProfile) return;
    const nameEl = document.getElementById('nav-user-name');
    const roleEl = document.getElementById('nav-user-role');
    const avatarEl = document.getElementById('nav-user-avatar');

    if (nameEl) nameEl.textContent = this.currentProfile.name;
    if (roleEl) roleEl.textContent = `${this.currentProfile.designation.split('(')[0].trim()}`;
    if (avatarEl) {
      const initials = this.currentProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2);
      avatarEl.textContent = initials;
    }
  },

  /**
   * Handle Login Action
   */
  handleLogin() {
    const select = document.getElementById('login-officer-select');
    const selectedId = select ? select.value : 'EMP-MOSPI-1082';
    const profile = window.STATS_DATA.profiles.find(p => p.id === selectedId) || window.STATS_DATA.profiles[0];
    
    this.currentProfile = JSON.parse(JSON.stringify(profile));
    this.saveStateToStorage();
    this.showToast(`Logged in as ${this.currentProfile.name}`, 'success');
    this.navigateTo('profile');
  },

  /**
   * Reset to Login / Log out
   */
  resetToLogin() {
    this.navigateTo('login');
    this.showToast('Officer session ended. Returned to login portal.', 'info');
  },

  /**
   * 1. Render Profile View
   */
  renderProfileView() {
    if (!this.currentProfile) return;

    document.getElementById('profile-name').textContent = this.currentProfile.name;
    document.getElementById('profile-designation').textContent = this.currentProfile.designation;
    document.getElementById('profile-id').textContent = this.currentProfile.id;
    document.getElementById('profile-dept').textContent = this.currentProfile.department;
    document.getElementById('profile-batch').textContent = this.currentProfile.batch;
    document.getElementById('profile-exp').textContent = `${this.currentProfile.experienceYears} Years`;
    document.getElementById('profile-zone').textContent = this.currentProfile.zone;
    
    const initials = this.currentProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    document.getElementById('profile-avatar').textContent = initials;

    // Render baseline competency list
    const container = document.getElementById('baseline-competency-list');
    if (!container) return;
    container.innerHTML = '';

    const competencies = this.currentProfile.baselineCompetencies;
    Object.keys(competencies).forEach(skill => {
      const score = competencies[skill];
      const category = AssessmentEngine.getPerformanceCategory(score);

      const div = document.createElement('div');
      div.className = 'space-y-1.5';
      div.innerHTML = `
        <div class="flex items-center justify-between text-xs">
          <span class="font-medium text-slate-200">${skill}</span>
          <div class="flex items-center space-x-2">
            <span class="font-mono font-bold text-slate-100">${score}%</span>
            <span class="${category.badgeClass} px-2 py-0.5 rounded text-[10px] font-bold">${category.name}</span>
          </div>
        </div>
        <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div class="h-full rounded-full ${category.barColor} progress-fill" style="width: ${score}%"></div>
        </div>
      `;
      container.appendChild(div);
    });
  },

  /**
   * 2. Render Skill Gap View
   */
  renderSkillGapView() {
    if (!this.currentProfile) return;

    const tbody = document.getElementById('skill-gap-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const requirements = window.STATS_DATA.roleRequirements["Senior Statistical Officer"] || {};
    const baseline = this.currentProfile.baselineCompetencies;

    Object.keys(requirements).forEach(skill => {
      const required = requirements[skill];
      const current = baseline[skill] || 50;
      const gap = required - current;
      
      let gapBadge = '';
      if (gap > 20) {
        gapBadge = `<span class="badge-critical px-2 py-0.5 rounded text-[10px] font-bold">-${gap}% Gap (Critical)</span>`;
      } else if (gap > 0) {
        gapBadge = `<span class="badge-needs-imp px-2 py-0.5 rounded text-[10px] font-bold">-${gap}% Gap</span>`;
      } else {
        gapBadge = `<span class="badge-strong px-2 py-0.5 rounded text-[10px] font-bold">Role Aligned (+${Math.abs(gap)}%)</span>`;
      }

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-800/40 transition';
      tr.innerHTML = `
        <td class="py-3 px-4 font-medium text-white">${skill}</td>
        <td class="py-3 px-3 font-mono text-blue-400 font-bold">${required}%</td>
        <td class="py-3 px-3 font-mono text-slate-300">${current}%</td>
        <td class="py-3 px-3">${gapBadge}</td>
      `;
      tbody.appendChild(tr);
    });
  },

  /**
   * 3. Render Initial Recommendations View
   */
  renderInitialRecommendations() {
    const grid = document.getElementById('initial-recommendation-grid');
    if (!grid || !window.STATS_DATA) return;
    grid.innerHTML = '';

    window.STATS_DATA.initialRecommendations.forEach(rec => {
      const card = document.createElement('div');
      card.className = 'glass-card rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between space-y-4';
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 border border-blue-700/40">${rec.badge}</span>
            <span class="text-xs text-slate-400">${rec.duration}</span>
          </div>
          <h3 class="text-base font-bold text-white mb-2">${rec.title}</h3>
          <p class="text-xs text-slate-400 leading-relaxed">${rec.description}</p>
        </div>
        <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span class="text-xs text-blue-400 font-medium">${rec.provider}</span>
          <button onclick="App.navigateTo('quiz')" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition">
            Start Exam
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  },

  /**
   * 4. Render Quiz View
   */
  renderQuizView() {
    if (!this.activeQuestions || this.activeQuestions.length === 0) {
      this.activeQuestions = window.QUESTION_BANK ? [...window.QUESTION_BANK] : [];
    }

    this.renderQuestion(this.activeQuizIndex);
    this.renderQuestionPalette();
  },

  /**
   * Render single question by index
   */
  renderQuestion(index) {
    if (index < 0 || index >= this.activeQuestions.length) return;
    this.activeQuizIndex = index;
    const q = this.activeQuestions[index];

    // Progress label
    const progressLabel = document.getElementById('question-progress-label');
    if (progressLabel) {
      progressLabel.textContent = `Question ${index + 1} of ${this.activeQuestions.length}`;
    }

    // Question text (Internal topic tag is HIDDEN from candidate)
    const questionTextEl = document.getElementById('quiz-question-text');
    if (questionTextEl) {
      questionTextEl.textContent = q.question;
    }

    // Render Options
    const optionsContainer = document.getElementById('quiz-options-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const selectedAnswer = this.userAnswers[q.id];

      q.options.forEach((opt, optIndex) => {
        const isSelected = selectedAnswer === optIndex;
        const btn = document.createElement('button');
        btn.className = `quiz-option-btn w-full text-left p-4 rounded-xl border text-xs font-medium flex items-center space-x-3 transition ${
          isSelected 
            ? 'selected bg-blue-600/20 border-blue-500 text-white font-semibold' 
            : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:text-white'
        }`;
        
        btn.onclick = () => this.selectOption(q.id, optIndex);

        const letter = String.fromCharCode(65 + optIndex);
        btn.innerHTML = `
          <span class="w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'
          }">${letter}</span>
          <span class="flex-1">${opt}</span>
        `;
        optionsContainer.appendChild(btn);
      });
    }

    // Update navigation buttons
    const prevBtn = document.getElementById('btn-prev-question');
    const nextBtn = document.getElementById('btn-next-question');
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === this.activeQuestions.length - 1;

    this.renderQuestionPalette();
  },

  /**
   * Select Option for Question
   */
  selectOption(questionId, optionIndex) {
    this.userAnswers[questionId] = optionIndex;
    this.saveStateToStorage();
    this.renderQuestion(this.activeQuizIndex);
  },

  nextQuestion() {
    if (this.activeQuizIndex < this.activeQuestions.length - 1) {
      this.renderQuestion(this.activeQuizIndex + 1);
    }
  },

  prevQuestion() {
    if (this.activeQuizIndex > 0) {
      this.renderQuestion(this.activeQuizIndex - 1);
    }
  },

  /**
   * Render Question Palette Grid
   */
  renderQuestionPalette() {
    const grid = document.getElementById('quiz-palette-grid');
    if (!grid) return;
    grid.innerHTML = '';

    this.activeQuestions.forEach((q, idx) => {
      const isAnswered = this.userAnswers[q.id] !== undefined && this.userAnswers[q.id] !== null;
      const isCurrent = idx === this.activeQuizIndex;

      const circle = document.createElement('button');
      circle.className = `w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition ${
        isCurrent
          ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-md shadow-blue-500/30'
          : isAnswered
          ? 'bg-blue-900/60 border border-blue-600 text-blue-200'
          : 'bg-slate-900 border border-slate-700 text-slate-400 hover:border-slate-500'
      }`;
      circle.textContent = idx + 1;
      circle.onclick = () => this.renderQuestion(idx);
      grid.appendChild(circle);
    });
  },

  /**
   * Auto-fill realistic demo answers (8 correct out of 10 = 80%)
   * Intentionally misses 2 questions in Data Handling (e.g. Missing-value handling & Data cleaning)
   * Result: Python Basics: 100%, Data Handling: 33% (CRITICAL GAP), Data Visualization: 100% or 50%, Statistics: 100% or 67%
   */
  autoFillQuizAnswers(showNotification = true) {
    if (!this.activeQuestions || this.activeQuestions.length === 0) {
      this.activeQuestions = window.QUESTION_BANK ? [...window.QUESTION_BANK] : [];
    }

    this.userAnswers = {};

    this.activeQuestions.forEach(q => {
      if (q.topic === "Data Handling") {
        if (q.subtopic === "Missing-value handling" || q.subtopic === "Data cleaning & transformation") {
          // Intentionally select wrong answer
          this.userAnswers[q.id] = (q.correctIndex + 1) % q.options.length;
        } else {
          // Correct answer for Pandas operations
          this.userAnswers[q.id] = q.correctIndex;
        }
      } else {
        // Correct answer for other topics
        this.userAnswers[q.id] = q.correctIndex;
      }
    });

    this.saveStateToStorage();
    this.renderQuestion(this.activeQuizIndex);

    if (showNotification) {
      this.showToast('Demo: Auto-filled 8/10 answers (Data Handling set to 33% gap)', 'info');
    }
  },

  /**
   * Submit Assessment Exam
   */
  submitAssessment() {
    const unattempted = this.activeQuestions.filter(q => this.userAnswers[q.id] === undefined).length;
    if (unattempted > 0) {
      if (!confirm(`You have ${unattempted} unattempted question(s). Are you sure you want to submit?`)) {
        return;
      }
    }

    // 1. Evaluate with AssessmentEngine
    const report = AssessmentEngine.evaluateAssessment(this.activeQuestions, this.userAnswers);
    this.latestReport = report;

    // 2. Update employee's competency profile
    if (this.currentProfile) {
      this.currentProfile = AssessmentEngine.updateEmployeeCompetencyProfile(this.currentProfile, report);
    }

    // 3. Append to assessment history
    const historyItem = {
      id: `ASSESS-00${this.assessmentHistory.length + 1}`,
      title: `Assessment ${this.assessmentHistory.length + 1} - Statistical Competency Exam`,
      date: report.formattedDate,
      overallScore: report.overallScore,
      totalQuestions: report.totalQuestions,
      correctAnswers: report.correctCount,
      strongestTopic: report.strongestCompetency.topic,
      strongestScore: report.strongestCompetency.score,
      primarySkillGap: report.primarySkillGap.topic,
      primaryGapScore: report.primarySkillGap.score,
      status: "COMPLETED",
      topicBreakdown: {}
    };
    report.topicBreakdown.forEach(t => {
      historyItem.topicBreakdown[t.topic] = t.score;
    });
    this.assessmentHistory.unshift(historyItem);

    // 4. Save state and navigate to results view
    this.saveStateToStorage();
    this.showToast('Assessment submitted! Competencies calculated.', 'success');
    this.navigateTo('topic-result');
  },

  /**
   * 5. Render Topic-Wise Result View
   */
  renderTopicResultView() {
    if (!this.latestReport) {
      // If no report yet, run evaluation with current answers
      this.latestReport = AssessmentEngine.evaluateAssessment(this.activeQuestions, this.userAnswers);
    }

    const report = this.latestReport;

    // Metric cards
    document.getElementById('result-overall-score').textContent = `${report.overallScore}%`;
    document.getElementById('result-attempted-count').textContent = `${report.attemptedCount} / ${report.totalQuestions}`;
    document.getElementById('result-correct-count').textContent = `${report.correctCount}`;
    document.getElementById('result-incorrect-count').textContent = `${report.incorrectCount}`;

    const scoreBadge = document.getElementById('result-score-badge');
    if (scoreBadge) {
      const cat = AssessmentEngine.getPerformanceCategory(report.overallScore);
      scoreBadge.textContent = cat.name;
      scoreBadge.className = `text-[11px] font-bold ${cat.textColor}`;
    }

    // Topic breakdown list
    const breakdownContainer = document.getElementById('topic-breakdown-container');
    if (breakdownContainer) {
      breakdownContainer.innerHTML = '';

      report.topicBreakdown.forEach(item => {
        const row = document.createElement('div');
        row.className = 'space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80';
        row.innerHTML = `
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center space-x-2">
              <span class="font-bold text-slate-100">${item.topic}</span>
              <span class="text-slate-400 font-mono text-[11px]">(${item.correctAnswers} / ${item.totalQuestions} correct)</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="font-mono font-extrabold text-sm text-white">${item.score}%</span>
              <span class="${item.categoryClass} px-2 py-0.5 rounded text-[10px] font-bold">${item.category}</span>
            </div>
          </div>
          <div class="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
            <div class="h-full rounded-full ${item.barColor} progress-fill" style="width: ${item.score}%"></div>
          </div>
        `;
        breakdownContainer.appendChild(row);
      });
    }

    // Primary Skill Gap Card (handles ties dynamically)
    const gapCard = document.getElementById('primary-skill-gap-card');
    const gapTitle = document.getElementById('primary-gap-title');
    const gapScore = document.getElementById('primary-gap-score');
    const gapBadge = document.getElementById('primary-gap-badge');
    const gapExpl = document.getElementById('primary-gap-explanation');

    if (report.primarySkillGaps.length > 1) {
      const names = report.primarySkillGaps.map(g => g.topic).join(' & ');
      if (gapTitle) gapTitle.textContent = names;
      if (gapScore) gapScore.textContent = `Lowest Score: ${report.primarySkillGaps[0].score}% (Tie)`;
      if (gapBadge) gapBadge.textContent = report.primarySkillGaps[0].category;
      if (gapExpl) gapExpl.textContent = report.primaryGapExplanation;
    } else {
      const primary = report.primarySkillGap;
      if (gapTitle) gapTitle.textContent = primary.topic;
      if (gapScore) gapScore.textContent = `Score: ${primary.score}%`;
      if (gapBadge) {
        gapBadge.textContent = primary.category;
        gapBadge.className = `${primary.categoryClass} px-2 py-0.5 rounded text-[11px] font-bold`;
      }
      if (gapExpl) gapExpl.textContent = report.primaryGapExplanation;
    }

    // Subtopic Weaknesses list (strictly from actual wrong answers)
    const subtopicList = document.getElementById('subtopic-weaknesses-list');
    if (subtopicList) {
      subtopicList.innerHTML = '';
      if (report.subtopicWeaknesses.length === 0) {
        subtopicList.innerHTML = `<li class="text-xs text-emerald-400 flex items-center space-x-2"><i data-lucide="check-circle" class="w-4 h-4"></i><span>No critical subtopic deficiencies identified. Excellent performance!</span></li>`;
      } else {
        report.subtopicWeaknesses.forEach(sub => {
          const li = document.createElement('li');
          li.className = 'flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800';
          li.innerHTML = `
            <span class="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
            <span class="font-medium text-slate-200">${sub}</span>
          `;
          subtopicList.appendChild(li);
        });
      }
    }

    // Question review accordion
    this.renderReviewAccordion(report.detailedResults);
  },

  /**
   * Render Question Review Accordion
   */
  renderReviewAccordion(details) {
    const container = document.getElementById('review-accordion-content');
    if (!container) return;
    container.innerHTML = '';

    details.forEach(item => {
      const div = document.createElement('div');
      div.className = `p-4 rounded-xl border text-xs space-y-2 ${
        item.isCorrect 
          ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-200' 
          : 'bg-red-950/20 border-red-800/40 text-slate-200'
      }`;

      div.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-bold text-white">Q${item.questionNumber}: ${item.topic} • <span class="text-slate-400 font-normal">${item.subtopic}</span></span>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
            item.isCorrect ? 'badge-strong' : 'badge-critical'
          }">${item.isCorrect ? 'CORRECT' : 'INCORRECT'}</span>
        </div>
        <p class="font-medium text-slate-100">${item.question}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
          <div class="p-2 rounded bg-slate-900/70 border border-slate-800">
            <span class="text-slate-400">Your Answer:</span>
            <span class="${item.isCorrect ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}">${item.userAnswerText}</span>
          </div>
          <div class="p-2 rounded bg-slate-900/70 border border-slate-800">
            <span class="text-slate-400">Correct Answer:</span>
            <span class="text-emerald-400 font-bold">${item.correctAnswerText}</span>
          </div>
        </div>
        <p class="text-[11px] text-slate-400 bg-slate-900/40 p-2.5 rounded border border-slate-800/60 leading-relaxed">
          <strong class="text-blue-300">Explanation:</strong> ${item.explanation}
        </p>
      `;
      container.appendChild(div);
    });
  },

  toggleReviewAccordion() {
    const content = document.getElementById('review-accordion-content');
    const icon = document.getElementById('review-accordion-icon');
    if (!content) return;

    if (content.classList.contains('hidden')) {
      content.classList.remove('hidden');
      if (icon) icon.style.transform = 'rotate(180deg)';
    } else {
      content.classList.add('hidden');
      if (icon) icon.style.transform = 'rotate(0deg)';
    }
  },

  /**
   * 6. Render Personalized Recommendations View
   */
  renderPersonalizedRecommendations() {
    if (!this.latestReport) {
      this.latestReport = AssessmentEngine.evaluateAssessment(this.activeQuestions, this.userAnswers);
    }

    const report = this.latestReport;
    const primaryTopic = report.primarySkillGap.topic;
    const primaryScore = report.primarySkillGap.score;

    document.getElementById('recom-gap-pill').textContent = `${primaryTopic} — ${primaryScore}%`;
    document.getElementById('recom-learning-path-title').textContent = `Recommended Learning Path for ${primaryTopic}`;
    document.getElementById('recom-learning-path-desc').textContent = `Custom-tailored because ${primaryTopic} was identified as your primary skill gap (${primaryScore}%).`;

    const container = document.getElementById('personalized-courses-container');
    if (!container || !window.COURSE_CATALOG) return;
    container.innerHTML = '';

    const courses = window.COURSE_CATALOG[primaryTopic] || window.COURSE_CATALOG["Data Handling"] || [];

    courses.forEach(course => {
      const card = document.createElement('div');
      card.className = 'glass-card rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition';
      
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-700/40">${course.tag}</span>
            <span class="text-xs text-slate-400 font-mono">${course.duration}</span>
          </div>

          <h3 class="text-base font-bold text-white mb-1.5">${course.title}</h3>
          
          <div class="flex items-center space-x-2 mb-3">
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${course.level}</span>
            <span class="text-xs text-slate-400">• ${course.provider}</span>
          </div>

          <div class="p-2.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 mb-3">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-400 inline mr-1"></i>
            <span>${course.matchReason}</span>
          </div>

          <p class="text-xs text-slate-400 leading-relaxed">${course.description}</p>
        </div>

        <div class="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
          <button onclick="App.openCourseModal('${course.id}')" class="w-full py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow transition flex items-center justify-center space-x-1">
            <span>Start Learning</span>
          </button>
          <button onclick="App.openCourseModal('${course.id}')" class="w-full py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center justify-center space-x-1">
            <span>View Path</span>
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  },

  /**
   * 7. Render Dashboard View
   */
  renderDashboardView() {
    if (!this.currentProfile) return;

    // Profile summary widgets
    document.getElementById('dash-officer-name').textContent = this.currentProfile.name;
    document.getElementById('dash-officer-role').textContent = `${this.currentProfile.designation} • ${this.currentProfile.department}`;
    const initials = this.currentProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    document.getElementById('dash-avatar').textContent = initials;

    // Latest Competency Analysis section
    if (this.latestReport) {
      document.getElementById('dash-overall-score').textContent = `${this.latestReport.overallScore}%`;
      document.getElementById('dash-strongest-topic').textContent = `${this.latestReport.strongestCompetency.topic} — ${this.latestReport.strongestCompetency.score}%`;
      document.getElementById('dash-primary-gap').textContent = `${this.latestReport.primarySkillGap.topic} — ${this.latestReport.primarySkillGap.score}%`;
    } else if (this.currentProfile.latestAssessment) {
      const la = this.currentProfile.latestAssessment;
      document.getElementById('dash-overall-score').textContent = `${la.overallScore}%`;
      document.getElementById('dash-strongest-topic').textContent = `${la.strongestTopic} — ${la.strongestScore}%`;
      document.getElementById('dash-primary-gap').textContent = `${la.primarySkillGap} — ${la.primarySkillGapScore}%`;
    } else {
      document.getElementById('dash-overall-score').textContent = `80%`;
      document.getElementById('dash-strongest-topic').textContent = `Python Basics — 100%`;
      document.getElementById('dash-primary-gap').textContent = `Data Handling — 33%`;
    }

    // Render Competency Chart & Progress List
    this.renderCompetencyChart();
    this.renderDashboardProgressList();
    this.renderAssessmentHistoryTable();
  },

  /**
   * Render Chart.js Competency Graph (Bar / Radar)
   */
  renderCompetencyChart() {
    const ctx = document.getElementById('competencyChart');
    if (!ctx) return;

    const competencies = this.currentProfile ? this.currentProfile.currentCompetencies : {
      "Statistics": 67,
      "Python Basics": 100,
      "Data Handling": 33,
      "Data Visualization": 50
    };

    const labels = Object.keys(competencies);
    const dataValues = labels.map(k => competencies[k]);

    if (this.competencyChartInstance) {
      this.competencyChartInstance.destroy();
    }

    const isRadar = this.chartType === 'radar';

    this.competencyChartInstance = new Chart(ctx, {
      type: this.chartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Post-Assessment Competency (%)',
          data: dataValues,
          backgroundColor: isRadar ? 'rgba(37, 99, 235, 0.35)' : [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(234, 88, 12, 0.8)'
          ],
          borderColor: isRadar ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Competency Level: ${ctx.raw}%`
            }
          }
        },
        scales: isRadar ? {
          r: {
            suggestedMin: 0,
            suggestedMax: 100,
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: { color: '#cbd5e1', font: { size: 11, family: 'Inter' } },
            ticks: { display: false }
          }
        } : {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#94a3b8', callback: (v) => `${v}%` }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#cbd5e1', font: { size: 11 } }
          }
        }
      }
    });
  },

  setChartType(type) {
    this.chartType = type;
    const btnBar = document.getElementById('btn-chart-bar');
    const btnRadar = document.getElementById('btn-chart-radar');

    if (type === 'bar') {
      btnBar.className = 'px-2.5 py-1 rounded bg-blue-600 text-white font-medium';
      btnRadar.className = 'px-2.5 py-1 rounded bg-slate-800 text-slate-400 hover:text-white font-medium';
    } else {
      btnRadar.className = 'px-2.5 py-1 rounded bg-blue-600 text-white font-medium';
      btnBar.className = 'px-2.5 py-1 rounded bg-slate-800 text-slate-400 hover:text-white font-medium';
    }
    this.renderCompetencyChart();
  },

  /**
   * Render Dashboard Competency Progress Rows
   */
  renderDashboardProgressList() {
    const container = document.getElementById('dash-competency-progress-list');
    if (!container) return;
    container.innerHTML = '';

    const competencies = this.currentProfile ? this.currentProfile.currentCompetencies : {};
    Object.keys(competencies).forEach(skill => {
      const score = competencies[skill];
      const category = AssessmentEngine.getPerformanceCategory(score);

      const div = document.createElement('div');
      div.className = 'space-y-1';
      div.innerHTML = `
        <div class="flex items-center justify-between text-xs">
          <span class="font-medium text-slate-300">${skill}</span>
          <div class="flex items-center space-x-2">
            <span class="font-mono font-bold text-white">${score}%</span>
            <span class="${category.badgeClass} px-1.5 py-0.5 rounded text-[9px] font-bold">${category.name}</span>
          </div>
        </div>
        <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div class="h-full rounded-full ${category.barColor} progress-fill" style="width: ${score}%"></div>
        </div>
      `;
      container.appendChild(div);
    });
  },

  /**
   * Render Assessment History Table
   */
  renderAssessmentHistoryTable() {
    const tbody = document.getElementById('assessment-history-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    this.assessmentHistory.forEach(item => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-800/40 transition';
      tr.innerHTML = `
        <td class="py-3 px-4 font-medium text-white">
          <div class="flex items-center space-x-2">
            <i data-lucide="file-check-2" class="w-4 h-4 text-blue-400"></i>
            <span>${item.title}</span>
          </div>
        </td>
        <td class="py-3 px-3 text-slate-400 font-mono text-[11px]">${item.date}</td>
        <td class="py-3 px-3 font-mono font-bold text-blue-400">${item.overallScore}%</td>
        <td class="py-3 px-3 text-emerald-400 font-medium">${item.strongestTopic || 'Statistics'} (${item.strongestScore || 80}%)</td>
        <td class="py-3 px-3 text-red-400 font-medium">${item.primarySkillGap || 'Data Handling'} (${item.primaryGapScore || 33}%)</td>
        <td class="py-3 px-3"><span class="badge-strong px-2 py-0.5 rounded text-[10px] font-bold">VERIFIED</span></td>
      `;
      tbody.appendChild(tr);
    });
  },

  /**
   * Course Modal Controller
   */
  openCourseModal(courseId) {
    const modal = document.getElementById('course-modal');
    if (!modal || !window.COURSE_CATALOG) return;

    let foundCourse = null;
    Object.keys(window.COURSE_CATALOG).forEach(cat => {
      const match = window.COURSE_CATALOG[cat].find(c => c.id === courseId);
      if (match) foundCourse = match;
    });

    if (!foundCourse) return;

    document.getElementById('modal-course-title').textContent = foundCourse.title;
    document.getElementById('modal-course-desc').textContent = foundCourse.description;
    document.getElementById('modal-course-duration').textContent = foundCourse.duration;
    document.getElementById('modal-course-level').textContent = foundCourse.level;
    document.getElementById('modal-course-provider').textContent = foundCourse.provider;
    document.getElementById('modal-course-gap').textContent = foundCourse.subtopicMatch || foundCourse.title;

    const moduleList = document.getElementById('modal-course-modules');
    if (moduleList && foundCourse.modules) {
      moduleList.innerHTML = '';
      foundCourse.modules.forEach(m => {
        const li = document.createElement('li');
        li.className = 'p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300 flex items-center space-x-2';
        li.innerHTML = `<i data-lucide="play-circle" class="w-3.5 h-3.5 text-blue-400 shrink-0"></i><span>${m}</span>`;
        moduleList.appendChild(li);
      });
    }

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  closeCourseModal() {
    const modal = document.getElementById('course-modal');
    if (modal) modal.classList.add('hidden');
  },

  simulateCourseCompletion() {
    this.closeCourseModal();
    this.showToast('Course module completed! Learning progress synchronized with iGOT.', 'success');
  },

  /**
   * Fast-Track SIH Demonstration Flow
   */
  runQuickDemo() {
    this.autoFillQuizAnswers(false);
    this.submitAssessment();
    this.showToast('🚀 Running 80% Demonstration Flow (Data Handling Weakness Evaluated)', 'info');
  },

  /**
   * Toast notification helper
   */
  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-message');
    const iconEl = document.getElementById('toast-icon');

    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    if (type === 'success') {
      iconEl.className = 'shrink-0 text-emerald-400';
      iconEl.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5"></i>';
    } else if (type === 'error') {
      iconEl.className = 'shrink-0 text-red-400';
      iconEl.innerHTML = '<i data-lucide="alert-circle" class="w-5 h-5"></i>';
    } else {
      iconEl.className = 'shrink-0 text-blue-400';
      iconEl.innerHTML = '<i data-lucide="info" class="w-5 h-5"></i>';
    }

    toast.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }
};

// Bootstrap application on window load
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
