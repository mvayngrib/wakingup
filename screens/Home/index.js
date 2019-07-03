import React from 'react'
import PropTypes from '~/constants/prop-types'
import styled from 'shakl'
import Screen from 'components/Screen'
import Block from 'components/Block'
import Header from 'components/Header'
import Body from 'components/Body'
import Footer from 'components/Footer'
import { P, H1, H2 } from 'components/Text'
import MediaContainer from 'components/MediaContainer'
import ActionBar from 'components/ActionBar'
import theme from '~/theme'
import Styles from '~/styles'
import CardStrip from 'components/CardStrip'
import mocks from '~/mocks'

const HeaderTitleText = styled(H1)({
  fontSize: 28,
  fontWeight: 'bold',
})

const HeaderCaption = styled(P)({
  color: theme.colors.gray,
  fontWeight: 'light',
  letterSpacing: 3,
}).attrs({ center: true })

const HeaderTitle = () => (
  <Block center>
    <HeaderTitleText>WAKING UP</HeaderTitleText>
    <HeaderCaption>SAM HARRIS</HeaderCaption>
  </Block>
)

const FeaturedVideo = styled.View({
  borderRadius: 5,
  backgroundColor: '#aaa',
  height: 210,
  marginBottom: 20,
})

const BlockTitle = styled(P)({
  marginBottom: 14,
})

const NextMeditationBar = ActionBar.extend(Styles.bg.actionBar)

const HomeScreen = ({
  nextMeditationTitle,
  onLikeNextMeditation,
  onDownloadNextMeditation,
  lessons,
  onSelectLesson,
}) => {
  return (
    <Screen>
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
      <CardStrip items={lessons} onSelect={onSelectLesson} />
    </Screen>
  )
}

HomeScreen.defaultProps = {
  nextMeditationTitle: 'Nine',
  onLikeNextMeditation: () => console.log('tapped onLikeNextMeditation'),
  onDownloadNextMeditation: () => console.log('tapped onDownloadNextMeditation'),
  lessons: mocks.lessons,
  onSelectLesson: (index) => console.log('selected lesson', index),
}

HomeScreen.propTypes = {
  nextMeditationTitle: PropTypes.string.isRequired,
  onLikeNextMeditation: PropTypes.func.isRequired,
  onDownloadNextMeditation: PropTypes.func.isRequired,
  lessons: PropTypes.array.isRequired,
  onSelectLesson: PropTypes.func.isRequired,
}

HomeScreen.navigationOptions = {
  headerTitle: <HeaderTitle />,
  // headerTransparent: true,
  headerTitleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerStyle: {
    height: 70,
    marginBottom: 15,
    // backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
}

export default HomeScreen
