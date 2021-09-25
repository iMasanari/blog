import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { useScrollTrigger, Slide, AppBar, Toolbar, Container, IconButton, Drawer, List, Divider } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
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
          <Toolbar component={Container} disableGutters>
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
                <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleOpen} size="large">
                  <MenuIcon />
                </IconButton>
              </AmpEvents>
            </div>
          </Toolbar>
        </AppBar>
      </Slide >
      <Sidebar anchor="right" open={isOpen} onClose={toggleOpen}>
        <div role="presentation" onKeyDown={toggleOpen}>
          <Toolbar className={classes.sidebarToolbar}>
            <AmpEvents on="tap:sidebar.close">
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleOpen} size="large">
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
