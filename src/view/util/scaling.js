import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

// https://tech.groww.in/dynamic-font-scaling-in-react-native-c8485b066607

const baseWidth = 411
const baseHeight = 731
export const scaling = (type, dimension) => {
    var scale = 1;
    switch(type) {
        case 'width':
        case 'font': {
            scale = width / baseWidth
            break
        }
        case 'height': {
            scale = height / baseHeight
            break
        }
        default: {
            throw new Error('Invalid dimension')
        }
    }
    return scale * dimension
}