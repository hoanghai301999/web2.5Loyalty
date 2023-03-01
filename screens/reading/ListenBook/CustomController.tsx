import React from "react";
import { View, Image } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from "@ui-kitten/components";
import { Images } from "assets/images";
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";

const togglePlayback = async (playbackState: State) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (playbackState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const CustomController = () => {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const styles = useStyleSheet(themedStyles);
  const onNext = () => {
    TrackPlayer.skipToNext();
  };
  const onPrv = () => {
    TrackPlayer.skipToPrevious();
  };
  const seekToNext = () => {
    TrackPlayer.pause();
    TrackPlayer.seekTo(progress.position + 10);
    TrackPlayer.play();
  };
  const seekToPrv = () => {
    TrackPlayer.pause();
    TrackPlayer.seekTo(progress.position - 10);
    TrackPlayer.play();
  };
  return (
    <View style={[styles.container]}>
      <Button
        accessoryRight={<Icon pack="assets" name="leftChevron" />}
        status="transparent"
        onPress={onPrv}
      />
      <Button
        accessoryRight={<Icon pack="assets" name="undo" />}
        status="transparent"
        onPress={seekToPrv}
      />
      {playbackState === State.Connecting ? (
        <Image
          source={Images.spinner}
          /* @ts-ignore */
          style={styles.spinner}
        />
      ) : (
        <Button
          onPress={() => togglePlayback(playbackState)}
          status="control"
          size="80"
          accessoryRight={
            <Icon
              pack="assets"
              name={playbackState === State.Playing ? "pause" : "play"}
            />
          }
        />
      )}
      <Button
        accessoryRight={<Icon pack="assets" name="redo" />}
        status="transparent"
        onPress={seekToNext}
      />
      <Button
        accessoryRight={<Icon pack="assets" name="rightChevron" />}
        status="transparent"
        onPress={onNext}
      />
    </View>
  );
};

export default CustomController;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: -12,
    marginTop: 40,
    marginBottom: 32,
  },
  spinner: {
    width: 80,
    height: 80,
    borderRadius: 99,
  },
});
