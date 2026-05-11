import {ImageBackground,View, StyleSheet} from 'react-native';

import {UserInput} from '../project/components/input-area/user-name-input';
import {EnterButton} from '../project/components/buttons/enter-button';

const LoginScreen = () => {
    return (
        <ImageBackground
            source={require('../assets/Gemini_Generated_Image_l7xwetl7xwetl7xw.png')}
            style={estilos.background}
            imageStyle={estilos.image}
        >
            <View style={estilos.View}>
                <UserInput />
                <EnterButton />
            </View>
        </ImageBackground>
    );
};

const estilos = StyleSheet.create({
    View: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

        gap: 30,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    image: {
        resizeMode: 'cover',
    },
});

export default LoginScreen;