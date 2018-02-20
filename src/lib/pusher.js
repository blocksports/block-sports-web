import pako from 'pako';
import { fetchNavigation } from '../site/core/reducers/navigation';
import { updateExchange } from '../site/core/reducers/exchange';
import { updateBlockchainInfo } from '../site/core/reducers/blockchain';
import { updatePrice } from '../site/core/reducers/currency';
import { exists } from 'fs';
import { isObject } from 'util';

export function subToMarkets(dispatch, props) {
	try {
		pusher;
	} catch (err) {
		console.log('No internet connection, cannot connect to pusher');
		return;
	}

	const { params, location } = props;
	const channelName = createMarketsChannel(params, location);

	let channel = pusher.subscribe(channelName);

	channel.bind('app-update', data => {
		const decodedData = decodeZlib(data);

		const { blockchain_data, currencies, matches } = decodedData;

		dispatch(updateExchange(matches, params));
		dispatch(updatePrice(currencies));
		dispatch(updateBlockchainInfo(blockchain_data));
	});
}

export function unsubFromMarkets(props) {
	const { params, location } = props;
	const channelName = createMarketsChannel(params, location);

	pusher.unsubscribe(channelName);
}

function createMarketsChannel(params, location) {
	const orderQuery = location.query.order;
	const order = orderQuery ? orderQuery : 'date';
	const sport = params.sport ? `-${params.sport}` : '';
	const competition = params.competition ? `-${params.competition}` : '';

	return `markets${sport}${competition}-${order}`;
}

const decodeZlib = data => {
	const strData = atob(data);
	const charData = strData.split('').map(x => x.charCodeAt(0));
	const binData = new Uint8Array(charData);

	const decoded = pako.inflate(binData);
	const decodedString = String.fromCharCode.apply(
		null,
		new Uint16Array(decoded)
	);
	return JSON.parse(decodedString);
};
