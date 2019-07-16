import React from 'react'
import Screen from '~/components/Screen'
import Header from '~/components/Header'
import Body from '~/components/Body'
import Footer from '~/components/Footer'
import { P, H1 } from '~/components/Text'

const LessonsPage = ({ lessons }) => {
  return (
    <Screen>
      <Header>
        <H1 left>LessonsPage</H1>
      </Header>
      <Body>
        {lessons.map((lesson) => (
          <P>{lesson.title}</P>
        ))}
      </Body>
      <Footer>
        <P>footer</P>
      </Footer>
    </Screen>
  )
}

LessonsPage.defaultProps = {}

LessonsPage.propTypes = {}

export default LessonsPage
