import { Request } from 'express'
import { Strategy as LocalStrategy, IStrategyOptions,VerifyFunction } from 'passport-local'

export class EmailPasswordStrategy extends LocalStrategy {
  private static readonly defaultOptions: IStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: false
  }

  private readonly options: IStrategyOptions
  private readonly verify: VerifyFunction

  constructor (verify: VerifyFunction, options: IStrategyOptions = {}) {
    const assignedOptions = Object.assign(EmailPasswordStrategy.defaultOptions,options)
    super(assignedOptions, verify)
    this.options = assignedOptions
    this.verify = verify
    this.name = 'email-password'
  }

  authenticate (req: Request, _: any): void {
    const { usernameField,passwordField } = this.options

    const username = req.body[usernameField] || req.query[usernameField]
    const password = req.body[passwordField] || req.query[passwordField]

    try {
      this.verify(username, password, (e, user, options) => {
        if (e) return this.error(e)
        if (!user) return this.fail(options,401)
        return this.success(user,options)
      })
    } catch (e) {
      return this.error(e)
    }
  }
}
