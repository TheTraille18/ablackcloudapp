import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import ResumePdfViewer from './ResumePdfViewer';
import { resumeUpdates } from '../content/resumePage';
import { ResumeHotspot, ResumeHotspotSection } from '../content/resumeHotspots';
import { airbnbColors } from '../theme/airbnbTheme';

function SkillLevelBar({
  name,
  level,
  classes,
}: {
  name: string;
  level: number;
  classes: Record<string, string>;
}) {
  const clampedLevel = Math.max(0, Math.min(10, Math.round(level)));

  return (
    <div className={classes.skillRow}>
      <div className={classes.skillHeader}>
        <span className={classes.skillName}>{name}</span>
        <span className={classes.skillLevel}>{clampedLevel}/10</span>
      </div>
      <div
        className={classes.skillBarTrack}
        role="progressbar"
        aria-label={`${name} experience level`}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-valuenow={clampedLevel}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={`${name}-${index}`}
            className={clsx(
              classes.skillBarSegment,
              index < clampedLevel && classes.skillBarSegmentFilled
            )}
            style={{ animationDelay: `${index * 70}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

const RESUME_PDF_URL =
  process.env.REACT_APP_RESUME_PDF_URL || '/resume/Justin_Traille.pdf';

function normalizeSkillSearchText(value: string): string {
  return value.replace(/^\*/, '').trim().toLowerCase();
}

function filterSkillSections(
  sections: ResumeHotspotSection[],
  query: string
): ResumeHotspotSection[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return sections;
  }

  return sections
    .map((section) => ({
      ...section,
      skills: section.skills?.filter((skill) =>
        normalizeSkillSearchText(skill.name).includes(normalizedQuery)
      ),
      listItems: section.listItems?.filter((item) =>
        normalizeSkillSearchText(item).includes(normalizedQuery)
      ),
    }))
    .filter(
      (section) =>
        (section.skills && section.skills.length > 0) ||
        (section.listItems && section.listItems.length > 0)
    );
}

export default function Profile() {
  const [loadError, setLoadError] = useState(false);
  const [sidebarHotspot, setSidebarHotspot] = useState<ResumeHotspot | null>(null);
  const [skillSearch, setSkillSearch] = useState('');
  const handleError = useCallback(() => setLoadError(true), []);
  const handleHotspotClick = useCallback((hotspot: ResumeHotspot) => {
    setSidebarHotspot((current) => {
      if (current?.id === hotspot.id) {
        setSkillSearch('');
        return null;
      }
      setSkillSearch('');
      return hotspot;
    });
  }, []);
  const handleSidebarClose = useCallback(() => {
    setSidebarHotspot(null);
    setSkillSearch('');
  }, []);

  const filteredSkillSections = useMemo(() => {
    if (!sidebarHotspot?.sections) {
      return [];
    }
    return filterSkillSections(sidebarHotspot.sections, skillSearch);
  }, [sidebarHotspot, skillSearch]);

  const useStyles = makeStyles((theme) => ({
    page: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: theme.spacing(2, 3, 6),
      transition: 'max-width 0.35s ease',
    },
    pageWithSidebar: {
      maxWidth: 1600,
    },
    title: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: '#ffffff',
      marginBottom: theme.spacing(1.5),
      padding: theme.spacing(0, 0.5),
      textAlign: 'center',
      textShadow: '0 1px 8px rgba(0,0,0,0.4)',
    },
    actions: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '1fr 340px',
      gap: theme.spacing(3),
      alignItems: 'start',
      transition: 'grid-template-columns 0.35s ease',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
    },
    layoutWithSidebar: {
      gridTemplateColumns: '340px 1fr 340px',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
    },
    leftSidebarColumn: {
      animation: '$slideIn 0.35s ease',
      [theme.breakpoints.up('md')]: {
        position: 'sticky',
        top: theme.spacing(10),
      },
    },
    '@keyframes slideIn': {
      from: {
        opacity: 0,
        transform: 'translateX(-16px)',
      },
      to: {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
    cardHeader: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(0.75),
      marginBottom: theme.spacing(1),
    },
    cardTitleRow: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: theme.spacing(1),
      width: '100%',
    },
    titleNote: {
      color: 'rgba(255, 255, 255, 0.62)',
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      width: '100%',
    },
    skillSearchWrap: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      marginBottom: theme.spacing(1.5),
      padding: '6px 12px',
      borderRadius: 8,
      border: '1px solid rgba(126, 200, 255, 0.22)',
      backgroundColor: 'rgba(8, 12, 20, 0.55)',
    },
    skillSearchInput: {
      flex: 1,
      color: '#ffffff',
      fontSize: '0.8125rem',
      fontWeight: 500,
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.55)',
        opacity: 1,
      },
    },
    skillSearchEmpty: {
      color: 'rgba(255, 255, 255, 0.72)',
      fontSize: '0.875rem',
      lineHeight: 1.6,
      padding: theme.spacing(1, 0),
    },
    closeBtn: {
      color: 'rgba(255, 255, 255, 0.75)',
      padding: 4,
      '&:hover': {
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
    panelDetail: {
      color: 'rgba(255, 255, 255, 0.82)',
      lineHeight: 1.7,
      fontSize: '0.875rem',
      whiteSpace: 'pre-line',
    },
    panelList: {
      margin: 0,
      paddingLeft: theme.spacing(2.5),
      color: 'rgba(255, 255, 255, 0.82)',
      lineHeight: 1.7,
      fontSize: '0.875rem',
      '& li': {
        marginBottom: theme.spacing(1),
      },
      '& li:last-child': {
        marginBottom: 0,
      },
    },
    panelLink: {
      color: '#7ec8ff',
      textDecoration: 'none',
      fontWeight: 600,
      '&:hover': {
        color: '#a8dcff',
        textDecoration: 'underline',
      },
    },
    panelSections: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(3),
    },
    panelSectionTitle: {
      fontWeight: 700,
      fontSize: '0.8125rem',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: airbnbColors.rausch,
      marginBottom: theme.spacing(1.25),
    },
    skillList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(3.5),
    },
    sectionItemList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
    sectionListItem: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.8125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    skillRow: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1),
      paddingBottom: theme.spacing(0.5),
    },
    skillHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(1),
    },
    skillName: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.8125rem',
      fontWeight: 600,
    },
    skillLevel: {
      color: 'rgba(255, 255, 255, 0.55)',
      fontSize: '0.75rem',
      fontWeight: 600,
      flexShrink: 0,
    },
    skillBarTrack: {
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 1fr)',
      gap: 3,
      height: 8,
    },
    skillBarSegment: {
      borderRadius: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      transform: 'scaleY(0.6)',
      transformOrigin: 'center bottom',
      opacity: 0.35,
    },
    skillBarSegmentFilled: {
      backgroundColor: '#7ec8ff',
      boxShadow: '0 0 6px rgba(126, 200, 255, 0.45)',
      animation: '$skillSegmentFill 0.35s ease forwards',
    },
    '@keyframes skillSegmentFill': {
      from: {
        transform: 'scaleY(0.6)',
        opacity: 0.35,
      },
      to: {
        transform: 'scaleY(1)',
        opacity: 1,
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
      padding: theme.spacing(3),
      borderRadius: 12,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      textAlign: 'left',
    },
    leftSidebarCard: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100vh - 96px)',
      overflow: 'hidden',
      [theme.breakpoints.down('md')]: {
        maxHeight: '70vh',
      },
    },
    cardScrollBody: {
      flex: '1 1 auto',
      minHeight: 0,
      overflowY: 'auto',
      paddingRight: theme.spacing(0.5),
      marginRight: theme.spacing(-0.5),
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(126, 200, 255, 0.45) transparent',
      '&::-webkit-scrollbar': {
        width: 6,
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(126, 200, 255, 0.35)',
        borderRadius: 3,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(126, 200, 255, 0.55)',
      },
    },
    sectionTitle: {
      fontWeight: 700,
      fontSize: '1.25rem',
      color: '#ffffff',
      marginBottom: 0,
      textShadow: '0 1px 8px rgba(0,0,0,0.4)',
    },
    sidebarSectionTitle: {
      marginBottom: theme.spacing(1.5),
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
    errorPanel: {
      padding: theme.spacing(4),
      borderRadius: 8,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      color: 'rgba(255, 255, 255, 0.88)',
      lineHeight: 1.6,
      textAlign: 'center',
    },
    actionBtn: {
      textTransform: 'none',
      fontWeight: 600,
      borderColor: 'rgba(126, 200, 255, 0.45)',
      color: '#ffffff',
      '&:hover': {
        borderColor: '#7ec8ff',
        backgroundColor: 'rgba(126, 200, 255, 0.1)',
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={clsx(classes.page, sidebarHotspot && classes.pageWithSidebar)}>
      <Typography className={classes.title} component="h1">
        Resume
      </Typography>

      <div className={classes.actions}>
        <Button
          className={classes.actionBtn}
          variant="outlined"
          size="small"
          startIcon={<OpenInNewIcon />}
          href={RESUME_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open PDF
        </Button>
        <Button
          className={classes.actionBtn}
          variant="outlined"
          size="small"
          startIcon={<GetAppIcon />}
          href={RESUME_PDF_URL}
          download="Justin_Traille.pdf"
        >
          Download
        </Button>
      </div>

      <div className={clsx(classes.layout, sidebarHotspot && classes.layoutWithSidebar)}>
        {sidebarHotspot && (
          <aside className={classes.leftSidebarColumn}>
            <div className={clsx(classes.card, classes.leftSidebarCard)}>
              <div className={classes.cardHeader}>
                <div className={classes.cardTitleRow}>
                  <Typography className={classes.sectionTitle} component="h2">
                    {sidebarHotspot.title}
                  </Typography>
                  <IconButton
                    className={classes.closeBtn}
                    size="small"
                    aria-label="Close panel"
                    onClick={handleSidebarClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
                {sidebarHotspot.titleNote && (
                  <Typography className={classes.titleNote} component="p">
                    {sidebarHotspot.titleNote}
                  </Typography>
                )}
              </div>
              {sidebarHotspot.id === 'technical-skills' && (
                <form
                  className={classes.skillSearchWrap}
                  role="search"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <SearchIcon fontSize="small" htmlColor="#7ec8ff" />
                  <InputBase
                    className={classes.skillSearchInput}
                    placeholder="Search skills"
                    value={skillSearch}
                    onChange={(event) => setSkillSearch(event.target.value)}
                    inputProps={{ 'aria-label': 'Search skills by title' }}
                  />
                </form>
              )}
              <div className={classes.cardScrollBody}>
              {sidebarHotspot.sections && sidebarHotspot.sections.length > 0 ? (
                filteredSkillSections.length > 0 ? (
                <div className={classes.panelSections} key={sidebarHotspot.id}>
                  {filteredSkillSections.map((section) => (
                    <div key={section.title}>
                      <Typography className={classes.panelSectionTitle} component="h3">
                        {section.title}
                      </Typography>
                      {section.listItems && section.listItems.length > 0 ? (
                        <ul className={classes.sectionItemList}>
                          {section.listItems.map((item) => (
                            <li key={item} className={classes.sectionListItem}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        section.skills &&
                        section.skills.length > 0 && (
                          <ul className={classes.skillList}>
                            {section.skills.map((skill) => (
                              <li key={skill.name}>
                                <SkillLevelBar
                                  name={skill.name}
                                  level={skill.level}
                                  classes={classes}
                                />
                              </li>
                            ))}
                          </ul>
                        )
                      )}
                    </div>
                  ))}
                </div>
                ) : (
                  <Typography className={classes.skillSearchEmpty}>
                    No skills match &ldquo;{skillSearch.trim()}&rdquo;.
                  </Typography>
                )
              ) : sidebarHotspot.items && sidebarHotspot.items.length > 0 ? (
                <ul className={classes.panelList}>
                  {sidebarHotspot.items.map((item) => (
                    <li key={item.label}>
                      {item.link ? (
                        <a
                          className={classes.panelLink}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </a>
                      ) : (
                        item.label
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography className={classes.panelDetail}>{sidebarHotspot.detail}</Typography>
              )}
              {sidebarHotspot.link && (
                <Button
                  className={classes.actionBtn}
                  variant="outlined"
                  size="small"
                  href={sidebarHotspot.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 16 }}
                >
                  {sidebarHotspot.linkLabel || 'Learn more'}
                </Button>
              )}
              </div>
            </div>
          </aside>
        )}

        <div className={classes.mainColumn}>
          {loadError ? (
            <div className={classes.errorPanel}>
              <Typography>
                The resume PDF could not be loaded. Ensure{' '}
                <strong>public/resume/Justin_Traille.pdf</strong> exists in the project.
              </Typography>
              <Button
                className={classes.actionBtn}
                variant="outlined"
                startIcon={<OpenInNewIcon />}
                href={RESUME_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 16 }}
              >
                Try opening directly
              </Button>
            </div>
          ) : (
            <ResumePdfViewer
              url={RESUME_PDF_URL}
              onError={handleError}
              onHotspotClick={handleHotspotClick}
            />
          )}
        </div>

        <aside className={classes.sidebarColumn}>
          <div className={classes.card}>
            <Typography className={clsx(classes.sectionTitle, classes.sidebarSectionTitle)} component="h2">
              Progress updates
            </Typography>
            <ul className={classes.timeline}>
              {resumeUpdates.map((update) => (
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
