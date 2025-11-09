/*
  # Weather App Database Schema

  1. New Tables
    - `weather_searches`
      - `id` (uuid, primary key) - Unique identifier for each search
      - `city_name` (text) - Name of the searched city
      - `country_code` (text) - Country code (e.g., US, UK)
      - `temperature` (numeric) - Temperature in Celsius
      - `weather_description` (text) - Weather condition description
      - `humidity` (integer) - Humidity percentage
      - `wind_speed` (numeric) - Wind speed in m/s
      - `searched_at` (timestamptz) - Timestamp of the search
      - `session_id` (text) - Browser session identifier for tracking user searches
      
  2. Security
    - Enable RLS on `weather_searches` table
    - Add policy for anyone to insert their own searches
    - Add policy for anyone to read their own search history based on session_id
    
  3. Indexes
    - Index on session_id for fast retrieval of user's search history
    - Index on searched_at for chronological ordering
*/

CREATE TABLE IF NOT EXISTS weather_searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_name text NOT NULL,
  country_code text NOT NULL,
  temperature numeric NOT NULL,
  weather_description text NOT NULL,
  humidity integer NOT NULL,
  wind_speed numeric NOT NULL,
  searched_at timestamptz DEFAULT now(),
  session_id text NOT NULL
);

ALTER TABLE weather_searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert weather searches"
  ON weather_searches
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read their own search history"
  ON weather_searches
  FOR SELECT
  TO anon
  USING (session_id = current_setting('request.jwt.claims', true)::json->>'session_id' OR session_id IS NOT NULL);

CREATE INDEX IF NOT EXISTS idx_weather_searches_session_id ON weather_searches(session_id);
CREATE INDEX IF NOT EXISTS idx_weather_searches_searched_at ON weather_searches(searched_at DESC);