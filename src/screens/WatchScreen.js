import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const WatchScreen = (props) => {
    var video = null;

	const onBuffer = (data) => {
        console.log('On Buffer');
        console.log(data);
	}
	const videoError = (error) => {
		console.log("Error");
		console.log(error);
    }
    const onProgress = (progress) => {
        console.log("Progress");
		console.log(progress);
    }
    const onSeek = (data) => {
        console.log("Seek");
        console.log(data);
    }
    const onLoad = (data) => {
        console.log("On Load");
        console.log(data);

        console.log("Seek now!")
        video.seek(4000);
    }
    
	return (
		<View style={styles.container}>
			<Video source={{uri: "http://node-55.vkool.info/videos/ji6eb7szzidb8dwt5spjnebjpy.mp4"}}   // Can be a URL or a local file.
				ref={(ref) => {
                    video = ref;
                    console.log("Ref");
                    console.log(ref);
				}}                                      // Store reference
				onBuffer={onBuffer}                // Callback when remote video is buffering
                onError={videoError}               // Callback when video cannot be loaded
                onProgress={onProgress}
                onSeek={onSeek}
                onLoad={onLoad}
                style={styles.backgroundVideo}
                bufferConfig={{
                    minBufferMs: 10 * 1000,
                    maxBufferMs: 60 * 1000,
                    bufferForPlaybackMs: 10 * 1000,
                    bufferForPlaybackAfterRebufferMs: 10 * 1000
                }}
                controls={true}
                />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%'
	}
});

export default WatchScreen;
