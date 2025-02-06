import { DotLottieReact } from "@lottiefiles/dotlottie-react"


const Logo: React.FC = () => {
    return (
        <DotLottieReact
            src="https://lottie.host/632c5da6-8db0-4872-8855-7b610e8c3e94/lV3ah7ZCH5.lottie"
            loop
            autoplay
            backgroundColor="transparent"
            renderConfig={{
                autoResize: true
            }}
            layout={{
                align: [0.5, 0.5],
                fit: "cover"
            }}
        />
    )
}
export default Logo;