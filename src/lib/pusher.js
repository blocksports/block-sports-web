import { fetchNavigation } from '../site/core/reducers/navigation';

export function subToMarkets(dispatch, params, oldParams) {
	const channelName = createMarketsChannel(params);

	let channel = pusher.subscribe(channelName);
	if (oldParams) {
		unsubFromMarkets(oldParams);
	}

	channel.bind('app-update', data => {
		const { prices, markets, block } = data;

		// dispatch(updateMarkets(markets, params))
		// dispatch(updatePrices(prices))
		// dispatch(updateBlockDetail(block))
	});
}

export function unsubFromMarkets(oldParams) {
	const channelName = createMarketsChannel(oldParams);
	console.log(channelName);
	let channel = pusher.unsubscribe(channelName);
}

function createMarketsChannel(params) {
	const sport = params.sport ? `-${params.sport}` : '';
	const competition = params.competition ? `-${params.competition}` : '';
	return `markets${sport}${competition}-date`;
}
