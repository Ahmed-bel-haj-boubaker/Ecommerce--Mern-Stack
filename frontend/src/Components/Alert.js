
import Alert  from 'react-bootstrap/Alert';
function Alerts(props) {
  return (
    
          <Alert variant={props.variant || 'info'}>{props.children}</Alert>
      
  );
}

export default Alerts;