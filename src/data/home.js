export const COURSE_GROUPS = [
  {
    label: 'SKINCARE/BEAUTY THERAPY COURSES',
    href: '/courses/beauty-therapy-diploma',
    icon: 'skin',
  },
  {
    label: 'AESTHETIC COURSES',
    href: '/courses/aesthetic',
    icon: 'face',
  },
  {
    label: 'BODY THERAPY COURSES',
    href: '/courses/body-therapy-massage-course',
    icon: 'body',
  },
  {
    label: 'BARBENING COURSES',
    href: '/courses/barbering',
    icon: 'barber',
  },
]

export const INSTAGRAM = [1, 2, 3, 4, 5, 6, 7, 8].map((number) => ({
  src: `/images/home/ig-${number}.jpg`,
  alt: `Nordic Beauty Instagram photo ${number}`,
}))

export const CAMPUS = Array.from({ length: 21 }, (_, index) => ({
  src: `/images/home/campus-${index + 1}.jpg`,
  alt: `Nordic Beauty academy ${index + 1}`,
}))

export const PARTNERS = [
  { src: '/images/home/partner-madi.png', alt: 'MADI international' },
  { src: '/images/home/partner-ciaa.png', alt: 'CIAA' },
  { src: '/images/home/partner-7.png', alt: 'Dubai Health Authority' },
  { src: '/images/home/partner-6.png', alt: 'Good Training Guide' },
  { src: '/images/home/partner-5.png', alt: 'iTEC' },
  { src: '/images/home/partner-2.png', alt: 'United Nations' },
  { src: '/images/home/partner-1.png', alt: 'Ajman University' },
  { src: '/images/home/partner-dha.png', alt: 'Knowledge and Human Development Authority, Government of Dubai' },
]
