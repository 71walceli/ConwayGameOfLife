import { Button } from 'rsuite'
import { Link } from 'react-router-dom'


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

  return (
    <div style={{
      display: "flex",
      flexFlow: "column",
      width: "80%",
      margin: "0 auto",
    }}>
      <Link style={linkStyle} to="/">
        <Button appearance='primary' color='cyan' size="lg" style={menuItemStyle}>
          Continue Game
        </Button>
      </Link>
      <Link style={linkStyle} to='/NewGame'>
        <Button appearance='primary' color='cyan' size="lg" style={menuItemStyle}>
          New game
        </Button>
      </Link>
      <Link style={linkStyle} to="/">
        <Button appearance='primary' color='cyan' size="lg" style={menuItemStyle}>
          Load game
        </Button>
      </Link>
      <Link style={linkStyle} to="/">
        <Button appearance='primary' color='cyan' size="lg" style={menuItemStyle}>
          Save Cirremt Game
        </Button>
      </Link>
      <Link style={linkStyle} to="/">
        <Button appearance='primary' color='cyan' size="lg" style={menuItemStyle}>
          Settings
        </Button>
      </Link>
    </div>
  )
}

export { MainMenu }
