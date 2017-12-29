import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Glyph = props => (
	<svg width={props.size} height={props.size} className={props.className}>
		<use xlinkHref={`/glyphs/glyphs.svg#${props.icon}`} />
	</svg>
);

Glyph.propTypes = {
	icon: PropTypes.string.isRequired,
	size: PropTypes.number,
	className: PropTypes.string,
};

Glyph.defaultProps = {
	size: 24,
};

export default Glyph;
