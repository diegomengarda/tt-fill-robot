require('dotenv').config()
import puppeteer from "puppeteer"

export const setup = async () => {
  const browser = await puppeteer.launch({headless: process.env.PUPETEER_HEADLESS})
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto('https://timetracker.bairesdev.com/Default.aspx')

  await page.waitForSelector('.login-form-cont')
  await page.type('input[type="text"]', process.env.LOGIN)

  await page.waitForSelector('.login-form-cont')
  await page.type('input[type="password"]', process.env.PASSWORD)

  await page.waitForSelector('.login-form-cont')
  await page.click('input[type="submit"]')

  await page.waitForNavigation({waitUntil: 'networkidle0'})

  if (page.url() !== 'https://timetracker.bairesdev.com/ListaTimeTracker.aspx') {
    throw new Error('Login fail!')
  }

  await new Promise(function (resolve) {
    setTimeout(resolve, 500)
  })

  return {browser, page}
}

export const storeTTItem = async (page, item) => {
  await page.waitForSelector('a[href="TimeTrackerAdd.aspx"]')
  await page.click('a[href="TimeTrackerAdd.aspx"]')

  await new Promise(function (resolve) {
    setTimeout(resolve, 500)
  })

  await page.waitForSelector('#ctl00_ContentPlaceHolder_txtFrom')
  await page.type('#ctl00_ContentPlaceHolder_txtFrom', '')
  await page.click('#ctl00_ContentPlaceHolder_txtFrom', {clickCount: 3})
  await page.keyboard.press('Backspace')
  await page.type('#ctl00_ContentPlaceHolder_txtFrom', item.date)
  await page.click('#main')
  await new Promise(function (resolve) {
    setTimeout(resolve, 1500)
  })

  console.log('select client')
  await page.waitForSelector('#ctl00_ContentPlaceHolder_idProyectoDropDownList')
  await page.select('#ctl00_ContentPlaceHolder_idProyectoDropDownList', process.env.PROJECT_ID)
  await new Promise(function (resolve) {
    setTimeout(resolve, 1500)
  })

  console.log('put hours')
  await page.waitForSelector('#ctl00_ContentPlaceHolder_TiempoTextBox')
  await page.type('#ctl00_ContentPlaceHolder_TiempoTextBox', item.hours)
  await new Promise(function (resolve) {
    setTimeout(resolve, 1500)
  })

  console.log('select development')
  await page.waitForSelector('#ctl00_ContentPlaceHolder_idCategoriaTareaXCargoLaboralDropDownList')
  await page.select('#ctl00_ContentPlaceHolder_idCategoriaTareaXCargoLaboralDropDownList', item.category)
  await new Promise(function (resolve) {
    setTimeout(resolve, 1500)
  })

  console.log('select feature development')
  await page.waitForSelector('#ctl00_ContentPlaceHolder_idTareaXCargoLaboralDownList')
  await page.select('#ctl00_ContentPlaceHolder_idTareaXCargoLaboralDownList', item.task_description)
  await new Promise(function (resolve) {
    setTimeout(resolve, 1500)
  })

  console.log('put description')
  await page.waitForSelector('#ctl00_ContentPlaceHolder_CommentsTextBox')
  await page.type('#ctl00_ContentPlaceHolder_CommentsTextBox', item.description)

  console.log('select focal point')
  await page.waitForSelector('#ctl00_ContentPlaceHolder_idFocalPointClientDropDownList')
  await page.select('#ctl00_ContentPlaceHolder_idFocalPointClientDropDownList', process.env.CLIENT_FOCAL_POINT_ID)
  await new Promise(function (resolve) {
    setTimeout(resolve, 1500)
  })

  await page.waitForSelector('input[type=submit]')
  await page.click('input[type=submit]')

  await page.waitForNavigation({waitUntil: 'networkidle0'})

  if (page.url() !== 'https://timetracker.bairesdev.com/ListaTimeTracker.aspx') {
    throw new Error('fail to insert tt!')
  }

  await new Promise(function (resolve) {
    setTimeout(resolve, 500)
  })
}