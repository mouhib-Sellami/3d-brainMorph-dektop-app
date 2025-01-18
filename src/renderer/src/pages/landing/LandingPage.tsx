
import React from "react";
import { useNavigate } from "react-router";
import { PATH_AUTH } from "@renderer/routes/paths";
import Logo from "@renderer/components/dotLottie/Logo";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        setTimeout(() => {
            navigate(PATH_AUTH.login)
        }, 5000)

    }, [])

    return (
        <Logo />
    )
}

export default LandingPage;
