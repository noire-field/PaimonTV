export const sharedScreenOptions = {
    gestureEnabled: false,
    transitionSpec: {
        open: {
            animation: 'timing',
        },
        close: {
            animation: 'timing',
            config: {
                duration: 300,
            },
        },
    },
    cardStyleInterpolator: ({ current }) => {
        return {
            cardStyle: {
                opacity: current.progress,
            }
        };
    }
};