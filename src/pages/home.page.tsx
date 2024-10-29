import { MainButton, useSwitchInlineQuery } from "@vkruglikov/react-telegram-web-app"
import { useNavigate } from "react-router-dom";

// todo
// first of all I need to find out why the fuck does this thing work so badly
// this means that I need to see why it works in a clunky way on mobile, then I need
// to find out how to fix the empty screen

export const HomePage = () => {
    const switchInlineQuery = useSwitchInlineQuery();
    const navigate = useNavigate();

    return (
        <MainButton onClick={() => {
            switchInlineQuery('', ["users"])
            navigate('/')
        }} text="Поделиться" />
    )
}
