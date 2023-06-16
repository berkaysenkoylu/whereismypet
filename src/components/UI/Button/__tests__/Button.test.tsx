import React from 'react';
import '../../../../setupTests';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Button from '../Button';
import type { ButtonPropsType } from '../types';

describe('Button UI element unit tests', () => {
	const mockedOnClickFunc = jest.fn();
	const buttonProps: ButtonPropsType = {
		btnType: 'BtnPrimary',
		btnSize: 'BtnSmall',
		label: 'myButton',
		clicked: mockedOnClickFunc
	}

	it('should render the button', () => {
		render(<Button {...buttonProps} />)
		const btnElement = screen.getByText('myButton')
		expect(btnElement).toBeInTheDocument();
	});

	it('should not let it be clicked when disabled', () => {
		const newProps: ButtonPropsType = {
			...buttonProps,
			disabled: true
		};
		render(<Button {...newProps} />)
		const btnElement = screen.getByText('myButton');

		userEvent.click(btnElement)

		expect(mockedOnClickFunc).not.toHaveBeenCalled()
	});

	it('should correctly call the onClick function when clicked', () => {
		render(<Button {...buttonProps} />)
		const btnElement = screen.getByText('myButton')

		userEvent.click(btnElement)

		expect(mockedOnClickFunc).toHaveBeenCalled()
	});
});
