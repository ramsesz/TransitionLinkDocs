import React from 'react'
import SidebarLayout from '../../../layout/SidebarLayout'
import * as theme from '../../../theme'
import ArrowLink from '../../../components/ArrowLink'

const CoverIndex = () => {
  return (
    <SidebarLayout>
      <ArrowLink direction="left" light bg={theme.color.purple} to="/tutorials">
        Back to tutorials
      </ArrowLink>
      <h1>AniLink Swipe</h1>
      <h2>Examples</h2>
      <h2>How it's made</h2>
    </SidebarLayout>
  )
}

export default CoverIndex
