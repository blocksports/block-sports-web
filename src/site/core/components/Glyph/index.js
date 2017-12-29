import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Glyph = props => (
	<svg width={props.width} height={props.height} className={props.className}>
		<use xlinkHref={`/glyphs/glyphs.svg#${props.icon}`} />
	</svg>
);

Glyph.propTypes = {
	icon: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
};

Glyph.defaultProps = {
	width: 24,
	height: 24,
};

export default Glyph;
