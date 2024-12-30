export default defineEventHandler((event) => {
  readBody(event).then(console.log)

  return new Response('hello', {
    status: 201,
  })
})
