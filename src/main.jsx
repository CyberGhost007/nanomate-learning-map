import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  MapIcon,
  RotateCcw,
  Target,
  TrendingUp,
  UserRound,
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
    title: "4 KPIs in One Box"
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
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [isContextualView, setIsContextualView] = useState(true);

  const activeNode = useMemo(() => {
    if (level >= 9) return "released";
    if (level >= 8) return "approve";
    if (level >= 7) return "simulate";
    if (level >= 6) return "practice";
    if (level >= 5) return "create";
    if (level >= 4) return "kpis";
    if (level >= 3) return "dashboard";
    if (level >= 2) return "skill";
    if (level >= 1) return "member-b-score";
    return "team";
  }, [level]);

  const reveal = (nextLevel) => {
    setLevel((current) => Math.max(current, nextLevel));
  };

  const chooseLearner = (learner) => {
    if (learner.attention) {
      setSelectedLearner(learner);
      reveal(2);
    }
  };

  const goBack = () => {
    if (level <= 0) return;

    if (level <= 2) {
      setSelectedLearner(null);
    }

    setLevel((current) => Math.max(0, current - 1));
  };

  const restartFlow = () => {
    setSelectedLearner(null);
    setLevel(0);
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
        <section className="workspace" aria-label="Microability team learning map">
          <JourneyMap
            level={level}
            activeNode={activeNode}
            selectedLearner={selectedLearner}
            chooseLearner={chooseLearner}
            reveal={reveal}
          />
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
  level,
  activeNode,
  selectedLearner,
  chooseLearner,
  reveal,
}) {
  const gridRef = useRef(null);
  const [connectorSegments, setConnectorSegments] = useState([]);
  const visibleFlow = getVisibleFlow(level);

  useLayoutEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return undefined;

    const updateConnectors = () => {
      setConnectorSegments(buildConnectorSegments(gridElement, level));
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
  }, [level, visibleFlow.length]);

  return (
    <section className="journey-map">
      <div
        ref={gridRef}
        className={`journey-grid is-level-${level} ${selectedLearner ? "has-selected-learner" : ""}`}
      >
        <ConnectorLayer segments={connectorSegments} />
        {visibleFlow.map((node) => {
          const completed = isNodeComplete(node, level, selectedLearner);

          return (
            <JourneyNode
              key={node.id}
              node={node}
              active={node.id === activeNode}
              completed={completed}
              selected={selectedLearner?.id === "member-b" && node.id === "member-b-score"}
              locked={level < node.unlocksAt}
              onLearnerSelect={chooseLearner}
              reveal={reveal}
            />
          );
        })}
      </div>
    </section>
  );
}

function getVisibleFlow(level) {
  return flow.filter((node) => node.unlocksAt <= level);
}

function ConnectorLayer({ segments }) {
  return (
    <div className="connector-layer" aria-hidden="true">
      {segments.map((segment) => (
        <span
          key={segment.key}
          className={`connector-segment is-${segment.orientation}`}
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

function buildConnectorSegments(gridElement, level) {
  const gridRect = gridElement.getBoundingClientRect();
  const segments = [];
  const thickness = 5;
  const overlap = 8;

  const pointFor = (nodeId, edge = "bottom") => {
    const node = flow.find((item) => item.id === nodeId);
    const element = node ? gridElement.querySelector(`.${node.className}`) : null;

    if (!element) return null;

    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - gridRect.left,
      y: (edge === "top" ? rect.top : rect.bottom) - gridRect.top
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

  const addHorizontal = (x1, x2, y, key) => {
    const left = Math.min(x1, x2);
    const width = Math.abs(x2 - x1);

    if (width <= 0) return;

    segments.push({
      key,
      orientation: "horizontal",
      left,
      top: y - thickness / 2,
      width,
      height: thickness
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

  const downstreamNodes = ["outcome", "dashboard", "kpis", "create", "practice", "simulate", "approve", "released"];
  downstreamNodes
    .filter((nodeId) => flow.find((node) => node.id === nodeId)?.unlocksAt <= level)
    .forEach((nodeId, index, visibleNodes) => {
      const nextNodeId = visibleNodes[index + 1];

      if (nextNodeId) {
        addLink(nodeId, nextNodeId, `${nodeId}-to-${nextNodeId}`);
      }
    });

  return segments;
}

function isNodeComplete(node, level, selectedLearner) {
  const learner = getLearnerForNode(node.id);

  if (node.id === "team") {
    return level >= 1;
  }

  if (learner) {
    return selectedLearner?.id === learner.id;
  }

  if (node.id === "skill" || node.id === "outcome") {
    return level >= 3;
  }

  return level > node.unlocksAt;
}

function JourneyNode({ node, active, completed, selected, locked, reveal, onLearnerSelect }) {
  const Icon = node.icon;
  const learner = getLearnerForNode(node.id);
  const handleClick = () => {
    if (learner) {
      onLearnerSelect(learner);
      return;
    }

    reveal(node.nextLevel);
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
      <span className="icon-tile">
        <Icon />
      </span>
      <span className="node-copy">
        <strong>{node.title}</strong>
        {node.subtitle && <span>{node.subtitle}</span>}
      </span>
      {node.id === "kpis" && <KpiMiniRow />}
      {(completed || selected) && (
        <span className="done-mark" aria-label="Completed">
          <Check size={15} />
        </span>
      )}
    </button>
  );
}

function KpiMiniRow() {
  return (
    <span className="kpi-mini-row" aria-hidden="true">
      <span>KPI 1</span>
      <span>KPI 2</span>
      <span>KPI 3</span>
    </span>
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

createRoot(document.getElementById("root")).render(<App />);
