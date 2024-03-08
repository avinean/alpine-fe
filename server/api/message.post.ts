export default defineEventHandler(async (event) => {
  const { name, phone} = await readBody(event)

  const users = process.env.TG_USERS?.split(',')
  if (users?.length) {
    await Promise.all(users.map(user => $fetch(`https://api.telegram.org/bot${process.env.TG_BOT_API}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: user,
        parse_mode: 'HTML',
        text: `
Замовлення зворотнього дзвінка від
Ім'я: <b>${name}</b>
Телефон: <a href="tel:${phone}">${phone}</a>
      `
      }
    })))
  }
})