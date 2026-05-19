import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowRight,
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
    nextLevel: 5,
    className: "node-gap",
    tone: "violet",
    icon: Zap,
    title: "Gap Analysis"
  },
  {
    id: "quiz",
    unlocksAt: 5,
    nextLevel: 6,
    className: "node-quiz",
    tone: "rose",
    icon: BookOpen,
    title: "Quiz"
  },
  {
    id: "flashcard",
    unlocksAt: 5,
    nextLevel: 6,
    className: "node-flashcard",
    tone: "sky",
    icon: CreditCard,
    title: "Flashcard"
  },
  {
    id: "tips",
    unlocksAt: 5,
    nextLevel: 6,
    className: "node-tips",
    tone: "gold",
    icon: Lightbulb,
    title: "Tips"
  },
  {
    id: "nudge",
    unlocksAt: 7,
    nextLevel: 8,
    className: "node-nudge",
    tone: "blue",
    icon: Bell,
    title: "Nudge Generated"
  },
  {
    id: "updated",
    unlocksAt: 8,
    nextLevel: 9,
    className: "node-updated",
    tone: "green",
    icon: RefreshCw,
    title: "Ability Score Updated"
  },
  {
    id: "released",
    unlocksAt: 9,
    nextLevel: 9,
    className: "node-release",
    tone: "magenta",
    icon: MapIcon,
    title: "Map Generated and Released"
  }
];

const finalLevel = 9;
const phaseLabels = [
  "Profile",
  "Ability",
  "Scores",
  "KPI",
  "Gap",
  "Practice",
  "Quiz",
  "Nudge",
  "Score Update",
  "Release"
];

const practiceIds = ["quiz", "flashcard", "tips"];
const practicePhaseLabels = {
  quiz: "Quiz",
  flashcard: "Flashcard",
  tips: "Tips"
};

