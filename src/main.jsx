import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  Check,
  Gem,
  RotateCcw,
  TriangleAlert,
  X,
} from "lucide-react";
import worxogoLogo from "./assets/brand/worxogo-logo.png";
import backgroundTile from "./assets/icons/background.png";
import createMapIcon from "./assets/icons/create-map-for-tat.png";
import kpisIcon from "./assets/icons/kpis.png";
import knowledgeIcon from "./assets/icons/knowledge-behavior-skill.png";
import learningDashboardIcon from "./assets/icons/learning-dashboard.png";
import outcomeIcon from "./assets/icons/outcome-score.png";
import performanceDashboardIcon from "./assets/icons/performance-dashboard.png";
import performanceNudgeIcon from "./assets/icons/performance-nudge.png";
import personIcon from "./assets/icons/person.png";
import prioritizationIcon from "./assets/icons/prioritization.png";
import quizIcon from "./assets/icons/quiz-flashcard-tips.png";
import reviewApproveIcon from "./assets/icons/review-approve.png";
import simulationIcon from "./assets/icons/simulation.png";
import skillWillIcon from "./assets/icons/skill-will-score.png";
import teamAbilityIcon from "./assets/icons/team-ability-score.png";
import "./styles.css";

const flow = [
  {
    id: "team",
    unlocksAt: 0,
    nextLevel: 1,
    className: "node-team",
    tone: "purple",
    iconSrc: teamAbilityIcon,
    title: "Team Ability Score",
    subtitle: "All members"
  },
  {
    id: "member-a-score",
    unlocksAt: 1,
    nextLevel: 1,
    className: "node-member-a",
    tone: "blue",
    iconSrc: personIcon,
    title: "Asha Score"
  },
  {
    id: "member-b-score",
    unlocksAt: 1,
    nextLevel: 2,
    className: "node-member-b",
    tone: "green",
    iconSrc: personIcon,
    title: "Rohan Score"
  },
  {
    id: "member-c-score",
    unlocksAt: 1,
    nextLevel: 1,
    className: "node-member-c",
    tone: "rose",
    iconSrc: personIcon,
    title: "Meera Score"
  },
  {
    id: "skill",
    unlocksAt: 2,
    nextLevel: 3,
    className: "node-skill",
    tone: "green",
    iconSrc: skillWillIcon,
    title: "Skill-Will Score"
  },
  {
    id: "outcome",
    unlocksAt: 2,
    nextLevel: 3,
    className: "node-outcome",
    tone: "orange",
    iconSrc: outcomeIcon,
    title: "Outcome Score"
  },
  {
    id: "dashboard",
    unlocksAt: 3,
    nextLevel: 4,
    className: "node-learning-dashboard",
    tone: "blue",
    iconSrc: learningDashboardIcon,
    title: "Learning Dashboard"
  },
  {
    id: "skill-breakdown",
    unlocksAt: 4,
    nextLevel: 5,
    className: "node-skill-breakdown",
    tone: "violet",
    iconSrc: knowledgeIcon,
    title: "Knowledge, Behavior, Skill"
  },
  {
    id: "learning-simulation",
    unlocksAt: 5,
    nextLevel: 6,
    className: "node-learning-simulation",
    tone: "sky",
    iconSrc: simulationIcon,
    title: "Simulation"
  },
  {
    id: "performance-dashboard",
    unlocksAt: 3,
    nextLevel: 4,
    className: "node-performance-dashboard",
    tone: "blue",
    iconSrc: performanceDashboardIcon,
    title: "Performance Dashboard"
  },
  {
    id: "kpis",
    unlocksAt: 4,
    nextLevel: 5,
    className: "node-kpi-box",
    tone: "violet",
    iconSrc: kpisIcon,
    title: "KPIs"
  },
  {
    id: "prioritization",
    unlocksAt: 5,
    nextLevel: 6,
    className: "node-prioritization",
    tone: "gold",
    iconSrc: prioritizationIcon,
    title: "Prioritization"
  },
  {
    id: "create",
    unlocksAt: 6,
    nextLevel: 7,
    className: "node-create-map",
    tone: "sky",
    iconSrc: createMapIcon,
    title: "Create map for TAT (9 week plan)"
  },
  {
    id: "approve",
    unlocksAt: 7,
    nextLevel: 8,
    className: "node-approve",
    tone: "green",
    iconSrc: reviewApproveIcon,
    title: "Review & Approve"
  },
  {
    id: "practice",
    unlocksAt: 8,
    nextLevel: 8,
    className: "node-practice-box",
    tone: "gold",
    iconSrc: quizIcon,
    title: "Quiz, Flashcard & Tips"
  },
  {
    id: "released",
    unlocksAt: 8,
    nextLevel: 8,
    className: "node-release",
    tone: "magenta",
    iconSrc: performanceNudgeIcon,
    title: "Performance Nudge"
  }
];

