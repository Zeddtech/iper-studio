import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'
export default defineType({
  name: 'pin',
  title: 'pins',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'string',
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'url',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'userid',
      title: 'UserID',
      type: 'string',
    }),
    defineField({
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    }),
    defineField({
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [{type: 'save'}],
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{type: 'comment'}],
    }),
  ],
})
