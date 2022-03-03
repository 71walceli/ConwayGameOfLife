import { useState } from 'react';
import { Form, Button, Input, InputGroup, InputNumber, Toggle } from 'rsuite';
import { useNavigate } from 'react-router-dom'

const NewGameSetup = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    gridWidth: "7",
    gridHeight: "7",
    randomGrid: false,
  })
  const integerRequiredErrorMessage = "Must be integer"
  const [nameError, setNameError] = useState(true)
  const [widthError, setWidthError] = useState(false)
  const [heightError, setHeightError] = useState(false)
  const navigate = useNavigate()

  const handleChange = (data) => {
    setFormData(data); 
  };
  
  return (
    <Form formValue={formData} onChange={handleChange} action="/GameApp" method='post'>
      <Form.Group controlId="gameName">
        <Form.ControlLabel>Name</Form.ControlLabel>
        <Form.Control name="name" errorPlacement="bottomEnd" 
          errorMessage={nameError ? "A name is required." : ""} 
          onChange={ value => {setNameError(!value.length)} }
          />
        <Form.HelpText tooltip>Required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="gridSize">
        <Form.ControlLabel>Grid size</Form.ControlLabel>
        <InputGroup>
          <InputGroup.Addon>Width</InputGroup.Addon>
          <Form.Control name="gridWidth" errorPlacement="bottomEnd" accepter={InputNumber} 
            max={100} min={3} errorMessage={widthError ? integerRequiredErrorMessage : ""} 
            onChange={ value => {setWidthError(3>value || value>100)} } />
          <InputGroup.Addon>Height</InputGroup.Addon>
          <Form.Control name="gridHeight" errorPlacement="bottomEnd" accepter={InputNumber} 
            max={100} min={3} errorMessage={heightError ? integerRequiredErrorMessage : ""} 
            onChange={ value => {setHeightError(3>value || value>100)} } />
        </InputGroup>
      </Form.Group>

      <Form.Group controlId='otherOptions'>
        <Form.ControlLabel>Random grid</Form.ControlLabel>
        <Form.Control name='randomGrid' accepter={Toggle} />
      </Form.Group>

      <Form.Group controlId='formActions'>
        <Button appearance='primary' color="green" type="submit"
          disabled={nameError || widthError || heightError} 
          onClick={() => {
            const gridData = {
              width:  Number(formData.gridWidth),
              height: Number(formData.gridHeight),
            }
            navigate("/Game", {
              state: {
                gridData: gridData,
                randomGrid: formData.randomGrid,
                gameName: formData.name,
              },
            })
          }}
        >
          Start New Game
        </Button>
      </Form.Group>
    </Form>
  )
}


export {NewGameSetup}