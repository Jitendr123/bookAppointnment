import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import * as Picklist from './Picklist';


function AlreadyVisited() {
    const [search, setSearch] = useState('')

    function handleIndiviualSearchChange(value) {
        console.log(value)
    }

    return (
        <>
            <Container fluid>
                <Row className='webView docbg docMain'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Search..</Form.Label>
                            <AsyncSelect
                                cacheOptions={false}
                                defaultOptions={false}
                                value={search}
                                getOptionLabel={e => e.label + ' '}
                                getOptionValue={e => e.id}
                                loadOptions={Picklist.fetchSearchPicklist}
                                onInputChange={Picklist.handleInputChange}
                                onChange={handleIndiviualSearchChange}
                            >
                            </AsyncSelect>

                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AlreadyVisited
