-- ============================================================
-- MANAGEM - BOU-AZZER MINERALS
-- Schéma complet de la base de données (PostgreSQL)
-- ============================================================
-- Ce fichier crée les 12 tables discutées et validées.
-- Il ne sera exécuté qu'une seule fois lors de la mise en place
-- initiale du projet.
-- ============================================================

-- Activer l'extension pour générer des identifiants uniques (UUID)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. UTILISATEURS (Users)
-- ============================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(30),
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'client', -- 'client', 'employe', 'admin'
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. ADRESSES (Addresses)
-- ============================================================
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    company_name VARCHAR(150),
    tax_number VARCHAR(50),
    street_and_number VARCHAR(200) NOT NULL,
    apartment VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. CATÉGORIES DE PRODUITS (Categories)
-- ============================================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url TEXT
);

-- ============================================================
-- 4. PRODUITS (Products) — pierres et minéraux
-- ============================================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    weight VARCHAR(50),          -- ex: "12.5 g" ou "3 carats"
    dimensions VARCHAR(50),      -- ex: "4cm x 2cm"
    ruban VARCHAR(20) NOT NULL DEFAULT 'Normal', -- 'Rare', 'Nouveau', 'Normal'
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 5. INVENTAIRE (Inventory)
-- ============================================================
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    alert_threshold INTEGER NOT NULL DEFAULT 1,
    last_updated TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Historique des mouvements de stock (entrées/sorties)
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    change_amount INTEGER NOT NULL, -- positif = entrée, négatif = sortie
    reason VARCHAR(100),            -- ex: 'commande', 'réapprovisionnement'
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 6. PANIER (Cart)
-- ============================================================
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(150),  -- pour les visiteurs non connectés
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 7. COMMANDES (Orders)
-- ============================================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    address_id UUID REFERENCES addresses(id) ON DELETE SET NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'en_attente',
        -- 'en_attente', 'confirmee', 'livree', 'annulee'
    payment_method VARCHAR(30) NOT NULL DEFAULT 'paiement_a_la_livraison',
    discount_code VARCHAR(50),
    subtotal NUMERIC(10, 2) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 8. ARTICLES DE LA COMMANDE (Order Items)
-- ============================================================
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL,
    price_at_purchase NUMERIC(10, 2) NOT NULL
);

-- ============================================================
-- 9. RENDEZ-VOUS / VISITES (Visits)
-- ============================================================
CREATE TABLE visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    visit_date DATE NOT NULL,
    visit_time TIME NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    organization_name VARCHAR(150) NOT NULL,
    organization_type VARCHAR(50) NOT NULL, -- 'Entreprise', 'École', ...
    participants_count INTEGER NOT NULL,
    group_leader_name VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'confirmee',
        -- 'confirmee', 'replanifiee', 'annulee'
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 10. MESSAGES DE CONTACT (Contact Messages)
-- ============================================================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 11. QUESTIONS FRÉQUENTES (FAQ)
-- ============================================================
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question VARCHAR(300) NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- 12. LISTE DE SOUHAITS (Wishlist)
-- ============================================================
CREATE TABLE wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- ============================================================
-- FIN DU SCHÉMA
-- ============================================================