const learners = [
  {
    id: "member-a",
    name: "Asha",
    scoreLabel: "Asha Score",
    cohort: "Operations",
    signal: "On track",
    focus: "Accuracy",
    mapState: "Current",
    score: "92",
    kpiTrends: [
      { label: "Accuracy", values: [88, 90, 91, 92], unit: "%" },
      { label: "FTR", values: [86, 88, 90, 91], unit: "%" }
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
    score: "56",
    kpiTrends: [
      { label: "TAT", values: [61, 58, 55, 52], unit: "%" },
      { label: "Deposit Accuracy", values: [64, 62, 60, 58], unit: "%" }
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
    score: "88",
    kpiTrends: [
      { label: "Review Quality", values: [84, 86, 87, 88], unit: "%" },
      { label: "SLA", values: [83, 85, 87, 88], unit: "%" }
    ],
    context:
      "Meera is stable and can stay on the existing coaching cadence.",
    tone: "rose"
  }
];

const contextualNodeDetails = {
  "member-a-score": {
    chips: [
      { label: "92 / 100" },
      { label: "Excellent", icon: "gem" }
    ]
  },
  "member-b-score": {
    chips: [
      { label: "56 / 100", tone: "warning" },
      { label: "Poor Score", tone: "warning", icon: "alert" }
    ]
  },
  "member-c-score": {
    chips: [
      { label: "88 / 100" },
      { label: "Stable", icon: "gem" }
    ]
  },
  skill: {
    chips: [
      { label: "54 / 100" },
      { label: "Skill: 58" },
      { label: "Will: 50" }
    ]
  },
  outcome: {
    chips: [{ label: "57 / 100" }]
  },
  dashboard: {
    chips: [{ label: "Gap: Skill-Will 54" }]
  },
  "skill-breakdown": {
    chips: [
      { label: "Knowledge: 61" },
      { label: "Behavior: 49" },
      { label: "Skill: 58" }
    ]
  },
  "learning-simulation": {
    chips: [
      { label: "TAT: 52% -> 60%" },
      { label: "Confidence: AI 72%" }
    ]
  },
  "performance-dashboard": {
    chips: [{ label: "Current KPI Index: 57" }]
  },
  kpis: {
    chips: [
      { label: "TAT: 52%" },
      { label: "Deposit Accuracy: 58%" },
      { label: "Period Basis: 49%" },
      { label: "FTR: 63%" }
    ]
  },
  prioritization: {
    chips: [{ label: "Focus: TAT + Period Basis" }]
  },
  approve: {
    chips: [{ label: "Approved target: 56 -> 62" }]
  }
};

const practiceTabs = [
  {
    id: "quiz",
    label: "Quiz",
    iconSrc: quizIcon,
    pointStyle: "choice",
    actionLabel: "Submit",
    title: "TAT confidence check",
    body: "Which action best improves Rohan's TAT score this week?",
    points: ["Prioritize period-basis questions", "Review deposit fields before submission", "Practice one timed claims scenario"]
  },
  {
    id: "flashcard",
    label: "Flashcard",
    iconSrc: knowledgeIcon,
    pointStyle: "checklist",
    actionLabel: "Done",
    title: "Period basis",
    body: "Period basis decides which claim window the deposit belongs to.",
    points: ["Prioritize period-basis questions", "Review deposit fields before submission", "Practice one timed claims scenario"]
  },
  {
    id: "tips",
    label: "Tips",
    iconSrc: reviewApproveIcon,
    pointStyle: "checklist",
    actionLabel: "Submit",
    title: "Coaching tip",
    body: "Ask Rohan to explain the deposit decision in one sentence before submitting.",
    points: ["Keep the prompt short", "Use the same example twice", "Record confidence after each attempt"]
  }
];

const kpiPlaceholderItems = [
  { label: "TAT" },
  { label: "Deposit Accuracy" },
  { label: "Period Basis" },
  { label: "FTR" }
];

const branchNodeIds = {
  skill: ["dashboard", "skill-breakdown", "learning-simulation"],
  outcome: ["performance-dashboard", "kpis", "prioritization"]
};

const sharedTailNodeIds = ["create", "approve", "practice", "released"];
const branchKeys = ["skill", "outcome"];

const getInitialBranchProgress = () => ({
  skill: 0,
  outcome: 0
});

const getStartedBranches = (branchProgress) => (
  branchKeys.filter((branch) => branchProgress[branch] >= 3)
);

const getBranchForNode = (nodeId) => (
  branchKeys.find((branch) => branch === nodeId || branchNodeIds[branch].includes(nodeId))
);

function App() {
  const [level, setLevel] = useState(0);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [branchProgress, setBranchProgress] = useState(getInitialBranchProgress);
  const [isContextualView, setIsContextualView] = useState(false);
  const [isPracticePanelOpen, setIsPracticePanelOpen] = useState(false);
  const [activePracticeTab, setActivePracticeTab] = useState("quiz");
  const startedBranches = useMemo(() => getStartedBranches(branchProgress), [branchProgress]);

  const activeNodeIds = useMemo(() => {
    const hasStartedBranch = startedBranches.length > 0;

    if (level >= 8 && hasStartedBranch) return ["practice", "released"];
    if (level >= 7 && hasStartedBranch) return ["approve"];
    if (level >= 6 && hasStartedBranch) return ["create"];

    const branchActiveNodes = startedBranches.map((branch) => {
      if (branchProgress[branch] >= 5) {
        return branch === "outcome" ? "prioritization" : "learning-simulation";
      }

      if (branchProgress[branch] >= 4) {
        return branch === "outcome" ? "kpis" : "skill-breakdown";
      }

      return branch === "outcome" ? "performance-dashboard" : "dashboard";
    });

    if (branchActiveNodes.length > 0) return branchActiveNodes;
    if (level >= 2) return ["skill", "outcome"];
    if (level >= 1) return ["member-b-score"];
    return ["team"];
  }, [branchProgress, level, startedBranches]);

  const reveal = (nextLevel) => {
    setLevel((current) => Math.max(current, nextLevel));
  };

  const revealNode = (node) => {
    const branch = getBranchForNode(node.id);

    if (branch) {
      setBranchProgress((current) => ({
        ...current,
        [branch]: Math.max(current[branch], node.nextLevel)
      }));
    }

    reveal(node.nextLevel);
  };

  const chooseLearner = (learner) => {
    if (learner.attention) {
      setSelectedLearner(learner);
      setBranchProgress(getInitialBranchProgress());
      reveal(2);
    }
  };

  const chooseBranch = (branch) => {
    setIsPracticePanelOpen(false);
    setBranchProgress((current) => ({
      ...current,
      [branch]: Math.max(current[branch], 3)
    }));
    setLevel((current) => Math.max(current, 3));
  };

  const goBack = () => {
    if (level <= 0) return;

    setIsPracticePanelOpen(false);

    const nextLevel = Math.max(0, level - 1);

    if (nextLevel < 3) {
      setBranchProgress(getInitialBranchProgress());
    } else {
      setBranchProgress((current) => ({
        skill: Math.min(current.skill, nextLevel),
        outcome: Math.min(current.outcome, nextLevel)
      }));
    }

    if (nextLevel < 2) {
      setSelectedLearner(null);
    }

    setLevel(nextLevel);
  };

  const restartFlow = () => {
    setSelectedLearner(null);
    setBranchProgress(getInitialBranchProgress());
    setIsPracticePanelOpen(false);
    setActivePracticeTab("quiz");
    setLevel(0);
  };

  const openPracticePanel = () => {
    setActivePracticeTab("quiz");
    setIsPracticePanelOpen(true);
  };

  const continueToReview = () => {
    setIsPracticePanelOpen(false);
    reveal(8);
  };

  return (
    <main className="app-shell" style={{ "--soft-card-texture": `url(${backgroundTile})` }}>
      <div className="product-frame">
        <TopBar
          isContextualView={isContextualView}
          onBack={goBack}
          onRestart={restartFlow}
          onToggleViewMode={() => setIsContextualView((current) => !current)}
        />
        <section
          className="workspace"
          aria-label="Microability team learning map"
        >
          <JourneyMap
            activePracticeTab={activePracticeTab}
            isContextualView={isContextualView}
            isPracticePanelOpen={isPracticePanelOpen}
            level={level}
            activeNodeIds={activeNodeIds}
            selectedLearner={selectedLearner}
            branchProgress={branchProgress}
            chooseBranch={chooseBranch}
            chooseLearner={chooseLearner}
            closePracticePanel={() => setIsPracticePanelOpen(false)}
            continueToReview={continueToReview}
            openPracticePanel={openPracticePanel}
            revealNode={revealNode}
            selectPracticeTab={setActivePracticeTab}
          />
        </section>
      </div>
    </main>
  );
}

function TopBar({
  isContextualView,
  onBack,
  onRestart,
  onToggleViewMode,
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    const updateScrolledState = () => {
      setIsScrolled(window.scrollY > 2);
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolledState);
    };
  }, []);

  return (
    <header className={`topbar ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="brand-lockup">
        <img className="brand-logo" src={worxogoLogo} alt="worxogo" />
        <span className="brand-divider" aria-hidden="true" />
        <h1>MicroAbility</h1>
      </div>
      <div className="topbar-actions">
        <div className="view-mode-toggle">
          <span>Overview</span>
          <button
            type="button"
            className={`view-switch ${isContextualView ? "is-on" : ""}`}
            aria-label="Toggle contextual view mode"
            aria-pressed={isContextualView}
            onClick={onToggleViewMode}
          >
            <span />
          </button>
          <span>Contextual View</span>
        </div>
        <button type="button" className="map-control-button" onClick={onRestart}>
          <RotateCcw />
          <span>Restart</span>
        </button>
        <button type="button" className="map-control-button" onClick={onBack} aria-label="Go back one step">
          <ArrowLeft />
          <span>Back</span>
        </button>
      </div>
    </header>
  );
}

function JourneyMap({
  activePracticeTab,
  isContextualView,
  isPracticePanelOpen,
  level,
  activeNodeIds,
  selectedLearner,
  branchProgress,
  chooseBranch,
  chooseLearner,
  closePracticePanel,
  continueToReview,
  openPracticePanel,
  revealNode,
  selectPracticeTab,
}) {
  const gridRef = useRef(null);
  const [connectorSegments, setConnectorSegments] = useState([]);
  const visibleFlow = getVisibleFlow(level, branchProgress);

  useLayoutEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return undefined;

    const updateConnectors = () => {
      setConnectorSegments(buildConnectorSegments(gridElement, level, branchProgress));
    };

    updateConnectors();
    const frameId = window.requestAnimationFrame(updateConnectors);
    const settleId = window.setTimeout(updateConnectors, 520);
    const observer = new ResizeObserver(updateConnectors);
    observer.observe(gridElement);

    window.addEventListener("resize", updateConnectors);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(settleId);
      observer.disconnect();
      window.removeEventListener("resize", updateConnectors);
    };
  }, [branchProgress, isContextualView, level, visibleFlow.length]);

  return (
    <section className="journey-map">
      <div
        ref={gridRef}
        className={`journey-grid is-level-${level} ${
          isContextualView ? "is-contextual-view" : ""
        } ${selectedLearner ? "has-selected-learner" : ""}`}
      >
        <ConnectorLayer segments={connectorSegments} />
        {visibleFlow.map((node) => {
          const completed = isNodeComplete(node, level, selectedLearner, branchProgress);

          return (
            <JourneyNode
              key={node.id}
              node={node}
              active={activeNodeIds.includes(node.id)}
              completed={completed}
              contextual={isContextualView}
              selected={selectedLearner?.id === "member-b" && node.id === "member-b-score"}
              locked={level < node.unlocksAt}
              onOpenPracticePanel={openPracticePanel}
              onLearnerSelect={chooseLearner}
              onBranchSelect={chooseBranch}
              onRevealNode={revealNode}
            />
          );
        })}
        {isPracticePanelOpen && (
          <PracticePanel
            activeTab={activePracticeTab}
            onClose={closePracticePanel}
            onSelectTab={selectPracticeTab}
            onNext={continueToReview}
          />
        )}
      </div>
    </section>
  );
}

function getVisibleFlow(level, branchProgress) {
  const hasStartedBranch = getStartedBranches(branchProgress).length > 0;

  return flow.filter((node) => {
    if (branchNodeIds.skill.includes(node.id)) {
      return branchProgress.skill >= node.unlocksAt;
    }

    if (branchNodeIds.outcome.includes(node.id)) {
      return branchProgress.outcome >= node.unlocksAt;
    }

    if (sharedTailNodeIds.includes(node.id)) {
      return hasStartedBranch && node.unlocksAt <= level;
    }

    if (node.unlocksAt > level) return false;

    return true;
  });
}

function ConnectorLayer({ segments }) {
  return (
    <div className="connector-layer" aria-hidden="true">
      {segments.map((segment) => (
        <span
          key={segment.key}
          className={`connector-segment is-${segment.orientation} ${
            segment.variant ? `is-${segment.variant}` : ""
          }`}
          style={{
            left: `${segment.left}px`,
            top: `${segment.top}px`,
            width: `${segment.width}px`,
            height: `${segment.height}px`
          }}
        />
      ))}
    </div>
  );
}

function buildConnectorSegments(gridElement, level, branchProgress) {
  const gridRect = gridElement.getBoundingClientRect();
  const segments = [];
  const thickness = 2;
  const overlap = 2;

  const pointFor = (nodeId, edge = "bottom") => {
    const node = flow.find((item) => item.id === nodeId);
    const element = node ? gridElement.querySelector(`.${node.className}`) : null;

    if (!element) return null;

    const rect = element.getBoundingClientRect();
    const inset = 28;
    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;

    if (edge === "left") x = rect.left;
    if (edge === "right") x = rect.right;
    if (edge === "top") y = rect.top;
    if (edge === "bottom") y = rect.bottom;
    if (edge === "top-left") {
      x = rect.left + inset;
      y = rect.top;
    }
    if (edge === "top-right") {
      x = rect.right - inset;
      y = rect.top;
    }

    return {
      x: x - gridRect.left,
      y: y - gridRect.top
    };
  };

  const addVertical = (x, y1, y2, key) => {
    const top = Math.min(y1, y2);
    const height = Math.abs(y2 - y1);

    if (height <= 0) return;

    segments.push({
      key,
      orientation: "vertical",
      left: x - thickness / 2,
      top,
      width: thickness,
      height
    });
  };

  const addHorizontal = (x1, x2, y, key, variant) => {
    const left = Math.min(x1, x2);
    const width = Math.abs(x2 - x1);

    if (width <= 0) return;

    segments.push({
      key,
      orientation: "horizontal",
      left,
      top: y - thickness / 2,
      width,
      height: thickness,
      variant
    });
  };

  const addBranch = (sourceId, targetIds, key) => {
    const source = pointFor(sourceId, "bottom");
    const targets = targetIds.map((id) => pointFor(id, "top")).filter(Boolean);

    if (!source || targets.length === 0) return;

    const midY = source.y + Math.max(10, (Math.min(...targets.map((target) => target.y)) - source.y) / 2);
    const minX = Math.min(...targets.map((target) => target.x));
    const maxX = Math.max(...targets.map((target) => target.x));

    addVertical(source.x, source.y - overlap, midY, `${key}-source`);
    addHorizontal(minX, maxX, midY, `${key}-bar`);
    targets.forEach((target, index) => {
      addVertical(target.x, midY, target.y + overlap, `${key}-target-${index}`);
    });
  };

  const addJoin = (sourceIds, targetId, key) => {
    const sources = sourceIds.map((id) => pointFor(id, "bottom")).filter(Boolean);
    const target = pointFor(targetId, "top");

    if (sources.length === 0 || !target) return;

    const lowestSourceY = Math.max(...sources.map((source) => source.y));
    const midY = lowestSourceY + Math.max(12, (target.y - lowestSourceY) / 2);
    const allX = [...sources.map((source) => source.x), target.x];
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);

    sources.forEach((source, index) => {
      addVertical(source.x, source.y - overlap, midY, `${key}-source-${index}`);
    });
    addHorizontal(minX, maxX, midY, `${key}-bar`);
    addVertical(target.x, midY, target.y + overlap, `${key}-target`);
  };

  const addDottedBridge = (sourceId, targetId, key) => {
    const source = pointFor(sourceId, "right");
    const target = pointFor(targetId, "left");

    if (!source || !target) return;

    addHorizontal(source.x + overlap, target.x - overlap, (source.y + target.y) / 2, key, "dotted");
  };

  const addReviewSplit = () => {
    const source = pointFor("approve", "bottom");
    const practice = pointFor("practice", "top-right");
    const released = pointFor("released", "top-left");

    if (!source || !practice || !released) return;

    const targetY = Math.min(practice.y, released.y);
    const midY = source.y + Math.max(12, (targetY - source.y) / 2);

    addVertical(source.x, source.y - overlap, midY, "approve-to-release-paths-source");
    addHorizontal(practice.x, released.x, midY, "approve-to-release-paths-bar");
    addVertical(practice.x, midY, practice.y + overlap, "approve-to-release-paths-practice");
    addVertical(released.x, midY, released.y + overlap, "approve-to-release-paths-release");
  };

  const addLink = (sourceId, targetId, key) => {
    const source = pointFor(sourceId, "bottom");
    const target = pointFor(targetId, "top");

    if (!source || !target) return;

    if (Math.abs(source.x - target.x) < 2) {
      addVertical(source.x, source.y - overlap, target.y + overlap, key);
      return;
    }

    const midY = source.y + (target.y - source.y) / 2;
    addVertical(source.x, source.y - overlap, midY, `${key}-source`);
    addHorizontal(source.x, target.x, midY, `${key}-bar`);
    addVertical(target.x, midY, target.y + overlap, `${key}-target`);
  };

  if (level >= 1) {
    addBranch("team", ["member-a-score", "member-b-score", "member-c-score"], "team-to-members");
  }

  if (level >= 2) {
    addBranch("member-b-score", ["skill", "outcome"], "rohan-to-scores");
  }

  if (level >= 3) {
    if (branchProgress.skill >= 3) {
      addLink("skill", "dashboard", "skill-to-learning-dashboard");
    }

    if (branchProgress.outcome >= 3) {
      addLink("outcome", "performance-dashboard", "outcome-to-performance-dashboard");
    }
  }

  if (level >= 4) {
    if (branchProgress.skill >= 4) {
      addLink("dashboard", "skill-breakdown", "learning-dashboard-to-skill-breakdown");
    }

    if (branchProgress.outcome >= 4) {
      addLink("performance-dashboard", "kpis", "performance-dashboard-to-kpis");
    }
  }

  if (level >= 5) {
    if (branchProgress.skill >= 5) {
      addLink("skill-breakdown", "learning-simulation", "skill-breakdown-to-learning-simulation");
    }

    if (branchProgress.outcome >= 5) {
      addLink("kpis", "prioritization", "kpis-to-prioritization");
    }

    if (branchProgress.skill >= 5 && branchProgress.outcome >= 5) {
      addDottedBridge("learning-simulation", "prioritization", "simulation-to-prioritization");
    }
  }

  if (level >= 6) {
    if (branchProgress.skill >= 6) {
      addLink("learning-simulation", "create", "learning-simulation-to-create");
    }

    if (branchProgress.outcome >= 6) {
      addLink("prioritization", "create", "prioritization-to-create");
    }
  }

  if (level >= 7) {
    addLink("create", "approve", "create-to-approve");
  }

  if (level >= 8) {
    addReviewSplit();
  }

  return segments;
}

function isNodeComplete(node, level, selectedLearner, branchProgress) {
  const learner = getLearnerForNode(node.id);
  const branch = getBranchForNode(node.id);

  if (node.id === "team") {
    return level >= 1;
  }

  if (learner) {
    return selectedLearner?.id === learner.id;
  }

  if (node.id === "skill" || node.id === "outcome") {
    return branchProgress[node.id] >= 3;
  }

  if (node.id === "practice") {
    return level >= 8;
  }

  if (branch) {
    return branchProgress[branch] > node.unlocksAt;
  }

  return level > node.unlocksAt;
}

function JourneyNode({
  node,
  active,
  completed,
  contextual,
  selected,
  locked,
  onOpenPracticePanel,
  onBranchSelect,
  onRevealNode,
  onLearnerSelect,
}) {
  const learner = getLearnerForNode(node.id);
  const contextualDetail = contextual ? contextualNodeDetails[node.id] : null;
  const isKpiNode = node.id === "kpis";
  const chips = contextualDetail?.chips ?? [];
  const kpiItems = contextual ? contextualNodeDetails.kpis.chips : kpiPlaceholderItems;
  const handleClick = () => {
    if (learner) {
      onLearnerSelect(learner);
      return;
    }

    if (node.id === "practice") {
      onOpenPracticePanel();
      return;
    }

    if (node.id === "skill" || node.id === "outcome") {
      onBranchSelect(node.id);
      return;
    }

    onRevealNode(node);
  };

  return (
    <button
      type="button"
      className={`journey-node ${node.className} ${node.tone} ${active ? "is-active" : ""} ${
        completed ? "is-complete" : ""
      } ${selected ? "is-selected" : ""} ${locked ? "is-locked" : ""}`}
      disabled={locked}
      aria-hidden={locked}
      onClick={handleClick}
    >
      {isKpiNode ? (
        <>
          <span className="icon-tile kpi-card-icon">
            <img src={node.iconSrc} alt="" aria-hidden="true" />
          </span>
          <span className="kpi-node-body">
            <strong className="kpi-node-title">{node.title}</strong>
            <span className="node-chip-row kpi-chip-row">
              {kpiItems.map((item) => (
                <span
                  key={item.label}
                  className={`node-chip ${item.tone ? `is-${item.tone}` : ""}`}
                >
                  {item.label}
                </span>
              ))}
            </span>
          </span>
        </>
      ) : (
        <>
          <span className="icon-tile">
            <img src={node.iconSrc} alt="" aria-hidden="true" />
          </span>
          <span className="node-copy">
            <strong>{node.title}</strong>
            {node.subtitle && <span className="node-chip is-subtitle">{node.subtitle}</span>}
            {chips.length > 0 && (
              <span className="node-chip-row">
                {chips.map((chip) => (
                  <span
                    key={chip.label}
                    className={`node-chip ${chip.tone ? `is-${chip.tone}` : ""}`}
                  >
                    {chip.icon === "gem" && <Gem aria-hidden="true" />}
                    {chip.icon === "alert" && <TriangleAlert aria-hidden="true" />}
                    {chip.label}
                  </span>
                ))}
              </span>
            )}
          </span>
        </>
      )}
      {(completed || selected) && (
        <span className="done-mark" aria-label="Completed">
          <Check size={15} />
        </span>
      )}
    </button>
  );
}

function PracticePanel({
  activeTab,
  onClose,
  onSelectTab,
  onNext,
}) {
  const activePractice = practiceTabs.find((tab) => tab.id === activeTab) ?? practiceTabs[0];

  return (
    <aside className="practice-drawer" aria-label="Practice panel">
      <div className="practice-drawer-header">
        <div>
          <h2>Rohan's Focus Practice</h2>
          <p>{activePractice.label}</p>
        </div>
        <button type="button" className="drawer-icon-button" aria-label="Close practice panel" onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="practice-tabs" role="tablist" aria-label="Practice options">
        {practiceTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTab}
            className={tab.id === activeTab ? "is-selected" : ""}
            onClick={() => onSelectTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="practice-tab-panel" aria-label={`${activePractice.label} practice`}>
        <span className="practice-panel-icon">
          <img src={activePractice.iconSrc} alt="" aria-hidden="true" />
        </span>
        <div>
          <h3>{activePractice.title}</h3>
          <p>{activePractice.body}</p>
        </div>
        <div className={`practice-point-list is-${activePractice.pointStyle}`}>
          {activePractice.points.map((point) => (
            <span key={point}>
              {activePractice.pointStyle === "checklist" && <Check aria-hidden="true" />}
              {point}
            </span>
          ))}
        </div>
      </section>

      <button type="button" className="simulate-action" onClick={onNext}>
        <span>{activePractice.actionLabel}</span>
      </button>
    </aside>
  );
}

function getLearnerForNode(nodeId) {
  const learnerNodeMap = {
    "member-a-score": "member-a",
    "member-b-score": "member-b",
    "member-c-score": "member-c"
  };

  return learners.find((learner) => learner.id === learnerNodeMap[nodeId]);
}

const rootElement = document.getElementById("root");
const root = globalThis.__microabilityRoot ?? createRoot(rootElement);
globalThis.__microabilityRoot = root;
root.render(<App />);
