import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Icon } from "@iconify/react";

export default function GlobalFilter({ filter, setFilter}) {
  return (
    <span> 
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
        <Icon icon="bi:search" />
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Search..." 
          value={filter || ''} 
          onChange={(e) => setFilter(e.target.value)}
        />
      </InputGroup> 
    </span>
  )
}