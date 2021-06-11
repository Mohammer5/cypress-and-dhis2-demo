import { useState } from 'react'
import { Button } from '@dhis2/ui'

export default function App() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <p>
        Current counter value:<br />
        <span className="counter-value">{counter}</span>
      </p>

      <Button onClick={() => setCounter(counter + 1)}>
        Increase counter
      </Button>
    </div>
  );
}
