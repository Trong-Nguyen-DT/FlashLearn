import React from 'react';
import Link from '../Link';
import { Breadcrumbs, BreadcrumbsProps, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BreadCrumbs: React.FC<BreadCrumbProps> = ({ items, ...props }) => {
  const navigate = useNavigate();
  return (
    <Breadcrumbs {...props}>
      {items.map((item, index) => {
        if (item.path)
          return (
            <Link key={index} onClick={() => navigate(item.path)}>
              {item.label}
            </Link>
          );
        return <Typography key={index}>{item.label}</Typography>;
      })}
    </Breadcrumbs>
  );
};

type BreadCrumbItem = {
  label: string;
  path?: string;
};

export type BreadCrumbProps = Omit<BreadcrumbsProps, 'children'> & {
  items: BreadCrumbItem[];
};

export default BreadCrumbs;
