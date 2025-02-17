import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const CommentForm: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");

    const handleSubmit = () => {
        //Add comment to localStorage
        const newComment = {title, body};
        const existComments = JSON.parse(localStorage.getItem('comments') || '[]');
        existComments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(existComments));
        console.log('Comment Added');
        // Clear Form Boxes
        setTitle('');
        setBody('');
    };

    return (
        <Container>
            <Form>
                <Form.Label id='titleLabel'>
                    Enter Comment Title
                </Form.Label>
                <Form.Control
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter title'
                    aria-labelledby='titleLabel'
                    >
                    
                </Form.Control>
                <Form.Label id='bodyLabel'>
                    Enter Comment Body
                </Form.Label>
                <Form.Control
                    type='text'
                    id='body'
                    value={body}
                    placeholder='Enter body'
                    onChange={(e) => setBody(e.target.value)}
                    aria-labelledby='bodyLabel'
                    >    
                </Form.Control>
                <Button type='submit' variant='success' onClick={handleSubmit}>
                    Submit Comment
                </Button>                                                                                                                                                          
            </Form>
        </Container>
    );
};

export default CommentForm;