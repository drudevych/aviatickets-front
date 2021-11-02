import { MenuItem, Paper, Select, Typography, Button, Container } from '@mui/material';
import React, { useState } from 'react';

const FlightInfo = (props: any) => {

    const [seats, setSeats] = useState<number[]>([]);

    return(
        <>
            <Container>
                <Paper elevation={3} >
                    <Typography variant="h3" component="h3" mt={30} fontFamily='Tahoma' align='center'>
                        Львів - Київ 
                        {/* {props.match.params.id} */}
                    </Typography>
                    <Select>
                        {seats.map((seat: number) => (
                            <MenuItem value={seat}>{seat}</MenuItem>
                        ))}
                    </Select> 
                    <Button>
                        Обрати місце
                    </Button>               
                </Paper>
            </Container>
        </>
    )
}

export default FlightInfo;