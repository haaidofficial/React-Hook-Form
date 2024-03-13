import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

export default function AutohideSnackbar({ alert }: any) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(alert.status)
    }, [alert])

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClick}>Open Snackbar</Button>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={alert.message}
            />
        </div>
    );
}