import { Button } from 'rsuite'
import { Link } from 'react-router-dom'
import Game from './Game'


const MainMenu = (props) => {
  const menuItemStyle = {
    width: "100%",
  }
  const linkStyle = {
    margin: "13px",
    display: "block",
    color: "inherit",
    textDecoration: "inherit",
    width: "100%",
  }
  const items = [
    {
      displayName: "Continue Game",
      href: "/",
      otherProps: {}
    },
    {
      displayName: "New game",
      href: "/NewGame",
      otherProps: {}
    },
    {
      displayName: "Load game",
      href: "/Manage",
      otherProps: {}
    },
    {
      displayName: "Save Curremt Game",
      href: "/Manage",
      otherProps: {}
    },
    {
      displayName: "Settings",
      href: "/Settings",
      otherProps: {}
    },
    {
      displayName: "About",
      href: "/About",
      otherProps: {}
    },
  ]

  return (
    <div style={{
      display: "flex",
      flexFlow: "column",
      width: "80%",
      margin: "0 auto",
    }}>
      {items.map((item) => 
        <Link style={linkStyle} to={item.href} key={item.displayName}>
          <Button appearance='primary' color='cyan' size="lg" style={menuItemStyle} {...item.otherProps}>
            {item.displayName}
          </Button>
        </Link>
      )}
    </div>
  )
}

export { MainMenu }
