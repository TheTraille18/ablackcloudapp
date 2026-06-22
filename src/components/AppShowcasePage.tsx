import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import clsx from 'clsx';
import AppArchitectureDiagram from './AppArchitectureDiagram';
import AppStatusBadge from './AppStatusBadge';
import { getCatalogAppBySlug } from '../data/apps';
import { AppShowcaseContent } from '../types/appShowcase';
import { airbnbColors } from '../theme/airbnbTheme';

interface AppShowcasePageProps {
  content: AppShowcaseContent;
  slug: string;
  children?: ReactNode;
  demoTitle?: string;
}

export default function AppShowcasePage({
  content,
  slug,
  children,
  demoTitle = 'Live demo',
}: AppShowcasePageProps) {
  const useStyles = makeStyles((theme) => ({
    page: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: theme.spacing(3, 3, 6),
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '1fr 340px',
      gap: theme.spacing(3),
      alignItems: 'start',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
    },
    mainColumn: {
      minWidth: 0,
    },
    sidebarColumn: {
      [theme.breakpoints.up('md')]: {
        position: 'sticky',
        top: theme.spacing(10),
      },
    },
    card: {
      padding: theme.spacing(4),
      borderRadius: 12,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      textAlign: 'left',
      marginBottom: theme.spacing(3),
    },
    sidebarCard: {
      marginBottom: 0,
    },
    title: {
      fontWeight: 800,
      fontSize: '2rem',
      color: '#ffffff',
      marginBottom: theme.spacing(1),
      textShadow: '0 1px 8px rgba(0,0,0,0.4)',
    },
    titleRow: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
    },
    tagline: {
      color: 'rgba(255, 255, 255, 0.88)',
      lineHeight: 1.6,
      marginBottom: theme.spacing(2.5),
    },
    sectionTitle: {
      fontWeight: 700,
      fontSize: '1.25rem',
      color: '#ffffff',
      marginBottom: theme.spacing(1.5),
      textShadow: '0 1px 8px rgba(0,0,0,0.4)',
    },
    sectionTitleRow: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: theme.spacing(1),
      marginBottom: theme.spacing(1.5),
    },
    wipBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 10px',
      borderRadius: 4,
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.03em',
      color: '#1a1400',
      backgroundColor: 'rgba(255, 180, 50, 0.92)',
      border: '1px solid rgba(255, 200, 80, 1)',
    },
    bodyText: {
      color: 'rgba(255, 255, 255, 0.88)',
      lineHeight: 1.7,
      marginBottom: theme.spacing(1.5),
      '&:last-child': {
        marginBottom: 0,
      },
    },
    githubRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing(1.5),
    },
    githubBtn: {
      backgroundColor: airbnbColors.rausch,
      color: airbnbColors.background,
      fontWeight: 600,
      '&:hover': {
        backgroundColor: '#e84e53',
      },
    },
    githubBtnSecondary: {
      borderColor: 'rgba(255, 255, 255, 0.45)',
      color: '#ffffff',
      fontWeight: 600,
      '&:hover': {
        borderColor: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    timeline: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    timelineItem: {
      position: 'relative',
      paddingLeft: theme.spacing(3),
      paddingBottom: theme.spacing(2.5),
      borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
      '&:last-child': {
        paddingBottom: 0,
        borderLeftColor: 'transparent',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        left: -6,
        top: 4,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: airbnbColors.rausch,
        boxShadow: '0 0 0 3px rgba(255, 90, 95, 0.25)',
      },
    },
    updateDate: {
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: airbnbColors.rausch,
      marginBottom: theme.spacing(0.5),
    },
    updateTitle: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#ffffff',
      marginBottom: theme.spacing(0.5),
    },
    updateDetail: {
      color: 'rgba(255, 255, 255, 0.82)',
      lineHeight: 1.6,
      fontSize: '0.875rem',
    },
    diagramCaption: {
      marginTop: theme.spacing(1.5),
      color: 'rgba(255, 255, 255, 0.65)',
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    toolGroups: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2.5),
    },
    toolGroupsWip: {
      opacity: 0.72,
    },
    toolsWipNote: {
      marginBottom: theme.spacing(1.5),
      color: 'rgba(255, 255, 255, 0.72)',
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontStyle: 'italic',
    },
    toolGroup: {
      margin: 0,
    },
    toolCategory: {
      fontWeight: 600,
      fontSize: '0.8rem',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: airbnbColors.rausch,
      marginBottom: theme.spacing(1),
    },
    toolList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing(1),
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    toolPill: {
      padding: '6px 12px',
      borderRadius: 20,
      fontSize: '0.85rem',
      fontWeight: 500,
      color: '#ffffff',
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    demoCard: {
      marginBottom: 0,
    },
  }));

  const classes = useStyles();
  const catalogApp = getCatalogAppBySlug(slug);
  const {
    title,
    tagline,
    githubUrl,
    githubLabel,
    githubSecondaryUrl,
    githubSecondaryLabel,
    summary,
    architectureCaption,
    diagram,
    toolsUsed,
    progressUpdates,
    workInProgress,
  } = content;

  const showArchitectureWip = Boolean(workInProgress || diagram.workInProgress);
  const architectureWipLabel = diagram.workInProgressLabel ?? 'Work in progress';
  const showToolsWip = Boolean(workInProgress);
  const diagramConfig = {
    ...diagram,
    workInProgress: showArchitectureWip,
  };

  return (
    <div className={classes.page}>
      <div className={classes.layout}>
        <div className={classes.mainColumn}>
          <div className={classes.card}>
            <div className={classes.titleRow}>
              <Typography className={classes.title} component="h1" style={{ marginBottom: 0 }}>
                {title}
              </Typography>
              {catalogApp && <AppStatusBadge status={catalogApp.status} size="md" />}
            </div>
            <Typography className={classes.tagline}>{tagline}</Typography>
            {githubUrl && (
              <div className={classes.githubRow}>
                <Button
                  className={classes.githubBtn}
                  variant="contained"
                  startIcon={<GitHubIcon />}
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {githubLabel ?? 'View on GitHub'}
                </Button>
                {githubSecondaryUrl && (
                  <Button
                    className={classes.githubBtnSecondary}
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href={githubSecondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {githubSecondaryLabel ?? 'Infrastructure repo'}
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className={classes.card}>
            <Typography className={classes.sectionTitle} component="h2">
              Summary
            </Typography>
            {summary.map((paragraph) => (
              <Typography key={paragraph} className={classes.bodyText} component="p">
                {paragraph}
              </Typography>
            ))}
          </div>

          <div className={classes.card}>
            <div className={classes.sectionTitleRow}>
              <Typography className={classes.sectionTitle} component="h2" style={{ marginBottom: 0 }}>
                Architecture
              </Typography>
              {showArchitectureWip && (
                <span className={classes.wipBadge}>{architectureWipLabel}</span>
              )}
            </div>
            <AppArchitectureDiagram diagram={diagramConfig} />
            <Typography className={classes.diagramCaption} component="p">
              {architectureCaption}
            </Typography>
          </div>

          <div className={classes.card}>
            <div className={classes.sectionTitleRow}>
              <Typography className={classes.sectionTitle} component="h2" style={{ marginBottom: 0 }}>
                Tools used
              </Typography>
              {showToolsWip && (
                <span className={classes.wipBadge}>Work in progress</span>
              )}
            </div>
            {showToolsWip && (
              <Typography className={classes.toolsWipNote} component="p">
                Planned tooling — subject to change as the project develops.
              </Typography>
            )}
            <div className={clsx(classes.toolGroups, showToolsWip && classes.toolGroupsWip)}>
              {toolsUsed.map((group) => (
                <div key={group.category} className={classes.toolGroup}>
                  <Typography className={classes.toolCategory} component="h3">
                    {group.category}
                  </Typography>
                  <ul className={classes.toolList}>
                    {group.tools.map((tool) => (
                      <li key={tool} className={classes.toolPill}>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {children && (
            <div className={`${classes.card} ${classes.demoCard}`}>
              <Typography className={classes.sectionTitle} component="h2">
                {demoTitle}
              </Typography>
              {children}
            </div>
          )}
        </div>

        <aside className={classes.sidebarColumn}>
          <div className={`${classes.card} ${classes.sidebarCard}`}>
            <Typography className={classes.sectionTitle} component="h2">
              Progress updates
            </Typography>
            <ul className={classes.timeline}>
              {progressUpdates.map((update) => (
                <li key={`${update.date}-${update.title}`} className={classes.timelineItem}>
                  <Typography className={classes.updateDate}>{update.date}</Typography>
                  <Typography className={classes.updateTitle} component="h3">
                    {update.title}
                  </Typography>
                  <Typography className={classes.updateDetail}>{update.detail}</Typography>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
