-- Landing Page IT - Supabase Database Schema V2

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create site_content table for dynamic content
CREATE TABLE IF NOT EXISTS site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE, -- New column for section visibility
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) DEFAULT 'wrench',
    order_index INTEGER DEFAULT 0, -- Used for reordering services
    is_visible BOOLEAN DEFAULT TRUE, -- New column for service visibility
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    field_name VARCHAR(100) NOT NULL UNIQUE,
    field_value TEXT NOT NULL,
    field_type VARCHAR(20) DEFAULT 'text' CHECK (field_type IN ('text', 'email', 'phone', 'url')),
    is_visible BOOLEAN DEFAULT TRUE, -- New column for individual contact field visibility
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- New table for SEO metadata
CREATE TABLE IF NOT EXISTS seo_metadata (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_name VARCHAR(100) NOT NULL UNIQUE, -- e.g., 'home', 'services'
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    og_image_url TEXT, -- Open Graph image URL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- New table for general settings/features visibility (e.g., social media icons in Hero/Footer)
CREATE TABLE IF NOT EXISTS app_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_name VARCHAR(100) NOT NULL UNIQUE, -- e.g., 'show_hero_social_icons', 'show_footer_social_icons'
    setting_value BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_seo_metadata_updated_at BEFORE UPDATE ON seo_metadata FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_app_settings_updated_at BEFORE UPDATE ON app_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default content (updated with is_visible)
INSERT INTO site_content (section, title, content, order_index, is_visible) VALUES
('hero', 'Bienvenido', 'Soy un técnico IT freelance especializado en brindar soluciones tecnológicas profesionales para empresas y particulares. Con años de experiencia en el sector, ofrezco servicios de calidad adaptados a tus necesidades.', 1, TRUE),
('about', 'Sobre Mí', 'Técnico en Informática con más de 5 años de experiencia en soporte técnico, mantenimiento de equipos y soluciones IT. Me especializo en ofrecer servicios personalizados que ayuden a optimizar el rendimiento tecnológico de mis clientes.', 1, TRUE),
('about', 'Experiencia', 'He trabajado con empresas de diversos sectores, desde pequeños negocios hasta corporaciones medianas, proporcionando soporte técnico integral y soluciones innovadoras.', 2, TRUE),
('contact', 'Información de Contacto', 'Estoy disponible para consultas y presupuestos. No dudes en contactarme para discutir cómo puedo ayudarte con tus necesidades tecnológicas.', 1, TRUE);

-- Insert default services (updated with is_visible)
INSERT INTO services (title, description, icon, order_index, is_visible) VALUES
('Mantenimiento de PC', 'Limpieza, optimización y mantenimiento preventivo de equipos de escritorio y portátiles para garantizar su óptimo rendimiento.', 'monitor', 1, TRUE),
('Soporte Remoto', 'Asistencia técnica a distancia para resolver problemas de software, configuración de sistemas y troubleshooting general.', 'wifi', 2, TRUE),
('Instalación de Software', 'Instalación y configuración de programas, sistemas operativos y aplicaciones empresariales según tus necesidades.', 'download', 3, TRUE),
('Configuración de Redes', 'Instalación y configuración de redes domésticas y empresariales, incluyendo WiFi, routers y equipos de red.', 'network', 4, TRUE),
('Recuperación de Datos', 'Servicios especializados en recuperación de información perdida de discos duros, memorias USB y otros dispositivos de almacenamiento.', 'hard-drive', 5, TRUE),
('Consultoría IT', 'Asesoramiento tecnológico para la toma de decisiones en infraestructura IT, compra de equipos y planificación de proyectos.', 'lightbulb', 6, TRUE);

-- Insert default contact information (updated with is_visible)
INSERT INTO contact_info (field_name, field_value, field_type, is_visible) VALUES
('email', 'contacto@tecnicoit.com', 'email', TRUE),
('phone', '+1 (555) 123-4567', 'phone', TRUE),
('whatsapp', '+1 (555) 123-4567', 'phone', TRUE),
('linkedin', 'https://linkedin.com/in/tecnicoit', 'url', TRUE),
('twitter', 'https://twitter.com/tecnicoit', 'url', TRUE),
('location', 'Ciudad, País', 'text', TRUE),
('availability', 'Lunes a Viernes: 9:00 AM - 6:00 PM', 'text', TRUE);

-- Insert default SEO metadata
INSERT INTO seo_metadata (page_name, meta_title, meta_description, meta_keywords) VALUES
('home', 'Técnico IT Freelance - Soluciones Profesionales', 'Servicios de soporte técnico, mantenimiento y consultoría IT para empresas y particulares.', 'técnico IT, soporte técnico, mantenimiento PC, consultoría IT, freelance, servicios informáticos');

-- Insert default app settings
INSERT INTO app_settings (setting_name, setting_value) VALUES
('show_hero_social_icons', TRUE),
('show_footer_social_icons', TRUE);

-- Enable Row Level Security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access on seo_metadata" ON seo_metadata FOR SELECT USING (true);
CREATE POLICY "Allow public read access on app_settings" ON app_settings FOR SELECT USING (true);

-- Create policies for authenticated users (admin) to modify data
CREATE POLICY "Allow authenticated users to modify site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify seo_metadata" ON seo_metadata FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify app_settings" ON app_settings FOR ALL USING (auth.role() = 'authenticated');


