import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Lightbulb,
  MapIcon,
  RefreshCw,
  Target,
  TrendingUp,
  UserRound,
  Zap
} from "lucide-react";
import "./styles.css";

const flow = [
  {
    id: "team",
    unlocksAt: 0,
    nextLevel: 1,
    className: "node-team",
    tone: "purple",
    icon: Target,
    title: "Team Ability Score",
    subtitle: "All members"
  },
  {
    id: "member-a-score",
    unlocksAt: 1,
    nextLevel: 1,
    className: "node-member-a",
    tone: "blue",
    icon: UserRound,
    title: "Asha Score"
  },
  {
    id: "member-b-score",
    unlocksAt: 1,
    nextLevel: 2,
    className: "node-member-b",
    tone: "green",
    icon: UserRound,
    title: "Rohan Score",
    subtitle: "Highlighted"
  },
  {
    id: "member-c-score",
    unlocksAt: 1,
    nextLevel: 1,
    className: "node-member-c",
    tone: "rose",
    icon: UserRound,
    title: "Meera Score"
  },
  {
    id: "skill",
    unlocksAt: 2,
    nextLevel: 3,
    className: "node-skill",
    tone: "green",
    icon: Activity,
    title: "Skill-Will Score"
  },
  {
    id: "outcome",
    unlocksAt: 2,
    nextLevel: 3,
    className: "node-outcome",
    tone: "orange",
    icon: TrendingUp,
    title: "Outcome Score"
  },
  {
    id: "dashboard",
    unlocksAt: 3,
    nextLevel: 4,
    className: "node-dashboard",
    tone: "blue",
    icon: BarChart3,
    title: "Performance Dashboard"
  },
  {
    id: "kpis",
    unlocksAt: 4,
    nextLevel: 5,
    className: "node-kpi-box",
    tone: "violet",
    icon: BarChart3,
    title: "4 KPIs in One Box",
    subtitle: "TAT highlighted"
  },
  {
    id: "create",
    unlocksAt: 5,
    nextLevel: 6,
    className: "node-create-map",
    tone: "sky",
    icon: MapIcon,
    title: "Create Map"
  },
  {
    id: "practice",
    unlocksAt: 6,
    nextLevel: 7,
    className: "node-practice-box",
    tone: "gold",
    icon: BookOpen,
    title: "Quiz, Flashcard & Tip",
    subtitle: "1 practice box"
  },
  {
    id: "simulate",
    unlocksAt: 7,
    nextLevel: 8,
    className: "node-simulate",
    tone: "blue",
    icon: TrendingUp,
    title: "Simulate"
  },
  {
    id: "approve",
    unlocksAt: 8,
    nextLevel: 9,
    className: "node-approve",
    tone: "green",
    icon: CheckCircle2,
    title: "Review and Approve"
  },
  {
    id: "released",
    unlocksAt: 9,
    nextLevel: 9,
    className: "node-release",
    tone: "magenta",
    icon: MapIcon,
    title: "Map Released & Nudges"
  }
];

const finalLevel = 9;
const phaseLabels = [
  "Team Ability",
  "Member Scores",
  "Scores",
  "Dashboard",
  "KPIs",
  "Create Map",
  "Practice Box",
  "Simulation",
  "Approval",
  "Released"
];

