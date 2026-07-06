import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { RoadmapPhase } from '../types/appShowcase';
import { airbnbColors } from '../theme/airbnbTheme';

interface AppRoadmapPhasesProps {
  phases: RoadmapPhase[];
}

const statusLabel: Record<RoadmapPhase['status'], string> = {
  complete: 'Complete',
  'in-progress': 'In progress',
  planned: 'Planned',
};

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
  },
  phase: {
    padding: theme.spacing(2.5),
    borderRadius: 10,
    border: '1px solid rgba(255, 255, 255, 0.14)',
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
  },
  phaseHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  phaseNumber: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: airbnbColors.rausch,
  },
  phaseTitle: {
    fontWeight: 700,
    fontSize: '1.1rem',
    color: '#ffffff',
    flex: 1,
    minWidth: 180,
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 10px',
    borderRadius: 4,
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
  },
  statusComplete: {
    color: '#e8fff9',
    backgroundColor: 'rgba(0, 166, 153, 0.55)',
    border: '1px solid rgba(0, 166, 153, 0.8)',
  },
  statusInProgress: {
    color: '#1a1400',
    backgroundColor: 'rgba(255, 180, 50, 0.92)',
    border: '1px solid rgba(255, 200, 80, 1)',
  },
  statusPlanned: {
    color: 'rgba(255, 255, 255, 0.88)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  summary: {
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 1.65,
    fontSize: '0.925rem',
    marginBottom: theme.spacing(1.5),
  },
  flow: {
    margin: theme.spacing(0, 0, 1.5),
    padding: theme.spacing(1.5),
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.78)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '0.8rem',
    lineHeight: 1.55,
    whiteSpace: 'pre-wrap',
    overflowX: 'auto',
  },
  items: {
    margin: 0,
    paddingLeft: theme.spacing(2.5),
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.875rem',
    lineHeight: 1.65,
  },
  item: {
    marginBottom: theme.spacing(0.5),
  },
}));

export default function AppRoadmapPhases({ phases }: AppRoadmapPhasesProps) {
  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {phases.map((phase) => (
        <li key={phase.number} className={classes.phase}>
          <div className={classes.phaseHeader}>
            <Typography className={classes.phaseNumber} component="span">
              Phase {phase.number}
            </Typography>
            <Typography className={classes.phaseTitle} component="h3">
              {phase.title}
            </Typography>
            <span
              className={clsx(
                classes.statusBadge,
                phase.status === 'complete' && classes.statusComplete,
                phase.status === 'in-progress' && classes.statusInProgress,
                phase.status === 'planned' && classes.statusPlanned,
              )}
            >
              {statusLabel[phase.status]}
            </span>
          </div>
          <Typography className={classes.summary} component="p">
            {phase.summary}
          </Typography>
          {phase.flow && <pre className={classes.flow}>{phase.flow}</pre>}
          <ul className={classes.items}>
            {phase.items.map((item) => (
              <li key={item} className={classes.item}>
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
