import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Lightbulb,
  MapIcon,
  RotateCcw,
  Target,
  TrendingUp,
  UserRound,
  X,
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
    title: "Rohan Score"
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
    icon: BarChart3,
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
    className: "node-learning-dashboard",
    tone: "blue",
    icon: BarChart3,
    title: "Learning Dashboard"
  },
  {
    id: "skill-breakdown",
    unlocksAt: 4,
    nextLevel: 5,
    className: "node-skill-breakdown",
    tone: "violet",
    icon: BookOpen,
    title: "Knowledge, Behavior, Skill"
  },
  {
    id: "learning-simulation",
    unlocksAt: 5,
    nextLevel: 6,
    className: "node-learning-simulation",
    tone: "sky",
    icon: TrendingUp,
    title: "Simulation"
  },
  {
    id: "performance-dashboard",
    unlocksAt: 3,
    nextLevel: 4,
    className: "node-performance-dashboard",
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
    title: "KPIs"
  },
  {
    id: "prioritization",
    unlocksAt: 5,
    nextLevel: 6,
    className: "node-prioritization",
    tone: "gold",
    icon: Target,
    title: "Prioritization"
  },
  {
    id: "create",
    unlocksAt: 6,
    nextLevel: 7,
    className: "node-create-map",
    tone: "sky",
    icon: MapIcon,
    title: "Create MAP for TAT - (9 Week Plan)"
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
    id: "practice",
    unlocksAt: 8,
    nextLevel: 8,
    className: "node-practice-box",
    tone: "gold",
    icon: BookOpen,
    title: "Quiz, Flashcard & Tip"
  },
  {
    id: "released",
    unlocksAt: 8,
    nextLevel: 8,
    className: "node-release",
    tone: "magenta",
    icon: MapIcon,
    title: "Performance Nudges"
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

const contextualNodeDetails = {
  team: {
    primary: "Team average: 85/100"
  },
  "member-a-score": {
    primary: "92/100",
    metric: "Performance: Excellent"
  },
  "member-b-score": {
    primary: "58/100",
    metric: "Performance: Poor",
    severity: "danger"
  },
  "member-c-score": {
    primary: "88/100",
    metric: "Performance: Very Good"
  },
  skill: {
    primary: "Skill: 85, Will: 71",
    metric: "Combined: 78"
  },
  outcome: {
    primary: "82/100"
  },
  dashboard: {
    primary: "Readiness view",
    metric: "Skill + will signals"
  },
  "skill-breakdown": {
    items: [
      { label: "Knowledge", value: "82" },
      { label: "Behavior", value: "76" },
      { label: "Skill", value: "85" }
    ]
  },
  "learning-simulation": {
    variant: "simulation",
    lift: "5%",
    primary: "Improvement in TAT over 9 Weeks",
    confidence: "75%"
  },
  "performance-dashboard": {
    primary: "KPI trend view",
    metric: "TAT outcome signals"
  },
  kpis: {
    items: [
      { label: "TAT", value: "58%", severity: "danger" },
      { label: "Deposit Accuracy", value: "64%" },
      { label: "Period Basis", value: "61%" },
      { label: "FTR", value: "72%" }
    ]
  },
  prioritization: {
    primary: "TAT selected",
    metric: "Highest-impact coaching path"
  },
  approve: {
    primary: "Manager review ready",
    metric: "TAT map approved for release"
  }
};

const practiceTabs = [
  {
    id: "quiz",
    label: "Quiz",
    icon: CheckCircle2,
    title: "TAT confidence check",
    body: "Which action best improves Rohan's TAT score this week?",
    points: ["Prioritize period-basis questions", "Review deposit fields before submission", "Practice one timed claims scenario"]
  },
  {
    id: "flashcard",
    label: "Flashcard",
    icon: BookOpen,
    title: "Period basis",
    body: "Period basis decides which claim window the deposit belongs to.",
    points: ["Confirm the date range", "Match it with the claim rule", "Check the exception note before closing"]
  },
  {
    id: "tips",
    label: "Tips",
    icon: Lightbulb,
    title: "Coaching tip",
    body: "Ask Rohan to explain the deposit decision in one sentence before submitting.",
    points: ["Keep the prompt short", "Use the same example twice", "Record confidence after each attempt"]
  }
];

const kpiPlaceholderItems = [
  { label: "KPI-1", severity: "danger" },
  { label: "KPI-2" },
  { label: "KPI-3" },
  { label: "KPI-4" }
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
    <main className="app-shell">
      <div className="product-frame">
        <TopBar
          canGoBack={level > 0}
          isContextualView={isContextualView}
          onBack={goBack}
          onRestart={restartFlow}
          onToggleViewMode={() => setIsContextualView((current) => !current)}
        />
        <section
          className={`workspace ${isPracticePanelOpen ? "has-side-panel" : ""}`}
          aria-label="Microability team learning map"
        >
          <JourneyMap
            isContextualView={isContextualView}
            level={level}
            activeNodeIds={activeNodeIds}
            selectedLearner={selectedLearner}
            branchProgress={branchProgress}
            chooseBranch={chooseBranch}
            chooseLearner={chooseLearner}
            openPracticePanel={openPracticePanel}
            revealNode={revealNode}
          />
          {isPracticePanelOpen && (
            <PracticePanel
              activeTab={activePracticeTab}
              onClose={() => setIsPracticePanelOpen(false)}
              onSelectTab={setActivePracticeTab}
              onNext={continueToReview}
            />
          )}
        </section>
      </div>
    </main>
  );
}

