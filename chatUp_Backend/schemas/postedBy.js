import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'
export default defineType({
  name: 'postedBy',
  title: 'PostedBy',
  type: 'reference',
  to: [{type: 'user'}],
})