const practicePhaseLabels = {
  quiz: "Quiz",
  flashcard: "Flashcard",
  tips: "Tips"
};
const learners = [
  {
    id: "member-a",
    name: "Asha",
    scoreLabel: "Asha Score",
    cohort: "Operations",
    signal: "On track",
    focus: "Accuracy",
    mapState: "Current",
    score: "86",
    kpiTrends: [
      { label: "Accuracy", values: [82, 84, 86, 88], unit: "%" },
      { label: "FTR", values: [80, 82, 85, 86], unit: "%" }
    ],
    context:
      "Asha is steady on quality and does not need a new map this cycle.",
    tone: "blue"
  },
  {
    id: "member-b",
    name: "Rohan",
    scoreLabel: "Rohan Score",
    cohort: "Claims",
    signal: "TAT focus",
    focus: "TAT",
    mapState: "Map ready",
    score: "64",
    kpiTrends: [
      { label: "TAT", values: [76, 72, 68, 64], unit: "%" },
      { label: "Deposit Accuracy", values: [74, 71, 69, 68], unit: "%" }
    ],
    context:
      "Rohan is the highlighted team member. The new map should focus on TAT confidence, period basis, and deposit-field practice.",
    tone: "green",
    attention: true
  },
  {
    id: "member-c",
    name: "Meera",
    scoreLabel: "Meera Score",
    cohort: "Operations",
    signal: "Stable",
    focus: "Policy review",
    mapState: "Current",
    score: "81",
    kpiTrends: [
      { label: "Review Quality", values: [78, 80, 81, 81], unit: "%" },
      { label: "SLA", values: [80, 81, 82, 83], unit: "%" }
    ],
    context:
      "Meera is stable and can stay on the existing coaching cadence.",
    tone: "rose"
  }
];

function App() {
  const [level, setLevel] = useState(0);
  const [focusedLearner, setFocusedLearner] = useState(null);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("RAD");
  const [selectedPractice, setSelectedPractice] = useState("quiz");

  const phase =
    level === 6 ? practicePhaseLabels[selectedPractice] : phaseLabels[Math.min(level, phaseLabels.length - 1)];
  const completion = Math.round((Math.min(level, finalLevel) / finalLevel) * 100);
  const activeNode = useMemo(() => {
    if (!selectedLearner) return null;
    if (level >= 9) return "released";
    if (level >= 8) return "approve";
    if (level >= 7) return "simulate";
    if (level >= 6) return "practice";
    if (level >= 5) return "create";
    if (level >= 4) return "kpis";
    if (level >= 3) return "dashboard";
    if (level >= 2) return "skill";
    return "team";
  }, [level, selectedLearner]);

  const reveal = (nextLevel) => {
    setLevel((current) => Math.max(current, nextLevel));
  };

  const chooseLearner = (learner) => {
    if (learner.attention) {
      openLearnerMap(learner);
      return;
    }

    setFocusedLearner(learner);
  };

  const openLearnerMap = (learner) => {
    setFocusedLearner(learner);
    setSelectedLearner(learner);
    setLevel(2);
  };

  const choosePractice = (practice) => {
    setSelectedPractice(practice);
    reveal(6);
  };

  const goBack = () => {
    if (selectedLearner && level === 2) {
      setSelectedLearner(null);
      setFocusedLearner(selectedLearner);
      setLevel(1);
      return;
    }

    setLevel((current) => Math.max(0, current - 1));
  };

  return (
    <main className="app-shell">
      <div className="product-frame">
        <TopBar phase={phase} completion={completion} />
        <section className="workspace" aria-label="Nanomate team learning map">
          <JourneyMap
            level={level}
            activeNode={activeNode}
            focusedLearner={focusedLearner}
            selectedLearner={selectedLearner}
            chooseLearner={chooseLearner}
            reveal={reveal}
            choosePractice={choosePractice}
          />
          <DetailPanel
            level={level}
            focusedLearner={focusedLearner}
            selectedLearner={selectedLearner}
            selectedPractice={selectedPractice}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            chooseLearner={chooseLearner}
            openLearnerMap={openLearnerMap}
            onBack={goBack}
            reveal={reveal}
            choosePractice={choosePractice}
          />
        </section>
      </div>
    </main>
  );
}

function TopBar({ phase, completion }) {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <span className="brand-mark">N</span>
        <div>
          <h1>Nanomate</h1>
          <p>Team Learning Map</p>
        </div>
      </div>
      <div className="progress-card" aria-label={`Map progress ${completion}%`}>
        <div className="progress-meta">
          <span>{phase}</span>
          <strong>{completion}%</strong>
        </div>
        <div className="progress-track">
          <span style={{ width: `${completion}%` }} />
        </div>
      </div>
    </header>
  );
}

