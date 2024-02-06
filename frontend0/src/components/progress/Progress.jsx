import React from "react";
import "./progress.css";

function Progress(props) {
    return (
        <div className="pcontainer">
            <div className="steps">
                {props.circles.map((circleNumber, index) => (
                    <span
                        key={index}
                        className={`circle ${
                            index <= props.currentStep ? "active" : ""
                        }`}
                    >
                        {circleNumber}
                    </span>
                ))}

                <div className="progress-bar">
                    <span
                        className="indicator"
                        style={{
                            width: `${
                                ((props.currentStep) /
                                    (props.circles.length - 1)) *
                                100
                            }%`
                        }}
                    ></span>
                </div>
            </div>
        </div>
    );
}

export default Progress;
