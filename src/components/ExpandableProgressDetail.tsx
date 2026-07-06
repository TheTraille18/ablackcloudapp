import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const DEFAULT_MAX_LENGTH = 140;

const useStyles = makeStyles({
  root: {
    margin: 0,
    padding: 0,
    border: 'none',
    background: 'none',
    font: 'inherit',
    textAlign: 'left',
    width: '100%',
  },
  clickable: {
    cursor: 'pointer',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.95)',
    },
  },
});

function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const slice = text.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.6) {
    return slice.slice(0, lastSpace);
  }
  return slice;
}

interface ExpandableProgressDetailProps {
  detail: string;
  className?: string;
  maxLength?: number;
}

export default function ExpandableProgressDetail({
  detail,
  className,
  maxLength = DEFAULT_MAX_LENGTH,
}: ExpandableProgressDetailProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const isTruncatable = detail.length > maxLength;

  if (!isTruncatable) {
    return (
      <Typography className={className} component="p">
        {detail}
      </Typography>
    );
  }

  const displayText = expanded ? detail : `${truncateAtWord(detail, maxLength)}...`;

  return (
    <Typography
      className={clsx(className, classes.root, classes.clickable)}
      component="button"
      type="button"
      onClick={() => setExpanded((value) => !value)}
      aria-expanded={expanded}
    >
      {displayText}
    </Typography>
  );
}
