// backend/scripts/seed.js
import { sequelize, Service, HostingPlan, BlogPost, Portfolio, Testimonial } from '../models/index.js';

async function seed() {
  try {
    console.log('Seeding database with initial data...');

    // Seed Services
    const services = [
      {
        title: 'Custom Software Development',
        slug: 'custom-software-development',
        description: 'Tailored software solutions designed specifically for your business needs.',
        category: 'development',
        features: ['Requirement Analysis', 'Agile Development', 'Quality Assurance', 'Deployment'],
        technologies: ['Node.js', 'React', 'Python', 'Java'],
        startingPrice: 5000,
        active: true,
        order: 1,
      },
      {
        title: 'Web Applications',
        slug: 'web-applications',
        description: 'Modern, responsive web applications built with cutting-edge technologies.',
        category: 'development',
        features: ['Frontend Development', 'Backend API', 'Database Design', 'Performance Optimization'],
        technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
        startingPrice: 3000,
        active: true,
        order: 2,
      },
      {
        title: 'Cloud & Infrastructure',
        slug: 'cloud-infrastructure',
        description: 'Scalable cloud solutions with AWS, Azure, and Google Cloud Platform.',
        category: 'infrastructure',
        features: ['Cloud Migration', 'VPS Hosting', 'Docker & Kubernetes', '24/7 Monitoring'],
        technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes'],
        startingPrice: 1000,
        active: true,
        order: 3,
      },
    ];

    await Service.bulkCreate(services, { ignoreDuplicates: true });
    console.log(' Services seeded');

    // Seed Hosting Plans
    const hostingPlans = [
      {
        name: 'Basic',
        slug: 'basic-hosting',
        description: 'Perfect for small websites and blogs',
        price: 19.99,
        billingCycle: 'monthly',
        features: {
          storage: '10 GB',
          bandwidth: '100 GB',
          websites: 1,
          databases: 1,
          emailAccounts: 5,
          ssl: true,
          backups: 'Weekly',
        },
        specs: {
          cpu: '1 Core',
          ram: '1 GB',
          storageType: 'SSD',
        },
        popular: false,
        active: true,
        order: 1,
      },
      {
        name: 'Professional',
        slug: 'professional-hosting',
        description: 'Ideal for growing businesses',
        price: 49.99,
        billingCycle: 'monthly',
        features: {
          storage: '50 GB',
          bandwidth: '500 GB',
          websites: 10,
          databases: 10,
          emailAccounts: 50,
          ssl: true,
          backups: 'Daily',
        },
        specs: {
          cpu: '2 Cores',
          ram: '4 GB',
          storageType: 'NVMe SSD',
        },
        popular: true,
        active: true,
        order: 2,
      },
      {
        name: 'Enterprise',
        slug: 'enterprise-hosting',
        description: 'For mission-critical applications',
        price: 199.99,
        billingCycle: 'monthly',
        features: {
          storage: '200 GB',
          bandwidth: 'Unlimited',
          websites: 'Unlimited',
          databases: 'Unlimited',
          emailAccounts: 'Unlimited',
          ssl: true,
          backups: 'Real-time',
        },
        specs: {
          cpu: '8 Cores',
          ram: '16 GB',
          storageType: 'NVMe SSD RAID',
        },
        popular: false,
        active: true,
        order: 3,
      },
    ];

    await HostingPlan.bulkCreate(hostingPlans, { ignoreDuplicates: true });
    console.log(' Hosting plans seeded');

    // Seed Testimonials
    const testimonials = [
      {
        clientName: 'Sarah Johnson',
        clientCompany: 'TechCorp Inc.',
        clientRole: 'CTO',
        content: 'Nyle Digital transformed our legacy systems into modern microservices. Their expertise exceeded our expectations.',
        rating: 5,
        project: 'Digital Transformation',
        featured: true,
        status: 'approved',
      },
      {
        clientName: 'Michael Chen',
        clientCompany: 'GrowthLabs',
        clientRole: 'Product Director',
        content: 'The mobile app they developed increased our user engagement by 300%. Outstanding technical expertise.',
        rating: 5,
        project: 'Mobile Banking App',
        featured: true,
        status: 'approved',
      },
    ];

    await Testimonial.bulkCreate(testimonials, { ignoreDuplicates: true });
    console.log(' Testimonials seeded');

    console.log(' Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error(' Seeding failed:', error);
    process.exit(1);
  }
}

seed();