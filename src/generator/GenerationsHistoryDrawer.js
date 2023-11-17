import * as React from 'react';
import { Drawer, Box } from '@mui/material';

export default function GenerationsDrawer({ open, onClose, listComponent }) {
    return (
        <React.Fragment>
            <Drawer
                anchor='left'
                open={open}
                onClose={onClose}
                sx={{ zIndex: (theme) => theme.zIndex.modal }}
            >
                <Box>
                    {listComponent}
                </Box>
            </Drawer>
        </React.Fragment>
    );
}
