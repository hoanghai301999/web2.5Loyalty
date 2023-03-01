import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import TrackPlayer, {
  Capability,
  Event,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import CustomSlider from "./CustomSlider";
import CustomController from "./CustomController";
import BookItem from "./BookItem";
import Line from "components/Line";
import playlistData from "./playlistData.json";
const ListenBook = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const progress = useProgress();

  const [trackArtwork, setTrackArtwork] = React.useState<string | number>();
  const [trackTitle, setTrackTitle] = React.useState<string>();
  const [trackArtist, setTrackArtist] = React.useState<string>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artist, artwork } = track || {};
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
      console.log("artwork", artwork);
    }
  });

  React.useEffect(() => {
    setupIfNecessary();
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryRight={<NavigationAction icon="menu" />}
        accessoryLeft={<NavigationAction icon="leftArrow" />}
      />
      <Content
        contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
      >
        <Image
          source={Images.book1}
          /* @ts-ignore */
          style={styles.book}
        />
        <Text center category="title3" status="white" marginTop={32}>
          {trackTitle}
        </Text>
        <Text center category="body" status="grey500" marginTop={8} capitalize>
          {trackArtist}
        </Text>
        <CustomSlider
          value={progress.position}
          maxValue={progress.duration}
          onSlidingComplete={async (value) => {
            /* @ts-ignore */
            await TrackPlayer.seekTo(value);
          }}
        />
        <CustomController />
        <View style={styles.timeSleep}>
          <Text category="body" status="snow">
            Time Sleep
          </Text>
          <Text category="headline" status="white">
            1 Hour
          </Text>
        </View>
        <Line
          marginBottom={44}
          backgroundColor={theme["background-basic-color-7"]}
        />
        <BookItem
          image={track[1].image}
          title={track[1].title}
          author={track[1].author}
        />
      </Content>
    </Container>
  );
});

export default ListenBook;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
  },
  topNav: {
    marginHorizontal: 4,
  },
  book: {
    alignSelf: "center",
  },
  timeSleep: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  progressContainer: {
    height: 40,
    width: 380,
    marginTop: 25,
    flexDirection: "row",
  },
});
const setupIfNecessary = async () => {
  // if app was relaunched and music was already playing, we don't setup again.
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    return;
  }

  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });

  await TrackPlayer.add(playlistData);
};
const track = [
  {
    id: 0,
    image: Images.book1,
    title: "The world, your life",
    author: "june cook",
    uri: "https://res.cloudinary.com/whisky131/video/upload/v1634101632/Not_Afraid_tndelo.mp3",
  },
  {
    id: 1,
    image: Images.book5,
    title: "The world,your life",
    author: "june cook",
    uri: "https://res.cloudinary.com/whisky131/video/upload/v1634101632/Not_Afraid_tndelo.mp3",
  },
];
