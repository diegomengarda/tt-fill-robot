import {setup, storeTTItem} from "./core"

(async () => {

  const category = {
    DEVELOPMENT: "19",
    IDLE: "21",
    MEETING_CLIENT: "23"
  }

  const taskDescription = {
    FEATURE_DEVELOPMENT: "783",
    DAILY_MEETING: "909",
    NO_ASSIGNED_TASKS: "880"
  }

  try {
    const {browser, page} = await setup()

    const tt = [
      /*
      {
        date: '27/09/2021',
        category: category.MEETING_CLIENT,
        task_description: taskDescription.DAILY_MEETING,
        hours: '0.5',
        description: '',
      },
      {
        date: '27/09/2021',
        category: category.MEETING_CLIENT,
        task_description: taskDescription.DAILY_MEETING,
        hours: '0.5',
        description: 'Tech meeting',
      },
      {
        date: '27/09/2021',
        category: category.DEVELOPMENT,
        task_description: taskDescription.FEATURE_DEVELOPMENT,
        hours: '1',
        description: 'working in task wt-555',
      }
       */
    ]

    for (let i = 0; i < tt.length; i++) {
      console.log(`Task ${i+1}`)
      await storeTTItem(page, tt[i])
    }

    await browser.close()
  } catch (e) {
    console.log(e.toString())
    throw e
  }
})()