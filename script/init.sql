-- scripts/init.sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'staff', 'client');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
        CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
        CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contact_status') THEN
        CREATE TYPE contact_status AS ENUM ('new', 'contacted', 'in_progress', 'converted', 'archived');
    END IF;
END $$;

-- Insert initial admin user (password: Admin123!)
INSERT INTO users (id, email, password, "firstName", "lastName", role, "isEmailVerified", status, "createdAt", "updatedAt")
VALUES (
    uuid_generate_v4(),
    'admin@nyledigital.com',
    '$2a$10$YourHashedPasswordHere', -- Use bcrypt to hash 'Admin123!'
    'System',
    'Administrator',
    'admin',
    true,
    'active',
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insert default services
INSERT INTO services (id, title, slug, description, icon, features, "createdAt", "updatedAt")
VALUES 
    (uuid_generate_v4(), 'Custom Software Development', 'custom-software', 'Tailored software solutions for your unique business needs', 'Code', '["Requirement Analysis", "Agile Development", "Quality Assurance", "Deployment & Maintenance"]', NOW(), NOW()),
    (uuid_generate_v4(), 'Web Applications', 'web-apps', 'Modern web applications using React, Next.js and Node.js', 'Globe', '["Frontend Development", "Backend API", "Database Design", "Performance Optimization"]', NOW(), NOW()),
    (uuid_generate_v4(), 'Mobile Apps', 'mobile-apps', 'Cross-platform mobile applications with React Native and Flutter', 'Smartphone', '["iOS & Android", "UI/UX Design", "API Integration", "App Store Deployment"]', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;