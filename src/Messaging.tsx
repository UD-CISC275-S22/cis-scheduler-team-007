import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function Messaging(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    function changeHidden() {
        setVisible(!visible);
    }

    return (
        <div>
            <Button onClick={changeHidden}>Display Message</Button>
            {visible && (
                <div>
                    Hello CISC or INSY majors and minors
                    <br />
                    In here you are choosing a plan for your cisc degree.
                </div>
            )}
        </div>
    );
}
