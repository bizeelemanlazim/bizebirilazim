import React from 'react'
import { TabItemType } from '../../utils/types'
import { SxProps, Tab, Tabs } from '@mui/material';

type BblTabsProps = {
  items: TabItemType[];
  value: string;
  onChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
  sx?: SxProps;
}

export default function BblTabs({ items, value, onChange, sx }: BblTabsProps) {

  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="basic tabs example"
      sx={{
        ...sx,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ml: -1
      }}
    >
      {items.map((item, index) => (
        <Tab
          key={index}
          label={item.label}
          value={item.slug}
          sx={{
            textTransform: 'none',
            fontSize: { xs: 14, sm: 14, md: 14 },
            p: 0,
            mx: { xs: 0.7, sm: 1, md: 2 },
            minWidth: 'auto',
          }}
        />
      ))}
    </Tabs>
  )
}
