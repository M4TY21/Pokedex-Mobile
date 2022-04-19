import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import Grid from "react-native-grid-component";
import { api } from "../../services/api";

import PokeLogo from "../../assets/pokemon-logo.png";
import { AntDesign } from "@expo/vector-icons";

import { Load } from "../../components/Load";
import { Card } from "../../components/Card";

import { theme } from "../../global/styles/theme";

import {
	Container,
	ScrollPage,
	TitleImage,
	InputView,
	SearchInput,
	ClearSearch,
} from "./styles";

export function Home() {
	const navigation = useNavigation();

	const [pokemons, setPokemons] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");

	function handleSearch(text) {
		setSearch(text);
		console.log(search);
	}

	function ClearSearchInput() {
		setSearch("");
	}

	function handlePokemonInfo(pokemonSelected) {
		navigation.navigate("PokemonInfo", { pokemonSelected });
	}

	async function getPokemons() {
		const response = await api.get("pokemon-form?limit=5");
		setPokemons(response.data.results);

		setLoading(false);
	}

	useEffect(() => {
		getPokemons();
	}, []);

	return (
		<ScrollPage>
			<Container>
				<TitleImage source={PokeLogo} />

				<InputView>
					<SearchInput
						autoCapitalize='none'
						autoCorrect={false}
						onChangeText={(text) => handleSearch(text)}
						value={search}
						placeholder='Search'
					/>
					<ClearSearch
						onPress={ClearSearchInput}
						activeOpacity={0.9}
					>
						<AntDesign
							name='closecircle'
							size={20}
							color={theme.colors.primary}
						/>
					</ClearSearch>
				</InputView>
				{loading ? (
					<Load />
				) : (
					<Grid
						data={pokemons}
						renderItem={(item) => {
							return (
								<Card
									data={item}
									onPress={() => handlePokemonInfo(item)}
								/>
							);
						}}
						numColumns={3}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</Container>
		</ScrollPage>
	);
}