function JourneyMap({
  level,
  activeNode,
  focusedLearner,
  selectedLearner,
  chooseLearner,
  reveal,
  choosePractice
}) {
  if (!selectedLearner && level === 0) {
    return (
      <section className="journey-map is-team-start">
        <TeamAbilityStage reveal={reveal} />
      </section>
    );
  }

  if (!selectedLearner) {
    return (
      <section className="journey-map is-roster">
        <LearnerSelection focusedLearner={focusedLearner} onSelect={chooseLearner} />
      </section>
    );
  }

  const visibleFlow = getVisibleFlow(level);

  return (
    <section className="journey-map">
      <div className={`journey-grid is-level-${level}`}>
        {visibleFlow.map((node, index) => {
          const completed = node.id === "practice" ? level > 6 : level > node.unlocksAt;
          const connector =
            node.id === "skill" ? "side" : index < visibleFlow.length - 1 ? "down" : null;

          return (
            <JourneyNode
              key={node.id}
              node={node}
              active={node.id === activeNode}
              completed={completed}
              connector={connector}
              locked={level < node.unlocksAt}
              reveal={reveal}
              choosePractice={choosePractice}
            />
          );
        })}
      </div>
    </section>
  );
}

function getVisibleFlow(level) {
  if (level < 2) {
    return flow.filter((node) => ["member-a-score", "member-b-score", "member-c-score"].includes(node.id));
  }

  return flow.filter((node) => node.unlocksAt >= 2 && node.unlocksAt <= level);
}

