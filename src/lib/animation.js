const fadeDuration = 250

export const fadeDefaultStyle = {
  transition: `opacity ${fadeDuration}ms ease-in-out`,
  opacity: 0,
}

export const fadeTransitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};