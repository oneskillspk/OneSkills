import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OneSkills - Online Courses & Learning Dashboard',
  description: 'Modern online learning platform inspired by oneskills.pk for practical tech skills, hands-on modules, and interactive student progress tracking.',
  openGraph: {
    title: 'OneSkills - Online Courses & Learning Dashboard',
    description: 'Modern online learning platform inspired by oneskills.pk for practical tech skills, hands-on modules, and interactive student progress tracking.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneSkills - Online Courses & Learning Dashboard',
    description: 'Modern online learning platform inspired by oneskills.pk for practical tech skills, hands-on modules, and interactive student progress tracking.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-emerald-500 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
