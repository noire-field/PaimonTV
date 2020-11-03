import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const App = () => {
	const onBuffer = () => {
		console.log('On Buffer');
	}
	const videoError = (error) => {
		console.log("Error");
		console.log(error);
	}
	return (
		<View style={styles.container}>
			<Video source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}}   // Can be a URL or a local file.
				ref={(ref) => {
					console.log("Ref");
				}}                                      // Store reference
				onBuffer={() => { console.log("On Buffer") }}                // Callback when remote video is buffering
				onError={() => { console.log("On Error") }}               // Callback when video cannot be loaded
				style={styles.backgroundVideo} />
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

export default App;
