import styled from 'shakl'
import MediaContainer from 'components/MediaContainer'
import Icon from 'components/Icon'
import theme from '~/theme'
import { Text } from './Text'

const Container = MediaContainer.extend({
  flexDirection: 'row',
  backgroundColor: theme.colors.secondary,
  padding: 22,
  shadowColor: theme.colors.gray,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
})

const Title = styled(Text)({
  flex: 1,
  color: theme.colors.white,
  fontSize: theme.fontSizes.title,
})

const Actions = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const Action = styled
  .Touchable({
    marginLeft: 10,
  })
  .withChild(Icon, ({ icon }) => ({
    name: icon,
    color: theme.colors.white,
    size: 25,
  }))

Container.Actions = Actions
Container.Action = Action
Container.Title = Title

export default Container
