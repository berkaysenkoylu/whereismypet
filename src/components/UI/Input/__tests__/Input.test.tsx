import React from 'react';
import '../../../../setupTests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input element unit tests', () => {
	it("should be empty at the beginning", () => {
		render(<Input testid="test" />)
		const inputElement = screen.getByTestId<HTMLInputElement>("test");

		expect(inputElement.value).toEqual('');
	});

	it("should have the correct value when entered", () => {
		render(<Input testid="test" />)
		const inputElement = screen.getByTestId<HTMLInputElement>("test");

		userEvent.type(inputElement, 'test');

		expect(inputElement.value).toBe('test');
	});
})