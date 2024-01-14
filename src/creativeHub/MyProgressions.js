import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography, Divider } from "@mui/material";
import CoreProgressionComp from '../chordGenerator/CoreProgressionComp';

function MyProgressions() {

    const storeData = useSelector(state => state)

    const [userProgressions, setUserProgressions] = useState(storeData.creativeHub.userProgressions)

    useEffect(() => {
        if (storeData.creativeHub.userProgressions) {
            setUserProgressions(storeData.creativeHub.userProgressions)
        }

    }, [storeData.creativeHub.userProgressions])

    return (
        <>
            My Progressions ({userProgressions.length})
            <br /><br />
            {
                userProgressions.length === 0 ?
                    "You have no progressions saved yet!"
                    :
                    userProgressions.slice(0).reverse().map((progObject, index) => (
                        <>
                            <Box sx={{ margin: 'auto', paddingTop: "5px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "20px", width: "60%", backgroundColor: 'azure', borderRadius: "0px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                                <Typography variant="subtitle1">{progObject.prog.brief_description}</Typography>
                                <Typography variant="body1">Created at: {progObject.creationTime.day}, {progObject.creationTime.time}</Typography>
                                <Divider />
                                <br />
                                <CoreProgressionComp prog={progObject.prog} />
                            </Box>
                            <br />
                        </>
                    ))

            }
        </>
    )
}

export default MyProgressions