function LearnerSelection({ focusedLearner, onSelect }) {
  return (
    <div className="learner-stage" aria-label="Team member selection">
      <section className="member-score-banner" aria-label="Member scores">
        <div>
          <span>Member Scores</span>
          <strong>A / B / C</strong>
        </div>
        <p>Rohan is the highlighted middle member. Click his score to open Skill-Will and Outcome.</p>
      </section>
      <div className="learner-grid">
        {learners.map((learner) => (
          <button
            key={learner.id}
            type="button"
            className={`learner-card ${learner.tone} ${learner.attention ? "needs-attention" : ""} ${
              focusedLearner?.id === learner.id ? "is-selected" : ""
            }`}
            aria-pressed={focusedLearner?.id === learner.id}
            onClick={() => onSelect(learner)}
          >
            <span className="learner-avatar">{learner.name.charAt(0)}</span>
            <span className="learner-copy">
              <strong>{learner.name}</strong>
              <span>{learner.scoreLabel}</span>
            </span>
            {learner.attention && (
              <span className="attention-tag">
                <AlertTriangle />
                Needs attention
              </span>
            )}
            <span className="learner-signal">
              <span>{learner.signal}</span>
              <strong>{learner.score}</strong>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function JourneyNode({ node, active, completed, connector, locked, reveal, choosePractice }) {
  const Icon = node.icon;
  const isPracticeBox = node.id === "practice";
  const handleClick = () => {
    if (isPracticeBox) {
      reveal(6);
      return;
    }

    reveal(node.nextLevel);
  };

  return (
    <button
      type="button"
      className={`journey-node ${node.className} ${node.tone} ${connector ? `has-${connector}-connector` : ""} ${active ? "is-active" : ""} ${
        completed ? "is-complete" : ""
      } ${locked ? "is-locked" : ""}`}
      disabled={locked}
      aria-hidden={locked}
      onClick={handleClick}
    >
      <span className="icon-tile">
        <Icon />
      </span>
      <span className="node-copy">
        <strong>{node.title}</strong>
        {node.subtitle && <span>{node.subtitle}</span>}
      </span>
      {completed && (
        <span className="done-mark" aria-label="Completed">
          <Check size={15} />
        </span>
      )}
    </button>
  );
}

function TeamAbilityStage({ reveal }) {
  return (
    <button type="button" className="team-start-card" onClick={() => reveal(1)}>
      <span className="team-start-icon">
        <Target />
      </span>
      <span>
        <small>Start</small>
        <strong>Team Ability Score</strong>
      </span>
      <b>79</b>
      <ArrowRight />
    </button>
  );
}

function DetailPanel({
  level,
  focusedLearner,
  selectedLearner,
  selectedPractice,
  selectedAnswer,
  setSelectedAnswer,
  chooseLearner,
  openLearnerMap,
  onBack,
  reveal,
  choosePractice
}) {
  const isProfileSummary = !selectedLearner;
  const topAction = selectedLearner ? getDetailTopAction(level, reveal) : null;

  return (
    <aside className={`detail-panel ${isProfileSummary ? "is-profile-summary" : ""}`}>
      {selectedLearner && (
        <div className="detail-toolbar">
          <BackButton onClick={onBack} label={level === 2 ? "Members" : "Back"} />
          {topAction}
        </div>
      )}
      {!selectedLearner && level === 0 && <TeamStartPanel onNext={() => reveal(1)} />}
      {!selectedLearner && level === 1 && (
        focusedLearner ? (
          <LearnerPreviewPanel learner={focusedLearner} onOpenMap={() => openLearnerMap(focusedLearner)} />
        ) : (
          <LearnerQueuePanel onSelect={chooseLearner} />
        )
      )}
      {selectedLearner && level === 2 && <ScoresPanel onOutcome={() => reveal(3)} onSkill={() => reveal(3)} />}
      {selectedLearner && level === 3 && <PerformanceDashboardPanel onNext={() => reveal(4)} />}
      {selectedLearner && level === 4 && <KpiPanel onNext={() => reveal(5)} />}
      {selectedLearner && level === 5 && <CreateMapPanel />}
      {selectedLearner && level === 6 && (
        <PracticeBoxPanel
          selectedPractice={selectedPractice}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          choosePractice={choosePractice}
        />
      )}
      {selectedLearner && level === 7 && <SimulationPanel />}
      {selectedLearner && level === 8 && <ApprovalPanel />}
      {selectedLearner && level >= 9 && <ReleasePanel />}
    </aside>
  );
}

function getDetailTopAction(level, reveal) {
  const actions = {
    0: { label: "Start Flow", nextLevel: 1 },
    1: { label: "Score Member", nextLevel: 2 },
    2: { label: "Dashboard", nextLevel: 3 },
    3: { label: "View KPIs", nextLevel: 4 },
    4: { label: "Create Map", nextLevel: 5 },
    5: { label: "Practice Box", nextLevel: 6 },
    6: { label: "Simulate", nextLevel: 7 },
    7: { label: "Review", nextLevel: 8 },
    8: { label: "Approve", nextLevel: 9 }
  };
  const action = actions[level];

  return action ? (
    <PrimaryButton onClick={() => reveal(action.nextLevel)} compact>
      {action.label}
    </PrimaryButton>
  ) : null;
}

function BackButton({ onClick, label }) {
  return (
    <button type="button" className="back-action" onClick={onClick}>
      <ArrowLeft />
      <span>{label}</span>
    </button>
  );
}

function PanelHeader({ label, title, icon: Icon, action }) {
  return (
    <header className="panel-header">
      <div className="panel-title-lockup">
        <span className="panel-icon">
          <Icon />
        </span>
        <div>
          <p>{label}</p>
          <h2>{title}</h2>
        </div>
      </div>
      {action && <div className="panel-header-action">{action}</div>}
    </header>
  );
}

function TeamStartPanel({ onNext }) {
  return (
    <>
      <PanelHeader
        label="Team Ability Score"
        title="Team Rollup"
        icon={Target}
        action={<PrimaryButton onClick={onNext} compact>View Members</PrimaryButton>}
      />
      <div className="score-card">
        <div>
          <span className="score-value">79</span>
          <span className="score-unit">/100</span>
        </div>
        <p>Start from the team score, then open the member score row to find the highlighted coaching target.</p>
      </div>
    </>
  );
}

function LearnerQueuePanel({ onSelect }) {
  const attentionLearner = learners.find((learner) => learner.attention);

  return (
    <>
      <PanelHeader
        label="Member Scores"
        title="Member Scores"
        icon={UserRound}
        action={<PrimaryButton onClick={() => onSelect(attentionLearner)} compact>Open Rohan</PrimaryButton>}
      />
      <div className="stat-grid">
        <Metric label="Team Score" value="79" />
        <Metric label="Highlighted" value={attentionLearner.name} />
        <Metric label="Focus" value="TAT" />
        <Metric label="Status" value="Map ready" />
      </div>
    </>
  );
}

function LearnerPreviewPanel({ learner, onOpenMap, action, activeSection }) {
  const headerAction =
    action || (learner.attention && onOpenMap ? (
      <PrimaryButton onClick={onOpenMap} compact>Open Rohan Flow</PrimaryButton>
    ) : null);

  return (
    <>
      <PanelHeader label="Member Score" title={learner.name} icon={UserRound} action={headerAction} />
      <LearnerProfileCards learner={learner} activeSection={activeSection} />
      {!headerAction && !activeSection && (
        <div className="profile-status">
          <CheckCircle2 />
          <span>Map current</span>
        </div>
      )}
    </>
  );
}

function LearnerProfileCards({ learner, activeSection }) {
  const improvingKpis = learner.kpiTrends.filter((kpi) => kpi.values[kpi.values.length - 1] >= kpi.values[0]).length;
  const trendLabel = `${improvingKpis}/${learner.kpiTrends.length} improving`;

  return (
    <>
      <section
        className={`profile-card ${activeSection === "team" ? "is-highlighted" : ""}`}
        aria-label={`${learner.name} ability score`}
      >
        <div className="profile-score">
          <small>Team Ability Score</small>
          <span>79</span>
          <strong>Rohan highlighted</strong>
        </div>
        {learner.attention && (
          <span className="profile-tag">
            <AlertTriangle />
            Needs attention
          </span>
        )}
      </section>
      <section
        className={`learner-profile-card ${activeSection === "member" ? "is-highlighted" : ""}`}
        aria-label={`${learner.name} learner profile`}
      >
        <div className="profile-section-head">
          <span>Member Score</span>
          <strong>{learner.mapState}</strong>
        </div>
        <div className="learner-profile-grid">
          <div>
            <span>Member</span>
            <strong>{learner.name}</strong>
          </div>
          <div>
            <span>Cohort</span>
            <strong>{learner.cohort}</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>{learner.focus}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{learner.signal}</strong>
          </div>
        </div>
      </section>
      <section
        className={`trend-card ${activeSection === "trend" ? "is-highlighted" : ""}`}
        aria-label={`${learner.name} performance trend`}
      >
        <div className="profile-section-head">
          <span>Performance Trend</span>
          <strong>{trendLabel}</strong>
        </div>
        <div className="kpi-trend-list">
          {learner.kpiTrends.map((kpi) => {
            const start = kpi.values[0];
            const end = kpi.values[kpi.values.length - 1];
            const direction = end >= start ? "up" : "down";

            return (
              <article className={`kpi-trend is-${direction}`} key={kpi.label}>
                <div className="kpi-trend-meta">
                  <span>{kpi.label}</span>
                  <strong>
                    {start}
                    {kpi.unit} to {end}
                    {kpi.unit}
                  </strong>
                </div>
                <div className="trend-bars" aria-hidden="true">
                  {kpi.values.map((value, index) => (
                    <span key={`${learner.id}-${kpi.label}-${index}`} style={{ height: `${value}%` }} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function ScoresPanel({ onOutcome, onSkill }) {
  return (
    <>
      <PanelHeader label="Scoring" title="Skill-Will and Outcome" icon={Activity} />
      <div className="split-actions">
        <ScoreButton icon={Activity} label="Skill-Will Score" value="64%" tone="green" onClick={onSkill} />
        <ScoreButton icon={TrendingUp} label="Outcome Score" value="78%" tone="orange" onClick={onOutcome} />
      </div>
    </>
  );
}

function PerformanceDashboardPanel({ onNext }) {
  return (
    <>
      <PanelHeader label="Performance Dashboard" title="Priority Review" icon={BarChart3} />
      <section className="pathway-context">
        <div>
          <span>Dashboard signal</span>
          <strong>TAT is the highlighted performance gap</strong>
        </div>
        <p>
          Member scores, skill-will, and outcome scoring converge here before the system opens the KPI box.
        </p>
      </section>
      <PrimaryButton onClick={onNext}>View 4 KPIs</PrimaryButton>
    </>
  );
}

function KpiPanel({ onNext }) {
  const metrics = [
    { label: "AHT", value: "4.8m", icon: Clock3 },
    { label: "TAT", value: "Priority KPI", icon: Target, active: true },
    { label: "Accuracy", value: "92%", icon: CheckCircle2 },
    { label: "FTR", value: "86%", icon: TrendingUp }
  ];

  return (
    <>
      <PanelHeader label="4 KPIs in 1 Box" title="TAT Highlighted" icon={BarChart3} />
      <div className="kpi-grid">
        {metrics.map((metric) => (
          <button
            key={metric.label}
            type="button"
            className={`metric-card ${metric.active ? "is-selected" : ""}`}
            onClick={metric.active ? onNext : undefined}
          >
            <metric.icon />
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            {metric.active && <small>through slack and valence algorithm</small>}
          </button>
        ))}
      </div>
    </>
  );
}

function CreateMapPanel() {
  return (
    <>
      <PanelHeader label="Create Map" title="TAT Learning Map" icon={MapIcon} />
      <section className="pathway-context">
        <div>
          <span>Input basis</span>
          <strong>Team score + Rohan KPI gap</strong>
        </div>
        <p>
          The map is generated from the highlighted TAT KPI, the skill-will score, and Rohan's outcome gap.
        </p>
      </section>
    </>
  );
}

function PracticeBoxPanel({ selectedPractice, selectedAnswer, setSelectedAnswer, choosePractice }) {
  const items = [
    { id: "quiz", label: "Quiz", icon: BookOpen, tone: "rose" },
    { id: "flashcard", label: "Flashcard", icon: CreditCard, tone: "sky" },
    { id: "tips", label: "Tip", icon: Lightbulb, tone: "gold" }
  ];

  return (
    <>
      <PanelHeader label="Practice Box" title="Quiz, Flashcard & Tip" icon={Zap} />
      <div className="practice-list">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`practice-card ${item.tone} ${selectedPractice === item.id ? "is-selected" : ""}`}
            onClick={() => choosePractice(item.id)}
            aria-label={`Open ${item.label}`}
          >
            <item.icon />
            <span>{item.label}</span>
            <ArrowRight size={18} />
          </button>
        ))}
      </div>
      <section className="practice-content-box">
        {selectedPractice === "quiz" && (
          <QuizPanel selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} showHeader={false} />
        )}
        {selectedPractice === "flashcard" && <FlashcardPanel showHeader={false} />}
        {selectedPractice === "tips" && <TipsPanel showHeader={false} />}
      </section>
    </>
  );
}

function QuizPanel({ selectedAnswer, setSelectedAnswer, showHeader = true }) {
  return (
    <>
      {showHeader && <PanelHeader label="TAT Quiz" title="Quick Check" icon={BookOpen} />}
      <div className="quiz-stack">
        <Question index={1} text="What is period basis for Master Policy?">
          {["RAD", "CMD"].map((answer) => (
            <button
              key={answer}
              type="button"
              className={`answer ${selectedAnswer === answer ? "selected" : ""}`}
              onClick={() => setSelectedAnswer(answer)}
            >
              <span>{answer === "RAD" ? "A." : "B."}</span>
              <strong>{answer}</strong>
              {selectedAnswer === answer && <Check size={18} />}
            </button>
          ))}
        </Question>
        <Question text="Deposit Premium is EUR 510,000 in PT policy. What goes in the Deposit field?">
          <button type="button" className="answer">
            <span>A.</span>
            <strong>EUR 510,000</strong>
          </button>
          <button type="button" className="answer">
            <span>B.</span>
            <strong>0</strong>
          </button>
        </Question>
      </div>
    </>
  );
}

function FlashcardPanel({ showHeader = true }) {
  return (
    <>
      {showHeader && <PanelHeader label="Flashcard" title="TAT Concept Card" icon={CreditCard} />}
      <section className="flashcard-panel">
        <div className="flashcard-topline">
          <span>Master Policy</span>
          <strong>RAD</strong>
        </div>
        <h3>Period basis = RAD</h3>
        <p>
          When the master policy controls the policy period, anchor the TAT window to RAD before checking the deposit
          field.
        </p>
        <div className="flashcard-cues">
          <span>Basis: Policy period</span>
          <span>Deposit: Match slip value</span>
        </div>
      </section>
      <div className="confidence-row" aria-label="Flashcard confidence">
        <button type="button">Review</button>
        <button type="button" className="is-selected">
          Got it
        </button>
      </div>
    </>
  );
}

function TipsPanel({ showHeader = true }) {
  const tips = [
    {
      title: "Check the period source",
      copy: "Use master policy period when the question names Master Policy directly."
    },
    {
      title: "Copy deposit values exactly",
      copy: "If the slip shows EUR 510,000, keep the same value in the deposit field."
    },
    {
      title: "Confirm before release",
      copy: "Validate RAD and deposit together so the score update is based on the same evidence."
    }
  ];

  return (
    <>
      {showHeader && <PanelHeader label="Tips" title="TAT Coaching Tips" icon={Lightbulb} />}
      <div className="tip-list">
        {tips.map((tip, index) => (
          <article className="tip-card" key={tip.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{tip.title}</strong>
              <p>{tip.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function SimulationPanel() {
  return (
    <>
      <PanelHeader label="Simulation" title="Simulate the Outcome" icon={TrendingUp} />
      <section className="simulation-card">
        <div>
          <small>Projected impact</small>
          <span>+5%</span>
          <strong>TAT improvement</strong>
        </div>
        <p>
          If Rohan completes this map, the model projects a 5% lift in the highlighted TAT KPI.
        </p>
      </section>
    </>
  );
}

function ApprovalPanel() {
  return (
    <>
      <PanelHeader label="Human in the Loop" title="Review and Approve" icon={CheckCircle2} />
      <section className="approval-card">
        <span>Supervisor checkpoint</span>
        <p>Approve the map so the recommended content, nudges, and commitment mechanic can be launched.</p>
      </section>
    </>
  );
}

function ReleasePanel() {
  const statuses = [
    {
      label: "Map is activated",
      detail: "Rohan's map is now live",
      icon: Bell,
      tone: "blue"
    },
    {
      label: "Nudges are sent",
      detail: "TAT practice reminders delivered",
      icon: RefreshCw,
      tone: "green"
    },
    {
      label: "Commitment mechanic launched",
      detail: "Follow-through loop started",
      icon: MapIcon,
      tone: "magenta"
    }
  ];

  return (
    <>
      <PanelHeader label="Activated" title="Map Released" icon={MapIcon} />
      <div className="status-list">
        {statuses.map((status) => (
          <button
            key={status.label}
            type="button"
            className={`status-card ${status.tone} is-complete`}
            disabled
          >
            <status.icon />
            <span>
              <strong>{status.label}</strong>
              <small>{status.detail}</small>
            </span>
            <Check size={18} />
          </button>
        ))}
      </div>
    </>
  );
}

function Metric({ label, value }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ScoreButton({ icon: Icon, label, value, tone, onClick }) {
  return (
    <button type="button" className={`score-button ${tone}`} onClick={onClick}>
      <Icon />
      <span>{label}</span>
      <strong>{value}</strong>
    </button>
  );
}

function Question({ index, text, children }) {
  return (
    <section className="question-card">
      {index && <span className="question-index">{index}</span>}
      <h3>{text}</h3>
      <div className="answers">{children}</div>
    </section>
  );
}

function PrimaryButton({ children, onClick, compact = false }) {
  return (
    <button type="button" className={`primary-action ${compact ? "is-compact" : ""}`} onClick={onClick}>
      <span>{children}</span>
      <ArrowRight />
    </button>
  );
}

createRoot(document.getElementById("root")).render(<App />);
