-- Only comments accept public writes now; photos and posts are read-only
-- (see the "Public read" policies and grants in supabase/schema.sql).
DROP POLICY IF EXISTS "Public insert" ON photos;
DROP POLICY IF EXISTS "Authenticated insert" ON photos;

DROP POLICY IF EXISTS "Public insert" ON comments;
CREATE POLICY "Public insert" ON comments
  FOR INSERT WITH CHECK (TRUE);

-- Storage: read-only access to the "photos" bucket (create the bucket
-- first). No insert policy -- uploading new photos isn't supported.
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "Public insert access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated insert access" ON storage.objects;
