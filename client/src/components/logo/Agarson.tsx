import { Avatar } from "@mui/material"
import logo from "/logo.png";

type Props = {
    width?: number,
    height?: number,
    title: string
}
function AgarsonLogo({ width, height, title }: Props) {
    return (

        <Avatar title={title}
            sx={{ width: width, height: height, borderRadius: 2, background: 'white' }}
            alt="img1" src={logo} 
            />
    )
}

export default AgarsonLogo