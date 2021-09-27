import {setup, storeTTItem} from "./core"
import {tasks} from "./tasks"

(async () => {

  try {
    const {browser, page} = await setup()

    const tasksList = [...tasks]

    for (let i = 0; i < tasksList.length; i++) {
      console.log(`Task ${i + 1}`)
      await storeTTItem(page, tasksList[i])
    }

    await browser.close()
  } catch (e) {
    console.log(e.toString())
    throw e
  }
})()