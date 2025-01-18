import { DotLottieReact } from "@lottiefiles/dotlottie-react"


const Logo: React.FC = () => {
    return (
        <DotLottieReact
            src="https://lottie.host/4a8182b9-f83e-4100-9687-d53aff224608/d2sclfxdr8.lottie"
            loop
            autoplay
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