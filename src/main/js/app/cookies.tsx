import React from "react";
import {StaticButton} from "./buttons/staticButton";
import {Control, TextWrapping} from "@babylonjs/gui";

const {HORIZONTAL_ALIGNMENT_CENTER, VERTICAL_ALIGNMENT_BOTTOM, VERTICAL_ALIGNMENT_TOP} = Control;

export type CookieDialogueProps = {
    setAcceptedCookies: () => void
}

export class CookieDialogue extends React.PureComponent<CookieDialogueProps> {
    render() {
        return <>
            <adtFullscreenUi name={"cookieFullScreenUI"}>

                <rectangle key={"cookieDialogueContainer"}
                           name={"cookieDialogueContainer"}
                           width={1}
                           height={0.8}
                           isPointerBlocker
                           thickness={0}>
                    <textBlock key={"cookieText"}
                               name={"cookieText"}
                               textWrapping={TextWrapping.WordWrap}
                               paddingTopInPixels={15}
                               paddingLeftInPixels={15}
                               paddingRightInPixels={15}
                               paddingBottomInPixels={15}
                               horizontalAlignment={HORIZONTAL_ALIGNMENT_CENTER}
                               verticalAlignment={VERTICAL_ALIGNMENT_TOP}
                               textHorizontalAlignment={HORIZONTAL_ALIGNMENT_CENTER}
                               textVerticalAlignment={VERTICAL_ALIGNMENT_TOP}
                               color='white'
                               text={"We use cookies to authenticate you as the\nowner of a rubik's cube in our system."}
                               heightInPixels={600}
                               fontSize={window.innerWidth < 700 ? 50 : 20}
                               lineSpacing={1}/>
                    <StaticButton name={"Accept Cookies"}
                                  verticalAlignment={VERTICAL_ALIGNMENT_BOTTOM}
                                  horizontalAlignment={HORIZONTAL_ALIGNMENT_CENTER}
                                  buttonsEnabled={true}
                                  onPointerClickObservable={this.props.setAcceptedCookies}/>
                </rectangle>
            </adtFullscreenUi>
        </>
    }
}