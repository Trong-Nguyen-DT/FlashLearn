import Tab from '@mui/material/Tab';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

function samePageLinkNavigation(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

const TabsComponent: React.FC<Props> = ({ items, ...props }) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(event as React.MouseEvent<HTMLAnchorElement, MouseEvent>))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      role="navigation"
      TabIndicatorProps={{ sx: { display: 'none' } }}
      {...props}
    >
      {items.map((item) => (
        <Tab
          key={item.path}
          onClick={() => {
            navigate(item.path);
          }}
          label={
            <h3>
              <b>{item.label}</b>
            </h3>
          }
        />
      ))}
    </Tabs>
  );
};

type tabItem = {
  label: string;
  path: string;
};

export type Props = TabsProps & {
  items: tabItem[];
};

export default TabsComponent;
