import { render, fireEvent, screen } from "@testing-library/react";
import CommentForm from "../Components/CommentsForm";
import { vi } from 'vitest';

//Test 1
describe('CommentForm', () => {
    it('renders correctly', () => {
        render(
            <CommentForm />
        );

        expect(screen.getByLabelText('Enter Comment Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Enter Comment Body')).toBeInTheDocument();
    });

    //Test 2
    it('handles input changes', () => {
        render(
            <CommentForm />
        );
        //Title Input
        const inputTitle: HTMLInputElement = screen.getByPlaceholderText('Enter title') as HTMLInputElement;
        fireEvent.change(inputTitle, { target: { value: 'test' } });
        //Body Input
        const inputBody: HTMLInputElement = screen.getByPlaceholderText('Enter body');
        fireEvent.change(inputBody, { target: { value: 'test body' } });

        expect(inputTitle.value).toBe('test');
        expect(inputBody.value).toBe('test body');
    });

    //Test 3
    it('submit form and stores in localStorage', () => {
        render(
            <CommentForm />
        );
        //Mock localStorage using vi
        const setItemMock = vi.spyOn(Storage.prototype, 'setItem');
        const getItemMock = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('[]');

        //Change input Values
        fireEvent.change(screen.getByPlaceholderText('Enter title'), { target: { value: 'Test Title' } });
        fireEvent.change(screen.getByPlaceholderText('Enter body'), { target: { value: 'Test Body' } });

        //Click Submit
        fireEvent.click(screen.getByText('Submit Comment'));

        //Check storage

        expect(setItemMock).toHaveBeenCalledWith(
            'comments',
            JSON.stringify([{ title: 'Test Title', body: 'Test Body' }])
        );
        setItemMock.mockRestore();
        getItemMock.mockRestore();
    });
});