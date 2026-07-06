-- Project CAP Database Schema (PostgreSQL for Supabase)

-- ENUMS
CREATE TYPE user_role AS ENUM ('nomad', 'investor', 'admin');
CREATE TYPE kyc_status_type AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE property_status AS ENUM ('available', 'booked', 'maintenance', 'unlisted');
CREATE TYPE booking_status AS ENUM ('pending', 'active', 'completed', 'cancelled');
CREATE TYPE service_type_enum AS ENUM ('cleaning', 'food', 'transport', 'coworking', 'laundry', 'wellness');
CREATE TYPE service_status AS ENUM ('pending', 'dispatched', 'completed', 'failed');
CREATE TYPE stake_status AS ENUM ('active', 'withdrawn');
CREATE TYPE transaction_type AS ENUM ('subscription', 'yield_credit', 'service_charge', 'stake_deposit', 'stake_withdrawal');
CREATE TYPE transaction_direction AS ENUM ('credit', 'debit');

-- USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'nomad',
    kyc_status kyc_status_type NOT NULL DEFAULT 'pending',
    nfi_score FLOAT NOT NULL DEFAULT 50.0 CHECK (nfi_score >= 0 AND nfi_score <= 100),
    preferences JSONB DEFAULT '{}'::jsonb,
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROPERTIES
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    address TEXT NOT NULL,
    monthly_cost_usd FLOAT NOT NULL,
    status property_status NOT NULL DEFAULT 'available',
    landlord_contact TEXT,
    verified BOOLEAN NOT NULL DEFAULT false,
    amenities TEXT[] DEFAULT '{}',
    photos TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BOOKINGS
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status booking_status NOT NULL DEFAULT 'pending',
    total_amount_usd FLOAT NOT NULL,
    stripe_subscription_id TEXT,
    services_included TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (end_date > start_date)
);

-- VENDOR PARTNERS
CREATE TABLE vendor_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    service_type service_type_enum NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    webhook_url TEXT,
    auto_dispatch BOOLEAN NOT NULL DEFAULT false,
    rate_per_service_usd FLOAT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SERVICE REQUESTS
CREATE TABLE service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    type service_type_enum NOT NULL,
    status service_status NOT NULL DEFAULT 'pending',
    vendor_id UUID REFERENCES vendor_partners(id),
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- VAULT STAKES (VaultOS)
CREATE TABLE vault_stakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount_staked_usd FLOAT NOT NULL CHECK (amount_staked_usd > 0),
    monthly_yield_rate FLOAT NOT NULL DEFAULT 0.01,
    accrued_yield_usd FLOAT NOT NULL DEFAULT 0,
    status stake_status NOT NULL DEFAULT 'active',
    staked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TRANSACTIONS
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type transaction_type NOT NULL,
    amount_usd FLOAT NOT NULL CHECK (amount_usd > 0),
    direction transaction_direction NOT NULL,
    stripe_payment_intent_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) basics - can be expanded
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_stakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
