import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { AppImage } from '../types';
import { airbnbColors } from '../theme/airbnbTheme';
import AppStatusBadge from './AppStatusBadge';

interface AppRenderProps {
  image: AppImage;
}

export default function AppRender({ image }: AppRenderProps) {
  const useStyles = makeStyles((theme) => ({
    card: {
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
      borderRadius: 10,
      maxWidth: 260,
      margin: '0 auto',
      transition: 'transform 0.15s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        '& $imageWrap': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
        },
      },
    },
    imageWrap: {
      position: 'relative',
      borderRadius: 10,
      overflow: 'hidden',
      paddingTop: '68%',
      backgroundColor: airbnbColors.pageGray,
      boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
      transition: 'box-shadow 0.15s ease',
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    badge: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: airbnbColors.background,
      padding: '3px 8px',
      borderRadius: 4,
      fontSize: '0.65rem',
      fontWeight: 700,
      color: airbnbColors.hackberry,
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    },
    statusBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
    },
    body: {
      padding: theme.spacing(1, 0.25, 1.5),
      textAlign: 'left',
    },
    title: {
      fontWeight: 600,
      fontSize: '0.85rem',
      color: '#ffffff',
      lineHeight: 1.3,
      textShadow: '0 1px 6px rgba(0,0,0,0.45)',
    },
    subtitle: {
      fontSize: '0.78rem',
      color: '#ffffff',
      marginTop: 2,
      lineHeight: 1.35,
      textShadow: '0 1px 6px rgba(0,0,0,0.45)',
    },
    price: {
      marginTop: 6,
      fontSize: '0.75rem',
      color: 'rgba(255, 255, 255, 0.9)',
      textShadow: '0 1px 6px rgba(0,0,0,0.45)',
      '& strong': {
        fontWeight: 600,
        color: '#ffffff',
      },
    },
  }));

  const classes = useStyles();
  const description = [image.infoLine1, image.infoLine2].join(' ').replace(/^T/, '');
  const isExternal = /^https?:\/\//.test(image.path);

  const cardContent = (
    <>
      <div className={classes.imageWrap}>
        <img src={image.url} alt={image.title} className={classes.image} />
        <span className={classes.badge}>{image.badge ?? 'Serverless'}</span>
        <AppStatusBadge status={image.status} className={classes.statusBadge} />
      </div>
      <div className={classes.body}>
        <Typography className={classes.title}>{image.title}</Typography>
        <Typography className={classes.subtitle}>{description}</Typography>
        <Typography className={classes.price}>
          <strong>Free</strong> · open to use
        </Typography>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={image.path}
        className={classes.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={image.path} className={classes.card}>
      {cardContent}
    </Link>
  );
}
