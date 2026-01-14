import { Stack } from "expo-router"

const notFound = () => {
  return (
    <>
        <Stack.Screen name = 'not_found' options = {{ title: 'oops!'}}/>
    </>
  )
}
export default notFound