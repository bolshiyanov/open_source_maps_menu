import React from 'react';
import examplePwa1 from 'images/ExamplePwa/Example1.jpg';
import examplePwa2 from 'images/ExamplePwa/Example2.jpg';
import examplePwa3 from 'images/ExamplePwa/Example3.jpg';
import examplePwa4 from 'images/ExamplePwa/Example4.jpg';
import examplePwa5 from 'images/ExamplePwa/Example5.jpg';
import examplePwa6 from 'images/ExamplePwa/Example6.jpg';
import examplePwa7 from 'images/ExamplePwa/Example7.jpg';
import examplePwa12 from 'images/ExamplePwa/Example12.jpg';
import examplePwa20 from 'images/ExamplePwa/Example20.jpg';
import examplePwa21 from 'images/ExamplePwa/Example21.jpg';
import examplePwa22 from 'images/ExamplePwa/Example22.jpg';
import examplePwa23 from 'images/ExamplePwa/Example23.jpg';
import examplePwa24 from 'images/ExamplePwa/Example24.jpg';
import examplePwa25 from 'images/ExamplePwa/Example25.jpg';

import { __ } from 'utils/translation';

import './index.scss';

const ExamplePwa = () => {


    return (
        <React.Fragment>
            <h4>{__("Примеры для вдохновения")}</h4>
            <div className="horizontal-picker">

                <div
                    onClick={() => window.open("https://sweety.link/ktw6eh2e4ka-wogtrkkikw/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa25})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/lpisxjadgky01p4bz87tfa/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa24})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/bpsftxmhs024khq3oyz0rw/?demo=preview ", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa23})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/nhgdgoz03kmdnxony6y1rw/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa22})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/jsb0pczbhkc9k27evorrpa/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa21})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/zuh6un18ruq0wdpzebuf6w/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa20})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/ksjg7gbjz0kamzzugywkzg/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa3})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/4yutjioj2kkgg3jodrnciq/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa6})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/maaptrsclk2apbiy9geboq/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa1})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/rmu5skahokgafiarbih6oa/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa2})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/eni8c_xb_0gjmhnl95nuhg/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa4})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/qd1jij88puodt9zrsmihka/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa5})` }}
                    className="business-picker"
                >
                </div>

                <div
                    onClick={() => window.open("https://sweety.link/u7mugpqan0yij28f2jvh3q/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa7})` }}
                    className="business-picker"
                >
                </div>
                <div
                    onClick={() => window.open("https://sweety.link/yv4ebluljkmox1lajouwoq/?demo=preview", "_blank")}
                    style={{ backgroundImage: `URL(${examplePwa12})` }}
                    className="business-picker"
                >
                </div>
            </div>


        </React.Fragment>
    );
};

export default ExamplePwa;
