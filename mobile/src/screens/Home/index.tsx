import { useEffect, useState } from "react";
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import logoImg from '../../assets/logo-nlw-esports.png';

import { GameCard, GameCardProps } from "../../components/GameCard";
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";

import { styles } from './styles';
import { api } from "../../lib/api";
import { Loading } from "../../components/Loading";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const [isFetching, setIsFetching] = useState(true)

  const navigation = useNavigation();

  function handleOpenGaming({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  async function fetchGames() {
   try {
    const response = await api.get('/games')

    setGames(response.data)
   } catch(err) {
    console.log(err)
   } finally {
    setIsFetching(false)
   }
  }

  useEffect(() => {
    fetchGames()
  }, []);

  if(isFetching) {
    return (
        <Loading />
    )
  }
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGaming(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}