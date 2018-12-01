import React from 'react'
import Helmet from 'react-helmet'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import * as theme from '../theme'
import 'minireset.css'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import Grid from 'styled-components-grid'
import { TransitionPortal } from 'gatsby-plugin-transition-link'

import Link from 'gatsby-plugin-transition-link/AniLink'
import { LocationProvider } from '@reach/router'
import Edges from '../components/Edges'
import { DefaultSidebar } from './SidebarLayout'

const GlobalStyle = createGlobalStyle`
  ${theme.typographyString}

  * {
    color: ${theme.color.green};
  }

  a, a:visited {
    text-decoration: none;
  }

  p code {
    background: ${theme.color.darkBlue};
    font-size: 1em;
    color: white;
    padding: 5px;
    line-height: 1;
    
  }
`

const styledTheme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
}

const MainLayout = props => (
  <LocationProvider>
    {({ location }) => (
      <Layout
        currentLocation={location.pathname}
        action={location.action}
        {...props}
      >
        {props.children}
      </Layout>
    )}
  </LocationProvider>
)

export default MainLayout

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <ThemeProvider theme={styledTheme}>
        <React.Fragment>
          <Helmet>
            <meta name="description" />
          </Helmet>
          <GlobalStyle />
          <StaticQuery
            query={graphql`
              {
                logoPng: file(
                  relativePath: { eq: "transition-link-logo-2.png" }
                ) {
                  childImageSharp {
                    fluid(maxWidth: 450, quality: 100) {
                      ...GatsbyImageSharpFluid_tracedSVG
                    }
                  }
                }
              }
            `}
            render={query => {
              const {
                logoPng: {
                  childImageSharp: { fluid: logo },
                },
              } = query

              return (
                <TransitionPortal level="top">
                  <Edges>
                    <Link fade to="/">
                      <StyledLogo
                        position={
                          this.props.currentLocation === '/'
                            ? 'center'
                            : 'top left'
                        }
                      >
                        <Img className="logo" fluid={logo} />
                      </StyledLogo>
                    </Link>

                    <Grid.Unit visible={{ xs: false, md: true }}>
                      <DefaultSidebar
                        fixed
                        show={this.props.currentLocation !== '/'}
                      />
                    </Grid.Unit>
                  </Edges>
                </TransitionPortal>
              )
            }}
          />
          {children}
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

const StyledLogo = styled.article`
  width: 450px;
  position: fixed;
  z-index: 100;
  transform-origin: top center;
  transform: translateX(50vw);
  top: 50px;
  transition: 1s all ease-in-out;
  left: 0;

  .logo {
    transform: translateX(-55%);

    @media screen and (max-width: 767px) {
      width: 200px;
      max-width: 50%;
    }
  }

  &,
  .logo {
    transition: 1s all ease-in-out;
  }

  ${props =>
    props.position === 'top left'
      ? `
    transform: translateZ(0) translateX(0) scale(0.4);
    
    @media screen and (max-width: 767px) {
      transform: translateZ(0) translateX(5%) scale(0.7);
    }
    
    @media screen and (min-width: 1260px) {
      transform: translateZ(0) translateX(calc(50vw - 1300px / 2)) scale(0.3);
    }
    `
      : 'pointer-events: none'};
`
