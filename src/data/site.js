export const HOME_PATH = '/'

export const CATALOGUE_URL =
  ''

export const CONTACT = {
  phoneDisplay: '+971 4 221 15 21',
  phoneHref: 'tel:+97142211521',
  whatsappDisplay: '+971569043232',
  whatsappHref: 'http://api.whatsapp.com/send?phone=971569043232',
  whatsappWidgetHref: 'https://wa.me/971569043232?text=Hi',
  email: 'info@nordicbtc.com',
  emailHref: 'mailto:info@nordicbtc.com',
  careersEmail: 'careers@nordicbtc.com',
  careersHref: 'mailto:careers@nordicbtc.com',
  address: 'PO Box: 12329, Villa No. A 1053 Al Wasl Road, Jumeirah, Dubai, UAE',
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

export const REVIEW_URL = 'https://g.page/r/CVwpAYImCWWlEAE/review'

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
