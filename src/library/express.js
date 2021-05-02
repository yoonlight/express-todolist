import morgan from 'morgan'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import express from 'express'

export default (app) => {
  app.use(methodOverride('X-HTTP-Method-Override'))
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(cookieParser(process.env.SERVER_SECRET_KEY))
  app.use(
    session({
      secret: process.env.SERVER_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3.6e6 * 24 },
    })
  )
}
