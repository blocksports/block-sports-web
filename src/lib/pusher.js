import pako from 'pako';   
import { fetchNavigation } from '../site/core/reducers/navigation';
import { updateBlockchainInfo } from '../site/core/reducers/blockchain';

export function subToMarkets(dispatch, params, oldParams) {
	const channelName = createMarketsChannel(params);

	let channel = pusher.subscribe(channelName);
	if (oldParams) {
		unsubFromMarkets(oldParams);
	}

	channel.bind('app-update', data => {
		const decodedData = decodeZlib(data);

		const {blockchain_data, currencies, matches} = decodedData;

		// dispatch(updateMarkets(markets, params))
		// dispatch(updatePrices(prices))
		dispatch(updateBlockchainInfo(blockchain_data))
	});
}

export function unsubFromMarkets(oldParams) {
	const channelName = createMarketsChannel(oldParams);
	let channel = pusher.unsubscribe(channelName);
}

function createMarketsChannel(params) {
	const sport = params.sport ? `-${params.sport}` : '';
	const competition = params.competition ? `-${params.competition}` : '';
	return `markets${sport}${competition}-date`;
}

const decodeZlib = (data) => {
	const strData = atob(data);
	const charData = strData.split('').map( x => x.charCodeAt(0));
	const binData = new Uint8Array(charData);

	const decoded = pako.inflate(binData);
	const decodedString = String.fromCharCode.apply(null, new Uint16Array(decoded));
	return JSON.parse(decodedString)
}
