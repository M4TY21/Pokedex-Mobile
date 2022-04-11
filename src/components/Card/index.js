import React, { useEffect, useState } from "react";

import { Container, PokeImage, Name } from "./styles";

import { Load } from "../../components/Load";

import axios from "axios";

export function Card({ data, onPress }) {
	const [pokemon, setPokemon] = useState({});
	const [loading, setLoading] = useState(true);

	async function getPokeInfos() {
		const response = await axios.get(data.url);
		setPokemon(response.data);
		setLoading(false);
	}

	useEffect(() => {
		getPokeInfos();
	}, [pokemon]);

	return (
		<Container onPress={onPress} activeOpacity={0.75}>
			{loading ? (
				<Load />
			) : (
				<>
					<PokeImage
						source={{ uri: pokemon.sprites.front_default }}
					/>
					<Name>{data.name}</Name>
				</>
			)}
		</Container>
	);
}