import blockContent from './blockContent'

import user from './user'
import ipes from './ipes'
import comment from './comment'
import postedBy from './postedBy'
import save from './save'
import pin from './pin'

export const schemaTypes = [
  // Document types
  pin,
  user,
  ipes,
  comment,
  postedBy,
  save,

  // Other types
  blockContent,
]
