import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
  channel: {
    id: number | string;
    name: string
    questions: number
    followedBy: number
  }
}

const ChannelBox = ({channel}: Props) => {
  return (
    <View>
      <Text>{channel.name}</Text>
      <Text>{channel.questions}</Text>
      <Text>{channel.followedBy}</Text>
    </View>
  )
}

export default ChannelBox

const styles = StyleSheet.create({})