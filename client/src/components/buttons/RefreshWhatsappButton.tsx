import { useContext } from 'react'
import RefreshWhatsappDialog from '../dialogs/bot/RefreshWhatsappDialog'
import { BotChoiceActions, ChoiceContext } from '../../contexts/dialogContext'
import { UserContext } from '../../contexts/userContext'
import { Button } from '@mui/material'
import { useBotFields } from '../hooks/BotFieldsHook'

function RefreshWhatsappButton() {
    const { setChoice } = useContext(ChoiceContext)
    const { user } = useContext(UserContext)
    const {hiddenFields,readonlyFields}=useBotFields()
    return (
        <>{!hiddenFields?.includes('allow_connect_whatsapp')&&

            <Button variant="text" size="small" onClick={() => {
                setChoice({ type: BotChoiceActions.refresh_whatsapp })
            }}
                disabled={readonlyFields?.includes('allow_connect_whatsapp')}
            >
                {user && user.is_whatsapp_active ?
                    <img width="30" height="30" src="https://img.icons8.com/3d-fluency/94/whatsapp.png" alt="whatsapp" />

                    :
                    <img height="30" width="30" className="m-1" alt="icon" src="https://img.icons8.com/external-tal-revivo-tritone-tal-revivo/64/external-whatsapp-messenger-cross-platform-mobile-devices-messaging-application-logo-tritone-tal-revivo.png" />
                }
            </Button>}
            <RefreshWhatsappDialog />
        </>

    )

}

export default RefreshWhatsappButton