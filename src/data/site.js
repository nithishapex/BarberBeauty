export const HOME_PATH = '/'

export const CATALOGUE_URL =
  ''

export const CONTACT = {
  phoneDisplay: '04235781641',
  phoneHref: 'tel:04235781641',
  whatsappDisplay: '+923226027025',
  whatsappHref: 'https://wa.me/923226027025',
  whatsappWidgetHref: `https://wa.me/923226027025?text=${encodeURIComponent(
    [
      'Hello Crownora Barber Academy,',
      '',
      'I would like to enquire about your courses.',
      '',
      'Name:',
      'Phone:',
      'Email:',
      'Course:',
      '',
      'Please share the course details, duration, fees, and class timings.',
      '',
      'Thank you.',
    ].join('\n'),
  )}`,
  email: 'crownorabarber@yahoo.com',
  emailHref: 'mailto:crownorabarber@yahoo.com',
  careersEmail: 'crownorabarber@yahoo.com',
  careersHref: 'mailto:crownorabarber@yahoo.com',
  address:
    'Office No.94, Lower Ground Floor, Saddique Trade Center Main Boulevard Gulberg 2, Lahore, Pakistan.',
  hours: '10 AM to 04:30 PM',
}

export const SOCIAL = [
  // {
  //   label: 'Nordic Beauty on Instagram',
  //   // href: 'https://www.instagram.com/nordicbeautydxb/',
  //   icon: 'instagram',
  // },
  // {
  //   label: 'Nordic Beauty on Facebook',
  //   // href: 'https://www.facebook.com/nordicbeautydxb/',
  //   icon: 'facebook',
  // },
]

export const COURSE_MENU = [
  {
    label: 'Barbering Courses',
    href: '/courses/barbering',
  },
  {
    label: 'Aesthetic Courses',
    href: '/courses/aesthetic',
    children: [
      {
        label: 'MICRO – DERMABRASION COURSE',
        href: '/courses/microdermabrasion-course',
      },
      {
        label: 'COSMETIC MEDICAL CHEMICAL PEELING & SKINCARE COURSE',
        href: '/courses/cosmetic-medical-chemical-peeling-skincare-course',
      },
      {
        label: 'MESOTHERAPY / MICRONEEDLING COURSE',
        href: '/courses/mesotherapy-microneedling-course',
      },
      {
        label: 'DERMAPLANING COURSE',
        href: '/courses/dermaplaning-course',
      },
    ],
  },
  {
    label: 'Beauty Therapy Diploma',
    href: '/courses/beauty-therapy-diploma',
  },
  {
    label: 'Body Therapy Courses',
    href: '/courses/body-therapy-massage-course',
  },

]

export const MAIN_NAV = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'My Certificates', href: '/certificates/access', activePrefix: ['/certificates', '/my-certificates'] },
  // { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const QUICK_LINKS = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'Academy', href: '/academy-courses' },
  { label: 'My Certificates', href: '/certificates/access', activePrefix: ['/certificates', '/my-certificates'] },
  // { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const REVIEW_URL = 'https://crownora-academy.vercel.app/'

export const SEO_CREDIT_URL =
  'https://www.brandcaredigital.com/service/best-seo-agency-dubai/'

export const TECHNIQUES = [
  'Hair knowledge',
  'Consultation',
  'Shampoo and head massage',
  'Cutting short hair/ long hair',
  'Blending with clippers',
  'Skin fade / machine cutting',
  'Blow drying/ Straightening',
  'Beard trimming/ shaving',
]

export const BASIC_COURSE = {
  title: 'BASIC',
  note: 'Training material provided by Crownora Beauty.',
  experience: 'Beginner/no previous experience needed.',
  duration: '10 days',
  internship: '20 days',
  prices: [
    { label: 'Professional Barbering Certificate', value: '' },
    { label: 'International Barbering Certificate', value: '' },
  ],
}

export const ADVANCED_COURSE = {
  title: 'ADVANCED',
  summary: 'Basic knowledge is mandatory. Customized based on experience.',
  duration: '5 days',
  internship: '10 days',
  prices: [
    { label: 'Professional Barbering Certificate', value: '' },
    { label: 'International Barbering Certificate', value: '' },
  ],
}
