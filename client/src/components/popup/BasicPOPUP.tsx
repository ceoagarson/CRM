import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { AdsClickOutlined } from '@mui/icons-material';

export function BasicPOPUP({ element, anchor }: { element: JSX.Element, anchor: HTMLButtonElement | null }) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(anchor);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button onClick={handleClick}>
                <AdsClickOutlined />
            </Button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {element}
            </Popover>
        </div>
    );
}