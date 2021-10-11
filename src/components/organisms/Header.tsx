import { css } from '@emotion/react'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Container, Divider, Drawer, IconButton, List, Slide, Toolbar, useScrollTrigger } from '@mui/material'
import { useAmp } from 'next/amp'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AmpEvents from '../atoms/AmpEvents'
import DrawerItem from '../molecules/DrawerItem'
import NavItem from '../molecules/NavItem'
import SiteTitle from '../molecules/SiteTitle'

const titleStyle = css`
  flex-grow: 1;
`

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
        <AppBar amp-fx="float-in-top" position="fixed" color="default" elevation={1}>
          <Toolbar component={Container} disableGutters>
            <SiteTitle
              css={titleStyle}
              isHeading={isRoot}
              title={title}
              description={description}
            />
            <Box component="nav" display={{ xs: 'none', sm: 'flex' }}>
              {navItems.map(v =>
                <NavItem key={v.href} href={v.href}>
                  {v.title}
                </NavItem>
              )}
            </Box>
            <Box display={{ xs: 'flex', sm: 'none' }}>
              <AmpEvents on="tap:sidebar.toggle">
                <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleOpen} size="large">
                  <MenuIcon />
                </IconButton>
              </AmpEvents>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide >
      <Sidebar anchor="right" open={isOpen} onClose={toggleOpen}>
        <div role="presentation" onKeyDown={toggleOpen}>
          <Toolbar sx={{ justifyContent: 'flex-end', width: 250 }}>
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
