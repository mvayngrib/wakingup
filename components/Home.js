import React from 'react'
import PropTypes from '~/constants/prop-types'
import styled from 'shakl'
import { ScrollView } from 'react-native'
import Screen from '~/components/Screen'
import Block from '~/components/Block'
import { P, H1, H2 } from '~/components/Text'
import ActionBar from '~/components/ActionBar'
import theme from '~/theme'
import Styles from '~/styles'
import CardStrip from '~/components/CardStrip'
import SafeBlock from './SafeBlock'

const HeaderTitleText = styled(H1)({
  fontSize: 28,
  fontWeight: 'bold',
}).attrs({ center: true })

const HeaderCaption = styled(P)({
  color: theme.colors.gray,
  fontWeight: '100',
  letterSpacing: 3,
}).attrs({ center: true })

const FeaturedVideo = styled.View({
  borderRadius: 5,
  backgroundColor: '#aaa',
  height: 210,
  marginBottom: 20,
})

const BlockTitle = styled(P)({
  marginBottom: 14,
})

const NextMeditationBar = ActionBar.extend(Styles.bg.actionBar).extend({
  marginBottom: 20,
})

const itemStyle = {
  // height: 200
}

const StyledHeader = styled(SafeBlock)({
  height: 70,
  marginTop: 15,
  marginBottom: 15,
  // backgroundColor: 'transparent',
  borderBottomWidth: 0,
  justifyContent: 'flex-start',
})

const HomeScreen = ({
  nextMeditationTitle,
  onLikeNextMeditation,
  onDownloadNextMeditation,
  onSelectLesson,
  lessons,
}) => {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StyledHeader>
          <Block center>
            <HeaderTitleText>WAKING UP</HeaderTitleText>
            <HeaderCaption>SAM HARRIS</HeaderCaption>
          </Block>
        </StyledHeader>

        <BlockTitle>FEATURED CONTENT</BlockTitle>
        <FeaturedVideo />
        <BlockTitle>NEXT MEDITATION</BlockTitle>
        <NextMeditationBar>
          <ActionBar.Title>{nextMeditationTitle}</ActionBar.Title>
          <ActionBar.Actions>
            <ActionBar.Action icon="heart" onPress={onLikeNextMeditation} />
            <ActionBar.Action icon="download-cloud" onPress={onDownloadNextMeditation} />
          </ActionBar.Actions>
        </NextMeditationBar>
        <BlockTitle>LESSONS</BlockTitle>
        <CardStrip items={lessons} onSelect={onSelectLesson} itemStyle={itemStyle} />
      </ScrollView>
    </Screen>
  )
}

HomeScreen.defaultProps = {}

HomeScreen.propTypes = {
  nextMeditationTitle: PropTypes.string.isRequired,
  // onLikeNextMeditation: PropTypes.func.isRequired,
  // onDownloadNextMeditation: PropTypes.func.isRequired,
  lessons: PropTypes.array.isRequired,
  onSelectLesson: PropTypes.func.isRequired,
}

// HomeScreen.navigationOptions = {
//   headerTitle: <HeaderTitle />,
//   // headerTransparent: true,
//   headerTitleStyle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   headerStyle: {
//     height: 70,
//     marginBottom: 15,
//     // backgroundColor: 'transparent',
//     borderBottomWidth: 0,
//   },
// }

export default HomeScreen
