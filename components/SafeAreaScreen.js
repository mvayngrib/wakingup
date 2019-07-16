import styled from 'shakl'
import { SafeAreaView } from 'react-native'
import Screen from './Screen'

const SafeFull = styled(SafeAreaView)({ flex: 1 })

export default SafeFull.withChild(Screen)
