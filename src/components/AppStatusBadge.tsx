import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { AppStatus } from '../types';

const statusStyles: Record<
  AppStatus,
  { label: string; backgroundColor: string; color: string; borderColor: string }
> = {
  Live: {
    label: 'Live',
    backgroundColor: 'rgba(0, 166, 153, 0.92)',
    color: '#ffffff',
    borderColor: 'rgba(0, 166, 153, 1)',
  },
  'In Development': {
    label: 'In Development',
    backgroundColor: 'rgba(126, 200, 255, 0.92)',
    color: '#0a1628',
    borderColor: 'rgba(126, 200, 255, 1)',
  },
  Beta: {
    label: 'Beta',
    backgroundColor: 'rgba(123, 97, 255, 0.92)',
    color: '#ffffff',
    borderColor: 'rgba(123, 97, 255, 1)',
  },
  Planned: {
    label: 'Planned',
    backgroundColor: 'rgba(80, 80, 80, 0.88)',
    color: '#ffffff',
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  POC: {
    label: 'POC',
    backgroundColor: 'rgba(255, 180, 50, 0.92)',
    color: '#1a1400',
    borderColor: 'rgba(255, 200, 80, 1)',
  },
  Maintenance: {
    label: 'Maintenance',
    backgroundColor: 'rgba(255, 140, 60, 0.92)',
    color: '#ffffff',
    borderColor: 'rgba(255, 160, 90, 1)',
  },
  Deprecated: {
    label: 'Deprecated',
    backgroundColor: 'rgba(180, 60, 60, 0.88)',
    color: '#ffffff',
    borderColor: 'rgba(255, 120, 120, 0.6)',
  },
};

interface AppStatusBadgeProps {
  status: AppStatus;
  className?: string;
  size?: 'sm' | 'md';
}

export default function AppStatusBadge({
  status,
  className,
  size = 'sm',
}: AppStatusBadgeProps) {
  const style = statusStyles[status];

  const useStyles = makeStyles({
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: size === 'sm' ? '3px 8px' : '5px 12px',
      borderRadius: 4,
      fontSize: size === 'sm' ? '0.65rem' : '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.02em',
      lineHeight: 1.2,
      border: '1px solid',
      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
      whiteSpace: 'nowrap',
    },
  });

  const classes = useStyles();

  return (
    <span
      className={clsx(classes.badge, className)}
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        borderColor: style.borderColor,
      }}
    >
      {style.label}
    </span>
  );
}