function TopBar({
  canGoBack,
  isContextualView,
  onBack,
  onRestart,
  onToggleViewMode,
}) {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <span className="brand-mark">N</span>
        <div>
          <h1>Microability</h1>
          <p>Outcome-led Learning</p>
        </div>
      </div>
      <div className="topbar-actions">
        <div className="view-mode-toggle">
          <span>View Mode:</span>
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
        {canGoBack && (
          <>
            <button type="button" className="map-control-button" onClick={onBack}>
              <ArrowLeft />
              <span>Back</span>
            </button>
            <button type="button" className="map-control-button" onClick={onRestart}>
              <RotateCcw />
              <span>Restart</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}

function JourneyMap({
  isContextualView,
  level,
  activeNodeIds,
  selectedLearner,
  branchProgress,
  chooseBranch,
  chooseLearner,
  openPracticePanel,
  revealNode,
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
  const thickness = 4;
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
  const Icon = node.icon;
  const learner = getLearnerForNode(node.id);
  const contextualDetail = contextual ? contextualNodeDetails[node.id] : null;
  const isKpiNode = node.id === "kpis";
  const kpiItems = contextual ? contextualNodeDetails.kpis.items : kpiPlaceholderItems;
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
            <Icon />
          </span>
          <span className="kpi-node-body">
            <strong className="kpi-node-title">{node.title}</strong>
            <span className="kpi-tile-grid">
              {kpiItems.map((item) => (
                <span
                  key={item.label}
                  className={`kpi-tile ${item.value ? "has-value" : "is-placeholder"} ${
                    item.severity ? `is-${item.severity}` : ""
                  }`}
                >
                  <strong>{item.label}</strong>
                  {item.value && <em>{item.value}</em>}
                </span>
              ))}
            </span>
          </span>
        </>
      ) : (
        <>
          <span className="icon-tile">
            <Icon />
          </span>
          <span className="node-copy">
            <strong>{node.title}</strong>
            {node.subtitle && <span>{node.subtitle}</span>}
            {contextualDetail && (
              <span
                className={`context-detail-card ${
                  contextualDetail.severity ? `is-${contextualDetail.severity}` : ""
                } ${
                  contextualDetail.variant ? `is-${contextualDetail.variant}` : ""
                }`}
              >
                {contextualDetail.variant === "simulation" ? (
                  <span className="simulation-context">
                    <span className="simulation-impact">
                      <strong>{contextualDetail.lift}</strong>
                      <span>{contextualDetail.primary}</span>
                    </span>
                    <span className="simulation-confidence">
                      <span>AI</span>
                      <strong>{contextualDetail.confidence}</strong>
                      <em>confidence</em>
                    </span>
                  </span>
                ) : contextualDetail.items ? (
                  <span className="kpi-context-list">
                    {contextualDetail.items.map((item) => (
                      <span
                        key={item.label}
                        className={item.severity ? `is-${item.severity}` : undefined}
                      >
                        <strong>{item.label}</strong>
                        {item.value && <em>{item.value}</em>}
                      </span>
                    ))}
                  </span>
                ) : (
                  <>
                    <strong>{contextualDetail.primary}</strong>
                    {contextualDetail.metric && (
                      <span>
                        <BarChart3 />
                        {contextualDetail.metric}
                      </span>
                    )}
                  </>
                )}
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
  const ActiveIcon = activePractice.icon;

  return (
    <aside className="practice-drawer" aria-label="Practice panel">
      <div className="practice-drawer-header">
        <div>
          <h2>Rohan Focus Practice</h2>
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
          <ActiveIcon />
        </span>
        <div>
          <h3>{activePractice.title}</h3>
          <p>{activePractice.body}</p>
        </div>
        <div className="practice-point-list">
          {activePractice.points.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </section>

      <button type="button" className="simulate-action" onClick={onNext}>
        <TrendingUp />
        <span>Done</span>
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
