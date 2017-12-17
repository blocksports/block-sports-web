const fadeDuration = 250;

export const fadeDefaultStyle = {
	transition: `opacity ${fadeDuration}ms ease-in-out`,
	opacity: 0,
	visibility: 'hidden',
};

export const fadeTransitionStyles = {
	entering: { opacity: 0, visibility: 'hidden' },
	entered: { opacity: 1, visibility: 'visible' },
};
