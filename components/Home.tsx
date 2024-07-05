import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import logo from "@/assets/images/logo.png";
import { colors } from "@/constants/Colors";
import ContentList from "./ContentList";
import axios from "axios";
const genreListApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d&language=en`;

type Genre = {
  name: string;
  id: number;
};
const commomGenre = {
  name: "All",
  id: 0,
};
const Home = () => {
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [activeGenre, setActiveGenre] = useState<Genre>(commomGenre);
  const genreChangeHandler = async (genre: Genre) => {
    setActiveGenre(genre);
  };
  useEffect(() => {
    const getGenreList = async () => {
      try {
        const { data } = await axios.get(genreListApi);
        const { genres } = data;
        setGenreList(genres);
      } catch (error) {
        setGenreList([
          { name: "Action", id: 1 },
          { name: "Comedy", id: 2 },
          { name: "Horror", id: 3 },
          { name: "Drama", id: 4 },
          { name: "Sci-Fi", id: 5 },
        ]);
      }
    };

    getGenreList();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={headerStyles.headerWrapper}>
        <Image source={logo} style={headerStyles.logo} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={headerStyles.tabWrapper}>
            <TouchableOpacity
              style={[
                headerStyles.tab,
                activeGenre.name === "All" && headerStyles.activeTab,
              ]}
              onPress={(e) => genreChangeHandler(commomGenre)}
            >
              <Text style={headerStyles.tabText}>{commomGenre.name}</Text>
            </TouchableOpacity>
            {genreList.map((genre) => (
              <TouchableOpacity
                style={[
                  headerStyles.tab,
                  activeGenre.id === genre.id && headerStyles.activeTab,
                ]}
                key={genre.id}
                onPress={(e) => genreChangeHandler(genre)}
              >
                <Text style={headerStyles.tabText}>{genre.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          backgroundColor: colors.bgColor,
          paddingBottom: 20,
          height: "auto",
          flex: 1,
        }}
      >
        <ContentList genre={activeGenre} />
      </View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  headerWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: colors.headerBg,
    elevation: 2,
  },
  logo: {
    width: 170,
    height: 60,
  },
  tabWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.lightBlack,
    borderRadius: 5,
    elevation: 2,
  },
  tabText: {
    color: "white",
    fontFamily: "Roboto",
  },
  activeTab: {
    backgroundColor: colors.red,
  },
});

export default Home;
