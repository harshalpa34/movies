import { colors } from "@/constants/Colors";
import { Movie } from "@/types";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const windowWidth = Dimensions.get("window").width;

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <View style={movieCard.wrapper} key={movie.id}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={movieCard.image}
      />
      <View style={movieCard.footerWrapper}>
        <Text style={movieCard.title} numberOfLines={1} ellipsizeMode="tail">
          {movie.title}
        </Text>
        <Text style={movieCard.subTitle}>
          {movie.vote_average.toFixed(1)}/10 Rated
        </Text>
      </View>
    </View>
  );
};

const movieCard = StyleSheet.create({
  wrapper: {
    width: windowWidth * 0.4,
    position: "relative",
  },
  image: {
    borderColor: "white",
    width: "100%",
    aspectRatio: 3 / 5,
    borderRadius: 3,
    backgroundColor: colors.headerBg,
  },
  footerWrapper: {
    width: "100%",
    padding: 10,
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    gap: 1,
  },
  title: {
    color: "white",
    fontSize: 15,
    fontFamily: "Poppins",
  },
  subTitle: {
    color: "white",
    fontSize: 11,
    fontFamily: "Poppins",
    opacity: 0.65
  },
});

export default MovieCard;
