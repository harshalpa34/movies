import { colors } from "@/constants/Colors";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MovieCard from "./cards/MovieCard";
import { Movie } from "@/types";

const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&page=1&vote_count.gte=100`;

const constructApiUrl = (genreId: number, year: number) => {
  let url = `${BASE_URL}&primary_release_year=${year}`;
  if (genreId && genreId !== 0) {
    url += `&with_genres=${genreId}`;
  }
  return url;
};

interface MovieResponse {
  page: number;
  results: Movie[];
}

interface props {
  genre: {
    name: string;
    id: number;
  };
}
interface MoviesWithYear {
  [year: number]: Movie[];
}
const loadingBar = {
  NONE: "NONE",
  TOP: "TOP",
  BOTTOM: "BOTTOM",
};

const ContentList = ({ genre }: props) => {
  const [movies, setMovies] = useState<MoviesWithYear>({});
  const [year, setYear] = useState(2012);
  const [loading, setLoading] = useState(loadingBar.BOTTOM);
  const [hasMoreNext, setHasMoreNext] = useState(true);
  const [hasMorePrev, setHasMorePrev] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    resetState();
    getMovies(2012);
  }, [genre.id]);

  const resetState = () => {
    setMovies({});
    setIsError(false);
    setHasMoreNext(true);
    setHasMorePrev(true);
    setYear(2012);
  };

  const getMovies = async (fetchYear: number, isPrev: boolean = false) => {
    setLoading(isPrev ? loadingBar.TOP : loadingBar.BOTTOM);
    const apiUrl = constructApiUrl(genre.id, fetchYear);
    try {
      const { data } = await axios.get<MovieResponse>(apiUrl);

      if (data.results.length === 0) {
        setLoading(loadingBar.NONE);
        isPrev ? setHasMorePrev(false) : setHasMoreNext(false);
        return;
      }

      setMovies((previous) =>
        isPrev
          ? { [fetchYear]: data.results, ...previous }
          : { ...previous, [fetchYear]: data.results }
      );
      setYear(fetchYear);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(loadingBar.NONE);
    }
  };

  const loadMoreData = async () => {
    if (loading !== loadingBar.BOTTOM && hasMoreNext) {
      const newYear = year + 1;
      await getMovies(newYear);
    }
  };

  const loadTopData = async () => {
    if (loading !== loadingBar.TOP && hasMorePrev) {
      const newYear = year - 1;
      await getMovies(newYear, true);
    }
  };

  const Loader = () => {
    return (
      <ActivityIndicator
        size="large"
        color="#fff"
        style={contentStyles.loaderWrapper}
      />
    );
  };

  const MoviesByYear = ({ item }: { item: number }) => {
    return (
      <View style={contentStyles.mainWrapper} key={item.toString()}>
        <View key={item.toString()} style={contentStyles.yearWrapper}>
          <Text style={contentStyles.year}>{item}</Text>
          <View style={contentStyles.contentWrapper}>
            {movies[item].map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </View>
        </View>
      </View>
    );
  };

  if (isError) {
    return (
      <View style={contentStyles.errorView}>
        <Text style={contentStyles.errorText}>
          Opps... Something went wrong, please try again later!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={Object.keys(movies).map((year) => parseInt(year))}
      renderItem={({ item }) => <MoviesByYear item={item} />}
      keyExtractor={(year) => year.toString()}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      onScroll={({ nativeEvent }) => {
        if (nativeEvent.contentOffset.y <= 1) loadTopData();
      }}
      ListHeaderComponent={() => loading === loadingBar.TOP && <Loader />}
      ListFooterComponent={() => loading === loadingBar.BOTTOM && <Loader />}
      scrollEventThrottle={15}
    />
  );
};

const contentStyles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: colors.bgColor,
    borderColor: "blue",
    paddingHorizontal: 25,
  },
  yearWrapper: {
    paddingVertical: 20,
    marginTop: 30,
  },
  year: {
    color: "white",
    marginBottom: 10,

    paddingLeft: 10,
    fontSize: 30,
    fontFamily: "SpaceMono",
  },
  contentWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  loaderWrapper: {
    padding: 10,
  },
  errorView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    width: "60%",
    fontFamily: "Poppins",
    fontSize: 20,
    opacity: 0.5,
    textAlign: "center",
    color: "white",
  },
});

export default ContentList;
