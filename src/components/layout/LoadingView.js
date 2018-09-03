import React from 'react'
import Spinner from 'react-spinkit'
import { Container } from 'reactstrap'

export default function LoadingView () {
    return (
        <Container className='justify-content-center align-items-center' >
            <Spinner 
                className='justify-content-center align-items-center mx-auto'
                name='line-scale' 
                color='#00B1EF'
                style={{
                    width: 50,
                    marginTop: 270,                    
                }}
            />
        </Container>
    )
}