function App() {
  const [level, setLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("RAD");
  const [selectedPractice, setSelectedPractice] = useState("quiz");

  const phase = level === 6 ? practicePhaseLabels[selectedPractice] : phaseLabels[Math.min(level, phaseLabels.length - 1)];
  const completion = Math.round((Math.min(level, finalLevel) / finalLevel) * 100);
  const activeNode = useMemo(() => {
    if (level >= 9) return "released";
    if (level >= 8) return "updated";
    if (level >= 7) return "nudge";
    if (level >= 6) return selectedPractice;
    if (level >= 5) return selectedPractice;
    if (level >= 4) return "gap";
    if (level >= 3) return "kpi";
    if (level >= 2) return "outcome";
    if (level >= 1) return "ability";
    return "profile";
  }, [level, selectedPractice]);

  const reveal = (nextLevel) => {
    setLevel((current) => Math.max(current, nextLevel));
  };

  const choosePractice = (practice) => {
    setSelectedPractice(practice);
    reveal(6);
  };

  return (
    <main className="app-shell">
      <div className="product-frame">
        <TopBar phase={phase} completion={completion} />
        <section className="workspace" aria-label="Nanomate learner map">
          <JourneyMap
            level={level}
            activeNode={activeNode}
            selectedPractice={selectedPractice}
            reveal={reveal}
            choosePractice={choosePractice}
          />
          <DetailPanel
            level={level}
            selectedPractice={selectedPractice}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
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

function JourneyMap({ level, activeNode, selectedPractice, reveal, choosePractice }) {
  return (
    <section className="journey-map">
      <ConnectionLayer level={level} />
      <div className="journey-grid">
        {flow.map((node) => {
          const isPracticeNode = practiceIds.includes(node.id);
          const completed = isPracticeNode ? level > 6 && node.id === selectedPractice : level > node.unlocksAt;

          return (
            <JourneyNode
              key={node.id}
              node={node}
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
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="lineCool" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      {line(1, "M50 14 V23")}

      {line(2, "M50 30 V36 Q50 38 48 38 H18.5 Q16.5 38 16.5 40 V41")}
      {line(2, "M50 30 V36 Q50 38 52 38 H81.5 Q83.5 38 83.5 40 V41")}
      {dot(2, 50, 38)}

      {line(3, "M16.5 49 V53 Q16.5 55 18.5 55 H31.5 Q33.5 55 33.5 57")}
      {line(4, "M83.5 49 V53 Q83.5 55 81.5 55 H68.5 Q66.5 55 66.5 57", { "data-cool": true })}

      {line(5, "M66.5 65 V69 Q66.5 71 64.5 71 H18.5 Q16.5 71 16.5 73", { "data-cool": true })}
      {line(5, "M66.5 65 V69 Q66.5 71 64.5 71 H52 Q50 71 50 73", { "data-cool": true })}
      {line(5, "M66.5 65 V71 H83.5 V73", { "data-cool": true })}
      {dot(5, 66.5, 71, { "data-cool": true })}

      {line(7, "M16.5 81 V86 Q16.5 88 18.5 88 H20", { "data-cool": true })}
      {line(8, "M30.6 91 H36.1", { "data-cool": true })}
      {line(9, "M63.9 91 H69.4", { "data-cool": true })}
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

function DetailPanel({ level, selectedPractice, selectedAnswer, setSelectedAnswer, reveal, choosePractice }) {
  return (
    <aside className="detail-panel">
      {level === 0 && <ProfilePanel onNext={() => reveal(1)} />}
      {level === 1 && <AbilityPanel onNext={() => reveal(2)} />}
      {level === 2 && <ScoresPanel onOutcome={() => reveal(3)} onSkill={() => reveal(4)} />}
      {level === 3 && <KpiPanel onNext={() => reveal(4)} />}
      {level === 4 && <GapPanel onNext={() => reveal(5)} />}
      {level === 5 && <PracticePanel onSelect={choosePractice} />}
      {level === 6 && selectedPractice === "quiz" && (
        <QuizPanel
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          onNext={() => reveal(7)}
        />
      )}
      {level === 6 && selectedPractice === "flashcard" && <FlashcardPanel onNext={() => reveal(7)} />}
      {level === 6 && selectedPractice === "tips" && <TipsPanel onNext={() => reveal(7)} />}
      {level >= 7 && <ReleasePanel level={level} reveal={reveal} />}
    </aside>
  );
}

function PanelHeader({ label, title, icon: Icon }) {
  return (
    <header className="panel-header">
      <span className="panel-icon">
        <Icon />
      </span>
      <div>
        <p>{label}</p>
        <h2>{title}</h2>
      </div>
    </header>
  );
}

function ProfilePanel({ onNext }) {
  return (
    <>
      <PanelHeader label="Profile" title="Nanomate" icon={UserRound} />
      <div className="stat-grid">
        <Metric label="Role" value="Learner" />
        <Metric label="Cohort" value="Operations" />
        <Metric label="Map State" value="Ready" />
        <Metric label="Focus" value="TAT" />
      </div>
      <PrimaryButton onClick={onNext}>Start Map</PrimaryButton>
    </>
  );
}

function AbilityPanel({ onNext }) {
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
      <PrimaryButton onClick={onNext}>View Scores</PrimaryButton>
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
    { label: "TAT", value: "Needs work", icon: Target, active: true },
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
          </button>
        ))}
      </div>
    </>
  );
}

function GapPanel({ onNext }) {
  return (
    <>
      <PanelHeader label="Gap Analysis" title="Skill-Will Gap" icon={Zap} />
      <div className="gap-card">
        <div className="gap-row">
          <span>Knowledge</span>
          <strong>Medium</strong>
        </div>
        <div className="gap-row">
          <span>Confidence</span>
          <strong>Needs support</strong>
        </div>
        <div className="gap-row">
          <span>Nudge Priority</span>
          <strong>High</strong>
        </div>
      </div>
      <PrimaryButton onClick={onNext}>Generate Practice</PrimaryButton>
    </>
  );
}

function PracticePanel({ onSelect }) {
  const items = [
    { id: "quiz", label: "Quiz", icon: BookOpen, tone: "rose" },
    { id: "flashcard", label: "Flashcard", icon: CreditCard, tone: "sky" },
    { id: "tips", label: "Tips", icon: Lightbulb, tone: "gold" }
  ];

  return (
    <>
      <PanelHeader label="Practice" title="Learning Actions" icon={BookOpen} />
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

function QuizPanel({ selectedAnswer, setSelectedAnswer, onNext }) {
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
      <PrimaryButton onClick={onNext}>Generate Nudge</PrimaryButton>
    </>
  );
}

function FlashcardPanel({ onNext }) {
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
      <PrimaryButton onClick={onNext}>Generate Nudge</PrimaryButton>
    </>
  );
}

function TipsPanel({ onNext }) {
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
      <PrimaryButton onClick={onNext}>Generate Nudge</PrimaryButton>
    </>
  );
}

function ReleasePanel({ level, reveal }) {
  const statuses = [
    {
      level: 7,
      nextLevel: 8,
      label: "Nudge Generated",
      detail: "Create the learner nudge",
      icon: Bell,
      tone: "blue"
    },
    {
      level: 8,
      nextLevel: 9,
      label: "Ability Score Updated",
      detail: "Apply the new score state",
      icon: RefreshCw,
      tone: "green"
    },
    {
      level: 9,
      nextLevel: 9,
      label: "Map Generated and Released",
      detail: "Publish the final learner map",
      icon: MapIcon,
      tone: "magenta"
    }
  ];
  const title =
    level === 7
      ? "Generate Nudge"
      : level === 8
        ? "Update Ability Score"
        : "Map Released";

  return (
    <>
      <PanelHeader label="Release Flow" title={title} icon={MapIcon} />
      <div className="status-list">
        {statuses.filter((status) => level >= status.level).map((status) => (
          <button
            key={status.label}
            type="button"
            className={`status-card ${status.tone} ${level === status.level ? "is-active" : ""} ${
              level > status.level ? "is-complete" : ""
            } ${level < status.level ? "is-locked" : ""}`}
            disabled={level < status.level || level > status.level || status.level === finalLevel}
            onClick={() => reveal(status.nextLevel)}
          >
            <status.icon />
            <span>
              <strong>{status.label}</strong>
              <small>{status.detail}</small>
            </span>
            {level > status.level && <Check size={18} />}
            {level === status.level && status.level < finalLevel && <ArrowRight size={18} />}
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

function PrimaryButton({ children, onClick }) {
  return (
    <button type="button" className="primary-action" onClick={onClick}>
      <span>{children}</span>
      <ArrowRight />
    </button>
  );
}

createRoot(document.getElementById("root")).render(<App />);
