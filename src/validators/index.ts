import Validator from 'validatorjs'

import { unique,minAge } from './custom'

Validator.registerAsync('unique',unique,'The :attribute is not unique.')

Validator.register('min_age',minAge,'The minimum age is :min_age.')
