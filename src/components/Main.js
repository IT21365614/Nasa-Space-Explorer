import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

export default function Main(props) {
    const { data } = props;
    const [is1080p, setIs1080p] = useState(false);
    const [openInfoDialog, setOpenInfoDialog] = useState(false);

    const handleHDPic = () => {
        window.open(data.hdurl, '_blank');
    }

    const handleInfoClick = () => {
        setOpenInfoDialog(true);
    };

    const handleInfoDialogClose = () => {
        setOpenInfoDialog(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIs1080p(window.innerWidth >= 1500);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let containerStyle = {};

    if (is1080p) {
        containerStyle = {
            paddingLeft: '12%'
        };
    } else {
        containerStyle = {
            paddingLeft: '25%'
        };
    }

    if (data.media_type === "image") {
        return (
            <div className="imgContainer">
                <img src={data.hdurl} alt={data.title || 'bg-img'} className="bgImage" />
                <IconButton 
                    onClick={handleInfoClick} 
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        zIndex: 1000
                    }}
                >
                    <InfoOutlinedIcon style={{ color: 'white' }} />
                </IconButton>

                <Dialog open={openInfoDialog} onClose={handleInfoDialogClose}>
                    <DialogTitle>Astronomy Picture Of the Day Details</DialogTitle>
                    <DialogContent>
                        <List>
                            <ListItem>
                                {data.explanation}
                            </ListItem>
                            {data.media_type === "image" && (
                                <ListItem>
                                    <Button variant='contained' style={{ position: 'relative', top: '10px' }} onClick={handleHDPic}>Download HD Picture</Button>
                                </ListItem>
                            )}
                        </List>
                    </DialogContent>
                </Dialog>
            </div>
        );
    } else if (data.media_type === "video") {
        return (
            <div className="videoContainer" style={containerStyle}>
                <ReactPlayer
                    url={data.url}
                    width={is1080p ? "1200px" : "100%"}
                    height={is1080p ? "500px" : "auto"}
                    controls={true}
                    playing={true}
                />
            </div>
        );
    } else {
        return null;
    }
}
