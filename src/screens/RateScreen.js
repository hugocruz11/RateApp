import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  TouchableOpacity,
} from 'react-native';

const REACTIONS = [
  {
    label: 'Malo',
    src: require('../assets/worried.png'),
    bigSrc: require('../assets/worried_big.png'),
  },
  {
    label: 'Regular',
    src: require('../assets/sad.png'),
    bigSrc: require('../assets/sad_big.png'),
  },
  {
    label: 'Bueno',
    src: require('../assets/ambitious.png'),
    bigSrc: require('../assets/ambitious_big.png'),
  },
  {
    label: 'Excelente',
    src: require('../assets/smile.png'),
    bigSrc: require('../assets/smile_big.png'),
  },
];
const WIDTH = 800;
const DISTANCE = WIDTH / REACTIONS.length;
const END = WIDTH - DISTANCE;

export default class RateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateDateForm = this.navigateDateForm.bind(this);
    this._pan = new Animated.Value(2 * DISTANCE);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._pan.setOffset(this._pan._value);
        this._pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, {dx: this._pan}]),
      onPanResponderRelease: () => {
        this._pan.flattenOffset();

        let offset = Math.max(0, this._pan._value + 0);
        if (offset < 0) return this._pan.setValue(0);
        if (offset > END) return this._pan.setValue(END);

        const modulo = offset % DISTANCE;
        offset =
          modulo >= DISTANCE / 2
            ? offset + (DISTANCE - modulo)
            : offset - modulo;

        this.updatePan(offset);
      },
    });
  }

  navigateDateForm(key) {
    this.props.navigation.push('DateForm', {
      key: key,
    });
  }

  updatePan(toValue, key) {
    Animated.spring(this._pan, {toValue, friction: 7}).start();
    switch (toValue) {
      case 0:
        key = 0;
        break;
      case 200:
        key = 1;
        break;
      case 400:
        key = 2;
        break;
      case 600:
        key = 3;
        break;
      default:
        key = null;
        break;
    }
    this.navigateDateForm(key);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Text style={styles.welcome}>¿Cómo te sentiste con nostros?</Text>

          <View style={styles.line} />

          <View style={styles.reactions}>
            {REACTIONS.map((reaction, idx) => {
              const u = idx * DISTANCE;
              let inputRange = [u - 20, u, u + 20];
              let scaleOutputRange = [1, 0.25, 1];
              let topOutputRange = [0, 10, 0];
              let colorOutputRange = ['#999', '#222', '#999'];

              if (u - 20 < 0) {
                inputRange = [u, u + 20];
                scaleOutputRange = [0.25, 1];
                topOutputRange = [10, 0];
                colorOutputRange = ['#222', '#999'];
              }

              if (u + 20 > END) {
                inputRange = [u - 20, u];
                scaleOutputRange = [1, 0.25];
                topOutputRange = [0, 10];
                colorOutputRange = ['#999', '#222'];
              }

              return (
                <TouchableOpacity
                  onPress={() => this.updatePan(u, idx)}
                  activeOpacity={0.9}
                  key={idx}>
                  <View style={styles.smileyWrap}>
                    <Animated.Image
                      source={reaction.src}
                      style={[
                        styles.smiley,
                        {
                          transform: [
                            {
                              scale: this._pan.interpolate({
                                inputRange,
                                outputRange: scaleOutputRange,
                                extrapolate: 'clamp',
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  </View>

                  <Animated.Text
                    style={[
                      styles.reactionText,
                      {
                        top: this._pan.interpolate({
                          inputRange,
                          outputRange: topOutputRange,
                          extrapolate: 'clamp',
                        }),
                        color: this._pan.interpolate({
                          inputRange,
                          outputRange: colorOutputRange,
                          extrapolate: 'clamp',
                        }),
                      },
                    ]}>
                    {reaction.label}
                  </Animated.Text>
                </TouchableOpacity>
              );
            })}
            <Animated.View
              {...this._panResponder.panHandlers}
              style={[
                styles.bigSmiley,
                {
                  transform: [
                    {
                      translateX: this._pan.interpolate({
                        inputRange: [0, END],
                        outputRange: [0, END],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              {REACTIONS.map((reaction, idx) => {
                let inputRange = [
                  (idx - 1) * DISTANCE,
                  idx * DISTANCE,
                  (idx + 1) * DISTANCE,
                ];
                let outputRange = [0, 1, 0];

                if (idx == 0) {
                  inputRange = [idx * DISTANCE, (idx + 1) * DISTANCE];
                  outputRange = [1, 0];
                }

                if (idx == REACTIONS.length - 1) {
                  inputRange = [(idx - 1) * DISTANCE, idx * DISTANCE];
                  outputRange = [0, 1];
                }
                return (
                  <TouchableOpacity
                    onPress={() => this.updatePan(u, idx)}
                    key={idx}
                    activeOpacity={0.9}>
                    <Animated.Image
                      source={reaction.bigSrc}
                      style={[
                        styles.bigSmileyImage,
                        {
                          opacity: this._pan.interpolate({
                            inputRange,
                            outputRange,
                            extrapolate: 'clamp',
                          }),
                        },
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}

const size = 42;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wrap: {
    width: WIDTH,
    marginBottom: 50,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    color: '#777',
    fontWeight: '600',
    fontFamily: 'Avenir',
    marginBottom: 50,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  smileyWrap: {
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smiley: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#c7ced3',
  },
  bigSmiley: {
    width: DISTANCE,
    height: DISTANCE,
    borderRadius: DISTANCE / 2,
    backgroundColor: '#ffb18d',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bigSmileyImage: {
    width: DISTANCE,
    height: DISTANCE,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reactionText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#999',
    fontWeight: '400',
    fontFamily: 'Avenir',
    marginTop: 5,
  },
  line: {
    height: 4 / PixelRatio.get(),
    backgroundColor: '#eee',
    width: WIDTH - (DISTANCE - size),
    left: (DISTANCE - size) / 2,
    top: DISTANCE / 2 + 2 / PixelRatio.get(),
  },
});
