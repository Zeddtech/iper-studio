import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'
export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      options: {
        dateFormat: 'MMM DD, YYYY .',
      },
    }),
  ],
})
