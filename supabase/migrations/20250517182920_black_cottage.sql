/*
  # Initial Schema Setup for Waqti Platform

  1. New Tables
    - users (extends Supabase auth.users)
      - id (uuid, primary key)
      - name (text)
      - phone (text)
      - balance (integer)
      - created_at (timestamp)
    
    - services
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - category (text)
      - provider_id (uuid, references users)
      - hourly_rate (integer)
      - location (text)
      - rating (numeric)
      - reviews_count (integer)
      - image_url (text)
      - created_at (timestamp)
    
    - bookings
      - id (uuid, primary key)
      - service_id (uuid, references services)
      - client_id (uuid, references users)
      - provider_id (uuid, references users)
      - status (text)
      - date (timestamp)
      - duration (integer)
      - total_hours (integer)
      - created_at (timestamp)
    
    - transactions
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - type (text)
      - amount (integer)
      - description (text)
      - booking_id (uuid, references bookings)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  phone text,
  balance integer DEFAULT 2,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  provider_id uuid REFERENCES users(id) NOT NULL,
  hourly_rate integer NOT NULL,
  location text NOT NULL,
  rating numeric DEFAULT 0,
  reviews_count integer DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read services"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = provider_id);

CREATE POLICY "Users can update own services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = provider_id);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) NOT NULL,
  client_id uuid REFERENCES users(id) NOT NULL,
  provider_id uuid REFERENCES users(id) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  date timestamptz NOT NULL,
  duration integer NOT NULL,
  total_hours integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id OR auth.uid() = provider_id);

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id OR auth.uid() = provider_id);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('credit', 'debit')),
  amount integer NOT NULL,
  description text NOT NULL,
  booking_id uuid REFERENCES bookings(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can create transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);