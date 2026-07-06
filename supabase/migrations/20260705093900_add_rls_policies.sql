-- Add generous RLS policies for prototyping

CREATE POLICY "Enable all for users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for properties" ON properties FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for vendor_partners" ON vendor_partners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for service_requests" ON service_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for vault_stakes" ON vault_stakes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for transactions" ON transactions FOR ALL USING (true) WITH CHECK (true);
