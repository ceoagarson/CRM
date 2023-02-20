import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, ListItem } from '@mui/material';
import { Box } from '@mui/system'
import { ColumnInstance } from 'react-table';
import { IUser } from '../../../contexts/userContext';

type Props = {
    columns: ColumnInstance<IUser>[],
    open: boolean,
    handleClose: () => void
}
function ToogleColumns({ columns, open, handleClose }: Props) {
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}
                scroll="paper"
            >
                <DialogTitle>Toogle columns</DialogTitle>
                <DialogContent>
                    {columns.map(column => (
                        <ListItem key={column.id}>
                            <>
                                <Checkbox  {...column.getToggleHiddenProps()} 
                                />
                                {column.id === "selection" ? "Selection" : column.Header}
                            </>
                        </ListItem>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" fullWidth onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ToogleColumns