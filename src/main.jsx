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
    id: "profile",
    unlocksAt: 0,
    nextLevel: 1,
    className: "node-profile",
    tone: "purple",
    icon: UserRound,
    title: "Learner Profile",
    subtitle: "Nanomate"
  },
  {
    id: "ability",
    unlocksAt: 1,
    nextLevel: 2,
    className: "node-ability",
    tone: "pink",
    icon: Target,
    title: "Ability Score"
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
    id: "skill",
    unlocksAt: 2,
    nextLevel: 4,
    className: "node-skill",
    tone: "green",
    icon: Activity,
    title: "Skill-Will Score"
  },
  {
    id: "kpi",
    unlocksAt: 3,
    nextLevel: 4,
    className: "node-kpi",
    tone: "blue",
    icon: BarChart3,
    title: "KPI Dashboard"
  },
  {
    id: "gap",
    unlocksAt: 4,
    nextLevel: 4,
    className: "node-pathway",
    tone: "violet",
    icon: Zap,
    title: "Micro Ability Pathway"
  },
  {
    id: "quiz",
    unlocksAt: 4,
    nextLevel: 5,
    className: "node-quiz",
    tone: "rose",
    icon: BookOpen,
    title: "Quiz"
  },
  {
    id: "flashcard",
    unlocksAt: 4,
    nextLevel: 5,
    className: "node-flashcard",
    tone: "sky",
    icon: CreditCard,
    title: "Flashcard"
  },
  {
    id: "tips",
    unlocksAt: 4,
    nextLevel: 5,
    className: "node-tips",
    tone: "gold",
    icon: Lightbulb,
    title: "Tips"
  },
  {
    id: "simulate",
    unlocksAt: 6,
    nextLevel: 7,
    className: "node-simulate",
    tone: "blue",
    icon: TrendingUp,
    title: "Simulate Outcome"
  },
  {
    id: "approve",
    unlocksAt: 7,
    nextLevel: 8,
    className: "node-approve",
    tone: "green",
    icon: CheckCircle2,
    title: "Review and Approve"
  },
  {
    id: "released",
    unlocksAt: 8,
    nextLevel: 8,
    className: "node-release",
    tone: "magenta",
    icon: MapIcon,
    title: "Activation Complete"
  }
];

const finalLevel = 8;
const phaseLabels = [
  "Profile",
  "Ability",
  "Scores",
  "KPI",
  "Pathway",
  "Practice",
  "Simulation",
  "Approval",
  "Activated"
];

const practiceIds = ["quiz", "flashcard", "tips"];
const practicePhaseLabels = {
  quiz: "Quiz",
  flashcard: "Flashcard",
  tips: "Tips"
};
const profileNodeItems = [
  {
    id: "ability",
    title: "Ability Score",
    icon: Target
  },
  {
    id: "profile",
    title: "Learner Profile",
    icon: UserRound
  },
  {
    id: "trend",
    title: "Performance Trend",
    icon: Activity
  }
];
const learners = [
  {
    id: "rahul",
    name: "Rahul",
    cohort: "Operations",
    signal: "On track",
    focus: "Accuracy",
    mapState: "Current",
    score: "88",
    kpiTrends: [
      { label: "Accuracy", values: [82, 84, 86, 88], unit: "%" },
      { label: "FTR", values: [80, 82, 85, 86], unit: "%" }
    ],
    context:
      "Rahul is maintaining a steady learning path with strong accuracy and a current map. Keep routine practice light.",
    tone: "blue"
  },
  {
    id: "akhi",
    name: "Akhi",
    cohort: "Claims",
    signal: "Stable",
    focus: "Policy review",
    mapState: "Current",
    score: "84",
    kpiTrends: [
      { label: "Review Quality", values: [78, 82, 83, 84], unit: "%" },
      { label: "SLA", values: [80, 81, 83, 83], unit: "%" }
    ],
    context:
      "Akhi is stable across recent checks, with policy review as the main focus area for continued consistency.",
    tone: "green"
  },
  {
    id: "nikita",
    name: "Nikita",
    cohort: "Operations",
    signal: "TAT focus",
    focus: "TAT",
    mapState: "Ready",
    score: "64",
    kpiTrends: [
      { label: "TAT", values: [76, 72, 68, 64], unit: "%" },
      { label: "Deposit Accuracy", values: [74, 71, 69, 68], unit: "%" }
    ],
    context:
      "Nikita needs attention on TAT handling. The next map should prioritize confidence, period basis, and deposit-field practice.",
    tone: "rose",
    attention: true
  }
];

