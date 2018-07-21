import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { Link } from 'react-router';
import { t } from 'i18next';
import Button from '../Button';
import {
	fadeDefaultStyle,
	fadeTransitionStyles,
} from '../../../../lib/animation';
import styles from './styles.less';

import WhitepaperImage from '../../../../img/bsxcard-whitepaper-green.png';
import TelegramImage from '../../../../img/bsxcard-telegram-green.png';

const Card = ({ cardID }) => {
    let id = cardID;
    let urlPath;
	let Image;

	switch(id) {
        case 1: 
            Image = WhitepaperImage;
            urlPath = 'http://files.blocksports.com/Block_Sports_White_Paper_v1.pdf';
			break;
		case 2:
            Image = TelegramImage;
            urlPath = 'https://t.me/blocksports';
			break;
        default:
            id = 1;
            Image = WhitepaperImage;
            urlPath = 'http://files.blocksports.com/Block_Sports_White_Paper_v1.pdf';
	}

	return (
		<div
			className={styles.item}
			style={{ backgroundImage: `url('${Image}')`}}>
			<Transition appear={true} in={true} timeout={0}>
				{state => (
					<div
						className={styles.itemInner}
						style={{
							...fadeDefaultStyle,
							...fadeTransitionStyles[state],
						}}>
						<div className={styles.emptyInfoA}>
                            {t(`core:cards.empty.info-a-${id}`)}
						</div>
						<div className={styles.emptyInfoB}>
                            {t(`core:cards.empty.info-b-${id}`)}
						</div>
						<a href={urlPath} target={"_blank"}>
							<Button className={styles.itemCta} size="small" color="primary">
								{t(`core:cards.empty.button-${id}`)}
							</Button>
						</a>
					</div>
				)}
			</Transition>
		</div>
	);
};

Card.propTypes = {
	cardID: PropTypes.number.isRequired,
};

export default Card;
