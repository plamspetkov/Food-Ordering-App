import { useRef, useState } from 'react';

import classes from './CheckOut.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const CheckOut = (props) => {
	const [formInputsValidity, setformInputValidity] = useState({
		name: true,
		street: true,
		post: true,
		city: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostCode = postInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enterePostCodeIsValid = isFiveChars(enteredPostCode);

		setformInputValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			post: enterePostCodeIsValid,
			city: enteredCityIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredCityIsValid &&
			enterePostCodeIsValid;

		if (!formIsValid) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			post: enteredPostCode,
			city: enteredCity,
		});
	};

	const nameControlClasses = `${classes.control} ${
		formInputsValidity.name ? '' : classes.invalid
	}`;

	const streetControlClasses = `${classes.control} ${
		formInputsValidity.street ? '' : classes.invalid
	}`;

	const postControlClasses = `${classes.control} ${
		formInputsValidity.post ? '' : classes.invalid
	}`;

	const cityControlClasses = `${classes.control} ${
		formInputsValidity.city ? '' : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputsValidity.name && <p>Please enter a valid name!</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!formInputsValidity.street && <p>Please enter a valid street!</p>}
			</div>
			<div className={postControlClasses}>
				<label htmlFor="post">Post Code</label>
				<input type="text" id="post" ref={postInputRef} />
				{!formInputsValidity.post && <p>Please enter a valid post code!</p>}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formInputsValidity.city && <p>Please enter a valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default CheckOut;
