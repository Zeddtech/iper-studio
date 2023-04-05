import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'
export default defineType({
  name: 'save',
  title: 'Save',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    }),
    defineField({
      name: 'userid',
      title: 'userId',
      type: 'string',
    }),
  ],
})
