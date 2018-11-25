import React from 'react'
import Link from 'gatsby-plugin-transition-link/AniLink'
import SidebarLayout from '../../../layout/SidebarLayout'

const CoverIndex = () => {
  return (
    <SidebarLayout>
      <Link fade to="/tutorials" duration={1}>
        Back to tutorials
      </Link>
      <h1>AniLink Fade</h1>
      <h2>Examples</h2>
      <h2>How it's made</h2>
    </SidebarLayout>
  )
}

export default CoverIndex