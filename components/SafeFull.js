import styled from 'shakl'
import { SafeAreaView } from 'react-native'
import Block from './Block'

const SafeFull = styled(SafeAreaView)({ flex: 1 })

export default SafeFull.withChild(Block, (props) => ({ full: true, ...props }))
