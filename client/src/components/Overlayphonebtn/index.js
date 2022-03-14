import React from 'react';
import { useState, useRef } from 'react';

import { Card, Badge, Button, Col, Overlay, Popover, OverlayTrigger } from 'react-bootstrap';


const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Call us!</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
);
  




var Overlayphonebtn = function ({ data, setOrdered }) {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (


        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <Button variant="success">NUMBER 📞</Button>
  </OverlayTrigger>


        // <>
        //   <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
        //   NUMBER 📞
        //   </Button>
        //   <Overlay target={target.current} show={show} placement="right">
        //     {({ placement, arrowProps, show: _show, popper, ...props }) => (
        //       <div
        //         {...props}
        //         style={{
        //           backgroundColor: 'rgba(255, 100, 100, 0.85)',
        //           padding: '2px 10px',
        //           color: 'white',
        //           borderRadius: 3,
        //           ...props.style,
        //         }}
        //       >
        //         Simple tooltip
        //       </div>
        //     )}
        //   </Overlay>
        // </>
    );


}

export default Overlayphonebtn;