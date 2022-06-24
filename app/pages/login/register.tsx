import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface Props {
  
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
  <Box
    role='tabpanel'
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
    >
    {value === index && (
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    )}
  </Box>
  )
}

function labelProps (index: number) {
  return {
    id: `tab-${index}`,
    'aria-control': `tabpanel-${index}` 
  }
}

function Register ({}: Props) {
  const [tabValue, setTabValue] = React.useState(0)

  const changeTab = (event: React.SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue)
  }

  return (
    <Box sx={{ border: 1, borderRadius: '20px', backgroundColor: 'primary.dark' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          textColor='secondary'
          indicatorColor='secondary'
          value={tabValue}
          onChange={changeTab}
          aria-label='basic tabs example'
          variant='scrollable'
          centered
          selectionFollowsFocus 
        >
          <Tab label='Patient' {...labelProps(0)} />
          <Tab label='Médecin Pharmacien' {...labelProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        Patient
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Médecin - Pharmacien
      </TabPanel>
    </Box>
  )
}

export default Register
