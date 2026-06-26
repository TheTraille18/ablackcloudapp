import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import AppRender from './AppRender';
import { airbnbColors } from '../theme/airbnbTheme';
import { catalogApps, filterCatalogApps } from '../data/apps';
import { useAppSearch } from '../hooks/useAppSearch';

const categories = ['All apps', 'AI', 'Serverless', 'Tools'];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All apps');
  const { query, setQuery } = useAppSearch();

  const filteredApps = filterCatalogApps(catalogApps, {
    category: selectedCategory,
    query,
  });

  const useStyles = makeStyles((theme) => ({
    page: {
      maxWidth: 1680,
      margin: '0 auto',
      padding: theme.spacing(3, 3, 6),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2, 2, 4),
      },
    },
    hero: {
      width: '100%',
      textAlign: 'center',
      padding: theme.spacing(4, 2, 5),
    },
    heroTitle: {
      fontWeight: 800,
      fontSize: '2.75rem',
      color: '#ffffff',
      letterSpacing: '-1px',
      marginBottom: theme.spacing(1),
      textShadow: '0 2px 12px rgba(0,0,0,0.45)',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
      },
    },
    heroSubtitle: {
      fontSize: '1.125rem',
      color: 'rgba(255,255,255,0.88)',
      maxWidth: 520,
      margin: '0 auto',
      textShadow: '0 1px 8px rgba(0,0,0,0.4)',
    },
    categories: {
      display: 'flex',
      gap: theme.spacing(1),
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: theme.spacing(4),
      paddingBottom: theme.spacing(2),
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    },
    categoryPill: {
      padding: '10px 16px',
      borderRadius: 30,
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      color: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(4px)',
      transition: 'all 0.15s ease',
      fontFamily: 'inherit',
      '&:hover': {
        borderColor: '#ffffff',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
    categoryPillActive: {
      backgroundColor: airbnbColors.rausch,
      color: airbnbColors.background,
      borderColor: airbnbColors.rausch,
      '&:hover': {
        backgroundColor: airbnbColors.rausch,
        color: airbnbColors.background,
        borderColor: airbnbColors.rausch,
      },
    },
    sectionTitle: {
      fontWeight: 700,
      fontSize: '1.375rem',
      color: '#ffffff',
      marginBottom: theme.spacing(2.5),
      textAlign: 'center',
      textShadow: '0 1px 8px rgba(0,0,0,0.4)',
    },
    grid: {
      marginTop: theme.spacing(1),
      justifyContent: 'center',
    },
    cardCol: {
      marginBottom: theme.spacing(2),
      maxWidth: 260,
    },
    searchField: {
      maxWidth: 480,
      margin: '0 auto',
      marginBottom: theme.spacing(3),
      display: 'block',
      '& .MuiOutlinedInput-root': {
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        borderRadius: 40,
        backdropFilter: 'blur(8px)',
        '& fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.25)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.45)',
        },
        '&.Mui-focused fieldset': {
          borderColor: airbnbColors.rausch,
        },
      },
      '& .MuiInputBase-input': {
        padding: '12px 14px',
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'rgba(255, 255, 255, 0.65)',
        opacity: 1,
      },
    },
    emptyState: {
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.75)',
      padding: theme.spacing(4, 2),
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.page}>
      <div className={classes.hero}>
        <Typography className={classes.heroTitle} component="h1">
          Project Showcase
        </Typography>
        <Typography className={classes.heroSubtitle}>
          Real-world cloud, AI and platform engineering projects documenting architecture,
          implementation, challenges and lessons learned
        </Typography>
      </div>

      <TextField
        className={classes.searchField}
        fullWidth
        variant="outlined"
        placeholder="Search by app, skill, or tool (e.g. React, Kubernetes, GraphQL)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon htmlColor={airbnbColors.rausch} />
            </InputAdornment>
          ),
        }}
        inputProps={{ 'aria-label': 'Search apps by skill or tool' }}
      />

      <div className={classes.categories}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${classes.categoryPill}${
              selectedCategory === cat ? ` ${classes.categoryPillActive}` : ''
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <Typography className={classes.sectionTitle} component="h2">
        Live on Black Cloud →
      </Typography>

      <Grid container spacing={2} className={classes.grid} justify="center">
        {filteredApps.length === 0 ? (
          <Grid item xs={12}>
            <Typography className={classes.emptyState}>
              No apps match &ldquo;{query}&rdquo;. Try a skill or tool like React, AWS, or Kubernetes.
            </Typography>
          </Grid>
        ) : (
          filteredApps.map((app) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={app.imageNumber} className={classes.cardCol}>
              <AppRender image={app} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}