function App() {
  const [level, setLevel] = useState(0);
  const [focusedLearner, setFocusedLearner] = useState(null);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [selectedProfileNode, setSelectedProfileNode] = useState("ability");
  const [selectedAnswer, setSelectedAnswer] = useState("RAD");
  const [selectedPractice, setSelectedPractice] = useState("quiz");

  const phase = selectedLearner
    ? level === 5
      ? practicePhaseLabels[selectedPractice]
      : phaseLabels[Math.min(level, phaseLabels.length - 1)]
    : "Learners";
  const completion = selectedLearner ? Math.round((Math.min(level, finalLevel) / finalLevel) * 100) : 0;
  const activeNode = useMemo(() => {
    if (!selectedLearner) return null;
    if (level >= 8) return "released";
    if (level >= 7) return "approve";
    if (level >= 6) return "simulate";
    if (level >= 5) return selectedPractice;
    if (level >= 4) return "gap";
    if (level >= 3) return "kpi";
    if (level >= 2) return "outcome";
    if (level >= 1) return "ability";
    return "profile";
  }, [level, selectedLearner, selectedPractice]);

  const reveal = (nextLevel) => {
    setLevel((current) => Math.max(current, nextLevel));
  };

  const chooseLearner = (learner) => {
    setFocusedLearner(learner);
  };

  const openLearnerMap = (learner) => {
    setFocusedLearner(learner);
    setSelectedLearner(learner);
    setSelectedProfileNode("ability");
    setLevel(0);
  };

  const choosePractice = (practice) => {
    setSelectedPractice(practice);
    reveal(5);
  };

  const goBack = () => {
    if (selectedLearner && level === 0) {
      setSelectedLearner(null);
      setFocusedLearner(selectedLearner);
      return;
    }

    setLevel((current) => Math.max(0, current - 1));
  };

  return (
    <main className="app-shell">
      <div className="product-frame">
        <TopBar phase={phase} completion={completion} />
        <section className="workspace" aria-label="Nanomate learner map">
          <JourneyMap
            level={level}
            activeNode={activeNode}
            focusedLearner={focusedLearner}
            selectedLearner={selectedLearner}
            selectedProfileNode={selectedProfileNode}
            selectedPractice={selectedPractice}
            chooseLearner={chooseLearner}
            chooseProfileNode={setSelectedProfileNode}
            reveal={reveal}
            choosePractice={choosePractice}
          />
          <DetailPanel
            level={level}
            focusedLearner={focusedLearner}
            selectedLearner={selectedLearner}
            selectedProfileNode={selectedProfileNode}
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
          <p>Learner Map</p>
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
  selectedProfileNode,
  selectedPractice,
  chooseLearner,
  chooseProfileNode,
  reveal,
  choosePractice
}) {
  if (!selectedLearner) {
    return (
      <section className="journey-map is-roster">
        <LearnerSelection focusedLearner={focusedLearner} onSelect={chooseLearner} />
      </section>
    );
  }

  if (level === 0) {
    return (
      <section className="journey-map is-profile-nodes">
        <ProfileNodeMap
          learner={selectedLearner}
          selectedNode={selectedProfileNode}
          onSelect={chooseProfileNode}
        />
      </section>
    );
  }

  return (
    <section className="journey-map">
      <ConnectionLayer level={level} />
      <div className="journey-grid">
        {flow.map((node) => {
          const isPracticeNode = practiceIds.includes(node.id);
          const completed = isPracticeNode ? level > 5 && node.id === selectedPractice : level > node.unlocksAt;
          const displayNode =
            node.id === "profile" && selectedLearner ? { ...node, subtitle: selectedLearner.name } : node;

          return (
            <JourneyNode
              key={node.id}
              node={displayNode}
              active={node.id === activeNode}
              completed={completed}
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

function LearnerSelection({ focusedLearner, onSelect }) {
  return (
    <div className="learner-stage" aria-label="Learner selection">
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
              <span>{learner.cohort}</span>
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

function ProfileNodeMap({ learner, selectedNode, onSelect }) {
  const nodeDetails = {
    ability: `${learner.score} - ${learner.signal}`,
    profile: `${learner.cohort} - ${learner.focus}`,
    trend: `${learner.kpiTrends.length} KPI trends`
  };

  return (
    <div className="profile-node-stage" aria-label={`${learner.name} profile nodes`}>
      {profileNodeItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            className={`profile-map-node ${selectedNode === item.id ? "is-selected" : ""}`}
            aria-pressed={selectedNode === item.id}
            onClick={() => onSelect(item.id)}
          >
            <span className="icon-tile">
              <Icon />
            </span>
            <span className="node-copy">
              <strong>{item.title}</strong>
              <span>{nodeDetails[item.id]}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ConnectionLayer({ level }) {
  const lineClass = (threshold) => `map-line ${level >= threshold ? "is-live" : ""}`;
  const line = (threshold, d, props = {}) => (
    <path pathLength="1" className={lineClass(threshold)} d={d} {...props} />
  );
  const dot = (threshold, cx, cy, props = {}) => (
    <circle className={`map-dot ${level >= threshold ? "is-live" : ""}`} cx={cx} cy={cy} r="0.72" {...props} />
  );

  return (
    <svg className="connection-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="lineWarm" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="lineCool" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      {line(1, "M50 14 V23")}

      {line(2, "M50 30 V36 Q50 38 48 38 H18.5 Q16.5 38 16.5 40 V41")}
      {line(2, "M50 30 V36 Q50 38 52 38 H81.5 Q83.5 38 83.5 40 V41")}
      {dot(2, 50, 38)}

      {line(3, "M16.5 49 V53 Q16.5 55 18.5 55 H31.5 Q33.5 55 33.5 57")}
      {line(4, "M43.5 65 H56.5", { "data-cool": true })}
      {line(4, "M83.5 49 V53 Q83.5 55 81.5 55 H68.5 Q66.5 55 66.5 57", { "data-cool": true })}

      {line(4, "M66.5 65 V69 Q66.5 71 64.5 71 H18.5 Q16.5 71 16.5 73", { "data-cool": true })}
      {line(4, "M66.5 65 V69 Q66.5 71 64.5 71 H52 Q50 71 50 73", { "data-cool": true })}
      {line(4, "M66.5 65 V71 H83.5 V73", { "data-cool": true })}
      {dot(4, 66.5, 71, { "data-cool": true })}

      {line(6, "M16.5 81 V86 Q16.5 88 18.5 88 H20", { "data-cool": true })}
      {line(7, "M30.6 91 H36.1", { "data-cool": true })}
      {line(8, "M63.9 91 H69.4", { "data-cool": true })}
    </svg>
  );
}

function JourneyNode({ node, active, completed, locked, reveal, choosePractice }) {
  const Icon = node.icon;
  const isPracticeNode = practiceIds.includes(node.id);
  const handleClick = () => {
    if (isPracticeNode) {
      choosePractice(node.id);
      return;
    }

    reveal(node.nextLevel);
  };

  return (
    <button
      type="button"
      className={`journey-node ${node.className} ${node.tone} ${active ? "is-active" : ""} ${
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

function DetailPanel({
  level,
  focusedLearner,
  selectedLearner,
  selectedProfileNode,
  selectedPractice,
  selectedAnswer,
  setSelectedAnswer,
  chooseLearner,
  openLearnerMap,
  onBack,
  reveal,
  choosePractice
}) {
  const isProfileSummary = !selectedLearner || level === 0;
  const topAction = selectedLearner ? getDetailTopAction(level, reveal) : null;

  return (
    <aside className={`detail-panel ${isProfileSummary ? "is-profile-summary" : ""}`}>
      {selectedLearner && (
        <div className="detail-toolbar">
          <BackButton onClick={onBack} label={level === 0 ? "Learners" : "Back"} />
          {topAction}
        </div>
      )}
      {!selectedLearner && (
        focusedLearner ? (
          <LearnerPreviewPanel learner={focusedLearner} onOpenMap={() => openLearnerMap(focusedLearner)} />
        ) : (
          <LearnerQueuePanel onSelect={chooseLearner} />
        )
      )}
      {selectedLearner && level === 0 && (
        <LearnerPreviewPanel
          learner={selectedLearner}
          activeSection={selectedProfileNode}
        />
      )}
      {level === 1 && <AbilityPanel />}
      {level === 2 && <ScoresPanel onOutcome={() => reveal(3)} onSkill={() => reveal(3)} />}
      {level === 3 && <KpiPanel onNext={() => reveal(4)} />}
      {level === 4 && <PathwayPanel onSelect={choosePractice} />}
      {level === 5 && selectedPractice === "quiz" && (
        <QuizPanel
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      )}
      {level === 5 && selectedPractice === "flashcard" && <FlashcardPanel />}
      {level === 5 && selectedPractice === "tips" && <TipsPanel />}
      {level === 6 && <SimulationPanel />}
      {level === 7 && <ApprovalPanel />}
      {level >= 8 && <ReleasePanel />}
    </aside>
  );
}

function getDetailTopAction(level, reveal) {
  const actions = {
    0: { label: "Start Map", nextLevel: 1 },
    1: { label: "View Scores", nextLevel: 2 },
    5: { label: "Simulate", nextLevel: 6 },
    6: { label: "Review", nextLevel: 7 },
    7: { label: "Approve", nextLevel: 8 }
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

function LearnerQueuePanel({ onSelect }) {
  const attentionLearner = learners.find((learner) => learner.attention);

  return (
    <>
      <PanelHeader
        label="Learners"
        title="Attention Queue"
        icon={UserRound}
        action={<PrimaryButton onClick={() => onSelect(attentionLearner)} compact>View Nikita Profile</PrimaryButton>}
      />
      <div className="stat-grid">
        <Metric label="Learners" value="3" />
        <Metric label="Needs attention" value={attentionLearner.name} />
        <Metric label="Focus" value="TAT" />
        <Metric label="Status" value="Ready" />
      </div>
    </>
  );
}

function LearnerPreviewPanel({ learner, onOpenMap, action, activeSection }) {
  const headerAction =
    action || (learner.attention && onOpenMap ? (
      <PrimaryButton onClick={onOpenMap} compact>Open Learner Profile</PrimaryButton>
    ) : null);

  return (
    <>
      <PanelHeader label="Nanomate Profile" title={learner.name} icon={UserRound} action={headerAction} />
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
        className={`profile-card ${activeSection === "ability" ? "is-highlighted" : ""}`}
        aria-label={`${learner.name} ability score`}
      >
        <div className="profile-score">
          <small>Ability Score</small>
          <span>{learner.score}</span>
          <strong>{learner.signal}</strong>
        </div>
        {learner.attention && (
          <span className="profile-tag">
            <AlertTriangle />
            Needs attention
          </span>
        )}
      </section>
      <section
        className={`learner-profile-card ${activeSection === "profile" ? "is-highlighted" : ""}`}
        aria-label={`${learner.name} learner profile`}
      >
        <div className="profile-section-head">
          <span>Learner Profile</span>
          <strong>{learner.mapState}</strong>
        </div>
        <div className="learner-profile-grid">
          <div>
            <span>Role</span>
            <strong>Learner</strong>
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

function AbilityPanel() {
  return (
    <>
      <PanelHeader label="Ability" title="Score Snapshot" icon={Target} />
      <div className="score-card">
        <div>
          <span className="score-value">82</span>
          <span className="score-unit">/100</span>
        </div>
        <p>Balanced accuracy with room to improve turnaround handling.</p>
      </div>
    </>
  );
}

function ScoresPanel({ onOutcome, onSkill }) {
  return (
    <>
      <PanelHeader label="Scores" title="Outcome vs Skill-Will" icon={Activity} />
      <div className="split-actions">
        <ScoreButton icon={TrendingUp} label="Outcome Score" value="78%" tone="orange" onClick={onOutcome} />
        <ScoreButton icon={Activity} label="Skill-Will Score" value="64%" tone="green" onClick={onSkill} />
      </div>
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
      <PanelHeader label="KPI Dashboard" title="Turnaround Focus" icon={BarChart3} />
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
            {metric.active && <small>through slack and balance algorithm</small>}
          </button>
        ))}
      </div>
    </>
  );
}

function PathwayPanel({ onSelect }) {
  const items = [
    { id: "quiz", label: "Quiz", icon: BookOpen, tone: "rose" },
    { id: "flashcard", label: "Flashcard", icon: CreditCard, tone: "sky" },
    { id: "tips", label: "Tips", icon: Lightbulb, tone: "gold" }
  ];

  return (
    <>
      <PanelHeader label="TAT Focus" title="Micro Ability Pathway" icon={Zap} />
      <section className="pathway-context">
        <div>
          <span>Input basis</span>
          <strong>SOP + learner context</strong>
        </div>
        <p>
          The pathway uses SOP evidence, TAT handling signals, and Nikita's learner context to generate the three
          recommended micro-actions below.
        </p>
      </section>
      <div className="practice-list">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`practice-card ${item.tone}`}
            onClick={() => onSelect(item.id)}
            aria-label={`Open ${item.label}`}
          >
            <item.icon />
            <span>{item.label}</span>
            <ArrowRight size={18} />
          </button>
        ))}
      </div>
    </>
  );
}

function QuizPanel({ selectedAnswer, setSelectedAnswer }) {
  return (
    <>
      <PanelHeader label="TAT Quiz" title="Quick Check" icon={BookOpen} />
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

function FlashcardPanel() {
  return (
    <>
      <PanelHeader label="Flashcard" title="TAT Concept Card" icon={CreditCard} />
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

function TipsPanel() {
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
      <PanelHeader label="Tips" title="TAT Coaching Tips" icon={Lightbulb} />
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
          If Nikita completes this micro ability pathway, the model projects a 5% improvement in the selected priority
          KPI.
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
        <p>Approve the learner map so the recommended content, nudges, and commitment mechanic can be launched.</p>
      </section>
    </>
  );
}

function ReleasePanel() {
  const statuses = [
    {
      label: "Map is activated",
      detail: "Learner pathway is now live",
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
