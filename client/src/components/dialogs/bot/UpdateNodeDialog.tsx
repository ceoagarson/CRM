import { Node } from "reactflow"
import { Button, Dialog } from "@mui/material"
import UpdateNodeForm from "../../forms/bot/UpdateNodeForm"

type Props = {
    selectedNode: Node,
    displayNodeUpdateModal: boolean,
    updateNode: (index: number, media_value: string, media_type?: string) => void,
    setDisplayNodeUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
}
function UpdateNodeDialog({ updateNode, selectedNode, setDisplayNodeUpdateModal, displayNodeUpdateModal }: Props) {
    return (
        <Dialog fullScreen open={displayNodeUpdateModal ? true : false}
            onClose={() => setDisplayNodeUpdateModal(false)}
        >
            {selectedNode ?
                <UpdateNodeForm selectedNode={selectedNode} updateNode={updateNode} setDisplayNodeUpdateModal={setDisplayNodeUpdateModal} /> : null}

            <Button variant="outlined" onClick={() => {
                setDisplayNodeUpdateModal(false)
            }
            }>Close</Button>
        </Dialog>
    )
}

export default UpdateNodeDialog