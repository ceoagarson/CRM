import { useContext, useEffect, useState } from 'react'
import { socket } from '../../../socket'
import QRCode from 'react-qr-code'
import { Box, Button, Dialog } from '@mui/material'
import { BotChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { UserContext } from '../../../contexts/userContext'


function RefreshWhatsappDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { user, setUser } = useContext(UserContext)
    const [qrCode, setQrCode] = useState<string | undefined>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (socket) {
            socket.on("qr", (qr) => {
                setLoading(false)
                setQrCode(qr)
                if (user)
                    setUser({
                        ...user,
                        is_whatsapp_active: false
                    })
            })
            socket.on("disconnected_whatsapp", (client_id: string) => {
                setLoading(false)
                setQrCode(undefined)
                if (user?.client_id === client_id)
                    setUser({
                        ...user,
                        is_whatsapp_active: false
                    })
            })
            socket.on("ready", (phone) => {
                setLoading(false)
                setQrCode(undefined)
                if (user)
                    setUser({
                        ...user,
                        connected_number: phone,
                        is_whatsapp_active: true
                    })
            })
            socket.on("loading", () => {
                setLoading(true)
                setQrCode(undefined)
            })
        }
    }, [user, setUser])
    return (

        <Dialog open={choice === BotChoiceActions.refresh_whatsapp ? true : false}
            onClose={() => setChoice({ type: BotChoiceActions.close_bot })}
        >

            <Box className='p-4'>
                {!loading ?
                    <>
                        <Button size="large" className='w-100'
                            disabled={Boolean(loading)}
                            onClick={() => {
                                if (user) {
                                    socket?.emit("JoinRoom", user.client_id, user.client_data_path)
                                }
                                setLoading(true)
                            }}>Check Whatsapp Status
                        </Button>

                        <Box className='p-4'>
                            <>
                                {user && user.is_whatsapp_active ? <p className='p-2'>Congrats {String(user?.connected_number).replace("@c.us", "")} Connected,Click Above Button to confirm</p> : null}
                                {loading && !qrCode ? <h1>Loading qr code...</h1> : null}
                                {qrCode ?
                                    <>
                                        <p className='p-2'>logged out ? Scan to login !</p>
                                        <QRCode value={qrCode} />
                                    </> :
                                    null
                                }
                            </>
                        </Box>
                    </>
                    :
                    <h1>working on it .....</h1>}
            </Box>
        </Dialog>
    )
}

export default RefreshWhatsappDialog