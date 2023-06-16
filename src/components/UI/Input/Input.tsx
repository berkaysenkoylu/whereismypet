import React from 'react';

const Input = (props: any) => {
	return (
		<div >
			<input data-testid={props.testid} />
		</div>
	);
}

export default Input;