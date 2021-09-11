import { makeStyles, useScrollTrigger, Slide, AppBar, Toolbar, Container, IconButton, Drawer, List, Divider } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import { useAmp } from 'next/amp'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import AmpEvents from '../atoms/AmpEvents'
import DrawerItem from '../molecules/DrawerItem'
import NavItem from '../molecules/NavItem'
import SiteTitle from '../molecules/SiteTitle'

const useStyles = makeStyles(theme => ({
  appBar: {
    overflow: 'hidden',
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  sidebarToolbar: {
    justifyContent: 'flex-end',
    width: 250,
  },
}))

const navItems = [
  { href: '/', title: 'Blog' },
  { href: 'https://github.com/iMasanari', title: 'GitHub' },
  { href: 'https://qiita.com/iMasanari', title: 'Qiita' },
]

interface Props {
  title: string
  description: string;
}

const AmpSidebarTag = 'amp-sidebar' as any

const AmpSidebar = ({ children }: any) =>
  <AmpSidebarTag id="sidebar" layout="nodisplay" side="right" children={children} />

export default function Header({ title, description }: Props) {
  const classes = useStyles()
  const router = useRouter()
  const isAmp = useAmp()
  const trigger = useScrollTrigger()
  const [isOpen, setOpen] = useState(false)

  const isRoot = router.asPath === '/'
  const Sidebar = isAmp ? AmpSidebar : Drawer

  const toggleOpen = () => {
    setOpen(isOpen => !isOpen)
  }

  const delayClose = () => {
    setTimeout(() => setOpen(false), 200)
  }

  useEffect(delayClose, [router.asPath])

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.appBar} amp-fx="float-in-top" position="fixed" color="default" elevation={1}>
          <Container component={Toolbar} disableGutters>
            <SiteTitle
              className={classes.title}
              isHeading={isRoot}
              title={title} description={description}
              onClick={delayClose}
            />
            <nav className={classes.sectionDesktop}>
              {navItems.map(v =>
                <NavItem key={v.href} href={v.href}>
                  {v.title}
                </NavItem>
              )}
            </nav>
            <div className={classes.sectionMobile}>
              <AmpEvents on="tap:sidebar.toggle">
                <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleOpen}>
                  <MenuIcon />
                </IconButton>
              </AmpEvents>
            </div>
          </Container>
        </AppBar>
      </Slide >
      <Sidebar anchor="right" open={isOpen} onClose={toggleOpen}>
        <div role="presentation" onKeyDown={toggleOpen}>
          <Toolbar className={classes.sidebarToolbar}>
            <AmpEvents on="tap:sidebar.close">
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleOpen}>
                <CloseIcon />
              </IconButton>
            </AmpEvents>
          </Toolbar>
          <Divider />
          <List component="nav">
            {navItems.map(v =>
              <DrawerItem key={v.href} href={v.href} onClick={delayClose}>
                {v.title}
              </DrawerItem>
            )}
          </List>
        </div>
      </Sidebar>
      <Toolbar />
    </>
  )
}
