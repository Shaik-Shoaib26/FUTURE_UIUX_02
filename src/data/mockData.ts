export type ServiceCategory = {
  id: string;
  name: string;
  icon: string;
};

export type Service = {
  id: string;
  categoryId: string;
  name: string;
  duration: number; // minutes
  price: number;
  description: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
};

export type Specialist = {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  about: string;
  servicesOffered: string[]; // service ids
};

export type Appointment = {
  id: string;
  serviceId: string;
  specialistId: string;
  date: string; // ISO string
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  userEmail?: string;
};

export const categories: ServiceCategory[] = [
  { id: 'c1', name: 'Haircut', icon: '✂️' },
  { id: 'c2', name: 'Coloring', icon: '🎨' },
  { id: 'c3', name: 'Facial', icon: '✨' },
  { id: 'c4', name: 'Spa', icon: '🧖' },
  { id: 'c5', name: 'Nails', icon: '💅' },
  { id: 'c6', name: 'Massage', icon: '💆' },
];

export const services: Service[] = [
  {
    id: 's1',
    categoryId: 'c1',
    name: 'Classic Haircut & Styling',
    duration: 45,
    price: 45,
    description: 'A customized haircut designed by your stylist to fit your individual style and preferences, includes professional blow dry and styling.',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 124,
  },
  {
    id: 's2',
    categoryId: 'c3',
    name: 'Glow Premium Facial',
    duration: 60,
    price: 85,
    description: 'Our signature illuminating facial treatment that deep cleanses, extracts, and hydrates your skin using proprietary serums.',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 89,
  },
  {
    id: 's3',
    categoryId: 'c4',
    name: 'Aromatherapy Spa Session',
    duration: 90,
    price: 120,
    description: 'Full-body relaxation therapy utilizing therapeutic essential oils designed to reduce stress and improve well-being.',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 205,
  },
  {
    id: 's4',
    categoryId: 'c3',
    name: 'Bridal Hair & Makeup',
    duration: 150,
    price: 250,
    description: 'Complete bridal transformation including trial session, intricate hairstyling, and long-lasting HD makeup application.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Bridal_makeup_.jpg/500px-Bridal_makeup_.jpg',
    rating: 5.0,
    reviewsCount: 42,
  },
  {
    id: 's5',
    categoryId: 'c2',
    name: 'Balayage & Highlights',
    duration: 120,
    price: 150,
    description: 'Transform your look with seamless, sun-kissed highlights using the expert balayage hand-painted technique for a natural gradient.',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 112,
  },
  {
    id: 's6',
    categoryId: 'c2',
    name: 'Full Head Color',
    duration: 90,
    price: 110,
    description: 'Rich, vibrant color from root to tip. Our premium colors leave your hair feeling soft, healthy, and incredibly shiny.',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewsCount: 88,
  },
  {
    id: 's7',
    categoryId: 'c2',
    name: 'Creative Pastel Coloring',
    duration: 180,
    price: 200,
    description: 'Express yourself with our fashion shades! Includes pre-lightening and application of custom-mixed pastel or vibrant tones.',
    imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewsCount: 56,
  },
  {
    id: 's8',
    categoryId: 'c5',
    name: 'Luxury Gel Manicure',
    duration: 60,
    price: 65,
    description: 'A premium gel manicure that includes cuticle care, shaping, hand massage, and a long-lasting gel polish of your choice.',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewsCount: 154,
  },
  {
    id: 's9',
    categoryId: 'c5',
    name: 'Acrylic Extensions & Art',
    duration: 120,
    price: 95,
    description: 'Full set of acrylic nail extensions with custom nail art. Our specialized technicians can create any design you desire.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Acrylic_nail_art_with_crystal.jpg/500px-Acrylic_nail_art_with_crystal.jpg',
    rating: 4.8,
    reviewsCount: 203,
  },
  {
    id: 's10',
    categoryId: 'c6',
    name: 'Swedish Relaxation Massage',
    duration: 60,
    price: 85,
    description: 'A deeply relaxing, full-body Swedish massage designed to relieve muscle tension and promote overall well-being.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Spa_Picture_2.jpg/500px-Spa_Picture_2.jpg',
    rating: 4.9,
    reviewsCount: 215,
  },
  {
    id: 's11',
    categoryId: 'c1',
    name: 'Men\'s Precision Haircut',
    duration: 30,
    price: 35,
    description: 'A classic men\'s precision haircut, tailored to your face shape and styled to perfection.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Iranian_barber.jpg/500px-Iranian_barber.jpg',
    rating: 4.8,
    reviewsCount: 312,
  },
  {
    id: 's12',
    categoryId: 'c1',
    name: 'Kids\' Haircut',
    duration: 30,
    price: 25,
    description: 'A gentle and fun haircut experience for kids, ensuring a comfortable environment and a lovely new look.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/New_haircut_for_baby_boy.jpg/500px-New_haircut_for_baby_boy.jpg',
    rating: 4.7,
    reviewsCount: 189,
  },
];

export const specialists: Specialist[] = [
  {
    id: 'sp1',
    name: 'Elena Rostova',
    role: 'Senior Stylist',
    experience: '8 Years',
    rating: 4.9,
    reviewsCount: 312,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    about: 'Expert in modern balayage, creative color, and styling. Elena combines technical precision with an eye for fashion.',
    servicesOffered: ['s1', 's4', 's5', 's6', 's7', 's11', 's12'],
  },
  {
    id: 'sp2',
    name: 'Marcus Chen',
    role: 'Skin Expert',
    experience: '5 Years',
    rating: 4.8,
    reviewsCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    about: 'Passionate about skin health. Marcus specializes in treating problematic skin and anti-aging therapies.',
    servicesOffered: ['s2'],
  },
  {
    id: 'sp4',
    name: 'Daniel Park',
    role: 'Barber',
    experience: '6 Years',
    rating: 4.7,
    reviewsCount: 128,
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    about: 'Specialist in precision cuts for men and gentle, patient stylings for kids. Daniel combines classic barber techniques with modern finishing.',
    servicesOffered: ['s11', 's12'],
  },
  {
    id: 'sp3',
    name: 'Sarah Jenkins',
    role: 'Massage & Nail Therapist',
    experience: '12 Years',
    rating: 5.0,
    reviewsCount: 489,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    about: 'Certified reflexologist, deep tissue specialist, and expert nail technician. Sarah focuses on holistic healing and pristine nail care.',
    servicesOffered: ['s3', 's8', 's9', 's10'],
  },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    serviceId: 's1',
    specialistId: 'sp1',
    date: tomorrow.toISOString(),
    status: 'upcoming',
    price: 45,
    userEmail: 'sarah@example.com',
  },
  {
    id: 'a2',
    serviceId: 's2',
    specialistId: 'sp2',
    date: lastWeek.toISOString(),
    status: 'completed',
    price: 85,
    userEmail: 'john@example.com',
  }
];
