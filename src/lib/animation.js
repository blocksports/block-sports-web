export const fadeDuration = 300;

export const fadeDefaultStyle = {
	transition: `all ${fadeDuration}ms ease-in-out`,
	opacity: 0,
	visibility: 'hidden',
};

export const fadeTransitionStyles = {
	entering: { opacity: 0, visibility: 'hidden' },
	entered: { opacity: 1, visibility: 'visible' },
};

export const slideUpDuration = 300;

export const slideUpDefaultStyle = {
	transition: `all ${slideUpDuration}ms ease-in-out`,
	opacity: 0,
	visibility: 'hidden',
	transform: 'translateY(40px)',
};

export const slideUpTransitionStyles = {
	entering: {
		opacity: 0,
		visibility: 'hidden',
		transform: 'translateY(40px)',
	},
	entered: { opacity: 1, visibility: 'visible', transform: 'translateY(0)' },
};
