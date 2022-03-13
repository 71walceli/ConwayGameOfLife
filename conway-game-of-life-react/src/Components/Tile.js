import { useEffect, useState } from "react"

const Tile = props => {
  const [state, _setState] = useState(false)
  const setState = value => _setState(Boolean(value))

  useEffect(() => setState(props.state))

  return (
    <div className={`Tile ${state}`} onClick={props.onClick}></div>
  )
}

export default Tile
