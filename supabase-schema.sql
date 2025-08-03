-- Landing Page IT - Supabase Database Schema

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create site_content table for dynamic content
CREATE TABLE IF NOT EXISTS site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) DEFAULT 'wrench',
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    field_name VARCHAR(100) NOT NULL UNIQUE,
    field_value TEXT NOT NULL,
    field_type VARCHAR(20) DEFAULT 'text' CHECK (field_type IN ('text', 'email', 'phone', 'url')),
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

-- Insert default content
INSERT INTO site_content (section, title, content, order_index) VALUES
('hero', 'Bienvenido', 'Soy un técnico IT freelance especializado en brindar soluciones tecnológicas profesionales para empresas y particulares. Con años de experiencia en el sector, ofrezco servicios de calidad adaptados a tus necesidades.', 1),
('about', 'Sobre Mí', 'Técnico en Informática con más de 5 años de experiencia en soporte técnico, mantenimiento de equipos y soluciones IT. Me especializo en ofrecer servicios personalizados que ayuden a optimizar el rendimiento tecnológico de mis clientes.', 1),
('about', 'Experiencia', 'He trabajado con empresas de diversos sectores, desde pequeños negocios hasta corporaciones medianas, proporcionando soporte técnico integral y soluciones innovadoras.', 2),
('contact', 'Información de Contacto', 'Estoy disponible para consultas y presupuestos. No dudes en contactarme para discutir cómo puedo ayudarte con tus necesidades tecnológicas.', 1);

-- Insert default services
INSERT INTO services (title, description, icon, order_index, active) VALUES
('Mantenimiento de PC', 'Limpieza, optimización y mantenimiento preventivo de equipos de escritorio y portátiles para garantizar su óptimo rendimiento.', 'monitor', 1, true),
('Soporte Remoto', 'Asistencia técnica a distancia para resolver problemas de software, configuración de sistemas y troubleshooting general.', 'wifi', 2, true),
('Instalación de Software', 'Instalación y configuración de programas, sistemas operativos y aplicaciones empresariales según tus necesidades.', 'download', 3, true),
('Configuración de Redes', 'Instalación y configuración de redes domésticas y empresariales, incluyendo WiFi, routers y equipos de red.', 'network', 4, true),
('Recuperación de Datos', 'Servicios especializados en recuperación de información perdida de discos duros, memorias USB y otros dispositivos de almacenamiento.', 'hard-drive', 5, true),
('Consultoría IT', 'Asesoramiento tecnológico para la toma de decisiones en infraestructura IT, compra de equipos y planificación de proyectos.', 'lightbulb', 6, true);

-- Insert default contact information
INSERT INTO contact_info (field_name, field_value, field_type) VALUES
('email', 'contacto@tecnicoit.com', 'email'),
('phone', '+1 (555) 123-4567', 'phone'),
('whatsapp', '+1 (555) 123-4567', 'phone'),
('linkedin', 'https://linkedin.com/in/tecnicoit', 'url'),
('twitter', 'https://twitter.com/tecnicoit', 'url'),
('location', 'Ciudad, País', 'text'),
('availability', 'Lunes a Viernes: 9:00 AM - 6:00 PM', 'text');

-- Enable Row Level Security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on contact_info" ON contact_info FOR SELECT USING (true);

-- Create policies for authenticated users (admin) to modify data
CREATE POLICY "Allow authenticated users to modify site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to modify contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');

