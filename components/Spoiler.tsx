import {Button} from "./Button";
import {useState} from "react";

type Props = {
    readonly hiddenText: string
}

export function Spoiler({ hiddenText }: Props) {
    const [openBtnText, setOpenBtnText] = useState<boolean>(true);
    const handleToggleButton = () => {
        return setOpenBtnText(prev => !prev)
    }

    return (
        <>
            {openBtnText &&
                <Button theme='main' onClick={() => handleToggleButton()}>
                    Zobrazit řešení
                </Button>
            }
            <div className={`mt-2 ${openBtnText && 'blur-sm'}`}>{hiddenText}</div>
        </>
    )
}
